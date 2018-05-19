+++
title = "Mysql安装"
description = "Mysql安装"
weight = 35
+++

# Mysql安装

## 仓库设置

1. 本地添加远程仓库

    ```
    helm repo add paas http://helm-charts.choerodon.io/paas/base/
    ```
1. 更新本地仓库信息

    ```
    helm repo update 
    ```

## 安装Mysql

> **注意：**启用持久化存储请执行提前创建所指向的物理地址，PV和PVC可使用以下语句进行创建；可在安装命令中添加`--debug --dry-run`参数，进行渲染预览不进行安装。

- 创建mysql所需PV和PVC

    ```bash
    helm install paas/create-pv \
        --set type=nfs \
        --set pv.name=mysql-pv \
        --set nfs.path=/u01/nfs/exports/io-choerodon/mysql \
        --set nfs.server=nfs.exmple.choerodon.io \
        --set pvc.name=mysql-pvc \
        --set size=3Gi \
        --set "accessModes[0]=ReadWriteOnce" \
        --name mysql-pv --namespace=io-choerodon
    ```

- 部署mysql

    ```
    helm install paas/mysql \
        --set persistence.enabled=true \
        --set persistence.existingClaim=mysql-pvc \
        --set env.open.MYSQL_ROOT_PASSWORD=password \
        --set service.port=3306 \
        --name=choerodon-mysql --namespace=io-choerodon
    ```

- 参数：

    参数 | 含义 
    --- |  --- 
    persistence.enabled|是否启用持久化存储
    persistence.existingClaim|PVC的名称
    persistence.subPath|设置将数据存储到的子目录
    service.port|设置service端口号
    service.externalIPs[0]|设置externalIPs
    env.open.MYSQL_ROOT_PASSWORD|设置数据库root用户密码
    env.open.MYSQL_DATABASE|初始化创建的数据库名称
    env.open.MYSQL_USER|初始化创建的用户名
    env.open.MYSQL_PASSWORD|初始化创建的用户密码

## 创建数据库
- 创建choerodon所需数据库及用户并授权

    ```sql
    CREATE USER 'choerodon'@'%' IDENTIFIED BY "password";
    CREATE DATABASE devops_service DEFAULT CHARACTER SET utf8;
    CREATE DATABASE event_store_service DEFAULT CHARACTER SET utf8;
    CREATE DATABASE gitlab_service DEFAULT CHARACTER SET utf8;
    CREATE DATABASE iam_service DEFAULT CHARACTER SET utf8;
    CREATE DATABASE manager_service DEFAULT CHARACTER SET utf8;
    GRANT ALL PRIVILEGES ON devops_service.* TO choerodon@'%';
    GRANT ALL PRIVILEGES ON event_store_service.* TO choerodon@'%';
    GRANT ALL PRIVILEGES ON gitlab_service.* TO choerodon@'%';
    GRANT ALL PRIVILEGES ON iam_service.* TO choerodon@'%';
    GRANT ALL PRIVILEGES ON manager_service.* TO choerodon@'%';
    FLUSH PRIVILEGES;
    ```