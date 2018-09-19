+++
title = "数据初始化"
date = "2018-04-25T11:00:28+08:00"
draft = false
weight = 2
+++

## 启动容器

首先确保 `mysql` 容器已经启动，详见 [开发环境搭建](../../develop-env/)

## 介绍

本小节介绍了如何初始化Choerodon 的数据库。

## 创建Mysql数据库

1.查看容器，确认存在容器名为mysql的容器。

2.用`choerodon`用户命令行登陆 `mysql` 容器，密码为 `123456`。
``` bash
$ docker exec -ti mysql mysql -u choerodon -p
```

3.创建用户和数据库。
```sql
CREATE DATABASE iam_service DEFAULT CHARACTER SET utf8;
CREATE DATABASE manager_service DEFAULT CHARACTER SET utf8;
GRANT ALL PRIVILEGES ON iam_service.* TO choerodon@'%';
GRANT ALL PRIVILEGES ON manager_service.* TO choerodon@'%';
FLUSH PRIVILEGES;
```

4.查看用户与数据库。
```bash
$ mysql> select User from mysql.user;
+-----------+
| User      |
+-----------+
| choerodon |
| root      |
| mysql.sys |
+-----------+
3 rows in set (0.00 sec)

mysql> show databases;
+-----------------------------+
| Database                    |
+-----------------------------+
| information_schema          |
| iam_service                 |
| manager_service             |
| todo_service                |
| mysql                       |
| performance_schema          |
| sys                         |
+-----------------------------+
7 rows in set (0.01 sec)

```

## 初始化数据库

需初始化`manager-service`，`iam-service`两个数据库。

1.新建初始化数据库临时目录，并创建初始化脚本。
``` bash
$ mkdir -p tmp
$ cd tmp
$ touch init-local-database.sh
```

2.修改初始化脚本。
```bash
#!/bin/bash
# get manager-service
git clone https://github.com/choerodon/manager-service.git manager-service
mkdir -p manager/script
cp -r ./manager-service/src/main/resources/script/db ./manager/script
rm -rf ./manager-service

# get user-service
git clone https://github.com/choerodon/iam-service.git iam-service
mkdir -p iam/script
cp -r ./iam-service/src/main/resources/script/db ./iam/script
rm -rf ./iam-service

# init manager-service
java -Dspring.datasource.url="jdbc:mysql://localhost:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
 -Dspring.datasource.username=choerodon \
 -Dspring.datasource.password=123456 \
 -Ddata.drop=false -Ddata.init=init \
 -Ddata.dir=./manager \
 -jar ../bin/choerodon-tool-liquibase.jar

# init iam-service
java -Dspring.datasource.url="jdbc:mysql://localhost:3306/iam_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
 -Dspring.datasource.username=choerodon \
 -Dspring.datasource.password=123456 \
 -Ddata.drop=false -Ddata.init=init \
 -Ddata.dir=./iam \
 -jar ../bin/choerodon-tool-liquibase.jar
```

3.运行脚本。
```
$ sh ./init-local-database.sh
```

4.命令执行成功之后，刷新数据库，会出现初始化脚本中的表以及初始化数据。