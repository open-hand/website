+++
title = "本地运行"
description = "提供本地环境运行相关配置"
weight = 2
+++

# 本地运行

当您需要本地运行某一模块时，您先拉取对应仓库到本地，根据仓库中README的启动方式来运行。

{{< note >}}启动前端模块时需要先启动对应后端服务，并初始化数据库。{{</ note>}}

前后端服务对应关系如下：

|前端|后端|
|---|---|
|[choerodon-front-iam](https://github.com/choerodon/choerodon-front-iam)|[iam-service](https://github.com/choerodon/iam-service)|
|[choerodon-front-wiki](https://github.com/choerodon/choerodon-front-wiki)|[wiki-service](https://github.com/choerodon/wiki-service)|
|[choerodon-front-agile](https://github.com/choerodon/choerodon-front-agile)|[agile-service](https://github.com/choerodon/agile-service)|
|[choerodon-front-devops](https://github.com/choerodon/choerodon-front-devops)|[devops-service](https://github.com/choerodon/devops-service)|
|[test-manager-service](https://github.com/choerodon/test-manager-service)|[choerodon-front-test-manager](https://github.com/choerodon/choerodon-front-test-manager)|

## 前置条件

本地启动时，需要先启动如下基础服务：

- [go-register-server](https://github.com/choerodon/go-register-server) 注册中心
- [oauth-server](https://github.com/choerodon/oauth-server) 认证中心
- [api-gateway](https://github.com/choerodon/api-gateway) 网关中心
- [gateway-helper](https://github.com/choerodon/gateway-helper) 网管助手
- [iam-service](https://github.com/choerodon/iam-service) IAM服务
- [config-server](https://github.com/choerodon/config-server) 配置中心
- [manager-service](https://github.com/choerodon/manager-service) 管理中心
- [choerodon-front-iam](https://github.com/choerodon/choerodon-front-iam) IAM前端

## 数据来源

当您需要知晓API的数据结构时，您可以根据平台中的[API测试功能](../../../user-guide/manager-guide/system-configuration/api/)查看详细的接口说明。