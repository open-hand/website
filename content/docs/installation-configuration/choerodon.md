+++
title = "Choerodon安装"
description = "Choerodon安装"
weight = 60
+++

## 部署Choerodon

### 一键安装脚本

- 新建`values.sh`文件，粘贴以下内容后按注释进行修改后保存。注意正式搭建时请替换以下值为真实值。

    ```bash
    # 仅debug不真实安装，删除此变量则进行正式安装
    DEBUG="--debug --dry-run"
    # 设置部署的namespace，请按："组织Code-项目Code-环境Code" 格式进行设置，以方便后期将应用自动扫描到数据库中。
    # 比如：组织Code为choerodon，项目Code为demo，环境Code为alpha，那么最终定义的namespace为：choerodon-demo-alpha
    NAMESPACE="choerodon-demo-alpha"
    # 提供NFS服务的主机地址
    NFS_SERVER_HOST="nfs.choerodon.io"
    #######################  choerodon配置  ##########################
    # 搭建服务时镜像仓库前缀，默认"registry.cn-shanghai.aliyuncs.com/choerodon"
    IMAGE_REPO_PRE="registry.cn-shanghai.aliyuncs.com/choerodon"
    # 服务域名后缀
    CHOERODON_DOMAIN="example.choerodon.io"
    # Choerodon api地址
    CHOERODON_API_EXTERNAL_URL="api.${CHOERODON_DOMAIN}"
    # Choerodon devops service地址
    CHOERODON_DEVOPS_EXTERNAL_URL="devops.${CHOERODON_DOMAIN}"
    # Choerodon前端访问地址
    CHOERODON_FRONT_EXTERNAL_URL="${CHOERODON_DOMAIN}"
    ########################### Kafka 配置  ############################
    # 是否使用外部Kafka，若使用请设置为true
    EXTERNAL_KAFKA="false"
    # 定义多少个ZOOKEEPER目录，就创建多少个ZOOKEEPER副本，最好为单数，防止脑裂;若使用外部kafka，请忽略
    ZOOKEEPER_DIR[0]="/u01/io-choerodon/zookeeper/00"
    ZOOKEEPER_DIR[1]="/u01/io-choerodon/zookeeper/01"
    ZOOKEEPER_DIR[2]="/u01/io-choerodon/zookeeper/02"
    # 定义多少个KAFKA目录，就创建多少个KAFKA副本，最好为单数;若使用外部kafka，请忽略
    KAFKA_DIR[0]="/u01/io-choerodon/kafka/00"
    KAFKA_DIR[1]="/u01/io-choerodon/kafka/01"
    KAFKA_DIR[2]="/u01/io-choerodon/kafka/02"
    # 启用外部Kafka后，定义以下链接信息，使用内部kafka请忽略。多URL逗号前请加"\"
    KAFKA_URL="kafka-0:9092\,kafka-1:9092"
    ZOOKEEPER_URL="zookeeper-0:2181\,zookeeper-1:2181"
    ############################  数据库配置  ############################
    # 是否使用外部mysql，若使用请设置为true
    EXTERNAL_MYSQL="false"
    # mysql参数定义，若使用外部mysql，请忽略
    MYSQL_ROOT_PASSWORD="password"
    MYSQL_USER="choerodon"
    MYSQL_PASSWORD="password"
    # mysql数据存储目录，若使用外部mysql，请忽略
    MYSQL_DIR="/u01/io-choerodon/mysql"
    # 启用外部mysql后，定义以下数据库信息，使用内部mysql请忽略。值格式为： host prot database_name username password。
    IAM_SERVICE_DB=("mysql" "3306" "iam_service" "username" "password")
    MANAGER_SERVICE_DB=("mysql" "3306" "manager_service" "username" "password")
    EVENT_STORE_SERVICE_DB=("mysql" "3306" "event_store_service" "username" "password")
    DEVOPS_SERVICE_DB=("mysql" "3306" "devops_service" "username" "password")
    GITLAB_SERVICE_DB=("mysql" "3306" "gitlab_service" "username" "password")
    GITLAB_DB=("mysql" "3306" "gitlabhq_production" "username" "password")
    ########################### Gitlab配置 ############################
    # 是否使用外部Gitlab，若使用请设置为true
    EXTERNAL_GITLAB="false"
    # gitlab域名
    GITLAB_EXTERNAL_URL="gitlab.${CHOERODON_DOMAIN}"
    # gitlab 所需目录，使用外部gitlab请忽略。
    GITLAB_DIR="/u01/io-choerodon/gitlab"
    # gitlab root用户密码，使用外部gitlab请忽略。
    GITLAB_ROOT_PASSWORD="password"
    # 通过choerodon平台创建的用户，gitlab初始密码
    GITLAB_USER_PASSWORD="password"
    # 一个admin角色用户的的impersonation token（有以下权限 api、read_use、sudo）;使用内部gitlab请忽略。
    GITLAB_TOKEN="sdfjaTnlnlWNCsdfvd"
    # 通过choerodon平台创建的用户，最多可以创建的git仓库数量
    GITLAB_PROJECTLIMIT=100
    ########################### chartmuseum配置 ########################
    # chartmuseum数据存储目录
    CHARTMUSEUM_DIR="/u01/io-choerodon/chartmuseum"
    # 访问地址
    CHARTMUSEUM_EXTERNAL_URL="charts.${CHOERODON_DOMAIN}"
    ########################### Minio 配置  ############################
    # 是否使用外部Minio，若使用请设置为true
    EXTERNAL_MINIO="false"
    # minio数据存储目录，使用外部minio请忽略
    MINIO_DIR="/u01/io-choerodon/minio"
    # minio访问地址
    MINIO_EXTERNAL_URL="minio.${CHOERODON_DOMAIN}"
    # minio用户名
    MINIO_ACCESS_KEY="admin"
    # minio密码
    MINIO_SECRET_KEY="password"
    ########################### Harbar 配置  ############################
    # 是否使用外部Harbor，若使用请设置为true
    EXTERNAL_HARBOR="false"
    # Harbar 所需目录，若使用外部Harbor，请忽略。
    HARBOR_ADMINSERVER_DIR="/u01/io-choerodon/harbor/adminserver"
    HARBOR_MYSQL_DIR="/u01/io-choerodon/harbor/mysql"
    HARBOR_REGISTRY_DIR="/u01/io-choerodon/harbor/registry"
    HARBOR_NOTARY_DIR="/u01/io-choerodon/harbor/notary"
    HARBOR_POSTGRESQL_DIR="/u01/io-choerodon/harbor/postgresql"
    # Harbar访问地址
    HARBOR_EXTERNAL_URL="registry.${CHOERODON_DOMAIN}"
    # Harbar管理员密码
    HARBOR_ADMIN_PASSWORD="Password123"
    ```

- 执行以下命令进行安装

    ```
    curl -o choerodon-install.sh \
        http://http://file.choerodon.com.cn/choerodon-install/install.sh && \
        sh choerodon-install.sh "$PWD/values.sh"
    ```

### 分步安装

<blockquote class="warning">
在此之前，应该准备好Mysql、Harbor、Kafka、Zookeeper、Gitlab、Minio，Chartmuseum这些组件的信息。按以下搭建顺序进行搭建，请不要随意调整搭建顺序。
</blockquote>

- 添加choerodon chart仓库

    ```
    helm repo add choerodon http://openchart.choerodon.com.cn/choerodon/devops/
    helm repo update
    ```
- 安装register server
  
    ```
    helm install choerodon/go-register-server \
        --set service.enable=true \
        --set service.name=register-server \
        --set env.open.KAFKA_ADDRESSES="kafka-0:9092\,kafka-1:9092" \
        --name register-server \
        --version=0.5.0 --namespace=choerodon-devops-prod
    ```
    参数名 | 含义 
    --- |  --- 
    service.enable|是否创建service
    service.name|service的名称
    env.open.KAFKA_ADDRESSES|kafka地址

- 安装config server

    ```
    helm install choerodon/config-server \
        --set service.enable=true \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.choerodon-devops-prod:8000/eureka/" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS="kafka-0:9092\,kafka-1:9092" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES="zookeeper-0:2181\,zookeeper-1:2181" \
        --name config-server \
        --version=0.5.0 --namespace=choerodon-devops-prod
    ```
    参数名 | 含义 
    --- |  --- 
    env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS|kafk地址
    env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES|zookeeper地址

- 安装manager service

    ```
    helm install choerodon/manager-service \
        --set preJob.preInitDB.mysql.host="mysql" \
        --set preJob.preInitDB.mysql.port=3306 \
        --set preJob.preInitDB.mysql.database=manager_service \
        --set preJob.preInitDB.mysql.username=username \
        --set preJob.preInitDB.mysql.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://mysql:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set env.open.SPRING_DATASOURCE_USERNAME=username \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://config-server.choerodon-devops-prod:8010/" \
        --set env.open.CHOERODON_GATEWAY_DOMAIN="api.example.choerodon.com.cn" \
        --set env.open.CHOERODON_SWAGGER_OAUTH_URL="http://api.example.choerodon.com.cn/oauth/oauth/authorize" \
        --set env.open.SPRING_KAFKA_BOOTSTRAP_SERVERS="kafka-0:9092\,kafka-1:9092" \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.choerodon-devops-prod:8000/eureka/" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS="kafka-0:9092\,kafka-1:9092" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES="zookeeper-0:2181\,zookeeper-1:2181" \
        --name manager-service \
        --version=0.5.0 --namespace=choerodon-devops-prod
    ```
    参数名 | 含义 
    --- |  --- 
    preJob.preInitDB.mysql{}|初始化数据库所需数据库信息
    env.open.SPRING_DATASOURCE_URL|数据库链接地址
    env.open.SPRING_DATASOURCE_USERNAME|数据库用户名
    env.open.SPRING_DATASOURCE_PASSWORD|数据库密码
    env.open.SPRING_CLOUD_CONFIG_ENABLED|启用配置中心
    env.open.SPRING_CLOUD_CONFIG_URI|配置中心地址
    env.open.CHOERODON_GATEWAY_DOMAIN|平台api地址
    env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE|注册服务地址
    env.open.SPRING_KAFKA_BOOTSTRAP_SERVERS|kafk地址
    env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS|kafk地址
    env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES|zookeeper地址

- 安装api gateway

    ```
    helm install choerodon/api-gateway \
        --set preJob.preConfig.mysql.host=mysql \
        --set preJob.preConfig.mysql.port=3306 \
        --set preJob.preConfig.mysql.database=manager_service \
        --set preJob.preConfig.mysql.username=username \
        --set preJob.preConfig.mysql.password=password \
        --set service.enable=true \
        --set ingress.enable=true \
        --set ingress.host=api.example.choerodon.com.cn \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.choerodon-devops-prod:8000/eureka/" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://config-server.choerodon-devops-prod:8010/" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS="kafka-0:9092\,kafka-1:9092" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES="zookeeper-0:2181\,zookeeper-1:2181" \
        --name api-gateway \
        --version=0.5.0 --namespace=choerodon-devops-prod
    ```
    参数名 | 含义 
    --- |  --- 
    preJob.preConfig.mysql{}|初始化配置所需manager_service数据库信息
    env.open.SPRING_CLOUD_CONFIG_ENABLED|启用配置中心
    env.open.SPRING_CLOUD_CONFIG_URI|配置中心地址
    env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE|注册服务地址
    env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS|kafk地址
    env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES|zookeeper地址

- 安装gateway helper

    ```
    helm install choerodon/gateway-helper \
        --set preJob.preConfig.mysql.host=mysql \
        --set preJob.preConfig.mysql.port=3306 \
        --set preJob.preConfig.mysql.database=manager_service \
        --set preJob.preConfig.mysql.username=username \
        --set preJob.preConfig.mysql.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://mysql:3306/iam_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set env.open.SPRING_DATASOURCE_USERNAME=username \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.choerodon-devops-prod:8000/eureka/" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://config-server.choerodon-devops-prod:8010/" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS="kafka-0:9092\,kafka-1:9092" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES="zookeeper-0:2181\,zookeeper-1:2181" \
        --name gateway-helper \
        --version=0.5.0 --namespace=choerodon-devops-prod
    ```
    参数名 | 含义 
    --- |  --- 
    preJob.preConfig.mysql{}|初始化配置所需manager_service数据库信息
    env.open.SPRING_DATASOURCE_URL|数据库链接地址
    env.open.SPRING_DATASOURCE_USERNAME|数据库用户名
    env.open.SPRING_DATASOURCE_PASSWORD|数据库密码
    env.open.SPRING_CLOUD_CONFIG_ENABLED|启用配置中心
    env.open.SPRING_CLOUD_CONFIG_URI|配置中心地址
    env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE|注册服务地址
    env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS|kafk地址
    env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES|zookeeper地址

- 安装event store service

    ```
    helm install choerodon/event-store-service \
        --set preJob.preConfig.mysql.host=mysql \
        --set preJob.preConfig.mysql.port=3306 \
        --set preJob.preConfig.mysql.database=manager_service \
        --set preJob.preConfig.mysql.username=username \
        --set preJob.preConfig.mysql.password=password \
        --set preJob.preInitDB.mysql.host=mysql \
        --set preJob.preInitDB.mysql.port=3306 \
        --set preJob.preInitDB.mysql.database=event_store_service \
        --set preJob.preInitDB.mysql.username=username \
        --set preJob.preInitDB.mysql.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://mysql:3306/event_store_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set env.open.SPRING_DATASOURCE_USERNAME=username \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.SPRING_CLOUD_STREAM_DEFAULT_BINDER="kafka" \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.choerodon-devops-prod:8000/eureka/" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://config-server.choerodon-devops-prod:8010/" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS="kafka-0:9092\,kafka-1:9092" \
        --set env.open.SPRING_KAFKA_BOOTSTRAP_SERVERS="kafka-0:9092\,kafka-1:9092" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES="zookeeper-0:2181\,zookeeper-1:2181" \
        --name event-store-service \
        --version=0.5.0 --namespace=choerodon-devops-prod
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
    env.open.SPRING_KAFKA_BOOTSTRAP_SERVERS|kafk地址
    env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS|kafk地址
    env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES|zookeeper地址


- 安装oauth server

    ```
    helm install choerodon/oauth-server \
        --set preJob.preConfig.mysql.host=mysql \
        --set preJob.preConfig.mysql.port=3306 \
        --set preJob.preConfig.mysql.database=manager_service \
        --set preJob.preConfig.mysql.username=username \
        --set preJob.preConfig.mysql.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://mysql:3306/iam_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set env.open.SPRING_DATASOURCE_USERNAME=username \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.CHOERODON_DEFAULT_REDIRECT_URL="http://example.choerodon.com.cn" \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.choerodon-devops-prod:8000/eureka/" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://config-server.choerodon-devops-prod:8010/" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS="kafka-0:9092\,kafka-1:9092" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES="zookeeper-0:2181\,zookeeper-1:2181" \
        --name oauth-server \
        --version=0.5.0 --namespace=choerodon-devops-prod
    ```
    参数名 | 含义 
    --- |  --- 
    preJob.preConfig.mysql{}|初始化配置所需manager_service数据库信息
    env.open.SPRING_DATASOURCE_URL|数据库链接地址
    env.open.SPRING_DATASOURCE_USERNAME|数据库用户名
    env.open.SPRING_DATASOURCE_PASSWORD|数据库密码
    env.open.SPRING_CLOUD_CONFIG_ENABLED|启用配置中心
    env.open.SPRING_CLOUD_CONFIG_URI|配置中心地址
    env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE|注册服务地址
    env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS|kafk地址
    env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES|zookeeper地址

- 安装file service

    ```
    helm install choerodon/file-service \
        --set preJob.preConfig.mysql.host=mysql \
        --set preJob.preConfig.mysql.port=3306 \
        --set preJob.preConfig.mysql.database=manager_service \
        --set preJob.preConfig.mysql.username=username \
        --set preJob.preConfig.mysql.password=password \
        --set env.open.MINIO_ENDPOINT="http://minio.example.choerodon.com.cn" \
        --set env.open.MINIO_ACCESSKEY=username \
        --set env.open.MINIO_SECRETKEY=password \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.choerodon-devops-prod:8000/eureka/" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://config-server.choerodon-devops-prod:8010/" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS="kafka-0:9092\,kafka-1:9092" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES="zookeeper-0:2181\,zookeeper-1:2181" \
        --name file-service \
        --version=0.5.0 --namespace=choerodon-devops-prod
    ```
    参数名 | 含义 
    --- |  --- 
    preJob.preConfig.mysql{}|初始化配置所需manager_service数据库信息
    env.open.SPRING_CLOUD_CONFIG_ENABLED|启用配置中心
    env.open.SPRING_CLOUD_CONFIG_URI|配置中心地址
    env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE|注册服务地址
    env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS|kafk地址
    env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES|zookeeper地址
    env.open.MINIO_ENDPOINT|minio地址
    env.open.MINIO_ACCESSKEY|minio用户名
    env.open.MINIO_SECRETKEY|minio密码

- 安装iam service

    ```
    helm install choerodon/iam-service \
        --set preJob.preConfig.mysql.host=mysql \
        --set preJob.preConfig.mysql.port=3306 \
        --set preJob.preConfig.mysql.database=manager_service \
        --set preJob.preConfig.mysql.username=username \
        --set preJob.preConfig.mysql.password=password \
        --set preJob.preInitDB.mysql.host=mysql \
        --set preJob.preInitDB.mysql.port=3306 \
        --set preJob.preInitDB.mysql.database=iam_service \
        --set preJob.preInitDB.mysql.username=username \
        --set preJob.preInitDB.mysql.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://mysql:3306/iam_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set env.open.SPRING_DATASOURCE_USERNAME=username \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.choerodon-devops-prod:8000/eureka/" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://config-server.choerodon-devops-prod:8010/" \
        --set env.open.CHOERODON_EVENT_CONSUMER_KAFKA_BOOTSTRAP_SERVERS="kafka-0:9092\,kafka-1:9092" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS="kafka-0:9092\,kafka-1:9092" \
        --set env.open.SPRING_KAFKA_BOOTSTRAP_SERVERS="kafka-0:9092\,kafka-1:9092" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES="zookeeper-0:2181\,zookeeper-1:2181" \
        --name iam-service \
        --version=0.5.0 --namespace=choerodon-devops-prod
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
    env.open.SPRING_KAFKA_BOOTSTRAP_SERVERS|kafk地址
    env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS|kafk地址
    env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES|zookeeper地址

- 安装devops service

    ``` 
    helm install choerodon/devops-service \
        --set preJob.preConfig.mysql.host=mysql \
        --set preJob.preConfig.mysql.port=3306 \
        --set preJob.preConfig.mysql.database=manager_service \
        --set preJob.preConfig.mysql.username=username \
        --set preJob.preConfig.mysql.password=password \
        --set preJob.preInitDB.mysql.host=mysql \
        --set preJob.preInitDB.mysql.port=3306 \
        --set preJob.preInitDB.mysql.database=devops_service \
        --set preJob.preInitDB.mysql.username=username \
        --set preJob.preInitDB.mysql.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://mysql:3306/devops_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set env.open.SPRING_DATASOURCE_USERNAME=username \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.choerodon-devops-prod:8000/eureka/" \
        --set env.open.SPRING_REDIS_HOST=prod-devops-redis \
        --set env.open.CHOERODON_EVENT_CONSUMER_KAFKA_BOOTSTRAP_SERVERS="kafka-0:9092\,kafka-1:9092" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS="kafka-0:9092\,kafka-1:9092" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES="zookeeper-0:2181\,zookeeper-1:2181" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://config-server.choerodon-devops-prod:8010/" \
        --set env.open.SERVICES_HARBOR_BASEURL="https://harbor.example.choerodon.com.cn" \
        --set env.open.SERVICES_HARBOR_USERNAME=admin \
        --set env.open.SERVICES_HARBOR_PASSWORD="password" \
        --set env.open.SERVICES_HELM_URL="http://chart.example.choerodon.com.cn" \
        --set env.open.SERVICES_GITLAB_URL="https://code.example.choerodon.com.cn" \
        --set env.open.SERVICES_GITLAB_PASSWORD=123456 \
        --set env.open.SERVICES_GITLAB_PROJECTLIMIT=100 \
        --set env.open.AGENT_VERSION="0.5.0" \
        --set env.open.AGENT_SERVICEURL="ws://devops.service.example.choerodon.com.cn/agent/" \
        --set ingress.enable=true \
        --set ingress.host=devops.service.example.choerodon.com.cn \
        --set service.enable=true \
        --set persistence.enabled=true \
        --set persistence.existingClaim="prod-devops-service-pvc" \
        --name=devops-service \
        --version=0.5.0 --namespace=choerodon-devops-prod
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
    persistence.enabled|启用持久化存储
    persistence.existingClaim|一定与chartmuseum挂载出来的目录相同

- 安装gitlab service

    ```
    helm install choerodon/gitlab-service \
        --set preJob.preConfig.mysql.host=mysql \
        --set preJob.preConfig.mysql.port=3306 \
        --set preJob.preConfig.mysql.database=manager_service \
        --set preJob.preConfig.mysql.username=username \
        --set preJob.preConfig.mysql.password=password \
        --set preJob.preInitDB.mysql.host=mysql \
        --set preJob.preInitDB.mysql.port=3306 \
        --set preJob.preInitDB.mysql.database=gitlab_service \
        --set preJob.preInitDB.mysql.username=username \
        --set preJob.preInitDB.mysql.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://mysql:3306/gitlab_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set env.open.SPRING_DATASOURCE_USERNAME=username \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.choerodon-devops-prod:8000/eureka/" \
        --set env.open.CHOERODON_EVENT_CONSUMER_KAFKA_BOOTSTRAP_SERVERS="kafka-0:9092\,kafka-1:9092" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS="kafka-0:9092\,kafka-1:9092" \
        --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES="zookeeper-0:2181\,zookeeper-1:2181" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://config-server.choerodon-devops-prod:8010/" \
        --set env.open.GITLAB_URL="https://code.example.choerodon.com.cn" \
        --set env.open.GITLAB_PRIVATETOKEN="choerodon-gitlab-token" \
        --name=gitlab-service \
        --version=0.5.0 --namespace=choerodon-devops-prod
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

- 安装choerodon front

    ```
    helm install choerodon/choerodon-front \
        --set preJob.preConfig.mysql.host=mysql \
        --set preJob.preConfig.mysql.port=3306 \
        --set preJob.preConfig.mysql.dbname=iam_service \
        --set preJob.preConfig.mysql.username=username \
        --set preJob.preConfig.mysql.password=password \
        --set env.open.PRO_API_HOST="api.example.choerodon.com.cn" \
        --set env.open.PRO_DEVOPS_HOST="devops.service.example.choerodon.com.cn" \
        --set env.open.PRO_CLIENT_ID="choerodon" \
        --set env.open.PRO_TITLE_NAME="Choerodon" \
        --set env.open.PRO_HEADER_TITLE_NAME="Choerodon" \
        --set env.open.PRO_HTTP="http" \
        --set ingress.host="example.choerodon.com.cn" \
        --set service.enable=true \
        --set ingress.enable=true \
        --name=choerodon-front \
        --version=0.5.0 --namespace=choerodon-devops-prod
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

- 在访问搭建好的Choerodon的api，`api.exmple.choerodon.io/manager/swagger-ui.html`，选择`iam_service` -> `client-controller` -> `创建client`
  - 认证请使用用户名：admin，密码：admin
  - 提交以下数据，注意正式搭建时请替换以下值为真实值
      
        ```json
        {
            "accessTokenValidity": 60,
            "additionalInformation": "",
            "authorizedGrantTypes": "implicit,client_credentials,authorization_code,refresh_token",
            "autoApprove": "default",
            "name": "choerodonparent",
            "objectVersionNumber": 0,
            "organizationId": 1,
            "refreshTokenValidity": 60,
            "resourceIds": "default",
            "scope": "default",
            "secret": "secret",
            "webServerRedirectUri": "http://choerodon.exmple.choerodon.io"
        }
        ```

### 部署失败操作
<blockquote class="warning">
执行以下操作时请一定确认安装时所使用的--name参数与下列一致。namespace中没有其他不能删除的job，若有请手动逐个删除。
</blockquote>

- 部署失败操作

    ```bash
    helm del --purge api-gateway 
    helm del --purge choerodon-front
    helm del --purge config-server 
    helm del --purge devops-service 
    helm del --purge event-store-service 
    helm del --purge file-service 
    helm del --purge gateway-helper 
    helm del --purge gitlab-service 
    helm del --purge hystrix-dashboard 
    helm del --purge hystrix-turbine 
    helm del --purge iam-service 
    helm del --purge manager-service 
    helm del --purge oauth-server 
    helm del --purge register-server
    kubectl delete job -n choerodon-devops-prod --all
    ```