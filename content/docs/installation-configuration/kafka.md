+++
title = "Kafka安装"
description = "Kafka安装"
date = 2018-03-30T13:06:38+08:00
draft = false
weight = 1
+++

# Kafka安装

### 添加远程仓库

```
helm repo add paas http://helm-charts.staging.saas.hand-china.com/paas/base/
```

### 更新仓库信息

```
helm repo update 
```

### 安装Kafka

- 执行以下命名进行安装。

  > **注意：**启用持久化存储请执行提前创建PV和PVC,可在安装命令中添加`--debug --dry-run`参数，进行渲染预览不进行安装。

  ```
  helm install paas/kafka --name=kafka --namespace=db \
        --set replicaCount=3 \
        --set persistence.enabled=true \
        --set persistence.selector.pv="kafka" \
        --set zookeeperConnect="zookeeper-0.zookeeper-headless.zookeeper.svc.cluster.local:2181" \
  ```

- 参数：
    - `replicaCount` 设置副本数量
    - `persistence.enabled` 是否启用Kafka数据持久化
    - `persistence.selector` Kafka创建的pvc选pv的选择器值，为pv的label
    - `zookeeperConnect` 访问zookeeper的链接地址