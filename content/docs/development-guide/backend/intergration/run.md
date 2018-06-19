+++
title = "运行与测试"
date = "2018-04-25T11:00:28+08:00"
draft = false
weight = 3
+++

## 前置条件

* 开发环境配置：[开发环境安装](../../develop-env/)
* 数据环境准备：[数据初始化](../init/)
* Demo程序已经开发完毕，详见 [开发Demo程序](../../demo/)
* 启动 `mysql`，`redis`，`kafka`等容器

## 介绍

本小节介绍如何在本地通过choerodon 来进行微服务开发。

## 启动`todo` 服务

进入`choerodon-todo-service`目录下，运行以下命令启动本地项目

```bash
mvn clean spring-boot:run
```

> * 本地开发服务，如果不调用其他服务，则可以不需要启动注册中心，在`TodoServiceApplication`中不需要添加`@EnableEurekaClient` 注解。
> * 如果不需要测试到kafka相关的，可以将kafka的相关的依赖注释掉。提交时再打开。

## 服务注册

在`TodoServiceApplication`中添加`@EnableEurekaClient` 注解。

在`application.yml`中添加关于Eureka的配置

```yml
eureka:
  instance:
    preferIpAddress: true
    leaseRenewalIntervalInSeconds: 1
    leaseExpirationDurationInSeconds: 3
  client:
    serviceUrl:
      defaultZone: http://localhost:8000/eureka/
```

如果需要自动将该服务在线上添加到路由列表中，需在`xxx.infra.util`包下创建拓展数据配置类，并继承`ExtraDataManager`，以用于自动初始化路由。示例如下：
```java
@ChoerodonExtraData
public class CustomExtraDataManager implements ExtraDataManager {
    @Override
    public ExtraData getData() {
        ChoerodonRouteData choerodonRouteData = new ChoerodonRouteData();
        choerodonRouteData.setName("todo");
        choerodonRouteData.setPath("/todo/**");
        choerodonRouteData.setServiceId("choerodon-todo-service");
        extraData.put(ExtraData.ZUUL_ROUTE_DATA, choerodonRouteData);
        return extraData;
    }
}
```

或者以管理员权限登录平台，在`管理` -> `微服务管理` -> `路由管理` 中添加对应服务的路由信息。

## 接口权限

Choerodon 的接口权限遵循`RBAC`。需要在接口上添加`@Permission()`注解。

包含如下参数。

参数名 | 说明
|---|---|
level | 接口层级，ResourceLevel.SITE，ResourceLevel.ORGANIZATION，ResourceLevel.PROJECT三种
permissionLogin | 登录允许访问，默认为false
permissionPublic | 公开接口，默认为false

其中如果层级为组织层或项目层，则接口的`mapping` 中必须包含`organization_id` 或 `project_id` 作为变量。否则`gateway-helper`校验时不会识别该权限。

## 本地测试

由于Choerodon 包含的服务比较多和依赖的组件较多。一般不会在本地将所有的服务都启动，只会根据自己的需要启动对应的服务。建议在服务器运行一整套环境，本地做服务的单体测试，服务器上进行集成测试。

**1.** 如果不需要获取当前登录的用户信息，在`TodoServiceApplication`中不需要添加`@EnableChoerodonResourceServer` 注解。然后直接通过`postman` 或其他接口测试工具对服务提供的接口进行测试。

**2.** 如果需要获取当前登录的用户信息，则需要在本地启动如下服务，进行登录。

* register-server
* api-gateway
* gateway-helper
* oauth-server

**3.** 然后通过`api-gateway` 的输出日志，获取登录用户的`jwt_token`。然后添加请求头。

``` json
{
  "Jwt_Token": jwt_token
}
```

## swagger 测试

将程序部署到线上以后，可以通过`swagger` 来对接口进行测试。

* 打开 `http:、/api.example.com/manager/swagger-ui.html`。其中`http://api.example.com` 为平台网关对外的域名。

![](/docs/development-guide/backend/intergration/images/swaggerTest1.png)

* 打开任意一个`api`，点击右边红色的叹号对调用该`api`进行授权（勾选`default scope`）
* 在弹出界面输入用户名密码，输入管理员账号密码 admin/admin

![](/docs/development-guide/backend/intergration/images/swaggerTest4.png)

## 启动相关服务

如果需要启动其他模块，可以再[github](https://github.com/choerodon/)上获取到对应服务的最新代码，克隆到本地，将`./src/main/resources/application.yml` 复制一份出来，修改里面的默认值。根据本地环境信息，修改数据库和kafka连接。

``` bash
$ cp ./src/main/resources/application.yml ./src/main/resources/application-default.yml
$ mvn clean spring-boot:run
```

这里提供一份`docker-compose.yaml`仅供参考，具体根据配置修改本地程序的配置。

``` yaml
version: "3"
services:
  zookeeper-0:
    container_name: zookeeper-0
    image: registry.saas.hand-china.com/tools/zookeeper:3.4.10
    hostname: zookeeper-0
    environment:
    - ZK_REPLICAS=1
    - ZK_HEAP_SIZE=2G
    - ZK_TICK_TIME=2000
    - ZK_INIT_LIMIT=10
    - ZK_SYNC_LIMIT=5
    - ZK_MAX_CLIENT_CNXNS=60
    - ZK_SNAP_RETAIN_COUNT=3
    - ZK_PURGE_INTERVAL=1
    - ZK_LOG_LEVEL=INFO
    - ZK_CLIENT_PORT=2181
    - ZK_SERVER_PORT=2888
    - ZK_ELECTION_PORT=3888
    ports:
    - "2181:2181"
    - "2888:2888"
    - "3888:3888"
    command:
    - sh
    - -c
    - zkGenConfig.sh && exec zkServer.sh start-foreground
    volumes:
    - "./kafka/zk:/var/lib/zookeeper"
  kafka-0:
    container_name: kafka-0
    image: registry.cn-hangzhou.aliyuncs.com/choerodon-tools/kafka:1.0.0
    hostname: kafka-0
    depends_on:
    - zookeeper-0
    links:
    - zookeeper-0
    ports:
    - "9092:9092"
    command:
    - sh
    - -c
    - "/opt/kafka/bin/kafka-server-start.sh config/server.properties \
           --override zookeeper.connect=zookeeper-0:2181 \
           --override log.dirs=/opt/kafka/data/logs \
           --override broker.id=0 "
    volumes:
    - "./kafka/kafka:/opt/kafka/data"
  mysql:
    container_name: mysql
    image: registry.cn-hangzhou.aliyuncs.com/choerodon-tools/mysql:5.7.17
    hostname: mysql
    ports:
    - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: root
    volumes:
    - ./mysql/mysql_data:/var/lib/mysql
    - ./mysql/mysql_db.cnf:/etc/mysql/conf.d/mysql_db.cnf
    expose:
    - "3306"
  eureka-server:
    container_name: eureka-server
    hostname: eureka-server
    image: registry.cn-shanghai.aliyuncs.com/choerodon/eureka-server:0.6.0
    ports:
    - "8000:8000"
    links:
    - kafka-0
    environment:
    - spring.kafka.bootstrap-servers=kafka-0:9092
    - eureka.client.serviceUrl.defaultZone=http://127.0.0.1:8000/eureka/
    - eureka.client.register-with-eureka=false
    - eureka.client.fetch-registry=false
    - hystrix.stream.queue.enabled=false
    - spring.cloud.bus.enabled=false
    - spring.sleuth.stream.enabled=false
    - logging.level=WARN
    expose:
    - "8000"
  api-gateway:
    container_name: api-gateway
    image: registry.cn-shanghai.aliyuncs.com/choerodon/api-gateway:0.6.0
    links: 
    - eureka-server
    depends_on:
    - eureka-server
    ports:
    - "8080:8080"
    environment:
    - zuul.addHostHeader=true
    - zuul.routes.dev.path=/todo/**
    - zuul.routes.dev.serviceId=choerodon-todo-service
    - eureka.client.serviceUrl.defaultZone=http://eureka-server:8000/eureka/
    - hystrix.stream.queue.enabled=false
    - spring.cloud.bus.enabled=false
    - spring.sleuth.stream.enabled=false
    - logging.level=WARN
    expose:
    - "8080"
  gateway-helper:
    container_name: gateway-helper
    image: registry.cn-shanghai.aliyuncs.com/choerodon/gateway-helper:0.6.0
    depends_on:
    - eureka-server
    - mysql
    links: 
    - eureka-server
    - mysql
    ports:
    - "9180:9180"
    environment:
    - eureka.client.serviceUrl.defaultZone=http://eureka-server:8000/eureka/
    - spring.datasource.url=jdbc:mysql://mysql/iam_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
    - spring.datasource.username=root
    - spring.datasource.password=root
    - hystrix.stream.queue.enabled=false
    - spring.cloud.bus.enabled=false
    - spring.sleuth.stream.enabled=false
    - logging.level=WARN
  iam-service:
    container_name: iam-service
    image: registry.cn-shanghai.aliyuncs.com/choerodon/iam-service:0.6.0
    depends_on:
    - eureka-server
    - mysql
    - kafka-0
    links: 
    - eureka-server
    - mysql
    - kafka-0
    ports:
    - "8030:8030"
    environment:
    - eureka.client.serviceUrl.defaultZone=http://eureka-server:8000/eureka/
    - spring.kafka.bootstrap-servers=kafka-0:9092
    - spring.datasource.url=jdbc:mysql://mysql/iam_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
    - spring.datasource.username=root
    - spring.datasource.password=root
    - hystrix.stream.queue.enabled=false
    - spring.cloud.bus.enabled=false
    - spring.sleuth.stream.enabled=false
    - logging.level=WARN
  manager-service:
    container_name: manager-service
    image: registry.cn-shanghai.aliyuncs.com/choerodon/manager-service:0.6.0
    depends_on:
    - eureka-server
    - mysql
    - kafka-0
    links: 
    - eureka-server
    - mysql
    - kafka-0
    ports:
    - "8963:8963"
    environment:
    - spring.kafka.bootstrap-servers=kafka-0:9092
    - eureka.client.serviceUrl.defaultZone=http://eureka-server:8000/eureka/
    - spring.datasource.url=jdbc:mysql://mysql/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
    - spring.datasource.username=root
    - spring.datasource.password=root
    - hystrix.stream.queue.enabled=false
    - spring.cloud.bus.enabled=false
    - spring.sleuth.stream.enabled=false
    - logging.level=WARN
  oauth-server:
    container_name: oauth-server
    image: registry.cn-shanghai.aliyuncs.com/choerodon/oauth-server:0.6.0
    depends_on:
    - eureka-server
    - mysql
    links: 
    - eureka-server
    - mysql
    ports:
    - "8020:8020"
    environment:
    - eureka.client.serviceUrl.defaultZone=http://eureka-server:8000/eureka/
    - spring.datasource.username=root
    - spring.datasource.url=jdbc:mysql://mysql/iam_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
    - spring.datasource.password=root
    - hystrix.stream.queue.enabled=false
    - spring.cloud.bus.enabled=false
    - spring.sleuth.stream.enabled=false
    - logging.level=WARN
  manager-service:
    container_name: manager-service
    image: registry.cn-shanghai.aliyuncs.com/choerodon/manager-service:0.6.0
    depends_on:
    - eureka-server
    - mysql
    links: 
    - eureka-server
    - mysql
    environment:
    - eureka.client.serviceUrl.defaultZone=http://eureka-server:8000/eureka/
    - spring.datasource.username=root
    - spring.datasource.url=jdbc:mysql://mysql/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
    - spring.datasource.password=root
    - hystrix.stream.queue.enabled=false
    - spring.cloud.bus.enabled=false
    - spring.sleuth.stream.enabled=false
    - choerodon.swagger.oauth.url=http://oauth-server8020/oauth/oauth/authorize
    - choerodon.gateway.domain=http://api-gateway:8080
    - logging.level=WARN
    ports:
    - "8963:8963"
```

> 有关Docker的更多信息请见[此处](https://docs.docker.com/)

> 有关Docker-Compose的更多信息请见[此处](https://docs.docker.com/compose/overview/)