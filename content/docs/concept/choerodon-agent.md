+++
title = "Agent"
description = "Choerodon Agent是猪齿鱼持续交付部分的一个核心组件，通过主动连接devops service(部署服务)，并与Kubernetes集群进行直接交互"
weight = 7

+++

# Choerodon  Agent
---

## 简介

Choerodon Agent 是猪齿鱼持续交付部分的一个核心组件，通过主动连接 devops service (部署服务)，并与 Kubernetes 集群进行直接交互。
本组件全部基于 Go 语言实现，轻量高效。作为一个集群环境的代理客户端，负责具体执行应用部署相关部分，通过在集群中部署一个 Choerodon Agent，并指定猪齿鱼平台的部署服务的链接地址，即可以将该集群作为一个猪齿鱼平台的部署环境。

## 场景演示
通过猪齿鱼平台创建三个环境，各个环境对应的 Choerodon Agent 安装脚本可以在任意 Kubernetes 集群中执行。
在B集群中安装一个正式环境对应 Choerdon Agent ，在A集群中安装了开发环境和测试环境对应 Agent。
Choerodon Agent 安装所在的 Kubernetes 集群对于猪齿鱼持续交付部署服务完全透明，通过平台创建的环境安装成功之后，即可作为开发的部署环境，成为环境流水线中的一员。

 ![](/docs/concept/image/p3.png) 


## 关键技术及架构

Choerodon Agent 通过 WebSocket Client 与外部的猪齿鱼部署服务进行连接、执行命令等交互。内部通过 Helm 客户端与 Kubernetes 集群。
内部的 tiller server 执行 Chart 安装删除等操作，并且通过 Kube Client 直接对 Kubernetes 各种资源对象进行操作，监听各资源对象的状态变更。
通过长连接及时通知部署服务。

 ![](/docs/concept/image/p1.png) 


Choerodon Agent 和部署服务之间的交互采用 Command/response 模式，启动时立即向部署服务建立连接，接收 Command 执行并返回结果 Repsonse 。
作为 WebSocket Client 将 Command 通过 Channel 不断的发送至执行器，执行器 Worker 是一个可伸缩配置的工作线程/协程池，执行后将结果通过 Channel 给 Websocket client 写回。

 ![](/docs/concept/image/p2.png) 


## 优势

 - 轻量级
 
      Choerodon Agent 基于 Go 语言实现，启动快速。占用内存小，消耗资源也很少，通过 Helm 命令一键安装，此集群立即就可以加入猪齿鱼平台。

 - 安全
 
     Choerodon Agent 通过 WebSocket 与部署服务交互，执行命令。作为 WebSocket 客户端，主动连接猪齿鱼平台中的部署服务，不对外界暴露连接。向部署服务连接时指定的 token 和相关环境信息。

 - 易于扩展
 
    一个部署服务可以不限制通过 Choerodon Agent 将 Kubernetes 集群部署环境加入平台，这些环境可以在同一个集群的不同命令空间中，也可以在不同的集群中。
 
 - 统一标准
 
     所有应用部署通过标准的 Helm Chart 进行安装、删除更新等，统一标准，方便与其他开源工具配合使用，减少维护成本。

## 功能

* Chart 应用安装、删除、回滚、升级、停止、重启

* 创建 Kubernetes Serivice，Ingress

* 容器日志
 
* 各个 Kubernetes 资源对象状态更新通知

## 优化升级

* 使接收到的命令持久化，防止服务宕机，导致命令消息丢失。

* 增加性能监控相关功能接口。




