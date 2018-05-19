+++
title = "Harbor安装"
description = "Harbor安装"
weight = 55
+++

# Harbor安装

## 仓库设置

1. 本地添加远程仓库

    ```
    helm repo add paas http://helm-charts.choerodon.io/paas/base/
    ```
1. 更新本地仓库信息

    ```
    helm repo update 
    ```

## 安装Harbor

> **注意：**启用持久化存储请执行提前创建所指向的物理地址，PV和PVC可使用以下语句进行创建；可在安装命令中添加`--debug --dry-run`参数，进行渲染预览不进行安装。

- 创建harbor所需PV和PVC

    ```bash
    helm install paas/create-pv \
        --set type=nfs \
        --set pv.name=harbor-adminserver-pv \
        --set nfs.path=/u01/nfs/exports/io-choerodon/harbor-adminserver \
        --set nfs.server=nfs.exmple.choerodon.io \
        --set pvc.enable=false \
        --set size=3Gi \
        --set "accessModes[0]=ReadWriteOnce" \
        --name harbor-adminserver-pv --namespace=io-choerodon
        
    helm install paas/create-pv \
        --set type=nfs \
        --set pv.name=harbor-mysql-pv \
        --set nfs.path=/u01/nfs/exports/io-choerodon/harbor-mysql \
        --set nfs.server=nfs.exmple.choerodon.io \
        --set pvc.enable=false \
        --set size=3Gi \
        --set "accessModes[0]=ReadWriteOnce" \
        --name harbor-mysql-pv --namespace=io-choerodon
        
    helm install paas/create-pv \
        --set type=nfs \
        --set pv.name=harbor-registry-pv \
        --set nfs.path=/u01/nfs/exports/io-choerodon/harbor-registry \
        --set nfs.server=nfs.exmple.choerodon.io \
        --set pvc.enable=false \
        --set size=3Gi \
        --set "accessModes[0]=ReadWriteOnce" \
        --name harbor-registry-pv --namespace=io-choerodon

    helm install paas/create-pv \
        --set type=nfs \
        --set pv.name=harbor-notary-pv \
        --set nfs.path=/u01/nfs/exports/io-choerodon/harbor-notary \
        --set nfs.server=nfs.exmple.choerodon.io \
        --set pvc.enable=false \
        --set size=5Gi \
        --set "accessModes[0]=ReadWriteOnce" \
        --name harbor-notary-pv --namespace=io-choerodon

    helm install paas/create-pv \
        --set type=nfs \
        --set pv.name=harbor-postgresql-pv \
        --set nfs.path=/u01/nfs/exports/io-choerodon/harbor-postgresql \
        --set nfs.server=nfs.exmple.choerodon.io \
        --set pvc.name=harbor-postgresql-pvc \
        --set size=1Gi \
        --set "accessModes[0]=ReadWriteOnce" \
        --name harbor-postgresql-pv --namespace=io-choerodon
    ```

- 部署harbor

    ```bash
    helm install paas/harbor \
        --set persistence.enabled=true \
        --set externalDomain=harbor.my.domain \
        --set adminserver.adminPassword=Harbor12345 \
        --set adminserver.volumes.config.selector.pv="harbor-adminserver-pv" \
        --set mysql.volumes.config.selector.pv="harbor-mysql-pv" \
        --set registry.volumes.config.selector.pv="harbor-registry-pv" \
        --set notary.db.volumes.data.selector.pv="harbor-notary-pv" \
        --set postgresql.persistence.enabled=true \
        --set postgresql.persistence.existingClaim="harbor-postgresql-pvc" \
        --set insecureRegistry=true \
        --name=harbor --namespace=io-choerodon 
    ```

  <!-- ```
  helm install paas/harbor --name=harbor --namespace=harbor \
        --set externalDomain=harbor.alpha.exmple.choerodon.io \
        --set persistence.enabled=true \
        --set adminserver.volumes.config.selector.pv="adminserver" \
        --set mysql.volumes.config.selector.pv="mysql" \
        --set registry.volumes.config.selector.pv="registry" \
        --set postgresql.persistence.enabled=true \
        --set postgresql.persistence.existingClaim=postgresql \
        --set notary.volumes.config.selector.pv="notary"
  ``` -->

- 参数：

    参数 | 含义 
    --- |  --- 
    externalDomain|Harbor域名
    adminserver.adminPassword|admin用户密码
    persistence.enabled|是否起启用数据持久化
    adminserver.volumes.config.selector|adminserver创建的pvc选pv的选择器值，为pv的label
    mysql.volumes.config.selector|mysql创建的pvc选pv的选择器值，为pv的label
    registry.volumes.config.selector|registry创建的pvc选pv的选择器值，为pv的label
    postgresql.persistence.enabled|是否启用postgresql数据持久化
    postgresql.persistence.existingClaim|postgresql将要绑定的pvc的name
    notary.volumes.config.selector|notary创建的pvc选pv的选择器值，为pv的label
    clair.enabled|是否启用clair
    notary.enabled|是否启用notary