+++
title = "项目结构规范"
description = ""
weight = 6
home = true
+++

# 项目结构规范
---
## 服务划分

### 单个整体架构设计：

![](/docs/practice-specification-reference/development/Developmen-to-micro-services/image/app.png)

### APP层：
主要用于用户显示信息，处理用户发送的`Restful`请求信息（用户命令），并将信息传递给`Application`层的接口。

 - 包含`controller`(接口定义)，`eventhandler`(接收消息队列消息)，`dto`(传输对象定义)，`service`(业务逻辑)，`validator`(数据校验定义)。

不同版本的接口放在不同的`controller`子包中。例如:v1，v2等。

### 实体层：
主要为服务的实体类定义，一般为与数据表结构对应。

### 基础设施层：
向其他层提供通用的技术能力，为APP传递消息，提供持久化机制等等。基础设施层还能够通过架构框架来支持层次间的交互模式。

 - 主要包括：`mapper`(用于数据库调用)，`feign`(用于调用其他微服务)，`message`(调用消息队列，如使用kafkaTemplate发送消息到kafka)，`utils`(工具类的定义)。