+++
title = "使用Saga"
description = ""
weight = 3
+++

## 前置条件

在开始使用`Saga`之前，要确保服务的`choerodon-starters`依赖在 `0.6.0.RELEASE` 版本之上。同时需要对`Saga` 有一定的了解。可以参考[Choerodon猪齿鱼平台中的微服务数据一致性解决方案](https://mp.weixin.qq.com/s?__biz=MzU4OTQ3NTQ0OQ==&mid=2247483880&idx=1&sn=f6f94cf64f0e91f460325011f5c8f152&chksm=fdcdbafecaba33e80b22e062724a3775ad3f9349c0503fc2241ba9df5c798e207bfd2305d98f&scene=0#rd)。

## 介绍

`Saga` 是分布式系统中数据一致性的一种解决方案。本章介绍了如何使用Choerodon 的`Saga`。并包含如下的内容：

* 添加依赖
* 注解
* 开启`Saga`
* 消费者
* `Asgard` 服务

## 添加依赖

在本地服务的`pom.xml` 中添加如下的依赖。

```xml
    <dependency>
        <groupId>io.choerodon</groupId>
        <artifactId>choerodon-starter-asgard</artifactId>
        <version>${choerodon.starters.version}</version>
    </dependency>
    <dependency>
        <groupId>io.choerodon</groupId>
        <artifactId>choerodon-starter-core</artifactId>
        <version>${choerodon.starters.version}</version>
    </dependency>
    <dependency>
        <groupId>io.choerodon</groupId>
        <artifactId>choerodon-starter-swagger</artifactId>
        <version>${choerodon.starters.version}</version>
    </dependency>
```

其中`choerodon.starters.version` 的版本在`0.6.0.RELEASE` 之上。

## 注解

在`choerodon-starter-asgard` 中，包含有两个注解。

* `@Saga`：定义一个类似于`Kafka`的`topic`。任务会被添加`@SagaTask`注解订阅。
* `@SagaTask`：订阅对应的`@Saga` 的任务。

首先，请确保注解所在类可以被`spring`扫描到

### `@Saga`

在方法或者类上添加`@Saga` 注解。
``` java
@Saga(code = "asgard-create-user", description = "创建项目", inputSchemaClass = AsgardUser.class)
```

字段 | 作用
--- | ---
`code` | 任务通过`@SagaTask`订阅，对应`@SagaTask`的`sagaCode`
`description` | 描述信息
`inputSchema` | 该`Saga`输入的参数示例。例如`{"name":"string", "age":0}`。会覆盖`inputSchemaClass`自动生成
`inputSchemaClass` | 指定`class`自动生成。比如指定`User`将自动生成`{"id":0,"username":"string","password":"string"}`

### `@SagaTask`

在方法上添加`@SagaTask`注解。
``` java
@SagaTask(code = "devopsCreateUser",
    description = "devops创建用户",
    sagaCode = "asgard-create-user",
    concurrentLimitNum = 2,
    concurrentLimitPolicy = SagaDefinition.ConcurrentLimitPolicy.NONE,
    seq = 2)
```

字段 | 作用
--- | ---
`code` | 该`task`的`code`，同一个`sagaCode`下的`taskCode`需要唯一
`sagaCode` | 对应`@Saga`的`code`，表示订阅该`Saga`
`seq` | 执行顺序，同一个`Saga`下的task将按照seq顺序一次消费，值越小消费顺序越高
`description` | 描述
`maxRetryCount` | 最大自动重试次数
`concurrentLimitNum` | 并发数，当`concurrentLimitPolicy`不为NONE时生效
`concurrentLimitPolicy` | 并发策略，默认为NONE
`outputSchemaClass` |  默认将`@SagaTask`的返回类型生成输出，也可通过此属性指定
`transactionTimeout` | `Saga`超时时间，默认用不超时
`transactionReadOnly` | 是否为只读`Saga`
`transactionIsolation` | 事务的隔离级别
`transactionManager` | 使用的事务管理器


在一个`Saga` 定义中。上一个`SagaTask`的输出是下一个的输入，当`seq`相同时，则并行执行，并行的任务输出的结果`json`进行一个合并，作为下一个次序的输入。

并发策略，默认为`NONE`，`TYPE`根据`sagaClient.startSaga`时的`refType`设置并发，`TYPE_AND_ID`根据`refType`和`ref_id`设置并发，并发数为`concurrentLimitNum`。一个服务将`@SagaTask`注解删除，`asgard`服务也会同步删除该`SagaTask`。

## 开启`Saga`

当`Saga` 被定义好之后，可以通过服务自身，启动一个`Saga` 实例。

* 注入`SagaClient`，通过`feign`调用`saga`。
* 将业务代码和`sagaClient.startSaga()`放在一个事务中。
* 当不需要消费端消费该`Saga`实例时，添加`choerodon.saga.consumer.enabled: false`配置，这样不会创建消费端拉取消息和消息消费的`bean`和线程。
* `feign`字段
   - `sagaCode`: 要启用的`saga`的`code`字段，对应`@Saga`里的`code`
   - `StartInstanceDTO`: DTO
     1. `input`: 输入的`json`数据
     2. `userId`: 方便追踪用户。`DetailsHelper.getUserDetails().getUserId()`传入
     3. `refType`: 关联业务类型，比如`project`，`user`这些。非必须，该字段用于并发策略
     4. `refId`: 关联业务类型，比如`projectId`，`userId`这些。非必须，该字段用于并发策略

请确保`@EnableFeignClients`包含`io.choerodon.asgard.saga`，否则扫描不到该`feignClient`。例如：`@EnableFeignClients("io.choerodon")`

例如创建一个用户时，启动一个`Saga`:
``` java
@Transactional
    public AsgardUser createUser(@Valid @RequestBody AsgardUser user) {
         // 业务代码
         sagaClient.startSaga("asgard-create-user", new StartInstanceDTO(input, "", ""));
    }
```

## 消费者

启动一个`Saga` 之后，需要有对应的处理逻辑。在消费端进行添加如下配置：

```yaml
choerodon:
  saga:
    consumer:
      thread-num: 5 # saga消息消费线程池大小
      max-poll-size: 200 # 每次拉取消息最大数量
      enabled: true # 启动消费端
      poll-interval-ms: 1000 # 拉取间隔，默认1000毫秒
```

同时在代码中添加如下处理逻辑：

``` java
@SagaTask(code = "devopsCreateUser",
        description = "devops创建用户",
        sagaCode = "asgard-create-user",
        concurrentLimitNum = 2,
        concurrentLimitPolicy = SagaDefinition.ConcurrentLimitPolicy.NONE,
        seq = 2)
public DevopsUser devopsCreateUser(String data) throws IOException {
    AsgardUser asgardUser = objectMapper.readValue(data, AsgardUser.class);
    LOGGER.info("===== asgardUser {}", asgardUser);
    DevopsUser devopsUser = new DevopsUser();
    devopsUser.setId(asgardUser.getId());
    devopsUser.setGroup("test");
    LOGGER.info("===== devopsCreateUser {}", devopsUser);
    return devopsUser;
}
```

方法返回值为该任务的输出，本次`agaTask`的输出是下一个`sagaTsk`的输入。

里面执行封装了事务，不需要再加事务，如果需要加外部事务，可通过`@SagaTask`的`transactionDefinition`设置事务传播行为。

### 输出合并

同一个`Saga`下的多个`SagaTask`的`seq`相同，则并行执行。这多个`SagaTask`的输出进行合并后，成为下个`SagaTask`的输入。

合并操作如下：
`Saga1` 的`code` 为`code1`，`Saga2` 的`code` 为`code2`，如果输出结果完全相同，则合并结果为1或者2的输出。

Saga1输出 | Saga2输出 | 合并结果
--- | --- | ---
`{"name":"23"}` | `null` | `{"name":"23"}`
`{"name":"23"}` | `{"name":"23333"}` | `{"name":"23333"}`结果被最后一个覆盖
`{"name":"23"}` | `{"age":23}` | `{"name":"23333","age":23}`
`[{"id":1},{"id":2}]` | `{"age":23}` | `{"code1":[{"id":1},{"id":2}],"age":23}`
`false` | `null` | {"code1":false}
`"test"` | `23` | `{"code1":"test","code2":23}`
`"test"` | `"23"` | `{"code1":"test","code2":"23"}`

如下：如果这次的输出和输入一样，直接将接收数据返回即可。
``` java
@SagaTask(code = "test", sagaCode = "iam-create-project", seq = 1)
public String iamCreateUser(String data) {
    return data;
}
```

这样默认根据方法返回值即`String`生成的`outputChema`是错误的，最好手动指定，即:
``` java
@SagaTask(code = "test", sagaCode = "iam-create-project", seq = 1,  outputSchemaClass = AsgardUser.class)
public String iamCreateUser(String data) {
    return data;
}
``` 
或者指定正确的返回值
``` java
@SagaTask(code = "test", sagaCode = "iam-create-project", seq = 1)
public AsgardUser iamCreateUser(String data) {
    AsgardUser asgardUser = objectMapper.readValue(data, AsgardUser.class);
    return asgardUser;
}
```

### 消费端模型

一个定时任务线程定时拉取消息，拉取的消息放到一个线程安全的`set`里，再由消息消费线程池异步消费，每消费完成(无论成功还是失败)`set`从中删除，直到`set`为空再进行下一次拉取消费。

### 消费端事务

1. `@SagaTask`注解的方法封装了事务，有如下事务属性可配置。

字段 | 作用
--- | ---
`transactionTimeout` | 事务超时时间，默认用不超时
`transactionReadOnly` | 是否为只读事务
`transactionIsolation` | 事务的隔离级别
`transactionManager` | 使用的事务管理器
`

2. 如果`@SagaTask`方法里面自己又添加了事务，则形成嵌套事务，自己添加的事务设置合适的事务传播行为即可。

3. `@SagaTask`的方法执行遇到任何异常都会回滚事务，如果无需回滚，则手动捕获该异常即可，如下：
``` java
@SagaTask(code = "book-tour-hotel",
            description = "预定酒店",
            sagaCode = "book-tour-package",
            concurrentLimitNum = 2,
            seq = 5)
    public TourDTO bookHotel(String data) throws IOException {
        TourDTO tour = mapper.readValue(data, TourDTO.class);
        TourHotel hotel = new TourHotel();
        hotel.setUserId(tour.getUserId());
        hotel.setTourId(tour.getTourId());
        if (tourHotelMapper.insert(hotel) != 1) {
            throw new CommonException("error.tour.bookHotel");
        }
        tour.setHotelId(hotel.getId());
        //比如该feign做一些清理，成功与否无关紧要，则可以手动捕获该异常。
        try {
            XXXFeign.cleanup(tour.getUserId());
        } catch (Exception e) {
            LOGGER
        }
        return tour;
    }
```

4. `@SagaTask`的方法里含有feign调用, 最好能保证feign调用的"幂等性"


## `Asgard` 服务

在北欧神话中，阿斯加德（古诺斯语：Ásgarðr，英语：Asgard）是神的领域，亦可称作阿萨神域。在Choerodon 中，我们用`Asgard`。来管理choerodon 中所有的分布式事务。

`asgard-service` 启动后，会主动拉取`@Saga`和`@SagaTask`的注解配置。

* 不存在则插入

* 存在则更新

* 原本存在后来删除注解，SagaTask会删除，Saga不做处理。

为了防止消费端多实例拉取出现消费，对每条消息设置一个实例锁，锁为·sagaCode + taskCode`。

* 当消息实例锁为空时，消费端拉取该条消息并更新实例锁，更新成功，则拉取可以成功

* 当消息实例锁不为空时，查询消息实例是否为拉取的消费端实例，是则允许拉取不是则不允许拉取该条消息。

``` java
StringLockProvider.Mutex mutex = stringLockProvider.getMutex(code.getSagaCode() + ":" + code.getTaskCode());
synchronized (mutex) {
}

```

并发策略为`TYPE_AND_ID`或者为`TYPE`的消息，按创建`id`排序，每次只可以取到`@SagaTask`设置的`concurrentLimitNum`数目。

更多有关的信息可以从[`asgard-service`](https://github.com/choerodon/asgard-service)获取。