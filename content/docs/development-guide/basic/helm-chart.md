+++
title = "从yaml到helm"
description = "从yaml到helm"
weight = 1
+++

# 前置条件

此篇文档是以已经掌握如何编写Kubernetes 部署文件为前提。

如需进行学习Kubernetes 部署文件如何编写请参考[**官方文档**](https://kubernetes.io/docs/home)

**本篇示例代码皆引用自如下项目:**

# 参考示例

代码参考示例请移步 [**此篇**] (../../../quick-start/nginx-demo)

# 配置解析

## deployment.yaml

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: {{ .Release.Name }}
# 实例名称  
  labels:
{{ include "service.labels.standard" . | indent 4 }}
# 平台管理所需标签
{{ include "service.logging.deployment.label" . | indent 4 }}
# 日志管理所需标签
  name: {{ .Release.Name }}
spec:
  replicas: {{ .Values.replicaCount }}
  # 副本数
  template:
    metadata:
      annotations:
{{ include "service.monitoring.pod.annotations" . | indent 8 }}
# 监控管理所需标签
      labels:
{{ include "service.labels.standard" . | indent 8 }}
    spec:
      containers:
      - name: {{ .Release.Name }}
        image: "{{ .Values.image.repository }}:{{ .Values.image.version }}"
        # 镜像
        env:
        - name: FOOBAR
          value: {{ .Chart.Version | quote }}
          # 设置一个会随更新改变的变量，若pod无更改，更新的时候就不会进行替换。
        ports:
        - containerPort: 80
          name: http
```

部署文件的渲染模板，我们下文将定义一些变量，helm执行时会将变量渲染进模板文件中。

## _helpers.tpl

这个文件我们用来进行标签模板的定义，以便在上文提到的位置进行标签渲染。

标签总共分为三个部分: 平台、微服务、监控。

### 平台标签

#### deployment 级:

```
{{- define "service.labels.standard" -}}
choerodon.io/release: {{ .Release.Name | quote }}
{{- end -}}
```
平台管理实例需要的实例ID。

### 微服务标签

#### pod 级:

```
{{- define "service.microservice.labels" -}}
choerodon.io/version: {{ .Chart.Version | quote }}
choerodon.io/service: {{ .Chart.Name | quote }}
choerodon.io/metrics-port: {{ .Values.deployment.managementPort | quote }}
{{- end -}}
```
微服务注册中心进行识别时所需要的版本号、项目名称、管理端口。

### 监控和日志标签

#### deployment 级:

```
{{- define "service.logging.deployment.label" -}}
choerodon.io/logs-parser: {{ .Values.logs.parser | quote }}
{{- end -}}
```
日志管理所需要的应用标签。该标签指定应用程序的日志格式，内置格式有`nginx`,`spring-boot`,`docker`如果没有合适您的应用的格式请使用`docker`，如果不需要收集日志请移除此段代码，并模板文件关于`service.logging.deployment.label`的引用。

#### pod 级:

```
{{- define "service.monitoring.pod.annotations" -}}
choerodon.io/metrics-group: {{ .Values.metrics.group | quote }}
choerodon.io/metrics-path: {{ .Values.metrics.path | quote }}
{{- end -}}
```
性能指标管理所需要的应用类别以及监控指标路径。其中`metrics-group`将应用按照某个关键字分组，并在grafana配置实现分组展示。`metrics-path`指定收集应用的指标数据路径。
如果不需要监控请移除此段代码

## values.yaml

这个文件中的键值对，即为我们上文中所引用的变量。

将所以有变量集中在一个文件中，方便部署的时候进行归档以及灵活替换。

同时，helm命令支持使用 `--set FOO_BAR=FOOBAR` 参数对values 文件中的变量进行赋值，可以进一步简化部署流程。

```yaml
replicaCount: 1

image:
  repository: registry.cn-hangzhou.aliyuncs.com/choerodon-tools/nginx
  version: 1.13.5-alpine

metrics:
  path: /prometheus
  group: nginx

logs:
 parser: nginx
```