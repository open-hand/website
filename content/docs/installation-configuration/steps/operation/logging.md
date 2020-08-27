+++
title = "日志部署"
description = "日志部署"
weight = 27
+++

## 前置要求与约定

- 本文日志收集安装的是开源软件 `grafana/loki`， 若需了解项目详情及各项参数含义，请移步 [grafana/loki](https://github.com/grafana/loki)。

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

- 创建命名空间
 
    ```
    kubectl create namespace logging
    ```

- 编写参数配置文件 `loki.yaml`

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

- 安装 loki

    ```bash
    helm upgrade --install loki c7n/loki \
        -f loki.yaml \
        --version 0.29.0 \
        --create-namespace \
        --namespace=logging
    ```

- 编写参数配置文件 `promtail.yaml`

        loki:
          serviceName: loki
        volumeMounts:
        - mountPath: /var/lib/docker/containers
          name: docker
          readOnly: true
        - mountPath: /var/log/pods
          name: pods
          readOnly: true
        volumes:
        - hostPath:
            path: /var/lib/docker/containers
          name: docker
        - hostPath:
            path: /var/log/pods
          name: pods

- 安装 promtail

    ```bash
    helm upgrade --install promtail c7n/promtail \
        -f promtail.yaml \
        --version 0.23.0 \
        --create-namespace \
        --namespace=logging
    ```

## 使用

1. 访问搭建监控时部署的 Grafana。 如果这是您第一次登录 Grafana，默认情况下用户名为 `admin`，密码为 `password`。
2. 在 Grafana 中，通过左侧栏中的齿轮图标点击 `Configuration` > `Data Sources`。
3. 点击 <kbd>+ Add data source</kbd> 按钮.
4. 从列表中选择 Loki。
5. `HTTP` > `URL` 字段应该是您的 Loki 服务器的地址。本例中地址为 `http://loki.logging:3100`。
6. 要查看日志，请单击侧栏上的 <kbd>Explore</kbd> ，在左上角的下拉列表中选择 Loki 数据源，然后使用 <kbd>Log labels</kbd> 按钮选择日志流。