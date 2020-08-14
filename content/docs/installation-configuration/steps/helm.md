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

## 部署客户端

- 在任意一个master节点执行以下命令

    1. 根据系统下载所需版本  

        ```
        curl -L -o helm-v3.2.4-linux-amd64.tar.gz https://file.choerodon.com.cn/kubernetes-helm/v3.2.4/helm-v3.2.4-linux-amd64.tar.gz
        ```

    1. 解压压缩包（以linux-amd64为例）

        ```
        tar -zxvf helm-v3.2.4-linux-amd64.tar.gz
        ```

    1. 将文件移动到PATH目录中（以linux-amd64为例）

        ```
        sudo mv linux-amd64/helm /usr/bin/helm
        ```

## 验证部署

- 执行命令，出现以下信息即部署成功。

    ```
    $ helm version
    version.BuildInfo{Version:"v3.2.4", GitCommit:"0ad800ef43d3b826f31a5ad8dfbb4fe05d143688", GitTreeState:"clean", GoVersion:"go1.13.12"}
    ```
