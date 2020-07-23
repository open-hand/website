+++
title = "前端"
description = "前端"
weight = 70
+++

# 部署前端

## 添加choerodon chart仓库

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```


## 部署 hzero front
- 若需了解项目详情及各项参数含义，请移步 [choerodon/hzero-front](https://github.com/choerodon/hzero-front)。

- 编写参数配置文件 `hzero-front.yaml`

    ```yaml
    ingress:
      enabled: true
      host: hzero.example.choerodon.io
    env:
      open:
        BUILD_CLIENT_ID: choerodon
        BUILD_API_HOST: http://api.example.choerodon.io
    ```

- 部署服务

  ```
  helm upgrade --install hzero-front c7n/hzero-front \
    -f hzero-front.yaml \
    --version 0.22.0 \
    --namespace c7n-system
  ```

- 验证部署
  
    - 验证命令

        ```
        curl $(kubectl get svc hzero-front -o jsonpath="{.spec.clusterIP}" -n c7n-system):80
        ```

    - 出现以下类似信息即为成功部署

        ```
        !doctype html><html lang="zh"><head><meta charset="utf-8"/><title>HZERO</title><link rel="shortcut icon" href="/manifest.json"/><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"/><meta name="theme-color" content="#000000"/><meta name="format-detection" content="telephone=no"/>...
        ```

## 部署 choerodon front
- 若需了解项目详情及各项参数含义，请移步 [choerodon/choerodon-front](https://github.com/choerodon/choerodon-front)。

- 编写参数配置文件 `choerodon-front.yaml`

    ```yaml
    env:
      open:
        LOCAL: false
        CLIENT_ID: choerodon
        API_HOST: http://api.example.choerodon.io
        DEVOPS_HOST: ws://devops.example.choerodon.io
        HEADER_TITLE_NAME: Choerodon | 多云应用技术集成平台
        COOKIE_SERVER: http://app.example.choerodon.io
        TITLE_NAME: Choerodon | 多云应用技术集成平台
        WEBSOCKET_SERVER: ws://notify.example.choerodon.io
        FILE_SERVER: http://minio.example.choerodon.io
        HZERO_FRONT: http://hzero.example.choerodon.io
        DEVOPS_WEBSOCKET_SECRET_KEY: devops_ws
    ingress:
      enabled: true
      host: app.example.choerodon.io
    ```

- 部署服务

  ```
  helm upgrade --install choerodon-front c7n/choerodon-front \
    -f choerodon-front.yaml \
    --version 0.22.0 \
    --namespace c7n-system
  ```

- 验证部署
  
    - 验证命令

        ```
        curl $(kubectl get svc choerodon-front -o jsonpath="{.spec.clusterIP}" -n c7n-system):8080
        ```

    - 出现以下类似信息即为成功部署

        ```
        <!DOCTYPE html><html><head><meta http-equiv="Content-type"content="text/html; charset=utf-8"><title>Choerodon</title><link rel="shortcut icon"href="favicon.ico"></head><body><div id="app"></div><script type="text/javascript"src="app/vendor_19e4b950.js"></script><script type="text/javascript"src="app/main_19e4b950.js"></script></body></html>
        ```

## 添加oauth client

- 编写参数配置文件 `c7n-front-client.yaml`

    ```yaml
    env:
      MYSQL_HOST: c7n-mysql.c7n-system.svc
      MYSQL_PASS: password
      MYSQL_PORT: 3306
      MYSQL_USER: root
      SQL_SCRIPT: |
        INSERT INTO hzero_platform.oauth_client (name,organization_id,resource_ids,secret,scope,authorized_grant_types,web_server_redirect_uri,access_token_validity,refresh_token_validity,additional_information,auto_approve,object_version_number,created_by,creation_date,last_updated_by,last_update_date,enabled_flag,time_zone)VALUES('choerodon',1,'default','secret','default','password,implicit,client_credentials,authorization_code,refresh_token','http://app.example.choerodon.io',3600,3600,'{}','default',1,0,NOW(),0,NOW(),1,'GMT+8');
    ```

- 部署服务
    ```
    helm upgrade --install c7n-front-client c7n/mysql-client \
        -f c7n-front-client.yaml \
        --version 0.1.0 \
        --namespace c7n-system
    ```
