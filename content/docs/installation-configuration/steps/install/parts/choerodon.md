+++
title = "微服务开发框架部署"
description = "微服务开发框架部署"
weight = 10
+++

# 微服务开发框架部署

<blockquote class="warning">
在此之前，应该准备好Mysql、Harbor、Gitlab、Minio，Chartmuseum这些组件的信息。按以下搭建顺序进行搭建，请不要随意调整搭建顺序。
以下验证部署是否成功如未特别说明则执行验证的环境为任意一台集群Master节点。
</blockquote>

- 如果您的主机性能或网络较差，建议您添加额外的参数以延长超时时间 `--set preJob.timeout=1000` ,其中1000表示1000秒后超时。

<blockquote class="note">
部署成功后Choerodon平台默认登录名为admin，默认密码为admin。
</blockquote>

## 添加Choerodon Chart仓库

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```
<blockquote class="warning">
0.19以前的base-service的数据库为iam_service,0.19以后更名为base_service,对于配置文件中是使用iam_service还是base_service遵从一下标准：
如果是新安装的版本，就使用base_service，如果是升级上来的版本，原版本数据库使用的是什么数据库名称，配置文件中就配置对应的数据库名称
</blockquote>

## 创建数据库

- 编写参数配置文件 `create-c7nfw-db.yaml`
    ```yaml
    env:
      MYSQL_HOST: c7n-mysql.c7n-system.svc
      MYSQL_PORT: "3306"
      MYSQL_USER: root
      MYSQL_PASS: password
      SQL_SCRIPT: |
        CREATE USER IF NOT EXISTS 'choerodon'@'%' IDENTIFIED BY 'password';
        CREATE DATABASE IF NOT EXISTS base_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        CREATE DATABASE IF NOT EXISTS manager_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        CREATE DATABASE IF NOT EXISTS asgard_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        CREATE DATABASE IF NOT EXISTS notify_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        GRANT ALL PRIVILEGES ON base_service.* TO choerodon@'%';
        GRANT ALL PRIVILEGES ON manager_service.* TO choerodon@'%';
        GRANT ALL PRIVILEGES ON asgard_service.* TO choerodon@'%';
        GRANT ALL PRIVILEGES ON notify_service.* TO choerodon@'%';
        FLUSH PRIVILEGES;
    ```

- 执行安装
    ```shell
    helm install c7n/mysql-client \
      -f create-c7nfw-db.yaml \
      --version 0.1.0 \
      --name create-c7nfw-db \
      --namespace c7n-system
    ```

## 部署 register server

- 若需了解项目详情及各项参数含义，请移步 [choerodon/go-register-server](https://github.com/choerodon/go-register-server)。

- 编写参数配置文件 `register-server.yaml`
    ```yaml
    env:
      open:
        REGISTER_SERVICE_NAMESPACE: c7n-system
    rbac:
      create: true
    service:
      enabled: true
      name: register-server
    ```

- 执行安装
    ```shell
    helm install c7n/go-register-server \
      -f register-server.yaml \
      --name register-server \
      --version 0.19.0 \
      --namespace c7n-system
    ```

- 验证部署
  - 验证命令
  
    ```shell
    curl $(kubectl get svc register-server -o jsonpath="{.spec.clusterIP}" -n c7n-system):8000/eureka/apps
    ```
  - 出现以下类似信息即为成功部署
  
    ```json
    {
        "name": "go-register-server",
        "instance": [
            {
            "instanceId": "192.168.3.19:go-register-server:8000",
            "hostName": "192.168.3.19",
            "app": "go-register-server",
            "ipAddr": "192.168.3.19",
            "status": "UP",
            ...
            "metadata": {
                "VERSION": "0.19.0"
            },
            ...
            }
        ]
    }
    ```

## 部署 base service

- 若需了解项目详情及各项参数含义，请移步 [choerodon/base-service](https://github.com/choerodon/base-service)。

- 编写参数配置文件 `base-service.yaml`
    ```yaml
    preJob:
      timeout: 300
      preConfig:
        datasource:
          url: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true
          username: choerodon
          password: password
      preInitDB:
        datasource:
          url: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/base_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true
          username: choerodon
          password: password
    env:
      open:
        SPRING_CLOUD_CONFIG_ENABLED: true
        SPRING_CLOUD_CONFIG_URI: http://register-server.c7n-system:8000/
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system.svc/base_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_DATASOURCE_PASSWORD: password
        SPRING_REDIS_HOST: c7n-redis.c7n-system.svc
        SPRING_REDIS_PORT: 6379
        SPRING_REDIS_DATABASE: 1
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://register-server.c7n-system:8000/eureka/
        CHOERODON_GATEWAY_URL: http://api.example.choerodon.io
    ```
- 部署服务
    ```shell
    helm install c7n/base-service \
        -f base-service.yaml \
        --name base-service \
        --version 0.19.0 \
        --namespace c7n-system
    ```
- 验证部署
  - 验证命令
  
    ```shell
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=base-service -o jsonpath="{.items[0].status.podIP}"):8031/actuator/health | jq -r .status
    ```
  - 出现以下类似信息即为成功部署
  
    ```
    UP
    ```
## 部署 manager service

- 若需了解项目详情及各项参数含义，请移步 [choerodon/manager-service](https://github.com/choerodon/manager-service)。

- 编写参数配置文件 `manager-service.yaml`
    ```yaml
    env:
      open:
        CHOERODON_GATEWAY_DOMAIN: api.example.choerodon.io
        CHOERODON_SWAGGER_OAUTH_URL: http://api.example.choerodon.io/oauth/oauth/authorize
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://register-server.c7n-system:8000/eureka/
        SPRING_CLOUD_CONFIG_URI: http://register-server.c7n-system:8000/
        SPRING_DATASOURCE_PASSWORD: password
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_REDIS_DATABASE: 2
        SPRING_REDIS_HOST: c7n-redis.c7n-system.svc
        SPRING_REDIS_PORT: 6379
    preJob:
      preInitDB:
        datasource:
          password: password
          url: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
          username: choerodon
    ```
- 部署服务
    ```shell
    helm install c7n/manager-service \
        -f manager-service.yaml \
        --name manager-service \
        --version 0.19.0 \
        --namespace c7n-system
    ```

- 验证部署
  - 验证命令
  
    ```shell
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=manager-service -o jsonpath="{.items[0].status.podIP}"):8964/actuator/health | jq -r .status
    ```
  - 出现以下类似信息即为成功部署

    ```
    UP
    ```

## 部署 asgard service

- 若需了解项目详情及各项参数含义，请移步 [choerodon/asgard-service](https://github.com/choerodon/asgard-service)。

- 编写参数配置文件 `asgard-service.yaml`
    ```yaml
    env:
      open:
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://register-server.c7n-system:8000/eureka/
        SPRING_CLOUD_CONFIG_ENABLED: true
        SPRING_CLOUD_CONFIG_URI: http://register-server.c7n-system:8000/
        SPRING_DATASOURCE_PASSWORD: password
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/asgard_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_REDIS_DATABASE: 3
        SPRING_REDIS_HOST: c7n-redis.c7n-system.svc
        SPRING_REDIS_PORT: 6379
    preJob:
      preConfig:
        datasource:
          password: password
          url: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
          username: choerodon
      preInitDB:
        datasource:
          password: password
          url: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/asgard_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
          username: choerodon
    ```

- 部署服务
    ```shell
    helm install c7n/asgard-service \
        -f asgard-service.yaml \
        --name asgard-service \
        --version 0.19.0 \
        --namespace c7n-system
    ```

- 验证部署
  - 验证命令
  
    ```shell
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=asgard-service -o jsonpath="{.items[0].status.podIP}"):18081/actuator/health | jq -r .status
    ```

  - 出现以下类似信息即为成功部署
  
    ```
    UP
    ```

## 部署 notify service

- 若需了解项目详情及各项参数含义，请移步 [choerodon/notify-service](https://github.com/choerodon/notify-service)。

- 编写参数配置文件 `notify-service.yaml`
    ```yaml
    env:
      open:
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://register-server.c7n-system:8000/eureka/
        SPRING_CLOUD_CONFIG_ENABLED: true
        SPRING_CLOUD_CONFIG_URI: http://register-server.c7n-system:8000/
        SPRING_DATASOURCE_PASSWORD: password
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/notify_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_REDIS_DATABASE: 4
        SPRING_REDIS_HOST: c7n-redis.c7n-system.svc
    ingress:
      enabled: true
      host: notify.example.choerodon.io
    preJob:
      preConfig:
        datasource:
          password: password
          url: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
          username: choerodon
      preInitDB:
        datasource:
          password: password
          url: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/notify_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
          username: choerodon
    service:
      enabled: true
      name: notify-service
    ```
- 部署服务
    ```
    helm install c7n/notify-service \
        -f notify-service.yaml \
        --name notify-service \
        --version 0.19.0 \
        --namespace c7n-system
    ```

- 验证部署
  - 验证命令
  
    ```
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=notify-service -o jsonpath="{.items[0].status.podIP}"):18086/actuator/health | jq -r .status
    ```
  - 出现以下类似信息即为成功部署
  
    ```
    UP
    ```

## 部署 api gateway

- 若需了解项目详情及各项参数含义，请移步 [choerodon/api-gateway](https://github.com/choerodon/api-gateway)。

- 编写参数配置文件 `api-gateway.yaml`
    ```yaml
    env:
      open:
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://register-server.c7n-system:8000/eureka/
        SPRING_CLOUD_CONFIG_ENABLED: true
        SPRING_CLOUD_CONFIG_URI: http://register-server.c7n-system:8000/
        SPRING_DATASOURCE_PASSWORD: password
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/base_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_REDIS_DATABASE: 5
        SPRING_REDIS_HOST: c7n-redis.c7n-system.svc
        SPRING_REDIS_PORT: 6379
        SPRING_CACHE_MULTI_L1_ENABLED: true
        SPRING_CACHE_MULTI_L2_ENABLED: false
    ingress:
      enabled: true
      host: api.example.choerodon.io
    preJob:
      preConfig:
        datasource:
          password: password
          url: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
          username: choerodon
    service:
      enabled: true
    ```
- 部署服务
    ```
    helm install c7n/api-gateway \
        -f api-gateway.yaml \
        --name api-gateway \
        --version 0.19.0 \
        --namespace c7n-system
    ```

- 验证部署
  - 验证命令

    ```
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=api-gateway -o jsonpath="{.items[0].status.podIP}"):8081/actuator/health | jq -r .status
    ```

  - 出现以下类似信息即为成功部署
  
    ```
    UP
    ```

## 部署 oauth server

- 若需了解项目详情及各项参数含义，请移步 [choerodon/oauth-server](https://github.com/choerodon/oauth-server)。

- 编写参数配置文件 `oauth-server.yaml`
    ```yaml
    env:
      open:
        CHOERODON_DEFAULT_REDIRECT_URL: http://c7n.example.choerodon.io
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://register-server.c7n-system:8000/eureka/
        SPRING_CLOUD_CONFIG_ENABLED: true
        SPRING_CLOUD_CONFIG_URI: http://register-server.c7n-system:8000/
        SPRING_DATASOURCE_PASSWORD: password
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/base_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_REDIS_DATABASE: 6
        SPRING_REDIS_HOST: c7n-redis.c7n-system.svc
    preJob:
      preConfig:
        datasource:
          password: password
          url: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
          username: choerodon
    ```
- 部署服务
    ```
    helm install c7n/oauth-server \
        -f oauth-server.yaml \
        --name oauth-server \
        --version 0.19.0 \
        --namespace c7n-system
    ```

- 验证部署
  - 验证命令
  
    ```
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=oauth-server -o jsonpath="{.items[0].status.podIP}"):8021/actuator/health | jq -r .status
    ```

  - 出现以下类似信息即为成功部署
  
    ```
    UP
    ```

## 部署 file service

- 若需了解项目详情及各项参数含义，请移步 [choerodon/file-service](https://github.com/choerodon/file-service)。

- 编写参数配置文件 `file-service.yaml`
    ```yaml
    env:
      open:
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://register-server.c7n-system:8000/eureka/
        MINIO_ACCESSKEY: admin
        MINIO_ENDPOINT: http://minio.example.choerodon.io
        MINIO_SECRETKEY: password
        SPRING_CLOUD_CONFIG_ENABLED: true
        SPRING_CLOUD_CONFIG_URI: http://register-server.c7n-system:8000/
    preJob:
      preConfig:
        datasource:
          password: password
          url: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
          username: choerodon
    ```
- 部署服务

    ```
    helm install c7n/file-service \
        -f file-service.yaml \
        --name file-service \
        --version 0.19.0 \
        --namespace c7n-system
    ```

- 验证部署
  - 验证命令
  
    ```
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=file-service -o jsonpath="{.items[0].status.podIP}"):9091/actuator/health | jq -r .status
    ```

  - 出现以下类似信息即为成功部署
  
    ```
    UP
    ```