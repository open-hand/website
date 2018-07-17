+++
title = "Chartmuseum部署"
description = "Chartmuseum部署"
weight = 20
+++

# Chartmuseum部署

## 仓库设置

1. 本地添加远程仓库

    ```
    helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
    ```
1. 更新本地仓库信息

    ```
    helm repo update 
    ```

## 部署Chartmuseum

<blockquote class="note">
启用持久化存储请执行提前创建所对应的物理目录，PV和PVC可使用以下语句进行创建；可在部署命令中添加--debug --dry-run参数，进行渲染预览不进行部署。
</blockquote>

<blockquote class="warning">
由于choerodon-devops-service的储存必须与chartmuseum存储路径相同，在此我们一并创建。
</blockquote>

- 创建PV

    ```
    helm install c7n/create-pv \
      --set type=nfs \
      --set pv.name=chartmuseum-pv \
      --set nfs.path=/u01/io-choerodon/chartmuseum \
      --set nfs.server=nfs.example.choerodon.io \
      --set pvc.name=chartmuseum-pvc \
      --set size=3Gi \
      --set "accessModes[0]=ReadWriteOnce" \
      --name chartmuseum-pv --namespace=choerodon-devops-prod

    helm install c7n/create-pv \
      --set type=nfs \
      --set pv.name=devops-service-pv \
      --set nfs.path=/u01/io-choerodon/chartmuseum \
      --set nfs.server=nfs.example.choerodon.io \
      --set pvc.name=devops-service-pvc \
      --set size=3Gi \
      --set "accessModes[0]=ReadWriteOnce" \
      --name devops-service-pv --namespace=choerodon-devops-prod
    ```
- 进行部署部署

    ```
    helm install c7n/chartmuseum \
      --set persistence.enabled=true \
      --set persistence.existingClaim=chartmuseum-pvc \
      --set ingress.enabled=true \
      --set ingress.host=charts.example.choerodon.io \
      --set env.open.DISABLE_API=false \
      --set env.open.DEPTH=2 \
      --name chartmuseum --namespace=choerodon-devops-prod
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

## 验证部署

- 访问设置的域名出现以下界面即部署成功

    ![](/docs/installation-configuration/image/chartmuseum.png)