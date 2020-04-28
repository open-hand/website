+++
title = "7.4.集群管理"
description = ""
weight = 4
+++

# 集群管理
## 目标
集群是用于运行k8s的托管群组。有了集群，我们就可以以此来统一调配资源，管理环境。本文档面向初次使用 Choerodon 猪齿鱼的用户，引导新手用户在 Choerodon 猪齿鱼创建集群。

## 前置条件
1. 已部署安装Choerodon 猪齿鱼，并使用默认的 admin 用户名和密码登录了 Choerodon 系统。
2. 默认的 admin 用户进入 Choerodon 系统后，默认拥有一个组织并为该组织的组织管理员角色。关于Choerodon角色的详情，请移步角色管理。

    |账号|角色|职责|
    |---|---|---|
    |admin|组织管理员|管理组织下的项目和成员（组织成员、项目管理员、项目成员）|
3. 已完成项目创建及团队成员建设。

## 创建集群
### 操作示例

1. 路径：部署->集群->集群管理；

2. 点击左上方的 `创建集群`，右侧会弹出创建集群页面，输入相关信息，包括集群编码、集群名称和集群描述；

3. 填写完成后，点击`创建`，界面会自动生成可执行的shell脚本命令，其中各个参数已经由后端服务自动生成。  

    ```
  	helm install --repo=http://chart.choerodon.com.cn/choerodon/c7ncd/ \
  	--namespace=choerodon \
  	--name=choerodon-cluster-agent-asdasd123 \
  	--version=2018.11.12-162515-master \
  	--set config.connect=ws://devops-service-front.staging.saas.hand-china.com/agent/ \
  	--set config.token=7f58f4cd-9ee0-4abd-9ca5-b2e667f2da59 \
  	--set config.clusterId=14 \
  	--set config.choerodonId=asdasd123 \
  	--set rbac.create=true \
  	choerodon-cluster-agent
    ```

4. 需要复制指令至k8s执行才能激活集群，与平台建立连接。

 - 运行前需要先初始化helm helm init ，helm repo update。

 - helm 的版本必须与服务器上helm版本一致。

5. 执行成功后回到集群管理界面，便可以看到之前创建好的集群状态变为连接状态。

## 下一步
[环境配置](../../../quick-start/devops/environment-configuration)