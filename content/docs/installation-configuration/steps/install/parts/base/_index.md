+++
title = "基础组件部署"
description = "基础组件部署"
date = 2018-03-30T13:06:38+08:00
draft = false
weight = 1
+++

# 部署与配置

Choerodon采用Spring Cloud作为微服务框架，运行在Docker上，以Kubernetes作为容器的编排工具。理论上只要服务器资源允许，可以运行Kubernetes，就可以运行Choerodon。Choerodon不是一个单体应用系统，而是一个包含多个微服务的分布式系统，所以部署相对比较复杂。目前，我们提供基于Helm的部署方式，以提高部署效率。

---

<blockquote class="warning">
  <ul>
  <li>部署时请逐个确认环境变量</li>
  <li>部署时请确认设置的域名是否已映射到将要部署的集群中</li>
  <li>安装命令基于NFS动态后端存储卷，若有其他StorageClass也可以进行使用</li>
  </ul>
</blockquote>

## 前置要求与约定

- 硬件要求：
    - 节点数量：4    
    - 单节点内存信息：16G及以上
    - 单节点处理器信息：4核4线程及以上
    - 单节点硬盘：40G及以上（如使用NFS存储，那么NFS服务节点建议存储不小于512G）
    <blockquote class="note">
    只要现有节点内存与CPU总和大于上述节点要求即可。
    </blockquote>
    
- 软件要求：
    - 系统版本：CentOS7.2及以上
    - Kubernetes：1.8.5及以上
    - Helm：2.8.2及以上(tiller版本请一定与helm版本一致)

- 约定：部署教程以NFS类型的PV为例进行创建，所有非集群级对象都创建在`c7n-system`命名空间下。

## 开始部署

1. [Helm部署](../../helm)
1. [Chartmuseum部署](./chartmuseum)
1. [Minio部署](./minio)
1. [Redis部署](./redis)
1. [Mysql部署](./mysql)
1. [Zookeeper部署](./zookeeper)
1. [kafka部署](./kafka)
1. [Harbor部署](./harbor)
1. [Gitlab部署](./gitlab)