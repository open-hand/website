+++
title = "7.3.开发应用服务"
description = ""
weight = 3
+++


# 开发应用服务

## 目标
Choerodon 代码仓库基于 Git 进行代码版本管理。本文档旨在引导新手用户在 Choerodon 猪齿鱼平台中`创建分支`、`克隆、推拉代码`、`合并分支`。

## 前置条件
1. 已部署安装Choerodon 猪齿鱼，并使用默认的 admin 用户名和密码登录了 Choerodon 系统。
2. 默认的 admin 用户进入 Choerodon 系统后，默认拥有一个组织并为该组织的组织管理员角色。关于Choerodon角色的详情，请移步角色管理。

    |账号|角色|职责|
    |---|---|---|
    |admin|组织管理员|管理组织下的项目和成员（组织成员、项目所有者、项目成员）|
3. 已完成项目创建及团队成员建设。
4. 已在Choerodon项目下创建应用服务，并配置了 Git，包括下载安装、设置等。

## 操作示例
## 开发应用服务

具体的操作步骤如下：

**第一步：创建** *Feature* **分支**

在 代码管理 -> 分支 界面，选择应用服务`猪齿鱼Todo服务`。点击创建分支，如果没有`issue`可选择，则先[创建问题](/zh/docs/user-guide/cooperation/work-lists/problem/)， 选择对应的issue。分支来源选择master，填写issue号，如feature-1。点击创建，即可创建一个分支。创建完分支之后，您就可以进行后续的本地开发。

例如，

* 问题名称: choerodon-dev-1 猪齿鱼快速入门文档
* 分支来源: master
* 分支类型: feature
* 分支名称: feature-choerodon-dev-1

![image](/docs/quick-start/devops/image/back-applications-3.png)

Choerodon 采用 [githubflow](https://guides.github.com/introduction/flow/)作为我们的分支管理策略的主体。并在此基础上，参考了一些其他策略，对开发者的开发分支做了一定程度上的细分。更多相关信息参考[分支管理](/zh/docs/user-guide/development/code-manage/manage-branch/)。

**第二步：** **拉取代码仓库**

在`代码仓库` 菜单找到`猪齿鱼Todo服务`的仓库地址，复制仓库地址，本地通过git 命令拉取生成的项目代码。然后切换到对应分支进行本地开发。  

![image](/docs/quick-start/devops/image/application-develop-1.png)

```sh
$ git clone `仓库地址`

$ cd ./choerodon-todo-servie

$ git checkout feature-choerodon-dev-1
```

克隆代码时候，会让输入用户名，密码。用户名为平台用户名，密码为用户新建后收到的站内信中的Gitlab仓库密码，若忘记密码，可以到个人信息页面重置GitLab仓库密码。

![image](/docs/quick-start/devops/image/back-applications-4.png)

**第三步：** **本地开发**

将代码克隆到本地后，就可以在本地进行开发。

> 通过Choerodon 提供的MicroService 应用服务模板，会生成一个极简单的spring boot 应用服务。模板本身生成的应用服务可以直接运行在平台上，如需拓展更多功能，可具体参考[后端开发手册](/zh/docs/development-guide/backend/)。


**第四步：** **提交代码**

当本地做了相关修改之后，需要将本地仓库的代码提交到远程分支上。提交的用户名密码同克隆代码库的一样。

```sh
$ git add .

$ git commit -m "[ADD] init todo-service"

$ git push origin feature-choerodon-dev-1
```

提交时需要遵循Choerodon 的规范：

* [IMP] 提升改善正在开发或者已经实现的功能
* [FIX] 修正BUG
* [REF] 重构一个功能，对功能重写
* [ADD] 添加实现新功能
* [REM] 删除不需要的文件


**第五步：** **代码集成**

当代码提交到服务器之后，可以在页面查看持续集成。

在代码管理 -> 持续集成 页面，选择应用服务`猪齿鱼Todo服务`。点击阶段跳转到Gitlab 查看 CI 执行情况。

![image](/docs/quick-start/devops/image/back-applications-5.png)

**第六步：** **合并分支**

当 CI 执行通过以后，可以将feature分支合并到master分支上。

在代码管理 -> 合并请求 页面，选择应用服务`猪齿鱼Todo服务`。点击创建合并请求，跳转到Gitlab。 分别选择源分支为`feature-choerodon-dev-1` ，目标分支为master。并提交合并请求。等待ci流水线通过后，点击合并分支。

当`master`分支的ci流水线 通过以后。在应用服务 -> 点击应用服务`choerodon-demo-service` 可以找到`choerodon-demo-service`生成的对应版本。接下来就可以部署了。

![image](/docs/quick-start/devops/image/back-applications-6.png)



## 下一步  
[创建一个集群](../../../quick-start/devops/create-cluster)