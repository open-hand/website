+++
title = "Mysql部署"
description = "Mysql部署"
weight = 35
+++

# Mysql部署

## 预备知识

如果你不知道Mysql是做什么的，那么请参考下面链接（包括但不限于）进行学习：

- [Mysql](https://www.mysql.com/)

## 添加choerodon chart仓库并同步

```shell
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

## 部署Mysql

### 创建mysql所需PVC

```shell
helm install c7n/persistentvolumeclaim \
    --set accessModes={ReadWriteOnce} \
    --set requests.storage=2Gi \
    --set storageClassName=nfs-provisioner \
    --version 0.1.0 \
    --name c7n-mysql-pvc \
    --namespace c7n-system
```

### 部署mysql

- 编写配置文件`mysql.yaml`

    ```yaml
    config:
      character_set_server: utf8mb4
      collation_server: utf8mb4_general_ci
      lower_case_table_names: 1
      max_allowed_packet: 32M
      max_connections: 1500
    env:
      MYSQL_ROOT_PASSWORD: password
    persistence:
      enabled: true
      existingClaim: c7n-mysql-pvc
    service:
      enabled: ture
    ```

- 执行安装

    ```shell
    helm install c7n/mysql \
        -f mysql.yaml \
        --version 0.1.3 \
        --name c7n-mysql \
        --namespace c7n-system
    ```

- 参数：

    参数 | 含义
    --- |  ---
    persistence.enabled|是否启用持久化存储
    persistence.existingClaim|PVC的名称
    persistence.subPath|设置将数据存储到的子目录
    env.open.MYSQL_ROOT_PASSWORD|设置数据库root用户密码
    env.open.MYSQL_DATABASE|初始化创建的数据库名称
    env.open.MYSQL_USER|初始化创建的用户名
    env.open.MYSQL_PASSWORD|初始化创建的用户密码
