+++
title = "安装与配置"
description = ""
weight = 2
alwaysopen=false
+++

## 安装与配置

Choerodon 采用Spring Cloud作为微服务框架，运行在Docker上，以Kubernetes作为容器的编排工具。理论上讲只要服务器资源允许，只要可以运行Kubernetes，就可以在Kubernetes上运行Choerodon。由于Choerodon不是一个单体应用系统，而是一个包含多个微服务的分布式系统，所以安装相对比较复杂，目前，我们不提供基于源码的安装方式，仅提供基于Docker镜像的安装方式。

---
## 部署

在部署之前,我们先来看一下Choerodon的系统服务架构图。关于Choerodon的详细系统架构，请参考[系统架构](./../concept/choerodon-system-architecture)。

![](/img/docs/installation-configuration/choerodon-develop-infrastructure.svg)

其中，运行管理是属于运行区相关的主要服务，敏捷看板、移动开发、开发管理属于开发相关的主要服务。也就是说，我们在选择安装开发区和运行区的时候，可以根据这几个服务来决定。日志服务用来用来统一的管理和存储日志并为日后基于的分析提供基础，日志存储在elasticsearch集群中，由fluent-bit收集每个节点上的日志通过fluentd缓存之后发给elasticseach集群，kibana用以查看日志和界面搜索。监控服务监控Choerodon的各个服务，确保各个服务和基础组件处在正常的运行中，当其中某一组件运行异常时发送告警提醒。监控服务的核心是Prometheus，Prometheus主动收集各个服务提供的指标信息，经过加工汇总对比预警规则满足条件时发送预警信息给alertmanager，alertmanger可以配置人员邮箱接口等信息实现报警信息按条件发送给不同的人员。