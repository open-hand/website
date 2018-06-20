+++
title = "第四步：分步部署Choerodon"
description = "第四步：分步部署Choerodon"
date = 2018-03-30T13:06:38+08:00
draft = false
weight = 20
+++

## 部署与配置

Choerodon采用Spring Cloud作为微服务框架，运行在Docker上，以Kubernetes作为容器的编排工具。理论上只要服务器资源允许，可以运行Kubernetes，就可以运行Choerodon。Choerodon不是一个单体应用系统，而是一个包含多个微服务的分布式系统，所以部署相对比较复杂。目前，我们提供基于Helm的部署方式，以提高部署效率。

---
<blockquote class="warning">
  <ul>
  <li>部署时请逐个确认环境变量</li>
  <li>部署时请确认设置的域名是否已映射到将要部署的集群中</li>
  <li>安装命令基于NFS存储进行部署，非NFS存储不能使用本教程命令</li>
  <li>请确认集群中每个节点都安装了nfs-utils，若未安装请进行<a href="../../nfs/#客户端挂载nfs服务器共享目录" target="_blank">安装</a></li>
  <li>请注意所有目录都是基于NFS Server主机的根目录，并非mount到的主机上的根目录，请清楚之间的关系，NFS相关信息请参考<a href="../../nfs" target="_blank">这里</a></li>
  </ul>
</blockquote>

### 前置要求与约定

- 硬件要求：
    - 核心数量：4核4线程及以上
    - 内存信息：16G及以上
    - 节点数量：4       
    <blockquote class="note">
    只要现有节点内存与CPU总和大于上述节点要求即可。
    </blockquote>

- 软件要求：
    - 系统版本：CentOS7.2及以上
    - Kubernetes：1.8.5及以上
    - Helm：2.8.2及以上(tiller版本请一定与helm版本一致)

- 约定：部署教程以NFS类型的PV为例进行创建，所有非集群级对象都创建在`choerodon-devops-prod`命名空间下。

### 开始部署

1. [Helm部署](./base/helm)
1. [Chartmuseum部署](./base/chartmuseum)
1. [Minio部署](./base/minio)
1. [Redis部署](./base/redis)
1. [Mysql部署](./base/mysql)
1. [Zookeeper部署](./base/zookeeper)
1. [kafka部署](./base/kafka)
1. [Harbor部署](./base/harbor)
1. [Gitlab部署](./base/gitlab)
1. [Choerodon部署](./choerodon.devops)