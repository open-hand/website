+++
title = "角色控制访问(RBAC)"
description = ""
weight = 3
+++

## Choerodon 角色控制访问权限(RBAC)

Choerodon 的对资源的管理是基于角色控制的，并从组织层、项目层和用户层对角色进行划分。

包含如下的特点：

- <font>基于角色的权限访问控制</font>
- <font>基于组织层、项目层和用户层的三层权限体系</font>
- <font>自定义角色创建和绑定</font>

---
## 架构

下图介绍了Choerodon RBAC的架构。

![权限](/img/docs/security/permission.png)

---
## 工作流

下图介绍了RBAC的流程图。

![权限流程图](/img/docs/security/permission_flow.png)

---
## 组成

Choerodon RBAC 包含资源、角色、用户。同时包含资源与角色的关联，角色与用户的关联。

### 资源

* Choerodon 遵循`REST` 原则，视`HTTP-based REST API` 为一个或一组资源。
* 对资源的引用和操作则视为权限。
* 权限的级别对应全局、组织、项目。

### 角色

角色是资源的超集。

* 角色的级别对应为全局、组织、项目。
* 角色和资源之间通过RBAC 关联起来。
* 一个角色严格遵循只能访问所属资源的原则。
* 角色支持自定义角色，通过标签将角色和第三方系统进行关联。

### 用户

用户是资源的实际使用者。

* 用户和角色之间通过RBAC 关联起来。