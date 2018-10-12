+++
title = "SonarQube部署"
description = "SonarQube部署"
weight = 60
+++

# SonarQube部署

## 添加choerodon chart仓库并同步

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

## 部署SonarQube

### 创建SonarQube所需PV和PVC

```shell
helm install c7n/persistentvolumeclaim \
    --set accessModes={ReadWriteOnce} \
    --set requests.storage=2Gi \
    --set storageClassName=nfs-provisioner \
    --version 0.1.0 \
    --name sonarqube-postgresql-pvc \
    --namespace c7n-system

helm install c7n/persistentvolumeclaim \
    --set accessModes={ReadWriteOnce} \
    --set requests.storage=2Gi \
    --set storageClassName=nfs-provisioner \
    --version 0.1.0 \
    --name sonarqube-pvc \
    --namespace c7n-system
```

### 部署SonarQube

```shell
helm install c7n/postgresql \
    --set service.enabled=true \
    --set persistence.enabled=true \
    --set persistence.existingClaim=sonarqube-postgresql-pvc \
    --set env.POSTGRES_USER=admin \
    --set env.POSTGRES_PASSWORD=c7nc7nc7n \
    --set env.POSTGRES_DB=sonar \
    --version 0.1.0 \
    --name sonarqube-postgresql \
    --namespace c7n-system

helm install c7n/sonarqube \
    --set persistence.enabled=true \
    --set persistence.existingClaim=sonarqube-pvc \
    --set env.SONARQUBE_JDBC_URL="jdbc:postgresql://sonarqube-postgresql.c7n-system/sonar" \
    --set env.SONARQUBE_JDBC_USERNAME=admin \
    --set env.SONARQUBE_JDBC_PASSWORD=c7nc7nc7n \
    --set service.enabled=true \
    --set ingress.enabled=true \
    --set ingress.hosts=sonarqube.example.choerodon.io \
    --version 0.1.0 \
    --name sonarqube \
    --namespace c7n-systems
```