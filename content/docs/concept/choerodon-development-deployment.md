+++
title = "开发区与运行区"
description = ""
weight = 3
type = "docs"
+++

# 开发区与运行区

Choerodon 采用微服务架构融合多个开源组件实现 DevOps的开发相关功能，包括计划、编码、构建、测试、部署、运行、运维等，并且Choerodon是以Docker容器作为运行环境和使用Kubernetes作为容器编排和管理工具，在一个Kubernetes集群中运行DevOps流程的开发相关（计划、编码、构建、测试）微服务和开源工具，我们将此Kubernetes集群称作**开发区**；在一个Kubernetes集群中运行DevOps流程的运行相关（部署、运行、运维）微服务和开源工具，我们将此Kubernetes集群称作**运行区**。

关于开发区的安装，请参考[开发区安装](./installation-configuration/development-install-guide)。

关于运行区的安装，请参考[运行区安装](./installation-configuration/deployment-install-guide)。

## 部署

Choerodon 可以有两种不同的部署方式，用户可以选择单集群部署，将开发和运行相关服务部署到一个Kubernetes集群上，也可以将开发区和运行区的服务分别部署到不同的Kubernetes集群上。

> 一个Kubernetes集群如果仅部署开发区相关的服务，则可作为DevOps开发端使用，如果仅部署运行区相关服务，则可作为DevOps运行端使用，如果既部署开发区相关服务和组件，又部署运行区相关服务和组件，则可以为一个完整的PaaS平台。


### 单集群部署

单集群部署是将开发区相关的服务和运行区相关的服务部署到一个Kubernetes集群中。用户的开发和应用的部署和运行全部在一个Kubernetes集群中。

![](/img/docs/concept/choerodon-deploy-single.png)

### 多集群部署

多集群部署是将开发区相关的服务和运行区相关的服务分别部署到多个Kubernetes集群中，开发区和运行区集群之间通过http通信。我们可以把多个运行区看做是多套环境，例如测试环境、正式环境等。

![](/img/docs/concept/choerodon-deploy-multiple.png)

## 开发区相关服务

Choerodon 开发区各服务版本信息如下：

服务名	|服务组	|	服务代码	|	版本号
---	|---	|	---	|	---
K8S消息收集	|	com.choerodon.devops 	|	k8s-informer 	|	V0.1.1
Gitlab服务	|	com.choerodon.devops 	|	choerodon-gitlab-service  	|	1.1.0
K8S服务	|	com.choerodon.devops 	|	devops-kubernetes-service	|	1.1.0
文件服务	|	com.choerodon.devops 	|	choerodon-file-service 	|	1.1.0
开发服务	|	com.choerodon.devops 	|	choerodon-devops-service  	|	1.1.0
部署服务	|	com.choerodon.devops 	|	devops-deploy-service	|	1.1.6
SonarQube服务	|	com.choerodon.insight 	|	data-sonar-service  	|	1.0.1
数据整合服务	|	com.choerodon.insight 	|	data-intergration-service	|	1.0.0
数据提供服务	|	com.choerodon.insight 	|	data-provide-service 	|	1.0.1
数据操作服务	|	com.choerodon.insight	|	data-operation-service 	|	1.0.0
看板服务	|	com.choerodon.kanban 	|	choerodon-kanban-service 	|	1.1.0
移动服务	|	com.choerodon.mobile 	|	mobile-cloud-service 	|	1.0.0
开发前端	|	com.choerodon.devops 	|	devops-front 	|	1.1.3
部署前端	|	com.choerodon.devops 	|	deploy-front 	|	1.1.5
洞察前端	|	com.choerodon.insight 	|	analysis-insight-front  	|	1.0.0
监控前端	|	com.choerodon.insight 	|	monitor-front	|	1.0.0
看板前端	|	com.choerodon.kanban 	|	choerodon-kanban-front 	|	1.1.0
移动前端	|	com.choerodon.mobile 	|	mobile-front 	|	1.0.0

## 运行区相关服务

Choerodon 运行区各服务版本信息如下：

服务名	|服务组	|	服务代码	|	版本号
---	|---	|	---	|	---
K8S消息收集	|	com.choerodon.devops 	|	k8s-informer 	|	V0.1.1
K8S服务	|	com.choerodon.devops 	|	devops-kubernetes-service	|	1.1.0
文件服务	|	com.choerodon.devops 	|	choerodon-file-service 	|	1.1.0
部署服务	|	com.choerodon.devops 	|	devops-deploy-service	|	1.1.6
数据整合服务	|	com.choerodon.insight 	|	data-intergration-service	|	1.0.0
数据提供服务	|	com.choerodon.insight 	|	data-provide-service 	|	1.0.1
数据操作服务	|	com.choerodon.insight	|	data-operation-service 	|	1.0.0
移动服务	|	com.choerodon.mobile 	|	mobile-cloud-service 	|	1.0.0
部署前端	|	com.choerodon.devops 	|	deploy-front 	|	1.1.5
监控前端	|	com.choerodon.insight 	|	monitor-front	|	1.0.0
移动前端	|	com.choerodon.mobile 	|	mobile-front 	|	1.0.0