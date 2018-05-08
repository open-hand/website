+++
title = "初始化数据库"
date = "2018-04-26T15:38:28+08:00"
draft = false
weight = 3
+++

# 初始化数据库

项目创建成功之后，需要初始化本地数据库。

1. 创建用户
2. 创建数据库
3. 编写表结构对应的groovy脚本
4. 初始化表结构
5. 验证表结构

## 创建用户

* 确保数据库启动成功

* 创建项目访问的用户，执行如下命令：
``` sql
CREATE USER 'choerodon'@'%' IDENTIFIED BY "123456";
```

## 创建数据库

* 用户创建成功之后，创建项目对应的数据库，执行如下命令：
```sql
CREATE DATABASE choerodon_demo_service_todo DEFAULT CHARACTER SET utf8;
```

* 将新创建的数据库权限赋予用户
```sql
GRANT ALL PRIVILEGES ON choerodon_demo_service_todo.* TO choerodon@'%';
FLUSH PRIVILEGES;
```

* 在项目的bootstarp.yaml 文件中添加数据库连接信息：
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost/choerodon_demo_service_todo?useUnicode=true&characterEncoding=utf-8&useSSL=false
    username: choerodon
    password: 123456
```

## 编写表结构对应的groovy脚本

Choerodon 采用Liquibase + groovy 的方式对数据库管理。

更多有关Liguibase的资料见 [Liquibase 官网](http://www.liquibase.org/)。

1. 在`./choerodon-todo-service/src/resources/db/script` 路径下创建`todo_swimlane.groovy`, `todo_user.groovy`, `todo_task.groovy`。
2. 编写groovy 脚本。

* todo_user.groovy

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

* todo_task.groovy

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
            column(name: 'task_description', type: 'VARCHAR(256)', remarks: '任务编号')

            column(name: "OBJECT_VERSION_NUMBER", type: "BIGINT", defaultValue : "1")
            column(name: "CREATED_BY", type: "BIGINT", defaultValue : "-1")
            column(name: "CREATION_DATE", type: "DATETIME", defaultValueComputed : "CURRENT_TIMESTAMP")
            column(name: "LAST_UPDATED_BY", type: "BIGINT", defaultValue : "-1")
            column(name: "LAST_UPDATE_DATE", type: "DATETIME", defaultValueComputed : "CURRENT_TIMESTAMP")
        }
    }
}
```

* todo_swimlane.groovy

```groovy
// todo_swimlane.groovy
package script.db

databaseChangeLog(logicalFilePath: 'todo_swimlane.groovy') {
    changeSet(id: '2017-05-29-todo_swimlane', author: 'your.email@email.com') {
        createTable(tableName: "todo_swimlane") {
            column(name: 'id', type: 'BIGINT UNSIGNED', remarks: 'ID', autoIncrement: true) {
                constraints(primaryKey: true)
            }
            column(name: 'state', type: 'VARCHAR(36)', remarks: '状态') {
                constraints(unique: true)
            }
            column(name: 'next_state', type: 'VARCHAR(36)', remarks: '下一状态')
        }
    }
}
```
## 初始化表结构

在`./choerodon-todo-service` 路径下，创建`init-local-database.sh` 文件。

```bash
#!/bin/bash
mkdir -p target
if [ ! -f target/choerodon-tool-liquibase.jar ]
then
    curl http://nexus.saas.hand-china.com/content/repositories/rdc/io/choerodon/choerodon-tool-liquibase/0.1.0/choerodon-tool-liquibase-0.1.0.jar -o target/choerodon-tool-liquibase.jar
fi
java -Dspring.datasource.url="jdbc:mysql://localhost/choerodon_demo_service_todo?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
 -Dspring.datasource.username=choerodon \
 -Dspring.datasource.password=123456 \
 -Ddata.drop=false -Ddata.init=true \
 -Ddata.dir=src/main/resources \
 -jar target/choerodon-tool-liquibase.jar
```

进入`./choerodon-todo-service` 执行如下命令：
```bash
sh init-local-database.sh
```

脚本执行程序会自动扫描resources中的groovy数据库初始化文件以及excel初始化数据。

执行 `init-local-database.sh` 脚本，若出现错误：
```bash
Error: Invalid or corrupt jarfile target/choerodon-tool-liquibase.jar
```

则自行下载 [choerodon-tool-liquibase.jar](http://nexus.saas.hand-china.com/content/repositories/rdc/io/choerodon/choerodon-tool-liquibase/0.1.0) 并重命名覆盖./choerodon-todo-service/target/choerodon-tool-liquibase.jar 并重新执行`init-local-database.sh` 脚本

## 验证表结构

登录数据库，查询现有的表结构。

```bash
mysql> show tables;
+---------------------------------------+
| Tables_in_choerodon_demo_service_todo |
+---------------------------------------+
| DATABASECHANGELOG                     |
| DATABASECHANGELOGLOCK                 |
| todo_swimlane                         |
| todo_task                             |
| todo_user                             |
+---------------------------------------+
5 rows in set (0.00 sec)
```