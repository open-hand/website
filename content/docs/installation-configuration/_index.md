+++
title = "安装与配置"
description = "安装与配置"
date = 2018-03-30T13:06:38+08:00
draft = false
weight = 2
+++

## 安装与配置

Choerodon采用Spring Cloud作为微服务框架，运行在Docker上，以Kubernetes作为容器的编排工具。理论上只要服务器资源允许，可以运行Kubernetes，就可以运行Choerodon。Choerodon不是一个单体应用系统，而是一个包含多个微服务的分布式系统，所以安装相对比较复杂。目前，我们提供基于Helm的安装方式，以提高安装效率。

---

### 前置要求与约定

- 节点信息：
    - 系统版本：CentOS7.2及以上版本
    - CPU数量：4C
    - 内存信息：16G
    - 节点数量：4

> **注意：** 只要现有节点内存与CPU总和大于上述节点要求即可。

- 约定：安装教程以nfs类型的PV为例进行创建，所有非集群级对象都创建在`io-choerodon`命名空间下。

### 系统组件图

在部署之前,我们先来看一下Choerodon的系统组件图。关于Choerodon的详细系统架构，请参考[系统架构](./../concept/choerodon-system-architecture)。

<!-- ![](/img/docs/installation-configuration/choerodon-develop-infrastructure.svg) -->

<!-- 其中，运行管理是属于运行区相关的主要服务，敏捷看板、移动开发、开发管理属于开发相关的主要服务。也就是说，我们在选择安装开发区和运行区的时候，可以根据这几个服务来决定。日志服务用来用来统一的管理和存储日志并为日后基于的分析提供基础，日志存储在elasticsearch集群中，由fluent-bit收集每个节点上的日志通过fluentd缓存之后发给elasticseach集群，kibana用以查看日志和界面搜索。监控服务监控Choerodon的各个服务，确保各个服务和基础组件处在正常的运行中，当其中某一组件运行异常时发送告警提醒。监控服务的核心是Prometheus，Prometheus主动收集各个服务提供的指标信息，经过加工汇总对比预警规则满足条件时发送预警信息给alertmanager，alertmanger可以配置人员邮箱接口等信息实现报警信息按条件发送给不同的人员。 -->

### 开始部署

1. [Kubernetes集群部署](./kubernetes)
1. [Helm安装](./helm)
1. [Chartmuseum安装](./chartmuseum)
1. [Minio安装](./minio)
1. [Redis安装](./redis)
1. [Mysql安装](./mysql)
1. [Zookeeper安装](./zookeeper)
1. [kafka安装](./kafka)
1. [Harbor安装](./harbor)
1. [Gitlab安装](./gitlab)
1. [Gitlab安装](./gitlab)