+++
title = "使用的开源组件"
description = ""
weight = 5
+++

# Choerodon 使用的开源组件


Choerodon 完全基于开源产品打造。我们从两个方面来叙述Choerodon使用的开源产品或者工具。其一，Choerodon的本身是使用Spring Cloud作为微服务架构，运行在Docker上，同时使用Kubernetes作为容器管理和编排工具；其二，它以DevOps为理论指导，实现了敏捷的最佳实践。 以下我们从两个方面来阐述Choerodon使用了哪些开源产品和工具：

## 微服务应用框架使用的开源工具集


Choerodon 的微服务应用系统架构由五个不同的层组成，从应用程序代码到所需运行平台和连接服务。这些应用程序和服务通过一致的调度和编排和监督进行管理，所有这些应用程序和服务都运行在K8s提供的运行环境上。

![](/img/docs/concept/system-component.png)


### 应用前端

Choerodon前端使用react和mobx。

核心组件有：

- **React**。React 是一个用于构建用户界面的 JAVASCRIPT 库。

- **Mobo**。Mobx是一个功能强大，上手非常容易的状态管理工具。

### 微服务后端

Choerodon的微服务后端采用Spring Cloud作为微服务框架，使用Spring Boot作为开发脚手架。

核心组件有：

- **Spring Cloud**。Spring Cloud是一个集成了众多开源的框架，利用Spring Boot的开发便利性实现了服务治理、服务注册与发现、负载均衡、数据监控，REST API发布方式等，基本囊括了分布式框架所需要的所有功能。是一套易开放、易部署、易维护的分布式开发工具包。

- **Spring Boot**。Spring Boot是由Pivotal团队提供的全新框架，其设计目的是用来简化新Spring应用的初始搭建以及开发过程。该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。

### 消息中间件

Choerodon使用Kafka作为消息中间件。

核心组件有：

- **Kafka**。Kafka是由Apache软件基金会开发的一个开源流处理平台，由Scala和Java编写。Kafka是一种高吞吐量的分布式发布订阅消息系统，它可以处理消费者规模的网站中的所有动作流数据。

### 数据服务层

Choerodon采用MySQL作为关系型数据存储库，Redis作为缓存库。

核心组件有：

- **MySQL**。Mysql是最流行的开源关系型数据库管理系统。
- **Redis**。Redis是一个开源的使用ANSI C语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API

### 运行环境

Choerodon运行在Docker上。

核心组件有：

- **Docker**。Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。

### 容器编排


Choerodon使用Kubernetes作为容器编排和管理工具。

核心组件有：

- **Kubernetes**。Kubernetes是一个开源平台,用于跨主机群集自动部署,扩展和操作应用程序容器,提供以容器为中心的基础架构。

## DevOps平台使用的开源工具集


自动化是整个DevOps实现的核心，对应生命周期的每个阶段都可以选择开源工具框架。将DevOps工具集环境作为整体服务交付是一件非常有挑战的事情。Choerodon融合了多个DevOps的开源工具，并且结合自身的能力。DevOps不同阶段的工具使用不同的编程语言开发，需要不同的运行环境(OS、数据库、中间件服务器等)。我们选取了如下的工具集的组合来落地实施DevOps，并且通过Choerodon平台融合能力，将不同的工具融合到Choerodon的DevOps流程中，用户仅需简单的配置即可使用，开始敏捷迭代之旅。

![](/img/docs/concept/devops-opensource-component.png)

### 计划

Choerodon使用自主开发的敏捷管理开完成DevOps的计划步骤的工作。Choerodon敏捷管理的核心是需求，计划和执行。即通过用户故事地图来管理用户故事和发布计划，通过迭代来管理冲刺，最后通过看板来可视化冲刺的执行。

![](/img/docs/concept/choerodon-devops.png)

核心组件有：

- **用户故事地图**。Choerodon的用户故事地图可以将你的backlog变成一张二维地图，而不是传统的简单列表。
- **迭代**。迭代可以计划冲刺的用户故事数量、故事点、工时，并且拆分用户故事等。
- **看板**。Choerodon的看板是Choerodon敏捷管理中执行部分，它的核心作用是可视化整个迭代的计划执行，并且暴露开发执行过程中的短板或者瓶颈

关于敏捷管理的详情，请参考[敏捷管理](#)。

### 编码

Choerodon采用主流的Git和Gitlab作为代码的管理和托管工具，同时使用Maven作为项目代码的组织和管理工具。

核心组件有：

- **Git**。Git是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。

- **Gitlab**。GitLab 是一个基于 Git 的仓库管理程序,也是一个方便软件开发的强大完整应用。

- **Maven**。Maven项目对象模型(POM)，可以通过一小段描述信息来管理项目的构建，报告和文档的软件项目管理工具

### 构建

Choerodon在构建阶段，采用Gitlab CI作为持续集成工具，Harbor作为镜像的存放库，同时Choerodon融合了Gitlab CI和Harbor这两个工具，以实现自动化和版本的控制。

- **Gitlab CI**。Gitlab CI是Gitlab提供的一个持续集成工具。主要通过.gitlab-ci.yml 配置文件管理CI过程。

- **Harbor**。Harbor 是一个企业级的 Docker Registry，可以实现 images 的私有存储和日志统计权限控制等功能，并支持创建多项目。

### 测试

Choerodon采用多个代码检查和测试工具，其中，SonarQube作为自动化代码检查工具；JUnit作为后端Java代码的测试工具； Selenium作为前端测试的工具。

核心组件有：

- **SonarQube**。SonarQube是一个用于代码质量管理的开源平台，用于管理源代码的质量，可以从七个维度检测代码质量搜索。通过插件形式，可以支持包括java,C#,C/C++,PL/SQL,Cobol,JavaScrip,Groovy等等二十几种编程语言的代码质量管理与检测

- **JUnit**。JUnit是一个Java语言的单元测试框架。

- **Selenium**。Selenium 是一套完整的web应用程序测试系统，包含了测试的录制（selenium IDE）,编写及运行（Selenium Remote Control）和测试的并行处理（Selenium Grid）。

### 部署和运营

Choerodon融合使用Docker、Kubernetes和Harbor作为部署工具。

核心组件有：

- **Docker**。Docker是一个开源的引擎,可以轻松的为任何应用创建一个轻量级的、可移植的、自给自足的容器。

- **Kubernetes**。Kubernetes是一个开源平台,用于跨主机群集自动部署,扩展和操作应用程序容器,提供以容器为中心的基础架构。

- **Harbor**。Harbor 是一个企业级的 Docker Registry，可以实现 images 的私有存储和日志统计权限控制等功能，并支持创建多项目。

### 监控

Choerodon的监控包括了从用户故事开始到服务的运营全生命周期的状态、反馈、监控等，帮助开发和运营管理更好的提升效能。

核心组件有：

- **Zipkin**。Zipkin为分布式链路调用监控系统,聚合各业务系统调用延迟数据,达到链路调用监控跟踪。

- **Grafana**。Grafana 是一个开箱即用的可视化工具，具有功能齐全的度量仪表盘和图形编辑器，有灵活丰富的图形化选项，可以混合多种风格，支持多个数据源特点。

- **Promethues**。Promethues是由 SoundCloud 开发的开源监控报警系统和时序列数据库(TSDB)。

- **Micrometer**。Micrometer 是一个监控指标的度量类库。
