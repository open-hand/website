+++
title = "测试管理部署"
description = "测试管理部署"
weight = 40
+++

# 部署测试管理

<blockquote class="warning">
在此之前，应该准备好Mysql、Harbor、Gitlab、Minio，Chartmuseum这些组件的信息。按以下搭建顺序进行搭建，请不要随意调整搭建顺序。
</blockquote>

## 添加choerodon chart仓库

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

## 创建数据库

```
helm install c7n/mysql-client \
    --set env.MYSQL_HOST=c7n-mysql.c7n-system.svc \
    --set env.MYSQL_PORT=3306 \
    --set env.MYSQL_USER=root \
    --set env.MYSQL_PASS=password \
    --set env.SQL_SCRIPT="\
          CREATE USER IF NOT EXISTS 'choerodon'@'%' IDENTIFIED BY 'password';\
          CREATE DATABASE IF NOT EXISTS test_manager_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\
          GRANT ALL PRIVILEGES ON test_manager_service.* TO choerodon@'%';\
          FLUSH PRIVILEGES;" \
    --version 0.1.0 \
    --name create-c7ntest-db \
    --namespace c7n-system
```

## 部署test manager service

- 部署服务

    ``` 
    helm install c7n/test-manager-service \
        --set preJob.preConfig.datasource.url="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set preJob.preConfig.datasource.username=choerodon \
        --set preJob.preConfig.datasource.password=password \
        --set preJob.preInitDB.datasource.url="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/test_manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set preJob.preInitDB.datasource.username=choerodon \
        --set preJob.preInitDB.datasource.password=password \
        --set env.open.SPRING_DATASOURCE_URL="jdbc:mysql://c7n-mysql.c7n-system.svc:3306/test_manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
        --set env.open.SPRING_DATASOURCE_USERNAME=choerodon \
        --set env.open.SPRING_DATASOURCE_PASSWORD=password \
        --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.c7n-system:8000/eureka/" \
        --set env.open.SPRING_CLOUD_CONFIG_ENABLED=true \
        --set env.open.SPRING_CLOUD_CONFIG_URI="http://register-server.c7n-system:8000/" \
        --set env.open.SPRING_REDIS_HOST=c7n-redis.c7n-system.svc \
        --set env.open.SPRING_REDIS_DATABASE=13 \
        --name test-manager-service \
        --version 0.16.0 \
        --namespace c7n-system
    ```
    参数名 | 含义 
    --- |  --- 
    service.enable|是否创建service
    preJob.preConfig.datasource{}|初始化配置所需manager_service数据库信息
    preJob.preInitDB.datasource{}|初始化数据库所需数据库信息
    env.open.SPRING_DATASOURCE_URL|数据库链接地址
    env.open.SPRING_DATASOURCE_USERNAME|数据库用户名
    env.open.SPRING_DATASOURCE_PASSWORD|数据库密码
    env.open.SPRING_CLOUD_CONFIG_ENABLED|启用配置中心
    env.open.SPRING_CLOUD_CONFIG_URI|配置中心地址
    env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE|注册服务地址
    env.open.SPRING_REDIS_HOST|redis 链接地址

- 验证部署
    - 验证命令

        ```
        curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=test-manager-service -o jsonpath="{.items[0].status.podIP}"):8094/actuator/health | jq -r .status
        ```
    - 出现以下类似信息即为成功部署
        ```
        UP
        ```

## 数据兼容

<blockquote class="note">
若为第一次部署，请忽略本小节。本小节旨在修复老版本已产生的数据适配测试管理模块
</blockquote>

- 当从0.7升级至0.8时的数据升级：数据升级会在每一个版本下生成一个临时循环，以下是修复步骤，在访问搭建好的Choerodon的api，`api.example.choerodon.io/manager/swagger-ui.html`，选择`test_manager_service` -> `test-cycle-controller` -> `数据升级`
  - 认证请使用用户名：admin，密码：admin
  - 在project_id字段输入一个存在的项目id 例如：1
  - 提交执行，即可修复数据。

- 当从0.9升级至0.10时的数据升级：此次数据升级将会把执行逆向生成用例，不同文件夹下的相同用例将复制，并在每一个版本下生成一个临时文件夹，以下是修复步骤
  - 进入`example.choerodon.io/#/iam/api-test`选择`test_manager_service` -> `test-cycle-controller` 
  
  ![](/img/docs/installation-configuration/parts/data_fix1.png)

  - 点击`/v1/projects/{project_id}/cycle/fix`右侧按钮进入API测试页面

  ![](/img/docs/installation-configuration/parts/data_fix2.png)

  - 填入一个存在的project_id点击发送即可，等待日志中出现`fix data successful`，数据即升级成功，如果日志中抛出了异常，则重试即可。