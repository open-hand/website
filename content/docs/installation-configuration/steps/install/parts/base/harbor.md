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

```shell
helm install c7n/harbor \
    --set externalURL=https://registry.example.choerodon.io \
    --set ingress.hosts.core=registry.example.choerodon.io \
    --set database.internal.volumes.data.storageClass="nfs-provisioner" \
    --set registry.volumes.data.storageClass="nfs-provisioner" \
    --set redis.master.persistence.storageClass="nfs-provisioner" \
    --set harborAdminPassword=Harbor12345 \
    --version 0.3.2 \
    --name harbor \
    --namespace c7n-system
```

- 参数：

    参数 | 含义 
    --- |  --- 
    externalURL|Harbor域名
    ingress.hosts.core|不带协议的Harbor域名
    database.internal.volumes.data.storageClass|数据库的存储类名
    registry.volumes.data.storageClass|registry的存储类名
    redis.master.persistence.storageClass|redis的存储类名
    harborAdminPassword|管理员密码

## 验证部署

<blockquote class="note">
Harbor启动速度较慢请等待所有Pod都为Running后进行界面查看。
</blockquote>

- 访问设置的域名出现以下界面即部署成功

    ![](/docs/installation-configuration/image/harbor.png)

## 证书配置

### 有公网域名时使用[kube-lego](https://github.com/jetstack/kube-lego)申请证书

<blockquote class="note">
以下讲解为通过<a href="https://github.com/jetstack/kube-lego" target="_blank">kube-lego</a>创建证书，kube-lego会自动申请证书。通过本站Kubernetes部署教程部署的集群默认是安装kube-lego的。若集群中未安装kube-lego请忽略以下本节操作。
</blockquote>

- 检测是否安装有kube-lego:

    ```
    # 执行命令后有返回结果则说明已部署
    kubectl get deployment --all-namespaces | grep kube-lego
    ```

- 删除自签名证书secret

    ```
    kubectl delete secret -n c7n-system harbor-harbor-ingress
    ```

- 编辑harbor的ingress对象

    ```
    kubectl edit ingress -n c7n-system harbor-harbor-ingress
    ```

    - 为ingress添加注解`kubernetes.io/tls-acme: "true"`

        ```yaml
        metadata:
          annotations:
            kubernetes.io/tls-acme: "true"
        ```

- 编辑harbor-ui的deployment对象

    ```
    kubectl edit deployment -n c7n-system harbor-harbor-ui
    ```

    - 修改deployment中volumes属性的`ca-download`为`emptyDir: {}`

            volumes:
            - name: ca-download
              #secret:
              #  defaultMode: 420
              #  items:
              #  - key: ca.crt
              #    path: ca.crt
              #  secretName: harbor-harbor-ingress
              emptyDir: {}

### 没有公网域名时使用自签名证书

<blockquote class="warning">
没有公网域名是无法申请证书的，故只能配置本地Docker信任Harbor自签名证书，此方法需将会使用到该Harbor的主机都进行自签名证书信任配置。
</blockquote>

- 在任意一台master节点执行下面操作：

    {{< annotation shell "registry.example.choerodon.io为Harbor的域名，前面的目录不要更改" "c7n-system为Harbor部署的namespace，harbor-harbor-ingress为自签名证书的secret名称" "registry.example.choerodon.io为Harbor的域名，前面的目录不要更改；ca.crt为证书文件的名称，请勿修改" >}}
sudo mkdir -p /etc/docker/certs.d/registry.example.choerodon.io(1)

kubectl get secret \
    --namespace c7n-system harbor-harbor-ingress \(1)
    -o jsonpath="{.data.ca\.crt}" | base64 --decode | \
    sudo tee /etc/docker/certs.d/registry.example.choerodon.io/ca.crt(1)
{{< /annotation >}}

- 分发`ca.crt`证书文件

将得到的`ca.crt`证书文件拷贝至其他会使用到该Harbor的主机上（也放在`/etc/docker/certs.d/registry.example.choerodon.io`目录下即可）。

<blockquote class="warning">
如果使用自签名证书，在部署devops-service服务的时候需要跳过harbor证书安全校验，即部署的时候增加变量

```
--set env.open.SERVICES_HARBOR_INSECURESKIPTLSVERIFY="true"

```
</blockquote>