+++
title = "Harbor部署"
description = "Harbor部署"
weight = 50
+++

# Harbor部署

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
    --version 0.3.0 \
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

## 启用HTTPS

### 使用[kube-lego](https://github.com/jetstack/kube-lego)申请证书

<blockquote class="note">
以下讲解为通过<a href="https://github.com/jetstack/kube-lego" target="_blank">kube-lego</a>创建证书，kube-lego会自动申请证书。通过本站Kubernetes部署教程部署的集群默认是安装kube-lego的。若集群中未安装kube-lego请忽略以下本节操作。
</blockquote>

- 检测是否安装有kube-lego:

    ```
    # 执行命令后有返回结果则说明已部署
    kubectl get deployment --all-namespaces | grep kube-lego
    ```

- 编辑harbor的ingress对象

    ```
    kubectl edit ingress -n c7n-system harbor-harbor-ingress
    ```

    - 为ingress添加注解`kubernetes.io/tls-acme: "true"`

        ```
        metadata:
          annotations:
            kubernetes.io/tls-acme: "true"
        ```

### 手动申请证书

  <blockquote class="note">
  使用certbot生成证书需要注意几点:
  <ul>
  <li>1.将域名解析到需要执行生成证书命令的机器上</li>
  <li>2.确保该机器上的80和443端口不能被占用</li>
  <li>3.该机器上已装有docker环境</li>
  </ul>
  </blockquote>

- 第一步：通过certbot生成证书(此方法每次只有3个月有效时间)
    - 执行以下命令，注意更换域名地址，过程中提示输入邮箱，完成之后证书在/etc/letsencrypt目录下

        ```
        docker run --rm -ti \
            --network host \
            -v /etc/letsencrypt:/etc/letsencrypt \
            -v /var/lib/letsencrypt:/var/lib/letsencrypt \
            certbot/certbot:v0.19.0 \
            certonly --standalone \
            -d registry.example.choerodon.io
        ```

- 第二步：创建secret并修改ingress

    - 进入到证书目录下执行以下命令创建secret

        ```
        # 参数 --key 后指定证书私钥的路径
        # 参数 --cert 后指定证书的路径
        kubectl create secret tls harbor-cert --key privkey.pem --cert fullchain.pem -n harbor
        ```

    - 修改ingress配置，添加secretName属性值:

            kubectl edit ingress -n c7n-system harbor-harbor-ingress

    - 为ingress添加添加`spec.tls`属性及其值

            spec:
              tls:
              - hosts:
                - registry.example.choerodon.io
                secretName: harbor-cert