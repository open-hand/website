+++
title = "快速入门"
weight = 3
alwaysopen=false
description = "从使用敏捷管理工具入手，结合前后端开发示例，详细介绍了如何使用Choerodon"
icon = "/img/docs/doc-home/quick-start.svg"
home = true
+++

## 快速入门
Choerodon 猪齿鱼是一个开源企业服务平台，帮助企业实现敏捷化的应用交付和自动化的运营管理。在本节快速入门中，将分别从管理者、项目经理和项目成员的角度让您快速进入Choerodon 的操作。

## 前置条件
- Choerodon 使用 Kubernetes 来管理和部署服务。关于 Kubernetes，请参考 [Kubernetes](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/) 概览。
- 系统用户必须具有Choerodon平台的角色，才能根据角色权限进行Choerodon的使用。所以，在使用Choerodon之前，如果您是管理者或者项目经理，您需要为您的用户分配项目所有者等角色。关于角色管理，请参阅用户手册中[角色管理](../user-guide/system-configuration/platform/role/)。
- 本文档中不包含Choerodon功能理论等相关知识，如果要深入的了解Choerodon相关的知识，您可以阅读[用户手册](../user-guide/)，或参加相关的培训。

## 权限了解
角色|平台角色|权限描述
---|---|---|
管理者|平台管理员、组织管理员|平台管理员：对平台中的全局的事务进行管理。组织管理员：对组织下的事务进行管理、监控。|
项目经理|项目所有者|项目所有者：对项目中的事务进行管理。|
项目成员|项目成员、组织成员|项目成员（环境成员）：对项目中的应用、部署进行操作管理。组织成员：组织下的成员。项目成员（非环境成员）：项目下的普通成员。|

{{< docdir >}}
