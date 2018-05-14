+++
title = "Redis安装"
description = "Redis安装"
date = 2018-03-30T13:06:38+08:00
draft = false
weight = 1
+++

# Redis安装

### 添加远程仓库

```
helm repo add paas http://helm-charts.staging.saas.hand-china.com/paas/base/
```

### 更新仓库信息

```
helm repo update 
```

### 安装Redis

- 执行以下命名进行安装。

  > **注意：**启用持久化存储请执行提前创建PV和PVC,可在安装命令中添加`--debug --dry-run`参数，进行渲染预览不进行安装。

  ```
  helm install paas/redis --name=redis --namespace=db \
        --set persistence.enabled=true \
        --set persistence.existingClaim=redis
  ```

- 参数：
    - `persistence.enabled` 是否启用Redis数据持久化
    - `persistence.existingClaim` Redis将要绑定的pvc的name
    - `persistence.subPath` 设置将数据存储到的子目录