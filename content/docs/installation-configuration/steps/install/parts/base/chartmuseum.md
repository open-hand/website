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

- 若需了解项目详情及各项参数含义，请移步 [helm/chartmuseum](https://github.com/helm/chartmuseum)。
- 编写参数配置文件 `chartmuseum.yaml`

    <details open><summary>域名模式安装</summary>

    ```yaml
    env:
      open:
        STORAGE: local
        DISABLE_API: false
        DEPTH: 2
    persistence:
      enabled: true
      storageClass: nfs-provisioner
    ingress:
      enabled: true
      hosts:
        - name: chart.example.choerodon.io
          path: /
    ```

    </details>

    <details><summary>nodePort模式安装</summary>

    ```yaml
    env:
      open:
        STORAGE: local
        DISABLE_API: false
        DEPTH: 2
    persistence:
      enabled: true
      storageClass: nfs-provisioner
    service:
      type: NodePort
      nodePort: 30001
    ```

    </details>

- 执行部署
  
    ```shell
    helm install c7n/chartmuseum \
        -f chartmuseum.yaml \
        --version 2.6.0 \
        --name chartmuseum \
        --namespace c7n-system
    ```

## 验证部署

- 访问设置的域名出现以下界面即部署成功

 ![chartmuseum](/docs/installation-configuration/image/chartmuseum.png)