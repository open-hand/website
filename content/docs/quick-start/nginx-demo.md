+++
title = "创建一个nginx示例"
description = ""
weight = 2
type = "docs"
+++

# 创建一个nginx示例
---

## 概述

让我们从搭建一个最简单的nginx作为入门，开始我们的Choerodon 之旅吧。

## 前置条件

**1.** 在操作之前保证[系统配置](../../user-guide/system-configuration)已经配置完全。特别在本章节用到的角色、环境管理等配置。

**2.** 完成[创建项目](../project)操作。本章节使用在前面章节创建的项目`猪齿鱼研发`。

**3.** <font>完成[创建环境](../../user-guide/deployment-pipeline/environment-pipeline)，环境流水线中有状态为运行中的环境。

**4.** 在Choerodon平台下，项目启动依赖于基础服务：

## kubernetes 部署

Choerodon 是基于 kubernetes 平台进行开发，所以我们的应用部署也是以kubernetes的yaml文件为基础。

部署一个空的 nginx 的 kubernetes yaml文件如下:

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: registry.choerodon.com.cn/operation-choerodon-dev/nginx-demo:1.13.5-alpine
        ports:
        - containerPort: 80
```

将上述文本粘贴至 `nginx.yaml` 文件中，然后执行 `kubectl apply -f nginx.yaml` 即可完成最简单的部署。

## Choerodon 部署

### 代码准备

 - 按照[上一篇](../project)教程所介绍的方法，创建一个名为 `nginx-demo` 项目。
 - 将创建出来的空项目克隆到本地
 - 在项目根目录下添加 `Dockerfile` 文件，内容如下下:

    ```shell
    FROM registry.choerodon.com.cn/operation-choerodon-dev/nginx-demo:1.13.5-alpine
    ```

 - 在项目根目录下添加 `.gitlab-ci.yml` 文件，内容如下下:

        image: registry.choerodon.com.cn/tools/cibase:0.5.0

        stages:
          - chart_build

        chart_build:
          stage: chart_build
          script:
            - docker login ${DOCKER_REGISTRY} -u admin -p Harbor12345
            - docker build --pull -t ${DOCKER_REGISTRY}/${GROUP_NAME}/${PROJECT_NAME}:${CI_COMMIT_TAG} .
            - docker push ${DOCKER_REGISTRY}/${GROUP_NAME}/${PROJECT_NAME}:${CI_COMMIT_TAG}
            - chart_build

        .auto_devops: &auto_devops |
            curl -o .auto_devops.sh \
                "${CHOERODON_URL}/devops/ci?token=${Token}&type=front"
            source .auto_devops.sh

        before_script:
          - *auto_devops

 - 在项目根目录下创建 `chart/nginx-demo` 文件夹目录
 - 在 `chart/nginx-demo` 目录下创建 `Chart.yaml` 文件，内容如下:

    ```yaml
    apiVersion: v1
    appVersion: "1.0"
    description: A Helm chart for Kubernetes
    name: nginx-demo
    version: 0.1.2
    ```

 - 在 `chart/nginx-demo` 目录下创建 `.helmignore` 文件，内容如下:

    ```shell
    # Patterns to ignore when building packages.
    # This supports shell glob matching, relative path matching, and
    # negation (prefixed with !). Only one pattern per line.
    .DS_Store
    # Common VCS dirs
    .git/
    .gitignore
    .bzr/
    .bzrignore
    .hg/
    .hgignore
    .svn/
    # Common backup files
    *.swp
    *.bak
    *.tmp
    *~
    # Various IDEs
    .project
    .idea/
    *.tmproj
    ```

 - 在 `chart/nginx-demo` 目录下创建 `values.yaml` 文件，内容如下:

    ```yaml
    replicaCount: 1

    image:
      repository: registry.cn-hangzhou.aliyuncs.com/choerodon-tools/nginx
      tag: 1.13.5-alpine

    metrics:
      path: /prometheus
      group: nginx

    logs:
      parser: nginx
    ```

 - 在 `chart/nginx-demo` 目录下新建 `templates` 文件夹
 - 在 `templates` 目录下创建 `_helpers.tpl` 文件，内容如下:

    ```
    {{- define "service.labels.standard" -}}
    choerodon.io/release: {{ .Release.Name | quote }}
    {{- end -}}

    {{- define "service.logging.deployment.label" -}}
    choerodon.io/logs-parser: {{ .Values.logs.parser | quote }}
    {{- end -}}

    {{- define "service.monitoring.pod.annotations" -}}
    choerodon.io/metrics-group: {{ .Values.metrics.group | quote }}
    choerodon.io/metrics-path: {{ .Values.metrics.path | quote }}
    {{- end -}}
    ```

 - 在 `templates` 目录下创建 `deployment.yaml` 文件，内容如下:

    ```yaml
    apiVersion: extensions/v1beta1
    kind: Deployment
    metadata:
      name: {{ .Release.Name }}
      labels:
    {{ include "service.labels.standard" . | indent 4 }}
    {{ include "service.logging.deployment.label" . | indent 4 }}
      name: {{ .Release.Name }}
    spec:
      replicas: {{ .Values.replicaCount }}
      template:
        metadata:
          annotations:
    {{ include "service.monitoring.pod.annotations" . | indent 8 }}
          labels:
    {{ include "service.labels.standard" . | indent 8 }}
        spec:
          containers:
          - name: {{ .Release.Name }}
            image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
            env:
            - name: FOOBAR
              value: {{ .Chart.Version | quote }}
            ports:
            - containerPort: 80
              name: http
            resources:
    {{ toYaml .Values.resources | indent 10 }}
            volumeMounts:
            - mountPath: /usr/share/nginx/html/index.html
              name: config
              subPath: index.html
          volumes:
          - configMap:
              defaultMode: 420
              name: {{ .Release.Name }}-cm
              items:
              - key: index.html
                path: index.html
            name: config
    ```

 - 在 `templates` 目录下创建 `configmap.yaml` 文件，内容如下:

    ```yaml
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: {{ .Release.Name }}-cm
    data:
      index.html: |
        <!DOCTYPE html>
        <html>
        <head>
        <title>Welcome to nginx!</title>
        <style>
            body {
                width: 35em;
                margin: 0 auto;
                font-family: Tahoma, Verdana, Arial, sans-serif;
            }
        </style>
        </head>
        <body>
        <h1>Verison:{{ .Chart.Version | quote }}</h1>
        <p>If you see this page, the nginx web server is successfully installed and
        working. Further configuration is required.</p >

        <p>For online documentation and support please refer to
        <a href=" ">nginx.org</a >.<br/>
        Commercial support is available at
        <a href="http://nginx.com/">nginx.com</a >.</p >

        <p><em>Thank you for using nginx.</em></p >
        </body>
        </html>
    ```

 - 最后，使用 `git push` 将准备好的代码推到远程仓库，我们的代码准备工作就告一段落。

### 应用部署

 - 当我们上传的代码完成 `gitlab ci` 阶段以后，会在 `应用版本` 界面里显示刚才的代码打好的镜像版本。
 - 确认镜像版本已经生成后，前往 `应用部署` 界面，选择要部署的应用、版本、环境，使用默认配置以及新建实例模式新建部署。
 - 部署成功后，前往 `网络` 界面，为刚刚部署好的应用创建网络。
 - 最后前往 `域名` 界面，为创建的网络绑定域名。

访问刚刚创建的域名，就可以看到显示着应用版本号的 nginx 开始界面了。

**项目代码详解请前往** [此篇](../../development-guide/basic/helm-chart) 教程