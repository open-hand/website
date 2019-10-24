+++
title = "创建一个应用模板"
description = "创建应用模板的介绍"
weight = 2
type = "docs"

+++

# 创建一个应用模板
---

## 概述

[应用模板](../../../user-guide/application-management/application-template/)是将同类型应用的代码库结构整理成模板，用于创建应用时能引用相应模板快速创建初始代码库。您也可以根据实际情况自定义应用模板。

## 目标

本章节将以应用模板“`猪齿鱼应用模板`”的创建为例展开介绍，让读者能够熟悉使用Choerodon创建应用模板的步骤和流程。

## 前置条件

**1.** 在操作之前保证[系统配置](../../../user-guide/manager-guide/system-configuration)已经配置完全。

**2.** 用户须属于组织层，且为组织管理员角色。

## 创建应用模板

具体操作步骤如下：

**第一步：** 使用组织管理员的角色登录Choerodon系统，此时进入平台Dashboard界面，点击`选择项目`，弹出组织/项目选择界面。
 
**第二步：** 点击选择组织，例如 `Choerodon`。

**第三步：** 进入`应用管理`后，点击`应用模板`。

 ![enter app template](/docs/quick-start/image/Application_template.gif)

**第四步：** 进入`应用模板`页面后，点击`创建应用模板`，系统会从右侧滑出创建应用模板页面，输入应用模板编码、应用模板名称、应用模板描述和选择应用模板的来源模板。

例如，   

- 编码：choerodon-app-temp  
- 名称：猪齿鱼应用模板  
- 描述：猪齿鱼应用模板示例    

    ![fill app template](/docs/quick-start/image/Create_template2.png)
    
    字段说明 ：

    - 编码：应用模板的编码
    - 名称：应用模板的名称
    - 描述：应用模板的描述
    - 复制于：应用模板的来源模板，选择并复制当前列表内的一个已有模板

**第五步：** 当应用模板创建成功，可在`应用管理`模块，点击`应用模板` 界面查看到新建的应用模板。

**第六步：** 在创建应用的同时，系统会对应在`Gitlab`中创建一个仓库，选择`应用管理`点击`应用模板`，找到创建好的应用模板，点击`地址`，链接到`Gitlab`新建的仓库。

![check app template](/docs/quick-start/image/check_app_template2.png)
 
## 开发应用模板

应用创建完成之后，可以视具体情况修改模板内容。以后端模板为例。

 <blockquote class="note">
  请务熟练掌握 Docker、Kubernetes、Helm、Gitlab-CI 等知识。
 </blockquote>

具体的操作步骤如下：

 **第一步：** 编写一个 Dockerfile文件：
 
目录结构如下：

```
|--src
  |--main
    ｜--docker
      ｜--Dockerfile
```

Dockerfile 文件内容

```
FROM registry.cn-hangzhou.aliyuncs.com/choerodon-tools/javabase:0.6.0

COPY app.jar /{{service.code}}.jar

ENTRYPOINT exec java $JAVA_OPTS  -jar /{{service.code}}.jar
```

{{< note >}}service.code是根据该模板创建应用时会使用服务编码替换{{< /note >}}
  此为Java后端模板的 Dockerfile，应视模板具体语言的对其进行修改。

 **第二步：** 项目根部录下[编写 .gitlab-ci.yml 文件](https://docs.gitlab.com/ee/ci/)

  ```yaml
  image: registry.cn-hangzhou.aliyuncs.com/choerodon-tools/cibase:0.6.0
          
  stages:
    - mvn-package # mvn-package 这一阶段为后端应用需要的 ci 阶段，可根据模板具体情况进行修改
    - docker-build # docker-build 为 Choerodon 构建镜像版本等的必要步骤，不建议修改
  
  maven-test-build:
    stage: mvn-package
    script:
      - update_pom_version
      - mvn package -U -DskipTests=false
      - mkdir -p /cache/${CI_PROJECT_NAME}-${CI_PROJECT_ID}-${CI_COMMIT_REF_NAME}-${CI_COMMIT_SHA} 
      - cp target/app.jar /cache/${CI_PROJECT_NAME}-${CI_PROJECT_ID}-${CI_COMMIT_REF_NAME}-${CI_COMMIT_SHA}/app.jar
  
  docker-build:
    stage: docker-build
    script:
      - docker_build
      - chart_build
    only:
      - master
      - tags
      - develop
      - /^hotfix-.*$/
      - /^release-.*$/
  
  .auto_devops: &auto_devops |
      curl -o .auto_devops.sh \
          "${CHOERODON_URL}/devops/ci?token=${Token}&type=microservice"
      if [ $? -ne 0 ];then
        cat .auto_devops.sh
        exit 1
      fi
      source .auto_devops.sh
      function docker_build(){
          cp /cache/${CI_PROJECT_NAME}-${CI_PROJECT_ID}-${CI_COMMIT_REF_NAME}-${CI_COMMIT_SHA}/app.jar ${1:-"src/main/docker"}/app.jar || true
          docker build --pull -t ${DOCKER_REGISTRY}/${GROUP_NAME}/${PROJECT_NAME}:${CI_COMMIT_TAG} ${1:-"src/main/docker"}
          docker push ${DOCKER_REGISTRY}/${GROUP_NAME}/${PROJECT_NAME}:${CI_COMMIT_TAG}
          rm -rf /cache/${CI_PROJECT_NAME}-${CI_PROJECT_ID}-${CI_COMMIT_REF_NAME}-${CI_COMMIT_SHA}
      }
  
  before_script:
    - *auto_devops
  ```

**第三步：**[编写 charts 模块](../../../development-guide/basic/helm-chart)

目录结构如下：
```
|--src
|--charts
    ｜--model-service
      ｜--templates                     #为模板文件，将模板文件渲染成实际文件，然后发送给 Kubernetes。
      ｜ ｜--_helper.tpl                #放置模板助手的地方，您可以在整个 chart 中重复使用。
      ｜ ｜--deplopment.yaml            #创建 Kubernetes 部署的基本清单。
      ｜--.helmignore
      ｜--Chart.yaml                    #包含 chart 的版本信息说明，您可以从模板中访问它。
      ｜--values.yaml                   #为模板的预定义变量。
```

_helper.tpl：
```
{{/* vim: set filetype=mustache: */}}
{{- /*
service.labels.standard prints the standard service Helm labels.
The standard labels are frequently used in metadata.
*/ -}}
{{- define "service.labels.standard" -}}
choerodon.io/release: {{ .Release.Name | quote }}
{{- end -}}
```

deplopment.yaml:
```
apiVersion: apps/v1beta2
kind: Deployment
metadata:
  name: {{ .Release.Name }}
  labels:
{{ include "service.labels.standard" . | indent 4 }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
{{ include "service.labels.standard" . | indent 6 }}
  template:
    metadata:
      labels:
{{ include "service.labels.standard" . | indent 8 }}
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
          resources:
{{ toYaml .Values.resources | indent 12 }}
```

Chart.yaml:
```
apiVersion: v1
appVersion: "1.0"
description: A Helm chart for Kubernetes
name: {{service.code}}
version: 0.1.0
```

values.yaml:
```
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: registry.choerodon.com.cn/choerodon/example-front
  pullPolicy: Always

service:
  port: 80

env:
  open:
    PRO_API_HOST: api.example.com
resources: 
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources,such as Minikube. If you do want to specify resources,uncomment the following
  # lines,adjust them as necessary,and remove the curly braces after 'resources:'.
  limits:
    # cpu: 100m
    # memory: 2Gi
  requests:
    # cpu: 100m
    # memory: 1Gi
```

Choerodon 会在使用模板创建应用时，对文档的相关变量进行替换。例如，charts 文件夹下的 model-service 文件夹的名称，会替换为对应的应用名称。   

**第四步：** 编写pom.xml文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<groupId>{{group.name}}</groupId>
	<artifactId>{{service.code}}</artifactId>
	<version>1.0-SNAPSHOT</version>
	<packaging>jar</packaging>

	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.0.2.RELEASE</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>

	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
		<java.version>1.8</java.version>
	</properties>

	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
		<finalName>app</finalName>
	</build>
	
</project>
```

{{< note >}}maven打包时指定文件名为app，与ci文件中一致。{{< /note >}}

**第五步：** 提交改动至 `master` 分支。通过这些步骤，便能快速的在Choerodon里创建应用模板了。

## 相关文档  

- [系统配置](../../../user-guide/manager-guide/system-configuration)  

- [应用模板](../../../user-guide/application-management/application-template/)

- [编写 charts 模块](../../../development-guide/basic/helm-chart)

- [GitLab Continuous Integration (GitLab CI/CD)](https://docs.gitlab.com/ee/ci/)
