+++
title = "调用链部署"
description = "调用链部署"
weight = 26
+++

## 前置要求与约定

调用链作为独立的一部分，你可以选择安装或者不安装，如果选择安装需要安装Elasticseach数据库。如何安装请参考[此处](../logging),
Choerodon从0.12版本开始支持Skywalking，如果您使用之前的版本请安装zipkin。

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
helm install c7n/persistentvolumeclaim \
    --set accessModes={ReadWriteOnce} \
    --set requests.storage=2Gi \
    --set storageClassName=nfs-provisioner \
    --version 0.1.0 \
    --name skywalking-mysql-pvc \
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
  helm install c7n/mysql \
      -f skywalking-mysql.yaml \
      --version 0.1.3 \
      --name skywalking-mysql \
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
    helm install c7n/skywalking \
        -f skywalking.yaml \
        --version 6.6.0 \
        --name skywalking \
        --namespace logging
    ```