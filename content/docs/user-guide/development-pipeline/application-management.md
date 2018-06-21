﻿+++
title = "应用管理"
description = ""
weight = 2
+++

# 应用管理
 
应用是满足用户某些需求的程序代码的集合，一个系统可以被解耦成很多应用，每一个应用都可以独立部署，每一个应用仅关注于完成一部分任务，每部分任务代表一个小的业务模块，因此各应用之间关系是松耦合的。

另外，每创建一个应用，平台会自动在 Gitlab 创建好对应的代码库。

只有该项目的项目所有者才能创建应用，项目成员仅能查看应用。
  
  - **菜单层次**：项目层
  - **菜单路径**：持续交付 > 开发流水线 > 应用
  - **默认角色**：项目所有者、项目成员、部署管理员

<blockquote class="note">
  项目成员、部署管理员对应用管理只有查看应用列表的权限，不可进行编辑修改应用名称及启用/停用应用。
</blockquote>

### 创建应用

输入`应用编码`及`应用名称`，创建一个新的应用，步骤如下。您也可以选择一个应用模板，快速创建应用，平台会为您自动创建对应的 Git 库以便管理该应用代码。

 1. 点击 `创建应用` 按钮；

 1. 输入`应用编码`、`应用名称`、以及选择`应用模板`，点击 `创建` 按钮；

    应用编码：应用中自定义的编码。

    应用名称：应用中自定义的名称。

    应用模板：系统预定义模板或组织自定义的模板快。

        系统预定义模板：微服务-MicroService；web前端-MicroServiceUI；Java库-JavaLib。
      
 1. 创建成功后，可在 Gitlab 中查看已创建的代码。

<blockquote class="note">
  若不选择应用模板，则会创建空白仓库，基础代码、默认分支、gitlab-ci.yml等内容都需要自行创建或配置。
</blockquote>

### 查看应用详情

  1. 点击`应用`，在应用管理界面，根据应用名称、应用编码、仓库地址、应用状态来查看应用详情。

列表字段

 - 应用名称：应用的自定义名称；
 - 应用编码：应用的自定义编码，gitlab 仓库的地址将会取应用编码作为仓库地址中的一段路径，且编码是项目下唯一且不可修改的；
 - 仓库地址：应用 gitlab 仓库地址；
 - 应用状态：应用运行有三种状态，分别为启用、停用、创建中。

<blockquote class="note">
  若应用状态一直都是创建中，请先检查是否正确配置了项目所有者角色及其角色标签，并且分配给该操作用户。另外，若您本地搭建的 gitlab 不稳定的话也可能导致消息发送至 gitlab 处理失败。
</blockquote>

### 分支管理

点击`分支管理`→ ![分支管理按钮](/docs/user-guide/development-pipeline/image/branch_management_button.png) 对应用信息进行[分支管理](../../development-pipeline/branch-management)。

### 修改应用信息

点击`修改应用`→ ![修改应用按钮](/docs/user-guide/development-pipeline/image/update_app_button.png) 对应用信息进行修改。

### 停用/启用应用

 点击 `停用`→ ![停用按钮](/docs/user-guide/development-pipeline/image/stop_button.png) 即可停用应用。若应用已停用，则不可以进行分支管理，不可以修改应用名称，且不可以部署该应用。
 
<blockquote class="note">
  若该应用已被部署在某环境上生成实例则不可以停用。 
</blockquote>

 点击 `启用`→ ![启用按钮](/docs/user-guide/development-pipeline/image/start_button.png) 即可重新启用被停用的应用，即可恢复相关操作。