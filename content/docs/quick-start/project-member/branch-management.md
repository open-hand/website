+++
title = "分支管理"
description = "介绍了Choerodon的分支管理，从创建分支、创建合并请求来介绍如何快速了解分支管理的操作"
weight = 6
type = "docs"

+++

# 分支管理
---

## 概述

使用分支意味着你可以从开发主线上分离开来，然后在不影响主线的同时继续工作。

## 目标

本章节将从创建分支、创建合并请求等操作来介绍`Choerodon`的分支管理功能，让读者能够熟悉`Git`分支管理，并且学会使用`Choerodon`去创建、管理和操作应用分支。

## 前置条件

在操作之前保证[系统配置](../../../user-guide/system-configuration)已经配置完全。特别是本章节用到的角色、环境管理等配置。

## Git相关
如需了解`Git`相关的知识请参阅用户手册中[分支管理](../../../user-guide/development-pipeline/branch/) 文档。

## 创建应用

应用是满足用户某些需求的程序代码的集合，我们的分支管理也应该基于一个代码仓库而不是一些分散的代码，所以我们首先需要创建一个应用。

具体操作步骤如下：

**第一步：** 使用拥有项目所有者角色的用户登录`Choerodon`系统，选择项目`猪齿鱼研发`。

**第二步：** 点击左侧菜单栏，选择`应用管理`，点开应用。点击`创建应用`(确保已拥有该权限)。

**第三步：** 输入`编码`和`名称`，编码用于描述应用名称。自行选择需要的模板。

例如，

- 编码：branch-management
- 名称：分支管理
- 选择应用模板：MicroService

![fill_app_info](/docs/quick-start/image/branch/fill_app_info.png)

<blockquote class="note">
    如果不选择应用模板的话那么后面创建分支时会因为gitLab库为空而无法创建分支，需要在gitLab库中手动创建任何一个文件，生成master分支后，才能在页面上创建分支。所以这里我们选择一个模板以避免上述情况发生。
</blockquote>

**第四步：** 创建成功后在页面上显示应用对应的`gitlab`仓库地址地址。

至此，我们的应用就创建完成，接下来就可以在这个应用上进行开发和分支管理了。

## 分支管理

具体操作步骤如下：

**第一步：** 点击左侧菜单栏，选择开发流水线，点开分支，进入`Choerodon`分支页面。

**第二步：** 选择应用“`猪齿鱼研发`”。
 
**第三步：** 点击上方的`创建分支`按钮并填写分支信息，问题名称一栏需要在 **敏捷管理** -> **待办事项** 中创建相应任务才会显示。

填写完分支信息后点击`创建`按钮。
 
![create_branch](/docs/quick-start/image/branch/create_branch.png)

> 关于分支类型如何选择，请参阅用户手册中 [分支管理策略](../../../user-guide/development-pipeline/branch/) 部分   
 
 至此，我们就完成了分支的创建，接下来就可以在分支上进行开发，然后合并到其他分支。

## 创建合并请求

当我们在当前分支完成了开发后，我们需要将分支上的改动合并到其他分支用于对外发布正式版本，这时我们可以在`choerodon`页面上直接发起一个`merge`请求。

具体操作步骤如下：

**第一步：** 在分支页面找到我们需要合并的分支，点击创建合并请求。
 
![create_merge_req](/docs/quick-start/image/branch/create_merge_req.png)
 
**第二步：** 在右侧的`Target branch`栏中选择我们需要合并到哪个分支，默认是`master`，点击`Compare branches and continue`按钮进行合并。

**第三步：** 按照相应的`Git`提交规范填写`merge`请求的`Title`信息。

 `Git`提交时，添加`Comment`请遵循以下要求：
 
 - [IMP] 提升改善正在开发或者已经实现的功能
 - [FIX] 修正BUG
 - [REF] 重构一个功能，对功能重写
 - [ADD] 添加实现新功能
 - [REM] 删除不需要的文件

**第四步：** 填写完`Title`后在页面底部还可以再次确认待合并的分支和目标分支。点击`Submit merge request`按钮提交分支合并请求。

![accept_merge_req](/docs/quick-start/image/branch/accept_merge_req.png) 

<blockquote class="note">
    一般来说我们是需要删除掉已经合并到 master 分支上的特性分支，以保持分支的整洁，所以我们可以勾上Remove source branch when merge request is accepted选选项。
</blockquote>

## 相关文档

- [系统配置](../../../user-guide/system-configuration)

- [创建项目](../../../quick-start/admin/project)

- [创建环境](../../../user-guide/deployment-pipeline/environment-pipeline)

- [创建应用](../../../user-guide/application-management/application)

- [分支管理](../../../user-guide/development-pipeline/branch/)