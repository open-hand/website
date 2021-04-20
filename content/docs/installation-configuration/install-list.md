+++
title = "组件安装列表"
description = "详细描述了在部署与配置中安装的基础组件名称，描述以及对应的版本信息"
weight = 5

+++

# 服务详情

## 基础组件列表

以下是通过本部署教程将会在安装的基础组件及其默认版本信息，其中一部分组件你可以直接使用你已搭建好的组件。

| 组件                      | 描述                      | 服务版本                      | Chart版本 | 关联模块   |
| ------------------------ | ------------------------ | ---------------------------- | --------- | --------- |
| containerd               | containerd               | 1.3.7-1                      | -         | -         |
| kube-proxy               | kube-proxy               | v1.16.15                     | -         | -         |
| kube-apiserver           | kube-apiserver           | v1.16.15                     | -         | -         |
| kube-controller-manager  | kube-controller-manager  | v1.16.15                     | -         | -         |
| kube-scheduler           | kube-scheduler           | v1.16.15                     | -         | -         |
| etcd                     | etcd                     | 3.4.13-0                     | -         | -         |
| coredns                  | coredns                  | 1.7.0                        | -         | -         |
| calico                   | calico                   | v3.17.1                      | -         | -         |
| kubernetes-dashboard     | kubernetes-dashboard     | v2.1.0                       | -         | -         |
| nginx-ingress-controller | nginx-ingress-controller | 0.29.0                       | -         | -         |
| Helm                     | Helm                     | v3.2.4                       | -         | -         |
| Chartmuseum              | Kubernetes应用私有包仓库   | v0.12.0                      | 2.15.0    | Devops流程 |
| Minio                    | 对象存储服务               | RELEASE.2020-01-03T19-12-21Z | 5.0.5     | 全模块     |
| Redis                    | 缓存数据库                 | 4.0.11                       | 0.2.3     | 全模块     |
| Mysql                    | 数据库                    | 5.7.23                       | 0.1.2     | 全模块     |
| Harbor                   | 容器的镜像库               | v2.1.4                       | 1.5.4     | Devops流程 |
| Nexus                    | 制品库                    | 3.25.1                       | 3.0.0     | Devops流程 |
| Gitlab                   | 代码托管                  | 11.11.7-ce.0                 | 0.5.3     | Devops流程 |
| Gitlab-Runner            | CI/CD 运行环境            | v11.11.4                     | 0.2.4     | Devops流程 |
| elasticsearch-kb         | 知识ES服务                | 7.9.2-elasticsearch-kb       | 0.25.0    | 知识管理    |

## Choerodon服务列表

以下是通过本部署教程将会在安装的Choerodon各服务及其版本信息。

| 模块       | 组件                  | 描述            | 版本   |
| --------- | --------------------- | -------------- | ------ |
| 框架服务    | choerodon-register    | 注册服务        | 0.25.1 |
| 框架服务    | choerodon-admin       | 平台治理服务     | 0.25.0 |
| 框架服务    | choerodon-iam         | IAM服务        | 0.25.5 |
| 框架服务    | choerodon-asgard      | 事务服务        | 0.25.0 |
| 框架服务    | choerodon-swagger     | swagger服务    | 0.25.0 |
| 框架服务    | choerodon-gateway     | 网关服务        | 0.25.1 |
| 框架服务    | choerodon-oauth       | 认证服务        | 0.25.1 |
| 框架服务    | choerodon-platform    | 平台服务        | 0.25.1 |
| 框架服务    | choerodon-monitor     | 监控审计服务     | 0.25.0 |
| 框架服务    | choerodon-file        | 文件服务        | 0.25.0 |
| 框架服务    | choerodon-message     | 消息服务        | 0.25.0 |
| Devops流程 | devops-service        | Devops 服务    | 0.25.3 |
| Devops流程 | gitlab-servcie        | 平台基础服务     | 0.25.0 |
| Devops流程 | workflow-service      | 工作流服务      | 0.25.1 |
| 敏捷管理    | agile-service         | 敏捷管理        | 0.25.1 |
| 测试管理    | test-manager-service  | 测试管理服务     | 0.25.0 |
| 知识管理    | knowledgebase-service | 知识服务（需安装Devops流程、敏捷管理、测试管理至少一个模块）| 0.25.0 |
| Devops流程 | prod-repo-service     | 制品库服务（可选）| 0.25.2 |
| Devops流程 | code-repo-service     | 代码管理服务（可选）| 0.25.0 |
| 框架服务    | choerodon-front       | Choerodon 前端  | 0.25.0 |
| 框架服务    | choerodon-front-hzero | hzero 前端      | 0.25.0 |
