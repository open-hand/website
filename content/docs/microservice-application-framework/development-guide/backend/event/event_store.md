+++
title = "事件系统"
date = "2017-11-17"
draft = false
+++

> 共支持四种消息队列: kafka, rabbitmq, rocketmq, redis的pub/sub

### 克隆项目
```
git clone https://rdc.hand-china.com/gitlab/HAPCloud/hap-event-store-service.git
```

### 创建用户和数据库

* 进入MySQL命令行，执行以下命令

```sql
CREATE USER 'hapcloud'@'%' IDENTIFIED BY "handhand";
CREATE DATABASE hap_event_service DEFAULT CHARACTER SET utf8;
GRANT ALL PRIVILEGES ON hap_event_service.* TO hapcloud@'%';
FLUSH PRIVILEGES;
```

### 初始化数据库

* Linux/Mac 用户直接执行以下命令
* Windows 用户使用 git bash 或其他类 bash 环境执行

```
sh init-local-database.sh
```

### 配置使用的消息队列类型

```
修改EventStoreApplication上的@MessageQueue(QueueType.kafka)。
支持kafka,rabbitmq,rocketmq,redis的pub/sub四种
```

## 接口使用
- **创建事件**

```
接口: POST /v1/events/
参数: Event的json形式
返回值: Event的uuid(string类型)
Event实体内容：
public class Event {
   private String uuid;
   private String type;
   //发布事件的服务的serviceId,例如hap-user-service
   private String publisherServiceId;
   private List<Message> messages;
   
   public static class Message {
       /**
        * 要发送给消息队列的通道名
        */
       private String topicName;
       /**
        * 要发送给消息队列的消息内容(json格式)
        */
       private String payload;
   }
 }
```

- **确认事件**：业务服务执行完毕，向本服务发送确认事件请求
```
接口: PUT /v1/events/{eventId}/confirm
```

- **取消事件**：业务服务执行失败，回滚事务，并向本服务发送取消事件请求
```
接口: PUT /v1/events/{eventId}/cancel
```

- **向业务服务接口查询事件状态**：会根据创建Event的publisherServiceI向业务接口查询事件状态.

```
    业务服务需要提供的接口为GET /v1/api/eventRecords/{eventId}/{type}
    查询接口返回值应为两种
    1. **finished**: 事件已完成
    2. **detached**: 事件已取消
```