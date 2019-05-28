+++
title = "微服务开发框架部署"
description = "微服务开发框架部署"
weight = 10
+++

# 分步部署微服务开发框架

<blockquote class="warning">
在此之前，应该准备好Mysql、Harbor、Gitlab、Minio，Chartmuseum这些组件的信息。按以下搭建顺序进行搭建，请不要随意调整搭建顺序。
以下验证部署是否成功如未特别说明则执行验证的环境为任意一台集群Master节点。
</blockquote>

- 如果您的主机性能或网络较差，建议您添加额外的参数以延长超时时间`--set preJob.timeout=1000`,其中1000表示1000秒后超时。


<blockquote class="note">
部署成功后Choerodon平台默认登录名为admin，默认密码为admin。
</blockquote>

## 添加Choerodon Chart仓库

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

## 创建数据库

```
helm install c7n/mysql-client \
    --set env.MYSQL_HOST=c7n-mysql.c7n-system.svc \
    --set env.MYSQL_PORT=3306 \
    --set env.MYSQL_USER=root \
    --set env.MYSQL_PASS=password \
    --set env.SQL_SCRIPT="\
          CREATE USER IF NOT EXISTS 'choerodon'@'%' IDENTIFIED BY 'password';\
          CREATE DATABASE IF NOT EXISTS iam_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\
          CREATE DATABASE IF NOT EXISTS manager_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\
          CREATE DATABASE IF NOT EXISTS asgard_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\
          CREATE DATABASE IF NOT EXISTS notify_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\
          GRANT ALL PRIVILEGES ON iam_service.* TO choerodon@'%';\
          GRANT ALL PRIVILEGES ON manager_service.* TO choerodon@'%';\
          GRANT ALL PRIVILEGES ON asgard_service.* TO choerodon@'%';\
          GRANT ALL PRIVILEGES ON notify_service.* TO choerodon@'%';\
          FLUSH PRIVILEGES;" \
    --version 0.1.0 \
    --name create-c7nfw-db \
    --namespace c7n-system
```

## 部署register server

- 部署服务

    ```
    helm install c7n/go-register-server \
        --set service.enabled=true \
        --set service.name=register-server \
        --set env.open.REGISTER_SERVICE_NAMESPACE="c7n-system" \
        --set rbac.craete=true \
        --name register-server \
        --version 0.17.0 \
        --namespace c7n-system
    ```

    参数名 | 含义 
    --- |  --- 
    service.enable|是否创建service对象
    service.name|service对象的名称
    env.open.REGISTER_SERVICE_NAMESPACE|仅监听的namespace，多个namespace请用逗号隔开

- 验证部署
    - 验证命令

        ```
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
                    "VERSION": "0.17.0"
                },
                ...
                }
            ]
        }
        ```

## 部署manager service

- 部署服务

    ```
    helm install c7n/manager-service \
        --set preJob.preInitDB.datasource.url="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set preJob.preInitDB.datasource.username=choerodon \
        --set preJob.preInitDB.datasource.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set env.open.SPRING_DATASOURCE_USERNAME=choerodon \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://register-server.c7n-system:8000/" \
        --set env.open.CHOERODON_GATEWAY_DOMAIN="api.example.choerodon.io" \
        --set env.open.CHOERODON_SWAGGER_OAUTH_URL="http://api.example.choerodon.io/oauth/oauth/authorize" \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.c7n-system:8000/eureka/" \
        --set env.open.SPRING_REDIS_HOST=c7n-redis.c7n-system.svc \
        --set env.open.SPRING_REDIS_PORT=6379 \
        --set env.open.SPRING_REDIS_DATABASE=1 \
        --name manager-service \
        --version 0.17.0 \
        --namespace c7n-system
    ```
    参数名 | 含义 
    --- |  --- 
    preJob.preInitDB.datasource{}|初始化数据库所需数据库信息
    env.open.SPRING_DATASOURCE_URL|数据库链接地址
    env.open.SPRING_DATASOURCE_USERNAME|数据库用户名
    env.open.SPRING_DATASOURCE_PASSWORD|数据库密码
    env.open.SPRING_CLOUD_CONFIG_ENABLED|启用配置中心
    env.open.SPRING_CLOUD_CONFIG_URI|配置中心地址
    env.open.CHOERODON_SWAGGER_OAUTH_URL|swagger授权地址
    env.open.CHOERODON_GATEWAY_DOMAIN|平台api地址
    env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE|注册服务地址

- 验证部署
    - 验证命令

        ```
        curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=manager-service -o jsonpath="{.items[0].status.podIP}"):8964/actuator/health | jq -r .status
        ```
    - 出现以下类似信息即为成功部署
        ```
        UP
        ```

## 部署asgard service

- 部署服务

    ```
    helm install c7n/asgard-service \
        --set preJob.preConfig.datasource.url="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set preJob.preConfig.datasource.username=choerodon \
        --set preJob.preConfig.datasource.password=password \
        --set preJob.preInitDB.datasource.url="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/asgard_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set preJob.preInitDB.datasource.username=choerodon \
        --set preJob.preInitDB.datasource.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/asgard_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set env.open.SPRING_DATASOURCE_USERNAME=choerodon \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.c7n-system:8000/eureka/" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://register-server.c7n-system:8000/" \
        --set env.open.SPRING_REDIS_HOST=c7n-redis.c7n-system.svc \
        --set env.open.SPRING_REDIS_PORT=6379 \
        --set env.open.SPRING_REDIS_DATABASE=7 \
        --name asgard-service \
        --version 0.17.0 \
        --namespace c7n-system
    ```

    参数名 | 含义 
    --- |  --- 
    preJob.preConfig.datasource{}|初始化配置所需manager_service数据库信息
    preJob.preInitDB.datasource{}|初始化数据库所需数据库信息
    env.open.SPRING_DATASOURCE_URL|数据库链接地址
    env.open.SPRING_DATASOURCE_USERNAME|数据库用户名
    env.open.SPRING_DATASOURCE_PASSWORD|数据库密码
    env.open.SPRING_CLOUD_CONFIG_ENABLED|启用配置中心
    env.open.SPRING_CLOUD_CONFIG_URI|配置中心地址
    env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE|注册服务地址

- 验证部署
    - 验证命令

        ```
        curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=asgard-service -o jsonpath="{.items[0].status.podIP}"):18081/actuator/health | jq -r .status
        ```
    - 出现以下类似信息即为成功部署
        ```
        UP
        ```

## 部署notify service

- 部署服务

    ```
    helm install c7n/notify-service \
        --set preJob.preConfig.datasource.url="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set preJob.preConfig.datasource.username=choerodon \
        --set preJob.preConfig.datasource.password=password \
        --set preJob.preInitDB.datasource.url="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/notify_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set preJob.preInitDB.datasource.username=choerodon \
        --set preJob.preInitDB.datasource.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/notify_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set env.open.SPRING_DATASOURCE_USERNAME=choerodon \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.c7n-system:8000/eureka/" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://register-server.c7n-system:8000/" \
        --set env.open.SPRING_REDIS_HOST=c7n-redis.c7n-system.svc \
        --set env.open.SPRING_REDIS_DATABASE=3 \
        --set service.enabled=true \
        --set service.name=notify-service \
        --set ingress.enabled=true \
        --set ingress.host=notify.example.choerodon.io \
        --name notify-service \
        --version 0.17.0 \
        --namespace c7n-system
    ```
    参数名 | 含义 
    --- |  --- 
    preJob.preConfig.datasource{}|初始化配置所需manager_service数据库信息
    preJob.preInitDB.datasource{}|初始化数据库所需数据库信息
    env.open.SPRING_DATASOURCE_URL|数据库链接地址
    env.open.SPRING_DATASOURCE_USERNAME|数据库用户名
    env.open.SPRING_DATASOURCE_PASSWORD|数据库密码
    env.open.SPRING_CLOUD_CONFIG_ENABLED|启用配置中心
    env.open.SPRING_CLOUD_CONFIG_URI|配置中心地址
    env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE|注册服务地址

- 验证部署
    - 验证命令

        ```
        curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=notify-service -o jsonpath="{.items[0].status.podIP}"):18086/actuator/health | jq -r .status
        ```
    - 出现以下类似信息即为成功部署
        ```
        UP
        ```

## 部署iam service
- 部署服务

    ```
    helm install c7n/iam-service \
        --set preJob.preConfig.datasource.url="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set preJob.preConfig.datasource.username=choerodon \
        --set preJob.preConfig.datasource.password=password \
        --set preJob.preInitDB.datasource.url="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/iam_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set preJob.preInitDB.datasource.username=choerodon \
        --set preJob.preInitDB.datasource.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/iam_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set env.open.SPRING_DATASOURCE_USERNAME=choerodon \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.c7n-system:8000/eureka/" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://register-server.c7n-system:8000/" \
        --name iam-service \
        --version 0.17.0 \
        --namespace c7n-system
    ```
    参数名 | 含义 
    --- |  --- 
    preJob.preConfig.datasource{}|初始化配置所需manager_service数据库信息
    preJob.preInitDB.datasource{}|初始化数据库所需数据库信息
    env.open.SPRING_DATASOURCE_URL|数据库链接地址
    env.open.SPRING_DATASOURCE_USERNAME|数据库用户名
    env.open.SPRING_DATASOURCE_PASSWORD|数据库密码
    env.open.SPRING_CLOUD_CONFIG_ENABLED|启用配置中心
    env.open.SPRING_CLOUD_CONFIG_URI|配置中心地址
    env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE|注册服务地址

- 验证部署
    - 验证命令

        ```
        curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=iam-service -o jsonpath="{.items[0].status.podIP}"):8031/actuator/health | jq -r .status
        ```
    - 出现以下类似信息即为成功部署
        ```
        UP
        ```

## 部署api gateway
- 部署服务

    ```
    helm install c7n/api-gateway \
        --set preJob.preConfig.datasource.url="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set preJob.preConfig.datasource.username=choerodon \
        --set preJob.preConfig.datasource.password=password \
        --set service.enabled=true \
        --set ingress.enabled=true \
        --set ingress.host=api.example.choerodon.io \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.c7n-system:8000/eureka/" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://register-server.c7n-system:8000/" \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/iam_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set env.open.SPRING_DATASOURCE_USERNAME=choerodon \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.SPRING_REDIS_HOST=c7n-redis.c7n-system.svc \
        --set env.open.SPRING_REDIS_PORT=6379 \
        --set env.open.SPRING_REDIS_DATABASE=4 \
        --set env.SPRING_CACHE_MULTI_L1_ENABLED=true \
        --set env.SPRING_CACHE_MULTI_L2_ENABLED=false \
        --name api-gateway \
        --version 0.17.0 \
        --namespace c7n-system
    ```
    参数名 | 含义 
    --- |  --- 
    preJob.preConfig.datasource{}|初始化配置所需manager_service数据库信息
    service.enable|创建service对象
    ingress.enable|创建ingress对象
    ingress.host|域名地址，此处不能带http://
    env.open.SPRING_CLOUD_CONFIG_ENABLED|启用配置中心
    env.open.SPRING_CLOUD_CONFIG_URI|配置中心地址
    env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE|注册服务地址

- 验证部署
    - 验证命令

        ```
        curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=api-gateway -o jsonpath="{.items[0].status.podIP}"):8081/actuator/health | jq -r .status
        ```
    - 出现以下类似信息即为成功部署
        ```
        UP
        ```

## 部署oauth server
- 部署服务

    ```
    helm install c7n/oauth-server \
        --set preJob.preConfig.datasource.url="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set preJob.preConfig.datasource.username=choerodon \
        --set preJob.preConfig.datasource.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/iam_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set env.open.SPRING_DATASOURCE_USERNAME=choerodon \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.SPRING_REDIS_HOST=c7n-redis.c7n-system.svc \
        --set env.open.SPRING_REDIS_DATABASE=7 \
        --set env.open.CHOERODON_DEFAULT_REDIRECT_URL="http://c7n.example.choerodon.io" \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.c7n-system:8000/eureka/" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://register-server.c7n-system:8000/" \
        --name oauth-server \
        --version 0.17.0 \
        --namespace c7n-system
    ```
    参数名 | 含义 
    --- |  --- 
    preJob.preConfig.datasource{}|初始化配置所需manager_service数据库信息
    env.open.SPRING_DATASOURCE_URL|数据库链接地址
    env.open.SPRING_DATASOURCE_USERNAME|数据库用户名
    env.open.SPRING_DATASOURCE_PASSWORD|数据库密码
    env.open.SPRING_CLOUD_CONFIG_ENABLED|启用配置中心
    env.open.CHOERODON_DEFAULT_REDIRECT_URL|默认重定向地址
    env.open.SPRING_REDIS_HOST|Redis数据库地址
    env.open.SPRING_REDIS_DATABASE|Redis数据库
    env.open.SPRING_CLOUD_CONFIG_URI|配置中心地址
    env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE|注册服务地址
- 验证部署
    - 验证命令

        ```
        curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=oauth-server -o jsonpath="{.items[0].status.podIP}"):8021/actuator/health | jq -r .status
        ```
    - 出现以下类似信息即为成功部署
        ```
        UP
        ```

## 部署file service
- 部署服务

    ```
    helm install c7n/file-service \
        --set preJob.preConfig.datasource.url="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set preJob.preConfig.datasource.username=choerodon \
        --set preJob.preConfig.datasource.password=password \
        --set env.open.MINIO_ENDPOINT="http://minio.example.choerodon.io" \
        --set env.open.MINIO_ACCESSKEY=admin \
        --set env.open.MINIO_SECRETKEY=password \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.c7n-system:8000/eureka/" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://register-server.c7n-system:8000/" \
        --name file-service \
        --version 0.17.0 \
        --namespace c7n-system
    ```
    参数名 | 含义 
    --- |  --- 
    preJob.preConfig.datasource{}|初始化配置所需manager_service数据库信息
    env.open.SPRING_CLOUD_CONFIG_ENABLED|启用配置中心
    env.open.SPRING_CLOUD_CONFIG_URI|配置中心地址
    env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE|注册服务地址
    env.open.MINIO_ENDPOINT|minio地址
    env.open.MINIO_ACCESSKEY|minio access key
    env.open.MINIO_SECRETKEY|minio secret key

- 验证部署
    - 验证命令

        ```
        curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=file-service -o jsonpath="{.items[0].status.podIP}"):9091/actuator/health | jq -r .status
        ```
    - 出现以下类似信息即为成功部署
        ```
        UP
        ```