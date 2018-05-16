+++
title = "编写Application类"
date = "2018-04-27T11:40:28+08:00"
draft = false
weight = 4
+++

# 前置条件

在开发之前，请确保

* 本地项目已经创建成功，详见 [新建项目](../create_project/)
* 数据库创建成功，详见 [初始化数据库](../init_db/)

## 介绍

Choerodon 的微服务基于spring boot，所以需要有一个Application类作为入口程序。

## 编写TodoServiceApplication类
```java
package io.choerodon.todo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TodoServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(TodoServiceApplication.class, args);
    }
}
```

## 结构

```
└─main
    ├─java
    │  └─io
    │      └─choerodon
    │          └─todo
    │              └─TodoServiceApplication.java
    └─resources
```

## 启动程序

进入`./choerodon-todo-service/` 路径，执行`mvn clean spring-boot:run`。

控制台打印出如下信息，则表示启动成功。
```bash
Started TodoServiceApplication in 21.299 seconds (JVM running for 22.968)
```
