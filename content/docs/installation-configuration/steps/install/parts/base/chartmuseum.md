+++
title = "Chartmuseum部署"
description = "Chartmuseum部署"
weight = 20
+++

# Chartmuseum部署

## 添加choerodon chart仓库并同步

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

## 部署Chartmuseum

### 创建PVC

```shell
helm install c7n/persistentvolumeclaim \
    --set requests.storage=256Mi \
    --set accessModes={ReadWriteMany} \
    --set storageClassName=nfs-provisioner \
    --version 0.1.0 \
    --name chartmuseum-pvc \
    --namespace c7n-system
```

- 参数解释：

    | 参数 | 含义
    | --- |  --- | 
    requests.storage|请求存储空间大小
    accessModes|访问模式
    storageClassName|存储类名称

### 进行部署

```shell
helm install c7n/chartmuseum \
    --set service.enabled=true \
    --set persistence.enabled=true \
    --set persistence.existingClaim=chartmuseum-pvc \
    --set ingress.enabled=true \
    --set ingress.hosts=chart.example.choerodon.io \
    --set env.open.DISABLE_API=false \
    --set env.open.DEPTH=2 \
    --version 1.6.1 \
    --name chartmuseum \
    --namespace c7n-system
```

- 参数解释：

    | 参数 | 含义
    | --- |  --- | 
    service.enabled|是否启用service
    persistence.enabled|是否启用持久化存储
    persistence.existingClaim|PVC的名称
    ingress.enabled|是否启用ingress
    ingress.host|域名
    env.open.DISABLE_API|是否禁用API
    env.open.DEPTH|大于0则表示开启多租户，数值代表层级

## 验证部署

- 访问设置的域名出现以下界面即部署成功

    ![](/docs/installation-configuration/image/chartmuseum.png)