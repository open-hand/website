+++
title = "使用的开源组件"
description = "从微服务应用框架和DevOps平台使用的开源工具集两个方面来介绍Choerodon使用的开源产品或者工具"
weight = 5
icon ="icon-opensource-component"
+++

# Choerodon 使用的开源组件


Choerodon 完全基于开源产品打造。我们从两个方面来叙述 Choerodon 使用的开源产品或者工具。其一，Choerodon 的本身是使用 Spring Cloud 作为微服务架构，运行在 Docker 上，同时使用 Kubernetes 作为容器管理和编排工具；其二，它以 DevOps 为理论指导，实现了敏捷的最佳实践。以下我们从两个方面来阐述 Choerodon 使用了哪些开源产品和工具：

## 微服务应用框架使用的开源工具集


Choerodon 的微服务应用系统架构由五个不同的层组成，从应用程序代码到所需运行平台和连接服务。这些应用程序和服务通过一致的调度、编排和监督进行管理，所有这些应用程序和服务都运行在 K8s 提供的运行环境上。

![](/img/docs/concept/system-component-1.png)


### 应用前端

Choerodon 前端使用 React 和 Choerodon UI Pro。

核心组件有：

- **React**：React 是一个用于构建用户界面的 JAVASCRIPT 库。

- **Choerodon UI Pro**：Choerodon UI Pro 自研 DataSet 数据源，基于 DataSet 结合组件，实现数据驱动，符合低代码理念，专为中后台企业项目提高开发效率而生。

### 微服务后端

Choerodon 的微服务后端采用 Spring Cloud 作为微服务框架，使用 Spring Boot 作为开发脚手架。

核心组件有：

- **Spring Cloud**：Spring Cloud 是一个集成了众多开源的框架，利用 Spring Boot 的开发便利性实现了服务治理、服务注册与发现、负载均衡、数据监控，REST API 发布方式等，基本囊括了分布式框架所需要的所有功能。是一套易开放、易部署、易维护的分布式开发工具包。

- **Spring Boot**：Spring Boot 是由 Pivotal 团队提供的全新框架，其设计目的是用来简化新 Spring 应用的初始搭建以及开发过程。该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。

### 数据服务层

Choerodon 采用 MySQL 作为关系型数据存储库，Redis 作为缓存库。

核心组件有：

- **MySQL**：Mysql 是最流行的开源关系型数据库管理系统。
- **Redis**：Redis 是一个开源的使用 ANSI C 语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value 数据库，并提供多种语言的 API。

### 运行环境

Choerodon 运行在 Docker 上。

核心组件有：

- **Docker**：Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。

### 容器编排


Choerodon 使用 Kubernetes 作为容器编排和管理工具。

核心组件有：

- **Kubernetes**：Kubernetes 是一个开源平台，用于跨主机群集自动部署，扩展和操作应用程序容器，提供以容器为中心的基础架构。

## DevOps 平台使用的开源工具集


自动化是整个 DevOps 实现的核心，对应生命周期的每个阶段都可以选择开源工具框架。将 DevOps 工具集环境作为整体服务交付是一件非常有挑战的事情。Choerodon 融合了多个 DevOps 的开源工具，并且结合自身的能力。DevOps 不同阶段的工具使用不同的编程语言开发，需要不同的运行环境(OS、数据库、中间件服务器等)。我们选取了如下的工具集的组合来落地实施 DevOps，并且通过 Choerodon 平台融合能力，将不同的工具融合到 Choerodon 的 DevOps 流程中，用户仅需简单的配置即可使用，开始敏捷迭代之旅。

![](/img/docs/concept/devops-opensource-component-1.png)

### 计划

Choerodon 使用自主开发的敏捷管理完成 DevOps 的计划步骤的工作。Choerodon 敏捷管理的核心是需求，计划和执行。即通过用户故事地图来管理用户故事和发布计划，通过迭代来管理冲刺，最后通过看板来可视化冲刺的执行。

![](/img/docs/concept/choerodon_devops.png)

核心组件有：

- **用户故事地图**：Choerodon 的用户故事地图可以将你的 Backlog 变成一张二维地图，而不是传统的简单列表。
- **迭代**：迭代可以计划冲刺的用户故事数量、故事点、工时、拆分用户故事等。
- **看板**：Choerodon 的看板是 Choerodon 敏捷管理中执行部分，它的核心作用是可视化整个迭代的计划执行，并且暴露开发执行过程中的短板或者瓶颈。

### 编码

Choerodon 采用主流的 Git 和 Gitlab 作为代码的管理和托管工具，同时使用 Maven 作为项目代码的组织和管理工具。

核心组件有：

- **Git**：Git 是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。

- **Gitlab**：GitLab 是一个基于 Git 的仓库管理程序，也是一个方便软件开发的强大完整应用。

- **Maven**：Maven 项目对象模型(POM)，可以通过一小段描述信息来管理项目的构建，报告和文档的软件项目管理工具。

- **Choerodon UI Pro**：Choerodon UI Pro 自研 DataSet 数据源，基于 DataSet 结合组件，实现数据驱动，符合低代码理念，专为中后台企业项目提高开发效率而生。

### 构建

Choerodon 在构建阶段，采用 Gitlab CI 作为持续集成工具，Harbor 作为镜像的存放库，同时 Choerodon 融合了 Gitlab CI 和 Harbor 这两个工具，以实现自动化和版本的控制。

- **Gitlab CI**：Gitlab CI 是 Gitlab 提供的一个持续集成工具。主要通过 .gitlab-ci.yml 配置文件管理 CI 过程。

- **Harbor**：Harbor 是一个企业级的 Docker Registry，可以实现 images 的私有存储和日志统计权限控制等功能，并支持创建多项目。

- **Nexus**：Nexus是Maven的仓库管理器，用来搭建一个本地仓库服务器，这样做的好处便于管理，节约网络资源， 速度快，可以通过SNAPSHOT版本控制，开进行模块间的高效依赖开发。

- **ChartMuseum**：ChartMuseum 是一个用Go（Golang）编写的开源Helm Chart Repository服务器。

### 测试

Choerodon 采用多个代码检查和测试工具，其中，SonarQube 作为代码质量检测工具；Spock 作为后端 Java 代码的测试工具；Selenium 作为前端测试的工具。

核心组件有：

- **SonarQube**：SonarQube 是一个开源的代码分析平台, 用来持续分析和评测项目源代码的质量。

- **Spock**：Spock 是一个 Java 语言的单元测试框架。

- **JMeter**：JMeter是Apache组织开发的基于Java的压力测试工具。

- **Selenium**：Selenium 是一套完整的 web 应用程序测试系统，包含了测试的录制（selenium IDE），编写及运行（Selenium Remote Control）和测试的并行处理（Selenium Grid）。

### 部署和运营

Choerodon 融合使用 Docker、Kubernetes 和 Harbor 作为部署工具。

核心组件有：

- **Docker**：Docker 是一个开源的引擎，可以轻松的为任何应用创建一个轻量级的、可移植的、自给自足的容器。

- **Kubernetes**：Kubernetes 是一个开源平台，用于跨主机群集自动部署，扩展和操作应用程序容器，提供以容器为中心的基础架构。

- **Helm**：Helm 是一个命令行下的客户端工具。主要用于 Kubernetes 应用程序 Chart 的创建、打包、发布以及创建和管理本地和远程的 Chart 仓库。

### 监控

Choerodon 的监控包括了从用户故事开始到服务的运营全生命周期的状态、反馈、监控等，帮助开发和运营管理更好的提升效能。

核心组件有：

- **Loki**：Loki 是 Grafana Labs 团队最新的开源项目，是一个水平可扩展，高可用性，多租户的日志聚合系统。

- **Grafana**：Grafana 是一个开箱即用的可视化工具，具有功能齐全的度量仪表盘和图形编辑器，有灵活丰富的图形化选项，可以混合多种风格，支持多个数据源特点。

- **Promethues**：Promethues 是由 SoundCloud 开发的开源监控报警系统和时序列数据库(TSDB)。

- **SkyWalking**：分布式系统的应用程序性能监视工具，专为微服务、云原生架构和基于容器（Docker、K8s、Mesos）架构而设计。提供分布式追踪、服务网格遥测分析、度量聚合和可视化一体化解决方案。