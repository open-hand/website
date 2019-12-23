+++
title = "持续交付部署"
description = "持续交付部署"
weight = 20
+++

# 持续交付部署

<blockquote class="warning">
在此之前，应该准备好Mysql、Harbor、Gitlab、Minio，Chartmuseum这些组件的信息。按以下搭建顺序进行搭建，请不要随意调整搭建顺序。
</blockquote>

## 添加choerodon chart仓库

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

## 创建数据库

- 编写参数配置文件 `create-c7ncd-db.yaml`
    ```yaml
    env:
      MYSQL_HOST: c7n-mysql.c7n-system.svc
      MYSQL_PORT: "3306"
      MYSQL_USER: root
      MYSQL_PASS: password
      SQL_SCRIPT: |
        CREATE USER IF NOT EXISTS 'choerodon'@'%' IDENTIFIED BY 'password';
        CREATE DATABASE IF NOT EXISTS devops_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        CREATE DATABASE IF NOT EXISTS gitlab_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        CREATE DATABASE IF NOT EXISTS workflow_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        GRANT ALL PRIVILEGES ON devops_service.* TO choerodon@'%';
        GRANT ALL PRIVILEGES ON gitlab_service.* TO choerodon@'%';
        GRANT ALL PRIVILEGES ON workflow_service.* TO choerodon@'%';
        FLUSH PRIVILEGES;
    ```

- 执行安装
    ```shell
    helm install c7n/mysql-client \
      -f create-c7ncd-db.yaml \
      --version 0.1.0 \
      --name create-c7ncd-db \
      --namespace c7n-system
    ```

## 部署devops service
- 若需了解项目详情及各项参数含义，请移步 [choerodon/devops-service](https://github.com/choerodon/devops-service)。

- 编写参数配置文件 `devops-service.yaml`
    ```yaml
    env:
      open:
        AGENT_CERTMANAGERURL: https://openchart.choerodon.com.cn/choerodon/infra/
        AGENT_REPOURL: https://openchart.choerodon.com.cn/choerodon/c7n/
        AGENT_SERVICEURL: ws://devops.example.choerodon.io/agent/
        AGENT_VERSION: 0.20.0
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://register-server.c7n-system:8000/eureka/
        SECURITY_IGNORED: /ci,/webhook,/v2/api-docs,/agent/**,/ws/**,/webhook/**
        SERVICES_GATEWAY_URL: http://api.example.choerodon.io
        SERVICES_GITLAB_PASSWORD: password
        SERVICES_GITLAB_PROJECTLIMIT: 100
        SERVICES_GITLAB_SSHURL: gitlab.example.choerodon.io:32222
        SERVICES_GITLAB_URL: http://gitlab.example.choerodon.io
        SERVICES_HARBOR_BASEURL: https://registry.example.choerodon.io
        SERVICES_HARBOR_INSECURESKIPTLSVERIFY: true
        SERVICES_HARBOR_PASSWORD: Harbor12345
        SERVICES_HARBOR_USERNAME: admin
        SERVICES_HELM_URL: http://chart.example.choerodon.io
        SPRING_CLOUD_CONFIG_ENABLED: true
        SPRING_CLOUD_CONFIG_URI: http://register-server.c7n-system:8000/
        SPRING_DATASOURCE_PASSWORD: password
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/devops_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&allowMultiQueries=true&serverTimezone=Asia/Shanghai
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_REDIS_DATABASE: 7
        SPRING_REDIS_HOST: c7n-redis.c7n-system.svc
        TEMPLATE_URL: https://github.com/choerodon/choerodon-devops-templates.git
    ingress:
      enabled: true
      host: devops.example.choerodon.io
    preJob:
      preConfig:
        datasource:
          password: password
          url: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&allowMultiQueries=true&serverTimezone=Asia/Shanghai
          username: choerodon
      preInitDB:
        datasource:
          password: password
          url: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/devops_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&allowMultiQueries=true&serverTimezone=Asia/Shanghai
          username: choerodon
    service:
      enabled: true
    ```
- 部署服务
    ``` 
    helm install c7n/devops-service \
        -f devops-service.yaml \
        --name devops-service \
        --version 0.20.0 \
        --namespace c7n-system
    ```

- 验证部署
  - 验证命令
  
    ```
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=devops-service -o jsonpath="{.items[0].status.podIP}"):8061/actuator/health | jq -r .status
    ```

  - 出现以下类似信息即为成功部署
  
    ```
    UP
    ```

## 部署 gitlab service
- 若需了解项目详情及各项参数含义，请移步 [choerodon/gitlab-service](https://github.com/choerodon/gitlab-service)。
- 如何获取 `GITLAB_PRIVATETOKEN` 请查看[这里](http://forum.choerodon.io/t/topic/1155/2)
- 编写参数配置文件 `gitlab-service.yaml`

    ```yaml
    env:
      open:
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://register-server.c7n-system:8000/eureka/
        GITLAB_PRIVATETOKEN: Gitlab 中获取的 private token
        GITLAB_URL: http://gitlab.example.choerodon.io
        SPRING_CLOUD_CONFIG_ENABLED: true
        SPRING_CLOUD_CONFIG_URI: http://register-server.c7n-system:8000/
        SPRING_DATASOURCE_PASSWORD: password
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/gitlab_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&allowMultiQueries=true&serverTimezone=Asia/Shanghai
        SPRING_DATASOURCE_USERNAME: choerodon
    preJob:
      preConfig:
        datasource:
          password: password
          url: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&allowMultiQueries=true&serverTimezone=Asia/Shanghai
          username: choerodon
      preInitDB:
        datasource:
          password: password
          url: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/gitlab_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&allowMultiQueries=true&serverTimezone=Asia/Shanghai
          username: choerodon
    ```
- 部署服务
    ```
    helm install c7n/gitlab-service \
        -f gitlab-service.yaml \
        --name gitlab-service \
        --version 0.20.0 \
        --namespace c7n-system
    ```

- 验证部署
  - 验证命令
  
    ```
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=gitlab-service -o jsonpath="{.items[0].status.podIP}"):8071/actuator/health | jq -r .status
    ```

  - 出现以下类似信息即为成功部署
  
    ```
    UP
    ```

## 部署 workflow service
- 若需了解项目详情及各项参数含义，请移步 [choerodon/workflow-service](https://github.com/choerodon/workflow-service)。

- 编写参数配置文件 `workflow-service.yaml`
    ```yaml
    env:
      open:
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://register-server.c7n-system:8000/eureka/
        SPRING_CLOUD_CONFIG_ENABLED: true
        SPRING_CLOUD_CONFIG_URI: http://register-server.c7n-system:8000/
        SPRING_DATASOURCE_PASSWORD: password
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/workflow_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&allowMultiQueries=true&serverTimezone=Asia/Shanghai
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_REDIS_DATABASE: 8
        SPRING_REDIS_HOST: c7n-redis.c7n-system.svc
    preJob:
      preConfig:
        datasource:
          password: password
          url: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&allowMultiQueries=true&serverTimezone=Asia/Shanghai
          username: choerodon
      preInitDB:
        datasource:
          password: password
          url: jdbc:mysql://c7n-mysql.c7n-system.svc:3306/workflow_service?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&allowMultiQueries=true&serverTimezone=Asia/Shanghai
          username: choerodon
    ```
- 部署服务
    ``` 
    helm install c7n/workflow-service \
        -f workflow-service.yaml \
        --name workflow-service \
        --version 0.20.0 \
        --namespace c7n-system
    ```

- 验证部署
  - 验证命令
  
    ```
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=workflow-service -o jsonpath="{.items[0].status.podIP}"):8066/actuator/health | jq -r .status
    ```

  - 出现以下类似信息即为成功部署
  
    ```
    UP
    ```