+++
title = "组件安装列表"
description = "详细描述了在部署与配置中安装的基础组件名称，描述以及对应的版本信息"
weight = 5

+++

# 服务详情

## 基础组件列表

以下是通过本部署教程将会在安装的基础组件及其默认版本信息，其中一部分组件你可以直接使用你已搭建好的组件。

| 组件                      | 描述                      | 服务版本                     | Chart版本 |
| ------------------------ | ------------------------ | ---------------------------- | --------- |
| containerd               | containerd               | 1.3.7-1                      | -         |
| kube-proxy               | kube-proxy               | v1.16.15                      | -         |
| kube-apiserver           | kube-apiserver           | v1.16.15                      | -         |
| kube-controller-manager  | kube-controller-manager  | v1.16.15                      | -         |
| kube-scheduler           | kube-scheduler           | v1.16.15                      | -         |
| etcd                     | etcd                     | 3.4.13-0                     | -         |
| coredns                  | coredns                  | 1.7.0                        | -         |
| calico                   | calico                   | v3.17.1                      | -         |
| kubernetes-dashboard     | kubernetes-dashboard     | v2.1.0                       | -         |
| nginx-ingress-controller | nginx-ingress-controller | 0.29.0                       | -         |
| Helm                     | Helm                     | v3.2.4                       | -         |
| Chartmuseum              | Kubernetes应用私有包仓库   | v0.12.0                      | 2.15.0    |
| Minio                    | 对象存储服务               | RELEASE.2020-01-03T19-12-21Z | 5.0.5     |
| Redis                    | 缓存数据库                 | 4.0.11                       | 0.2.3     |
| Mysql                    | 数据库                    | 5.7.23                       | 0.1.2     |
| Harbor                   | 容器的镜像库               | v1.9.3                       | 1.2.3     |
| Nexus                    | 制品库                    | 3.25.1                       | 3.0.0     |
| Gitlab                   | 代码托管                  | 11.11.7-ce.0                 | 0.5.3     |
| Gitlab-Runner            | CI/CD 运行环境            | v11.11.4                     | 0.2.4     |
| elasticsearch-kb         | 知识ES服务                | 7.9.2-elasticsearch-kb         | 0.24.0    |

## Choerodon服务列表

以下是通过本部署教程将会在安装的Choerodon各服务及其版本信息。

| 组件                  | 描述           | 版本   |
| --------------------- | -------------- | ------ |
| choerodon-register    | 注册服务       | 0.24.0 |
| choerodon-admin       | 平台治理服务    | 0.24.0 |
| choerodon-iam         | IAM服务       | 0.24.1 |
| choerodon-asgard      | 事务服务       | 0.24.0 |
| choerodon-swagger     | swagger服务   | 0.24.0 |
| choerodon-gateway     | 网关服务       | 0.24.0 |
| choerodon-oauth       | 认证服务       | 0.24.1 |
| choerodon-platform    | 平台服务       | 0.24.0 |
| choerodon-monitor     | 监控审计服务    | 0.24.0 |
| choerodon-file        | 文件服务       | 0.24.0 |
| choerodon-message     | 消息服务       | 0.24.4 |
| devops-service        | Devops 服务    | 0.24.8 |
| gitlab-servcie        | 平台基础服务    | 0.24.0 |
| workflow-service      | 工作流服务      | 0.24.0 |
| agile-service         | 敏捷管理        | 0.24.1 |
| test-manager-service  | 测试管理服务     | 0.24.1 |
| knowledgebase-service | 知识服务        | 0.24.0 |
| prod-repo-service     | 制品库服务      | 0.24.4 |
| code-repo-service     | 代码管理服务     | 0.24.2 |
| choerodon-front       | Choerodon 前端  | 0.24.0 |
| choerodon-front-hzero | hzero 前端      | 0.24.0 |
