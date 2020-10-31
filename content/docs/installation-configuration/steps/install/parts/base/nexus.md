+++
title ="Nexus部署"
description ="Nexus部署"
weight = 65
+++

# Nexus 部署

## 预备知识

如果你不知道Nexus是做什么的，那么请参考下面链接（包括但不限于）进行学习：

- [Nexus](https://www.sonatype.com/nexus/repository-pro)

## 仓库设置

## 添加choerodon chart仓库并同步

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```
## 部署 Nexus

- 创建参数配置文件 `sonatype-nexus.yaml`

    ```yaml
    ingress:
      enabled: true
      tls:
        enabled: false
    initAdminPassword:
      enabled: true
      password: admin123
    nexusProxy:
      enabled: false
      env:
        nexusHttpHost: nexus.example.choerodon.io
    persistence:
      storageClass: nfs-provisioner
    ```

- 执行安装

    ```bash
    helm upgrade --install sonatype-nexus c7n/sonatype-nexus \
        -f sonatype-nexus.yaml \
        --create-namespace \
        --version 3.4.0 \
        --namespace c7n-system
    ```

## 验证部署

<blockquote class="note">
Nexus启动速度较慢请等待所有Pod都为Running后进行界面查看。
</blockquote>

- 访问设置的域名出现以下界面即部署成功

    ![](/docs/installation-configuration/image/nexus.png)
