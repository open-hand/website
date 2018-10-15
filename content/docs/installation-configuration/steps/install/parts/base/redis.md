+++
title = "Redis部署"
description = "Redis部署"
weight = 30
+++

# Redis部署

## 仓库设置
## 添加choerodon chart仓库并同步

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

## 部署Redis

```shell
helm install c7n/redis \
    --set service.enabled=true \
    --version 0.1.0 \
    --name c7n-redis \
    --namespace c7n-system
```

- 参数：

    参数 | 含义 
    --- |  --- 
    service.enabled|是否启用service