+++
title = "Minio安装"
description = "Minio安装"
weight = 25
+++

# minio安装

## 仓库设置

1. 本地添加远程仓库

    ```
    helm repo add paas http://helm-charts.choerodon.io/paas/base/
    ```
1. 更新本地仓库信息

    ```
    helm repo update 
    ```

## 安装Minio

> **注意：** 启用持久化存储请执行提前创建PV和PVC，也可使用以下语句进行创建；可在安装命令中添加`--debug --dry-run`参数，进行渲染预览不进行安装。

- 创建minio所需PV和PVC

    ```bash
    helm install paas/create-pv \
        --set type=nfs \
        --set pv.name=minio-pv \
        --set nfs.path=/u01/nfs/exports/io-choerodon/minio \
        --set nfs.server=nfs.exmple.choerodon.io \
        --set pvc.name=minio-pvc \
        --set size=3Gi \
        --set "accessModes[0]=ReadWriteOnce" \
        --name minio-pv --namespace=io-choerodon
    ```

- 进行安装部署

    ```
    helm install paas/minio \
        --set persistence.enabled=true \
        --set persistence.existingClaim=minio-pvc \
        --set env.open.MINIO_ACCESS_KEY=admin \
        --set env.open.MINIO_SECRET_KEY=password \
        --set ingress.enabled=true \
        --set "ingress.hosts[0]"="minio.exmple.choerodon.io" \
        --name=minio --namespace=io-choerodon
    ```

- 参数：

    参数 | 含义 
    --- |  --- 
    persistence.enabled|是否启用持久化存储
    persistence.existingClaim|PVC的名称
    ingress.enabled|是否启用ingress
    ingress.hosts[0]|域名
    env.open.MINIO_ACCESS_KEY|用户名
    env.open.MINIO_SECRET_KEY|密码
