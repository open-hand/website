+++
title = "角色权限说明"
description = "介绍了Choerodon平台预定的角色权限"
weight = 3
+++

# 角色权限说明

## 预定义角色说明

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
|||运营|能够参看全部报表。
|||设置|无任何可操作权限。



此外，Choerodon平台支持自定义角色，点击了解[如何自定义角色](../system-configuration/role)