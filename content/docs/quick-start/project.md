+++
title = "创建一个项目"
description = "从创建项目、定义环境、资源等方面介绍 Choerodon 项目，让读者能够了解项目的基本概念"
weight = 1
type = "docs"

+++

# 创建一个项目
---

## 目标

项目是 Choerodon 组织开发的基本形式，隶属于组织。一个项目包含与开发相关的资源、环境、敏捷管理，以及用户权限控制等。项目是进行应用创建开发，敏捷管理，持续交付的基础，必须先创建项目，才能够进行下一步的工作。

本章节将从创建项目、角色分配、创建环境等方面介绍 Choerodon 项目，让读者能够了解项目的基本概念，学会创建项目的基本操作，并且会为项目分配权限，创建环境等。

## 前置条件

**1.** 在操作之前保证[系统配置](../../user-guide/system-configuration)已经配置完全。

**2.** 用户必须属于组织层，且属于唯一组织。

## 创建项目

 具体操作步骤如下：

   **1.** 使用组织管理员的角色登录Choerodon系统，此时进入平台Dashboard界面，点击选择项目，弹出组织/项目选择界面。  
   ![Choose_project](/docs/quick-start/image/Project1.png)

   **2.** 点击选择组织`Choerodon`。  
   ![Choose_Choerodon](/docs/quick-start/image/Project2.png)

   **3.** 点击左上菜单按钮，选择`组织设置`后，点击`项目管理`。  
   ![Manage_project](/docs/quick-start/image/Project3.png)  
          进入项目管理页面后，点击 `创建项目`  
          ![Create_project](/docs/quick-start/image/Project4.png)

   **4.** 从右侧滑出创建项目页面后，输入项目编码和项目名称。  
   ![ProjectInfo](/docs/quick-start/image/Project5.png)


<blockquote class="warning">
    项目编码 必须输入，且编码只能包含字母，数字，下划线，空格， '_', '.', "——",只能以字母，数字，下划线开头
</blockquote>

   **5.** 填写完成后，点击``创建``，即可创建新的项目。  
   ![Create_button](/docs/quick-start/image/Project6.png)

   **6.** 当项目创建成功，Choerodon同时会在Gitlab中创建一个gitops环境库和应用库。我们可以登录到Gitlab检查创建情况。  
   ![Gitlab_groups](/docs/quick-start/image/Project7.png)

 <blockquote class="note">
  Gitlab Group 的名称是 Choerodon-猪齿鱼研发，为组织名称 -项目名称。
 </blockquote>

## 角色分配

项目创建完成之后，需要为相关人员分配权限。具体的操作步骤如下：

**1.**  使用项目所有者的角色登录系统，并切换到已经创建的项目下，例如`Choerodon`下的`猪齿鱼研发`。  
 ![Choerodon](/docs/quick-start/image/Project8.png)

**2.**  点击左上菜单按钮，选择`项目设置`模块，点击`项目角色分配`，进入角色分配操作界面。  
 ![Role](/docs/quick-start/image/Project9.png)  
  点击`添加`  
  ![Role_add](/docs/quick-start/image/Project10.png)  
  **3.**  从右侧滑出添加成员角色页面后，输入相关信息，有成员、角色。信息填写完成后，点击`添加`即可。  
 ![Add_Role](/docs/quick-start/image/Project11.png)

与项目相关的角色权限如下表：


角色 | 权限 | 层级
--- | --- | ---
项目所有者 | 项目角色分配、项目信息、应用管理、分支管理、持续集成、应用版本、应用发布、应用市场（仅查看）、环境流水线（仅查看）、应用部署（仅查看）、网络管理（仅查看）、域名管理（仅查看）、容器管理 | 项目层
项目成员 | 应用管理（仅查看）、分支管理（仅有developer权限）、持续集成、应用版本、应用发布（仅查看）、应用市场（仅查看）、环境流水线（仅查看）、应用部署（仅查看）、网络管理（仅查看）、域名管理（仅查看）、容器管理 | 项目层
部署管理员 | 应用市场、环境流水线、应用部署、网络管理、域名管理、容器管理| 项目层

{{< note >}}
  项目角色分配仅项目所有者可操作。  

  项目所有者、项目成员、部署管理员需在[角色分配](../../user-guide/system-configuration/platform/role)中配置好对应的权限。
{{< /note >}}





## 相关文档  
- [系统配置](../../user-guide/system-configuration)  
- [角色分配](../../user-guide/system-configuration/platform/role)