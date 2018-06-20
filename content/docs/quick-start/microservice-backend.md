+++
title = "创建一个后端应用"
description = ""
weight = 4
type = "docs"
+++

# 创建一个后端应用
---

## 概述
后端应用(Backend Application)的架构模式是将传统的单体应用拆分成多个小型应用，每个小型应用可以独立的编译和部署，应用之间的调用通过`HTTP`的`restfull API`方式进行通讯。它们彼此之间相互协作，作为一个整体对外开放。Choerodon 的应用后端采用`Spring Boot`、`Spring Cloud` 作为应用的开发框架，利用丰富的文档、社区活跃和一套完整的应用框架解决方案提供技术支持。

## 目标

本章节将从创建后端应用、开发后端应用、部署应用等方面介绍，让读者能够熟悉使用Choerodon创建应用后端应用的步骤和流程，并且学会如何利用Choerodon部署应用等。

## 前置条件

**1.** 在操作之前保证[系统配置](../../user-guide/system-configuration)已经配置完全。特别在本章节用到的角色、环境管理等配置。

**2.** 完成[创建项目](../project)操作。本章节使用在前面章节创建的项目`猪齿鱼研发`。

**3.** 完成[创建环境](../../user-guide/deployment-pipeline/environment-pipeline)，环境流水线中有状态为运行中的环境。

## 创建后端应用

**1.** 使用项目所有者或者源代码管理员的角色登录Choerodon系统，选择项目``猪齿鱼研发``。

**2.** 选择`持续交付`模块，点击`应用`，进入应用管理页面。

**3.** 点击`创建应用`，系统会从右边滑出页面，在页面中输入`应用编码`、`应用名称`，`应用模板`，`应用模板`选择`MicroService`。点击`创建`，即可创建一个后端应用。

字段名 | 输入值
---|--- 
应用编码 | `choerodon-todo-servie`
应用名称 | `猪齿鱼Todo服务`
选择应用模板 | `MicroService`
 
> 当应用模板不符合您的需求，您可手动创建一个[应用模板](../../user-guide/development-pipeline/application-template/)。

**4.** 当应用创建成功，可在`应用` 界面查看到新建的应用。

**5.** 在创建应用的同时，系统会对应在`Gitlab`中创建一个仓库，点击 `仓库地址`，链接到`Gitlab`新建的仓库。

Choerodon 名词 | 对应Gitlab 名词 | 举例
---|---|---
项目名 | 组名 | `猪齿鱼研发`
应用编码 | 项目名 |`choerodon-todo-servie`
应用名称 | 无 |`猪齿鱼Todo服务`

## 开发后端应用

应用创建完成之后，开发后端应用。具体的操作步骤如下：

**1. 创建`Feature`分支**

在`应用` 界面中找到`choerodon-todo-service`。选择分支管理，点击`创建分支`，选择`创建feature分支`，填写`issue`号，如`feature-1`。点击`创建`，即可创建一个分支。

Choerodon 采用 `git-flow` 工作流模式，有`master`和`develop`两个默认分支。在持续交付过程中对 `feature`、`release`、`hotfix` 等分支进行管理。结束分支可自动触发分支合并和持续集成，可在流水线查看代码集成情况。更多相关信息参考[分支管理](../../user-guide/development-pipeline/branch-management/)。

**2. 拉取代码仓库**

在`应用` 界面中找到`choerodon-todo-service` 的`仓库地址`。通过git命令拉取生成的项目代码。然后切换到对应分支进行本地开发。

``` bash
$ git clone `仓库地址`
$ cd ./choerodon-todo-service
$ git checkout feature-1
```
 
**3. 本地开发**

将代码克隆到本地后，就可以在本地进行开发。

通过Choerodon 提供的`MicroService` 应用模板，会生成一个最简单的`spring boot` 应用。

模板本身生成的应用可以直接运行在平台上。更多具体的开发参考[后端开发手册](../../development-guide/backend/)。

**4. 修改`ci` 文件**

通过Choerodon 提供的默认模板，会创建`.gitlab-ci.yml`。

`.gitlab-ci.yml`定义 `Gitlab CI` 的阶段，Choerodon 缺省的 CI 流程包含了`编译`，`打包`，`生成镜像`，`生成helm 包`几个阶段。	

有关`.gitlab-ci.yml` 的编写参考[应用模板](../../user-guide/development-pipeline/application-template/)。

**5. 修改`charts` 文件**

通过Choerodon 提供的默认模板，会创建`charts` 文件夹。

`charts`模块用于创建应用时生成创建 `k8s` 对象，包含了`部署的模板`，`chart values`。

有关`charts` 的编写参考[应用模板](../../user-guide/development-pipeline/application-template/)。

**6. 修改`Dockerfile` 文件**

Choerodon 使用`docker` 来运行应用。你可以通过修改`Dockerfile` 来修改应用的运行环境。

有关`Dockerfile` 的编写参考[应用模板](../../user-guide/development-pipeline/application-template/)。


**7. 提交代码**

当本地修改结束后，需要将本地仓库的代码提交到远程分支上。

``` bash
$ git add .
$ git commit -m "[ADD] init todo-service"
$ git push origin feature-1
```

提交时需要遵循Choerodon 的规范:

* [IMP] 提升改善正在开发或者已经实现的功能
* [FIX] 修正BUG
* [REF] 重构一个功能，对功能重写
* [ADD] 添加实现新功能
* [REM] 删除不需要的文件
	
**9. 持续集成**

当代码提交到服务器之后，可以在页面查看持续集成。

在`持续集成` 页面，找到`choerodon-todo-service`。点击阶段跳转到`Gitlab` 查看`ci`执行情况。

**10. 结束分支**　

当`ci`执行通过以后，可以关闭分支，将`feature`分支合并到`develop`分支上。

在`应用` 页面，找到`choerodon-todo-service`。选择分支管理，找到`feature-1` 分支，点击`结束分支`。结束分支后，会触发`develop` 分支的`ci流水线`。

当`develop` 分支的`ci流水线` 通过以后。在`应用版本` 可以找到，`choerodon-todo-service`生成的对应版本。接下来就可以部署了。

## 部署应用

提供可视化、一键式部署应用，支持并行部署和流水线无缝集成，实现部署环境标准化和部署过程自动化。

**1.** 使用部署管理员的角色登录Choerodon系统，选择项目`猪齿鱼研发`。

**2.** 进入`持续交付`模块，选择`应用部署` 进入应用部署界面。

 -  选择应用：`choerodon-todo-service`。
 -  选择版本：`choerodon-todo-service` 最新的版本。
 -  选择环境：选择一个环境。部署的环境信息会展现在底下。如果没有环境，请先完成[创建环境](../../user-guide/deployment-pipeline/environment-pipeline)。
 -  配置信息：根据实际的配置，配置部署应用所需的配置信息。
 -  部署模式：选择`新建实例`。如果环境中已有一个实例，则可以选择`替换实例`。

配置信息中包含`image 镜像名`，`preJob 任务`，`env环境变量`，`metrics 监控`，`logs 日志`，`resources 资源限制`。部署时需要修改`preJob` 和 `env` 中关于数据库信息，kafka，注册中心，配置中心等配置为实际的值。

**3.** 确认信息无误后，可以点击`部署` 来部署应用。

**4.** 选择已经部署的应用，右侧的`查看实例详情`，可以查看到阶段信息及日志。

> **如何判断某版本的应用已经部署成功并通过？**
>
>* 当实例出现在列表中，且实例名称后没有报错提示`icon`即为部署成功生成实例；
>* 当容器状态条为绿色，且容器状态显示为`1/1`时，表示新部署的实例通过健康检查。

**5.** 此服务部署好之后，有可能不会注册到注册中心中，因为当前版本的注册中心只会监听同一`k8s`集群`命令空间`的微服务。 所以服务需要和注册中心部署到一个项目下。可以通过`register-server:8000/eureka/apps` 查看服务是否注册成功。

## 总结

通过上述的步骤，就可以很快速的在Choerodon 中创建并部署一个后端的服务。

任何产品几乎都会经历产品的初创期、成长期、成熟期。在产品的初创期，需要通过快速试错探索出有用户黏性的功能；探索成功之后，就需要快速导入用户，这时候也会产生新的需求和新的问题，不断去完善产品；在产品的相对成熟期，则可以考虑产品的变现，和新功能的延展，以提升用户活跃。因此，当一个产品开发完成上线后，产品的周期化迭代就变得非常重要。固定的周期有助于为项目团队形成规范，从而提高开发效率。

Choerodon第一次发版前就准备好下个版本的需求。一般第一个版本上线后，开发人员就进入下一个版本的开发和测试。这样当问题暴露的时候，就可以迅速解决问题，优化到某个程度后，再放缓迭代节奏，这样就能更好的平衡好需求。


