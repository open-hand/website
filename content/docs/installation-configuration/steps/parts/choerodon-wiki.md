+++
title = "知识管理部署"
description = "知识管理部署"
weight = 41
+++

# 部署知识管理

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
    CREATE DATABASE IF NOT EXISTS wiki_service DEFAULT CHARACTER SET utf8;
    CREATE DATABASE IF NOT EXISTS xwiki DEFAULT CHARACTER SET utf8;
    GRANT ALL PRIVILEGES ON wiki_service.* TO choerodon@'%';
    GRANT ALL PRIVILEGES ON xwiki.* TO choerodon@'%';
    FLUSH PRIVILEGES;
    ```

## 部署xwiki

- 创建数据卷

    <blockquote class="note">
    创建之前请在nfs服务器对应位置创建相应的目录。
    </blockquote>

    ```bash
    helm install c7n/create-pv \
    --set type=nfs \
    --set pv.name=wiki-pv \
    --set nfs.path=/u01/wiki \
    --set nfs.server=nfs.example.com \
    --set pvc.name=wiki-pvc \
    --set size=50Gi \
    --set accessModes={ReadWriteMany} \
    --name wiki-pv --namespace=choerodon-devops-prod
    ```

- 部署xwiki

    <blockquote class="note">
    部署xwiki需要初始化一些数据，安装需要几分钟，请耐心等待,部署完成后需要根据指定的客户端到Choerodon添加对应的客户端。Choerodon创建客户端时不选择scope，请在创建完成后编辑Scope
    </blockquote>

    ```bash
    helm install c7n/xwiki \
        --set env.DB_USER=choerodon \
        --set env.DB_PASSWORD=password \
        --set env.DB_HOST=choerodon-mysql \
        --set env.DB_DATABASE=xwiki \
        --set env.OIDC_ENDPOINT_AUTHORIZATION=http://api.example.choerodon.io/oauth/oauth/authorize \
        --set env.OIDC_ENDPOINT_TOKEN=http://api.example.choerodon.io/oauth/oauth/token \
        --set env.OIDC_ENDPOINT_USERINFO=http://api.example.choerodon.io/oauth/api/user \
        --set env.OIDC_CLIENTID=wiki \
        --set env.OIDC_SECRET=secret \
        --set env.OIDC_WIKI_TOKEN=Choerodon \
        --set persistence.enabled=true \
        --set persistence.existingClaim=wiki-pvc \
        --set service.enabled=true \
        --set ingress.enabled=true \
        --set "ingress.hosts[0]"=wiki.example.choerodon.io \
        --name=xwiki \
        --namespace=choerodon-devops-prod
    ```

    参数名 | 含义 
    --- |  --- 
    env.DB_USER | 数据库用户名
    env.DB_PASSWORD|数据库密码
    env.DB_HOST|数据库地址
    env.DB_DATABASE|数据库
    env.OIDC_ENDPOINT_AUTHORIZATION|OIDC认证地址
    env.env.OIDC_ENDPOINT_TOKEN|OIDC TOKEN校验地址
    env.OIDC_ENDPOINT_USERINFO|OIDC用户信息地址
    env.OIDC_CLIENTID|OIDC客户端
    env.OIDC_SECRET|OIDC秘钥
    env.OIDC_WIKI_TOKEN|OIDC TOKEN
    service.enabled|创建service对象
    ingress.enable|创建ingress对象
    ingress.hosts|wiki域名地址

- 部署知识管理后端

    ```bash
    helm install c7n/wiki-service \
        --set preJob.preConfig.mysql.host=choerodon-mysql \
        --set preJob.preConfig.mysql.port=3306 \
        --set preJob.preConfig.mysql.database=manager_service \
        --set preJob.preConfig.mysql.username=choerodon \
        --set preJob.preConfig.mysql.password=password \
        --set preJob.preInitDB.mysql.host=choerodon-mysql \
        --set preJob.preInitDB.mysql.port=3306 \
        --set preJob.preInitDB.mysql.database=wiki_service \
        --set preJob.preInitDB.mysql.username=choerodon \
        --set preJob.preInitDB.mysql.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://choerodon-mysql:3306/wiki_service?useUnicode=true&  characterEncoding=utf-8&useSSL=false" \
        --set env.open.SPRING_DATASOURCE_USERNAME=choerodon \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.choerodon-devops-prod:8000/eureka/" \
        --set env.open.EUREKA_DEFAULT_ZONE=http://register-server.choerodon-devops-prod:8000/eureka/ \
        --set env.open.CHOERODON_EVENT_CONSUMER_KAFKA_BOOTSTRAP_SERVERS="kafka-0.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092\,kafka-1.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092\,kafka-2.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS="kafka-0.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092\,kafka-1.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092\,kafka-2.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092" \
        --set env.open.SPRING_KAFKA_BOOTSTRAP_SERVERS="kafka-0.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092\,kafka-1.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092\,kafka-2.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES="zookeeper-0.zookeeper-headless.choerodon-devops-prod.svc.cluster.local:2181\,zookeeper-1.zookeeper-headless.choerodon-devops-prod.svc.cluster.local:2181\,zookeeper-2.zookeeper-headless.choerodon-devops-prod.svc.cluster.local:2181" \
        --set env.open.SPRING_KAFKA_PRODUCER_VALUE_SERIALIZER=org.apache.kafka.common.serialization.ByteArraySerializer \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI=http://config-server.choerodon-devops-prod:8010/ \
        --set env.open.WIKI_CLIENT=xwiki \
        --set env.open.WIKI_URL=http://wiki.example.choerodon.io \
        --set env.open.WIKI_TOKEN=Choerodon \
        --set env.open.WIKI_DEFAULT_GROUP=XWikiAllGroup \
        --name=wiki-service \
        --version=0.9.0 \
        --namespace=choerodon-devops-prod
    ```

    参数名 | 含义 
    --- |  --- 
    preJob.preConfig.mysql{}|初始化配置所需manager_service数据库信息
    env.open.SPRING_CLOUD_CONFIG_ENABLED|启用配置中心
    env.open.SPRING_CLOUD_CONFIG_URI|配置中心地址
    env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE|注册服务地址
    env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS|kafk地址
    env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES|zookeeper地址

- 同步已有项目和组织

    服务部署完成之后，访问Swagger-ui,在服务选择列表中选择wiki-service,打开wiki-scanning-controller，使用同步方法。
    1.同步指定的组织和项目：根据组织id同步该组织以及组织下的项目到wiki。
    2.扫描组织和项目：同步所有的组织和项目到wiki。
    注：同步会在后台执行，请耐心等待同步完成。