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

## 部署Redis

```shell
helm upgrade --install c7n-redis c7n/redis \
    --set persistence.enabled=true \
    --set persistence.storageClass=nfs-provisioner \
    --set service.enabled=true \
    --create-namespace \
    --version 0.2.5 \
    --namespace c7n-system
```
