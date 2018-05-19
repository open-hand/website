+++
title ="Gitlab安装"
description ="Gitlab安装"
weight =50
+++

# Gitlab安装

## 仓库设置

1. 本地添加远程仓库

    ```
    helm repo add paas http://helm-charts.choerodon.io/paas/base/
    ```
1. 更新本地仓库信息

    ```
    helm repo update 
    ```

## 安装Gitlab

> **注意：**启用持久化存储请执行提前创建所指向的物理地址，PV和PVC可使用以下语句进行创建；可在安装命令中添加`--debug --dry-run`参数，进行渲染预览不进行安装。

- 创建gitlab所需PV和PVC

    ```bash
    helm install paas/create-pv \
      --set type=nfs \
      --set pv.name=gitlab-pv \
      --set nfs.path=/u01/nfs/exports/io-choerodon/gitlab \
      --set nfs.server=nfs.exmple.choerodon.io \
      --set pvc.name=gitlab-pvc \
      --set size=3Gi \
      --set "accessModes[0]=ReadWriteOnce" \
      --name gitlab-pv --namespace=io-choerodon
    ```
- 创建数据库

    ```sql
    CREATE USER 'gitlab'@'%' IDENTIFIED BY "password";
    CREATE DATABASE gitlabhq_production DEFAULT CHARACTER SET utf8;
    GRANT ALL PRIVILEGES ON gitlabhq_production.* TO choerodon@'%';
    FLUSH PRIVILEGES;
    ```

- 部署gitlab

    ```bash
    helm install paas/gitlab \
        --set persistence.enabled=true \
        --set persistence.existingClaim=gitlab-pvc \
        --set env.config.GITLAB_EXTERNAL_URL=http://gitlab.exmple.choerodon.io \
        --set env.config.GITLAB_TIMEZONE=Asia/Shanghai \
        --set env.config.GITLAB_DEFAULT_CAN_CREATE_GROUP=true \
        --set env.config.MYSQL_HOST=mysql \
        --set env.config.MYSQL_PORT=3306 \
        --set env.config.MYSQL_USERNAME=gitlab \
        --set env.config.MYSQL_PASSWORD=password \
        --set env.config.MYSQL_DATABASE=gitlabhq_production \
        --set env.config.REDIS_HOST=redis \
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
        --name=gitlab --namespace=io-choerodon 
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


## 使用Choerodon进行认证登陆

- 执行以下语句更新Gitlab部署

    ```bash
    helm upgrade gitlab paas/gitlab \
        --set persistence.enabled=true \
        --set persistence.existingClaim=gitlab-pvc \
        --set env.config.GITLAB_EXTERNAL_URL=http://gitlab.exmple.choerodon.io \
        --set env.config.GITLAB_TIMEZONE=Asia/Shanghai \
        --set env.config.GITLAB_DEFAULT_CAN_CREATE_GROUP=true \
        --set env.config.CHOERODON_OMNIAUTH_ENABLED=true \
        --set env.config.OMNIAUTH_AUTO_SIGN_IN_WITH_PROVIDER=oauth2_generic \
        --set env.config.OMNIAUTH_BLOCK_AUTO_CREATED_USERS=false \
        --set env.config.CHOERODON_API_URL=http://choerodon.exmple.choerodon.io \
        --set env.config.CHOERODON_CLIENT_ID=gitlab \
        --set env.config.MYSQL_HOST=mysql \
        --set env.config.MYSQL_PORT=3306 \
        --set env.config.MYSQL_USERNAME=gitlab \
        --set env.config.MYSQL_PASSWORD=password \
        --set env.config.MYSQL_DATABASE=gitlabhq_production \
        --set env.config.REDIS_HOST=redis \
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
    ```

## 添加Gitlab Client

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