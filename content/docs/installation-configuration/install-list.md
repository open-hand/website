+++
title = "组件安装列表"
description = "详细描述了在部署与配置中安装的基础组件名称，描述以及对应的版本信息"
weight = 5

+++

# 服务详情

## 基础组件列表

以下是通过本部署教程将会在安装的基础组件及其版本信息，其中一部分组件你可以直接使用你已搭建好的组件。

组件|描述| 版本
---|---|---
Docker|应用容器引擎|18.03.1-ce
kube-proxy|kube-proxy|v1.10.12
kube-apiserver|kube-apiserver|v1.10.12
kube-controller-manager|kube-controller-manager|v1.10.12
kube-scheduler|kube-scheduler|v1.10.12
kube-dns|kube-dns|1.14.8
kube-flannel|网络插件|v0.10.0-amd64
kubernetes-dashboard|kubernetes-dashboard|v1.8.3
nginx-ingress-controller|nginx-ingress-controller|0.9.0-beta.17
default-http-backend|default-http-backend|1.4
Helm|Kubernetes应用包管理工具|2.13.1
Chartmuseum|Kubernetes应用私有包仓库|0.5.2
Minio|对象存储服务|RELEASE.2019-03-27T22-35-21Z
Redis|缓存数据库|4.0.2
Mysql|数据库|5.7.22
Harbor|容器的镜像库|1.4.0
Gitlab|代码托管|11.0.1
Gitlab-Runner|CI/CD 运行环境|10.7.2

## Choerodon服务列表

以下是通过本部署教程将会在安装的Choerodon各服务及其版本信息。

<blockquote class="note"> 
部署Choerodon前端可不部署其他服务前端，Choerodon前端功能包括了其他服务前端所有功能。
</blockquote>

组件|描述| 版本
---|---|---
register server|注册服务|0.17.0
config server|配置服务|0.17.0
manager service|管理服务|0.17.1
iam service|IAM服务|0.17.1
api gateway|网关服务|0.17.1
oauth server|认证服务|0.17.1
file service|文件服务|0.17.1
notify service|通知服务|0.17.1
asgard service|事务服务|0.17.1
gitlab service|Gitlab 服务|0.18.0
devops service|Devops 服务|0.18.4
workflow service|Workflow 服务|0.18.0
agile service|敏捷管理|0.18.3
state machine service|状态机服务|0.18.0
issue service|issue服务|0.18.0
wiki service|知识管理服务|0.18.1
test manager service|测试管理服务|0.18.0
choerodon front|Choerodon 前端|0.18.3
knowledgebase service |基础知识服务|0.18.4
foundation service |基础服务|0.18.1