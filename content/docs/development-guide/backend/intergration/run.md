+++
title = "模块运行"
date = "2018-04-25T11:00:28+08:00"
draft = false
weight = 3
+++

## 前置条件

* 开发环境配置：[开发环境安装](../../develop-env/)
* 数据环境准备：[数据初始化](../init/)
* Demo程序已经开发完毕，详见 [开发Demo程序](../../demo/)
* 启动 `mysql`，`redis`，`kafka`等容器

## 介绍

本小节介绍如何在本地使用docker compose运行choerodon 微服务开发框架，并启动demo程序

## 启动相关服务

* 要使功能完整可用，在本地至少启动如下模块
```yaml
register
api-gateway
gateway-helper
oauth
```

* 编写docker-compose.yaml 文件
* 打开git bash 执行docker-compose up -d
* 执行docker ps 或docker-compose ps 查看容器是否启动

这里提供一份`docker-compose.yaml`以供参考，具体根据本地配置进行修改

``` yaml
# docker-compose.yaml
version: "3"

services:
  eureka-server:
    container_name: eureka-server
    image: registry.choerodon.io/choerodon-framework/eureka-server:0.1.0
    hostname: 127.0.0.1
    ports:
    - "8000:8000"
  api-gateway:
    container_name: api-gateway
    image: registry.choerodon.io/choerodon-framework/api-gateway:0.1.0
    ports:
    - "8080:8080"
    environment:
    - zuul.addHostHeader=true
    - zuul.routes.dev.path=/todo/**
    - zuul.routes.dev.serviceId=choerodon-todo-service
  oauth-server:
    container_name: oauth-server
    image: registry.choerodon.io/choerodon-framework/oauth-server:0.1.0
    ports:
    - "8020:8020"
  gateway-helper:
    container_name: gateway-helper
    image: registry.choerodon.io/choerodon-framework/gateway-helper:0.1.0
    ports:
    - "9180:9180"
```

停止容器通过命令`docker-compose down`。

> 有关Docker的更多信息请见[此处](https://docs.docker.com/)

> 有关Docker-Compose的更多信息请见[此处](https://docs.docker.com/compose/overview/)

## 启动todo服务

进入`choerodon-todo-service`目录下，运行以下命令启动本地项目

```bash
mvn clean spring-boot:run
```