+++
title = "组件安装列表"
description = "详细描述了在部署与配置中安装的基础组件名称，描述以及对应的版本信息"
weight = 5

+++

# 服务详情

## 基础组件列表

以下是通过本部署教程将会在安装的基础组件及其默认版本信息，其中一部分组件你可以直接使用你已搭建好的组件。

| 组件                     | 描述                     | 服务版本                     | Chart版本 |
| ------------------------ | ------------------------ | ---------------------------- | --------- |
| Docker                   | Docker                   | 19.03.6-ce                   | -         |
| kube-proxy               | kube-proxy               | v1.16.7                      | -         |
| kube-apiserver           | kube-apiserver           | v1.16.7                      | -         |
| kube-controller-manager  | kube-controller-manager  | v1.16.7                      | -         |
| kube-scheduler           | kube-scheduler           | v1.16.7                      | -         |
| etcd                     | etcd                     | 3.4.3-0                      | -         |
| coredns                  | coredns                  | 1.3.1                        | -         |
| kube-flannel             | kube-flannel             | v0.11.0-amd64                | -         |
| kubernetes-dashboard     | kubernetes-dashboard     | v2.0.0-rc5                   | -         |
| nginx-ingress-controller | nginx-ingress-controller | 0.29.0                       | -         |
| Helm                     | Helm                     | v3.2.4                       | -         |
| Chartmuseum              | Kubernetes应用私有包仓库  | v0.11.0                      | 2.6.0     |
| Minio                    | 对象存储服务              | RELEASE.2020-01-03T19-12-21Z | 5.0.5     |
| Redis                    | 缓存数据库                | 4.0.11                       | 0.2.3     |
| Mysql                    | 数据库                   | 5.7.23                       | 0.1.2     |
| Harbor                   | 容器的镜像库              | v1.9.3                       | 1.2.3     |
| Nexus                    | 制品库                   | 3.25.1                       | 3.0.0     |
| Gitlab                   | 代码托管                 | 11.11.7-ce.0                 | 0.5.3     |
| Gitlab-Runner            | CI/CD 运行环境           | v11.11.4                     | 0.2.4     |
| elasticsearch-kb         | 知识ES服务               | 7.2-elasticsearch-kb         | 0.22.1    |

## Choerodon服务列表

以下是通过本部署教程将会在安装的Choerodon各服务及其版本信息。

| 组件                  | 描述           | 版本   |
| --------------------- | -------------- | ------ |
| choerodon-register    | 注册服务       | 0.23.1 |
| choerodon-admin       | 平台治理服务    | 0.23.1 |
| choerodon-iam         | IAM服务       | 0.23.14 |
| choerodon-asgard      | 事务服务       | 0.23.7 |
| choerodon-swagger     | swagger服务   | 0.23.1 |
| choerodon-gateway     | 网关服务       | 0.23.2 |
| choerodon-oauth       | 认证服务       | 0.23.1 |
| choerodon-platform    | 平台服务       | 0.23.5 |
| choerodon-monitor     | 监控审计服务    | 0.23.2 |
| choerodon-file        | 文件服务       | 0.23.1 |
| choerodon-message     | 消息服务       | 0.23.8 |
| devops-service        | Devops 服务    | 0.23.15 |
| gitlab-servcie        | 平台基础服务    | 0.23.1 |
| workflow-service      | 工作流服务      | 0.23.3 |
| agile-service         | 敏捷管理        | 0.23.7 |
| test-manager-service  | 测试管理服务     | 0.23.3 |
| knowledgebase-service | 知识服务        | 0.23.1 |
| prod-repo-service     | 制品库服务      | 0.23.6 |
| code-repo-service     | 代码管理服务     | 0.23.2 |
| choerodon-front       | Choerodon 前端  | 0.23.1 |
| choerodon-front-hzero | hzero 前端      | 0.23.1 |
