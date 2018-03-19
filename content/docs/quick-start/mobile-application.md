+++
title = "创建一个移动应用"
description = ""
weight = 5
+++

# 移动应用

  本页面演示了移动应用从新建到从手机上访问应用等流程操作。使用本页面，你可以了解：

   - [新建应用](#1)
   - [开发应用](#2)
   - [发布应用](#3)
   - [应用配置](#4)
   - [版本管理](#5)
   - [最终结果](#6)

<h2 id="1">新建应用</h2>

- **菜单层次**：项目层
- **菜单路径**：开发管理 > 服务
- **默认角色**：项目所有者、项目成员

1. 点击`创建`按钮。

    ![](../assets/mobile-application/服务创建.png)

1. 输入 “服务编码” 、 “服务名称” 、以及 “服务组” ，并选择相应服务类型为移动，点击 `创建` 按钮。

    a. 服务编码只能包含字母、数字、_、.、破折号和空格并且不能包含大写字母

    b. 服务组输入不能包含中文或大写字母,不能以'.'开头或结尾

    c. 服务名称不是移动端展示的模块名称

    ![](../assets/mobile-application/服务创建信息填写.png)

1. 新建服务 choerodon 已在服务管理列表中。

    ![](../assets/mobile-application/服务列表.png)

1. gitlab已自动创建好对应服务类型的代码库 choerodon 。点击 `仓库地址` ，可以查看该服务在gitlab的代码仓库。

    注：新建应用的演示使用的是模板

<h2 id="2">开发应用</h2>

1. 拉取代码后，在develop分支上进行开发，开发完成后修改output/bundleManagement.json文件，推送代码。

    a. bundle下的description是该应用的描述

    b. iconName为该应用在移动端显示时，名字前的图标

    c. isMain判断是否为主模块，0为非主模块

    b. nameCn为展示的中文名，该名字会显示在移动端

    e. description为应用版本升级时的升级信息

    f. type指定平台，Android和iOS

    g. appCoreVersion为最低核心版本，即低于该版本的APP无法启用该模块

    h. status为自动启用选项，0为不自动启用

    ```
    {
      "bundle": {
        "description": "模块描述",
        "iconName": "md-log-in",
        "isMain": "0",
        "nameCn": "Choerodon"
      },
      "description": "更新描述",
      "type": "Android",
      "appCoreVersion": "1.0.0",
      "status": "0"
    }
    ```

1. 进入服务详情后， 查看服务CI pipeline的完成情况，只有CI各个阶段跑成功了才会生成一条服务版本信息，CI完成后将会自动发布到环境。

    ![](../assets/mobile-application/流水线.png)

<h2 id="3">发布应用</h2>

  移动应用模块均为自动发布，在CI pipeline完成后稍等片刻即可。

<h2 id="4">应用配置</h2>

  该模块提供APP配置模块功能，可以通过该模块实现多APP多不同应用配置的个性化设置。 

  - **菜单层次**：组织层
  - **菜单路径**：APP
  - **默认角色**：项目所有者、源代码管理员、项目成员 

1. 新建一个名为 `DigitalPlatform` 的APP。

1. 点击DigitalPlatform的 `版本管理` ，新建iOS和Android的类型。

    ![](../assets/mobile-application/核心版本管理.png)

1. 返回上一级目录，点击对应APP的 `模块配置` 。

1. 关键字搜索或直接找到目标模块，勾选要在该APP中可以使用的模块，点击保存。

    ![](../assets/mobile-application/模块配置.png)

<h2 id="5">版本管理</h2>

  - **菜单层次**：组织层
  - **菜单路径**：模块
  - **默认角色**：项目所有者、源代码管理员、项目成员 

1. 在部署成功中选中进行启用

    ![](../assets/mobile-application/版本管理.png)

<h2 id="6">最终结果</h2>

最后，就可以在移动端应用模块菜单中看到刚刚发布的模块，点击进行下载即可。

现在你已经懂得如何开发一个模块了。