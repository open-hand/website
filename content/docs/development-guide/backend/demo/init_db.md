+++
title = "初始化数据库"
date = "2018-04-26T15:38:28+08:00"
draft = false
weight = 3
+++

# 前置条件

在开发之前，请确保本地项目已经创建成功，详见 [新建项目](../create_project/)

## 介绍

项目创建成功之后，需要初始化本地数据库。

1. 创建用户
2. 创建数据库
3. 编写表结构对应的groovy脚本
4. 初始化表结构
5. 验证表结构
6. 项目数据库配置

## 创建用户

* 确保数据库启动成功

* 创建项目访问的用户，执行如下命令：
``` sql
CREATE USER 'choerodon'@'%' IDENTIFIED BY "123456";
```

## 创建数据库

* 用户创建成功之后，创建项目对应的数据库，执行如下命令：
```sql
CREATE DATABASE todo_service DEFAULT CHARACTER SET utf8;
```

* 将新创建的数据库权限赋予用户
```sql
GRANT ALL PRIVILEGES ON todo_service.* TO choerodon@'%';
FLUSH PRIVILEGES;
```

## 编写表结构对应的groovy脚本

Choerodon 采用`Liquibase` + `groovy` 的方式对数据库管理。

更多有关Liguibase的资料见 [Liquibase 官网](http://www.liquibase.org/)。

创建`groovy`文件存储的文件夹，并且创建`groovy`文件。

``` bash
$ mkdir -p src/main/resources/script/db
$ cd src/main/resources/script/db
$ touch todo_user.groovy todo_task.groovy
```

```groovy
// todo_user.groovy
package script.db

databaseChangeLog(logicalFilePath: 'todo_user.groovy') {
    changeSet(id: '2017-05-29-todo_user', author: 'your.email@email.com') {
        createTable(tableName: "todo_user") {
            column(name: 'id', type: 'BIGINT UNSIGNED', remarks: 'ID', autoIncrement: true) {
                constraints(primaryKey: true)
            }
            column(name: 'employee_name', type: 'VARCHAR(32)', remarks: '员工名')
            column(name: 'employee_number', type: 'VARCHAR(32)', remarks: '员工号') {
                constraints(unique: true)
            }
            column(name: 'email', type: 'VARCHAR(32)', remarks: '邮箱')

            column(name: "OBJECT_VERSION_NUMBER", type: "BIGINT", defaultValue: "1")
            column(name: "CREATED_BY", type: "BIGINT", defaultValue: "-1")
            column(name: "CREATION_DATE", type: "DATETIME", defaultValueComputed: "CURRENT_TIMESTAMP")
            column(name: "LAST_UPDATED_BY", type: "BIGINT", defaultValue: "-1")
            column(name: "LAST_UPDATE_DATE", type: "DATETIME", defaultValueComputed: "CURRENT_TIMESTAMP")
        }
    }
}
```

```groovy
// todo_task.groovy
package script.db

databaseChangeLog(logicalFilePath: 'todo_task.groovy') {
    changeSet(id: '2017-05-29-todo_task', author: 'your.email@email.com') {
        createTable(tableName: "todo_task") {
            column(name: 'id', type: 'BIGINT UNSIGNED', remarks: 'ID', autoIncrement: true) {
                constraints(primaryKey: true)
            }
            column(name: 'employee_id', type: 'BIGINT', remarks: '员工ID')
            column(name: 'state', type: 'VARCHAR(36)', remarks: '状态')
            column(name: 'task_number', type: 'VARCHAR(64)', remarks: '任务编号') {
                constraints(unique: true)
            }
            column(name: 'task_description', type: 'VARCHAR(256)', remarks: '任务描述')

            column(name: "OBJECT_VERSION_NUMBER", type: "BIGINT", defaultValue : "1")
            column(name: "CREATED_BY", type: "BIGINT", defaultValue : "-1")
            column(name: "CREATION_DATE", type: "DATETIME", defaultValueComputed : "CURRENT_TIMESTAMP")
            column(name: "LAST_UPDATED_BY", type: "BIGINT", defaultValue : "-1")
            column(name: "LAST_UPDATE_DATE", type: "DATETIME", defaultValueComputed : "CURRENT_TIMESTAMP")
        }
    }
}
```

## 初始化表结构

在根目录下，创建`init-local-database.sh` 文件。

``` bash
$ touch init-local-database.sh
```

修改初始化脚本。

```bash
#!/bin/bash
mkdir -p bin
if [ ! -f bin/choerodon-tool-liquibase.jar ]
then
    curl https://oss.sonatype.org/content/groups/public/io/choerodon/choerodon-tool-liquibase/0.5.1.RELEASE/choerodon-tool-liquibase-0.5.1.RELEASE.jar -o target/choerodon-tool-liquibase.jar
fi
java -Dspring.datasource.url="jdbc:mysql://localhost:3306/todo_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
 -Dspring.datasource.username=choerodon \
 -Dspring.datasource.password=123456 \
 -Ddata.drop=false -Ddata.init=true \
 -Ddata.dir=./src/main/resources \
 -jar ./bin/choerodon-tool-liquibase.jar
```

进入根目录执行如下命令：
```bash
$ sh ./init-local-database.sh
```

控制台打印出如下信息，则表示初始化成功。
```bash
数据库初始化任务完成
```
脚本执行程序会自动扫描resources中的groovy数据库初始化文件以及excel初始化数据。

执行 `init-local-database.sh` 脚本，若出现错误：
```bash
Error: Invalid or corrupt jarfile target/choerodon-tool-liquibase.jar
```

则自行下载 [choerodon-tool-liquibase.jar](https://oss.sonatype.org/content/groups/public/io/choerodon/choerodon-tool-liquibase/0.5.1.RELEASE/choerodon-tool-liquibase-0.5.1.RELEASE.jar) 并重命名覆盖./bin/choerodon-tool-liquibase.jar 并重新执行`init-local-database.sh` 脚本

## 验证表结构

登录数据库，查询现有的表结构。

```bash
mysql> show tables;
+---------------------------------------+
| Tables_in_todo_service |
+---------------------------------------+
| DATABASECHANGELOG                     |
| DATABASECHANGELOGLOCK                 |
| todo_task                             |
| todo_user                             |
+---------------------------------------+
5 rows in set (0.00 sec)
```

## 项目数据库配置

在`pom.xml` 文件中添加数据库依赖。
``` xml
<dependency>
    <groupId>io.choerodon</groupId>
    <artifactId>choerodon-starter-mybatis-mapper</artifactId>
    <version>${choerodon.starters.version}</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
```

在项目的`application.yml` 文件中添加数据库连接信息：
``` yml
spring:
  datasource:
    url: jdbc:mysql://192.168.99.100:3306/todo_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
    username: root
    password: 123456
```

项目根目录下执行命令。项目正常启动，则数据库连接配置正常。
``` bash
$ mvn clean spring-boot:run
```