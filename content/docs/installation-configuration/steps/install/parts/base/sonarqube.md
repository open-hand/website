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
helm install c7n/sonarqube \
    --set persistence.enabled=true \
    --set persistence.storageClass=nfs-provisioner \
    --set postgresql.persistence.storageClass=nfs-provisioner \
    --set ingress.enabled=true \
    --set ingress.'hosts[0]'=sonarqube.example.choerodon.io \
    --set plugins.'install[0]'=https://file.choerodon.com.cn/choerodon-install/sonarqube/sonar-auth-choerodonoauth-plugin-1.0-RELEASE.jar \
    --set plugins.'install[1]'=https://github.com/gabrie-allaigre/sonar-gitlab-plugin/releases/download/4.0.0/sonar-gitlab-plugin-4.0.0.jar \
    --set plugins.'install[2]'=https://binaries.sonarsource.com/Distribution/sonar-java-plugin/sonar-java-plugin-5.12.1.17771.jar \
    --set plugins.'install[3]'=https://binaries.sonarsource.com/Distribution/sonar-javascript-plugin/sonar-javascript-plugin-5.1.1.7506.jar \
    --version 0.15.0 \
    --name sonarqube \
    --namespace c7n-system
```

- 更多参数及含义请参考[SonarQube Chart](https://github.com/helm/charts/tree/155659de436be352b0e8fd12d4954d82c62c7068/stable/sonarqube#sonarqube)

## 验证部署

- 访问设置的SonarQube域名出现以下界面即部署成功

    ![](/docs/installation-configuration/image/sonarqube.png)

## 配置 Choerodon 认证

<blockquote class="warning">
  <ul>
  <li>以下操作须将Choerodon搭建完成后再继续进行，若未搭建，请跳过。</li>
  </ul>
</blockquote>

- 记得修改`http://sonarqube.example.choerodon.io`为实际的SonarQube地址
  
    ```
    helm install c7n/mysql-client \
        --set env.MYSQL_HOST=c7n-mysql.c7n-system.svc \
        --set env.MYSQL_PORT=3306 \
        --set env.MYSQL_USER=root \
        --set env.MYSQL_PASS=password \
        --set env.SQL_SCRIPT="\
            INSERT INTO iam_service.oauth_client ( \
            name\,organization_id\,resource_ids\,secret\,scope\,\
            authorized_grant_types\,web_server_redirect_uri\,\
            access_token_validity\,refresh_token_validity\,\
            additional_information\,auto_approve\,object_version_number\,\
            created_by\,creation_date\,last_updated_by\,last_update_date)\
            VALUES('sonar'\,1\,'default'\,'secret'\,'default'\,\
            'password\,implicit\,client_credentials\,authorization_code\,refresh_token'\,\
            'http://sonarqube.example.choerodon.io/oauth2/callback/choerodon'\,3600\,3600\,'{}'\,'default'\,1\,0\,NOW()\,0\,NOW());" \
        --version 0.1.0 \
        --name gitlab-client \
        --namespace c7n-system
    ```

### 初始化sonarqube权限
- 使用admin登录soanr
- 配置默认新建项目为私有, 进入Administration -> Projects -> Management

   ![](/docs/installation-configuration/image/sonarqube_1.png)
   
- 更改默认权限模板, 进入Administration -> Security -> Permission Templates,去掉sonar-users用户组所有权限

   ![](/docs/installation-configuration/image/sonarqube_2.png)
   ![](/docs/installation-configuration/image/sonarqube_3.png)
   
###  下载soanr-choerodon插件
- 进入sonar安装目录，切换到目录：sonarqube\extensions\plugins
- 下载soanr-choerodon插件
````
curl -o sonar-auth-choerodonoauth-plugin-1.0-RELEASE.jar https://file.choerodon.com.cn/choerodon-install/sonarqube/sonar-auth-choerodonoauth-plugin-1.0-RELEASE.jar
````
###  重启soanrQube服务
- 使用docker命令：docker restart sonar
- 或者使用admin登录，在Administration -> System界面，点击重启服务

### 配置插件
- 使用admin登录soanrQube
- 进入Administration -> choerodon
- 更改choerodon url为当前使用的choerodon getaway地址；默认地址为：http://api.example.choerodon.io

   ![](/docs/installation-configuration/image/sonarqube_4.png)
   
- 退出登录，测试使用choerodon登录,出现如下界面

   ![](/docs/installation-configuration/image/sonarqube_5.png)
   
