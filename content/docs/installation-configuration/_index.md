+++
title = "部署与配置"
description = "从安装要求，步骤，升级指南，启停，卸载等详细描述了Choeroodn的部署与安装"
date = 2018-03-30T13:06:38+08:00
weight = 2
icon = "/img/docs/doc-home/installation-configuration.svg"
home = true
+++

## Choerodon 系统部署架构

Choerodon 猪齿鱼作为一套 PaaS 平台，目前对于通过 Choerodon 开发部署的应用系统有多种部署方式，并且由于 Choerodon 现在仅支持基于 Kubernetes 部署的应用系统，所以，部署方式根据 Kubernetes 集群不同而不同。

---

## 系统部署架构图

<img src="/docs/installation-configuration/image/choerodon.png" />

## 单Kubernetes集群部署

Choerodon 与应用系统部署在一个 Kubernetes 集群中。可以在一个 Kubernetes 集群中安装应用系统的开发环境、测试环境以及正式环境。

## 多Kubernetes集群部署

Choerodon 与应用系统开发环境部署在同一个 Kubernetes 集群中，应用系统的测试环境和正式环境则分别部署到单独的一个Kubernetes集群中。

<img src="/docs/installation-configuration/image/logic.png" />

{{< note >}}
1. 以上部署方式是其中一种，用户根据自身的实际条件选择合适的Kubernetes集群部署方式。
1. 应用系统开发环境、应用系统测试环境、应用系统正式环境，并不是唯一的规划方式，用户同样可以根据自身的实际情况进行调整。例如，服务器资源紧张，可以选择只搭建应用系统开发环境或应用系统正式环境。
{{< /note >}}