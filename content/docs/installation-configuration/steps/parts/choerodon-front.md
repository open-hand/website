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
        --set preJob.preConfig.mysql.host=choerodon-mysql \
        --set preJob.preConfig.mysql.port=3306 \
        --set preJob.preConfig.mysql.dbname=iam_service \
        --set preJob.preConfig.mysql.username=choerodon \
        --set preJob.preConfig.mysql.password=password \
        --set preJob.preConfig.mysql.enabledelete=true \
        --set preJob.preConfig.mysql.upattrs="sort\,parent_id" \
        --set env.open.PRO_API_HOST="api.example.choerodon.io" \
        --set env.open.PRO_DEVOPS_HOST="ws://devops.service.example.choerodon.io" \
        --set env.open.PRO_AGILE_HOST="http://minio.example.choerodon.io/agile-service/" \
        --set env.open.PRO_CLIENT_ID="choerodon" \
        --set env.open.PRO_TITLE_NAME="Choerodon" \
        --set env.open.PRO_HEADER_TITLE_NAME="Choerodon" \
        --set env.open.PRO_HTTP="http" \
        --set env.open.PRO_FILE_SERVER="http://minio.example.com" \
        --set ingress.host="example.choerodon.io" \
        --set service.enable=true \
        --set ingress.enable=true \
        --name=choerodon-front \
        --version=0.8.0 --namespace=choerodon-devops-prod
    ```
    参数名 | 含义 
    --- |  --- 
    preJob.preConfig.mysql{}|初始化配置所需manager_service数据库信息
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

- 验证部署
    - 验证命令

        ```
        curl $(kubectl get svc choerodon-front -o jsonpath="{.spec.clusterIP}" -n choerodon-devops-prod)
        ```
    - 出现以下类似信息即为成功部署

        ```html
        <!DOCTYPE html><html><head><meta http-equiv="Content-type"content="text/html; charset=utf-8"><title>Choerodon</title><link rel="shortcut icon"href="favicon.ico"></head><body><div id="app"></div><script type="text/javascript"src="app/vendor_19e4b950.js"></script><script type="text/javascript"src="app/main_19e4b950.js"></script></body></html>
        ```

- 在访问搭建好的Choerodon的api，`api.example.choerodon.io/manager/swagger-ui.html`，选择`iam_service` -> `client-controller` -> `创建client`
  - 认证请使用用户名：admin，密码：admin
  - 提交以下数据，注意正式搭建时请替换以下值为真实值
      
        ```json
        {
            "accessTokenValidity": 60,
            "additionalInformation": "",
            "authorizedGrantTypes": "implicit,client_credentials,authorization_code,refresh_token",
            "autoApprove": "default",
            "name": "choerodon",
            "objectVersionNumber": 0,
            "organizationId": 1,
            "refreshTokenValidity": 60,
            "resourceIds": "default",
            "scope": "default",
            "secret": "secret",
            "webServerRedirectUri": "http://choerodon.example.choerodon.io"
        }
        ```