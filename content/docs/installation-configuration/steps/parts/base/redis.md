+++
title = "Redis部署"
description = "Redis部署"
weight = 30
+++

# Redis部署

## 仓库设置

1. 本地添加远程仓库

    ```
    helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
    ```
1. 更新本地仓库信息

    ```
    helm repo update 
    ```

## 部署Redis

<blockquote class="note">
启用持久化存储请执行提前创建所对应的物理目录，PV和PVC可使用以下语句进行创建；可在部署命令中添加--debug --dry-run参数，进行渲染预览不进行部署。
</blockquote>

### 创建PV和PVC

```shell
helm install c7n/create-pv \
    --set type=nfs \
    --set pv.name=devops-redis-pv \
    --set nfs.path=/u01/io-choerodon/devops-redis \
    --set nfs.server=nfs.example.choerodon.io \
    --set pvc.name=devops-redis-pvc \
    --set size=1Gi \
    --set accessModes={ReadWriteOnce} \
    --name devops-redis-pv --namespace=choerodon-devops-prod
```

### 部署Devops服务所需Redis

```shell
helm install c7n/redis --name=devops-redis --namespace=choerodon-devops-prod \
    --set persistence.enabled=true \
    --set persistence.existingClaim=devops-redis-pvc
```

- 参数：

    参数 | 含义 
    --- |  --- 
    persistence.enabled|是否启用持久化存储
    persistence.existingClaim|PVC的名称
    persistence.subPath|设置将数据存储到的子目录