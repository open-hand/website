+++
title ="Gitlab部署"
description ="Gitlab部署"
weight = 55
+++

# Gitlab部署

## 仓库设置

1. 本地添加远程仓库

    ```
    helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
    ```
1. 更新本地仓库信息

    ```
    helm repo update 
    ```

## 部署Gitlab

<blockquote class="note">
启用持久化存储请执行提前创建所指向的物理地址，PV和PVC可使用以下语句进行创建；可在部署命令中添加--debug --dry-run参数，进行渲染预览不进行部署。
</blockquote>

### 创建mysql所需PV和PVC

```shell
helm install c7n/create-pv \
    --set type=nfs \
    --set pv.name=gitlab-mysql-pv \
    --set nfs.path=/u01/io-choerodon/gitlab/mysql \
    --set nfs.server=nfs.exmple.choerodon.io \
    --set pvc.name=gitlab-mysql-pvc \
    --set size=3Gi \
    --set "accessModes[0]=ReadWriteOnce" \
    --name gitlab-mysql-pv --namespace=choerodon-devops-prod
```

### 部署mysql

```shell
helm install c7n/mysql \
    --set persistence.enabled=true \
    --set persistence.existingClaim=gitlab-mysql-pvc \
    --set env.open.MYSQL_ROOT_PASSWORD=password \
    --set service.port=3306 \
    --name=gitlab-mysql --namespace=choerodon-devops-prod
```

### 创建数据库
- 进入数据库

    ```shell
    # 进入pod
    kubectl exec -it $(kubectl get po -n choerodon-devops-prod -l release=gitlab-mysql -o jsonpath='{.items[0].metadata.name}') -n choerodon-devops-prod bash
    # 进入mysql命令行
    mysql -uroot -p${MYSQL_ROOT_PASSWORD}
    ```
- 数据库创建语句

    ```sql
    CREATE USER 'gitlab'@'%' IDENTIFIED BY "password";
    CREATE DATABASE gitlabhq_production DEFAULT CHARACTER SET utf8;
    GRANT ALL PRIVILEGES ON gitlabhq_production.* TO gitlab@'%';
    FLUSH PRIVILEGES;
    ```

### 部署gitlab所需Redis

```shell
helm install c7n/redis --name=gitlab-redis --namespace=choerodon-devops-prod
```

### 创建gitlab所需PV和PVC

```shell
helm install c7n/create-pv \
    --set type=nfs \
    --set pv.name=gitlab-pv \
    --set nfs.path=/u01/io-choerodon/gitlab/data \
    --set nfs.server=nfs.exmple.choerodon.io \
    --set pvc.name=gitlab-pvc \
    --set size=3Gi \
    --set "accessModes[0]=ReadWriteOnce" \
    --name gitlab-pv --namespace=choerodon-devops-prod
```

### 部署gitlab
<blockquote class="note">
参数GITLAB_EXTERNAL_URL和ingress.hosts[0]这两个地址的域名必须一致，但写法不能一样，GITLAB_EXTERNAL_URL必须写上http://前缀，ingress.hosts[0]不能带上http://前缀，这两个参数使用的地方是不同的GITLAB_EXTERNAL_URL是Gitlab内置参数，ingress.hosts[0]是创建k8s中ingress对象所要使用的。
</blockquote>

```shell
helm install c7n/gitlab \
    --set persistence.enabled=true \
    --set persistence.existingClaim=gitlab-pvc \
    --set env.config.GITLAB_EXTERNAL_URL=http://gitlab.exmple.choerodon.io \
    --set env.config.GITLAB_TIMEZONE=Asia/Shanghai \
    --set env.config.CHOERODON_OMNIAUTH_ENABLED=false \
    --set env.config.GITLAB_DEFAULT_CAN_CREATE_GROUP=true \
    --set env.config.MYSQL_HOST=gitlab-mysql \
    --set env.config.MYSQL_PORT=3306 \
    --set env.config.MYSQL_USERNAME=gitlab \
    --set env.config.MYSQL_PASSWORD=password \
    --set env.config.MYSQL_DATABASE=gitlabhq_production \
    --set env.config.REDIS_HOST=gitlab-redis \
    --set env.config.REDIS_PORT=6379 \
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
    --set ingress.enabled=true \
    --set ingress.hosts[0]=gitlab.exmple.choerodon.io \
    --name=gitlab --namespace=choerodon-devops-prod 
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
    ingress.hosts[0]|gitlab的域名


### 验证部署

- 访问设置的Gitlab域名出现以下界面即部署成功

    ![](/docs/installation-configuration/image/gitlab.png)


## 克隆模板仓库

1. 克隆该组织下所有仓库

    ```url
    https://code.choerodon.com.cn/app_template
    ```

1. 推送到搭建的Gitlab中（下面语句请注意替换相应值）

    <blockquote class="warning">
    请不要修改仓库组织名称和仓库名称，这里的app_template就是仓库组织名称，***为仓库名称，只修改域名gitlab.exmple.choerodon.io。
    </blockquote>

    ```shell
    git remote set-url origin http://gitlab.exmple.choerodon.io/app_template/***.git
    git push origin master:master
    ```

## Gitlab数据库优化

- 如果在gitlab中需要使用`emoji`图标(比如在issue、comment、merge request区域),那么需要做以下配置。首先，需要对数据库表编码和行类型进行转换,如果一开始创建表时就使用`utf8mb4`格式，会造成初始化时列的长度超出限制的错误(767/4)。所以先使用utf8初始化完成后，在用sql进行转换。
    1. 修改数据库参数

        ```sql
        --Aliyun RDS通过界面控制台修改:
        innodb_large_prefix = ON

        --自建Mysql执行以下sql
        set global innodb_file_format = `BARRACUDA`;
        set global innodb_large_prefix = `ON`;
        ```

    1. 执行下边sql,并复制返回结果执行，然后就会将表的行格式设置为动态类型:

        ```sql
        SELECT
            CONCAT( 'ALTER TABLE `', TABLE_NAME, '` ROW_FORMAT=DYNAMIC;' ) AS 'Copy & run these SQL statements:' 
        FROM
            INFORMATION_SCHEMA.TABLES 
        WHERE
            TABLE_SCHEMA = "gitlabhq_production" 
            AND TABLE_TYPE = "BASE TABLE" 
            AND ROW_FORMAT != "Dynamic";
        ```

    1. 继续执行sql，并复制返回结果执行,把表的编码进行转换:

        ```sql
        SELECT
            CONCAT( 'ALTER TABLE `', TABLE_NAME, '` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;' ) AS 'Copy & run these SQL statements:' 
        FROM
            INFORMATION_SCHEMA.TABLES 
        WHERE
            TABLE_SCHEMA = "gitlabhq_production" 
            AND TABLE_COLLATION != "utf8mb4_general_ci" 
            AND TABLE_TYPE = "BASE TABLE";
        ```

    现在gitlab里就可以使用`emoji`图标了。对于`postgresql`是可以直接使用`utf8mb4`编码的。而在`mysql5.7`中可以将`ROW_FORMAT = "Dynamic"`这一值设置为默认属性，因此可能不会遇到这个问题。

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
        --namespace=choerodon-devops-prod 

### 添加Gitlab Client

- 在访问搭建好的Choerodon的api，`api.exmple.choerodon.io/manager/swagger-ui.html`，选择`iam_service` -> `client-controller` -> `创建client`
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
          "webServerRedirectUri": "http://gitlab.exmple.choerodon.io"
        }
        ```

### 添加外部用户关联

- 在Gitlab数据库执行下边sql语句添加关联:

    ```sql
    INSERT INTO `gitlabhq_production`.`identities`(`extern_uid`, `provider`, `user_id`, `created_at`, `updated_at`) 
    VALUES ('1', 'oauth2_generic', 1, NOW(), NOW());
    ```

### 验证更新

- 访问设置的Gitlab域名出现以下界面即更新成功

    ![](/docs/installation-configuration/image/gitlab-oauth.png)