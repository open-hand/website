+++
title = "Helm部署"
description = "Helm部署"
weight = 15
+++

# Helm部署

## 前置要求

<blockquote class="warning">
部署helm客户端的主机可以通过kubectl命令管理kubernetes集群，或者有相应Kubernetes集群config文件且有权限管理Kubernetes集群。config文件通常在$HOME/.kube/config，helm与kubectl使用的是同一份config文件。建议在任意一台Master节点上进行部署。
</blockquote>

## 创建ServiceAccount

<blockquote class="note">
服务端执行。
</blockquote>

<blockquote class="warning">
若集群没有开启RBAC权限认证，请忽略本小节。
</blockquote>

```bash
kubectl create serviceaccount --namespace kube-system helm-tiller
kubectl create clusterrolebinding helm-tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:helm-tiller
```

## 部署客户端

<blockquote class="note">
客户端执行
</blockquote>

1. 根据系统下载所需版本  

    ```bash
    curl -L -o helm-v2.8.2-linux-amd64.tar.gz https://storage.googleapis.com/kubernetes-helm/helm-v2.8.2-linux-amd64.tar.gz
    ```
1. 解压压缩包（以linux-amd64为例）

    ```bash
    tar -zxvf helm-v2.8.2-linux-amd64.tar.gz
    ```
1. 将文件移动到PATH目录中（以linux-amd64为例）

    ```bash
    mv linux-amd64/helm /usr/local/bin/helm
    ```
1. 初始化Helm

    <blockquote class="warning">
    若集群没有开启RBAC权限认证，请删除命令中 --service-account=helm-tiller 参数。
    </blockquote>

    ```bash
    helm init --tiller-image=registry.cn-shanghai.aliyuncs.com/choerodon/tiller:v2.8.2 --stable-repo-url https://kubernetes.oss-cn-hangzhou.aliyuncs.com/charts --service-account=helm-tiller
    ```

## 验证部署

<blockquote class="note">
客户端执行
</blockquote>

- 执行命令

    ```bash
    helm version
    ```

- 预期结果
    - 出现以下类似信息即部署成功。
    
    ```bash
    Client: &version.Version{SemVer:"v2.8.2", GitCommit:"a80231648a1473929271764b920a8e346f6de844", GitTreeState:"clean"}
    Server: &version.Version{SemVer:"v2.8.2", GitCommit:"a80231648a1473929271764b920a8e346f6de844", GitTreeState:"clean"}
    ```