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
    kubectl scale deployment -n c7n-system --replicas=0 minio
    kubectl scale deployment -n c7n-system --replicas=0 redis
    kubectl scale deployment -n c7n-system --replicas=0 mysql
    kubectl scale deployment -n c7n-system --replicas=0 harbor-harbor-adminserver
    kubectl scale deployment -n c7n-system --replicas=0 harbor-harbor-clair
    kubectl scale deployment -n c7n-system --replicas=0 harbor-harbor-core
    kubectl scale deployment -n c7n-system --replicas=0 harbor-harbor-jobservice
    kubectl scale deployment -n c7n-system --replicas=0 harbor-harbor-registry
    kubectl scale deployment -n c7n-system --replicas=0 harbor-harbor-portal
    kubectl scale deployment -n c7n-system --replicas=0 gitlab

    # 微服务开发框架
    kubectl scale deployment -n c7n-system --replicas=0 register-server
    kubectl scale deployment -n c7n-system --replicas=0 asgard-service
    kubectl scale deployment -n c7n-system --replicas=0 manager-service
    kubectl scale deployment -n c7n-system --replicas=0 notify-service
    kubectl scale deployment -n c7n-system --replicas=0 base-service
    kubectl scale deployment -n c7n-system --replicas=0 api-gateway
    kubectl scale deployment -n c7n-system --replicas=0 oauth-server
    kubectl scale deployment -n c7n-system --replicas=0 file-service

    # 持续交付
    kubectl scale deployment -n c7n-system --replicas=0 devops-service
    kubectl scale deployment -n c7n-system --replicas=0 gitlab-service
    kubectl scale deployment -n c7n-system --replicas=0 workflow-service

    # 敏捷管理
    kubectl scale deployment -n c7n-system --replicas=0 agile-service
    kubectl scale deployment -n c7n-system --replicas=0 state-machine-service
    kubectl scale deployment -n c7n-system --replicas=0 issue-service
    kubectl scale deployment -n c7n-system --replicas=0 foundation-service

    # 测试管理
    kubectl scale deployment -n c7n-system --replicas=0 test-manager-service

    # 知识管理
    kubectl scale deployment -n c7n-system --replicas=0 knowledgebase-service

    # 总前端
    kubectl scale deployment -n c7n-system --replicas=0 choerodon-front
    ```

## 启动Choerodon

<blockquote class="note">
请一定按以下启动顺序执行，确认启动的服务启动成功后再启动下一个服务。
</blockquote>

```shell
# 基础组件
kubectl scale deployment -n c7n-system --replicas=1 chartmuseum-chartmuseum
kubectl scale deployment -n c7n-system --replicas=1 minio
kubectl scale deployment -n c7n-system --replicas=1 redis
kubectl scale deployment -n c7n-system --replicas=1 mysql
kubectl scale deployment -n c7n-system --replicas=1 harbor-harbor-adminserver
kubectl scale deployment -n c7n-system --replicas=1 harbor-harbor-clair
kubectl scale deployment -n c7n-system --replicas=1 harbor-harbor-core
kubectl scale deployment -n c7n-system --replicas=1 harbor-harbor-jobservice
kubectl scale deployment -n c7n-system --replicas=1 harbor-harbor-registry
kubectl scale deployment -n c7n-system --replicas=1 harbor-harbor-portal
kubectl scale deployment -n c7n-system --replicas=1 gitlab

# 微服务开发框架
kubectl scale deployment -n c7n-system --replicas=1 register-server
kubectl scale deployment -n c7n-system --replicas=1 asgard-service
kubectl scale deployment -n c7n-system --replicas=1 manager-service
kubectl scale deployment -n c7n-system --replicas=1 notify-service
kubectl scale deployment -n c7n-system --replicas=1 base-service
kubectl scale deployment -n c7n-system --replicas=1 api-gateway
kubectl scale deployment -n c7n-system --replicas=1 oauth-server
kubectl scale deployment -n c7n-system --replicas=1 file-service

# 持续交付
kubectl scale deployment -n c7n-system --replicas=1 devops-service
kubectl scale deployment -n c7n-system --replicas=1 gitlab-service
kubectl scale deployment -n c7n-system --replicas=1 workflow-service

# 敏捷管理
kubectl scale deployment -n c7n-system --replicas=1 agile-service
kubectl scale deployment -n c7n-system --replicas=1 state-machine-service
kubectl scale deployment -n c7n-system --replicas=1 issue-service
kubectl scale deployment -n c7n-system --replicas=1 foundation-service

# 测试管理
kubectl scale deployment -n c7n-system --replicas=1 test-manager-service

# 知识管理
kubectl scale deployment -n c7n-system --replicas=1 knowledgebase-service

# 总前端
kubectl scale deployment -n c7n-system --replicas=1 choerodon-front
```
