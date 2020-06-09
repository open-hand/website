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

```shell
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

## 部署Minio

- 若需了解项目详情及各项参数含义，请移步 [helm/charts/minio](https://github.com/helm/charts/tree/master/stable/minio#minio)。
- 编写参数配置文件 `minio.yaml`
  
    <details open><summary>域名模式安装</summary>

    ```yaml
    mode: distributed
    accessKey: "AKIAIOSFODNN7EXAMPLE"
    secretKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
    persistence:
      enabled: true
      storageClass: nfs-provisioner
    ingress:
      enabled: true
      path: /
      hosts:
      - minio.example.choerodon.io
    ```

    </details>

    <details><summary>nodePort模式安装</summary>

    ```yaml
    mode: distributed
    accessKey: "AKIAIOSFODNN7EXAMPLE"
    secretKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
    persistence:
      enabled: true
      storageClass: nfs-provisioner
    service:
      type: NodePort
      nodePort: 30006
    ```

    </details>
- 执行安装

    ```shell
    helm upgrade --install minio c7n/minio \
        -f minio.yaml \
        --version 5.0.4 \
        --namespace c7n-system
    ```

## 验证部署

- 访问设置的域名出现以下界面即部署成功

![minio](/docs/installation-configuration/image/minio.png)
