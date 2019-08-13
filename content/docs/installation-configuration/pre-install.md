+++
title = "安装要求及约定"
description = "详细介绍安装Choerodon时的硬件、软件、网络、端口、域名要求和基本约定"
weight = 7

+++

# 要求与约定

Choerodon采用Spring Cloud作为微服务框架，运行在Docker上，以Kubernetes作为容器的编排工具。理论上只要服务器资源允许，可以运行Kubernetes，就可以运行Choerodon。Choerodon不是一个单体应用系统，而是一个包含多个微服务的分布式系统，所以部署相对比较复杂。目前，我们提供基于Helm的部署方式，以提高部署效率。

---

## 硬件最低要求
- 节点数量：4    
- 单节点内存信息：16G及以上
- 单节点处理器信息：4核4线程及以上
- 单节点硬盘：100G及以上

<blockquote class="note">
只要现有节点内存与CPU总和大于上述节点要求即可。
</blockquote>

## 软件要求
- 系统版本：CentOS7.4及以上
- Kubernetes：1.8.5及以上
- Helm：2.8.2及以上

## 网络要求
- 各个服务器之间内网互通内网带宽建议1Gbps以上
- 各个服务器能够访问外网

## 需开放的端口号

  <blockquote class="note">
  如果您没有开启防火墙则无需在主机配置该项内容，如果你的服务器上游有安全组管控，请根据实际情况进行配置。
  </blockquote>

- Master(s)节点：Master(s)节点为Kubernetes主节点

    协议|方向|端口范围|目的
    ---|---|---|---
    TCP	|入方向|6443|Kubernetes API server
    TCP	|入方向|2379-2380|etcd server client API
    TCP	|入方向|10250|Kubelet API
    TCP	|入方向|10251|kube-scheduler
    TCP	|入方向|10252|kube-controller-manager
    TCP	|入方向|10255|Read-only Kubelet API
    
- Worker(s)节点：Worker(s)节点为Kubernetes普通节点

    协议|方向|端口范围|目的
    ---|---|---|---
    TCP|入方向|10250	|Kubelet API
    TCP|入方向|10255	|Read-only Kubelet API
    TCP|入方向|30000-32767|	NodePort Services

## 域名要求
- Choerodon必须通过域名访问，用户需要将自己的域名指向搭建的Kubernetes任意主节点。

## 约定
- 非特别说明，请使用具有root权限的用户进行安装操作
- 部署教程以NFS类型的PV为例进行创建，所有非集群级对象都创建在`c7n-system`命名空间下