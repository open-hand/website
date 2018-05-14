+++
title = "Redis安装"
description = "Redis安装"
weight = 30
+++

# Redis安装

## 仓库设置

1. 本地添加远程仓库

    ```
    helm repo add paas http://helm-charts.staging.saas.hand-china.com/paas/base/
    ```
1. 更新本地仓库信息

    ```
    helm repo update 
    ```

## 安装Redis

> **注意：**启用持久化存储请执行提前创建所指向的物理地址，PV和PVC可使用以下语句进行创建；可在安装命令中添加`--debug --dry-run`参数，进行渲染预览不进行安装。

- 创建PV和PVC

    ```bash
    helm install paas/create-pv \
        --set type=nfs \
        --set pv.name=framework-redis-pv \
        --set nfs.path=/u01/nfs/exports/io-choerodon/framework-redis \
        --set nfs.server=nfs-rdc3.hand-china.com \
        --set pvc.name=framework-redis-pv \
        --set size=1Gi \
        --set "accessModes[0]=ReadWriteOnce" \
        --name framework-redis-pv --namespace=io-choerodon

    helm install paas/create-pv \
        --set type=nfs \
        --set pv.name=devops-redis-pv \
        --set nfs.path=/u01/nfs/exports/io-choerodon/devops-redis \
        --set nfs.server=nfs-rdc3.hand-china.com \
        --set pvc.name=devops-redis-pv \
        --set size=1Gi \
        --set "accessModes[0]=ReadWriteOnce" \
        --name devops-redis-pv --namespace=io-choerodon
    ```

- 部署认证服务所需Redis

    ```bash
    helm install paas/redis --name=framework-redis --namespace=io-choerodon \
        --set persistence.enabled=true \
        --set persistence.existingClaim=framework-redis-pvc
    ```
- 部署Devops服务所需Redis

    ```bash
    helm install paas/redis --name=devops-redis --namespace=io-choerodon \
        --set persistence.enabled=true \
        --set persistence.existingClaim=devops-redis-pvc
    ```

- 参数：

    参数 | 含义 
    --- |  --- 
    persistence.enabled|是否启用持久化存储
    persistence.existingClaim|PVC的名称
    persistence.subPath|设置将数据存储到的子目录