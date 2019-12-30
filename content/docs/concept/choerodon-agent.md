+++
title = "Agent"
description = "Choerodon Agent是猪齿鱼持续交付部分的一个核心组件，通过主动连接devops service(部署服务)，并与Kubernetes集群进行直接交互"
weight = 7

+++

# Choerodon  Agent
---

## 简介

Choerodon Agent是猪齿鱼持续交付部分的一个核心组件，通过主动连接devops service(部署服务)，并与Kubernetes集群进行直接交互。
本组件全部基于Go语言实现，轻量高效。作为一个集群环境的代理客户端，负责具体执行应用部署相关部分，通过在集群中部署一个Choerodon Agent，并指定猪齿鱼平台的部署服务的链接地址，即可以将该集群作为一个猪齿鱼平台的部署环境。

## 场景演示
通过猪齿鱼平台创建三个环境，各个环境对应的Choerodon Agent安装脚本可以在任意Kubernetes集群中执行。
在B集群中安装一个正式环境对应Choerdon Agent ，在A集群中安装了开发环境和测试环境对应Agent。
Choerodon Agent安装所在的Kubernetes集群对于猪齿鱼持续交付部署服务完全透明，通过平台创建的环境成功安装之后，即可以作为开发应为的部署环境，作为环境流水线中的一员。

 ![](/docs/concept/image/p3.png) 


## 关键技术及架构

Choerodon Agent通过WebSocket Client与外部的猪齿鱼部署服务进行连接、执行命令等交互。内部通过Helm客户端与Kubernetes集群。
内部的tiller server执行Chart安装删除等操作，并且通过Kube Client直接对Kubernetes各种资源对象进行操作，监听各资源对象的状态变更。
通过长连接及时通知部署服务。

 ![](/docs/concept/image/p1.png) 


Choerodon Agent和部署服务之间的交互采用Command/response模式，启动时立即向部署服务建立连接，接收Command执行并返回结果Repsonse。
作为WebSocket Client将Command通过Channel不断的发送至执行器，执行器Worker是一个可伸缩配置的工作线程/协程池，
执行后将结果通过Channel给Websocket client写回。

 ![](/docs/concept/image/p2.png) 


## 优势

 - 轻量级
 
      Choerodon Agent 基于Go语言实现，启动快速。占用内存下，消耗资源却很少，只需Kubernetes集群中部署相应版本的  tiller后，通过Helm命令一键安装，此集群立即就可以加入猪齿鱼平台。

 - 安全
 
     Choerodon Agent通过WebSocket与部署服务交互，执行命令。作为WebSocket客户端，主动连接猪齿鱼平台中的部署服务，不对外界暴露连接。向部署服务连接时指定的token和相关环境信息。

 - 易于扩展
 
    一个部署服务可以不限制通过Choerodon Agent将Kubernetes集群部署环境加入平台，这些环境可以在同一个集群的不同命令空间中，也可以在不同的集群中。
 
 - 统一标准
 
     所有应用部署通过标准的Helm Chart进行安装、删除更新等，统一标准，方便与其他开源工具配合使用，减少维护成本。

## 功能

* Chart应用安装、删除、回滚、升级、停止、重启

* 创建Kubernetes Serivice，Ingress

* 容器日志
 
* 各个Kubernetes资源对象状态更新通知

## 优化升级

* 使接收到的命令持久化，防止服务宕机，导致命令消息丢失。

* 增加性能监控相关功能接口。




