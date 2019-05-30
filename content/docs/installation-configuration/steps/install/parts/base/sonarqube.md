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

### 验证部署

- 访问设置的SonarQube域名出现以下界面即部署成功

    ![](/docs/installation-configuration/image/sonarqube.png)

