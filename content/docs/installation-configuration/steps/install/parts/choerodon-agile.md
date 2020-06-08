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

- 编写参数配置文件 `create-c7nagile-db.yaml`
    ```yaml
    env:
      MYSQL_HOST: c7n-mysql.c7n-system.svc
      MYSQL_PORT: "3306"
      MYSQL_USER: root
      MYSQL_PASS: password
      SQL_SCRIPT: |
        CREATE USER IF NOT EXISTS 'choerodon'@'%' IDENTIFIED BY 'password';
        CREATE DATABASE IF NOT EXISTS agile_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        CREATE DATABASE IF NOT EXISTS knowledgebase_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        CREATE DATABASE IF NOT EXISTS test_manager_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        GRANT ALL PRIVILEGES ON test_manager_service.* TO choerodon@'%';
        GRANT ALL PRIVILEGES ON knowledgebase_service.* TO choerodon@'%';
        GRANT ALL PRIVILEGES ON agile_service.* TO choerodon@'%';
        FLUSH PRIVILEGES;
    ```

- 执行安装

    ```shell
    helm install c7n/mysql-client \
      -f create-c7nagile-db.yaml \
      --version 0.1.0 \
      --name create-c7nagile-db \
      --namespace c7n-system
    ```

## 部署 agile service

- 若需了解项目详情及各项参数含义，请移步 [choerodon/agile-service](https://github.com/choerodon/agile-service)。

- 编写参数配置文件 `agile-service.yaml`

    <details open><summary>域名模式安装<summary>
    ```yaml
    env:
      open:
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://register-server.c7n-system:8000/eureka/
        SPRING_CLOUD_CONFIG_URI: http://register-server.c7n-system:8000/
        SPRING_DATASOURCE_PASSWORD: password
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/agile_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&allowMultiQueries=true&serverTimezone=Asia/Shanghai
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_REDIS_DATABASE: 9
        SPRING_REDIS_HOST: c7n-redis.c7n-system.svc
        SERVICES_ATTACHMENT_URL: http://minio.example.choerodon.io
    preJob:
      timeout: 1800
      preInitDB:
        datasource:
          password: password
          url: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/agile_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&allowMultiQueries=true&serverTimezone=Asia/Shanghai
          username: choerodon
    ```
    </details>
    <details><summary>nodePort模式安装</summary>
    ```yaml
    env:
      open:
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://register-server.c7n-system:8000/eureka/
        SPRING_CLOUD_CONFIG_URI: http://register-server.c7n-system:8000/
        SPRING_DATASOURCE_PASSWORD: password
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/agile_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&allowMultiQueries=true&serverTimezone=Asia/Shanghai
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_REDIS_DATABASE: 9
        SPRING_REDIS_HOST: c7n-redis.c7n-system.svc
        SERVICES_ATTACHMENT_URL: http://192.168.xx.xx:30006
    preJob:
      timeout: 1800
      preInitDB:
        datasource:
          password: password
          url: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/agile_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&allowMultiQueries=true&serverTimezone=Asia/Shanghai
          username: choerodon
    ```
    </details>

- 部署服务

    ```shell
    helm install c7n/agile-service \
      -f agile-service.yaml \
      --name agile-service \
      --version 0.21.1 \
      --namespace c7n-system
    ```

- 验证部署

  - 验证命令

    ```
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=agile-service -o jsonpath="{.items[0].status.podIP}"):8379/actuator/health | jq -r .status
    ```

  - 出现以下类似信息即为成功部署
  
    ```
    UP
    ```

## 部署 test manager service
- 若需了解项目详情及各项参数含义，请移步 [choerodon/test-manager-service](https://github.com/choerodon/test-manager-service)。

- 编写参数配置文件 `test-manager-service.yaml`

    <details open><summary>域名模式安装<summary>
    ```yaml
    env:
      open:
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://register-server.c7n-system:8000/eureka/
        SPRING_CLOUD_CONFIG_URI: http://register-server.c7n-system:8000/
        SPRING_DATASOURCE_PASSWORD: password
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/agile_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&allowMultiQueries=true&serverTimezone=Asia/Shanghai
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_REDIS_DATABASE: 9
        SPRING_REDIS_HOST: c7n-redis.c7n-system.svc
        SERVICES_ATTACHMENT_URL: http://minio.example.choerodon.io
    preJob:
      timeout: 1800
      preInitDB:
        datasource:
          password: password
          url: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/agile_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&allowMultiQueries=true&serverTimezone=Asia/Shanghai
          username: choerodon
    ```
    </details>
    <details><summary>nodePort模式安装</summary>
    ```yaml
    env:
      open:
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://register-server.c7n-system:8000/eureka/
        SPRING_CLOUD_CONFIG_URI: http://register-server.c7n-system:8000/
        SPRING_DATASOURCE_PASSWORD: password
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/agile_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&allowMultiQueries=true&serverTimezone=Asia/Shanghai
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_REDIS_DATABASE: 9
        SPRING_REDIS_HOST: c7n-redis.c7n-system.svc
        SERVICES_ATTACHMENT_URL: http://192.168.xx.xx:30006
    preJob:
      timeout: 1800
      preInitDB:
        datasource:
          password: password
          url: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/agile_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&allowMultiQueries=true&serverTimezone=Asia/Shanghai
          username: choerodon
    ```
    </details>

- 部署服务

    ```
    helm install c7n/test-manager-service \
      -f test-manager-service.yaml \
      --name test-manager-service \
      --version 0.21.1 \
      --namespace c7n-system
    ```

- 验证部署

  - 验证命令
  
    ```
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=test-manager-service -o jsonpath="{.items[0].status.podIP}"):8094/actuator/health | jq -r .status
    ```

  - 出现以下类似信息即为成功部署
  
    ```
    UP
    ```

## 安装 elasticsearch-kb

- 若需了解项目详情及各项参数含义，请移步 [choerodon/elasticsearch-kb](https://github.com/choerodon/elasticsearch-kb)。

- 安装 elasticsearch

    ```
    helm install c7n/elasticsearch-kb \
      --version 0.21.0 \
      --name elasticsearch-kb \
      --namespace c7n-system
    ```

## 部署 knowledgebase service

- 若需了解项目详情及各项参数含义，请移步 [choerodon/knowledgebase-service](https://github.com/choerodon/knowledgebase-service)。

- 编写参数配置文件 `knowledgebase-service.yaml`
    <details open> <summary>域名模式安装</summary>
    ```
    env:
      open:
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://register-server.c7n-system:8000/eureka/
        SERVICES_ATTACHMENT_URL: http://minio.example.choerodon.io/knowledgebase-service/
        SPRING_CLOUD_CONFIG_URI: http://register-server.c7n-system:8000/
        SPRING_DATASOURCE_PASSWORD: password
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/knowledgebase_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&allowMultiQueries=true&serverTimezone=Asia/Shanghai
        SPRING_DATASOURCE_USERNAME: choerodon
        ELASTICSEARCH_IP: elasticsearch-kb.c7n-system:9200
    preJob:
      timeout: 1800
      preInitDB:
        datasource:
          password: password
          url: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/knowledgebase_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&allowMultiQueries=true&serverTimezone=Asia/Shanghai
          username: choerodon
      preConfig:
        updatePolicy: override  
    ```
    </details>
    <details><summary>nodePort模式安装</summary>
    ```
    env:
      open:
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://register-server.c7n-system:8000/eureka/
        SERVICES_ATTACHMENT_URL: http://192.168.xx.xx:30006/knowledgebase-service/
        SPRING_CLOUD_CONFIG_URI: http://register-server.c7n-system:8000/
        SPRING_DATASOURCE_PASSWORD: password
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/knowledgebase_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&allowMultiQueries=true&serverTimezone=Asia/Shanghai
        SPRING_DATASOURCE_USERNAME: choerodon
        ELASTICSEARCH_IP: elasticsearch-kb.c7n-system:9200
    preJob:
      timeout: 1800
      preInitDB:
        datasource:
          password: password
          url: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/knowledgebase_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&allowMultiQueries=true&serverTimezone=Asia/Shanghai
          username: choerodon
      preConfig:
        updatePolicy: override
    ```
    </details>

- 部署服务

    ``` 
    helm install c7n/knowledgebase-service \
      -f knowledgebase-service.yaml \
      --name knowledgebase-service \
      --version 0.21.0 \
      --namespace c7n-system
    ```

- 验证部署

  - 验证命令
  
    ```
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=knowledgebase-service -o jsonpath="{.items[0].status.podIP}"):8281/actuator/health | jq -r .status
    ```

  - 出现以下类似信息即为成功部署
  
    ```
    UP
    ```
