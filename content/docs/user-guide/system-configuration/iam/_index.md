+++
title = "IAM和管理"
description = ""
weight = 5
alwaysopen=false
+++

## 介绍

本节介绍IAM (Identity & Access Management)身份和访问管理的基础概念。

Choerodon支持IAM，即管理谁（identity）对哪个资源有什么访问权限（role）。
使用IAM，你能允许对特定Choerodon资源的访问，并且阻止对其他资源的不必要的访问。

<h3 id="1">与身份有关的概念</h3>

在IAM，你能对**成员**（member）授予访问权限。成员可以是以下类型：

- 用户（user）
- 客户端（client）

#### 用户（user）
 
用户，代表一个独立的个体。在这里，用户是指在Choerodon有身份认证的任何人。(例如：游客、匿名用户不包括在用户里面)

用户有唯一的标识【用户名】；因此用户名一旦创建，不可更改。

用户可以绑定邮箱、手机号。

用户的登录为登陆账号（用户名/邮箱/手机号）密码方式登录。

#### 客户端（client）

提供服务的一方我们称为 服务端（Server），而接受服务的另一方我们称作客户端（Client）。

### 与访问管理相关的概念

当一个已认证的成员要发送一个请求时，IAM会对这个成员是否能在资源进行操作做出授权决定。这里将介绍授权过程中要涉及到的实体和概念。

#### 权限

权限决定了在资源上允许的操作。 在Choerodon中，权限以`<service>.<resource>.<action>`的形式显示。例如`Choerodon-user-service.groups.query`。

目前，权限1：1对应到API资源上，一条API资源就是一个权限。

#### 角色

角色是权限的集合。你不能直接给成员分配权限，而是要授予角色。当你给成员授予一个角色时，也就是将角色里包含的所有权限授予了成员。

在IAM中，有两种角色：

- **预定义角色：**预定义角色比原始角色的粒度细，可对更细粒度的访问进行控制。例如，源代码管理员（role/Choerodon-devops-service.sourceCodeAdmin）是对environment、git-flow、devops-service、service-release这些资源进行访问授权。
- **用户自定义角色：**如果原始角色、预定义角色不能满足需求时，用户可根据自身需求创建自定义角色，给该角色添加特定的权限组合。

有关角色的更多信息请参考[角色管理](./site4_role)

#### 角色分配

你可以授予用户角色通过在角色分配管理中添加用户与角色的关联关系，即定义谁有什么样的访问权限的一组关联。


![image](/docs/user-guide/system-comfiguration/iam/image/iam_overview_policy.png)

IAM的核心就是角色分配，用`member_role`对象表示。一个IAM`member_role`对象由关联列表组成。一个`关联`是将`成员`列表和`角色`关联在一起。

`角色`是你想分配给成员的角色。角色有唯一的标识-角色编码。`角色编码`的指定形式为`role/<name of the role>`。如，role/Choerodon-kanban-service.kanbanMember（看板项目成员），role/devops-deploy-service.deploymentAdmin（部署管理员）。

`成员`包含一个列表，这个列表可以是一个或多个身份，参考上面提到的[与身份有关的概念](#1)部分。

#### 角色分配分层

角色分配是按层次划分的。一共分3层：Site（全局）层、Org（组织)层、Project（项目）层。`角色`也有分层，一共分3层：Site（全局）层、Org（组织)层、Project（项目）层。

在特定层级的角色分配中，只能分配对应层级的角色。

在全局层的角色分配中，只能分配全局层角色，而全局层角色只包含全局层权限，只能访问全局层的资源；

在组织层的角色分配中，只能分配组织层角色，而组织层角色只包含组织层权限，只能访问组织层资源；

在项目层的角色分配中，只能分配项目层的角色，而项目层角色只包含项目层权限，只能访问项目层资源。

![image](/docs/user-guide/iam/image/policy_hierarchy.png)

在全局层对成员授予全局层角色后，成员有访问全局层资源的权限，能对Choerodon系统进行设置，设置将在Choerodon系统中的所有组织、项目生效；

在组织层对成员授予组织层角色后，成员有访问组织层资源的权限，对一个组织的关联对象进行设置，设置将在这个组织与属于这个组织的项目生效；

在项目层对成员授予项目层角色后，成员有访问项目层资源的权限，对一个项目进行操作，操作将只在这个项目生效。

## 功能

## 关键流程设计及实现

![image](/docs/user-guide/iam/image/1.png)



## 关键技术方案

## 领域模型
