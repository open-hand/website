+++
title = "监控部署"
description = "监控部署"
weight = 26
+++

## 前置要求与约定

监控作为独立的一部分，如果您选择安装，需要准备额外的资源：

- 内存: 8G及以上
- 磁盘: ssd或高速存储介质50G及以上
- CPU: 2核2线程及以上

安装要求：

- Kubernetes 1.10+ with Beta APIs
- Helm 2.12+ (If using Helm < 2.14, [see below for CRD workaround](#Helm-创建-crd-失败))

基于 [prometheus-operator](https://github.com/helm/charts/tree/master/stable/prometheus-operator)添加了的监控仪表盘。

## 部署监控组件

<blockquote class="note">
监控非平台运行的必要组件，安装监控组件可以查看集群各个服务cpu，内存和网络等状态，便于优化和提高资源利用率。
</blockquote>

### 添加choerodon chart仓库

```bash
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

### 创建存储卷（绑定SSD磁盘）

- 在有<span style="color: red">SSD磁盘</span>的主机上配置NFS Server
    - 假设SSD磁盘挂载到目录 `/ssd` 上
    - 编辑`/etc/exports`文件添加需要共享目录及参数

        ```
        /ssd 192.168.1.1/16(rw,sync,insecure,no_subtree_check,no_root_squash)
        ```

- 配置完成后，启动 NFS Server：

    ```
    sudo systemctl enable nfs-server
    sudo systemctl start nfs-server
    ```

- 在可执行helm命令的主机上，使用helm命令安装`ssd-nfs-client-provisioner`
{{< annotation shell "提供NFS服务的主机IP地址或域名" "NFS服务共享的目录">}}
helm upgrade --install ssd c7n/nfs-client-provisioner \
    --set rbac.create=true \
    --set persistence.enabled=true \
    --set storageClass.name=ssd \
    --set storageClass.provisioner=choerodon.io/ssd-nfs-client-provisioner \
    --set persistence.nfsServer=127.0.0.1 \(1)
    --set persistence.nfsPath=/ssd \(1)
    --version 0.1.1 \
    --create-namespace \
    --namespace monitoring
{{< /annotation >}}

<blockquote class="note">
更多详情可参考<a href="../../nfs" target="_blank">NFS动态存储卷</a>搭建
</blockquote>

### 安装监控组件

- 编写参数配置文件 `prometheus-operator-value.yaml`

    ```
    grafana:
      adminPassword: password
      ingress:
        enabled: true
        hosts:
        - grafana.example.choerodon.io
      persistence:
        enabled: true
        storageClassName: ssd

    prometheus:
      ingress:
        enabled: true
        hosts:
        - prometheus.example.choerodon.io
      prometheusSpec:
        storageSpec:
          volumeClaimTemplate:
            spec:
              storageClassName: ssd
    ```

- 安装监控

    ```bash
    helm upgrade --install prometheus-operator c7n/prometheus-operator \
        -f prometheus-operator-value.yaml \
        --version 9.3.0 \
        --create-namespace \
        --namespace monitoring
    ```

    下面列出 Prometheus Operator 常用可配置的参数以及默认值，其他配置参考[官方文档](https://github.com/helm/charts/tree/master/stable/prometheus-operator#configuration)

    | 参数 | 描述 | 默认值 |
    |------|------|-------|
    | `grafana.adminPassword` | 登录grafana UI的管理员密码 | "prom-operator" |
    | `grafana.defaultDashboardsEnabled` | 部署默认的 dashboards。这些使用 sidecar 加载的 | `true` |
    | `grafana.ingress.enabled` | 是否启用 Grafana 的 Ingress | `false` |
    | `grafana.ingress.hosts` | 设置 Grafana 的域名 | [] |
    | `grafana.persistence` | grafana 存储定义 | {} |
    | `grafana.grafana.ini` | Grafana的配置，需要配置`auth.generic_oauth`的 oauth2 认证 | {} |
    | `prometheus.ingress.enabled`| 如果是 `ture`，创建 Prometheus Ingress | false |
    | `prometheus.ingress.hosts` | Prometheus 域名 | [] |
    | `prometheus.serviceMonitor.relabelings` | 实例收集的 `relabel_configs`，需要修改 `cluster` 标签的replacement 为目标集群名 |  |
    | `prometheus.prometheusSpec.storageSpec` | storage Spec，用于指定如何使用存储 | {} |
    | `prometheus.prometheusSpec.additionalScrapeConfigs` | additionalScrapeConfigs 允许指定其他 Prometheus 收集配置。收集配置会追加到 Prometheus Operator 生成的配置中。配置必须符合 Prometheus [官方文档](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#scrape_config)中指定的格式。用户有责任确保它的有效性。 | {} |

- 查看监控

    在浏览器中输入配置的grafana地址即可，更多信息参见[此处](../../../../user-guide/report/)。

## 常见问题

#### Helm 创建 crd 失败

将 helm 升级到 2.14 + 可以避免这个问题——由于helm 的 bug，它可能无法正常安装 chart 里面的五个 CRDs，导致安装 chart 失败。如果使用的helm无法升级，你应该安装采取下面的步骤来解决这个问题：为了在解决这个问题必须保证在安装时这五个 CRDS 已经存在，并禁止创建它。

1. 创建 CRDs

    ```console
    kubectl apply -f https://raw.githubusercontent.com/coreos/prometheus-operator/master/example/prometheus-operator-crd/monitoring.coreos.com_alertmanagers.yaml
    kubectl apply -f https://raw.githubusercontent.com/coreos/prometheus-operator/master/example/prometheus-operator-crd/monitoring.coreos.com_prometheuses.yaml
    kubectl apply -f https://raw.githubusercontent.com/coreos/prometheus-operator/master/example/prometheus-operator-crd/monitoring.coreos.com_prometheusrules.yaml
    kubectl apply -f https://raw.githubusercontent.com/coreos/prometheus-operator/master/example/prometheus-operator-crd/monitoring.coreos.com_servicemonitors.yaml
    kubectl apply -f https://raw.githubusercontent.com/coreos/prometheus-operator/master/example/prometheus-operator-crd/monitoring.coreos.com_podmonitors.yaml
    ```

2. 等待 CRDs 创建完成，这可能需要一些时间。

3. 安装时禁用 CRDs 创建 `prometheusOperator.createCustomResource=false`

    ```console
    $ helm install --name my-release c7n/prometheus-operator --set prometheusOperator.createCustomResource=false --version 9.3.0
    ```
