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

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

### 创建redis所需PVC

```shell
helm install c7n/persistentvolumeclaim \
    --set accessModes={ReadWriteOnce} \
    --set requests.storage=256Mi \
    --set storageClassName=nfs-provisioner \
    --version 0.1.0 \
    --name c7n-redis-pvc \
    --namespace c7n-system
```

## 部署Redis

```shell
helm install c7n/redis \
    --set persistence.enabled=true \
    --set persistence.existingClaim=c7n-redis-pvc \
    --set service.enabled=true \
    --version 0.2.0 \
    --name c7n-redis \
    --namespace c7n-system
```

- 参数：

    参数 | 含义
    --- |  ---
    service.enabled|是否启用service
