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
部署成功后Choerodon平台默认登录名为admin，默认密码为Admin@123!。
</blockquote>

## 添加Choerodon Chart仓库

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

## 创建数据库

- 编写参数配置文件 `create-c7nfw-db.yaml`

    ```
    env:
      MYSQL_HOST: c7n-mysql.c7n-system.svc
      MYSQL_PORT: "3306"
      MYSQL_USER: root
      MYSQL_PASS: password
      SQL_SCRIPT: |
        CREATE USER IF NOT EXISTS 'choerodon'@'%' IDENTIFIED BY 'password';
        CREATE DATABASE IF NOT EXISTS hzero_platform DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        CREATE DATABASE IF NOT EXISTS hzero_message DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        CREATE DATABASE IF NOT EXISTS hzero_file DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        CREATE DATABASE IF NOT EXISTS hzero_monitor DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        CREATE DATABASE IF NOT EXISTS hzero_admin DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        CREATE DATABASE IF NOT EXISTS asgard_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        GRANT ALL PRIVILEGES ON hzero_platform.* TO choerodon@'%';
        GRANT ALL PRIVILEGES ON hzero_message.* TO choerodon@'%';
        GRANT ALL PRIVILEGES ON hzero_file.* TO choerodon@'%';
        GRANT ALL PRIVILEGES ON hzero_monitor.* TO choerodon@'%';
        GRANT ALL PRIVILEGES ON hzero_admin.* TO choerodon@'%';
        GRANT ALL PRIVILEGES ON asgard_service.* TO choerodon@'%';
        FLUSH PRIVILEGES;
    ```

- 执行安装

    ```
    helm upgrade --install create-c7nfw-db c7n/mysql-client \
        -f create-c7nfw-db.yaml \
        --create-namespace \
        --version 0.1.0 \
        --namespace c7n-system
    ```

## 部署 hzero register

- 若需了解项目详情及各项参数含义，请移步 [choerodon/hzero-register](https://github.com/choerodon/hzero-register)。

- 编写参数配置文件 `hzero-register.yaml`
  
    ```yaml
    env:
      open:
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://hzero-register.c7n-system:8000/eureka/
    ```

- 执行安装
  
    ```
    helm upgrade --install hzero-register c7n/hzero-register \
        -f hzero-register.yaml \
        --create-namespace \
        --version 0.22.2 \
        --namespace c7n-system
    ```

- 验证部署
  - 验证命令
  
    ```
    curl -s $(kubectl get svc hzero-register -o jsonpath="{.spec.clusterIP}" -n c7n-system):8001/actuator/health | jq -r .status
    ```

  - 出现以下类似信息即为成功部署
  
    ```
    UP
    ```

## 部署 hzero platform

- 若需了解项目详情及各项参数含义，请移步 [choerodon/hzero-platform](https://github.com/choerodon/hzero-platform)。

- 编写参数配置文件 `hzero-platform.yaml`

    ```yaml
    preJob:
      preInitDB:
        datasource:
          url: jdbc:mysql://c7n-mysql.c7n-system:3306/?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
          username: choerodon
          password: password
          driver: com.mysql.jdbc.Driver
    env:
      open:
        HZERO_PLATFORM_HTTP_PROTOCOL: http
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://hzero-register.c7n-system:8000/eureka/
        SPRING_REDIS_HOST: c7n-redis.c7n-system
        SPRING_REDIS_PORT: 6379
        # 此db不可更改
        SPRING_REDIS_DATABASE: 1
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system:3306/hzero_platform?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_DATASOURCE_PASSWORD: password
        HZERO_EXPORT_COREPOOLSIZE: 1
    ```

- 部署服务

    ```shell
    helm upgrade --install hzero-platform c7n/hzero-platform \
        -f hzero-platform.yaml \
        --create-namespace \
        --version 0.22.1 \
        --namespace c7n-system
    ```

- 验证部署
  - 验证命令
  
    ```
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=hzero-platform -o jsonpath="{.items[0].status.podIP}"):8101/actuator/health | jq -r .status
    ```

  - 出现以下类似信息即为成功部署
  
    ```text
    UP
    ```
    


## 部署 hzero admin

- 若需了解项目详情及各项参数含义，请移步 [choerodon/hzero-admin](https://github.com/choerodon/hzero-admin)。

- 编写参数配置文件 `hzero-admin.yaml`

    ```yaml
    preJob:
      preInitDB:
        datasource:
          url: jdbc:mysql://c7n-mysql.c7n-system:3306/?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
          username: choerodon
          password: password
    env:
      open:
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://hzero-register.c7n-system:8000/eureka/
        HZERO_AUTO_REFRESH_SWAGGER_ENABLE: true
        SPRING_REDIS_HOST: c7n-redis.c7n-system
        SPRING_REDIS_PORT: 6379
        # 此db不可更改
        SPRING_REDIS_DATABASE: 1
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system:3306/hzero_admin?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_DATASOURCE_PASSWORD: password
    ```

- 部署服务

    ```
    helm upgrade --install hzero-admin c7n/hzero-admin \
        -f hzero-admin.yaml \
        --create-namespace \
        --version 0.22.3 \
        --namespace c7n-system
    ```

- 验证部署
  - 验证命令

    ```
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=hzero-admin -o jsonpath="{.items[0].status.podIP}"):8063/actuator/health | jq -r .status
    ```

  - 出现以下类似信息即为成功部署
  
    ```
    UP
    ```

## 部署 hzero iam

- 若需了解项目详情及各项参数含义，请移步 [choerodon/hzero-iam](https://github.com/choerodon/hzero-iam)。

- 编写参数配置文件 `hzero-iam.yaml`
  
    ```yaml
    preJob:
      preInitDB:
        datasource:
          url: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
          username: choerodon
          password: password
          driver: com.mysql.jdbc.Driver
    env:
      open:
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://hzero-register.c7n-system:8000/eureka/
        CHOERODON_GATEWAY_URL: http://api.example.choerodon.io
        SPRING_REDIS_HOST: c7n-redis.c7n-system.svc
        SPRING_REDIS_PORT: 6379
        # 此db不可更改
        SPRING_REDIS_DATABASE: 1
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system:3306/hzero_platform?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_DATASOURCE_PASSWORD: password
        HZERO_EXPORT_COREPOOLSIZE: 1
    ```

- 部署服务

    ```
    helm upgrade --install hzero-iam c7n/hzero-iam \
        -f hzero-iam.yaml \
        --create-namespace \
        --version 0.22.3 \
        --namespace c7n-system
    ```

- 验证部署

  - 验证命令
  
    ```
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=hzero-iam -o jsonpath="{.items[0].status.podIP}"):8031/actuator/health | jq -r .status
    ```

  - 出现以下类似信息即为成功部署
  
    ```
    UP
    ```


## 部署 hzero asgard

- 若需了解项目详情及各项参数含义，请移步 [choerodon/hzero-asgard](https://github.com/choerodon/hzero-asgard)。

- 编写参数配置文件 `hzero-asgard.yaml`

    ```yaml
    preJob:
      preInitDB:
        datasource:
          url: jdbc:mysql://c7n-mysql.c7n-system:3306/?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
          username: choerodon
          password: password
          driver: com.mysql.jdbc.Driver
    env:
      open:
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://hzero-register.c7n-system:8000/eureka/
        SPRING_REDIS_HOST: c7n-redis.c7n-system.svc
        SPRING_REDIS_PORT: 6379
        SPRING_REDIS_DATABASE: 7
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system:3306/asgard_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_DATASOURCE_PASSWORD: password
    ```

- 部署服务
    ```
    helm upgrade --install hzero-asgard c7n/hzero-asgard \
        -f hzero-asgard.yaml \
        --create-namespace \
        --version 0.22.4 \
        --namespace c7n-system
    ```

- 验证部署
  - 验证命令
  
    ```
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=hzero-asgard -o jsonpath="{.items[0].status.podIP}"):8041/actuator/health | jq -r .status
    ```

  - 出现以下类似信息即为成功部署
  
    ```
    UP
    ```    
    
## 部署 hzero swagger

- 若需了解项目详情及各项参数含义，请移步 [choerodon/hzero-swagger](https://github.com/choerodon/hzero-swagger)。

- 编写参数配置文件 `hzero-swagger.yaml`

    ```yaml
    env:
      open:
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://hzero-register.c7n-system:8000/eureka/
        HZERO_OAUTH_URL: http://api.example.choerodon.io/oauth/oauth/authorize
        SPRING_REDIS_HOST: c7n-redis.c7n-system
        SPRING_REDIS_PORT: 6379
        # 此db不可更改
        SPRING_REDIS_DATABASE: 1
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system:3306/hzero_admin?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_DATASOURCE_PASSWORD: password
    ```

- 部署服务
    ```
    helm upgrade --install hzero-swagger c7n/hzero-swagger \
        -f hzero-swagger.yaml \
        --create-namespace \
        --version 0.22.1 \
        --namespace c7n-system
    ```

- 验证部署
  - 验证命令
  
    ```
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=hzero-swagger -o jsonpath="{.items[0].status.podIP}"):8051/actuator/health | jq -r .status
    ```

  - 出现以下类似信息即为成功部署
  
    ```
    UP
    ```

## 部署 hzero gateway

- 若需了解项目详情及各项参数含义，请移步 [choerodon/hzero-gateway](https://github.com/choerodon/hzero-gateway)。

- 编写参数配置文件 `hzero-gateway.yaml`

    ```yaml
   env:
      open:
        SPRING_REDIS_HOST: c7n-redis.c7n-system
        SPRING_REDIS_PORT: 6379
        # 此db不可更改
        SPRING_REDIS_DATABASE: 4
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system:3306/hzero_platform?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_DATASOURCE_PASSWORD: password
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://hzero-register.c7n-system:8000/eureka/
    ingress:
      enabled: true
      host: api.example.choerodon.io
    ```

- 部署服务

    ```
    helm upgrade --install hzero-gateway c7n/hzero-gateway \
        -f hzero-gateway.yaml \
        --create-namespace \
        --version 0.22.4 \
        --namespace c7n-system
    ```

- 验证部署
  - 验证命令
  
    ```
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=hzero-gateway -o jsonpath="{.items[0].status.podIP}"):8081/actuator/health | jq -r .status
    ```

  - 出现以下类似信息即为成功部署
  
    ```
    UP
    ```

## 部署 hzero oauth

- 若需了解项目详情及各项参数含义，请移步 [choerodon/hzero-oauth](https://github.com/choerodon/hzero-oauth)。

- 编写参数配置文件 `hzero-oauth.yaml`

    ```yaml
    env:
      open:
        # 如果使用https 该参数设置为true
        HZERO_OAUTH_LOGIN_ENABLE_HTTPS: false
        HZERO_OAUTH_LOGIN_SUCCESS_URL: http://example.choerodon.io
        HZERO_OAUTH_LOGIN_DEFAULT_CLIENT_ID: choerodon
        HZERO_GATEWAY_URL: http://api.example.choerodon.io
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://hzero-register.c7n-system:8000/eureka/
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system:3306/hzero_platform?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_DATASOURCE_PASSWORD: password
        SPRING_REDIS_HOST: c7n-redis.c7n-system
        SPRING_REDIS_PORT: 6379
        # 此db不可更改
        SPRING_REDIS_DATABASE: 3
    ```

- 部署服务

    ```
    helm upgrade --install hzero-oauth c7n/hzero-oauth \
        -f hzero-oauth.yaml \
        --create-namespace \
        --version 0.22.2 \
        --namespace c7n-system
    ```

- 验证部署
  - 验证命令
  
    ```
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=hzero-oauth -o jsonpath="{.items[0].status.podIP}"):8021/actuator/health | jq -r .status
    ```

  - 出现以下类似信息即为成功部署

    ```
    UP
    ```


## 部署 hzero monitor

- 若需了解项目详情及各项参数含义，请移步 [choerodon/hzero-monitor](https://github.com/choerodon/hzero-monitor)。

- 编写参数配置文件 `hzero-monitor.yaml`

    ```yaml
    preJob:
      preInitDB:
        datasource:
          url: jdbc:mysql://c7n-mysql.c7n-system:3306/?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
          username: choerodon
          password: password
    env:
      open:
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://hzero-register.c7n-system:8000/eureka/
        SPRING_REDIS_HOST: c7n-redis.c7n-system
        SPRING_REDIS_PORT: 6379
        # 此db不可更改
        SPRING_REDIS_DATABASE: 1
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system:3306/hzero_monitor?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_DATASOURCE_PASSWORD: password
    ```

- 部署服务
    ```
    helm upgrade --install hzero-monitor c7n/hzero-monitor \
        -f hzero-monitor.yaml \
        --create-namespace \
        --version 0.22.4 \
        --namespace c7n-system
    ```

- 验证部署
  - 验证命令
  
    ```
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=hzero-monitor -o jsonpath="{.items[0].status.podIP}"):8261/actuator/health | jq -r .status
    ```

  - 出现以下类似信息即为成功部署
  
    ```
    UP
    ```

## 部署 hzero file

- 若需了解项目详情及各项参数含义，请移步 [choerodon/hzero-file](https://github.com/choerodon/hzero-file)。

- 编写参数配置文件 `hzero-file.yaml`

    ```yaml
    preJob:
      preInitDB:
        datasource:
          url: jdbc:mysql://c7n-mysql.c7n-system:3306/?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
          username: choerodon
          password: password
          driver: com.mysql.jdbc.Driver
    env:
      open:
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://hzero-register.c7n-system:8000/eureka/
        MINIO_ACCESSKEY: accesskey
        MINIO_ENDPOINT: http://minio.example.choerodon.io
        MINIO_SECRETKEY: secretkey
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system:3306/hzero_file?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_DATASOURCE_PASSWORD: password
        SPRING_REDIS_HOST: c7n-redis.c7n-system
        SPRING_REDIS_PORT: 6379
        # 此db不可更改
        SPRING_REDIS_DATABASE: 1
        SPRING_SERVLET_MULTIPART_MAX_FILE_SIZE: 200MB
        SPRING_SERVLET_MULTIPART_MAX_REQUEST_SIZE: 200MB
        FILE_GATEWAY_URL: http://api.example.choerodon.io/hfle
    ```

- 部署服务

    ```
    helm upgrade --install hzero-file c7n/hzero-file \
        -f hzero-file.yaml \
        --create-namespace \
        --version 0.22.4 \
        --namespace c7n-system
    ```

- 验证部署
  - 验证命令
  
    ```
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=hzero-file -o jsonpath="{.items[0].status.podIP}"):8111/actuator/health | jq -r .status
    ```

  - 出现以下类似信息即为成功部署

    ```
    UP
    ```

## 部署 hzero message

- 若需了解项目详情及各项参数含义，请移步 [choerodon/hzero-message](https://github.com/choerodon/hzero-message)。

- 编写参数配置文件 `hzero-message.yaml`

    ```yaml
    preJob:
      preInitDB:
        datasource:
          url: jdbc:mysql://c7n-mysql.c7n-system:3306/?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
          username: choerodon
          password: password
    env:
      open:
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://hzero-register.c7n-system:8000/eureka/
        HZERO_WEBSOCKET_OAUTHURL: http://hzero-oauth/oauth/api/user
        SPRING_REDIS_HOST: c7n-redis.c7n-system
        SPRING_REDIS_PORT: 6379
        # 此db不可更改
        SPRING_REDIS_DATABASE: 1
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system:3306/hzero_message?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_DATASOURCE_PASSWORD: password
    ingress:
      enabled: true
      host: notify.example.choerodon.io
    ```

- 部署服务
    ```
    helm upgrade --install hzero-message c7n/hzero-message \
        -f hzero-message.yaml \
        --create-namespace \
        --version 0.22.7 \
        --namespace c7n-system
    ```

- 验证部署
  - 验证命令
  
    ```
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=hzero-message -o jsonpath="{.items[0].status.podIP}"):8121/actuator/health | jq -r .status
    ```

  - 出现以下类似信息即为成功部署
  
    ```
    UP
    ```