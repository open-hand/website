+++
title = "1.入门必读"
description = ""
weight = 1
+++

# 入门必读

## 前置条件
已部署安装Choerodon 猪齿鱼，并使用默认的 admin 用户名和密码登录了 Choerodon 系统。

## 系统层级概要
目前，Choerodon 中一共有三个层级，包括全局层、组织层和项目层，层级关系如下图所示，即一个 Choerodon 平台中可以创建多个组织，而每个组织，可以创建多个项目，项目中包含精益敏捷、持续交付、容器环境、微服务、DevOps等能力。全局层、组织层和项目层中，默认有多个不同的内置角色。

关于组织层次的具体信息，请查看[组织层次](http://choerodon.io/zh/docs/concept/choerodon-org/)。

通过下图您可以更清楚地了解本系统层级的逻辑：

![image](/docs/quick-start/image/organization.png)

## 基础角色权限说明

- 全局层：

角色|角色编码|菜单|权限
| --- | --- | --- | --- |
平台管理员|role/site/default/administrator|平台层所有菜单|全部操作权限|
平台开发者|role/site/default/developer|任务调度|全部操作权限|
|||事务管理|全部操作权限|
|||任务管理|全部操作权限|
|||运营|`微服务实例`、`接口`、`API统计`的全部操作权限|

- 组织层：

角色|角色编码|菜单|功能
| --- | --- | --- | --- |
组织管理员|role/organization/default/administrator|组织层所有菜单|全部操作权限|
组织成员|role/organization/default/organization-member|知识库 |全部操作权限


- 项目层：

角色|角色编码|菜单|功能
| --- | --- | --- | --- |
项目所有者|role/project/default/project-owner|项目层所有菜单|全部操作权限|
项目成员|role/project/default/project-member|协作|不能进行团队成员管理、不能删除问题，不能创建冲刺，无版本管理权限。
|||开发|无应用服务-服务详情-权限分配与共享设置
|||测试|具有全部操作设置。
|||部署|无环境配置和集群。
|||运营|能够查看全部报表。
|||设置|无任何可操作权限。


> Choerodon平台支持自定义角色，点击了解[如何自定义角色](../../user-guide/manager-guide/system-configuration/role)。



