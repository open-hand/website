+++
title = "应用环境搭建"
description = " "
weight = 1
+++

# 应用环境搭建

Choerodon猪齿鱼平台是一个PaaS平台，其本身不提供应用系统的运行环境，用户需要自主安装Kubernetes集群，一般来说一个应用系统需要有开发环境、测试环境和正式环境（如下图所示），每一个环境都是一个独立的Kubernetes集群。当然用户也可以根据具体的需求来调整，例如开发环境和测试环境共用一套Kubernetes集群。

![enter description here](/docs/transference-guide/image/setup-application-environment.png)

所以，利用Choerodon猪齿鱼PaaS能力的第一项任务就是 **搭建应用系统的运行环境。**

## 准备服务器

Choerodon猪齿鱼支持本地化部署，也支持公用云部署。Kubernetes集群的硬件要求与应用系统的要求一致，当然考虑到应用系统已经完全容器化，所以用户可以根据自身需求动态定制Kubernetes集群的规模（使用公有云可以非常方便的做到这一点）。

以下表格是一个最低配置要求。

| 系统 | 配置    | 数量 | 用途 | 说明 |
| -------- | ----- | ----- | ----- | ----- |
|CentOS7.2+|2Core 4G内存 512G硬盘 |1|NFS文件服务器|  |
|CentOS7.2+   | 4Core 16G内存 64G硬盘 | 3| k8s集群 |根据自身应用规模增加或减少节点个数|

<font color=#f96e57 > 另外，服务器网络需能连接外网，能够与Choerodon猪齿鱼系统连接。还有，操作系统要求是Centos 7.2及以上版本。
</font>

## 安装Kubernetes集群

Kubernetes集群的安装采用标准安装方式即可，Choerodon猪齿鱼整理了详细方便的[Kubernetes安装文档](../../installation-configuration/steps/kubernetes)，可供参考。用户可以根据自身需求选择。

> 1.Choerodon猪齿鱼整理了详细方便的[Kubernetes安装文档](../../installation-configuration/steps/kubernetes)。

> 2.在安装时，请详细阅读安装文档前部分，其中涉及到前置要求与约定、防火墙及端口检测、同步服务器时区和同步服务器时间等。

## 下一步

[**数据库迁移**](../database-migration)