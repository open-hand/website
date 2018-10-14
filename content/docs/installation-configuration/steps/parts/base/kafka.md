+++
title = "Kafka部署"
description = "Kafka部署"
weight = 45
+++

# Kafka部署

## 仓库设置

## 添加choerodon chart仓库并同步

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

## 部署Kafka

```shell
helm install c7n/kafka \
    --set replicaCount=3 \
    --set service.enabled=true \
    --set persistence.enabled=true \
    --set persistence.storageClass="nfs-provisioner" \
    --set zookeeperConnect="zookeeper-0.zookeeper-headless.c7n-system.svc.cluster.local:2181\,zookeeper-1.zookeeper-headless.c7n-system.svc.cluster.local:2181\,zookeeper-2.zookeeper-headless.c7n-system.svc.cluster.local:2181" \
    --version 0.1.0 \
    --name kafka \
    --namespace c7n-system
```

- 参数：

    参数 | 含义 
    --- |  --- 
    replicaCount|设置副本数量
    service.enabled|是否启用service
    persistence.enabled|是否启用Kafka数据持久化
    persistence.enabled|是否使用持久化存储
    persistence.storageClass|持久化存储类名
    zookeeperConnect|访问zookeeper的链接地址

## 验证部署

- 执行以下命令，只要`DESIRED`与`CURRENT`数值相同则启动成功

    ```console
    $ kubectl get statefulset kafka -n c7n-system

    NAME      DESIRED   CURRENT   AGE
    kafka     3         3         1h
    ```