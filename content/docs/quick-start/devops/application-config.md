+++
title = "7.2.应用服务配置"
description = ""
weight = 2
+++

# 应用服务配置
## 目标
本文档面向初次使用 Choerodon 猪齿鱼的用户，引导新手用户在 Choerodon 猪齿鱼应用服务代码仓库中配置应用服务相关的文件。在配置这些文件之前，请确保你已通过[创建一个应用服务](../../../quick-start/devops/create-application)步骤成功创建了应用服务并点击仓库地址进入了对应的代码仓库。

## 前置条件
1. 已部署安装Choerodon 猪齿鱼，并使用默认的 admin 用户名和密码登录了 Choerodon 系统。
2. 默认的 admin 用户进入 Choerodon 系统后，默认拥有一个组织并为该组织的组织管理员角色。关于Choerodon角色的详情，请移步角色管理。

    |账号|角色|职责|
    |---|---|---|
    |admin|组织管理员|管理组织下的项目和成员（组织成员、项目所有者、项目成员）|
3. 已完成项目创建及团队成员建设。  
4. 已在Choerodon项目下创建应用服务，并配置了 Git，包括下载安装、设置等。    



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



## 下一步  
[开发应用服务](../../../quick-start/devops/develop-application)