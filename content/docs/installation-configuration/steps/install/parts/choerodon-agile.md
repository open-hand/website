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
          CREATE DATABASE IF NOT EXISTS agile_service DEFAULT CHARACTER SET utf8;\
          CREATE DATABASE IF NOT EXISTS state_machine_service DEFAULT CHARACTER SET utf8;\
          CREATE DATABASE IF NOT EXISTS issue_service DEFAULT CHARACTER SET utf8;\
          GRANT ALL PRIVILEGES ON agile_service.* TO choerodon@'%'; \
          GRANT ALL PRIVILEGES ON state_machine_service.* TO choerodon@'%';\
          GRANT ALL PRIVILEGES ON issue_service.* TO choerodon@'%';\
          FLUSH PRIVILEGES;" \
    --version 0.1.0 \
    --name create-c7nagile-db \
    --namespace c7n-system
```

## 部署agile service

- 部署服务

    ``` 
    helm install c7n/agile-service \
        --set env.open.JAVA_OPTS="-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap" \
        --set preJob.preConfig.mysql.host=c7n-mysql.c7n-system.svc \
        --set preJob.preConfig.mysql.port=3306 \
        --set preJob.preConfig.mysql.database=manager_service \
        --set preJob.preConfig.mysql.username=choerodon \
        --set preJob.preConfig.mysql.password=password \
        --set preJob.preInitDB.enable=true \
        --set preJob.preInitDB.mysql.host=c7n-mysql.c7n-system.svc \
        --set preJob.preInitDB.mysql.port=3306 \
        --set preJob.preInitDB.mysql.database=agile_service \
        --set preJob.preInitDB.mysql.username=choerodon \
        --set preJob.preInitDB.mysql.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/agile_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set env.open.SPRING_DATASOURCE_USERNAME=choerodon \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.c7n-system:8000/eureka/" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://config-server.c7n-system:8010/" \
        --set env.open.SERVICES_ATTACHMENT_URL="http://minio.example.choerodon.io/agile-service/" \
        --set env.open.SERVICES_WIKI_HOST="http://wiki.example.choerodon.io" \
        --set env.open.SERVICES_WIKI_TOKEN="Choerodon" \
        --set env.open.SPRING_REDIS_HOST=c7n-redis.c7n-system.svc \
        --set env.open.SPRING_REDIS_DATABASE=4 \
        --name agile-service \
        --version 0.12.0 \
        --namespace c7n-system
    ```
    参数名 | 含义 
    --- |  --- 
    service.enable|是否创建service
    preJob.preConfig.mysql{}|初始化配置所需manager_service数据库信息
    preJob.preInitDB.mysql{}|初始化数据库所需数据库信息
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
        curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=agile-service -o jsonpath="{.items[0].status.podIP}"):8379/health | jq -r .status
        ```
    - 出现以下类似信息即为成功部署
        ```
        UP
        ```

## 部署state machine service

- 部署服务

    ``` 
    helm install c7n/state-machine-service \
        --set env.open.JAVA_OPTS="-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap" \
        --set preJob.preConfig.configFile="application.yml" \
        --set preJob.preConfig.mysql.host=c7n-mysql.c7n-system.svc \
        --set preJob.preConfig.mysql.port=3306 \
        --set preJob.preConfig.mysql.database=manager_service \
        --set preJob.preConfig.mysql.username=choerodon \
        --set preJob.preConfig.mysql.password=password \
        --set preJob.preInitDB.mysql.host=c7n-mysql.c7n-system.svc \
        --set preJob.preInitDB.mysql.port=3306 \
        --set preJob.preInitDB.mysql.database=state_machine_service \
        --set preJob.preInitDB.mysql.username=choerodon \
        --set preJob.preInitDB.mysql.password=password \
        --set deployment.managementPort=8385 \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/state_machine_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set env.open.SPRING_DATASOURCE_USERNAME=choerodon \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.c7n-system:8000/eureka/" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://config-server.c7n-system:8010/" \
        --name state-machine-service \
        --version 0.12.0 \
        --namespace c7n-system
    ```
    参数名 | 含义 
    --- |  --- 
    preJob.preConfig.configFile|初始化配置文件名
    preJob.preConfig.mysql{}|初始化配置所需manager-service数据库信息
    preJob.preInitDB.mysql{}|初始化数据库所需数据库信息
    env.open.SPRING_DATASOURCE_URL|数据库链接地址
    env.open.SPRING_DATASOURCE_USERNAME|数据库用户名
    env.open.SPRING_DATASOURCE_PASSWORD|数据库密码
    deployment.managementPort|开放端口号
    env.open.SPRING_CLOUD_CONFIG_ENABLED|启用配置中心
    env.open.SPRING_CLOUD_CONFIG_URI|配置中心地址
    env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE|注册服务地址

- 验证部署
    - 验证命令

        ```
        curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=state-machine-service -o jsonpath="{.items[0].status.podIP}"):8385/health | jq -r .status
        ```
    - 出现以下类似信息即为成功部署
        ```
        UP
        ```


## 部署issue service

- 部署服务

    ``` 
    helm install c7n/issue-service \
        --set env.open.JAVA_OPTS="-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap" \
        --set preJob.preConfig.configFile="application.yml" \
        --set preJob.iamge="registry.cn-hangzhou.aliyuncs.com/choerodon-tools/dbtool:0.5.2" \
        --set preJob.preConfig.enable=true \
        --set preJob.preConfig.mysql.host=c7n-mysql.c7n-system.svc \
        --set preJob.preConfig.mysql.port=3306 \
        --set preJob.preConfig.mysql.database=manager_service \
        --set preJob.preConfig.mysql.username=choerodon \
        --set preJob.preConfig.mysql.password=password \
        --set preJob.preInitDB.mysql.host=c7n-mysql.c7n-system.svc \
        --set preJob.preInitDB.mysql.port=3306 \
        --set preJob.preInitDB.mysql.database=issue_service \
        --set preJob.preInitDB.mysql.username=choerodon \
        --set preJob.preInitDB.mysql.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/issue_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&allowMultiQueries=true" \
        --set env.open.SPRING_DATASOURCE_USERNAME=choerodon \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.c7n-system:8000/eureka/" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://config-server.c7n-system:8010/" \
        --set env.open.SERVICE_ATTACHMENT_URL="http://minio.example.choerodon.io/agile-service" \
        --name issue-service \
        --version 0.12.0 \
        --namespace c7n-system
    ```
    参数名 | 含义 
    --- |  --- 
    preJob.preConfig.configFile|初始化配置文件名
    preJob.iamge|preJob镜像地址
    preJob.preConfig.enable|是否开启初始化配置
    preJob.preConfig.mysql{}|初始化配置所需manager-service数据库信息
    preJob.preInitDB.mysql{}|初始化数据库所需数据库信息
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
        curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=issue-service -o jsonpath="{.items[0].status.podIP}"):8381/health | jq -r .status
        ```
    - 出现以下类似信息即为成功部署
        ```
        UP
        ```
