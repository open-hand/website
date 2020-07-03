+++
title = "7.2.创建一个后端应用服务"
description = ""
weight = 2
+++

# 创建一个后端应用服务
## 目标
本章节将以创建后端应用服务 “猪齿鱼Todo服务” 为例，从后端应用服务开发、提交代码、生成版本到部署应用服务等方面展开介绍，让读者能够熟悉使用Choerodon创建后端应用服务的步骤和流程，并且学会如何利用Choerodon部署应用服务等。

## 前置条件
1. 已部署安装Choerodon 猪齿鱼，并使用默认的 admin 用户名和密码登录了 Choerodon 系统。
2. 默认的 admin 用户进入 Choerodon 系统后，默认拥有一个组织并为该组织的组织管理员角色。关于Choerodon角色的详情，请移步角色管理。

    |账号|角色|职责|
    |---|---|---|
    |admin|组织管理员|管理组织下的项目和成员（组织成员、项目所有者员、项目成员）|
3. 已完成项目创建及团队成员建设。

## 操作示例
## 创建后端应用服务
具体的操作步骤如下：

**第一步：** 使用项目所有者的角色用户登录Choerodon系统，创建项目的人即为项目所有者，如果使用其它创建的用户请先给该用户在猪齿鱼研发项目下分配项目所有者角色，然后登录选择项目猪齿鱼研发。

**第二步：** 选择应用管理模块，点击应用，进入应用管理页面。

**第三步：** 点击[导入应用服务](/zh/docs/user-guide/development/application-service/import/)，系统会从右边滑出页面，点击`从GitHub导入`，选择`系统预设模板`，应用模板选择`MicroService`模板，然后在页面中选择服务类型为`普通服务`，输入服务编码、服务名称。点击`导入`，即可创建一个后端应用，创建成功后，您可以进行后续的后端应用开发。

例如，

* 应用服务编码: choerodon-todo-servie
* 应用服务名称: 猪齿鱼Todo服务
* 应用服务模板: MicroService

![image](/docs/quick-start/devops/image/back-applications-1.png)

**第四步：** 当应用服务表单提交之后，可点击项目下-应用服务菜单，查看到新建的应用服务，当应用服务的状态是启用时，表示应用服务创建成功。

**第五步：** 在创建应用服务的同时，系统会对应在Gitlab中创建一个仓库，点击仓库地址，可以链接到应用服务对应在Gitlab的代码仓库。

![image](/docs/quick-start/devops/image/back-applications-2.png)

Choerodon 平台与 Gitlab 名词关系如下：

| Choerodon 名词 | 对应 Gitlab 名词 | 举例                  |
| -------------- | ---------------- | --------------------- |
| 项目名         | 组名             | 猪齿鱼研发            |
| 应用编码       | 项目名           | choerodon-todo-servie |
| 应用名称       | 无               | 猪齿鱼Todo服务        |



## 开发后端应用服务
应用服务创建完成之后，开发后端应用服务。

具体的操作步骤如下：

**第一步：创建** *Feature* **分支**

在 代码管理 -> 分支 界面，选择应用服务`猪齿鱼Todo服务`。点击创建分支，如果没有`issue`可选择，则先[创建问题](/zh/docs/quick-start/agile/problem/)， 选择对应的issue。分支来源选择master，填写issue号，如feature-1。点击创建，即可创建一个分支。创建完分支之后，您就可以进行后续的本地开发。

例如，

* 问题名称: choerodon-dev-1 猪齿鱼快速入门文档
* 分支来源: master
* 分支类型: feature
* 分支名称: feature-choerodon-dev-1

![image](/docs/quick-start/devops/image/back-applications-3.png)

Choerodon 采用 [githubflow](https://guides.github.com/introduction/flow/)作为我们的分支管理策略的主体。并在此基础上，参考了一些其他策略，对开发者的开发分支做了一定程度上的细分。更多相关信息参考[分支管理](/zh/docs/user-guide/development/code-manage/manage-branch/)。

**第二步：** **拉取代码仓库**

在`代码仓库` 菜单找到`猪齿鱼Todo服务`的仓库地址，复制仓库地址，本地通过git 命令拉取生成的项目代码。然后切换到对应分支进行本地开发。

```sh
$ git clone `仓库地址`

$ cd ./choerodon-todo-service

$ git checkout feature-choerodon-dev-1
```

克隆代码时候，会让输入用户名，密码。用户名为平台用户名，密码为用户新建后收到的站内信中的Gitlab仓库密码，如果找不到，或者忘记密码，可以到个人信息页面重置GitLab仓库密码

![image](/docs/quick-start/devops/image/back-applications-4.png)

**第三步：** **本地开发**

将代码克隆到本地后，就可以在本地进行开发。

> 通过Choerodon 提供的MicroService 应用服务模板，会生成一个极简单的spring boot 应用服务。模板本身生成的应用服务可以直接运行在平台上，如需拓展更多功能，可具体参考[后端开发手册](/zh/docs/development-guide/backend/)。

**第四步：** **ci 文件**

通过Choerodon 提供的MicroService应用服务模板，会创建.gitlab-ci.yml。有关.gitlab-ci.yml 的编写参考[GitLab官方文档](https://docs.gitlab.com/ee/ci/yaml/README.html)。

> .gitlab-ci.yml定义 Gitlab CI 的阶段，通过MicroService模板 的 CI 流程包含了编译，打包，生成镜像，生成helm 包几个阶段。


**第五步：** **charts 文件**

通过Choerodon 提供的MicroService应用服务模板，会创建charts 文件夹。charts文件目录用于生成charts包，部署时会用到。有关charts 的编写参考[Helm官方文档](https://helm.sh/docs/chart_template_guide/getting_started/)。

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
**第六步：** **Dockerfile 文件**


Choerodon 使用docker 来打包应用服务镜像。通过Choerodon 提供的MicroService应用服务模板，会有Dockerfile。有关Dockerfile 的编写参考[Docker官方文档](https://docs.docker.com/engine/reference/builder/)。

> 你可以通过修改Dockerfile 来打包镜像的方式。

**第七步：** **提交代码**

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


**第八步：** **代码集成**

当代码提交到服务器之后，可以在页面查看持续集成。

在代码管理 -> 持续集成 页面，找到choerodon-todo-service。点击阶段跳转到Gitlab 查看 CI 执行情况。

![image](/docs/quick-start/devops/image/back-applications-5.png)

**第九步：** **合并分支**

当 CI 执行通过以后，可以将feature分支合并到master分支上。

在代码管理 -> 合并请求 页面，选择应用服务choerodon-todo-service。点击创建合并请求，跳转到Gitlab。 分别选择源分支为`feature-choerodon-dev-1` ，目标分支为master。并提交合并请求。等待ci流水线通过后，点击合并分支。

当`master`分支的ci流水线 通过以后。在应用服务 -> 点击应用服务`choerodon-todo-service` 可以找到`choerodon-todo-service`生成的对应版本。接下来就可以部署了。

![image](/docs/quick-start/devops/image/back-applications-6.png)

## 部署应用服务
提供可视化、一键式部署应用服务，支持并行部署和流水线无缝集成，实现部署环境标准化和部署过程自动化。更多相关信息以及详细操作步骤参考[部署一个应用服务](/zh/docs/quick-start/devops/deploy-application/)。

> 在部署前，请先确定服务所需要的数据库，kafka，注册中心，配置中心等都已经正常运行启动。

具体的操作步骤如下：

**第一步：** 使用项目所有者角色的用户登录，创建项目的人自动分配为项目所有者角色，如果向使用其它用户，请给其它用户在该项目下分配项目成员角色之后，再为此用户分配目标环境下的部署操作权限。再用该账号登录Choerodon系统，然后选择项目猪齿鱼研发。

**第二步：** 应用部署 - 资源模块，点击树形菜单中选择环境。点击手动部署，进入应用服务部署界面。如果没有环境，请先完成[环境配置](/zh/docs/quick-start/devops/environment-configuration/)。

**第三步：** 点击选择应用服务，找到已经提交的choerodon-todo-service。点击选择版本，选择choerodon-todo-service 最新的版本。

**第四步：** 根据实际的配置，配置部署应用服务所需的配置信息。 替换掉一些参数文件值。

![image](/docs/quick-start/devops/image/back-applications-7.png)


**第五步：** 点击部署。信息提交完成后，会自动跳转到实例信息界面，可以在相同菜单下的环境下看到正在部署中的实例
![image](/docs/quick-start/devops/image/back-applications-8.png)

**第六步：** 点击实例的实例详情，可以查看到阶段信息及日志。

![image](/docs/quick-start/devops/image/back-applications-9.png)


**如何判断某版本的应用服务已经部署成功并通过健康检查？**

>当实例出现在列表中，且实例名称后没有报错提示icon即为部署成功生成实例；

>当新的实例状态为running，且容器状态都是绿色时，表示新部署的实例通过健康检查。

![image](/docs/quick-start/devops/image/back-applications-10.png)


## 应用容器化配置
Choerodon猪齿鱼秉承云原生的理念，基于平台的应用需要进行容器化改造才能够使用Choerodon进行开发和部署。在本节中将给大家介绍Choerodon容器化的一些概念, 以及为原代码库增加相关的配置使其满足Choerodon容器化要求。

容器化的第一步是编写合适的`Dockerfile`, `Dockerfile`定义了如何将一个可执行程序打包成镜像.
例如: 一个`SpringBoot`项目, 在maven构建之后会生成一个可执行的`jar`包, 基于这个`jar`包可以打包成一个镜像, 最简单的`Dockerfile`如下:

```Dockerfile
# 指定基础镜像(基础镜像中一般包含可执行程序的运行环境, 如JRE, 一些基本的linux指令)
FROM registry.cn-shanghai.aliyuncs.com/c7n/javabase:0.9.0

# 指定Dockerfile中剩余指令的工作目录为 /choerodon
WORKDIR /choerodon

# 将构建上下文中的jar包复制到镜像中, 这个jar包由SpringBoot项目maven打包生成
COPY app.jar app.jar

# 指定镜像的默认指令
# 其中 $JAVA_OPTS $SKYWALKING_OPTS 这两个环境变量是为了在不重新生成镜像的前提下, 
# 能够根据需要指定JVM参数和skywalking参数以运行容器
CMD java $JAVA_OPTS $SKYWALKING_OPTS -jar /choerodon/app.jar
```

## 应用Helm配置
在Choerodon猪齿鱼中，使用Helm管理Kubernetes包等，Helm之于Kubernetes好比yum之于RHEL，或者apt-get之于Ubuntu。Helm使用Charts管理应用，Charts就好像RPM一样，里面描述了应用及其依赖关系。

所以， **在Choerodon的标准应用代码结构中一定要包含charts文件夹**，如下截图，这是一个后端项目的标准结构。

![image](/docs/quick-start/devops/image/project-structure.png)

Chart包结构:
```
├── charts
│   └── choerodon-todo-servie
│       ├── Chart.yaml                     包含关于chart的的信息的YAML文件
│       ├── README.md                      可选：chart的README文件, 简单介绍Chart(例如: Chart的用法用途, 环境变量)
│       ├── templates                      这个目录下包含了多个模板文件以结合配置值生成有效的Kubernetes manifest文件
│       │   ├── deployment.yaml            创建 Kubernetes 部署的基本清单。
│       │   ├── _helpers.tpl               可选: 放置模板助手的地方，您可以在整个 chart 中重复使用
│       │   ├── ingress.yaml               可选: 为部署配置Ingress, 以通过域名访问服务
│       │   ├── pre-config-config.yaml     可选: 为部署配置前置job, 用于初始化配置中心
│       │   ├── pre-config-db.yaml         可选: 为部署配置前置job, 用于初始化数据库
│       │   └── service.yaml               可选: 为您的部署创建服务端点的基本清单。
│       └── values.yaml                    为模板的预定义变量。
```

**第一步: 创建目录**
在项目根目录下创建如下目录结构，首先创建一个名为`charts`的文件夹，再创建一个与应用名相同的文件夹，在此处示例为`choerodon-todo-servie`，在其下创建如上文`Chart`包结构所示的文件

**第二步: 编写_helpers.tpl文件 在 templates文件夹下将一些公共的lable或值定义到 _helpers.tpl文件中：**

```tpl
{{/* vim: set filetype=mustache: */}}
{{- /*
service.labels.standard prints the standard service Helm labels.
The standard labels are frequently used in metadata.
*/ -}}

{{- define "service.microservice.labels" -}}
choerodon.io/version: {{ .Chart.Version | quote }}
choerodon.io/service: {{ .Chart.Name | quote }}
choerodon.io/metrics-port: {{ .Values.deployment.managementPort | quote }}
{{- end -}}

{{- define "service.labels.standard" -}}
choerodon.io/release: {{ .Release.Name | quote }}
{{- end -}}

{{- define "service.match.labels" -}}
choerodon.io/release: {{ .Release.Name | quote }}
{{- end -}}

{{- define "service.logging.deployment.label" -}}
choerodon.io/logs-parser: {{ .Values.logs.parser | quote }}
{{- end -}}

{{- define "service.monitoring.pod.annotations" -}}
choerodon.io/metrics-group: {{ .Values.metrics.group | quote }}
choerodon.io/metrics-path: {{ .Values.metrics.path | quote }}
{{- end -}}

{{/*
Return the appropriate apiVersion for deployment.
*/}}
{{- define "app.deployment.apiVersion" -}}
{{- if semverCompare "<1.9-0" .Capabilities.KubeVersion.GitVersion -}}
{{- print "apps/v1beta2" -}}
{{- else -}}
{{- print "apps/v1" -}}
{{- end -}}
{{- end -}}

{{/*
Return the appropriate apiVersion for ingress.
*/}}
{{- define "app.ingress.apiVersion" -}}
{{- if semverCompare "<1.14-0" .Capabilities.KubeVersion.GitVersion -}}
{{- print "extensions/v1beta1" -}}
{{- else -}}
{{- print "networking.k8s.io/v1beta1" -}}
{{- end -}}
{{- end -}}
```

**第三步: 编写deployment.yml文件 在 templates文件夹下创建一个名为 deployment.yml的文件，内容如下：**
```yaml
apiVersion: {{ include "app.deployment.apiVersion" . }}
kind: Deployment
metadata:
  name: {{ .Release.Name }}
  labels:
{{ include "service.labels.standard" . | indent 4 }}
{{ include "service.logging.deployment.label" . | indent 4 }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
{{ include "service.labels.standard" . | indent 6 }}
  template:
    metadata:
      labels:
{{ include "service.labels.standard" . | indent 8 }}
{{ include "service.microservice.labels" . | indent 8 }}
      annotations:
{{ include "service.monitoring.pod.annotations" . | indent 8 }}
    spec:
      containers:
        - name: {{ .Release.Name }}
          image: "{{ .Values.image.repository }}:{{ .Chart.Version }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          env:
{{- range $name, $value := .Values.env.open }}
{{- if not (empty $value) }}
          - name: {{ $name | quote }}
            value: {{ $value | quote }}
{{- end }}
{{- end }}
          ports:
            - name: http
              containerPort: {{ .Values.service.port }}
              protocol: TCP
          readinessProbe:
            exec:
              command: ["/bin/sh","-c","curl -s localhost:{{ .Values.deployment.managementPort }}/actuator/health --fail && nc -z localhost {{ .Values.service.port }}"]
            failureThreshold: 3
            initialDelaySeconds: 60
            periodSeconds: 10
            successThreshold: 1
            timeoutSeconds: 10
          resources:
{{ toYaml .Values.resources | indent 12 }}
```

**第四步：编写Chart.yaml文件 在halm-dev文件夹中编写 Chart.yaml文件，这个文件中写明应用的的相关信息。**
```yaml
apiVersion: v1
appVersion: "1.0"
description: A Helm chart for Kubernetes
name: choerodon-todo-servie
version: 0.1.0
```

**第五步：编写文件 在`charts/choerodon-todo-service`文件夹中编写 values.yaml文件，这个文件中编写 templates文件夹中 deployment.yml文件(以及其它清单文件)会用到的变量及默认值。**
```yaml
# Default values for manager-service.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

# pod运行数量
replicaCount: 1

image:
  # 镜像库地址
  repository: registry.cn-hangzhou.aliyuncs.com/feifei-feifei-05/choerodon-todo-servie
  # 镜像拉取策略
  pullPolicy: IfNotPresent

preJob:
  # job超时时间
  timeout: 300
  # job镜像库地址
  image: registry.cn-hangzhou.aliyuncs.com/choerodon-tools/dbtool:0.6.7
  preConfig:
    # 是否初始化manager_service数据库
    enabled: true
    # 初始化到配置中心文件名
    configFile: application.yml
    # 初始化到配置中心存储方式
    configType: k8s
    # 注册中心地址
    registerHost: http://register-server:8000
    datasource:
      # manager_service数据库连接地址
      url: jdbc:mysql://localhost:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true
      # manager_service数据库用户名
      username: choerodon
      # manager_service数据库密码
      password: 123456
  preInitDB:
    # 是否初始化demo_service数据库
    enabled: true
    datasource:
      # demo_service数据库连接地址
      url: jdbc:mysql://localhost:3306/demo_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true
      # demo_service数据库用户名
      username: choerodon
      # demo_service数据库密码
      password: 123456

deployment:
  # 服务管理端口
  managementPort: 18081

env:
  open:
    # 注册服务地址
    EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://register-server.io-choerodon:8000/eureka/
    # 是否启用配置中心
    SPRING_CLOUD_CONFIG_ENABLED: true
    # 配置中心地址
    SPRING_CLOUD_CONFIG_URI: http://config-server.framework:8010/
    # 数据库连接地址
    SPRING_DATASOURCE_URL: jdbc:mysql://localhost::3306/demo_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true
    # 数据库用户名
    SPRING_DATASOURCE_USERNAME: choerodon
    # 数据库密码
    SPRING_DATASOURCE_PASSWORD: 123456

metrics:
  # 收集应用的指标数据路径
  path: /prometheus
  # 性能指标应用分组
  group: spring-boot

logs:
  # 日志收集格式
  parser: spring-boot

persistence:
  # 是否启用持久化存储
  enabled: false
  # 绑定的pvc名称
  # existingClaim:
  # 持久化路径
  # subPath:

service:
  # 是否创建k8s service
  enabled: false
  # service类型
  type: ClusterIP
  # service端口
  port: 18080
  # service名称
  name: choerodon-todo-servie

ingress:
  # 是否创建k8s ingress
  enabled: false

resources:
  # k8s中容器能使用资源的资源最大值
  limits:
    # cpu: 100m
    memory: 2Gi
  # k8s中容器使用的最小资源需求
  requests:
    # cpu: 100m
    memory: 1.5Gi
```

## CI文件配置
Choerodon使用Gitlab-CI作为CI工具，需要在应用源代码中加上.gitlab-ci.yml文件。

`.gitlab-ci.yml`是用于指导`gitlab`进行自动化的持续集成步骤的

在CI中主要的工作就是进行镜像构建, 并且生成Chart包，最后将Chart包上传至Choerodon，与Choerodon进行集成。

在项目根目录下新建.gitlab-ci.yml文件，粘贴以下内容：

```yaml
# 设置CI运行时的环境镜像
image: registry.cn-shanghai.aliyuncs.com/c7n/cibase:0.9.1

# 设置阶段，第一个阶段构建镜像, 第二个阶段构建chart包并上传至Choerodon
stages:
- docker-build
- chart-build

docker-build:
  stage: docker-build
  # 阶段中需要执行的命令
  script:
  # 进行sonar分析
  - >-
        mvn --batch-mode verify sonar:sonar
        -Dsonar.host.url=$SONAR_URL
        -Dsonar.login=$SONAR_LOGIN
        -Dsonar.gitlab.project_id=$CI_PROJECT_PATH
        -Dsonar.gitlab.commit_sha=$CI_COMMIT_SHA
        -Dsonar.gitlab.ref_name=$CI_COMMIT_REF_NAME
        -Dsonar.analysis.serviceGroup=$GROUP_NAME
        -Dsonar.analysis.commitId=$CI_COMMIT_SHA
        -Dsonar.projectKey=${GROUP_NAME}:${PROJECT_NAME}

  # 打包生成springboot的jar
  - mvn clean package spring-boot:repackage

  # 将生成的jar包移动到docker目录下
  - mv target/app.jar docker
  
  # 这个命令是使用kaniko进行更安全的镜像打包
  # 其中, -c 参数后是Docker构建上下文, 一般包含需要打包到镜像中的文件(jar包,二进制文件等)
  # -f 参数指定Dockerfile的位置 (根据实际位置)
  # 可选参数: --skip-tls-verify用于跳过harbor的证书校验
  # 剩余的 ${DOCKER_REGISTRY} ${GROUP_NAME}  ${PROJECT_NAME}  ${CI_COMMIT_TAG} 变量都是Choerodon的CI内置变量
  - kaniko -c $PWD/docker -f $PWD/docker/Dockerfile -d ${DOCKER_REGISTRY}/${GROUP_NAME}/${PROJECT_NAME}:${CI_COMMIT_TAG}

chart-build:
  stage: chart-build
  script:
  # 这是猪齿鱼内置的CI函数, 生成chart包并上传到猪齿鱼
  - chart_build

# 这里是最为关键的，定义了一个全局脚本，在每一个阶段运行前都将执行下面代码从Choerodon平台中获取相应变量及封装的shell函数。
.auto_devops: &auto_devops |
    http_status_code=`curl -o .auto_devops.sh -s -m 10 --connect-timeout 10 -w %{http_code} "${CHOERODON_URL}/devops/ci?token=${Token}"`
    if [ "$http_status_code" != "200" ]; then
      cat .auto_devops.sh
      exit 1
    fi
    source .auto_devops.sh
 

before_script:
  - *auto_devops
```