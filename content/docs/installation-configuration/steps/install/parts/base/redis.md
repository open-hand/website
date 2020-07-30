+++
title = "Redis部署"
description = "Redis部署"
weight = 30
+++

# Redis部署

## 预备知识

如果你不知道Redis是做什么的，那么请参考下面链接（包括但不限于）进行学习：

- [Redis](https://redis.io/)

## 仓库设置

## 添加choerodon chart仓库并同步

```shell
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

### 创建redis所需PVC

```shell
helm upgrade --install c7n-redis-pvc c7n/persistentvolumeclaim \
    --set accessModes={ReadWriteOnce} \
    --set requests.storage=256Mi \
    --set storageClassName=nfs-provisioner \
    --create-namespace \
    --version 0.1.0 \
    --namespace c7n-system
```

## 部署Redis

```shell
helm upgrade --install c7n-redis c7n/redis \
    --set persistence.enabled=true \
    --set persistence.existingClaim=c7n-redis-pvc \
    --set service.enabled=true \
    --create-namespace \
    --version 0.2.4 \
    --namespace c7n-system
```
