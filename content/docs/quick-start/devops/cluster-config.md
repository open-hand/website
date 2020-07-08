+++
title = "7.7.集群配置"
description = ""
weight = 7
+++

# 集群配置
## 目标  

在激活集群之后，我们会在后续对集群进行必要的配置，以此来进行集群的监控以及集群中各个配置项的健康检查。本文档面向初次使用 Choerodon 猪齿鱼的用户，引导新手用户在 Choerodon 猪齿鱼系统中进行集群配置。

## 前置条件
1. 已部署安装Choerodon 猪齿鱼，并使用默认的 admin 用户名和密码登录了 Choerodon 系统。
2. 默认的 admin 用户进入 Choerodon 系统后，默认拥有一个组织并为该组织的组织管理员角色。关于Choerodon角色的详情，请移步角色管理。

    |账号|角色|职责|
    |---|---|---|
    |admin|组织管理员|管理组织下的项目和成员（组织成员、项目所有者员、项目成员）|
3. 已完成项目创建及团队成员建设。
4. 集群和环境均创建成功，且都为“运行中”状态。





## 集群监控    
1. 路径：部署->集群->集群管理；    
2. 选择页面中的 `组件管理`Tab页，选择`监控组件`的卡片;监控组件用于帮助监控集群中资源的使用情况，该组件包括了Prometheus、Grafana和AlertManager。其中Prometheus用于实现对监控数据的获取、存储以及查询；Grafana可作为可视化界面来展示监控数据；AlertManager则是Prometheus体系中的告警组件。  

   ![image](/docs/quick-start/devops/image/cluster-config-1.png)  

3. 在监控组件卡片中，点击`安装`按钮，右侧会弹出安装监控组件的配置页面，需填入：admin密码（即Grafana组件admin账户的登录密码）、域名地址（即Grafana的访问地址）、并且为其中的3个组件分别选择一个满足条件的PV（对应组件需要使用到的PV,需要提前在PV管理中创建）。配置完成后，点击安装即可。（此操作仅能在“运行中”状态的集群下执行）  

   ![image](/docs/quick-start/devops/image/cluster-config-2.png)  

4. 成功安装监控组件后，即可在“集群管理-集群监控”页面看到集群监控的数据。集群监控功能用于展示集群中所有节点以及节点下各个Pod的资源使用情况，如CPU、内存、网络吞吐和带宽占用、磁盘I/O和磁盘使用等指标。  

   ![image](/docs/quick-start/devops/image/cluster-config-3.png)

## 集群健康检查  

1. 路径：部署->集群->集群管理->健康检查；  
2. 选择页面中的`健康检查`Tab页，点击`扫描`，即可完成对当前集群下所有环境中配置项的检测。在此过程中，Polaris支持的检测类型有：Health Checks、Images、Networking、Resources、Security；检测完毕之后，会将这些分类中所有的配置项分为 passed、warning 以及error 三个状态，分别代表检测通过、警告和错误的状态。  

   ![image](/docs/quick-start/devops/image/cluster-config-4.png)


