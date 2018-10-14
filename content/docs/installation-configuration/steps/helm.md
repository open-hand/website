+++
title = "第二步：Helm安装"
description = "第二步：Helm安装"
weight = 10
+++

# Helm部署

## 约定

- [部署kubernetes集群](../kubernetes)使用的是Choerodon提供的文档进行部署的

## 创建ServiceAccount

- 在任意一个master节点执行以下命令

    <blockquote class="warning">
    若集群没有开启RBAC权限认证，请忽略本小节。通过本站Kubernetes集群搭建文档搭建的Kubernetes集群默认是启用RBAC权限认证的。
    </blockquote>

    ```bash
    kubectl create serviceaccount --namespace kube-system helm-tiller
    kubectl create clusterrolebinding helm-tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:helm-tiller
    ```

## 部署客户端

- 在任意一个master节点执行以下命令

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
        mv linux-amd64/helm /usr/bin/helm
        ```
    1. 初始化Helm
{{< annotation shell "若集群没有开启RBAC权限认证，请删除命令中 --service-account=helm-tiller 参数">}}
helm init \
    --tiller-image=registry.cn-shanghai.aliyuncs.com/choerodon/tiller:v2.8.2 \
    --stable-repo-url https://kubernetes.oss-cn-hangzhou.aliyuncs.com/charts \
    --service-account=helm-tiller(1)
{{< /annotation >}}


## 验证部署

- 执行命令，出现以下信息即部署成功。
    
    ```console
    $ helm version
    Client: &version.Version{SemVer:"v2.8.2", GitCommit:"a80231648a1473929271764b920a8e346f6de844", GitTreeState:"clean"}
    Server: &version.Version{SemVer:"v2.8.2", GitCommit:"a80231648a1473929271764b920a8e346f6de844", GitTreeState:"clean"}
    ```