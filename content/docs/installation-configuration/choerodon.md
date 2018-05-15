+++
title = "Choerodon安装"
description = "Choerodon安装"
weight = 60
+++

## 部署Choerodon

- 创建value.sh文件，定义以下变量及值。注意正式搭建时请替换以下值为真实值。

  ```bash
  # 仅debug不安装，删除此变量则进行安装
  DEBUG="--debug --dry-run"
  # 设置部署的namespace
  NAMESPACE="io-choerodon"

  # 域名配置
  CHOERODON_API_URL="api.exmple.choerodon.io"
  CHOERODON_FRONT_URL="choerodon.exmple.choerodon.io"

  # 组件信息
  CHARTS_URL="http://charts.exmple.choerodon.io"

  # minio信息
  MINIO_URL="http://minio.exmple.choerodon.io"
  MINIO_USERNAME="admin"
  MINIO_PASSWORD="handhand"
  # gitlab信息
  GITLAB_URL="http://git.exmple.choerodon.io"
  GITLAB_TOKEN="sw1W4jywyxsvkHYRGBBp"
  # harbor信息
  HARBOR_URL="https://registry.exmple.choerodon.io"
  HARBOR_USERNAME="admin"
  HARBOR_PASSWORD="password"

  # 定义Redis
  FRAMEWORK_REDIS_HOST='framework-redis'
  DEVOPS_REDIS_HOST='devops-redis'

  # 定义zookeeper、kafka
  ZOOKEEPER_URL="zookeeper-0.zookeeper-headless.io-choerodon.svc.cluster.local:2181"
  KAFKA_URL="kafka-0.kafka-headless.io-choerodon.svc.cluster.local:9092"

  # 存储配置设置,此路径需要与charts 
  DEVOPS_SERVICE_PVC="devops-service-pvc"

  # 定义数据库
  # 格式为（数据库地址 数据库端口号 数据库用户名 数据库用户密码 数据库名）
  # choerodon-iam-service数据库
  IAM_SERVICE_DB=("choerodon-mysql" "3306" "iam_service" "choerodon" "handhand")
  # choerodon-manager-service数据库
  MANAGER_SERVICE_DB=("choerodon-mysql" "3306" "manager_service" "choerodon" "handhand")
  # choerodon-event-store-service数据库
  EVENT_STORE_SERVICE_DB=("choerodon-mysql" "3306" "event_store_service" "choerodon" "handhand")
  # choerodon-devops-service数据库
  DEVOPS_SERVICE_DB=("choerodon-mysql" "3306" "devops_service" "choerodon" "handhand")
  # choerodon-gitlab-service数据库
  GITLAB_SERVICE_DB=("choerodon-mysql" "3306" "gitlab_service" "choerodon" "handhand")
  ```

- 执行以下命令进行安装

  ```bash
  curl -o choerodon-install.sh \
    https://rdc.hand-china.com/gitlab/io.choerodon/choerodon-docs/raw/master/content/docs/infra/installation/install.sh && \
    sh choerodon-install.sh value.sh
  ```

## 添加前端Client

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

## 部署失败操作

- 请执行以下语句后重试

  ```bash
  helm del --purge api-gateway 
  helm del --purge choerodon-front-parent 
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
  kubectl delete job -n io-choerodon --all
  ```