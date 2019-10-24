+++
title = "创建一个后端应用"
description = "从创建后端应用、创建后端应用模板、开发后端应用、生成版本、部署应用、查看运行信息等方面介绍"
weight = 2
type = "docs"

+++

# 创建一个后端应用
---

## 概述
后端应用(Backend Application)采用`Spring Boot`、`Spring Cloud` 作为应用的开发框架，利用丰富的文档、社区活跃和一套完整的应用框架解决方案提供技术支持。

## 目标  

本章节将以创建后端应用 “`猪齿鱼Todo服务`” 为例，从后端应用开发、提交代码、生成版本到部署应用等方面展开介绍，让读者能够熟悉使用Choerodon创建应用后端应用的步骤和流程，并且学会如何利用Choerodon部署应用等。

## 前置条件

**1.** 在操作之前保证[系统配置](../../../user-guide/manager-guide/system-configuration)已经配置完全。特别在本章节用到的角色、环境管理等配置。

**2.** 完成[创建项目](../../admin/project)操作。本章节使用在前面章节创建的项目`猪齿鱼研发`。

**3.** 完成[创建环境](../../../user-guide/deploy/env-config)，环境管理中有状态为运行中的环境。

## 创建后端应用

具体的操作步骤如下：

**第一步：** 使用项目所有者的角色用户登录Choerodon系统，创建项目的人即为项目所有者，如果使用其它创建的用户请先给该用户在`猪齿鱼研发`项目下分配项目所有者角色，然后登录选择项目``猪齿鱼研发``。
 
**第二步：** 选择`应用管理`模块，点击`应用`，进入应用管理页面。

**第三步：** 点击[创建应用](../../../user-guide/development/application-service/create-app-service)，系统会从右边滑出页面，在页面中输入`应用编码`、`应用名称`，`应用模板`，`应用模板`选择`MicroService`。点击`创建`，即可创建一个后端应用，创建成功后，您可以进行后续的后端应用开发。

例如，

- 应用编码: choerodon-todo-servie
- 应用名称: 猪齿鱼Todo服务
- 应用模板: MicroService

 ![](/docs/quick-start/image/create_app.png)

{{< note >}}当应用模板不符合您的需求，您可手动[创建一个应用模板](../../../quick-start/admin/application-template/)，在此之前您必须拥有组织管理员角色权限。
 {{< /note >}} 

**第四步：** 当应用创建成功，可在`应用管理`模块，点击`应用` 界面查看到新建的应用，当应用的状态是启用时，表示应用创建成功。

**第五步：** 在创建应用的同时，系统会对应在`Gitlab`中创建一个仓库，点击仓库地址，可以链接到应用对应在`Gitlab`的代码仓库。

![](/docs/quick-start/image/app-repository.png)

Choerodon 平台与 Gitlab 名词关系如下：

Choerodon 名词 | 对应 Gitlab 名词 | 举例
---|---|---
项目名 | 组名 | `猪齿鱼研发`
应用编码 | 项目名 |`choerodon-todo-servie`
应用名称 | 无 |`猪齿鱼Todo服务`
 
## 开发后端应用

应用创建完成之后，开发后端应用。

具体的操作步骤如下：

**第一步： 创建`Feature`分支**

在 `开发流水线` -> `分支` 界面，选择应用``choerodon-todo-service``。点击`创建分支`，如果没有`issue`可选择，则先[创建issue](../../../user-guide/cooperation/work-lists/problem/)，
选择对应的`issue`。分支来源选择`master`，填写`issue`号，如`feature-1`。点击`创建`，即可创建一个分支。创建完分支之后，您就可以进行后续的本地开发。

例如，

- 问题名称: choerodon-dev-1 猪齿鱼快速入门文档
- 分支来源: master
- 分支类型: feature
- 分支名称: feature-choerodon-dev-1

![](/docs/quick-start/image/create_branch3.png)

Choerodon 采用 [`github-flow`](https://guides.github.com/introduction/flow/)作为我们的分支管理策略的主体。并在此基础上，参考了一些其他策略，对开发者的开发分支做了一定程度上的细分。更多相关信息参考[分支管理](../../../user-guide/development/code-manage/manage-branch/)。

**第二步： 拉取代码仓库**

在`开发流水线` -> `代码仓库` 找到`choerodon-todo-service` 的`仓库地址`，复制仓库地址，本地通过`git` 命令拉取生成的项目代码。然后切换到对应分支进行本地开发。

``` bash
$ git clone `仓库地址`
$ cd ./choerodon-todo-service
$ git checkout feature-choerodon-dev-1
```
克隆代码时候，会让输入用户名，密码。用户名为平台用户名，密码为部署[持续交互](../../../installation-configuration/steps/install/parts/choerodon-devops/)服务时候的变量值。

![](/docs/quick-start/image/gitlab_password.png)

**第三步： 本地开发**

将代码克隆到本地后，就可以在本地进行开发。

 - 通过Choerodon 提供的`MicroService` 应用模板，会生成一个最简单的`spring boot` 应用。模板本身生成的应用可以直接运行在平台上，如需拓展更多功能，可具体参考[后端开发手册](../../../development-guide/backend/)。

**第四步： `ci` 文件**

通过Choerodon 提供的`MicroService`应用模板，会创建`.gitlab-ci.yml`。有关`.gitlab-ci.yml` 的编写参考应用模板。

 - `.gitlab-ci.yml`定义 `Gitlab CI` 的阶段，通过MicroService模板 的 CI 流程包含了`编译`，`打包`，`生成镜像`，`生成helm 包`几个阶段。	

**第五步： `charts` 文件**

通过Choerodon 提供的`MicroService`应用模板，会创建`charts` 文件夹。charts文件目录用于生成charts包，部署时会用到。有关`charts` 的编写参考应用模板。

 - `charts`文件夹里面包含了`k8s` 对象的模板文件以及渲染这些对象文件的参数值文件`values.yaml`。

**第六步： `Dockerfile` 文件**

Choerodon 使用`docker` 来打包应用镜像。有关`Dockerfile` 的编写参考应用模板。

 - 你可以通过修改`Dockerfile` 来打包镜像的方式。

**第七步： 提交代码**

当本地做了相关修改之后，需要将本地仓库的代码提交到远程分支上。提交的用户名密码同克隆代码库的一样。

``` bash
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
	
**第八步： 代码集成**

当代码提交到服务器之后，可以在页面查看持续集成。

在`开发流水线` -> `持续集成` 页面，找到`choerodon-todo-service`。点击阶段跳转到`Gitlab` 查看 CI 执行情况。

![](/docs/quick-start/image/pipeline.png)

**第九步： 合并分支**　

当 CI 执行通过以后，可以将`feature`分支合并到`master`分支上。

在`开发流水线` -> `合并请求` 页面，选择应用`choerodon-todo-service`。点击`创建合并请求`，跳转到`Gitlab`。 分别选择源分支为`feature-1` ，目标分支为`master`。并提交合并请求。等待`ci流水线`通过后，点击合并分支。

当`master` 分支的`ci流水线` 通过以后。在`应用管理` -> `应用版本` 可以找到`choerodon-front-demo`生成的对应版本。接下来就可以部署了。

![](/docs/quick-start/image/version.png)

## 部署应用

提供可视化、一键式部署应用，支持并行部署和流水线无缝集成，实现部署环境标准化和部署过程自动化。更多相关信息以及详细操作步骤参考[部署一个应用](../../project-member/application-deployment/)。

<blockquote class="note">
  在部署前，请先确定服务所需要的数据库，kafka，注册中心，配置中心等都已经正常运行启动。
 </blockquote> 

具体的操作步骤如下：

**第一步：** 使用项目所有者角色的用户登录，创建项目的人自动分配为项目所有者角色，如果向使用其它用户，请给其它用户在该项目下分配项目成员角色之后，再为此用户分配目标环境下的部署操作权限。再用该账号登录Choerodon系统，然后选择项目`猪齿鱼研发`。

**第二步：** 进入`部署流水线`模块，选择`应用部署`，进入应用部署界面。

**第三步：** 点击`选择应用`，找到已经提交的`choerodon-todo-service`。点击`选择版本`，选择`choerodon-todo-service` 最新的版本，点击`下一步`。

**第四步：** 点击`选择环境`，选择一个环境。部署的环境信息会展现在底下。如果没有环境，请先完成[创建环境](../../../user-guide/deploy/env-config)。

**第五步：** 根据实际的配置，配置部署应用所需的配置信息。
替换掉一些参数文件值，参数文件值为部署choerodon系统时的生成的参数值，详细见[一键部署](../../../installation-configuration/steps/install/choerodon/)或者[分布部署](../../../installation-configuration/steps/install/parts/)，然后点击`下一步`。

![](/docs/quick-start/image/values1.png)

![](/docs/quick-start/image/values2.png)

**第六步：** 选择`新建实例`。如果环境中已有一个实例，则可以选择`替换实例`。点击`下一步`，生成预览信息。


**第七步：** 确认信息无误后，可以点击`部署` 来部署应用，页面自动跳转到`实例`页面。

**第八步：** 选择已经部署的应用，右侧的`查看实例详情`，可以查看到阶段信息及日志。


![](/docs/quick-start/image/jobs.png)

> **如何判断某版本的应用已经部署成功并通过？**
>
>* 当实例出现在列表中，且实例名称后没有报错提示`icon`即为部署成功生成实例；
>* 当容器状态条为绿色，且容器状态显示为`1/1`时，表示新部署的实例通过健康检查。

![](/docs/quick-start/image/query_instance.png)

## 注册服务

部署成功的微服务需要注册到注册中心上，所以需要修改注册中心的配置。

具体的操作步骤如下：

**第一步：** 如果注册中心和部署的应用在同一项目下，则不需要修改注册中心配置。

**第二步：** 如果注册中心和部署的应用不在同一项目下，需要在注册中心所属的项目下，进入`部署流水线`模块，选择部署`实例` 界面，找到注册中心，选择右侧的修改配置信息。

![](/docs/quick-start/image/modify_regi.png)

**第三步：** 给 `env.open.register_service_namespace` 变量添加自己服务所部署的`namespace`，用`，` 和其他的分隔开。

![](/docs/quick-start/image/modify-regi2.png)


**第四步：** 修改完毕后，点击`重新部署`。

**第五步：** 等待实例重启结束，通过`xxxx/eureka/apps` 查看是否成功注册。`xxxx`为部署`register-server`时建的域名，详细见[一键部署](../../../installation-configuration/steps/install/choerodon/)或者[分布部署](../../../installation-configuration/steps/install/parts/)。

![](/docs/quick-start/image/regi-instances.png)
 
确认是否正常注册成功，搜索是否存在choerodon-todo-service的记录，存在则表示注册成功

**第六步：** 服务注册成功后，用平台管理员给该服务添加路由，路径为点击管理->微服务管理->路由管理，将其api暴露在swagger上，创建为路由之后，您就可以在swagger-ui访问服务的api。swagger-ui前缀为gateway地址，具体值详见[一键部署](../../../installation-configuration/steps/install/choerodon/)或者[分布部署](../../../installation-configuration/steps/install/parts/)。

例如，

- 路由名称: choerodon-todo-service
- 路径: /todo/**
- 对应微服务: choerodon-todo-service

![](/docs/quick-start/image/create_luyou2.png)

![](/docs/quick-start/image/swagger1.png)

然后就可以访问部署好之后服务的api了，自此一个后端服务部署开发完成！

![](/docs/quick-start/image/api1.png)

## 相关文档

- [系统配置](../../../user-guide/manager-guide/system-configuration)

- [创建项目](../../admin/project)

- [创建环境](../../../user-guide/deploy/env-config)

- [创建应用](../../../user-guide/development/application-service/create-app-service)

- [创建issue](../../../user-guide/cooperation/work-lists/problem/)

- [github-flow](https://guides.github.com/introduction/flow/)

- [分支管理](../../../user-guide/development/code-manage/manage-branch/)

- [持续交互](../../../installation-configuration/steps/install/parts/choerodon-devops/)

- [后端开发手册](../../../development-guide/backend/)

- [一键部署](../../../installation-configuration/steps/install/choerodon/)

- [分布部署](../../../installation-configuration/steps/install/parts/)