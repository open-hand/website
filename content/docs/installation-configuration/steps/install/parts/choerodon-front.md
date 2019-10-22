+++
title = "整合前端"
description = "整合前端"
weight = 70
+++

# 部署整合前端

## 添加choerodon chart仓库

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

## 部署 choerodon front
- 若需了解项目详情及各项参数含义，请移步 [choerodon/choerodon-front](https://github.com/choerodon/choerodon-front)。

- 编写参数配置文件 `choerodon-front.yaml`
    ```yaml
    env:
      open:
        AGILE_HOST: http://minio.example.choerodon.io/agile-service/
        API_HOST: api.example.choerodon.io
        CLIENT_ID: choerodon
        DEVOPS_HOST: ws://devops.example.choerodon.io
        FILE_SERVER: http://minio.example.choerodon.io
        HEADER_TITLE_NAME: Choerodon
        HTTP: http
        TITLE_NAME: Choerodon
        WEBSOCKET_SERVER: ws://notify.example.choerodon.io
    ingress:
      enabled: true
      host: c7n.example.choerodon.io
    preJob:
      preConfig:
        db:
          dbname: iam_service
          enabledelete: true
          host: c7n-mysql.c7n-system.svc
          password: password
          port: 3306
          upattrs: sort,parent_id
          username: choerodon
    service:
      enabled: true
    ```

- 部署服务
    ```
    helm install c7n/choerodon-front \
      -f choerodon-front.yaml \
      --name choerodon-front \
      --version 0.19.0 \
      --namespace c7n-system
    ```

- 添加oauth client
    - 编写参数配置文件 `c7n-front-client.yaml`
        ```yaml
        env:
          MYSQL_HOST: c7n-mysql.c7n-system.svc
          MYSQL_PASS: password
          MYSQL_PORT: 3306
          MYSQL_USER: root
          SQL_SCRIPT: |
            INSERT INTO iam_service.oauth_client (name,organization_id,resource_ids,secret,scope,authorized_grant_types,web_server_redirect_uri,access_token_validity,refresh_token_validity,additional_information,auto_approve,object_version_number,created_by,creation_date,last_updated_by,last_update_date)VALUES('choerodon',1,'default','secret','default','password,implicit,client_credentials,authorization_code,refresh_token','http://c7n.example.choerodon.io',3600,3600,'{}','default',1,0,NOW(),0,NOW());
        ```
    - 部署服务
        ```
        helm install c7n/mysql-client \
            -f c7n-front-client.yaml \
            --version 0.1.0 \
            --name c7n-front-client \
            --namespace c7n-system
        ```

- 验证部署
    - 验证命令
        ```
        curl $(kubectl get svc choerodon-front -o jsonpath="{.spec.clusterIP}" -n c7n-system)
        ```
    - 出现以下类似信息即为成功部署
        ```html
        <!DOCTYPE html><html><head><meta http-equiv="Content-type"content="text/html; charset=utf-8"><title>Choerodon</title><link rel="shortcut icon"href="favicon.ico"></head><body><div id="app"></div><script type="text/javascript"src="app/vendor_19e4b950.js"></script><script type="text/javascript"src="app/main_19e4b950.js"></script></body></html>
        ```