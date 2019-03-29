+++
title = "Minio部署"
description = "Minio部署"
weight = 25
+++

# minio部署

## 预备知识

如果你不知道Minio是做什么的，那么请参考下面链接（包括但不限于）进行学习：

- [Minio](https://github.com/minio/minio#minio-quickstart-guide)

## 添加choerodon chart仓库并同步

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

## 部署Minio

### 创建minio所需PVC

```shell
helm install c7n/persistentvolumeclaim \
    --set accessModes={ReadWriteOnce} \
    --set requests.storage=5Gi \
    --set storageClassName=nfs-provisioner \
    --version 0.1.0 \
    --name minio-pvc \
    --namespace c7n-system
```

### 部署

```shell
helm install c7n/minio \
    --set service.enabled=true \
    --set persistence.enabled=true \
    --set persistence.existingClaim=minio-pvc \
    --set env.open.MINIO_ACCESS_KEY=admin \
    --set env.open.MINIO_SECRET_KEY=password \
    --set ingress.enabled=true \
    --set ingress.hosts=minio.example.choerodon.io \
    --set image.tag=RELEASE.2019-03-27T22-35-21Z
    --version 0.1.0 \
    --name minio \
    --namespace c7n-system
```

- 参数：

    参数 | 含义 
    --- |  --- 
    persistence.enabled|是否启用持久化存储
    persistence.existingClaim|PVC的名称
    ingress.enabled|是否启用ingress
    ingress.hosts|域名
    env.open.MINIO_ACCESS_KEY|用户名
    env.open.MINIO_SECRET_KEY|密码

## 验证部署

- 访问设置的域名出现以下界面即部署成功

    ![](/docs/installation-configuration/image/minio.png)