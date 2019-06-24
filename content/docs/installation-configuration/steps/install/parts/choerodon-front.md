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

## 部署choerodon front
- 部署服务

    ```
    helm install c7n/choerodon-front \
        --set preJob.preConfig.db.host=c7n-mysql.c7n-system.svc \
        --set preJob.preConfig.db.port=3306 \
        --set preJob.preConfig.db.dbname=iam_service \
        --set preJob.preConfig.db.username=choerodon \
        --set preJob.preConfig.db.password=password \
        --set preJob.preConfig.db.enabledelete=true \
        --set preJob.preConfig.db.upattrs="sort\,parent_id" \
        --set env.open.PRO_API_HOST="api.example.choerodon.io" \
        --set env.open.PRO_DEVOPS_HOST="ws://devops.example.choerodon.io" \
        --set env.open.PRO_AGILE_HOST="http://minio.example.choerodon.io/agile-service/" \
        --set env.open.PRO_WEBSOCKET_SERVER="ws://notify.example.choerodon.io" \
        --set env.open.PRO_CLIENT_ID="choerodon" \
        --set env.open.PRO_TITLE_NAME="Choerodon" \
        --set env.open.PRO_HEADER_TITLE_NAME="Choerodon" \
        --set env.open.PRO_HTTP="http" \
        --set env.open.PRO_FILE_SERVER="http://minio.example.choerodon.io" \
        --set ingress.host="c7n.example.choerodon.io" \
        --set service.enabled=true \
        --set ingress.enabled=true \
        --name choerodon-front \
        --version 0.18.0 \
        --namespace c7n-system
    ```
    参数名 | 含义 
    --- |  --- 
    preJob.preConfig.db{}|初始化配置所需manager_service数据库信息
    env.open.PRO_API_HOST|api地址
    env.open.PRO_DEVOPS_HOST|devops service地址
    env.open.PRO_AGILE_HOST|minio地址，地址中agile-service为minio bucket
    env.open.PRO_CLIENT_ID|client id
    env.open.PRO_TITLE_NAME|页面显示标题
    env.open.PRO_HEADER_TITLE_NAME|页面header标题
    env.open.PRO_HTTP|使用协议
    env.open.PRO_FILE_SERVER|minio地址
    service.enable|创建service对象
    ingress.enable|创建ingress对象
    ingress.host|域名地址，此处不能带http://

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
                VALUES('choerodon'\,1\,'default'\,'secret'\,'default'\,\
                'password\,implicit\,client_credentials\,authorization_code\,refresh_token'\,\
                'http://c7n.example.choerodon.io'\,3600\,3600\,'{}'\,'default'\,1\,0\,NOW()\,0\,NOW());" \
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