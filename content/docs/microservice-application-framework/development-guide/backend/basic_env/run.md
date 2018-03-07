+++
title = "运行"
date = "2017-02-01"
draft = false
weight = 2
+++

# 运行

## 运行程序

### 前提

在IDEA启动 `mysql`，`redis`，`rabbitmq` 容器。

### 在IDEA中运行程序

- 在对应模块目录下执行如下命令或在IDE内进行等效操作可以启动该模块

```
mvn spring-boot:run
```

- 要使功能完整可用，在本地至少启动如下模块

```
hap-register-server
hap-oauth-server
hap-api-gateway
hap-user-service
hap-user-admin-service
hap-framework-service
```

`hap-framework-service` 在仓库 `hap-framework-service-parent` 内。

- 若要使用调度服务，则在启动下列服务

```
hap-scheduler-service
```