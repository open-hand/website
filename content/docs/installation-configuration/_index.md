+++
title = "安装与配置"
description = ""
weight = 2
+++

### 安装概述
---
Choerodon 采用Spring Cloud作为微服务框架，运行在Docker上，以Kubernetes作为容器的编排工具。理论上讲只要服务器资源允许，只要可以运行Kubernetes，就可以在Kubernetes上运行Choerodon。由于Choerodon不是一个单体应用系统，而是一个包含多个微服务的分布式系统，所以安装相对比较复杂，目前，我们不提供基于源码的安装方式，仅提供基于Docker镜像的安装方式。

根据Choerodon的系统架构，Choerodon有两个类型的部署，即开发区和运行区。作为**应用的开发平台**，可以安装开发区；作为**应用的运行平台**，可以仅安装运行区；

### 部署
---
由于Choerodon存在开发区和运行区的概念，用户可以根据自身的情况来决定采用哪一种方式。为了能够更加清晰的说明Choerodon的部署方式，下面我们将这两种不同的部署方式分别说明。在这之前，我们先来看一下Choerodon的系统服务架构图。关于Choerodon的详细系统架构，请参考[系统架构](../../concept/choerodon-system-architecture)。

![](/img/docs/installation-configuration/choerodon-develop-infrastructure.svg)

其中，运行管理是属于运行区相关的主要服务，敏捷看板、移动开发、开发管理属于开发相关的主要服务。也就是说，我们在选择安装开发区和运行区的时候，可以根据这几个服务来决定。日志服务用来用来统一的管理和存储日志并为日后基于的分析提供基础，日志存储在elasticsearch集群中，由fluent-bit收集每个节点上的日志通过fluentd缓存之后发给elasticseach集群，kibana用以查看日志和界面搜索。日志的数据流转和安装文档详见[此处](../components/日志)。监控服务监控Choerodon的各个服务，确保各个服务和基础组件处在正常的运行中，当其中某一组件运行异常时发送告警提醒。监控服务的核心是Prometheus,Prometheus主动收集各个服务提供的指标信息，经过加工汇总对比预警规则满足条件时发送预警信息给alertmanager，alertmanger可以配置人员邮箱接口等信息实现报警信息按条件发送给不同的人员。关于监控架构和安装文档详见[此处](../components/监控)。

#### 部署开发区
---
开发区包含了与开发相关的服务，用户可以使用此作为应用程序的开发平台。整个开发区部署在一个Kubernetes集群上，用户可以使用敏捷看板、移动开发、开发管理属于开发相关服务。开发区最终提交的结果是存储在Gitlab上的代码，当然可以选择是否生成Harbor镜像和相关部署文件。


关于如何安装和配置开发区，请参考[开发区安装文档](../deployment-install-guide)。


#### 部署运行区
---
运行区包含了与运行相关的服务，用户可以使用此作为应用程序的运行平台。整个开发区部署在一个Kubernetes集群上，用户可以手工的将生成的docker镜像和部署文件，部署到运行区。

关于如何安装和配置运行区，请参考[运行区安装文档](../deployment-install-guide)。
