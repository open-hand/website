+++
title = "应用版本"
description = "由于 Choerodon 采用 Gitflow 的方式管理分支，所以对于版本的控制也是根据 Feature、Release、Hotfix 等分支上进行的"
weight = 5
+++

# 应用版本
 
 由于 Choerodon 采用 Git-flow 的方式管理分支，所以对于版本的控制也是根据 Feature、Release、Hotfix 等分支上进行的。

  - **菜单层次**：项目层
  - **菜单路径**：持续交付 > 开发流水线 > 应用版本
  - **默认角色**：项目所有者、项目成员、部署管理员

## 查看应用版本详情

 1. 进入持续交付后，点击 `应用版本` 页签；

 1. 查看应用版本信息。

列表字段

 - 应用版本：迭代升级中对应的不同版本。

 - 应用编码：创建应用的自定义编码。

 - 应用名称：创建应用的自定义名称。

 - 创建时间：应用创建时的时间。

## 版本控制方式

1. 基于 Develop 分支生成一个 Feature 分支，开发人员在 Feature 分支上开发，例如 Feature-101，其中编号101是新 Feature 对应的 ISSUE 编号。

2. 将 Feature 分支合并到 Develop 分支，开发人员完成 Feature 开发，并删除 Feature 分支。

3. 基于 Develop 分支生成一个 Release 分支，准备发布版本代码，每生成一个 Release 分支，中间版本号自动加1，末位清0，初始版本号是1.0.0，例如当前版本是1.1.0，生成一个 Release 分支，此分支为 Release-1.2.0，其中1.2.0是下一个版本的版本号。

4. 将 Release 分支合并到 Develop 分支，完成发布版本代码准备。

5. 将 Release 分支合并到 Master 分支，完成发布版本，生成新版本 tag，例如版本1.2.0。

<blockquote class="note">
4.和5.没有先后顺序，当4和5都完成系统会自动删除 Release 分支，例如 Release-1.2.0。
</blockquote>

6. 如果 Master 分支或者新版本存在 Bug，基于Master分支生成一个 Hotfix 分支，开发人员修复 Bug，末位版本号自动加1，例如当前版本是1.2.0，生成一个 Hotfix 分支，此分支为 Hotfix-1.2.1，其中1.2.1是热修复的版本号。

7. 将 Hotfix 分支合并到 Develop 分支，完成 Bug 修复。

8. 将 Hotfix分支合并到 Master 分支，更新 Bug 修复版本，生成新版本 tag，例如版本1.2.1。

<blockquote class="note">
注： 7.和8.没有先后顺序，当7.和8.都完成系统会自动删除 Hotfix 分支，例如 Hotfix-1.2.1。
</blockquote>