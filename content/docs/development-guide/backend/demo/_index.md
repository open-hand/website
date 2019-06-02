+++
title = "开发Demo程序"
description = ""
weight = 2
+++

## 前置条件

在开发之前，要保证环境已经安装正确，详见 [开发环境搭建](../develop-env/)

## 介绍

创建一个简单的项目，实现记录待办事项的功能。

具体功能包括：创建任务、根据任务Id获取任务、根据任务编号获取任务、根据ID删除任务、根据任务ID更新任务信息。

## 表结构

* `todo_user` 用户表，存储该项目中的用户信息

    字段名 | 字段类型 | 字段说明
    ---|--- | ---
    id | BIGINT UNSIGNED | 主键
    employee_name | VARCHAR | 员工名
    employee_number | VARCHAR | 员工号
    email | VARCHAR | 邮箱

* `todo_task` 任务表，存储该项目中所有的任务信息和任务与用户的关系

    字段名 | 字段类型 | 字段说明
    ---|--- | ---
    id | BIGINT UNSIGNED | 主键
    employee_id | BIGINT | 员工ID
    task_number | VARCHAR | 任务编号
    task_description | VARCHAR | 任务描述
    state | VARCHAR | 状态

## 项目结构
```bash
choerodon-todo-service
├── init-local-database.sh
├── pom.xml
└── src
    └── main
        ├── java
        │   └── io
        │       └── choerodon
        │           └── todo
        │               ├── TodoServiceApplication.java
        │               ├── api
        │               │   └── controller
        │               │       └── v1
        │               │           ├── TaskController.java
        │               │           └── UserController.java
        │               ├── app
        │               │   └── service
        │               │       ├── TaskService.java
        │               │       ├── UserService.java
        │               │       └── impl
        │               │           ├── TaskServiceImpl.java
        │               │           └── UserServiceImpl.java
        │               └── infra
        │                   ├── dto
        │                   │   ├── TaskDTO.java
        │                   │   └── UserDTO.java
        │                   └── mapper
        │                       ├── TaskMapper.java
        │                       └── UserMapper.java
        └── resources
            ├── application.yml
            ├── bootstrap.yml
            ├── mapper
            │   └── TaskMapper.xml
            └── script
                └── db
                    ├── todo_task.groovy
                    └── todo_user.groovy

```