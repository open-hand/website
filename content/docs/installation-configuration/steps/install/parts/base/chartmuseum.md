+++
title = "Chartmuseum部署"
description = "Chartmuseum部署"
weight = 20
+++

# Chartmuseum部署

## 预备知识

如果你不知道Chartmuseum是做什么的，那么请参考下面链接（包括但不限于）进行学习：

- [Chartmuseum](https://github.com/helm/chartmuseum#chartmuseum)

## 添加choerodon chart仓库并同步

```bash
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

## 部署Chartmuseum

### 创建PVC

```bash
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
- 若需了解项目详情及各项参数含义，请移步 [helm/chartmuseum](https://github.com/helm/chartmuseum)。
- 注意替换 `chart.example.choerodon.io` 为您实际的域名
- 编写参数配置文件 `chartmuseum.yaml`
    ```yaml
    env:
      open:
        DEPTH: 2
        DISABLE_API: false
    ingress:
      enabled: true
      hosts: chart.example.choerodon.io
    persistence:
      enabled: true
      existingClaim: chartmuseum-pvc
    service:
      enabled: true
    ```
- 执行部署
    ```bash
    helm install c7n/chartmuseum \
      -f chartmuseum.yaml \
      --version 1.6.1 \
      --name chartmuseum \
      --namespace c7n-system
    ```

## 验证部署

- 访问设置的域名出现以下界面即部署成功

 ![chartmuseum](/docs/installation-configuration/image/chartmuseum.png)
