+++
title = "event-consumer-helper"
date = "2017-11-17"
draft = false
+++

### 添加hap-event-consume-helper依赖
```xml
<dependency>
  <groupId>com.hand.hap.cloud</groupId>
  <artifactId>hap-event-consume-helper</artifactId>
  <version>1.0.0-Release</version>
</dependency>
```

### 设置使用的消息队列
- **kafka**

```
1. 运行主类添加MessageQueue注解
@MessageQueue(value = QueueType.kafka)

2. 添加kafka的依赖
<dependency>
    <groupId>org.apache.kafka</groupId>
    <artifactId>kafka-clients</artifactId>
    version>0.11.0.1</version>
</dependency>

3. yaml配置kafka
event:
  consumer:
    kafka:
      bootstrap-servers: 10.211.109.185:9092
      session-timeout-ms: 30000
      max-poll-records: 500
      heartbeat-interval-ms: 3000
      fetch-max-bytes: 52428800
      fetch-max-wait-ms: 500
```
- **rabbitmq**

```
1. 运行主类添加MessageQueue注解
@MessageQueue(value = QueueType.rabbitmq)

2. 添加rabbitmq的依赖
 <dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-stream-rabbit</artifactId>
    <version>1.2.0.RELEASE</version>
 </dependency>

3. yaml配置rabbitmq
spring:
  rabbitmq:
    host: localhost
    port: 5672
```
- **rocketmq**

```
1. 运行主类添加MessageQueue注解
@MessageQueue(value = QueueType.rocketmq)

2. 添加rocketmq的依赖
<dependency>
    <groupId>org.apache.rocketmq</groupId>
    <artifactId>rocketmq-client</artifactId>
    <version>RELEASE</version>
</dependency>

3. yaml配置rocketmq
event:
  consumer:
    rocketmq:
      namesrv-addr: 127.0.0.1:9876
      consume-thread-min: 1
      consume-thread-max: 2
```
- **redis**

```
1. 运行主类添加MessageQueue注解
@MessageQueue(value = QueueType.redis)

2. 添加redis的依赖
 <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

3. yaml配置redis
spring:
  redis:
    host: localhost
    port: 6379
```

### **@Topic**接收消息
```java
1. value: 订阅的topic名称
2. retryTimes： 方法失败后自动重试的次数
3. firstInterval： 第一次重试间隔(毫秒)
4. retryInterval： 每次重试的间隔(毫秒)
5. afterRetryFailedHandler： 消息重试全都失败之后的处理逻辑
@Service
public class TopicTestService {
    
    @Topic(value = "foo",
            retryTimes = 15,
            firstInterval = 5000,
            retryInterval = 2000,
            afterRetryFailedHandler = StockMsgFailedHandler.class)
    public void executeMsg(String msg){
        System.out.println("message "+msg);
    }
}

@Service
public class StockMsgFailedHandler implements AfterRetryFailedHandler {

    @Override
    public void handleMsg(String msg) {
        //执行消息重试15次失败之后的操作
       System.out.println("msg "+msg);
    }
}
``` 

### **MessageQueue**的配置
```java
@MessageQueue(value = QueueType.kafka,
        enableDuplicateRemoveByUuid = false,
        enableTransaction = true,
        enableCache = false)

1. value： 指明消息队列类型，支持kafka，rabbitmq，rocketmq，redis pub/sub 四种。
2. enableTransaction： 是否启用事务，启用之后@Topic声明的方法会封装数据库事务，任何异常会回滚。
3. enableCache： 是否启用缓存，启用之后消息失败写入缓存刷入硬盘，即使宕机消息也不会丢失。
4. enableDuplicateRemoveByUuid： 是否启用去重，启用后。
```

### **注意**
- 每条消息中请确保拥有**uuid**字段
- 启用**enableDuplicateRemoveByUuid**后，确保有数据库中**msg_record**表

```sql
DROP TABLE IF EXISTS `msg_record`;
CREATE TABLE `msg_record` (
  `uuid` varchar(255) NOT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
---

## demo
- [hap-event-demo-user-service](https://rdc.hand-china.com/gitlab/HAPCloud/hap-event-demo-parent/tree/master/hap-event-demo-user-service)