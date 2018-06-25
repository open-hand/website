+++
title = "部署与配置"
description = "部署与配置"
date = 2018-03-30T13:06:38+08:00
draft = false
weight = 2
+++

## Choerodon 系统部署架构

Choerodon猪齿鱼作为一套PaaS平台，目前对于通过Choerodon开发部署的应用系统有多种部署方式，并且由于Choerodon现在仅支持基于Kubernetes部署的应用系统，所以，部署方式根据Kubernetes集群不同而不同。

---

## 系统部署架构图

<img src="/docs/installation-configuration/image/choerodon.png" />

## 单Kubernetes集群部署

Choerodon与应用系统部署在一个Kubernetes集群中。可以在一个Kubernetes集群中安装应用系统的开发环境、测试环境，以及正式环境。

## 多Kubernetes集群部署
Choerodon与应用系统开发环境部署在同一个Kubernetes集群中，应用系统测试环境部署到单独一个Kubernetes集群中，应用系统正式环境部署到单独一个Kubernetes集群中。
<img src="/docs/installation-configuration/image/logic.png" />

{{< note >}}
1. 以上部署方式是其中一种，用户根据自身的实际条件选择合适的Kubernetes集群部署方式；
1. 应用系统开发环境、应用系统测试环境、应用系统正式环境，并不是唯一的规划方式，用户同样可以根据自身的实际情况进行调整，例如，服务器资源紧张，可以选择只搭建应用系统开发环境和应用系统正式环境。
{{< /note >}}