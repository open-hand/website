+++
title = "Kafka安装"
description = "Kafka安装"
weight = 45
+++

# Kafka安装

## 仓库设置

1. 本地添加远程仓库

    ```
    helm repo add paas http://helm-charts.staging.saas.hand-china.com/paas/base/
    ```
1. 更新本地仓库信息

    ```
    helm repo update 
    ```

## 安装Kafka

> **注意：**启用持久化存储请执行提前创建所指向的物理地址，PV和PVC可使用以下语句进行创建；**特别注意：** 创建建的PV数量应与kafka副本数量一致！可在安装命令中添加`--debug --dry-run`参数，进行渲染预览不进行安装。

- 创建kafka所需PV和PVC

    ```bash
    helm install paas/create-pv \
        --set type=nfs \
        --set pv.name=kafka-pv-00 \
        --set labels.app=kafka \
        --set nfs.path=/u01/nfs/exports/io-choerodon/kafka-00 \
        --set nfs.server=nfs.exmple.choerodon.io \
        --set pvc.enable=false \
        --set size=3Gi \
        --set "accessModes[0]=ReadWriteOnce" \
        --name kafka-pv-00 --namespace=io-choerodon
    helm install paas/create-pv \
        --set type=nfs \
        --set pv.name=kafka-pv-01 \
        --set labels.app=kafka \
        --set nfs.path=/u01/nfs/exports/io-choerodon/kafka-01 \
        --set nfs.server=nfs.exmple.choerodon.io \
        --set pvc.enable=false \
        --set size=3Gi \
        --set "accessModes[0]=ReadWriteOnce" \
        --name kafka-pv-01 --namespace=io-choerodon
    helm install paas/create-pv \
        --set type=nfs \
        --set pv.name=kafka-pv-02 \
        --set labels.app=kafka \
        --set nfs.path=/u01/nfs/exports/io-choerodon/kafka-02 \
        --set nfs.server=nfs.exmple.choerodon.io \
        --set pvc.enable=false \
        --set size=3Gi \
        --set "accessModes[0]=ReadWriteOnce" \
        --name kafka-pv-02 --namespace=io-choerodon
    ```


- 部署kafka

    ```bash
    helm install paas/kafka \
        --set replicaCount=3 \
        --set persistence.enabled=true \
        --set persistence.selector.app="kafka" \
        --set zookeeperConnect="zookeeper-0.zookeeper-headless.io-choerodon.svc.cluster.local:2181\,zookeeper-1.zookeeper-headless.io-choerodon.svc.cluster.local:2181\,zookeeper-2.zookeeper-headless.io-choerodon.svc.cluster.local:2181" \
        --name=kafka --namespace=io-choerodon 
    ```

- 参数：

    参数 | 含义 
    --- |  --- 
    replicaCount|设置副本数量
    persistence.enabled|是否启用Kafka数据持久化
    persistence.selector|Kafka创建的pvc选pv的选择器值，为pv的label
    zookeeperConnect|访问zookeeper的链接地址