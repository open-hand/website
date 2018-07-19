+++
title = "SonarQube部署"
description = "SonarQube部署"
weight = 60
+++

# SonarQube部署

## 仓库设置

1. 本地添加远程仓库

    ```
    helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
    ```
1. 更新本地仓库信息

    ```
    helm repo update 
    ```

## 部署SonarQube

<blockquote class="note">
启用持久化存储请执行提前创建所对应的物理目录，PV和PVC可使用以下语句进行创建；可在部署命令中添加--debug --dry-run参数，进行渲染预览不进行部署。
</blockquote>

### 创建SonarQube所需PV和PVC

```shell
helm install paas/create-pv \
    --set type=nfs \
    --set pv.name=sonarqube-postgresql-pv \
    --set nfs.path=/u01/io-choerodon/sonarqube/postgresql \
    --set nfs.server=nfs.example.choerodon.io \
    --set pvc.name=sonarqube-postgresql-pvc \
    --set size=10Gi \
    --set accessModes={ReadWriteOnce} \
    --name sonarqube-postgresql-pv --namespace=choerodon-devops-prod

helm install paas/create-pv \
    --set type=nfs \
    --set pv.name=sonarqube-pv \
    --set nfs.path=/u01/io-choerodon/sonarqube/sonar \
    --set nfs.server=nfs.example.choerodon.io \
    --set pvc.name=sonarqube-pvc \
    --set size=10Gi \
    --set accessModes={ReadWriteOnce} \
    --name sonarqube-pv --namespace=choerodon-devops-prod
```

### 部署SonarQube

```shell
helm install paas/postgresql \
    --set persistence.enabled=true \
    --set persistence.existingClaim=sonarqube-postgresql-pvc \
    --set env.open.POSTGRES_USER=admin \
    --set env.open.POSTGRES_PASSWORD=handhand \
    --set env.open.POSTGRES_DB=sonar \
    --name sonarqube-postgresql --namespace=choerodon-devops-prod

helm install paas/sonarqube \
    --set persistence.enabled=true \
    --set persistence.existingClaim=sonarqube-pvc \
    --set env.open.SONARQUBE_JDBC_URL="jdbc:postgresql://sonarqube-postgresql/sonar" \
    --set env.open.SONARQUBE_JDBC_USERNAME=admin \
    --set env.open.SONARQUBE_JDBC_PASSWORD=handhand \
    --set ingress.enabled=true \
    --set ingress.hosts={sonarqube.example.choerodon.io} \
    --name sonarqube --namespace=choerodon-devops-prod
```

- 参数：

    参数 | 含义 
    --- |  --- 
    replicaCount|设置副本数量
    persistence.enabled|是否启用Zookeeper数据持久化
    persistence.selector|Zookeeper创建的pvc选pv的选择器值，为pv的label