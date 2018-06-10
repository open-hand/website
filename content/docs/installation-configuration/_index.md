+++
title = "部署与配置"
description = "部署与配置"
date = 2018-03-30T13:06:38+08:00
draft = false
weight = 2
+++

## 部署与配置

Choerodon采用Spring Cloud作为微服务框架，运行在Docker上，以Kubernetes作为容器的编排工具。理论上只要服务器资源允许，可以运行Kubernetes，就可以运行Choerodon。Choerodon不是一个单体应用系统，而是一个包含多个微服务的分布式系统，所以部署相对比较复杂。目前，我们提供基于Helm的部署方式，以提高部署效率。

---

### 前置要求与约定

- 硬件要求：
    - 节点数量：4    
    - 单节点内存信息：16G及以上
    - 单节点处理器信息：4核4线程及以上   
    <blockquote class="note">
    只要现有节点内存与CPU总和大于上述节点要求即可。
    </blockquote>

- 软件要求：
    - 系统版本：CentOS7.2及以上
    - Kubernetes：1.8.5及以上
    - Helm：2.8.2及以上(tiller版本请一定与helm版本一致)

- 约定：部署教程以NFS类型的PV为例进行创建，所有非集群级对象都创建在`choerodon-devops-prod`命名空间下。
        <blockquote class="note">
        NFS搭建可参考此<a href="parts/base/nfs" target="_blank">教程</a>。
        </blockquote>

### 开始部署

<blockquote class="note">
下面我们开始进行部署，首选进行Kubernetes集群部署，部署完成后，你可以选择使用脚本进行一键式安装Choerodon，也可以分步进行安装Choerodon。
</blockquote>

1. [Kubernetes集群部署](./kubernetes)
2. [一键部署Choerodon](./choerodon)
3. [分步部署Choerodon](./parts)
4. [Gitlab Runner部署](./gitlab-runner)

<blockquote class="note">
部署GitLab Runner用于代码提交后自动进行代码测试、构建Choerodon服务的镜像及生成helm chart并将结果发回给Choerodon。它与GitLab CI一起使用，GitLab CI是GitLab中包含的开源持续集成服务，用于协调作业。
</blockquote>