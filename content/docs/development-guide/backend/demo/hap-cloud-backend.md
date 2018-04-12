+++
title = "集成HAPCloudBackend项目配置"
date = "2017-02-01"
draft = false
weight = 9
+++

# 集成HAPCloudBackend项目配置

## HAPCloudBackend项目配置

- HAPCloudBackend项目地址：[https://rdc.hand-china.com/gitlab/HAPCloud/HAPCloudBackend.git]

### 开发环境配置

详见 [windows开发环境安装](http://eco.hand-china.com/doc/hap-cloud/latest/developer_guide/backend/develop_env/install-windows.html)或[Linux开发环境安装](http://eco.hand-china.com/doc/hap-cloud/latest/developer_guide/backend/develop_env/install-linux.html)或[macOS开发环境安装](http://eco.hand-china.com/doc/hap-cloud/latest/developer_guide/backend/develop_env/install-macos.html)

### 基础环境准备

详见 [基础环境准备](http://eco.hand-china.com/doc/hap-cloud/latest/developer_guide/backend/basic_env/build.html)

### 启动服务

这里至少需要启动 `hap-register-server` ， `hap-oauth-server` ， `hap-api-gateway` 三个服务。 如需其他功能，可按需启动其他服务。

- hap-register-server:即eureka服务发现，所有的服务都会注册在这里，需要第一个启动。无须额外配置。
- hap-oauth-server:oauth服务，通过jwt token对所有服务的连接进行认证。无须额外配置。
- hap-api-gateway:包含了swagger服务和gateway服务，对eureka服务中的注册服务进行监听捕获，在swagger中测试会进行自动的转发路由至对应的api。需要修改配置文件，主要内容为redis服务器以及端口、rabbitmq服务器以及端口、eureka服务器地址，指定todo service的service id。注意localhost为本地docker-machine的ip地址，根据自己本地的情况经行对应的修改。
    * 方式一：直接修改application-default.yml,注意根据自己的需求进行修改，修改dev的配置信息，不要提交代码。
    
        ```
        spring:
            datasource:
            url: jdbc:mysql://localhost/hap_user_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
            username: hapcloud
            password: handhand
            rabbitmq:
            host: localhost
            port: 5672
            zuul:
            addHostHeader: true
            routes:
                dev:
                path: /todo/**
                serviceId: hap-todo-service
                uaa:
                path: /uaa/**
                serviceId: hap-user-service
                fws:
                path: /fws/**
                serviceId: hap-framework-service
                admin:
                path: /admin/**
                serviceId: hap-user-admin-service
                oauth:
                path: /oauth/**
                sensitiveHeaders:
                serviceId: hap-oauth-server
                stripPrefix: false
            security:
            oauth2:
                resource:
                userInfoUri: http://hap-oauth-server/oauth/api/user
            ignored:
                - /oauth/**
        ```

    * 方式二：在启动gat-way的配置信息中添加自订的配置信息：
    ![](../images/gateway-config.png)
    
        ```properties
        -Dzuul.routes.todo.serviceId=hap-todo-service
        -Dspring.redis.host=localhost
        -Dspring.redis.port=6379
        -Dspring.rabbitmq.port=5672
        -Deureka.client.serviceUrl.defaultZone=http://localhost:8000/eureka
        -Dspring.application.name=hap-api-gateway-test
        ```