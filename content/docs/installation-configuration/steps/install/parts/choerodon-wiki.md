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
            CREATE DATABASE IF NOT EXISTS wiki_service DEFAULT CHARACTER SET utf8;\
            CREATE DATABASE IF NOT EXISTS xwiki DEFAULT CHARACTER SET utf8;\
            GRANT ALL PRIVILEGES ON wiki_service.* TO choerodon@'%';\
            GRANT ALL PRIVILEGES ON xwiki.* TO choerodon@'%';\
            FLUSH PRIVILEGES;" \
    --version 0.1.0 \
    --name create-c7nwiki-db \
    --namespace c7n-system
```

## 部署xwiki

- 创建数据卷

    ```bash
    helm install c7n/persistentvolumeclaim \
        --set accessModes={ReadWriteMany} \
        --set requests.storage=5Gi \
        --set storageClassName=nfs-provisioner \
        --version 0.1.0 \
        --name wiki-pvc \
        --namespace c7n-system
    ```

- 部署xwiki

    <blockquote class="note">
    部署xwiki需要初始化一些数据，安装需要几分钟，请耐心等待。
    </blockquote>

    ```bash
    helm install c7n/xwiki \
        --set env.JAVA_OPTS=-Xmx4096m \
        --set env.DB_USER=choerodon \
        --set env.DB_PASSWORD=password \
        --set env.DB_HOST=c7n-mysql.c7n-system.svc \
        --set env.DB_PORT=3306 \
        --set env.DB_DATABASE=xwiki \
        --set env.OIDC_ENDPOINT_AUTHORIZATION=http://api.example.choerodon.io/oauth/oauth/authorize \
        --set env.OIDC_ENDPOINT_TOKEN=http://api.example.choerodon.io/oauth/oauth/token \
        --set env.OIDC_ENDPOINT_USERINFO=http://api.example.choerodon.io/iam/v1/users/self \
        --set env.OIDC_ENDPOINT_LOGOUT=http://api.example.choerodon.io/oauth/logout \
        --set env.CHOERODON_REQUEST_API_URL=http://api.example.choerodon.io \
        --set env.CHOERODON_REQUEST_FRONT_URL=http://c7n.example.choerodon.io \
        --set env.OIDC_CLIENTID=wiki \
        --set env.OIDC_SECRET=secret \
        --set env.OIDC_WIKI_TOKEN=Choerodon \
        --set persistence.enabled=true \
        --set persistence.existingClaim=wiki-pvc \
        --set service.enabled=true \
        --set ingress.enabled=true \
        --set "ingress.hosts[0]"=wiki.example.choerodon.io \
        --timeout 3000 \
        --name xwiki \
        --version 0.14.1 \
        --namespace c7n-system
    ```

    参数名 | 含义 
    --- |  --- 
    env.JAVA_OPTS | JVM相关运行参数
    env.DB_USER | 数据库用户名
    env.DB_PASSWORD|数据库密码
    env.DB_HOST|数据库地址
    env.DB_PORT|数据库端口，默认3306
    env.DB_DATABASE|数据库
    env.OIDC_ENDPOINT_AUTHORIZATION|OIDC认证地址
    env.OIDC_ENDPOINT_TOKEN|OIDC TOKEN校验地址
    env.OIDC_ENDPOINT_USERINFO|OIDC用户信息地址
    env.OIDC_ENDPOINT_LOGOUT|OAuth登出地址
    env.CHOERODON_REQUEST_API_URL| 网关的域名地址
    env.CHOERODON_REQUEST_FRONT_URL| 前端地址
    env.OIDC_CLIENTID|OIDC客户端
    env.OIDC_SECRET|OIDC秘钥
    env.OIDC_WIKI_TOKEN|OIDC TOKEN，必须agile-service中的env.open.SERVICES_WIKI_TOKEN参数值一致
    service.enabled|创建service对象
    ingress.enable|创建ingress对象
    ingress.hosts|wiki域名地址


    - 校验安装：
    安装完成后打开配置的域名如果安装成功会返回xwiki的界面。

- 添加oauth client

    ```
    helm install c7n/mysql-client \
        --set env.MYSQL_HOST=c7n-mysql.c7n-system.svc \
        --set env.MYSQL_PORT=3306 \
        --set env.MYSQL_USER=root \
        --set env.MYSQL_PASS=password \
        --set env.SQL_SCRIPT="\
                INSERT INTO iam_service.oauth_client (\
                name\,organization_id\,resource_ids\,secret\,scope\,\
                authorized_grant_types\,web_server_redirect_uri\,\
                access_token_validity\,refresh_token_validity\,\
                additional_information\,auto_approve\,object_version_number\,\
                created_by\,creation_date\,last_updated_by\,last_update_date)\
                VALUES('wiki'\,1\,'default'\,'secret'\,'default'\,\
                'password\,implicit\,client_credentials\,authorization_code\,refresh_token'\,\
                'http://wiki.example.choerodon.io/oidc/authenticator/callback'\,3600\,3600\,'{}'\,'default'\,1\,0\,NOW()\,0\,NOW());" \
        --version 0.1.0 \
        --name c7n-wiki-client \
        --namespace c7n-system
    ```

- 部署知识管理后端

    ```bash
    helm install c7n/wiki-service \
        --set env.open.JAVA_OPTS="-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap" \
        --set preJob.preConfig.mysql.host=c7n-mysql.c7n-system.svc \
        --set preJob.preConfig.mysql.port=3306 \
        --set preJob.preConfig.mysql.database=manager_service \
        --set preJob.preConfig.mysql.username=choerodon \
        --set preJob.preConfig.mysql.password=password \
        --set preJob.preInitDB.mysql.host=c7n-mysql.c7n-system.svc \
        --set preJob.preInitDB.mysql.port=3306 \
        --set preJob.preInitDB.mysql.database=wiki_service \
        --set preJob.preInitDB.mysql.username=choerodon \
        --set preJob.preInitDB.mysql.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/wiki_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set env.open.SPRING_DATASOURCE_USERNAME=choerodon \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.c7n-system:8000/eureka/" \
        --set env.open.EUREKA_DEFAULT_ZONE=http://register-server.c7n-system:8000/eureka/ \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI=http://config-server.c7n-system:8010/ \
        --set env.open.WIKI_CLIENT=xwiki \
        --set env.open.WIKI_URL=http://wiki.example.choerodon.io \
        --set env.open.WIKI_TOKEN=Choerodon \
        --set env.open.WIKI_DEFAULT_GROUP=XWikiAllGroup \
        --name wiki-service \
        --version 0.14.0 \
        --namespace c7n-system
    ```

    参数名 | 含义 
    --- |  --- 
    preJob.preConfig.mysql{}|初始化配置所需manager_service数据库信息
    env.open.SPRING_CLOUD_CONFIG_ENABLED|启用配置中心
    env.open.SPRING_CLOUD_CONFIG_URI|配置中心地址
    env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE|注册服务地址
    env.open.WIKI_TOKEN|wiki-service的env.open.WIKI_TOKEN，必须与xwiki中的env.OIDC_WIKI_TOKEN参数值和agile-service中的env.open.SERVICES_WIKI_TOKEN参数值一致

- 验证部署
    - 验证命令

        ```
        curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=wiki-service -o jsonpath="{.items[0].status.podIP}"):9991/health | jq -r .status
        ```
    - 出现以下类似信息即为成功部署
        ```
        UP
        ```


## 同步已有项目和组织

1. 服务部署完成之后，使用有平台管理员角色的用户登录`Choerodon`平台，点击顶部导航栏的管理按钮，选择`API管理`菜单下的`API测试`。
2. 找到微服务`wiki-service`下0.14.0版本的接口，打开`wiki-scanning-controller`，使用`/v1/site/scan`接口，点击`发送`之后，就会同步所有的组织和项目到新部署的wiki。
    
        注：同步会在后台执行，请耐心等待同步完成。