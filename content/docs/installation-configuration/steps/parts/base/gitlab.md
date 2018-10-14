+++
title ="Gitlab部署"
description ="Gitlab部署"
weight = 55
+++

# Gitlab部署

## 仓库设置

## 添加choerodon chart仓库并同步

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

## 部署Gitlab

### 创建mysql所需PV和PVC

```shell
helm install c7n/persistentvolumeclaim \
    --set accessModes={ReadWriteOnce} \
    --set requests.storage=2Gi \
    --set storageClassName=nfs-provisioner \
    --version 0.1.0 \
    --name gitlab-mysql-pvc \
    --namespace c7n-system
```

### 部署mysql

```shell
helm install c7n/mysql \
    --set persistence.enabled=true \
    --set persistence.existingClaim=gitlab-mysql-pvc \
    --set env.MYSQL_ROOT_PASSWORD=password \
    --set env.MYSQL_DATABASE=gitlabhq_production \
    --set args="{--character-set-server=utf8mb4,--collation-server=utf8mb4_general_ci}" \
    --set config.innodb_large_prefix=1 \
    --set config.innodb_file_per_table=1 \
    --set config.innodb_file_format=Barracuda \
    --set config.log_bin_trust_function_creators=1 \
    --set service.enabled=ture \
    --version 0.1.0 \
    --name gitlab-mysql \
    --namespace c7n-system
```

### 部署gitlab所需Redis

```shell
helm install c7n/redis \
    --set service.enabled=true \
    --version 0.1.0 \
    --name gitlab-redis \
    --namespace c7n-system
```

### 创建gitlab所需PV和PVC

```shell
helm install c7n/persistentvolumeclaim \
    --set accessModes={ReadWriteOnce} \
    --set requests.storage=2Gi \
    --set storageClassName=nfs-provisioner \
    --version 0.1.0 \
    --name gitlab-pvc \
    --namespace c7n-system
```

### 部署gitlab

```shell
helm install c7n/gitlab \
    --set persistence.enabled=true \
    --set persistence.existingClaim=gitlab-pvc \
    --set env.config.GITLAB_EXTERNAL_URL=http://gitlab.example.choerodon.io\
    --set env.config.GITLAB_TIMEZONE=Asia/Shanghai \
    --set env.config.CHOERODON_OMNIAUTH_ENABLED=false \
    --set env.config.GITLAB_DEFAULT_CAN_CREATE_GROUP=true \
    --set env.config.MYSQL_HOST=gitlab-mysql.c7n-system.svc \
    --set env.config.MYSQL_USERNAME=root \
    --set env.config.MYSQL_PASSWORD=password \
    --set env.config.MYSQL_DATABASE=gitlabhq_production \
    --set env.config.REDIS_HOST=gitlab-redis.c7n-system.svc \
    --set env.config.SMTP_ENABLE=true \
    --set env.config.SMTP_ADDRESS=smtp.mxhichina.com \
    --set env.config.SMTP_PORT=465 \
    --set env.config.SMTP_USER_NAME=git.sys@example.com \
    --set env.config.SMTP_PASSWORD=password \
    --set env.config.SMTP_DOMAIN=smtp.mxhichina.com \
    --set env.config.SMTP_AUTHENTICATION=login \
    --set env.config.GITLAB_EMAIL_FROM=git.sys@example.com \
    --set env.config.SMTP_ENABLE_STARTTLS_AUTO=true \
    --set env.config.SMTP_TLS=true \
    --set env.config.PROMETHEUS_ENABLE=false \
    --set env.config.NODE_EXPORTER_ENABLE=false \
    --set service.enabled=true \
    --set ingress.enabled=true \
    --version 0.2.0 \
    --name gitlab \
    --namespace c7n-system
```

- 参数

    参数 | 含义 
    --- |  --- 
    persistence.enabled|是否启用持久化存储
    persistence.existingClaim|PVC的名称
    env.config.GITLAB_EXTERNAL_URL|gitlab的域名
    env.config.GITLAB_TIMEZONE|时区
    env.config.GITLAB_DEFAULT_CAN_CREATE_GROUP|用户是否可以创建组 
    env.config.CHOERODON_OMNIAUTH_ENABLED|是否开启第三方认证 
    env.config.OMNIAUTH_BLOCK_AUTO_CREATED_USERS|是否自动创建用户 
    env.config.CHOERODON_API_URL|choerodon的Api地址
    env.config.CHOERODON_CLIENT_ID|在choerodon上申请的client id
    env.config.MYSQL_HOST|mysql地址 
    env.config.MYSQL_PORT|mysql端口号 
    env.config.MYSQL_USERNAME|mysql用户名 
    env.config.MYSQL_PASSWORD|mysql用户密码 
    env.config.REDIS_HOST|redis地址 
    env.config.REDIS_PORT|redis端口号
    env.config.SMTP_ENABLE|是否开启smtp 
    env.config.SMTP_ADDRESS|smtp地址
    env.config.SMTP_PORT|smtp端口号 
    env.config.SMTP_USER_NAME|stmp用户
    env.config.SMTP_PASSWORD|stmp用户密码 
    env.config.SMTP_DOMAIN|smtp地址
    env.config.SMTP_AUTHENTICATION|认证方式 
    env.config.GITLAB_EMAIL_FROM|设置发件人email
    env.config.SMTP_ENABLE_STARTTLS_AUTO|是否自动启用TLS 
    env.config.SMTP_TLS|是否启用TLS 
    env.config.PROMETHEUS_ENABLE|是否开启prometheus
    env.config.NODE_EXPORTER_ENABLE|是否开启node_exporter_enable
    ingress.enabled|是否开启ingress 
    service.enabled|是否开启service

### 验证部署

- 访问设置的Gitlab域名出现以下界面即部署成功

    ![](/docs/installation-configuration/image/gitlab.png)


## 启用SSH协议

<blockquote class="warning">
必须开启SSH协议功能
</blockquote>

### 修改节点SSH默认端口
CentOS各发行版中SSH端口默认为22，为了开启Gitlab的SSH需要修改掉默认的22端口号。

Gitlab需要绑定22端口，所以需要更换SSH端口为非22端口，否则Choerodon的持续部署将无法正常使用。

<blockquote class="warning">
如果您启用了防火墙iptables或者安全组，那么必须先添加新开的SSH端口
</blockquote>

### 添加Gitlab SSH Service

1. 确认Gitlab版本

    - 登录Gitlab
    - 访问`http://gitlab.example.choerodon.io/help`页面查看版本号。

1. 在Master节点新建`gitlab-ssh-svc.yml`文件，按版本号添加以下信息：
    - 版本号为`GitLab Community Edition 10.*.*`，添加以下信息：

            apiVersion: v1
            kind: Service
            metadata:
              name: gitlab-ssh
              namespace: c7n-system
            spec:
              externalIPs:
              - 192.168.1.1 #请修改这里的IP为第一步设置SSH端口号的节点IP
              ports:
              - name: http
                port: 22
                protocol: TCP
                targetPort: 22
              selector:
                  app: gitlab
              
    - 版本号为`GitLab Community Edition 11.*.*`，添加以下信息：

            apiVersion: v1
            kind: Service
            metadata:
              name: gitlab-ssh
              namespace: c7n-system
            spec:
              externalIPs:
              - 192.168.1.1 #请修改这里的IP为第一步设置SSH端口号的节点IP
              ports:
              - name: http
                port: 22
                protocol: TCP
                targetPort: 22
              selector:
                  choerodon.io/infra: gitlab

1. 使Gitlab SSH Service生效

```
kubectl apply -f gitlab-ssh-svc.yml
```

### 域名映射

你需要在DNS运营商提供的控制面板上添加一条Gitlab域名与第一步设置SSH端口号的节点IP的记录。

## 配置Choerodon Oauth认证

<blockquote class="warning">
  <ul>
  <li>以下操作须将Choerodon搭建完成后再继续进行，若未搭建，请跳过。</li>
  <li>配置Choerodon的Oauth认证后Gitlab的root用户是无法再通过界面进行登录的了。</li>
  </ul>
</blockquote>

<blockquote class="note">
如标题所描述，进行此步配置就是使用Choerodon的Oauth认证进行登陆Gitlab。这是Gitlab与Choerodon进行整合的必要操作。
</blockquote>

### 更新Gitlab配置

    helm upgrade gitlab c7n/gitlab \
        -f <(helm get values gitlab) \
        --set env.config.CHOERODON_OMNIAUTH_ENABLED=true \
        --set env.config.OMNIAUTH_AUTO_SIGN_IN_WITH_PROVIDER=oauth2_generic \
        --set env.config.OMNIAUTH_BLOCK_AUTO_CREATED_USERS=false \
        --set env.config.CHOERODON_API_URL=http://api.example.choerodon.io \
        --set env.config.CHOERODON_CLIENT_ID=gitlab \
        --version 0.2.0 \
        --namespace c7n-system

### 添加Gitlab Client

- 在访问搭建好的Choerodon的api，`api.example.choerodon.io/manager/swagger-ui.html`，选择`iam_service` -> `client-controller` -> `创建client`
  - 认证请使用用户名：admin，密码：admin
  - 提交以下数据，注意正式搭建时请替换以下值为真实值
      
        ```json
        {
          "accessTokenValidity": 60,
          "additionalInformation": "",
          "authorizedGrantTypes": "implicit,client_credentials,authorization_code,refresh_token",
          "autoApprove": "default",
          "name": "gitlab",
          "objectVersionNumber": 0,
          "organizationId": 1,
          "refreshTokenValidity": 60,
          "resourceIds": "default",
          "scope": "default",
          "secret": "secret",
          "webServerRedirectUri": "http://gitlab.example.choerodon.io"
        }
        ```

### 添加外部用户关联

- 执行下面语句进行关联:

    ```
    helm install c7n/mysql-client \
        --set env.MYSQL_HOST=gitlab-mysql.c7n-system.svc \
        --set env.MYSQL_PORT=3306 \
        --set env.MYSQL_USER=root \
        --set env.MYSQL_PASS=password \
        --set env.SQL_SCRIPT="\
            INSERT INTO gitlabhq_production.identities(extern_uid\, provider\, user_id\, created_at\, updated_at) \
            VALUES ('1'\, 'oauth2_generic'\, 1\, NOW()\, NOW()); \
            UPDATE gitlabhq_production.application_settings SET allow_local_requests_from_hooks_and_services = 1;" \
        --version 0.1.0 \
        --name gitlab-user-identities \
        --namespace c7n-system
    ```

### 验证更新

- 访问设置的Gitlab域名出现以下界面即更新成功

    ![](/docs/installation-configuration/image/gitlab-oauth.png)
