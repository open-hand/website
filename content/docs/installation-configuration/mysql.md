+++
title = "Mysql安装"
description = "Mysql安装"
date = 2018-03-30T13:06:38+08:00
draft = false
weight = 1
+++

# Mysql安装

### 添加远程仓库

```
helm repo add paas http://helm-charts.staging.saas.hand-china.com/paas/base/
```

### 更新仓库信息

```
helm repo update 
```

### 安装Mysql

- 执行以下命名进行安装。

  > **注意：**启用持久化存储请执行提前创建PV和PVC,可在安装命令中添加`--debug --dry-run`参数，进行渲染预览不进行安装。

  ```
  helm install paas/mysql --name=mysql --namespace=db \
        --set persistence.enabled=true \
        --set persistence.existingClaim=mysql \
        --set env.open.MYSQL_ROOT_PASSWORD=handhand \
        --set service.port=3307 \
        --set "service.externalIPs[0]"="192.168.12.175" --debug --dry-run
  ```

- 参数：
    - `persistence.enabled` 是否启用Mysql数据持久化
    - `persistence.existingClaim` Mysql将要绑定的pvc的name
    - `persistence.subPath` 设置将数据存储到的子目录
    - `service.port` 设置service端口号
    - `service.externalIPs[0]` 设置externalIPs
    - `env.open.MYSQL_ROOT_PASSWORD` 设置数据库root用户密码
    - `env.open.MYSQL_DATABASE` 初始化创建的数据库名称
    - `env.open.MYSQL_USER` 初始化创建的用户名
    - `env.open.MYSQL_PASSWORD` 初始化创建的用户密码