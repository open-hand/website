+++
title = "Helm安装"
description = "Helm安装"
weight = 15
+++

# Helm安装

## 前置要求

- 安装helm客户端的主机可以通过kubectl命令管理kubernetes集群。

## 创建ServiceAccount

> 服务端端执行

```bash
kubectl create serviceaccount --namespace kube-system helm-tiller
kubectl create clusterrolebinding helm-tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:helm-tiller
```

## 安装客户端

> 客户端执行

1. 根据系统下载所需版本  

    http://files.saas.hand-china.com/kubernetes-helm/v2.8.2/
1. 解压压缩包（以linux-amd64为例）

    ```bash
    tar -zxvf helm-v2.8.2-linux-amd64.tgz
    ```
1. 将文件移动到PATH目录中（以linux-amd64为例）

    ```bash
    mv linux-amd64/helm /usr/local/bin/helm
    ```
1. 初始化Helm

    ```bash
    helm init --tiller-image=registry.saas.hand-china.com/kubernetes-helm/tiller:v2.8.2 --service-account=helm-tiller
    ```