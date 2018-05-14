+++
title = "Harbor安装"
description = "Harbor安装"
date = 2018-03-30T13:06:38+08:00
draft = false
weight = 1
+++

# Harbor安装

### 添加远程仓库

```
helm repo add paas http://helm-charts.staging.saas.hand-china.com/paas/base/
```

### 更新仓库信息

```
helm repo update 
```

### 安装Harbor

- 执行以下命名进行安装。

  > **注意：**启用持久化存储请执行提前创建PV和PVC,可在安装命令中添加`--debug --dry-run`参数，进行渲染预览不进行安装。

  ```
  helm install paas/harbor --name=harbor --namespace=harbor \
        --set externalDomain=harbor.alpha.saas.hand-china.com \
        --set persistence.enabled=true \
        --set adminserver.volumes.config.selector.pv="adminserver" \
        --set mysql.volumes.config.selector.pv="mysql" \
        --set registry.volumes.config.selector.pv="registry" \
        --set postgresql.persistence.enabled=true \
        --set postgresql.persistence.existingClaim=postgresql \
        --set notary.volumes.config.selector.pv="notary" --debug --dry-run
  ```

- 参数：
    - `externalDomain` Harbor域名
    - `persistence.enabled` 是否起启用数据持久化
    - `adminserver.volumes.config.selector` adminserver创建的pvc选pv的选择器值，为pv的label
    - `mysql.volumes.config.selector` mysql创建的pvc选pv的选择器值，为pv的label
    - `registry.volumes.config.selector` registry创建的pvc选pv的选择器值，为pv的label
    - `postgresql.persistence.enabled` 是否启用postgresql数据持久化
    - `postgresql.persistence.existingClaim` postgresql将要绑定的pvc的name
    - `notary.volumes.config.selector` notary创建的pvc选pv的选择器值，为pv的label