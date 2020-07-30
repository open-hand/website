+++
title = "Harbor部署"
description = "Harbor部署"
weight = 50
+++

# Harbor部署

## 预备知识

如果你不知道Harbor是做什么的，那么请参考下面链接（包括但不限于）进行学习：

- [Harbor](https://github.com/goharbor/harbor#harbor)

## 仓库设置

## 添加choerodon chart仓库并同步

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

## 部署Harbor

- 若需了解项目详情及各项参数含义，请移步 [Harbor Chart](https://github.com/goharbor/harbor-helm/tree/7dfc2a629a58e61c0d0a03f1d3b5ae29a7d720be#helm-chart-for-harbor)
- 编写参数配置文件 `harbor.yaml`

    ```yaml
    expose:
      ingress:
        hosts:
          core: registry.example.choerodon.io
    externalURL: https://registry.example.choerodon.io
    persistence:
      persistentVolumeClaim:
        registry:
          storageClass: nfs-provisioner
        jobservice:
          storageClass: nfs-provisioner
        database:
          storageClass: nfs-provisioner
        redis:
          storageClass: nfs-provisioner
    chartmuseum:
      enabled: false
    clair:
      enabled: false
    notary:
      enabled: false
    harborAdminPassword: Harbor12345
    ```

- 执行安装

  ```shell
  helm upgrade --install harbor c7n/harbor \
    -f harbor.yaml \
    ----create-namespace \
    --version 1.2.3 \
    --namespace c7n-system
  ```

## 验证部署

<blockquote class="note">
Harbor启动速度较慢请等待所有Pod都为Running后进行界面查看。
</blockquote>

- 访问设置的域名出现以下界面即部署成功

    ![](/docs/installation-configuration/image/harbor.png)

## 证书配置

### 有公网域名

请到域名服务商处获取对应域名nginx类型证书后执行以下操作：

- 删除自签名证书secret

    ```
    kubectl delete secret -n c7n-system harbor-harbor-ingress
    ```

- 创建域名证书secret，请注意替换命令中`${KEY_FILE} `、`${CERT_FILE}`为文件访问路径

    ```
    kubectl create secret tls harbor-harbor-ingress -n c7n-system --key ${KEY_FILE} --cert ${CERT_FILE}
    ```

- 编辑 harbor-core 的 deployment 对象

    ```
    kubectl edit deployment -n c7n-system harbor-harbor-core
    ```

- **删除**下面注释的内容

    ```
    ......
    volumeMounts:
    # - mountPath: /etc/core/ca
    #   name: ca-download
    ......
    volumes:
    # - name: ca-download
    #   secret:
    #     defaultMode: 420
    #     secretName: harbor-harbor-ingress
    ......
    ```

### 没有公网域名时使用自签名证书

<blockquote class="warning">
没有公网域名是无法申请证书的，故只能配置本地Docker信任Harbor自签名证书，此方法需将会使用到该Harbor的主机都进行自签名证书信任配置。
</blockquote>

- 访问 Harbor ，进入 `配置管理` -> `系统设置` -> `镜像库根证书`，点击 `下载` 下载ca证书

    ![](/docs/installation-configuration/image/get-harbor-cert.png)

- 分发`ca.crt`证书文件

  - 将得到的`ca.crt`证书文件拷贝至其他会使用到该Harbor的主机上
  - 证书放置于`/etc/docker/certs.d/<Harbor域名>`目录下（eg. 若Harbor域名为registry.example.choerodon.io，则将`ca.crt`证书文件放于`/etc/docker/certs.d/registry.example.choerodon.io`目录下即可）

<!-- 
### NodePort 模式安装

- 在所有会用到 Harbor 的主机上编辑`/etc/docker/daemon.json`文件，添加如下内容：

    ```json
    {
      ...
      "insecure-registries":["192.168.xx.xx:30003"]
    }
    ```

- 重启docker 服务

    ```
    # systemctl daemon-reload
    # systemctl restart docker
    ``` 
-->
