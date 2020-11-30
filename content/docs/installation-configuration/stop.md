+++
title = "启停"
description = "介绍了如何正确启动和停止Choerodon平台"
weight = 11

+++

## 停止Choerodon

<blockquote class="note">
本文执行的所有命令都是基于分步安装命令进行的操作，若你在执行安装命令时有修改 --name 参数，那么请对应修改以下命令的deployment name参数。
</blockquote>

- 命令格式为： `kubectl scale deployment -n [namespace] --replicas=0 [deployment name]`

    ```shell
    # 基础组件
    kubectl scale deployment -n c7n-system --replicas=0 chartmuseum-chartmuseum
    kubectl scale deployment -n c7n-system --replicas=0 c7n-mysql
    kubectl scale deployment -n c7n-system --replicas=0 c7n-redis
    kubectl scale deployment -n c7n-system --replicas=0 harbor-harbor-core
    kubectl scale deployment -n c7n-system --replicas=0 harbor-harbor-jobservice
    kubectl scale deployment -n c7n-system --replicas=0 harbor-harbor-portal
    kubectl scale deployment -n c7n-system --replicas=0 harbor-harbor-registry
    kubectl scale deployment -n c7n-system --replicas=0 sonarqube-postgresql
    kubectl scale deployment -n c7n-system --replicas=0 sonarqube-sonarqube
    kubectl scale deployment -n c7n-system --replicas=0 sonatype-nexus

    kubectl scale statefulset -n c7n-system --replicas=0 minio
    kubectl scale statefulset -n c7n-system --replicas=0 harbor-harbor-database
    kubectl scale statefulset -n c7n-system --replicas=0 harbor-harbor-redis
    kubectl scale statefulset -n c7n-system --replicas=0 gitlab-gitlab-core
    kubectl scale statefulset -n c7n-system --replicas=0 gitlab-gitlab-database
    kubectl scale statefulset -n c7n-system --replicas=0 gitlab-gitlab-redis

    # 微服务开发框架
    kubectl scale deployment -n c7n-system --replicas=0 choerodon-register
    kubectl scale deployment -n c7n-system --replicas=0 choerodon-platform
    kubectl scale deployment -n c7n-system --replicas=0 choerodon-admin
    kubectl scale deployment -n c7n-system --replicas=0 choerodon-iam
    kubectl scale deployment -n c7n-system --replicas=0 choerodon-asgard
    kubectl scale deployment -n c7n-system --replicas=0 choerodon-gateway
    kubectl scale deployment -n c7n-system --replicas=0 choerodon-message
    kubectl scale deployment -n c7n-system --replicas=0 choerodon-monitor
    kubectl scale deployment -n c7n-system --replicas=0 choerodon-oauth
    kubectl scale deployment -n c7n-system --replicas=0 choerodon-swagger
    kubectl scale deployment -n c7n-system --replicas=0 choerodon-file
    kubectl scale deployment -n c7n-system --replicas=0 choerodon-monitor

    # 持续交付
    kubectl scale deployment -n c7n-system --replicas=0 devops-service
    kubectl scale deployment -n c7n-system --replicas=0 gitlab-service
    kubectl scale deployment -n c7n-system --replicas=0 workflow-service

    # 敏捷管理
    kubectl scale deployment -n c7n-system --replicas=0 agile-service

    # 测试管理
    kubectl scale deployment -n c7n-system --replicas=0 test-manager-service

    # 知识管理
    kubectl scale deployment -n c7n-system --replicas=0 elasticsearch-kb
    kubectl scale deployment -n c7n-system --replicas=0 knowledgebase-service

    # 制品库
    kubectl scale deployment -n c7n-system --replicas=0 code-repo-service
    kubectl scale deployment -n c7n-system --replicas=0 prod-repo-service

    # 总前端
    kubectl scale deployment -n c7n-system --replicas=0 choerodon-front
    kubectl scale deployment -n c7n-system --replicas=0  choerodon-front-hzero
    ```

## 启动Choerodon

<blockquote class="note">
请一定按以下启动顺序执行，确认启动的服务启动成功后再启动下一个服务。
</blockquote>

```shell
# 基础组件
kubectl scale deployment -n c7n-system --replicas=1 chartmuseum-chartmuseum
kubectl scale statefulset -n c7n-system --replicas=4 minio
kubectl scale deployment -n c7n-system --replicas=1 c7n-redis
kubectl scale deployment -n c7n-system --replicas=1 c7n-mysql
kubectl scale statefulset -n c7n-system --replicas=1 harbor-harbor-redis
kubectl scale statefulset -n c7n-system --replicas=1 harbor-harbor-database
kubectl scale deployment -n c7n-system --replicas=1 harbor-harbor-portal
kubectl scale deployment -n c7n-system --replicas=1 harbor-harbor-jobservice
kubectl scale deployment -n c7n-system --replicas=1 harbor-harbor-registry
kubectl scale deployment -n c7n-system --replicas=1 harbor-harbor-core
kubectl scale statefulset -n c7n-system --replicas=1 gitlab-gitlab-database
kubectl scale statefulset -n c7n-system --replicas=1 gitlab-gitlab-redis
kubectl scale statefulset -n c7n-system --replicas=1 gitlab-gitlab-core
kubectl scale deployment -n c7n-system --replicas=1 sonarqube-postgresql
kubectl scale deployment -n c7n-system --replicas=1 sonarqube-sonarqube
kubectl scale deployment -n c7n-system --replicas=1 sonatype-nexus

# 微服务开发框架
kubectl scale deployment -n c7n-system --replicas=0 choerodon-register
kubectl scale deployment -n c7n-system --replicas=0 choerodon-platform
kubectl scale deployment -n c7n-system --replicas=0 choerodon-admin
kubectl scale deployment -n c7n-system --replicas=0 choerodon-asgard
kubectl scale deployment -n c7n-system --replicas=0 choerodon-iam
kubectl scale deployment -n c7n-system --replicas=0 choerodon-gateway
kubectl scale deployment -n c7n-system --replicas=0 choerodon-oauth
kubectl scale deployment -n c7n-system --replicas=0 choerodon-message
kubectl scale deployment -n c7n-system --replicas=0 choerodon-monitor
kubectl scale deployment -n c7n-system --replicas=0 choerodon-swagger
kubectl scale deployment -n c7n-system --replicas=0 choerodon-file
kubectl scale deployment -n c7n-system --replicas=0 choerodon-monitor

# 持续交付
kubectl scale deployment -n c7n-system --replicas=1 devops-service
kubectl scale deployment -n c7n-system --replicas=1 gitlab-service
kubectl scale deployment -n c7n-system --replicas=1 workflow-service

# 敏捷管理
kubectl scale deployment -n c7n-system --replicas=1 agile-service

# 测试管理
kubectl scale deployment -n c7n-system --replicas=1 test-manager-service

# 知识管理
kubectl scale deployment -n c7n-system --replicas=0 elasticsearch-kb
kubectl scale deployment -n c7n-system --replicas=1 knowledgebase-service

# 总前端
kubectl scale deployment -n c7n-system --replicas=1 choerodon-front
kubectl scale deployment -n c7n-system --replicas=0  choerodon-front-hzero
```
