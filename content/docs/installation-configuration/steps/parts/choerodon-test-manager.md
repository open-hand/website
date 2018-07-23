+++
title = "测试管理部署"
description = "测试管理部署"
weight = 40
+++

# 部署测试管理

<blockquote class="warning">
在此之前，应该准备好Mysql、Harbor、Kafka、Zookeeper、Gitlab、Minio，Chartmuseum这些组件的信息。按以下搭建顺序进行搭建，请不要随意调整搭建顺序。
</blockquote>

## 添加choerodon chart仓库

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

## 创建数据库

- 进入数据库

    ```bash
    # 获取pod的名称
    kubectl get po -n choerodon-devops-prod
    # 进入pod
    kubectl exec -it [mysql pod name] -n choerodon-devops-prod bash
    # 进入mysql命令行
    mysql -uroot -p${MYSQL_ROOT_PASSWORD}
    ```

- 创建choerodon所需数据库及用户并授权

    <blockquote class="note">
    部署完成后请注意保存用户名和密码。
    </blockquote>

    ```sql
    CREATE USER IF NOT EXISTS 'choerodon'@'%' IDENTIFIED BY "password";
    CREATE DATABASE IF NOT EXISTS test_manager_service DEFAULT CHARACTER SET utf8;
    GRANT ALL PRIVILEGES ON test_manager_service.* TO choerodon@'%';
    FLUSH PRIVILEGES;
    ```

## 部署test manager service所需Redis

```shell
helm install c7n/redis --name=test-manager-service-redis --namespace=choerodon-devops-prod
```

## 部署test manager service

- 部署服务

    ``` 
    helm install c7n/test-manager-service \
        --set preJob.preConfig.mysql.host=choerodon-mysql \
        --set preJob.preConfig.mysql.port=3306 \
        --set preJob.preConfig.mysql.database=manager_service \
        --set preJob.preConfig.mysql.username=choerodon \
        --set preJob.preConfig.mysql.password=password \
        --set preJob.preInitDB.mysql.host=choerodon-mysql \
        --set preJob.preInitDB.mysql.port=3306 \
        --set preJob.preInitDB.mysql.database=test_manager_service \
        --set preJob.preInitDB.mysql.username=choerodon \
        --set preJob.preInitDB.mysql.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://choerodon-mysql:3306/test_manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set env.open.SPRING_DATASOURCE_USERNAME=choerodon \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.choerodon-devops-prod:8000/eureka/" \
        --set env.open.CHOERODON_EVENT_CONSUMER_KAFKA_BOOTSTRAP_SERVERS="kafka-0.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092\,kafka-1.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092\,kafka-2.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS="kafka-0.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092\,kafka-1.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092\,kafka-2.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES="zookeeper-0.zookeeper-headless.choerodon-devops-prod.svc.cluster.local:2181\,zookeeper-1.zookeeper-headless.choerodon-devops-prod.svc.cluster.local:2181\,zookeeper-2.zookeeper-headless.choerodon-devops-prod.svc.cluster.local:2181" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://config-server.choerodon-devops-prod:8010/" \
        --set env.open.SPRING_REDIS_HOST=test-manager-service-redis.choerodon-devops-prod \
        --name=test-manager-service \
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
    env.open.SPRING_REDIS_HOST|redis 链接地址

- 验证部署
    - 验证命令

        ```
        curl -s $(kubectl get po -n choerodon-devops-prod -l choerodon.io/release=agile-service -o jsonpath="{.items[0].status.podIP}"):8094/health | jq -r .status
        ```
    - 出现以下类似信息即为成功部署
        ```
        UP
        ```

## 部署choerodon test manager front

<blockquote class="note">
若部署<a href="../choerodon-front">整合前端</a>，请忽略本小节，因为整合前端中会包含本小节部署的功能。
</blockquote>

- 部署服务

    ```
    helm install c7n/choerodon-front-test-manager \
        --set preJob.preConfig.mysql.host=choerodon-mysql \
        --set preJob.preConfig.mysql.port=3306 \
        --set preJob.preConfig.mysql.dbname=iam_service \
        --set preJob.preConfig.mysql.username=choerodon \
        --set preJob.preConfig.mysql.password=password \
        --set env.open.PRO_API_HOST="api.example.choerodon.io" \
        --set env.open.PRO_CLIENT_ID="test-manager" \
        --set env.open.PRO_TITLE_NAME="Choerodon" \
        --set env.open.PRO_HEADER_TITLE_NAME="Choerodon" \
        --set env.open.PRO_HTTP="http" \
        --set ingress.host="test-manager.choerodon.example.choerodon.io" \
        --set service.enable=true \
        --set ingress.enable=true \
        --name=choerodon-front-test-manager \
        --version=0.8.1 --namespace=choerodon-devops-prod
    ```
    参数名 | 含义 
    --- |  --- 
    preJob.preConfig.mysql{}|初始化配置所需manager_service数据库信息
    env.open.PRO_API_HOST|api地址
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
        curl $(kubectl get svc choerodon-front-test-manager -o jsonpath="{.spec.clusterIP}" -n choerodon-devops-prod)
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
            "name": "test-manager",
            "objectVersionNumber": 0,
            "organizationId": 1,
            "refreshTokenValidity": 60,
            "resourceIds": "default",
            "scope": "default",
            "secret": "secret",
            "webServerRedirectUri": "http://test-manager.choerodon.example.choerodon.io"
        }
        ```

## 数据兼容

<blockquote class="note">
若为第一次部署，请忽略本小节。本小节旨在修复老版本已产生的数据适配测试管理模块
</blockquote>

- 在访问搭建好的Choerodon的api，`api.example.choerodon.io/manager/swagger-ui.html`，选择`test_manager_service` -> `test-cycle-controller` -> `数据修复`
  - 认证请使用用户名：admin，密码：admin
  - 在project_id字段输入一个存在的项目id 例如：1
  - 提交执行，即可修复数据。