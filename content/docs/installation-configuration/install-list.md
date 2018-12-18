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
Docker|应用容器引擎|17.05.0-ce
Kubernetes|容器的编排和管理|1.8.5
Helm|Kubernetes应用包管理工具|17.05.0-ce
Chartmuseum|Kubernetes应用私有包仓库|0.5.2
Minio|对象存储服务|RELEASE.2018-05-25T19-49-13Z
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
register server|注册服务|0.12.0
config server|配置服务|0.12.0
manager service|管理服务|0.12.0
iam service|IAM服务|0.12.0
api gateway|网关服务|0.12.0
gateway helper|网关helper|0.12.0
oauth server|认证服务|0.12.0
file service|文件服务|0.12.0
notify service|通知服务|0.12.0
asgard service|事务服务|0.12.0
gitlab service|Gitlab 服务|0.12.0
devops service|Devops 服务|0.12.0
agile service|敏捷管理|0.12.0
state machine service|状态机服务|0.12.0
issue service|issue服务|0.12.0
wiki service|知识管理服务|0.12.0
test manager service|测试管理服务|0.12.0
choerodon front|Choerodon 前端|0.12.0
