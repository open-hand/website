+++
title = "创建一个微服务后端"
description = ""
weight = 3
type = "docs"
+++

# 微服务后端

  本页面介绍了以DevOps平台为基础，演示了微服务后端服务从新建到部署等流程操作。使用本页面，你可以了解：

   - [新建服务](#1)
   - [服务版本](#2)
   - [服务发布](#3)
   - [新建资源](#4)
   - [网关管理](#5)
   - [服务部署](#6)
 
   在操作之前保证[系统配置](../../user-guide/system-configuration)已经配置完全。

<h2 id="1">新建服务</h2>

- **菜单层次**：项目层
- **菜单路径**：开发管理 > 服务
- **默认角色**：项目所有者、源代码管理员
 
1. 点击`创建`按钮。

    ![](../assets/microservice-backend/服务创建.png)

1. 输入 “服务编码” 、 “服务名称” 、以及 “服务组” ，并选择相应服务类型，点击 `创建` 按钮。

    a. 服务编码只能包含字母、数字、_、.、破折号和空格并且不能包含大写字母

    b. 服务组输入不能包含中文或大写字母,不能以'.'开头或结尾
    
    ![](../assets/microservice-backend/服务创建信息.png)

1. 新建服务 “webservice0310” 已在服务管理列表中。

    ![](../assets/microservice-backend/开发区服务列表.png)

1. gitlab已自动创建好对应服务类型的代码库 “webservice0310” 。点击 `仓库地址` ，可以查看该服务在gitlab的代码仓库。

    ![](../assets/microservice-backend/仓库地址.png)

    注：新建服务的演示使用的是模板

<h2 id="2">服务版本</h2>

 服务版本是代码提交的历史记录，每提交一次修改后的代码，对应生成一个新的版本。

  - **菜单层次**：项目层
  - **菜单路径**：开发管理 > 服务> 服务详情 > 服务版本
  - **默认角色**：项目所有者、源代码管理员、项目成员

1. 进入服务详情后， 查看服务CI pipeline的完成情况，只有CI各个阶段跑成功了才会生成一条服务版本信息。

    ![](../assets/microservice-backend/流水线.png)

1. 查看服务版本信息。

    ![](../assets/microservice-backend/开发区服务版本.png)

<h2 id="3">服务发布</h2>

  该模块提供将服务发布至不同环境的功能，向目标环境传输部署文件，同时附带服务版本信息以便追踪。 

  - **菜单层次**：项目层
  - **菜单路径**：开发管理 > 发布
  - **默认角色**：项目所有者、源代码管理员、项目成员 

1. 点击 `发布` 。

    ![](../assets/microservice-backend/发布.png)

1. 关键字搜索或直接从从下拉列表中选择部署文件发布的环境，已发布的环境不能重新发布。发布的环境需要先在组织层配置。

    ![](../assets/microservice-backend/发布环境.png)

    注：[环境配置](../../user-guide/system-configuration#5)

1. 该服务部署文件已成功发布在某个环境。

    ![](../assets/microservice-backend/已发布环境信息.png)

1. 设置服务 “自动发布”，下一次生成的服务版本会自动发布到已配置的环境。[自动发布配置](../../user-guide/continuous-integration#6)

<h2 id="4">新建资源</h2>

1. 定义部署时需要使用的资源。[资源配置](../../user-guide/continuous-deployment#1)

<h2 id="5">网关管理</h2>

1. 为所选的微服务将网关信息注册至微服务管理服务。[网关配置](../../user-guide/continuous-deployment#2)

<h2 id="6">服务部署</h2>

  提供可视化、一键式部署服务，支持并行部署和流水线无缝集成，实现部署环境标准化和部署过程自动化。
  
  - **菜单层次**：组织层
  - **菜单路径**：部署管理 > 服务
  - **默认角色**：部署管理员

1. 点击 `部署管理`  ，点击 `服务` ，查看服务列表。

    ![](../assets/microservice-backend/运行区服务列表.png)

1. 点击`详情`。

    ![](../assets/microservice-backend/详情.png)

1. 查看该服务版本信息。

    ![](../assets/microservice-backend/运行区服务版本.png)

1. 在服务列表中找到要部署的服务，点击`详情`，例如"webservice0310"。

    ![](../assets/microservice-backend/运行区服务列表1.png)

1. 选择发布的版本，点击`部署服务`。

    ![](../assets/microservice-backend/服务部署.png) 

1. 进行资源选择，点击`部署`。

    ![](../assets/microservice-backend/部署信息.png) 

    注：服务第一次部署需要自己手动填写资源，再次部署页面会显示上一次部署选择的资源。选择资源一定要谨慎，选择错误严重会导致数据库数据丢失。

1. 点击`详情`，可在运行中查看正在部署/运行的版本，以及对容器数量进行调整。

    ![](../assets/microservice-backend/运行的版本.png)

    > 注：可用容器数量、当前容器数量、期望容器数量都为1时，代表该服务已经部署好了。期望容器数量的加减实际是对kubernetes的pod数量的加减，例如期望容器数量为2，代表kubernetes启动了2个pod，其中一个挂了，还能保证程序正常使用，目前期望容器数量不可为0。

1. [灰度部署](../../user-guide/continuous-deployment#4)用于保障系统稳定，验证某服务版本是否正常使用，验证正常后再转为正式部署。

1. 设置了[自动部署](../../user-guide/continuous-deployment#4)，服务版本发布了不再需要手动部署。