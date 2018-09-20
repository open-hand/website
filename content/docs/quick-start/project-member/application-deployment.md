+++
title = "部署一个应用"
description = "介绍了如何部署一个应用"
weight = 4
type = "docs"
+++


# 部署一个应用
---
## 概述
部署应用指将应用的某一个版本部署至指定环境的操作，提供可视化、一键式部署应用，支持并行部署和流水线无缝集成，实现部署环境标准化和部署过程自动化。

## 目标

本章节将以应用“`choerodon-front-demo`”的部署为例进行展开，在具体的步骤中让读者了解如何在环境中去部署一个应用。

## 前置条件
**1.** 在操作之前保证[系统配置](../../../user-guide/system-configuration)已经配置完全。特别是本章节用到的角色、环境管理等配置。

**2.** 用户已创建好一个应用，并生成了相应的应用版本。


## 部署应用

具体操作步骤如下：

**第一步：** 使用部署管理员的角色登录Choerodon系统，选择项目`猪齿鱼研发`。

**第二步：** 进入`部署流水线`模块，选择`应用部署` 进入应用部署界面。  

![选择应用部署](/docs/quick-start/image/microservice-front23.png)

**第三步：** 点击`选择应用`，找到已经提交的`choerodon-front-demo`。点击`选择版本`，选择`choerodon-front-demo` 最新的版本，点击`下一步`。 

![选择应用版本](/docs/quick-start/image/microservice-front24.png)

**第四步：** 点击`选择环境`，选择一个环境。部署的环境信息会展现在底下。如果没有环境，请先完成[创建环境](../../../user-guide/deployment-pipeline/environment-pipeline)。  
![选择环境](/docs/quick-start/image/microservice-front25.png)

**第五步：** 根据实际的配置，配置部署应用所需的配置信息。然后点击下一步。  
 ![修改配置信息](/docs/quick-start/image/microservice-front26.png)

**第六步：** 选择`新建实例`。如果环境中已有一个实例，则可以选择`替换实例`。点击`下一步`，生成预览信息。  
 ![新建实例](/docs/quick-start/image/microservice-front27.png)

**第七步：** 确认信息无误后，可以点击`部署` 来部署应用，页面自动跳转到`实例`页面。  
 ![确认部署信息](/docs/quick-start/image/microservice-front28.png)  

 >**实例界面详情**，更多相关信息以及详细操作步骤参考[实例管理](../../../user-guide/deployment-pipeline/instance)。
 
 > 1.提供四种不同视图查看实例

 > 2.实例列表

 > 3.操作实例状态，同步提示或错误提示<br>

 > 同步提示<br>
 > ![同步中](/docs/quick-start/image/microservice-front34.png)<br>
 > 错误提示<br>
 > ![错误提示](/docs/quick-start/image/microservice-front30-2.png)

 > 4.实例可进行的操作<br>
 >

 实例列表具体字段含义如下：

- 容器状态：pod的运行个数和运行状态
- 实例状态：实例的运行状态
- 实例名称：实例的名称
- 应用：实例所属应用实例部署的环境


**第八步：** 选择已经部署的应用，右侧的`查看实例详情`，可以查看到阶段信息及日志。  
![查看实例详情](/docs/quick-start/image/microservice-front32.png)

> **如何判断某版本的应用已经部署成功并通过？**
>
>* 当实例出现在列表中，且实例名称后没有报错提示`icon`即为部署成功生成实例；
>* 当容器状态条为绿色，且容器状态显示为`1/1`时，表示新部署的实例通过健康检查。
  
  完成了该应用的部署之后，您就可以进行后续的添加网络、添加域名等操作，以便您能通过浏览器来访问所部署的应用。
## 相关文档
- [系统配置](../../../user-guide/system-configuration)  
- [创建环境](../../../user-guide/deployment-pipeline/environment-pipeline)