+++
title = "Zookeeper安装"
description = "Zookeeper安装"
weight = 40
+++

# Zookeeper安装

## 仓库设置

1. 本地添加远程仓库

    ```
    helm repo add paas http://openchart.choerodon.com.cn/choerodon/paas/
    ```
1. 更新本地仓库信息

    ```
    helm repo update 
    ```

## 安装Zookeeper

> **注意：**启用持久化存储请执行提前创建所指向的物理地址，PV和PVC可使用以下语句进行创建；**特别注意：** 创建建的PV数量应与zookeeper副本数量一致！可在安装命令中添加`--debug --dry-run`参数，进行渲染预览不进行安装。

- 创建zookeeper所需PV和PVC

    ```bash
    helm install paas/create-pv \
        --set type=nfs \
        --set pv.name=zookeeper-pv-00 \
        --set labels.app=zookeeper \
        --set nfs.path=/u01/nfs/exports/io-choerodon/zookeeper-00 \
        --set nfs.server=nfs.exmple.choerodon.io \
        --set pvc.enable=false \
        --set size=3Gi \
        --set "accessModes[0]=ReadWriteOnce" \
        --name zookeeper-pv-00 --namespace=io-choerodon
    helm install paas/create-pv \
        --set type=nfs \
        --set pv.name=zookeeper-pv-01 \
        --set labels.app=zookeeper \
        --set nfs.path=/u01/nfs/exports/io-choerodon/zookeeper-01 \
        --set nfs.server=nfs.exmple.choerodon.io \
        --set pvc.enable=false \
        --set size=3Gi \
        --set "accessModes[0]=ReadWriteOnce" \
        --name zookeeper-pv-01 --namespace=io-choerodon
    helm install paas/create-pv \
        --set type=nfs \
        --set pv.name=zookeeper-pv-02 \
        --set labels.app=zookeeper \
        --set nfs.path=/u01/nfs/exports/io-choerodon/zookeeper-02 \
        --set nfs.server=nfs.exmple.choerodon.io \
        --set pvc.enable=false \
        --set size=3Gi \
        --set "accessModes[0]=ReadWriteOnce" \
        --name zookeeper-pv-02 --namespace=io-choerodon
    ```

- 部署zookeeper

    ```bash
    helm install paas/zookeeper \
        --set replicaCount=3 \
        --set persistence.enabled=true \
        --set persistence.selector.app="zookeeper" \
        --name=zookeeper --namespace=io-choerodon
    ```

- 参数：

    参数 | 含义 
    --- |  --- 
    replicaCount|设置副本数量
    persistence.enabled|是否启用Zookeeper数据持久化
    persistence.selector|Zookeeper创建的pvc选pv的选择器值，为pv的label