+++
title = "启停"
description = "介绍了如何正确启动和停止Choerodon平台"
weight = 10
icon = "icon-stop"
+++

## 停止Choerodon

<blockquote class="note">
本文执行的所有命令都是基于分步安装命令进行的操作，若你在执行安装命令时有修改 --name 参数，那么请对应修改以下命令的deployment name参数。
</blockquote>

- 命令格式为： `kubectl scale deployment -n [namespace] --replicas=0 [deployment name]`

    ```shell
    kubectl scale deployment -n choerodon-devops-prod --replicas=0 register-server
    kubectl scale deployment -n choerodon-devops-prod --replicas=0 config-server
    kubectl scale deployment -n choerodon-devops-prod --replicas=0 manager-service
    kubectl scale deployment -n choerodon-devops-prod --replicas=0 iam-service
    kubectl scale deployment -n choerodon-devops-prod --replicas=0 api-gateway
    kubectl scale deployment -n choerodon-devops-prod --replicas=0 gateway-helper
    kubectl scale deployment -n choerodon-devops-prod --replicas=0 oauth-server
    kubectl scale deployment -n choerodon-devops-prod --replicas=0 event-store-service
    kubectl scale deployment -n choerodon-devops-prod --replicas=0 file-service
    kubectl scale deployment -n choerodon-devops-prod --replicas=0 hystrix-dashboard
    kubectl scale deployment -n choerodon-devops-prod --replicas=0 hystrix-turbine
    kubectl scale deployment -n choerodon-devops-prod --replicas=0 choerodon-front-iam
    kubectl scale deployment -n choerodon-devops-prod --replicas=0 devops-service
    kubectl scale deployment -n choerodon-devops-prod --replicas=0 gitlab-service
    kubectl scale deployment -n choerodon-devops-prod --replicas=0 choerodon-front
    ```

## 启动Choerodon

<blockquote class="note">
请一定按以下启动顺序执行，确认启动的服务启动成功后再启动下一个服务。
</blockquote>

1. `kubectl scale deployment -n choerodon-devops-prod --replicas=1 register-server`
1. `kubectl scale deployment -n choerodon-devops-prod --replicas=1 config-server`
1. `kubectl scale deployment -n choerodon-devops-prod --replicas=1 manager-service`
1. `kubectl scale deployment -n choerodon-devops-prod --replicas=1 iam-service`
1. `kubectl scale deployment -n choerodon-devops-prod --replicas=1 api-gateway`
1. `kubectl scale deployment -n choerodon-devops-prod --replicas=1 gateway-helper`
1. `kubectl scale deployment -n choerodon-devops-prod --replicas=1 oauth-server`
1. `kubectl scale deployment -n choerodon-devops-prod --replicas=1 event-store-service`
1. `kubectl scale deployment -n choerodon-devops-prod --replicas=1 file-service`
1. `kubectl scale deployment -n choerodon-devops-prod --replicas=1 hystrix-dashboard`
1. `kubectl scale deployment -n choerodon-devops-prod --replicas=1 hystrix-turbine`
1. `kubectl scale deployment -n choerodon-devops-prod --replicas=1 choerodon-front-iam`
1. `kubectl scale deployment -n choerodon-devops-prod --replicas=1 devops-service`
1. `kubectl scale deployment -n choerodon-devops-prod --replicas=1 gitlab-service`
1. `kubectl scale deployment -n choerodon-devops-prod --replicas=1 choerodon-front`
