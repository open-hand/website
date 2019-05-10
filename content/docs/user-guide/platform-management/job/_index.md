+++
title = "任务调度"
description = "对项目开发中定时要执行的任务进行配置和管理"
weight = 1
+++

# 任务调度

## 介绍

一个系统一般都会有很多业务模块组成，这些业务模块被封装成一个个独立部署的应用拆分出去，独立维护。各个业务模块都会有自己定制的定时任务要运行，一般都会依赖自己业务数据和逻辑，很自然的写在各自的应用中。任务调度就是统一管理这些散落在各个业务模块中的定时任务。

任务调度允许用户根据时间间隔（或时间点）来调度job。可用于简单或复杂的任务计划，用户可以配置触发时间规则，选择要执行的程序，并且通过执行记录了解任务的执行情况。任务执行相关信息统一到一起，比如任务执行记录，而任务业务代码开发和任务配置解耦 

## 平台已有可执行程序

程序编码 | 层级 | 描述 | 参数
--- | --- | --- | --- 
`syncLdapUserOrganization` | 组织 | 组织层同步LDAP用户 | `[{"name":"organizationCode","defaultValue":null,"type":"String","description":"组织编码","default":true}]` 
`syncLdapUserSite` | 平台 | 全局层同步LDAP用户 | `[{"name":"organizationCode","defaultValue":"hand","type":"String","description":"组织编码","default":false}]` 
`deleteAllExpiredToken` | 平台 | 删除所有失效token | `[]`
`systemNotification` | 平台 | 平台层发送系统通知 | `[{"name":"systemNocificationId","defaultValue":null,"type":"Long","description":"系统公告Id","default":false}]`
`syncDisabledLdapUserSite` | 平台 | 全局层过滤并停用LDAP用户 | `[{"name":"organizationCode","defaultValue":"hand","type":"String","description":"组织编码","default":false},{"name":"filterStr","defaultValue":"(employeeType=1)","type":"String","description":"ldap过滤条件","default":false}]` 
`syncDisabledLdapUserOrg` | 组织 | 组织层过滤并停用LDAP用户 | `[{"name":"organizationCode","defaultValue":null,"type":"String","description":"组织编码","default":true},{"name":"filterStr","defaultValue":"(employeeType=1)","type":"String","description":"ldap过滤条件","default":false}]` 

{{< docdir >}}