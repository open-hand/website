+++
title = "7.1.创建一个前端应用服务"
description = ""
weight = 1
+++

# 创建一个前端应用服务
## 目标
本章节将在猪齿鱼研发项目下，以猪齿鱼前端Demo应用服务为例，从创建前端应用服务、开发前端应用服务、部署应用服务等方面介绍，让读者能够熟悉使用Choerodon创建前端应用服务的步骤和流程，并且学会如何利用Choerodon创建并部署前端应用服务。

## 前置条件
1. 已部署安装Choerodon 猪齿鱼，并使用默认的 admin 用户名和密码登录了 Choerodon 系统。
2. 默认的 admin 用户进入 Choerodon 系统后，默认拥有一个组织并为该组织的组织管理员角色。关于Choerodon角色的详情，请移步角色管理。

    |账号|角色|职责|
    |---|---|---|
    |admin|组织管理员|管理组织下的项目和成员（组织成员、项目管理员、项目成员）|
3. 已完成项目创建及团队成员建设。

## 创建前端应用服务
具体的操作步骤如下：

**第一步：** 使用拥有项目所有者或项目成员（环境成员）角色的用户登录Choerodon系统，选择项目猪齿鱼研发。

**第二步：** 点击应用服务，进入应用服务页面。

**第三步：** 点击[导入应用服务](/zh/docs/user-guide/development/application-service/import/)，系统会从右边滑出页面，点击`从GitHub导入`，选择`系统预设模板`，应用模板选择`MicroServiceFront`模板，然后在页面中选择服务类型为`普通服务`，输入服务编码、服务名称。点击`导入`。

例如，

* 服务编码：choerodon-front-demo
* 服务名称：猪齿鱼前端Demo
* 选择应用服务模板：MicroServiceFront

![image](/docs/quick-start/devops/image/front-application-1.png)

**第四步：** 当应用服务表单提交之后，可点击项目下-应用服务菜单，查看到新建的应用服务，当应用服务的状态是启用时，表示应用服务创建成功。

**第五步：** 在创建应用服务的同时，系统会对应在Gitlab中创建一个仓库，点击仓库地址，可以链接到应用服务对应在Gitlab的代码仓库。

![image](/docs/quick-start/devops/image/front-application-2.png)

进入仓库地址，gitlab仓库里会生成相应模板的相关文件。

![image](/docs/quick-start/devops/image/front-application-3.png)

Choerodon 平台与 Gitlab 名词关系如下：

Choerodon 名词   | 对应 Gitlab 名词   | 举例
----|:----|:----
项目名   | 组名   | 猪齿鱼研发
应用服务编码   | 项目名   | choerodon-front-demo
应用服务名称   | 无   | 猪齿鱼前端Demo

## 开发前端应用服务
应用服务创建完成之后，开发前端应用服务。

具体的操作步骤如下：

**第一步：创建分支**

在 代码管理 -> 分支 界面，选择应用服务`猪齿鱼前端Demo`，点击`创建分支`，如果没有`issue`可选择，则先[创建问题](/zh/docs/user-guide/cooperation/work-lists/problem/)， 选择对应的issue。分支来源选择master，填写分支名称，如feature-choerodon-dev-1。点击创建按钮，即可创建一个分支。

![image](/docs/quick-start/devops/image/front-application-4.png)

> Choerodon 采用 [githubflow](https://guides.github.com/introduction/flow/)作为我们的分支管理策略的主体。并在此基础上，参考了一些其他策略，对开发者的开发分支做了一定程度上的细分。更多相关信息参考[分支管理](/zh/docs/user-guide/development/code-manage/manage-branch/)。

**第二步：拉取代码仓库**

在代码管理页面，选择应用服务猪齿鱼前端Demo， 点击复制仓库地址。通过git 命令拉取生成项目代码。然后切换到对应分支进行本地开发。

```sh
$ git clone `仓库地址`

$ cd ./choerodon-front-demo

$ git checkout feature-choerodon-dev-1
```

![image](/docs/quick-start/devops/image/front-application-5.png)

克隆代码时候，会让输入用户名，密码。用户名为平台用户名，密码为用户新建后收到的站内信中的Gitlab仓库密码，如果找不到，或者忘记密码，可以到个人信息页面重置GitLab仓库密码

![image](/docs/quick-start/devops/image/back-applications-4.png)

**第三步：本地开发**

将代码克隆到本地后，就可以在本地进行开发。

* Choerodon 提供的MicroServiceFront 应用模板本身生成的应用可以直接运行在平台上。更多具体的开发参考[前端开发手册](/zh/docs/development-guide/front/)。

**第四步：修改ci 文件**

通过Choerodon 提供的MicroServiceFront应用服务模板，会创建.gitlab-ci.yml。有关.gitlab-ci.yml 的编写参考[GitLab官方文档](https://docs.gitlab.com/ee/ci/yaml/README.html)。

* .gitlab-ci.yml定义 Gitlab CI 的阶段，Choerodon 缺省的 CI 流程包含了编译，打包，生成镜像，生成helm 包几个阶段。


**第五步：修改charts 文件**

通过Choerodon 提供的MicroServiceFront应用服务模板，会创建charts 文件夹。charts文件目录用于生成charts包，部署时会用到。有关charts 的编写参考[Helm官方文档](https://helm.sh/docs/chart_template_guide/getting_started/)。

> charts文件夹里面包含了k8s 对象的模板文件以及渲染这些对象文件的参数值文件values.yaml。

**chart相关介绍**:
      
目录结构如下：
```
|--charts
    ｜--model-service    
        ｜--templates               
        ｜--_helper.tpl
        ｜--deplopment.yaml
        ｜--pre-config-congig.yaml
        ｜--pre-config-db.yaml
        ｜--service.yaml
        ｜--.helmignore
        ｜--Chart.yaml
        ｜--values.yaml  
`templates`为模板文件，将模板文件渲染成实际文件，然后发送给 Kubernetes。

`values.yaml`为模板的预定义变量。                      

`Chart.yaml`包含 chart 的版本信息说明，您可以从模板中访问它。

`deployment.yaml`：创建 Kubernetes 部署的基本清单。

`service.yaml`：为您的部署创建服务端点的基本清单。

`_helpers.tpl`：放置模板助手的地方，您可以在整个 chart 中重复使用。
```

**第六步：修改Dockerfile 文件**

Choerodon 使用docker 来打包应用服务镜像。通过Choerodon 提供的MicroServiceFront应用服务模板，会有Dockerfile。有关Dockerfile 的编写参考[Docker官方文档](https://docs.docker.com/engine/reference/builder/)。

> 你可以通过修改Dockerfile 来修改应用的运行环境。

**第七步：提交代码**

当本地修改结束后，需要将本地仓库的代码提交到远程分支上。
```sh
$ git add .

$ git commit -m "[ADD] init choerodon-front-todo"

$ git push origin feature-choerodon-dev-1

提交的commit信息建议遵循Choerodon 的规范：
```

* [IMP] 提升改善正在开发或者已经实现的功能
* [FIX] 修正BUG
* [REF] 重构一个功能，对功能重写
* [ADD] 添加实现新功能
* [REM] 删除不需要的文件

**第八步：代码集成**

提交代码后，根据gitlab中.gitlab-ci.yml文件定义的阶段，生成一条 CI 流水线，可在代码管理 -> 持续集成页面查看持续集成。

选择猪齿鱼前端Demo，查看持续集成，点击阶段跳转到Gitlab 查看 CI 进度。

![image](/docs/quick-start/devops/image/front-application-6.png)

![image](/docs/quick-start/devops/image/front-application-7.png)

**第九步：合并分支**

当 CI 执行通过以后，可以将feature-choerodon-dev-1分支合并到master分支上。合并后，分支可选择删除或保留继续开发。

在代码管理 -> 合并请求 页面，选择应用猪齿鱼前端Demo。点击创建合并请求，跳转到Gitlab。

分别选择源分支为feature-choerodon-dev-1 ，目标分支为master，并提交合并请求。

当合并成功，master 分支的ci流水线通过以后。在应用服务页面，点击应用服务名称，跳转到应用服务详情->服务版本 可以找到猪齿鱼前端Demo生成的对应版本。

![image](/docs/quick-start/devops/image/front-application-8.png)

gitlab中docker_build阶段日志也可查看相应版本。

![image](/docs/quick-start/devops/image/front-application-9.png)

## 部署应用服务
提供可视化、一键式部署应用，支持并行部署和流水线无缝集成，实现部署环境标准化和部署过程自动化。更多相关信息以及详细操作步骤参考[部署一个应用](/zh/docs/user-guide/deploy/app-deploy/deploy/)。

具体的操作步骤如下：

**第一步：** 使用项目所有者的角色登录Choerodon系统，选择项目猪齿鱼研发。

**第二步：** 选择应用部署->部署， 进入部署界面。

**第三步：** 点击手动部署，填写选择相应信息。

**第四步：** 根据实际的配置，配置部署应用服务所需的配置信息。 替换掉一些参数文件值。

![image](/docs/quick-start/devops/image/front-application-10.png)

**第五步：** 配置资源

点击展开资源配置，进行网络与域名的配置

1、 网络配置

前端应用服务部署，需要创建对应的网络，才能够被外部访问。

填写相应信息，例如：

* 网络名称：choerodon-front-demo-service
* 网络类型：ClusterIp
* 端口: 80
* 目标端口: 80

2、 配置域名

创建对应的网络后，同时需要给网络指定外网域名，这样外部可以直接通过域名访问到前端。

填写相应信息，例如：

* 域名名称：choerodon-front-demo
* 域名地址：choerodon-front-demo.staging.com（请填写所属环境集群主机绑定的域名及其子域名地址）
* 路径：默认为根目录/，遵循Ant path的规范
* 端口：80

![image](/docs/quick-start/devops/image/front-application-11.png)

**第五步：** 点击部署按钮后，页面自动跳转到应用部署->资源页面。

>**如何判断某版本的应用已经部署成功并通过？**
>查看实例列表，实例状态为运行中且实例名称后无错误提示即为部署成功生成实例；
>当容器状态条为绿色，表示新部署的实例通过健康检查。

上述步骤完成后，就成功创建一个前端应用了，创建成功后，您就可以继续相关开发了。



