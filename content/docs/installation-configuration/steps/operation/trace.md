+++
title = "调用链部署"
description = "调用链部署"
weight = 28
+++

## 前置要求与约定

- 本文日志收集安装的是开源软件 `skywalking`， 若需了解项目详情及各项参数含义，请移步 [skywalking](https://skywalking.apache.org/)。

## 部署调用链

<blockquote class="note">
调用链平台非运行的必要组件。安装调用链，可以查看各个服务之间的调用关系。
</blockquote>

### 添加choerodon chart仓库

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

### 部署Mysql

#### 创建mysql所需PVC

```shell
helm upgrade --install skywalking-mysql-pvc c7n/persistentvolumeclaim \
    --set accessModes={ReadWriteOnce} \
    --set requests.storage=2Gi \
    --set storageClassName=ssd \
    --version 0.1.0 \
    --namespace logging
```

#### 部署mysql

- 编写配置文件`skywalking-mysql.yaml`

    ```yaml
    config:
      character_set_server: utf8mb4
      collation_server: utf8mb4_general_ci
      lower_case_table_names: 1
      max_allowed_packet: 32M
      max_connections: 1500
    env:
      MYSQL_DATABASE: skywalking
      MYSQL_ROOT_PASSWORD: password
    persistence:
      enabled: true
      existingClaim: skywalking-mysql-pvc
    service:
      enabled: ture
    ```

- 执行安装

    ```
    helm upgrade --install skywalking-mysql c7n/mysql \
        -f skywalking-mysql.yaml \
        --version 0.1.3 \
        --namespace logging
    ```


### 安装 skywalking

- 编写配置文件`skywalking.yaml`
  
    ```
    mysqlClient:
      env:
        MYSQL_DATABASE: skywalking
        MYSQL_HOST: skywalking-mysql
        MYSQL_PASS: password
        MYSQL_PORT: "3306"
        MYSQL_USER: root
    ui:
      ingress:
        enabled: true
        hosts:
        - skywalking.example.choerodon.io
        path: /
    ```

- 执行安装
    ```
    helm upgrade --install skywalking c7n/skywalking \
        -f skywalking.yaml \
        --version 6.6.0 \
        --namespace logging
    ```