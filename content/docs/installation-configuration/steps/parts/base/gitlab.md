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
启用持久化存储请执行提前创建所对应的物理目录，PV和PVC可使用以下语句进行创建；可在部署命令中添加--debug --dry-run参数，进行渲染预览不进行部署。
</blockquote>

### 创建mysql所需PV和PVC

```shell
helm install c7n/create-pv \
    --set type=nfs \
    --set pv.name=gitlab-mysql-pv \
    --set nfs.path=/u01/io-choerodon/gitlab/mysql \
    --set nfs.server=nfs.example.choerodon.io \
    --set pvc.name=gitlab-mysql-pvc \
    --set size=3Gi \
    --set accessModes={ReadWriteOnce} \
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
    --set nfs.server=nfs.example.choerodon.io \
    --set pvc.name=gitlab-pvc \
    --set size=3Gi \
    --set accessModes={ReadWriteOnce} \
    --name gitlab-pv --namespace=choerodon-devops-prod
```

### 部署gitlab
<blockquote class="note">
参数GITLAB_EXTERNAL_URL和ingress.hosts[]这两个地址的域名必须一致，但写法不能一样，GITLAB_EXTERNAL_URL必须写上http://前缀，ingress.hosts[]不能带上http://前缀，这两个参数使用的地方是不同的GITLAB_EXTERNAL_URL是Gitlab内置参数，ingress.hosts[]是创建k8s中ingress对象所要使用的。
</blockquote>

```shell
helm install c7n/gitlab \
    --set persistence.enabled=true \
    --set persistence.existingClaim=gitlab-pvc \
    --set env.config.GITLAB_EXTERNAL_URL=http://gitlab.example.choerodon.io \
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
    --set ingress.hosts={gitlab.example.choerodon.io} \
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
    ingress.hosts|gitlab的域名


### 验证部署

- 访问设置的Gitlab域名出现以下界面即部署成功

    ![](/docs/installation-configuration/image/gitlab.png)


## 启用SSH协议

<blockquote class="warning">
必须开启SSH协议功能
</blockquote>

### 修改节点SSH默认端口
CentOS各发行版中SSH端口默认为22，如果正式做站或其它用途，为了提高安全性就需要修改掉默认的SSH端口号，防止被有心人穷举密码。部分VPS提供商，若您的VPS服务器SSH遭受多次的暴力破解，可能会遭到罚款或临时终止服务，所以修改SSH的默认端口是有必要的，先通过当前的SSH端口（默认为：22）登陆。
 
1. 修改配置文件：`/etc/ssh/sshd_config` ，找到以下行：

    ```
    #port 22
    ```

1. 先将`Port 22`前面的 `#` 号去掉，并另起一行。如定义SSH端口号为33322，自定义端口选择建议在万位的端口（如：10000-65535之间），则输入：

    ```
    Port 33322
    ```
也许您会问为什么要先把`port 22`前面的 `#` 去掉呢？因为在配置文件中，`#` 是Linux的注释字符。注释字符后的代码程序是不会执行的。SSH默认的（即非手动指定）端口为22，所以配置文件在默认的情况下以注释字符出现。当需要指定其它端口或多端口同时访问时，就要删掉注释符号，告知程序按照您的意愿来执行响应操作。
以上操作，手动指定SSH端口为22和33322（双端口号），保留22是为了防止个别防火墙屏蔽了其它端口导致无法连接VPS（如没单独指定22，新指定的33322端口防火墙也没放行，那么可能无法通过SSH连接VPS或服务器）。为了防止不必要问题的产生，所以要给自己保留条“后路”。

1. 修改完毕后，重启SSH服务，并退出当前连接的SSH端口。

    ```
    service sshd restart
    ```

1. 重启完毕，尝试使用新端口登陆
连接成功，需要重新添加SSH-RSA验证，点击是（或Yes）即可。
1. 若能正常访问，返回第一步，根据第二步的操作将原`port 22`整段注释或删掉，再按第三步重启SSH即可。
以上步骤重启后使用默认22号端口无法进入SSH，达到目的。

<blockquote class="warning">
如果您启用了防火墙iptables或者安全组，那么必须先添加新开的33322端口
</blockquote>

### 添加Gitlab SSH Service

1. 在Master节点新建`gitlab-ssh-svc.yml`文件，添加以下信息：

        apiVersion: v1
        kind: Service
        metadata:
          name: gitlab-ssh
          namespace: choerodon-devops-prod
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

## 克隆模板仓库

1. 克隆该组织下所有仓库

    ```url
    https://code.choerodon.com.cn/app_template
    ```

1. 推送到搭建的Gitlab中（下面语句请注意替换相应值）

    <blockquote class="warning">
    请不要修改仓库组织名称和仓库名称，这里的app_template就是仓库组织名称，***为仓库名称，只修改域名gitlab.example.choerodon.io。
    </blockquote>

    ```shell
    git remote set-url origin http://gitlab.example.choerodon.io/app_template/***.git
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

- 在Gitlab数据库执行下边sql语句添加关联:

    ```sql
    INSERT INTO `gitlabhq_production`.`identities`(`extern_uid`, `provider`, `user_id`, `created_at`, `updated_at`) 
    VALUES ('1', 'oauth2_generic', 1, NOW(), NOW());
    ```

### 验证更新

- 访问设置的Gitlab域名出现以下界面即更新成功

    ![](/docs/installation-configuration/image/gitlab-oauth.png)
