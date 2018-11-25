+++
title = "Zookeeper部署"
description = "Zookeeper部署"
weight = 40
+++

# Zookeeper部署

## 预备知识

如果你不知道Zookeeper是做什么的，那么请参考下面链接（包括但不限于）进行学习：

- [Zookeeper](https://zookeeper.apache.org/)

## 添加choerodon chart仓库并同步

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

## 部署Zookeeper

```shell
helm install c7n/zookeeper \
    --set replicaCount=3 \
    --set service.enabled=true \
    --set persistence.enabled=true \
    --set persistence.storageClass="nfs-provisioner" \
    --version 0.1.0 \
    --name zookeeper \
    --namespace c7n-system
```

- 参数：

    参数 | 含义 
    --- |  --- 
    replicaCount|设置副本数量
    persistence.enabled|是否启用Zookeeper数据持久化
    persistence.storageClass|持久化存储类名

## 验证部署

- 执行以下命令，只要`DESIRED`与`CURRENT`数值相同则启动成功

    ```console
    $ kubectl get statefulset zookeeper -n c7n-system

    NAME          DESIRED   CURRENT   AGE
    zookeeper     3         3         1h
    ```