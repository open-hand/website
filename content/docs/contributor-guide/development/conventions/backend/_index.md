+++
title = "后端开发"
description = "后端开发中的规范要求"
weight = 2
+++

# 后端开发

- [Java 开发](./java) Java 开发中文件结构及基本规范
- [Go 开发](./go) Go 开发过程中的项目目录及命名规范

## SQL 规范

Choerodon 的数据库采用MySql，同时使用Liquibase 和groovy 作为数据库管理工具。如果您的提交涉及到表结构的修改，请遵循如下规范：

* [SQL 规范](../sql)
* Groovy 规范

Choerodon 采用 Groovy 来编写数据库初始化脚本。需要遵循如下规范：

* 每一张表对应一个Groovy文件
* Groovy文件的路径应存放在服务的`/src/resources/script/db/` 路径下
* Groovy changeSet 的id ：'yyyy-MM-dd-table_name'，author：`your@gmail.com`
* Groovy 遵循liquibase语法。更多有关liquibase的信息请参照[liquibase官网](http://www.liquibase.org/)

## RESTful API规范

Choerodon 的微服务之间，采用HTTP/REST 的请求作为数据传输。接口需要遵循Rest 原则:

* [RESTful Api 规范](../restful)