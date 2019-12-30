+++
title = "第二步：Helm安装"
description = "第二步：Helm安装"
weight = 10
+++

# Helm部署

## 预备知识

如果你不知道Helm是做什么的，那么请参考下面链接（包括但不限于）进行学习：

- [Helm](https://helm.sh/)

## 约定

- [部署kubernetes集群](../kubernetes)使用的是Choerodon提供的文档进行部署的

## 创建ServiceAccount

- 在任意一个master节点执行以下命令

    ```bash
    kubectl create serviceaccount --namespace kube-system helm-tiller
    kubectl create clusterrolebinding helm-tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:helm-tiller
    ```

## 部署客户端

- 在任意一个master节点执行以下命令

    1. 根据系统下载所需版本  

        ```bash
        curl -L -o helm-v2.14.3-linux-amd64.tar.gz https://file.choerodon.com.cn/kubernetes-helm/v2.14.3/helm-v2.14.3-linux-amd64.tar.gz
        ```

    1. 解压压缩包（以linux-amd64为例）

        ```bash
        tar -zxvf helm-v2.14.3-linux-amd64.tar.gz
        ```
    1. 将文件移动到PATH目录中（以linux-amd64为例）

        ```bash
        sudo mv linux-amd64/helm /usr/bin/helm
        ```
    1. 初始化Helm
   
        ```bash
        helm init \
            --history-max=3 \
            --tiller-image=gcr.azk8s.cn/kubernetes-helm/tiller:v2.14.3 \
            --stable-repo-url=https://mirror.azure.cn/kubernetes/charts/ \
            --service-account=helm-tiller
        ```


## 验证部署

- 执行命令，出现以下信息即部署成功。
    
    ```console
    $ helm version
    Client: &version.Version{SemVer:"v2.14.3", GitCommit:"0e7f3b6637f7af8fcfddb3d2941fcc7cbebb0085", GitTreeState:"clean"}
    Server: &version.Version{SemVer:"v2.14.3", GitCommit:"0e7f3b6637f7af8fcfddb3d2941fcc7cbebb0085", GitTreeState:"clean"}
    ```