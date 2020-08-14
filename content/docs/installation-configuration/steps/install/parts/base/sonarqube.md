+++
title ="SonarQube部署"
description ="SonarQube部署"
weight = 60
+++

# SonarQube部署

<blockquote class="note">
SonarQube并非猪齿鱼运行必要基础组件，你可以选择性进行安装。
</blockquote>

## 预备知识

如果你不知道SonarQube是做什么的，那么请参考下面链接（包括但不限于）进行学习：

- [SonarQube](https://docs.sonarqube.org/7.6/)

## 仓库设置

## 添加choerodon chart仓库并同步

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

## 部署SonarQube

<blockquote class="warning">
注意：本事例中 PostgreSql 数据库搭建仅为快速体验 SonarQube 而编写，由于使用了NFS存储故并不能保证其稳定运行或数据不丢失，您可以参照 PostgreSql 官网进行搭建。
</blockquote>

```
helm upgrade --install sonarqube c7n/sonarqube \
    --set persistence.enabled=true \
    --set persistence.storageClass=nfs-provisioner \
    --set postgresql.persistence.storageClass=nfs-provisioner \
    --set ingress.enabled=true \
    --set ingress.'hosts[0]'=sonarqube.example.choerodon.io \
    --set plugins.'install[0]'=https://file.choerodon.com.cn/choerodon-install/sonarqube/sonar-auth-choerodonoauth-plugin-1.5.3.RELEASE.jar \
    --create-namespace \
    --version 0.15.0-3 \
    --namespace c7n-system
```

- 更多参数及含义请参考[SonarQube Chart](https://github.com/helm/charts/tree/155659de436be352b0e8fd12d4954d82c62c7068/stable/sonarqube#sonarqube)

## 安装SoanrQube插件
- 此步骤用于之前已经安装过SonarQube，只需安装插件的情况（如已经执行过上一步可跳过此步骤）
- 进入SonarQube安装目录，下载https://file.choerodon.com.cn/choerodon-install/sonarqube/sonar-auth-choerodonoauth-plugin-1.5.3.RELEASE.jar 插件到\data\sonarqube\extensions\plugins目录
- 重启SoanrQube服务

## 验证部署

- 访问设置的SonarQube域名出现以下界面即部署成功

    ![](/docs/installation-configuration/image/sonarqube.png)

## 配置 Choerodon 认证

<blockquote class="warning">
  <ul>
  <li>以下操作须将Choerodon搭建完成后再继续进行，若未搭建，请跳过。</li>
  </ul>
</blockquote>

### 添加Choerodon Client

- 编写参数配置文件 `sonarqube-client.yaml`

    ```yaml
    env:
      MYSQL_HOST: c7n-mysql.c7n-system.svc
      MYSQL_PASS: password
      MYSQL_PORT: 3306
      MYSQL_USER: root
      SQL_SCRIPT: |
        INSERT INTO hzero_platform.oauth_client (name,organization_id,resource_ids,secret,scope,authorized_grant_types,web_server_redirect_uri,access_token_validity,refresh_token_validity,additional_information,auto_approve,object_version_number,created_by,creation_date,last_updated_by,last_update_date,enabled_flag,time_zone)VALUES('sonar',1,'default','sonarsonar','default','password,implicit,client_credentials,authorization_code,refresh_token','http://sonarqube.example.choerodon.io',3600,3600,'{}','default',1,0,NOW(),0,NOW(),1,'GMT+8');
    ```

- 部署服务
  
    ```
    helm upgrade --install sonarqube-client c7n/mysql-client \
        -f sonarqube-client.yaml \
        --version 0.1.0 \
        --create-namespace \
        --namespace c7n-system
    ```

### 配置用户权限

<blockquote class="note">
默认管理员用户名：admin，密码：admin
</blockquote>

- 使用管理员用户登录 SoanrQube
- 配置默认新建项目为`Private`, 进入 `Administration` -> `Projects` -> `Management`
    ![](/docs/installation-configuration/image/sonarqube_1.png)
    
- 更改默认权限模板, 进入 `Administration` -> `Security` -> `Permission Templates` ,去掉 `sonar-users` 用户组所有权限
    ![](/docs/installation-configuration/image/sonarqube_2.png)
    ![](/docs/installation-configuration/image/sonarqube_3.png)
    
### 配置认证插件
- 使用管理员用户登录 SoanrQube
- 进入 `Administration` -> `Configuration` ->`choerodon`
- 更改 `Enabled` 为启用
- 更改 `Choerodon url` 为当前使用的 `choerodon api getaway` 地址；默认地址为：`http://api.example.choerodon.io`
    ![](/docs/installation-configuration/image/sonarqube_4.png)

- 更改 `sonar url` 为当前使用的SonarQube实际地址
- 退出登录，测试使用choerodon登录,出现如下界面
    ![](/docs/installation-configuration/image/sonarqube_5.png)
    
- Choerodon权限与SonarQube权限为lazy分配，对于用户登录后在SonarQube没有权限的应用服务，从Choerodon代码质量详情界面，跳转登录到SonarQube即可。


## Choerodon应用关联SonarQube项目

- 部署devops-service时添加SonarQube环境变量

    ```yaml
    SERVICES_SONARQUBE_URL: http://sonarqube.example.choerodon.io
    SERVICES_SONARQUBE_USERNAME: admin
    SERVICES_SONARQUBE_PASSWORD: admin
    ```

- Choerodon 应用关联 SonarQube 针对 maven 和非 maven 项目有不同的配置。
    -  如果是 maven 项目可以在 .gitlab-ci.yml 文件 build 阶段添加

    ```
    - >-
        mvn --batch-mode  verify sonar:sonar
        -Dsonar.host.url=$SONAR_URL -Dsonar.login=$SONAR_LOGIN
        -Dsonar.gitlab.project_id=$CI_PROJECT_PATH
        -Dsonar.gitlab.commit_sha=$CI_COMMIT_SHA
        -Dsonar.gitlab.ref_name=$CI_COMMIT_REF_NAME
        -Dsonar.analysis.serviceGroup=$GROUP_NAME
        -Dsonar.analysis.commitId=$CI_COMMIT_SHA
        -Dsonar.projectKey=${GROUP_NAME}:${PROJECT_NAME}
    ```

    - 其他项目可以使用 sonar-scanner，在 .gitlab-ci.yml 文件 build 阶段添加
      
        <blockquote class="note">
        请确保 cibase 的镜像版本大于等于 0.10.0
        </blockquote>

    ```
    - >-
        sonar-scanner -Dsonar.host.url=$SONAR_URL -Dsonar.login=$SONAR_LOGIN
        -Dsonar.gitlab.project_id=$CI_PROJECT_PATH
        -Dsonar.gitlab.commit_sha=$CI_COMMIT_SHA
        -Dsonar.gitlab.ref_name=$CI_COMMIT_REF_NAME
        -Dsonar.analysis.serviceGroup=$GROUP_NAME
        -Dsonar.analysis.commitId=$CI_COMMIT_SHA
        -Dsonar.projectKey=${GROUP_NAME}:${PROJECT_NAME}
        -Dsonar.sources=.
    ```

- sonar.projectKey=${GROUP_NAME}:${PROJECT_NAME}不可更改；否则，在查看代码质量时将获取不到对应数据
- sonar.sources 指定扫描代码的路径
- GROUP_NAME和PROJECT_NAME是devops-service内置的环境变量， GROUP_NAME=当前项目所在组织编码-当前项目编码，PROJECT_NAME=当前应用编码
- 如果手动创建SonarQube项目，项目命名规则为：当前项目所在组织编码-当前项目编码:当前应用编码
