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

``` sql
/** init_user.sql */
CREATE USER 'choerodon'@'%' IDENTIFIED BY "123456";
CREATE DATABASE IF NOT EXISTS iam_service DEFAULT CHARACTER SET utf8mb4;
CREATE DATABASE IF NOT EXISTS manager_service DEFAULT CHARACTER SET utf8mb4;
CREATE DATABASE IF NOT EXISTS asgard_service DEFAULT CHARACTER SET utf8mb4;
CREATE DATABASE IF NOT EXISTS notify_service DEFAULT CHARACTER SET utf8mb4;
GRANT ALL PRIVILEGES ON iam_service.* TO choerodon@'%';\
GRANT ALL PRIVILEGES ON manager_service.* TO choerodon@'%';\
GRANT ALL PRIVILEGES ON asgard_service.* TO choerodon@'%';\
GRANT ALL PRIVILEGES ON notify_service.* TO choerodon@'%';\
FLUSH PRIVILEGES;
```

4.查看用户与数据库。
```bash
mysql> select User from mysql.user;
+---------------+
| User          |
+---------------+
| choerodon     |
| mysql.session |
| mysql.sys     |
| root          |
+---------------+
4 rows in set (0.00 sec)

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| asgard_service     |
| iam_service        |
| manager_service    |
| mysql              |
| notify_service     |
| performance_schema |
| sys                |
| todo_service       |
+--------------------+
9 rows in set (0.00 sec)
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

# get choerodon-tool-liquibase
MAVEN_LOCAL_REPO=$(cd / && mvn help:evaluate -Dexpression=settings.localRepository -q -DforceStdout)
TOOL_GROUP_ID=io.choerodon
TOOL_ARTIFACT_ID=choerodon-tool-liquibase
TOOL_VERSION=${1:-0.11.0.RELEASE}
TOOL_JAR_PATH=${MAVEN_LOCAL_REPO}/${TOOL_GROUP_ID/\./\/}/${TOOL_ARTIFACT_ID}/${TOOL_VERSION}/${TOOL_ARTIFACT_ID}-${TOOL_VERSION}.jar
mvn org.apache.maven.plugins:maven-dependency-plugin:get \
 -Dartifact=${TOOL_GROUP_ID}:${TOOL_ARTIFACT_ID}:${TOOL_VERSION} \
 -Dtransitive=false

# init manager-service
java -Dspring.datasource.url="jdbc:mysql://localhost:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
 -Dspring.datasource.username=choerodon \
 -Dspring.datasource.password=123456 \
 -Ddata.drop=false -Ddata.init=true \
 -Ddata.dir=./manager \
 -jar ${TOOL_JAR_PATH}
 
# init iam-service
java -Dspring.datasource.url="jdbc:mysql://localhost:3306/iam_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
 -Dspring.datasource.username=choerodon \
 -Dspring.datasource.password=123456 \
 -Ddata.drop=false -Ddata.init=true \
 -Ddata.dir=./iam \
 -jar ${TOOL_JAR_PATH}
 ```

3.运行脚本。
```bash
$ sh init-local-database.sh [version]    #如未指定version，则默认使用tool version为0.11.0.
```

4.命令执行成功之后，刷新数据库，会出现初始化脚本中的表以及初始化数据。
