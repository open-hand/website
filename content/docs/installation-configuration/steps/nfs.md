+++
title = "第三步：NFS动态存储卷"
description = "第三步：NFS动态存储卷"
weight = 15
+++

# NFS动态存储卷

## 前置要求

- 系统要求：CentOS

## 没有NFS服务

- 在集群每一个节点安装`nfs-utils`

    ```
    sudo yum install -y nfs-utils
    ```

- 在master节点执行下面helm命令，安装`nfs-provisioner`
{{< annotation shell "集群内提供存储的节点的Node Name，可通过 kubectl get node 命令查看" "该节点的物理目录，需手动创建">}}
helm install c7n/nfs-provisioner \
    --set rbac.create=true \
    --set service.enabled=true \
    --set persistence.enabled=true \
    --set persistence.nodeName=node1 \(1)
    --set persistence.hostPath=/u01/prod \(1)
    --version 0.1.0 \
    --name nfs-provisioner \
    --namespace c7n-system
{{< /annotation >}}

## 有NFS服务

- 在集群每一个节点安装`nfs-utils`

    ```
    sudo yum install -y nfs-utils
    ```

- 在master节点执行下面helm命令，安装`nfs-client-provisioner`
{{< annotation shell "提供NFS服务的主机IP地址或域名" "NFS服务共享的目录">}}
helm install c7n/nfs-client-provisioner \
    --set persistence.enabled=true \
    --set storageClass.name=nfs-provisioner \
    --set persistence.nfsServer=127.0.0.1 \(1)
    --set persistence.nfsPath=/u01/prod \(1)
    --set rbac.create=true \
    --version 0.1.0 \
    --name nfs-client-provisioner \
    --namespace c7n-system
{{< /annotation >}}