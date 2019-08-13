+++
title = "知识管理部署"
description = "知识管理部署"
weight = 41
+++

# 部署知识管理

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
            CREATE DATABASE IF NOT EXISTS knowledgebase_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\
            GRANT ALL PRIVILEGES ON knowledgebase_service.* TO choerodon@'%';\
            FLUSH PRIVILEGES;" \
    --version 0.1.0 \
    --name create-c7nknowledge-db \
    --namespace c7n-system
```

## 部署基础知识服务

- 部署服务

    ``` 
    helm install c7n/knowledgebase-service \
        --set preJob.preConfig.datasource.url="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set preJob.preConfig.datasource.username=choerodon \
        --set preJob.preConfig.datasource.password=password \
        --set preJob.preInitDB.datasource.url="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/knowledgebase_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set preJob.preInitDB.datasource.username=choerodon \
        --set preJob.preInitDB.datasource.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/knowledgebase_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&allowMultiQueries=true" \
        --set env.open.SPRING_DATASOURCE_USERNAME=choerodon \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.c7n-system:8000/eureka/" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://register-server.c7n-system:8000/" \
        --set env.open.SERVICES_ATTACHMENT_URL="http://minio.example.choerodon.io/knowledgebase-service/" \
        --set env.open.WIKI_URL="http://wiki.example.com" \
        --set env.open.WIKI_TOKEN="Choerodon" \
        --name knowledgebase-service \
        --version 0.18.5 \
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
    env.open.SERVICES_ATTACHMENT_URL|minio地址，地址中knowledgebase-service为minio bucket
    env.open.WIKI_URL|wiki地址
    env.open.WIKI_TOKEN|wiki OIDC TOKEN，必须与xwiki中的env.OIDC_WIKI_TOKEN参数值和wiki-service中的env.open.WIKI_TOKEN参数值一致

- 验证部署
  - 验证命令

      ```
      curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=knowledgebase-service -o jsonpath="{.items[0].status.podIP}"):8281/actuator/health | jq -r .status
      ```

  - 出现以下类似信息即为成功部署

      ```
      UP
      ```