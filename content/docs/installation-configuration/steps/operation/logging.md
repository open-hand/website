+++
title = "日志部署"
description = "日志部署"
weight = 27
+++

## 前置要求与约定

日志作为独立的一部分，如果您选择安装，需要准备额外的资源：

- 内存: 12G及以上(3个节点每个节点空闲4G以上)
- 磁盘: ssd或高速存储介质50G及以上(根据实际情况增加磁盘)
- CPU: 4核4线程及以上

## 部署日志组件

<blockquote class="note">
日志非平台运行的必要组件，但如果需要安装调用链则需要安装。安装日志组件，可以统一查看日志和搜索日志。
</blockquote>

### 添加choerodon chart仓库

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

### 安装日志组件

- 编写参数配置文件 `loki.yaml`

    ```yaml
    config:
      schema_config:
        configs:
        - from: 2020-05-15
          store: boltdb
          object_store: filesystem
          schema: v11
          index:
            prefix: index_
            # 7天
            period: 168h
      chunk_store_config:
        # 需小于等于日志保留天数
        max_look_back_period: 504h
      table_manager:
        retention_deletes_enabled: true
        # 日志保留 21 天，需是 index.period 的倍数
        retention_period: 504h
    
    persistence:
      enabled: true
      accessModes:
      - ReadWriteOnce
      size: 10Gi
      storageClassName: ssd
    ```

- 安装 loki

    ```bash
    helm install c7n/loki \
        -f loki.yaml \
        --name=loki \
        --version 0.29.0 \
        --namespace=logging
    ```

- 编写参数配置文件 `promtail.yaml`

    ```yaml
    loki:
      serviceName: loki
    volumeMounts:
    - name: docker
      mountPath: /var/lib/docker/containers
      readOnly: true
    - name: pods
      mountPath: /var/log/pods
      readOnly: true
    ```

- 安装 promtail

    ```bash
    helm install c7n/promtail \
        -f promtail.yaml \
        --name=promtail \
        --version 0.23.0 \
        --namespace=logging
    ```

## 使用

1. 访问搭建监控时部署的 Grafana。 如果这是您第一次登录 Grafana，默认情况下用户名为 `admin`，密码为 `password`。
2. In Grafana, go to `Configuration` > `Data Sources` via the cog icon on the
   left sidebar.
3. 在 Grafana 中，通过左侧栏中的齿轮图标点击 `Configuration` > `Data Sources`。
4. 点击 <kbd>+ Add data source</kbd> 按钮.
5. 从列表中选择 Loki。
6. `HTTP` > `URL` 字段应该是您的 Loki 服务器的地址。本例中地址为 `http://loki.logging:3100`。
7. 要查看日志，请单击侧栏上的 <kbd>Explore</kbd> ，在左上角的下拉列表中选择 Loki 数据源，然后使用 <kbd>Log labels</kbd> 按钮选择日志流。