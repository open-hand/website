+++
title = "Mysql部署"
description = "Mysql部署"
weight = 35
+++

# Mysql部署

## 仓库设置

1. 本地添加远程仓库

    ```
    helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
    ```
1. 更新本地仓库信息

    ```
    helm repo update 
    ```

## 部署Mysql

<blockquote class="note">
启用持久化存储请执行提前创建所对应的物理目录，PV和PVC可使用以下语句进行创建；可在部署命令中添加--debug --dry-run参数，进行渲染预览不进行部署。
</blockquote>

### 创建mysql所需PV和PVC

```shell
helm install c7n/create-pv \
    --set type=nfs \
    --set pv.name=mysql-pv \
    --set nfs.path=/u01/io-choerodon/mysql \
    --set nfs.server=nfs.example.choerodon.io \
    --set pvc.name=mysql-pvc \
    --set size=3Gi \
    --set accessModes={ReadWriteOnce} \
    --name mysql-pv --namespace=choerodon-devops-prod
```

### 部署mysql

```shell
helm install c7n/mysql \
    --set persistence.enabled=true \
    --set persistence.existingClaim=mysql-pvc \
    --set env.open.MYSQL_ROOT_PASSWORD=password \
    --set service.port=3306 \
    --name=choerodon-mysql --namespace=choerodon-devops-prod
```

- 参数：

    参数 | 含义 
    --- |  --- 
    persistence.enabled|是否启用持久化存储
    persistence.existingClaim|PVC的名称
    persistence.subPath|设置将数据存储到的子目录
    service.port|设置service端口号
    service.externalIPs[]|设置externalIPs
    env.open.MYSQL_ROOT_PASSWORD|设置数据库root用户密码
    env.open.MYSQL_DATABASE|初始化创建的数据库名称
    env.open.MYSQL_USER|初始化创建的用户名
    env.open.MYSQL_PASSWORD|初始化创建的用户密码