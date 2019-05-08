+++
title = "创建一个前端应用"
description = "从创建前端应用、创建前端应用模板、开发前端应用、生成版本、部署应用、配置网络、配置域名等方面介绍"
weight = 1

+++

# 创建一个前端应用
---

## 概述

Choerodon 使用 `React` 作为前端应用框架，并且对前端的展示做了一定的封装和处理，能够让用户方便快捷地进行前端应用的开发和部署。Choerodon使用`Mobx`进行状态管理，同时为了使前端开发更加规范，合理进行，Choerodon提供了前端组件`Choerodon UI`，了解详情请前往[Choerodon UI]( http://v0-10.website.staging.saas.hand-china.com/zh/docs/ui/)。

## 目标

本章节将在`猪齿鱼研发`项目下，以`猪齿鱼前端Demo应用`为例，从创建前端应用、开发前端应用、部署应用、配置网络、配置域名等方面介绍，让读者能够熟悉使用Choerodon创建前端应用的步骤和流程，并且学会如何利用Choerodon创建并部署前端应用。

## 前置条件

**1.** 在操作之前保证[系统配置](../../../user-guide/system-configuration)已经配置完全。特别在本章节用到的角色、环境管理等配置。

**2.** 完成[创建项目](../../admin/project)操作。本章节使用在前面章节创建的项目`猪齿鱼研发`。

**3.** 完成[创建环境](../../../user-guide/deployment-pipeline/environment-pipeline)，环境管理中有状态为运行中的环境。

## 创建前端应用

具体的操作步骤如下：

**第一步：** 使用拥有项目所有者或项目成员（环境成员）角色的用户登录Choerodon系统，选择项目`猪齿鱼研发`。

**第二步：** 选择`应用管理`模块，点击`应用`，进入应用管理页面。

**第三步：** 点击`创建应用`，系统会从右边滑出页面，在页面中输入`应用编码`、`应用名称`，`应用模板`，`应用模板`选择`MicroServiceFront`。点击`创建`按钮即可创建一个前端应用。

例如，

- 应用编码：choerodon-front-demo
- 应用名称：猪齿鱼前端Demo应用
- 选择应用模板：MicroServiceFront

![创建应用](/docs/quick-start/image/microservice-front2.png)

{{< note >}}当应用模板不符合您的需求，您可手动[创建一个应用模板](../../../quick-start/admin/application-template/)，在此之前您必须拥有组织管理员角色权限。
 {{< /note >}} 

**第四步：** 当应用创建成功，可在`应用管理` -> `应用` 界面查看到新建的应用。

刚创建的应用状态为创建中，操作不可用，等待一会，状态变为启用，操作可用。

**第五步：** 在创建应用的同时，系统会对应在`Gitlab`中创建一个仓库。

选择 `开发流水线` -> `代码仓库`界面，找到创建好的应用，点击`仓库地址`，链接到`Gitlab`新建的仓库。

 ![点击仓库地址](/docs/quick-start/image/microservice-front7.png)

进入仓库地址，gitlab仓库里会生成相应模板的相关文件。

![仓库相关文件](/docs/quick-start/image/microservice-front8.png)

Choerodon 平台与 Gitlab 名词关系如下：

Choerodon 名词 | 对应 Gitlab 名词 | 举例
---|---|---
项目名 | 组名 | `猪齿鱼研发`
应用编码 | 项目名 |`choerodon-front-demo`
应用名称 | 无 |`猪齿鱼前端Demo应用`

## 开发前端应用

应用创建完成之后，开发前端应用。

具体的操作步骤如下：

**第一步：创建分支**

分支是将开发工作从主线上分离开来，以免影响主线。 更多相关信息参考[分支管理](../../../user-guide/development-pipeline/branch/)。

在 `开发流水线` -> `分支` 界面，选择应用`猪齿鱼前端Demo应用`，点击创建分支。选择对应的`issue` 问题，分支来源选择`master`，选择相应分支类型，填写分支名称，如`feature-choerodon-dev-1`。点击`创建`按钮，即可创建一个分支。

 ![分支信息](/docs/quick-start/image/microservice-front11.png)

<blockquote class="note">
   Choerodon提供master、feature、bugfix、release、hotfix、custom六种分支类型，可根据问题选择对应分支类型。
 </blockquote>

分支创建成功后，可在 `开发流水线` -> `分支` 界面查看创建的分支。

**第二步：拉取代码仓库**

在`开发流水线` -> `代码仓库` 找到`choerodon-front-demo` 的`仓库地址`。通过`git` 命令拉取生成的项目代码。然后切换到对应分支进行本地开发。

``` bash
$ git clone `仓库地址`
$ cd ./choerodon-front-demo
$ git checkout feature-choerodon-dev-1
```

**第三步：本地开发**

将代码克隆到本地后，就可以在本地进行开发。

 - Choerodon 提供的`MicroServiceFront` 应用模板本身生成的应用可以直接运行在平台上。更多具体的开发参考[前端开发手册](../../../development-guide/front/)。

**第四步：修改`ci` 文件**

模板中包含`.gitlab-ci.yml`文件。有关`.gitlab-ci.yml` 的编写参考[应用模板](../../../user-guide/application-management/application-template/)。

 - `.gitlab-ci.yml`定义 `Gitlab CI` 的阶段，Choerodon 缺省的 CI 流程包含了`编译`，`打包`，`生成镜像`，`生成helm 包`几个阶段。	

**第五步：修改`charts` 文件**

模板中包含`charts` 文件夹。有关`charts` 的编写参考[应用模板](../../../user-guide/application-management/application-template/)。

 - `charts`模块用于创建应用时生成创建 `k8s` 对象，包含了`部署的模板`，`chart values`。

**第六步：修改`Dockerfile` 文件**

Choerodon 使用`docker` 来运行应用。有关`Dockerfile` 的编写参考[应用模板](../../../user-guide/application-management/application-template/)。

 - 你可以通过修改`Dockerfile` 来修改应用的运行环境。

**第七步：提交代码**

当本地修改结束后，需要将本地仓库的代码提交到远程分支上。

``` bash
$ git add .
$ git commit -m "[ADD] init choerodon-front-todo"
$ git push origin feature-choerodon-dev-1
```

提交的commit信息建议遵循Choerodon 的规范：

* [IMP] 提升改善正在开发或者已经实现的功能
* [FIX] 修正BUG
* [REF] 重构一个功能，对功能重写
* [ADD] 添加实现新功能
* [REM] 删除不需要的文件

**第八步：代码集成**

提交代码后，根据gitlab中`.gitlab-ci.yml`文件定义的阶段，生成一条 CI 流水线，可在`开发流水线` -> `持续集成`页面查看持续集成。

选择`猪齿鱼前端Demo应用`应用，查看持续集成，点击阶段跳转到`Gitlab` 查看 CI 进度。

 ![查看持续集成](/docs/quick-start/image/microservice-front14.png)

 ![gitlab查看持续集成](/docs/quick-start/image/microservice-front16.png)

**第九步：合并分支**

当 CI 执行通过以后，可以将`feature-choerodon-dev-1`分支合并到`master`分支上。合并后，分支可选择删除或保留继续开发。

在`开发流水线` -> `合并请求` 页面，选择应用`猪齿鱼前端Demo应用`。点击`创建合并请求`，跳转到`Gitlab`。

 分别选择源分支为`feature-choerodon-dev-1` ，目标分支为`master`，并提交合并请求。

  ![选择源分支](/docs/quick-start/image/microservice-front18.png)

 等待`ci流水线`通过后，点击合并分支。

当`master` 分支的`ci流水线` 通过以后。在`应用管理` -> `应用版本` 可以找到`猪齿鱼前端Demo应用`生成的对应版本。

 ![查看应用版本](/docs/quick-start/image/microservice-front21.png)

gitlab中docker_build阶段日志也可查看相应版本。

![docker_build阶段查看版本](/docs/quick-start/image/microservice-front22.png)

## 部署应用

提供可视化、一键式部署应用，支持并行部署和流水线无缝集成，实现部署环境标准化和部署过程自动化。更多相关信息以及详细操作步骤参考[部署一个应用](../../project-member/application-deployment/)。

具体的操作步骤如下：

**第一步：** 使用项目所有者的角色登录Choerodon系统，选择项目`猪齿鱼研发`。

**第二步：** 进入`部署流水线`模块，选择`应用部署` 进入应用部署界面。

**第三步：** 选择应用`猪齿鱼前端Demo应用`，按照步骤条完成信息选择。选择`新建实例`。如果此应用在该环境中已有部署的实例，则可以选择`替换实例`，替换实例会更新该实例的镜像及配置信息，未修改配置信息或版本相同不可选择替换实例。

 ![部署应用步骤](/docs/quick-start/image/microservice-front45.png)

<blockquote class="note">
  配置信息可修改，并提供实时校验yaml格式
 </blockquote> 

**第四步：** 点击部署按钮后，页面自动跳转到`实例`页面。

> **如何判断某版本的应用已经部署成功并通过？**
>
>* 查看实例列表，实例状态为运行中且实例名称后无错误提示即为部署成功生成实例；
>* 当容器状态条为绿色，表示新部署的实例通过健康检查。

## 配置网络

前端应用部署成功以后，需要创建对应的网络，才能够被外部访问。更多相关信息以及详细操作步骤参考[配置网络和域名](../../project-member/config-service-and-domain/)。

具体的操作步骤如下：

**第一步：** 使用项目所有者的角色登录Choerodon系统，选择项目``猪齿鱼研发``。

**第二步：** 进入`部署流水线`模块，选择`网络`。

**第三步：** 点击`创建网络`按钮，选择环境、应用、实例，输入如下信息，创建网络。

例如，

- 环境名称：猪齿鱼环境
- 应用名称：猪齿鱼前端Todo应用
- 实例：choerodon-front-demo-627fb
- 端口: 80
- 目标端口: 80
- 网络名称：choerodon-front-demo-16dc

 ![配置网络信息](/docs/quick-start/image/microservice-front39.png)

**第四步：** 网络创建成功，可在`部署流水线` -> `网络`页面查看创建的网络。

## 配置域名
  
创建对应的网络后，同时需要给网络指定外网域名，这样外部可以直接通过域名访问到前端。更多相关信息以及详细操作步骤参考[配置网络和域名](../../project-member/config-service-and-domain/)。

具体的操作步骤如下：

**第一步：** 使用项目所有者的角色登录Choerodon系统，选择项目`猪齿鱼研发`。

**第二步：** 进入`部署流水线`模块，选择`域名`。

**第三步：** 点击`创建域名`按钮 ，选择环境，输入域名名称、域名地址、路径、网络、端口，创建域名

例如，

- 环境名称：猪齿鱼环境
- 域名名称：choerodon-front-demo
- 域名地址：choerodon-front-demo.alpha.saas.hand-china.com（请填写所属环境集群主机绑定的域名及其子域名地址）
- 路径：默认为根目录`/`，遵循`Ant path`的规范
- 网络：选择上一步创建的网络
- 端口：80

 ![配置域名](/docs/quick-start/image/microservice-front41.png)

**第四步：** 域名创建成功，可在`部署流水线` -> `域名`界面查看已创建的域名。

上述步骤完成后，就成功创建一个前端应用了，创建成功后，您就可以继续相关开发了。

## 相关文档

* [Choerodon UI](http://ui.choerodon.io/docs/react/introduce-cn)
* [系统配置](../../../user-guide/system-configuration)
* [创建项目](../../admin/project)
* [创建环境](../../../user-guide/deployment-pipeline/environment-pipeline)
* [应用模板](../../../user-guide/application-management/application-template/)
* [分支管理](../../../user-guide/development-pipeline/branch/)
* [前端开发手册](../../../development-guide/front/)
* [应用部署](../../../user-guide/deployment-pipeline/application-deployment/)
* [域名管理](../../../user-guide/deployment-pipeline/ingress/)
* [网络管理](../../../user-guide/deployment-pipeline/service/)
* [应用部署](../../project-member/application-deployment/)
* [配置网络和域名](../../project-member/config-service-and-domain/)

