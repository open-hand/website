+++
title = "资源"
description = ""
weight = 2
+++


## 1. 概述

资源模块中包含了实例视图与资源视图，支持从应用服务和环境资源的维度来查看项目下所有资源的详情，以便同时满足开发人员与部署运维人员对于资源信息的需求。其中包括了平台中实例、网络、域名、证书、配置映射和密文的详情。此外还支持管理与查看除c7n-release类型的YAML文件在平台中部署后生成的实体。

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-01.png)

## 2. 实例视图

实例视图支持开发人员从应用服务的维度来查看与管理与其相关的所有资源，并以树结构为基础，分为：环境层、应用服务层和实例层三个层级，每个层级中均包含了与之对应的功能与详情。

### 2.1 环境层

在环境层中，项目所有者能查看到该环境的GitOps日志以及为该环境分配权限；而有环境权限的项目成员仅能查看GitOps日志。同时，还支持在该环境下关联项目中的应用服务，以便于直接在该环境中为此应用服务创建网络、域名、配置映射以及密文等资源。

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-02.png)

### 2.2 应用服务层

在应用服务层中，有环境权限的人员即可在此为应用服务创建对应的网络、域名、配置映射与密文。简而言之，应用服务层主要用于从应用服务的维度去查看与管理对应环境下的资源。

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-03.png)

### 2.3 实例层

实例层主要展示了某个应用服务部署在某个环境中的所有实例的详情，其中包括对应实例的实例事件、运行详情以及Pod详情。以便开发人员和运维人员能查看到某个实例的具体详情。

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-04.png)

## 3. 资源视图

资源视图支持部署运维人员从环境资源的维度全面地查看项目下所有资源的详情。其中包括了平台中实例、网络、域名、证书、配置映射和密文的详情。此外还支持管理与查看除c7n-release类型的YAML文件在平台中部署后生成的实体。而资源视图在结构上同样也分为三层，分别是：环境层、资源列表层、资源详情层。

### 3.1 环境层

资源视图的环境层中，主要展示了当前环境中所有资源的数量以及其中Pod对于CPU和内存资源的用量排行。以便运维人员能实时掌握各种资源的状态。

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-05.png)

### 3.2 资源列表层

顾名思义，资源列表层（其中分别包括了实例、网络、域名、证书、配置映射、密文以及自定义资源的列表）中，展示了该环境中某类资源的总览列表。运维人员可在该层查看与管理对应的资源。

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-06.png)

### 3.3 资源详情层

#### 3.3.1 实例

实例是一次应用服务部署生成的实体。用于更好地管理经过容器化后的应用服务。
![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-07.png)

而实例的详情界面主要展示了运行详情、实例事件与Pod详情的详细信息。

#### 3.3.2 网络

网络是一种管理内部服务连通方式的策略，用于实现容器内部资源的负载均衡以及流量转发。配置后，平台会将网络流量定向转发到指定的单个或者多个实例容器组，完成服务的连通与流转。  

而网络的详情界面则展示了网络端口、协议、负载与对应的Pods的信息。

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-08.png)

#### 3.3.3 域名

域名是用户通过浏览器可以从外部访问系统内部应用程序的地址。用户可以在此配置已经预定义好的域名，使外部能够通过指定的域名访问到系统内部的实例。

而域名的详情界面则展示了对应的路径、网络、端口以及对应的注解（Annotations）。

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-09.png)

#### 3.3.4 证书

证书是遵守某种网络安全协议，具有服务器身份验证和数据传输加密功能的数字证书。此处的证书可用于在平台中创建加密类型的域名。

而证书的详情界面展示了当前与之关联的域名以及对应的域名地址。

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-10.png)

#### 3.3.5 配置映射

配置映射是用来存储配置文件的Kubernetes资源对象，其中存储的键值对可以在pods中使用。

配置映射的详情界面展示了其中键值对的内容。 

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-11.png)

#### 3.3.6 密文

密文是用来保存小片敏感数据的Kubernetes资源对象，例如密码，token，或者密钥。 
 
密文的详情界面以密文的形式展示了其中键值对的内容。

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-12.png)

#### 3.3.7 自定义资源

自定义资源是指通过除c7n-release类型的YAML文件在平台中部署后生成的实体。  

自定义资源的详情界面展示了其中的Description。

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-13.png)

## 阅读更多
- [部署](../deploy)
- [流水线](../pipline)
- [环境配置](../../env-config)