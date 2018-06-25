+++
title = "卸载"
description = "详细介绍了一键部署和分步部署对应的两种卸载方式"
weight = 11
icon = "&#xe624;"
+++

## 卸载一键安装的Choerodon

<blockquote class="warning">
此操作不可逆，如有需要请做好备份操作。此删除方式将会删除部署的所有基础组件比如Gitlab、Harbor，kafka等，以及Choerodon的所有服务，若需保留基础组件，请参考下面卸载分步安装的Choerodon。
</blockquote>

1. 再次执行安装脚本，按安装脚本提示执行删除命令。
1. 删除`values.yml`中定义的物理目录中的数据。
1. 如有需要最后可将`namespace`一并删除，`kubectl delete ns [namespace]`。

## 卸载分步安装的Choerodon

<blockquote class="warning">
此操作不可逆，如有需要请做好备份操作。
</blockquote>

<blockquote class="note">
本文执行的所有命令都是基于分步安装命令进行的操作，若你在执行安装命令时有修改 --name 参数，那么请对应修改以下删除命令的参数。
</blockquote>

- 命令格式为： `helm delete [flags] RELEASE_NAME [...]`，详细请参考[Helm官方文档](https://docs.helm.sh/helm/#helm-delete)
- 删除chartmuseum：`helm delete --purge chartmuseum`
- 删除chartmuseum-pv：`helm delete --purge chartmuseum-pv`
- 删除minio：`helm delete --purge minio`
- 删除minio-pv：`helm delete --purge minio-pv`
- 删除devops-redis：`helm delete --purge devops-redis`
- 删除devops-redis-pv：`helm delete --purge devops-redis-pv`
- 删除choerodon-mysql：`helm delete --purge choerodon-mysql`
- 删除zookeeper：`helm delete --purge zookeeper`
- 删除zookeeper-pv-00：`helm delete --purge zookeeper-pv-00`
- 删除zookeeper-pv-01：`helm delete --purge zookeeper-pv-01`
- 删除zookeeper-pv-02：`helm delete --purge zookeeper-pv-02`
- 删除kafka：`helm delete --purge kafka`
- 删除kafka-pv-00：`helm delete --purge kafka-pv-00`
- 删除kafka-pv-01：`helm delete --purge kafka-pv-01`
- 删除kafka-pv-02：`helm delete --purge kafka-pv-02`
- 删除harbor：`helm delete --purge harbor`
- 删除harbor-adminserver-pv：`helm delete --purge harbor-adminserver-pv`
- 删除harbor-mysql-pv：`helm delete --purge harbor-mysql-pv`
- 删除harbor-registry-pv：`helm delete --purge harbor-registry-pv`
- 删除harbor-notary-pv：`helm delete --purge harbor-notary-pv`
- 删除harbor-postgresql-pv：`helm delete --purge harbor-postgresql-pv`
- 删除gitlab：`helm delete --purge gitlab`
- 删除gitlab-pv：`helm delete --purge gitlab-pv`
- 删除gitlab-redis：`helm delete --purge gitlab-redis`
- 删除gitlab-mysql：`helm delete --purge gitlab-mysql`
- 删除gitlab-mysql-pv：`helm delete --purge gitlab-mysql-pv`
- 删除register-server：`helm delete --purge register-server`
- 删除config-server：`helm delete --purge config-server`
- 删除manager-service：`helm delete --purge manager-service`
- 删除iam-service：`helm delete --purge iam-service`
- 删除api-gateway：`helm delete --purge api-gateway`
- 删除gateway-helper：`helm delete --purge gateway-helper`
- 删除oauth-server：`helm delete --purge oauth-server`
- 删除event-store-service：`helm delete --purge event-store-service`
- 删除file-service：`helm delete --purge file-service`
- 删除hystrix-dashboard：`helm delete --purge hystrix-dashboard`
- 删除hystrix-turbine：`helm delete --purge hystrix-turbine`
- 删除choerodon-front-iam：`helm delete --purge choerodon-front-iam`
- 删除devops-service：`helm delete --purge devops-service`
- 删除gitlab-service：`helm delete --purge gitlab-service`
- 删除choerodon-front：`helm delete --purge choerodon-front`
- 删除runner：`helm delete --purge runner`
- 删除runner-maven-pv：`helm delete --purge runner-maven-pv`
- 删除runner-cache-pv：`helm delete --purge runner-cache-pv`
- 删除devops service pv：`helm delete --purge devops-service-pv`

