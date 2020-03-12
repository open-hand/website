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
- Kubernetes：1.10及以上，1.17以下
- Helm：2.13及以上

## 网络要求
- 各个服务器之间内网互通内网带宽建议1Gbps以上
- 各个服务器能够访问外网

## 需开放的端口号

| **控制平面节点**  |      |             |                              |                     |
| ----------------- | ---- | ----------- | ---------------------------- | ------------------- |
| 协议              | 方向 | 端口范围    | 使用者                       | 用途                |
| TCP               | 入站 | 6443        | Kubernetes APIserver         | All                 |
| TCP               | 入站 | 2379-2380   | etcd server clientAPI        | kube-apiserver,etcd |
| TCP               | 入站 | 10248,10250 | Kubelet API                  | Self,Controlplane   |
| TCP               | 入站 | 10251,10259 | kube-scheduler               | Self                |
| TCP               | 入站 | 10252,10257 | kube-controller-manager      | Self                |
| **工作节点**      |      |             |                              |                     |
| 协议              | 方向 | 端口范围    | 使用者                       | 用途                |
| tcp               | 入站 | 80          | ingress-controller           | All                 |
| tcp               | 入站 | 443         | ingress-controller           | All                 |
| tcp               | 入站 | 30080       | ingress-controller           | All                 |
| tcp               | 入站 | 30443       | ingress-controller           | All                 |
| TCP               | 入站 | 10248,10250 | KubeletAPI                   | Self,Controlplane   |
| TCP               | 入站 | 30000-32767 | NodePort Services*           | All                 |
| TCP               | 入站 | 10256       | kube-proxy                   | 健康检查            |
| **Flannel**       |      |             |                              |                     |
| 协议              | 方向 | 端口范围    | 使用者                       | 用途                |
| UDP               | 双向 | 8285        | flannel networking(UDP)      | 收发封装数据包      |
| UDP               | 双向 | 8472        | flannel networking(VXLAN)    | 收发封装数据包      |
| **Calico**        |      |             |                              |                     |
| 协议              | 方向 | 端口范围    | 使用者                       | 用途                |
| TCP               | 双向 | 179         | Calico networking(BGP)       | 收发封装数据包      |
| TCP               | 双向 | 5473        | Calico networking with Typha | 收发封装数据包      |
| **Kube-ovn**      |      |             |                              |                     |
| 协议              | 方向 | 端口范围    | 使用者                       | 用途                |
| udp               | 双向 | 6081        | kube-ovn                     | 收发封装数据包      |
| tcp               | 入站 | 6641        | ovsdb-server                 | 数据存储            |
| tcp               | 入站 | 6642        | ovsdb-server                 | 数据存储            |
| **load-balancer** |      |             |                              |                     |
| 协议              | 方向 | 端口范围    | 使用者                       | 用途                |
| tcp               | 入站 | 8443        | nginx,haproxy,envoy          | lb kube-apiserver   |
| tcp               | 入站 | 8081        | nginx,haproxy,envoy          | 健康检查            |
| tcp               | 入站 | 9090        | haproxy,envoy                | 管理端口            |

## 约定
- 非特别说明，请使用具有root权限的用户进行安装操作
- 部署教程以NFS类型的PV为例进行创建，所有非集群级对象都创建在`c7n-system`命名空间下