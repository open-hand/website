+++
title = "敏捷管理部署"
description = "敏捷管理部署"
weight = 30
+++

# 部署敏捷管理

<blockquote class="warning">
在此之前，应该准备好Mysql、Harbor、Gitlab、Minio，Chartmuseum这些组件的信息。按以下搭建顺序进行搭建，请不要随意调整搭建顺序。
</blockquote>

## 添加choerodon chart仓库

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
          CREATE DATABASE IF NOT EXISTS agile_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\
          CREATE DATABASE IF NOT EXISTS state_machine_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\
          CREATE DATABASE IF NOT EXISTS issue_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\
          CREATE DATABASE IF NOT EXISTS foundation_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\
          GRANT ALL PRIVILEGES ON agile_service.* TO choerodon@'%'; \
          GRANT ALL PRIVILEGES ON state_machine_service.* TO choerodon@'%';\
          GRANT ALL PRIVILEGES ON issue_service.* TO choerodon@'%';\
          GRANT ALL PRIVILEGES ON foundation_service.* TO choerodon@'%';\
          FLUSH PRIVILEGES;" \
    --version 0.1.0 \
    --name create-c7nagile-db \
    --namespace c7n-system
```

## 部署agile service


- 部署服务
    
    - 在部署知识管理前您没有`SERVICES_WIKI_TOKEN`请预设一个随机字符串并注意记录，部署知识管理时请使用您设置的token

    ``` 
    helm install c7n/agile-service \
        --set preJob.preConfig.datasource.url="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set preJob.preConfig.datasource.username=choerodon \
        --set preJob.preConfig.datasource.password=password \
        --set preJob.preInitDB.datasource.url="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/agile_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set preJob.preInitDB.datasource.username=choerodon \
        --set preJob.preInitDB.datasource.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/agile_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set env.open.SPRING_DATASOURCE_USERNAME=choerodon \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.c7n-system:8000/eureka/" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://register-server.c7n-system:8000/" \
        --set env.open.SERVICES_ATTACHMENT_URL="http://minio.example.choerodon.io/agile-service/" \
        --set env.open.SERVICES_WIKI_HOST="http://wiki.example.choerodon.io" \
        --set env.open.SERVICES_WIKI_TOKEN="Choerodon" \
        --set env.open.SPRING_REDIS_HOST=c7n-redis.c7n-system.svc \
        --set env.open.SPRING_REDIS_DATABASE=9 \
        --name agile-service \
        --version 0.16.0 \
        --namespace c7n-system
    ```
    参数名 | 含义 
    --- |  --- 
    service.enable|是否创建service
    preJob.preConfig.datasource{}|初始化配置所需manager_service数据库信息
    preJob.preInitDB.datasource{}|初始化数据库所需数据库信息
    env.open.SPRING_DATASOURCE_URL|数据库链接地址
    env.open.SPRING_DATASOURCE_USERNAME|数据库用户名
    env.open.SPRING_DATASOURCE_PASSWORD|数据库密码
    env.open.SPRING_CLOUD_CONFIG_ENABLED|启用配置中心
    env.open.SPRING_CLOUD_CONFIG_URI|配置中心地址
    env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE|注册服务地址
    env.open.SERVICES_ATTACHMENT_URL|minio地址，地址中agile-service为minio bucket
    env.open.SERVICES_WIKI_HOST|wiki地址
    env.open.SERVICES_WIKI_TOKEN|wiki OIDC TOKEN，必须与xwiki中的env.OIDC_WIKI_TOKEN参数值和wiki-service中的env.open.WIKI_TOKEN参数值一致

- 验证部署
    - 验证命令

        ```
        curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=agile-service -o jsonpath="{.items[0].status.podIP}"):8379/actuator/health | jq -r .status
        ```
    - 出现以下类似信息即为成功部署
        ```
        UP
        ```

## 部署state machine service

- 部署服务

    ``` 
    helm install c7n/state-machine-service \
        --set preJob.preConfig.datasource.url="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set preJob.preConfig.datasource.username=choerodon \
        --set preJob.preConfig.datasource.password=password \
        --set preJob.preInitDB.datasource.url="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/state_machine_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set preJob.preInitDB.datasource.username=choerodon \
        --set preJob.preInitDB.datasource.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/state_machine_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set env.open.SPRING_DATASOURCE_USERNAME=choerodon \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.c7n-system:8000/eureka/" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://register-server.c7n-system:8000/" \
        --name state-machine-service \
        --version 0.16.0 \
        --namespace c7n-system
    ```
    参数名 | 含义 
    --- |  --- 
    preJob.preConfig.configFile|初始化配置文件名
    preJob.preConfig.datasource{}|初始化配置所需manager-service数据库信息
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
        curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=state-machine-service -o jsonpath="{.items[0].status.podIP}"):8385/actuator/health | jq -r .status
        ```
    - 出现以下类似信息即为成功部署
        ```
        UP
        ```


## 部署issue service

- 部署服务

    ``` 
    helm install c7n/issue-service \
        --set preJob.preConfig.datasource.url="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set preJob.preConfig.datasource.username=choerodon \
        --set preJob.preConfig.datasource.password=password \
        --set preJob.preInitDB.datasource.url="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/issue_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set preJob.preInitDB.datasource.username=choerodon \
        --set preJob.preInitDB.datasource.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/issue_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&allowMultiQueries=true" \
        --set env.open.SPRING_DATASOURCE_USERNAME=choerodon \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.c7n-system:8000/eureka/" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://register-server.c7n-system:8000/" \
        --set env.open.SERVICE_ATTACHMENT_URL="http://minio.example.choerodon.io/agile-service" \
        --name issue-service \
        --version 0.16.0 \
        --namespace c7n-system
    ```
    参数名 | 含义 
    --- |  --- 
    preJob.preConfig.datasource{}|初始化配置所需manager-service数据库信息
    preJob.preInitDB.datasource{}|初始化数据库所需数据库信息
    env.open.SPRING_DATASOURCE_URL|数据库链接地址
    env.open.SPRING_DATASOURCE_USERNAME|数据库用户名
    env.open.SPRING_DATASOURCE_PASSWORD|数据库密码
    env.open.SPRING_CLOUD_CONFIG_ENABLED|启用配置中心
    env.open.SPRING_CLOUD_CONFIG_URI|配置中心地址
    env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE|注册服务地址
    env.open.env.open.SERVICE_ATTACHMENT_URL|minio地址
    env.open.SPRING_REDIS_HOST|Redis数据库地址
    env.open.SPRING_REDIS_POST|Redis数据库端口
    
- 验证部署
    - 验证命令

        ```
        curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=issue-service -o jsonpath="{.items[0].status.podIP}"):8381/actuator/health | jq -r .status
        ```
    - 出现以下类似信息即为成功部署
        ```
        UP
        ```

## 部署foundation service

- 部署服务

    ``` 
    helm install c7n/foundation-service \
        --set preJob.preConfig.datasource.url="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set preJob.preConfig.datasource.username=choerodon \
        --set preJob.preConfig.datasource.password=password \
        --set preJob.preInitDB.datasource.url="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/foundation_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set preJob.preInitDB.datasource.username=choerodon \
        --set preJob.preInitDB.datasource.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/foundation_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&allowMultiQueries=true" \
        --set env.open.SPRING_DATASOURCE_USERNAME=choerodon \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.c7n-system:8000/eureka/" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://register-server.c7n-system:8000/" \
        --name foundation-service \
        --version 0.16.0 \
        --namespace c7n-system
    ```
    参数名 | 含义 
    --- |  --- 
    preJob.preConfig.datasource{}|初始化配置所需manager-service数据库信息
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
        curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=foundation-service -o jsonpath="{.items[0].status.podIP}"):8387/actuator/health | jq -r .status
        ```
    - 出现以下类似信息即为成功部署
        ```
        UP
        ```