+++
title = "持续交付部署"
description = "持续交付部署"
weight = 20
+++

# 持续交付部署

<blockquote class="warning">
在此之前，应该准备好Mysql、Harbor、Kafka、Zookeeper、Gitlab、Minio，Chartmuseum这些组件的信息。按以下搭建顺序进行搭建，请不要随意调整搭建顺序。
</blockquote>

## 添加choerodon chart仓库

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

## 部署devops service

<blockquote class="warning">
choerodon devops service需要与Chartmuseum共用存储，所以choerodon devops service的PV物理目录与Chartmuseum的PV物理目录必须一致。
</blockquote>

- 部署服务

    ``` 
    helm install c7n/devops-service \
        --set preJob.preConfig.mysql.host=choerodon-mysql \
        --set preJob.preConfig.mysql.port=3306 \
        --set preJob.preConfig.mysql.database=manager_service \
        --set preJob.preConfig.mysql.username=choerodon \
        --set preJob.preConfig.mysql.password=password \
        --set preJob.preInitDB.mysql.host=choerodon-mysql \
        --set preJob.preInitDB.mysql.port=3306 \
        --set preJob.preInitDB.mysql.database=devops_service \
        --set preJob.preInitDB.mysql.username=choerodon \
        --set preJob.preInitDB.mysql.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://choerodon-mysql:3306/devops_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set env.open.SPRING_DATASOURCE_USERNAME=choerodon \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.choerodon-devops-prod:8000/eureka/" \
        --set env.open.SPRING_REDIS_HOST=devops-redis \
        --set env.open.CHOERODON_EVENT_CONSUMER_KAFKA_BOOTSTRAP_SERVERS="kafka-0.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092\,kafka-1.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092\,kafka-2.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS="kafka-0.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092\,kafka-1.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092\,kafka-2.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES="zookeeper-0.zookeeper-headless.choerodon-devops-prod.svc.cluster.local:2181\,zookeeper-1.zookeeper-headless.choerodon-devops-prod.svc.cluster.local:2181\,zookeeper-2.zookeeper-headless.choerodon-devops-prod.svc.cluster.local:2181" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://config-server.choerodon-devops-prod:8010/" \
        --set env.open.SERVICES_HARBOR_BASEURL="https://harbor.example.choerodon.io" \
        --set env.open.SERVICES_HARBOR_USERNAME=admin \
        --set env.open.SERVICES_HARBOR_PASSWORD="Harbor12345" \
        --set env.open.SERVICES_HELM_URL="http://chart.example.choerodon.io" \
        --set env.open.SERVICES_GITLAB_URL="https://code.example.choerodon.io" \
        --set env.open.SERVICES_GITLAB_PASSWORD=password \
        --set env.open.SERVICES_GITLAB_PROJECTLIMIT=100 \
        --set env.open.SERVICES_GATEWAY_URL=http://api.example.choerodon.io \
        --set env.open.SERVICES_SONARQUBE_URL=http://sonarqube.example.choerodon.io \
        --set env.open.SECURITY_IGNORED="/ci\,/webhook\,/v2/api-docs\,/agent/**\,/ws/**" \
        --set env.open.AGENT_VERSION="0.8.0" \
        --set env.open.AGENT_REPOURL="https://openchart.choerodon.com.cn/choerodon/c7n/" \
        --set env.open.AGENT_SERVICEURL="ws://devops.service.example.choerodon.io/agent/" \
        --set env.open.TEMPLATE_VERSION_MICROSERVICE="0.7.0" \
        --set env.open.TEMPLATE_VERSION_MICROSERVICEFRONT="0.7.0" \
        --set env.open.TEMPLATE_VERSION_JAVALIB="0.7.0" \
        --set ingress.enable=true \
        --set ingress.host=devops.service.example.choerodon.io \
        --set service.enable=true \
        --set persistence.enabled=true \
        --set persistence.existingClaim="devops-service-pvc" \
        --name=devops-service \
        --version=0.8.0 --namespace=choerodon-devops-prod
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
    env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS|kafk地址
    env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES|zookeeper地址
    env.open.SERVICES_HARBOR_BASEURL|harbor地址
    env.open.SERVICES_HARBOR_USERNAME|harbor用户名
    env.open.SERVICES_HARBOR_PASSWORD|harbor密码
    env.open.SERVICES_HELM_URL|chartmuseum地址
    env.open.SERVICES_GITLAB_URL|gitlab地址
    env.open.SERVICES_GITLAB_PASSWORD|通过choerodon平台创建的gitlab用户初始密码
    env.open.SERVICES_GITLAB_PROJECTLIMIT|通过choerodon平台创建的gitlab可创建项目上限
    env.open.AGENT_VERSION|与当前Devops Service相匹配的Agent版本，不需要修改
    env.open.AGENT_REPOURL|Agent Chart包远程仓库，不需要修改
    env.open.AGENT_SERVICEURL|Agent与Devops Service进行链接的webSocket地址，主机域名与ingress.host相同
    env.open.TEMPLATE_VERSION_MICROSERVICE| 预定义微服务后端模板的版本
    env.open.TEMPLATE_VERSION_MICROSERVICEFRONT| 预定义微服务前端模板的版本
    env.open.TEMPLATE_VERSION_JAVALIB| 预定义java lib的版本
    persistence.enabled|启用持久化存储
    persistence.existingClaim|一定与chartmuseum挂载出来的目录相同
    service.enable|启用service
    ingress.enable|启用域名
    ingress.host|设置域名，这里不要加http前缀

- 验证部署
    - 验证命令

        ```
        curl -s $(kubectl get po -n choerodon-devops-prod -l choerodon.io/release=devops-service -o jsonpath="{.items[0].status.podIP}"):8061/health | jq -r .status
        ```
    - 出现以下类似信息即为成功部署
        ```
        UP
        ```

## 部署gitlab service
- 部署服务

    ```
    helm install c7n/gitlab-service \
        --set preJob.preConfig.mysql.host=choerodon-mysql \
        --set preJob.preConfig.mysql.port=3306 \
        --set preJob.preConfig.mysql.database=manager_service \
        --set preJob.preConfig.mysql.username=choerodon \
        --set preJob.preConfig.mysql.password=password \
        --set preJob.preInitDB.mysql.host=choerodon-mysql \
        --set preJob.preInitDB.mysql.port=3306 \
        --set preJob.preInitDB.mysql.database=gitlab_service \
        --set preJob.preInitDB.mysql.username=choerodon \
        --set preJob.preInitDB.mysql.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://choerodon-mysql:3306/gitlab_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set env.open.SPRING_DATASOURCE_USERNAME=choerodon \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.choerodon-devops-prod:8000/eureka/" \
        --set env.open.CHOERODON_EVENT_CONSUMER_KAFKA_BOOTSTRAP_SERVERS="kafka-0.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092\,kafka-1.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092\,kafka-2.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS="kafka-0.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092\,kafka-1.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092\,kafka-2.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES="zookeeper-0.zookeeper-headless.choerodon-devops-prod.svc.cluster.local:2181\,zookeeper-1.zookeeper-headless.choerodon-devops-prod.svc.cluster.local:2181\,zookeeper-2.zookeeper-headless.choerodon-devops-prod.svc.cluster.local:2181" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://config-server.choerodon-devops-prod:8010/" \
        --set env.open.GITLAB_URL="https://code.example.choerodon.io" \
        --set env.open.GITLAB_PRIVATETOKEN="choerodon-gitlab-token" \
        --name=gitlab-service \
        --version=0.8.0 --namespace=choerodon-devops-prod
    ```
    参数名 | 含义 
    --- |  --- 
    preJob.preConfig.mysql{}|初始化配置所需manager_service数据库信息
    preJob.preInitDB.mysql{}|初始化数据库所需数据库信息
    env.open.SPRING_DATASOURCE_URL|数据库链接地址
    env.open.SPRING_DATASOURCE_USERNAME|数据库用户名
    env.open.SPRING_DATASOURCE_PASSWORD|数据库密码
    env.open.SPRING_CLOUD_CONFIG_ENABLED|启用配置中心
    env.open.SPRING_CLOUD_CONFIG_URI|配置中心地址
    env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE|注册服务地址
    env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS|kafk地址
    env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES|zookeeper地址
    env.open.GITLAB_URL|gitlab地址
    env.open.GITLAB_PRIVATETOKEN|gitlab admin用户token

- 验证部署
    - 验证命令

        ```
        curl -s $(kubectl get po -n choerodon-devops-prod -l choerodon.io/release=gitlab-service -o jsonpath="{.items[0].status.podIP}"):8071/health | jq -r .status
        ```
    - 出现以下类似信息即为成功部署
        ```
        UP
        ```

## 部署choerodon devops front
- 部署服务

    ```
    helm install c7n/choerodon-front-devops \
        --set preJob.preConfig.mysql.host=choerodon-mysql \
        --set preJob.preConfig.mysql.port=3306 \
        --set preJob.preConfig.mysql.dbname=iam_service \
        --set preJob.preConfig.mysql.username=choerodon \
        --set preJob.preConfig.mysql.password=password \
        --set env.open.PRO_API_HOST="api.example.choerodon.io" \
        --set env.open.PRO_DEVOPS_HOST="ws://devops.service.example.choerodon.io" \
        --set env.open.PRO_CLIENT_ID="devops" \
        --set env.open.PRO_TITLE_NAME="Choerodon" \
        --set env.open.PRO_HEADER_TITLE_NAME="Choerodon" \
        --set env.open.PRO_HTTP="http" \
        --set env.open.PRO_FILE_SERVER="http://minio.example.com" \
        --set ingress.host="devops.choerodon.example.choerodon.io" \
        --set service.enable=true \
        --set ingress.enable=true \
        --name=choerodon-front-devops \
        --version=0.8.0 --namespace=choerodon-devops-prod
    ```
    参数名 | 含义 
    --- |  --- 
    preJob.preConfig.mysql{}|初始化配置所需manager_service数据库信息
    env.open.PRO_API_HOST|api地址
    env.open.PRO_DEVOPS_HOST|devops service地址
    env.open.PRO_CLIENT_ID|client id
    env.open.PRO_TITLE_NAME|页面显示标题
    env.open.PRO_HEADER_TITLE_NAME|页面header标题
    env.open.PRO_HTTP|使用协议
    service.enable|创建service对象
    ingress.enable|创建ingress对象
    ingress.host|域名地址，此处不能带http://

- 验证部署
    - 验证命令

        ```
        curl $(kubectl get svc choerodon-front-devops -o jsonpath="{.spec.clusterIP}" -n choerodon-devops-prod)
        ```
    - 出现以下类似信息即为成功部署

        ```html
        <!DOCTYPE html><html><head><meta http-equiv="Content-type"content="text/html; charset=utf-8"><title>Choerodon</title><link rel="shortcut icon"href="favicon.ico"></head><body><div id="app"></div><script type="text/javascript"src="app/vendor_19e4b950.js"></script><script type="text/javascript"src="app/main_19e4b950.js"></script></body></html>
        ```

- 在访问搭建好的Choerodon的api，`api.example.choerodon.io/manager/swagger-ui.html`，选择`iam_service` -> `client-controller` -> `创建client`
  - 认证请使用用户名：admin，密码：admin
  - 提交以下数据，注意正式搭建时请替换以下值为真实值
      
        ```json
        {
            "accessTokenValidity": 60,
            "additionalInformation": "",
            "authorizedGrantTypes": "implicit,client_credentials,authorization_code,refresh_token",
            "autoApprove": "default",
            "name": "devops",
            "objectVersionNumber": 0,
            "organizationId": 1,
            "refreshTokenValidity": 60,
            "resourceIds": "default",
            "scope": "default",
            "secret": "secret",
            "webServerRedirectUri": "http://devops.choerodon.example.choerodon.io"
        }
        ```