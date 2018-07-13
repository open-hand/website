+++
title = "系统架构"
description = "从技术架构和业务架构两方面简析了Choerodon的总体系统架构的设计"
weight = 3
type = "docs"

+++

## 技术架构
![business_structure](/cimg/deploy-structure.png)

#### 从总体技术架构上主要分为以下4个方面：

* 基础资源，主要指硬件基础资源，包括主机，存储，网络等
* 支撑组件，Kubernetes 运行在基础资源之上，支撑组件运行在 k8s 或基础资源之上，多为成熟的数据库，中间件，及工具。
* 应用框架，主要指基于 Spring Cloud 的微服务框架，提供多种类型的基础框架服务，以及支撑服务。
* 业务服务，Choerodon 的业务服务，目前主要包括用户故事，敏捷及 Devops 服务。

## 业务架构
![business_structure](/cimg/business-structure.png)
#### 如上图所示，业务架构总体上分为以下3个部分：
* 敏捷项目管理，实现基于 Scrum 的敏捷项目管理功能，主要包括用户故事地图，Issue,Kanban，以及多维度报表分析。
* 应用开发管理，实现基于 Devops 理论的应用开发管理，主要包括应用管理，应用模板管理，CI流水线，分支管理，版本发布管理。
* 部署管理，基于 K8S 提供持续部署功能，主要包括，环境管理，部署管理，服务管理，对外网络管理。

