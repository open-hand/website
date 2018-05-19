+++
title = "Chartmuseum安装"
description = "Chartmuseum安装"
weight = 20
+++

# Chartmuseum安装

## 仓库设置

1. 本地添加远程仓库

    ```
    helm repo add paas http://helm-charts.choerodon.io/paas/base/
    ```
1. 更新本地仓库信息

    ```
    helm repo update 
    ```

## 安装Chartmuseum

> **注意：** 启用持久化存储请执行提前创建PV和PVC，也可使用以下语句进行创建；由于choerodon-devops-service的储存必须与chartmuseum**存储路径相同**，在此我们一并创建。可在安装命令最后添加`--debug --dry-run`参数，进行渲染预览不进行安装。

- 创建PV

    ```
    helm install paas/create-pv \
      --set type=nfs \
      --set pv.name=chartmuseum-pv \
      --set nfs.path=/u01/nfs/exports/io-choerodon/chartmuseum \
      --set nfs.server=nfs.exmple.choerodon.io \
      --set pvc.name=chartmuseum-pvc \
      --set size=3Gi \
      --set "accessModes[0]=ReadWriteOnce" \
      --name chartmuseum-pv --namespace=io-choerodon

    helm install paas/create-pv \
      --set type=nfs \
      --set pv.name=devops-service-pv \
      --set nfs.path=/u01/nfs/exports/io-choerodon/chartmuseum \
      --set nfs.server=nfs.exmple.choerodon.io \
      --set pvc.name=devops-service-pvc \
      --set size=3Gi \
      --set "accessModes[0]=ReadWriteOnce" \
      --name devops-service-pv --namespace=io-choerodon
    ```
- 进行安装部署

    ```
    helm install paas/chartmuseum \
      --set persistence.enabled=true \
      --set persistence.existingClaim=chartmuseum-pvc \
      --set ingress.enabled=true \
      --set ingress.host=charts.exmple.choerodon.io \
      --set env.open.DISABLE_API=false \
      --set env.open.DEPTH=2 \
      --name chartmuseum --namespace=io-choerodon
    ```

- 参数解释：

    | 参数 | 含义
    | --- |  --- | 
    persistence.enabled|是否启用持久化存储
    persistence.existingClaim|PVC的名称
    ingress.enabled|是否启用ingress
    ingress.host|域名
    env.open.DISABLE_API|是否禁用API
    env.open.DEPTH|大于0则表示开启多租户，数值代表层级