+++
title = "创建一个前端应用"
description = "从创建前端应用、创建前端应用模板、开发前端应用、生成版本、部署应用、配置网络、配置域名等方面介绍"
weight = 3

+++

# 创建一个前端应用
---

## 概述

就前端主流技术框架的开发而言，过去几年里发展极快，在填补原有技术框架空白和不足的同时也渐渐趋于成熟。未来前端在已经趋向成熟的技术方向上面会慢慢稳定下来，并进入技术迭代优化阶段，但这并不代表前端领域技术就此稳定了，因为新的技术方向已经出现，并在等待下一个风口的到来。可能是虚拟现实也有可能是人工智能或者其他。

Choerodon 使用 `React` 作为前端应用框架，并且对前端的展示做了一定的封装和处理，能够让用户方便快捷地进行前端应用的开发和部署。`React`和`MobX`是一对强力组合，`React`通过提供机制把应用状态转换为可渲染组件树并对其进行渲染。而`MobX`提供机制来存储和更新应用状态供`React`使用。 这种机制就是通过使用虚拟`DOM`来减少昂贵的`DOM`变化的数量。`MobX` 提供了优化应用状态与 `React` 组件同步的机制，这种机制就是使用响应式虚拟依赖状态图表，它只有在真正需要的时候才更新并且永远保持是最新的。

同时为了使前端开发更加规范，合理进行，Choerodon为大家准备了前端组件`Choerodon UI`，了解详情请前往[Choerodon UI](http://ui.choerodon.io/docs/react/introduce-cn)。
## 目标

本章节将从创建前端应用、开发前端应用、部署应用、配置网络、配置域名等方面介绍，让读者能够熟悉使用Choerodon创建前端应用的步骤和流程，并且学会如何利用Choerodon创建并部署前端应用。

## 前置条件

**1.** 在操作之前保证[系统配置](../../user-guide/system-configuration)已经配置完全。特别在本章节用到的角色、环境管理等配置。

**2.** 完成[创建项目](../project)操作。本章节使用在前面章节创建的项目`猪齿鱼研发`。

**3.** 完成[创建环境](../../user-guide/deployment-pipeline/environment-pipeline)，环境流水线中有状态为运行中的环境。

## 创建前端应用

**1.** 使用拥有项目所有者角色的用户登录Choerodon系统，选择项目``猪齿鱼研发``。

 ![选择项目](/docs/quick-start/image/microservice-front1.png)

**2.** 选择`应用管理`模块，点击`应用`，进入应用管理页面。

 ![点击选择应用](/docs/quick-start/image/microservice-front44.png)

**3.** 点击`创建应用`，系统会从右边滑出页面，在页面中输入`应用编码`、`应用名称`，`应用模板`，`应用模板`选择`MicroServiceFront`。点击`创建`按钮→ ![创建按钮](/docs/quick-start/image/microservice-front3.png)即可创建一个前端应用。

字段名 | 输入值
---|--- 
应用编码 | `choerodon-front-demo`
应用名称 | `猪齿鱼前端Demo应用`
选择应用模板 | `MicroServiceFront`

 ![创建应用](/docs/quick-start/image/microservice-front2.png)

> 当应用模板不符合您的需求，您可手动创建一个[应用模板](../../user-guide/application-management/application-template/)。 
   
**4.** 当应用创建成功，可在`应用管理`模块，点击`应用` 界面查看到新建的应用。

刚创建的应用状态为创建中，操作不可用，等待一会，状态变为启用，操作可用。

 ![应用启用](/docs/quick-start/image/microservice-front4.png)

**5.** 在创建应用的同时，系统会对应在`Gitlab`中创建一个仓库

选择 `开发流水线`点击`代码仓库`，

 ![选择代码仓库](/docs/quick-start/image/microservice-front6.png)

找到创建好的应用，点击`仓库地址`，链接到`Gitlab`新建的仓库。

 ![点击仓库地址](/docs/quick-start/image/microservice-front7.png)

 Choerodon平台与Citlab名词关系

Choerodon 名词 | 对应Gitlab 名词 | 举例
---|---|---
项目名 | 组名 | `猪齿鱼研发`
应用编码 | 项目名 |`choerodon-front-demo`
应用名称 | 无 |`猪齿鱼前端Demo应用`

> gitlab仓库里会生成相应模板的相关文件
>
>![仓库相关文件](/docs/quick-start/image/microservice-front8.png)

## 开发前端应用

应用创建完成之后，开发前端应用。具体的操作步骤如下：

**1. 创建分支**

在 `开发流水线` -> `分支` 界面，

 ![选择分支](/docs/quick-start/image/microservice-front9.png)

选择应用`猪齿鱼前端Demo应用`，点击创建分支

 ![创建分支](/docs/quick-start/image/microservice-front10.png)

选择对应的`issue` 问题，分支来源选择`master`，选择相应分支类型，填写分支名称，如`feature-choerodon-dev-1`。点击`创建`按钮，即可创建一个分支。

 ![分支信息](/docs/quick-start/image/microservice-front11.png)

> Choerodon提供五种分支类型，可根据问题选择对应分支类型
>
> ![分支类型](/docs/quick-start/image/microservice-front12.png)

分支创建成功后，可在开发流水线模块，点击分支，查看创建的分支

 ![查看分支](/docs/quick-start/image/microservice-front13.png)

Choerodon 建议使用 [`github-flow`](https://guides.github.com/introduction/flow/)作为分支管理策略的主体。并在此基础上，参考了一些其他策略，对开发者的开发分支做了一定程度上的细分。更多相关信息参考[分支管理](../../user-guide/development-pipeline/branch/)。

**2. 拉取代码仓库**

在`开发流水线` -> `代码仓库` 找到`choerodon-front-demo` 的`仓库地址`。通过`git` 命令拉取生成的项目代码。然后切换到对应分支进行本地开发。

``` bash
$ git clone `仓库地址`
$ cd ./choerodon-front-demo
$ git checkout feature-choerodon-dev-1
```

**3. 本地开发**

将代码克隆到本地后，就可以在本地进行开发。

Choerodon 提供的`MicroServiceFront` 应用模板本身生成的应用可以直接运行在平台上。更多具体的开发参考[前端开发手册](../../development-guide/front/)。

**4. 修改`ci` 文件**

模板中包含`.gitlab-ci.yml`文件。

`.gitlab-ci.yml`定义 `Gitlab CI` 的阶段，Choerodon 缺省的 CI 流程包含了`编译`，`打包`，`生成镜像`，`生成helm 包`几个阶段。	

有关`.gitlab-ci.yml` 的编写参考[应用模板](../../user-guide/application-management/application-template/)。

**5. 修改`charts` 文件**

模板中包含`charts` 文件夹。

`charts`模块用于创建应用时生成创建 `k8s` 对象，包含了`部署的模板`，`chart values`。

有关`charts` 的编写参考[应用模板](../../user-guide/application-management/application-template/)。

**6. 修改`Dockerfile` 文件**

Choerodon 使用`docker` 来运行应用。你可以通过修改`Dockerfile` 来修改应用的运行环境。

有关`Dockerfile` 的编写参考[应用模板](../../user-guide/application-management/application-template/)。

**7. 提交代码**

当本地修改结束后，需要将本地仓库的代码提交到远程分支上。

``` bash
$ git add .
$ git commit -m "[ADD] init choerodon-front-todo"
$ git push origin feature-choerodon-dev-1
```

提交的commit信息建议遵循Choerodon 的规范:

* [IMP] 提升改善正在开发或者已经实现的功能
* [FIX] 修正BUG
* [REF] 重构一个功能，对功能重写
* [ADD] 添加实现新功能
* [REM] 删除不需要的文件

**9. 代码集成**

提交代码后，根据gitlab中`.gitlab-ci.yml`文件定义的阶段，生成一条CI流水线，可在`开发流水线` -> `持续集成`页面查看持续集成。

选择`猪齿鱼前端Demo应用`应用，查看持续集成

 ![查看持续集成](/docs/quick-start/image/microservice-front14.png)

点击阶段跳转到`Gitlab` 查看`ci`进度。

 ![点击阶段跳转](/docs/quick-start/image/microservice-front15.png)

 ![gitlab查看持续集成](/docs/quick-start/image/microservice-front16.png)

**10. 合并分支**　

当`ci`执行通过以后，可以将`feature-choerodon-dev-1`分支合并到`master`分支上。合并后，分支可选择删除或保留继续开发。

在`开发流水线` -> `合并请求` 页面，选择应用`猪齿鱼前端Demo应用`。点击`创建合并请求`，跳转到`Gitlab`。

 ![点击创建合并请求](/docs/quick-start/image/microservice-front17.png)

 分别选择源分支为`feature-choerodon-dev-1` ，目标分支为`master`，并提交合并请求。

  ![选择源分支](/docs/quick-start/image/microservice-front18.png)

 等待`ci流水线`通过后，点击合并分支。

 ![合并分支](/docs/quick-start/image/microservice-front19.png)

当`master` 分支的`ci流水线` 通过以后。在`应用管理` -> `应用版本` 可以找到`猪齿鱼前端Demo应用`生成的对应版本。

 ![选择应用版本](/docs/quick-start/image/microservice-front20.png)

 ![查看应用版本](/docs/quick-start/image/microservice-front21.png)

> gitlab中docker_build阶段日志也可查看相应版本
>
> ![docker_build阶段查看版本](/docs/quick-start/image/microservice-front22.png)

## 部署应用

提供可视化、一键式部署应用，支持并行部署和流水线无缝集成，实现部署环境标准化和部署过程自动化。更多相关信息参考[应用部署](../../user-guide/deployment-pipeline/application-deployment/)

**1.** 使用部署管理员的角色登录Choerodon系统，选择项目`猪齿鱼研发`。

**2.** 进入`部署流水线`模块，选择`应用部署` 进入应用部署界面。

 ![选择应用部署](/docs/quick-start/image/microservice-front23.png)

**3.** 点击`打开应用列表`，选择应用`猪齿鱼前端Demo应用`。点击`选择版本`，选择`猪齿鱼前端Demo应用` 相应版本，点击下一步。

 ![选择应用版本](/docs/quick-start/image/microservice-front24.png)

**4.** 点击`选择环境`，选择一个环境。该应用相应版本在该环境下的部署配置信息会展现在底下。如果没有环境，请先完成[创建环境](../../user-guide/deployment-pipeline/environment-pipeline)。

 ![选择环境](/docs/quick-start/image/microservice-front25.png)

**5.** 配置信息可修改，并提供实时校验yaml格式，相关图示如下。然后点击下一步。

 ![修改配置信息](/docs/quick-start/image/microservice-front26.png)

**6.** 选择`新建实例`。如果此应用在该环境中已有部署的实例，则可以选择`替换实例`，替换实例会更新该实例的镜像及配置信息，未修改配置信息或版本相同不可选择替换实例。点击下一步，生成预览信息。

 ![新建实例](/docs/quick-start/image/microservice-front27.png)

**7.** 确认信息，点击`部署`来部署应用。

确认部署信息

 ![确认部署信息](/docs/quick-start/image/microservice-front28.png)

点击`部署`按钮来部署应用

 ![点击部署按钮](/docs/quick-start/image/microservice-front29.png)

点击部署按钮后，页面自动跳转到`实例`页面

 ![实例页面](/docs/quick-start/image/microservice-front31.png)

 > **实例界面详情**
 >
 > 1. 提供四种不同视图查看实例
 > 2. 实例列表
 > 3. 操作实例状态，同步提示或错误提示<br>
 > 同步提示<br>
 > ![同步中](/docs/quick-start/image/microservice-front34.png)<br>
 > 错误提示<br>
 > ![错误提示](/docs/quick-start/image/microservice-front30.png)
 > 4. 实例可进行的操作<br>
 >

 实例列表具体字段含义如下：

 字段名 | 含义
|---|---|
容器状态 | pod的运行个数和运行状态
实例状态 | 实例的运行状态
实例名称 | 实例的名称
应用 | 实例所属应用实例部署的环境

**8.** 选择已经部署的应用，右侧的`查看实例详情`，可以查看实例运行及部署详情。

查看实例运行详情

 ![查看实例详情](/docs/quick-start/image/microservice-front32.png)

查看实例阶段信息及日志

 ![查看阶段及日志](/docs/quick-start/image/microservice-front33.png)

> **如何判断某版本的应用已经部署成功并通过？**
>
>* 查看实例列表，实例状态为运行中且实例名称后无错误提示即为部署成功生成实例；
>* 当容器状态条为绿色，表示新部署的实例通过健康检查。

## 配置网络

前端应用部署成功以后，需要创建对应的网络，才能够被外部访问。更多相关信息参考[网络管理](../../user-guide/deployment-pipeline/service/)

**1.** 使用部署管理员的角色登录Choerodon系统，选择项目``猪齿鱼研发``。

**2.** 进入`部署流水线`模块，选择`网络`。

 ![选择网络](/docs/quick-start/image/microservice-front37.png)

**3.** 点击`创建网络`按钮 → ![创建网络按钮](/docs/quick-start/image/microservice-front38.png)，输入如下信息：

字段名 | 含义
|---|---|
环境名称 | 选择要部署的环境。如果没有环境，请先完成[创建环境](../../user-guide/deployment-pipeline/environment-pipeline)
应用名称 | 猪齿鱼前端Todo应用
版本 | 正在运行的应用版本
实例 | 部署的实例id
网络名称 | 名称默认为`应用编码-4位随机码`，且可手动修改
外部IP | k8s集群节点ip，默认随机分配节点
端口号 | 网络开放的端口号
目标端口号 | 网络选择的目标实例所暴露的端口号

 ![配置网络信息](/docs/quick-start/image/microservice-front39.png)

**4.** 点击`创建` 按钮，网络创建成功。

可在`部署流水线`模块，`网络`页面查看创建的网络

 ![查看网络](/docs/quick-start/image/microservice-front40.png)

## 配置域名
  
创建对应的网络后，同时需要给网络指定外网域名，这样外部可以直接通过域名访问到前端。更多相关信息参考[域名管理](../../user-guide/deployment-pipeline/ingress/)

**1.** 使用部署管理员的角色登录Choerodon系统，选择项目`猪齿鱼研发`。

**2.** 进入`部署流水线`模块，选择`域名`。

**3.** 点击`创建域名`按钮 → ![创建域名按钮](/docs/quick-start/image/microservice-front43.png)，输入如下信息：

字段名 | 含义
|---|---|
域名 | 测试域名
域名地址 | choerodon.io（请填写所属环境集群主机绑定的域名及其子域名地址）
路径 | 默认为根目录`/`，遵循`Ant path`的规范
网络 | 选择上一步创建的网络

 ![配置域名](/docs/quick-start/image/microservice-front41.png)

**4.** 点击`创建` 按钮，域名创建成功。

可在`部署流水线`模块，`域名`界面，查看已创建的域名

 ![配置域名](/docs/quick-start/image/microservice-front42.png)

## 环境总览

总览环境下的所有部署信息，并可以进行一些对应的快捷操作。更多相关信息参考[环境总览](../../user-guide/deployment-pipeline/environments-overview/)。

**1.** 使用部署管理员的角色登录Choerodon系统，选择项目`猪齿鱼研发`。

**2.** 进入`部署流水线`模块，选择`环境总览`。

 ![选择环境总览](/docs/quick-start/image/microservice-front35.png)

**3.** 环境总览界面

 ![环境总览界面](/docs/quick-start/image/microservice-front36.png)

 > **环境总览界面提供快捷操作，并默认选中环境**
 >
 > 1. 选择环境
 > 2. 进入应用部署界面
 > 3. 创建网络操作
 > 4. 创建域名操作
 > 5. 跳转至对应环境的配置库
 > 6. 创建网络操作，默认选中相应应用和实例
 > 7. 创建域名操作，默认选中相应应用和实例

## 相关文档

* [系统配置](../../user-guide/system-configuration)
* [创建项目](../project)
* [创建环境](../../user-guide/deployment-pipeline/environment-pipeline)
* [应用模板](../../user-guide/application-management/application-template/)
* [分支管理](../../user-guide/development-pipeline/branch/)
* [前端开发手册](../../development-guide/front/)
* [应用部署](../../user-guide/deployment-pipeline/application-deployment/)
* [域名管理](../../user-guide/deployment-pipeline/ingress/)
* [网络管理](../../user-guide/deployment-pipeline/service/)
* [环境总览](../../user-guide/deployment-pipeline/environments-overview/)
