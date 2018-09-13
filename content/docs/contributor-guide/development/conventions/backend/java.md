+++
title = "Java 开发"
description = "Java 开发中文件结构及基本规范"
weight = 1
+++

## 后端文件结构规范

Choerodon 的微服务，采用DDD 的设计思想，整体架构如下图所示：

![framework_structure](/cimg/framework_structure.jpg)

从上往下整体分为四层：

### 展现层：
主要用于用户显示信息，处理用户发送的restful请求信息（用户命令），并将信息传递给应用层的接口。这里指的用户可以是另一个计算机系统，不一定是使用用户界面的人。

在本系统实现程序上主要包括：

- **controller**  接受用户restful请求
- **dto** 封装用户请求的数据信息
- **validator** 验证用户请求信息的合法性
- **eventhandler** 领域事件接收处理器

### 应用层：
完成展现层指定的任务，并且调用领域对象或服务来解决问题。这一层所负责的工作对业务来说意义重大，也是与其它系统的应用层进行交互的必要渠道。应用层要尽量简单，不包含业务规则或者知识，而只为下一层中的领域对象协调任务，分配工作，使它们互相协作。
在本系统实现程序上主要包括：

- **service**  调用领域对象或服务来解决问题，应用层Service主要有以下特性：

```
1. 负责事务处理，所以事务的注解可以在这一层的service中使用。
2. 只处理非业务逻辑，重点是调度业务处理流程。业务逻辑处理一定要放在领域层处理。
3. 不做单元测试，只做验收测试。
4. 可能会有比较多的依赖组件(领域服务)，使用field注入依赖的组件。
5. 方法要求无状态，只接受dto和元数据类型作为参数。
```

### 领域模型层：

负责表达业务概念，业务状态信息以及业务规则。尽管保存业务状态的技术细节是由基础设施层实现的，但是反映业务情况的状态是由本层控制并且使用的。领域层是业务软件的核心，领域模型位于这一层。

在本系统实现程序上主要包括：

- entity
- convertor
- event
- reposity

### 基础设施层：
向其他层提供通用的技术能力，为应用层传递消息，为领域层提供持久化机制，为用户界面层绘制屏幕组件，等等。基础设施层还能够通过架构框架来支持四个层次间的交互模式。
在本系统实现程序上主要包括：

- mapper
- dataobject
- fegin
- common
- config

## Java 开发规范

Choerodon 的后端主要以Java 为主，您所开发的Java 程序需要符合SonarQube的规范检查和CheckStyle的规范检查：

* SonarQube 的规范检查：SonarQube提供了代码检查的能力，可以通过SonarQube 显示程序的运行状态和质量。你可以修复漏洞，系统地提高代码质量。Choerodon 目前使用sonarlint作为SonarQube的检查。
* CheckStyle 的规范检查：Checkstyle是一个帮助程序员编写Java代码，提供了统一编码标准的开发工具。在此可阅读Choerodon 提供的CheckStyle 文件。[choerodon_checkStyle.xml](../choerodon_checks.xml)


## 其他规范

- [SonarQube规范检查规则](https://rules.sonarsource.com/java/RSPEC-3281)
- [GoogleCheck规范检查规则](http://checkstyle.sourceforge.net/google_style.html)
- [Alibaba p3c代码规范](https://github.com/alibaba/p3c)