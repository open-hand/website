+++
title = "7.1.创建一个应用服务"
description = ""
weight = 1
+++

# 创建一个应用服务
## 目标
本文档将以创建应用服务 “猪齿鱼Todo服务” 为例，让新手用户能够熟悉Choerodon猪齿鱼平台中创建应用服务的步骤和流程。

## 前置条件
1. 已部署安装Choerodon 猪齿鱼，并使用默认的 admin 用户名和密码登录了 Choerodon 系统。
2. 默认的 admin 用户进入 Choerodon 系统后，默认拥有一个组织并为该组织的组织管理员角色。关于Choerodon角色的详情，请移步角色管理。

    |账号|角色|职责|
    |---|---|---|
    |admin|组织管理员|管理组织下的项目和成员（组织成员、项目所有者、项目成员）|
3. 已完成项目创建及团队成员建设。

## 操作示例
## 创建应用服务
具体的操作步骤如下：

**第一步：** 使用项目所有者的角色用户登录Choerodon系统（创建项目的人为项目所有者角色），如果想使用其它用户操作，请先给该用户在猪齿鱼研发项目下分配项目所有者角色，然后登录选择项目猪齿鱼研发。

**第二步：** 路径：开发->应用服务；
![image](/docs/quick-start/devops/image/create-applications-1.jpeg)


**第三步：** 点击[导入应用服务](/zh/docs/user-guide/development/application-service/import/)，右侧会弹出操作页面，点击`从GitHub导入`，选择`系统预设模板`，应用模板选择`MicroService`模板，然后在页面中选择服务类型为`普通服务`，输入服务编码、服务名称。点击`导入`，即可创建一个应用服务，创建成功后，您可以进行后续的应用服务开发。


例如，

* 应用服务编码: choerodon-todo-servie
* 应用服务名称: 猪齿鱼Todo服务
* 应用服务模板: MicroService

![image](/docs/quick-start/devops/image/create-applications-2.png)

**第四步：** 当应用服务表单提交之后，可点击项目下-应用服务菜单，查看到新建的应用服务，当应用服务的状态是启用时，表示应用服务创建成功。

**第五步：** 在创建应用服务的同时，系统会对应在Gitlab中创建一个仓库，点击仓库地址，可以链接到应用服务对应在Gitlab的代码仓库。

![image](/docs/quick-start/devops/image/create-applications-3.png)  

  
进入仓库地址，gitlab仓库里会生成相应模板的相关文件。
![image](/docs/quick-start/devops/image/create-applications-4.png) 

Choerodon 平台与 Gitlab 名词关系如下：

| Choerodon 名词 | 对应 Gitlab 名词 | 举例                  |
| -------------- | ---------------- | --------------------- |
| 项目名         | 组名             | 猪齿鱼研发            |
| 应用服务编码       | 项目名           | choerodon-demo-servie |
| 应用服务名称       | 无               | Choerodon-demo服务     |  


本文档中展示的是：使用Choerodon中预置的应用服务模板来创建一个基础的应用服务。若想查看应用服务功能的更多详情，请参考[应用服务](/zh/docs/user-guide/development/application-service)。



## 下一步  
[应用服务配置](../../../quick-start/devops/application-config)