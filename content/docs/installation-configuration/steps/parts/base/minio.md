+++
title = "Minio部署"
description = "Minio部署"
weight = 25
+++

# minio部署

## 仓库设置

1. 本地添加远程仓库

    ```
    helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
    ```
1. 更新本地仓库信息

    ```
    helm repo update 
    ```

## 部署Minio

<blockquote class="note">
启用持久化存储请执行提前创建所对应的物理目录，PV和PVC可使用以下语句进行创建；可在部署命令中添加--debug --dry-run参数，进行渲染预览不进行部署。
</blockquote>

### 创建minio所需PV和PVC

```shell
helm install c7n/create-pv \
    --set type=nfs \
    --set pv.name=minio-pv \
    --set nfs.path=/u01/io-choerodon/minio \
    --set nfs.server=nfs.example.choerodon.io \
    --set pvc.name=minio-pvc \
    --set size=3Gi \
    --set "accessModes[0]=ReadWriteOnce" \
    --name minio-pv --namespace=choerodon-devops-prod
```

### 进行部署

```shell
helm install c7n/minio \
    --set persistence.enabled=true \
    --set persistence.existingClaim=minio-pvc \
    --set env.open.MINIO_ACCESS_KEY=admin \
    --set env.open.MINIO_SECRET_KEY=password \
    --set ingress.enabled=true \
    --set "ingress.hosts[0]"="minio.example.choerodon.io" \
    --name=minio --namespace=choerodon-devops-prod
```

- 参数：

    参数 | 含义 
    --- |  --- 
    persistence.enabled|是否启用持久化存储
    persistence.existingClaim|PVC的名称
    ingress.enabled|是否启用ingress
    ingress.hosts[0]|域名
    env.open.MINIO_ACCESS_KEY|用户名
    env.open.MINIO_SECRET_KEY|密码

## 验证部署

- 访问设置的域名出现以下界面即部署成功

    ![](/docs/installation-configuration/image/minio.png)