+++
title = "4.3.迭代开发"
description = ""
weight = 3
+++

# 迭代开发
## 目标
在整个迭代冲刺周期中，通过看板上卡片的流转，可以对迭代开发进度进行可视化管理。本文档面向初次使用 Choerodon 猪齿鱼的用户，引导新手用户在 Choerodon 猪齿鱼系统中`创建看板`、`使用看板`、`配置看板`。

> 看板的概念请移步[什么是看板](../../.././user-guide/cooperation/iteration-plan/whatisboard)。

## 前置条件
1. 已部署安装Choerodon 猪齿鱼，并使用默认的 admin 用户名和密码登录了 Choerodon 系统。
2. 默认的 admin 用户进入 Choerodon 系统后，默认拥有一个组织并为该组织的组织管理员角色。关于Choerodon角色的详情，请移步角色管理。

    |账号|角色|职责|
    |---|---|---|
    |admin|组织管理员|管理组织下的项目和成员（组织成员、项目管理员、项目成员）|
3. 已完成项目创建及团队成员建设。

## 创建看板
开启冲刺后，如果默认看板无法满足开发需求，可自行创建特定的看板，有利于用户关注某些特定的列、状态等。

### 操作示例
1. 在`迭代计划`页面左上角点击`默认看板`下拉出现`创建看板`；
2. 点击`创建看板`右侧出现创建页面，输入看板名称，点击`确定`即可； 
3. 在`迭代计划`页面左上角点击`新创建的看板`，新创建的看板自动关联了该项目下的问题。
     
    ![image](/docs/quick-start/agile/image/agile_15.png)

## 使用看板
看板是一种灵活的可视化管理工具，创建了多看板后，您可以随意切换看板。通过`改变泳道`可以从多个维度分析问题，在看板中`拖动故事卡片`更改问题状态，实时推进项目进度。

### 操作示例
1. 通过迭代计划->配置看板->泳道的路径选择泳道，系统提供`故事`、`经办人`、`史诗`、`无`四种维度；

 * 泳道：故事；
    ![image](/docs/quick-start/agile/image/agile_16.png)

 * 泳道：经办人；
    ![image](/docs/quick-start/agile/image/agile_17.png)

 * 泳道：史诗；
    ![image](/docs/quick-start/agile/image/agile_18.png)

 * 泳道：无；
    ![image](/docs/quick-start/agile/image/agile_19.png)

2. 拖动故事卡片；在看板中，故事卡片可以拖动到不同的状态列。

    ![image](/docs/quick-start/agile/image/agile_20.png)

## 配置看板的列和状态
开启冲刺后，如果默认看板无法满足开发需求，可通过配置看板，可自定义看板上的列、状态等属性，控制问题在看板中的运转。更多相关信息请参考[配置列和状态](../../.././user-guide/cooperation/iteration-plan/config/)。

> 看板列和状态默认支持3种类型：待处理、处理中、已完成。

### 操作示例
1. 点击工具栏的`配置看板`按钮，进入`列配置`tab页，即可对看板的状态和列进行自定义配置。 
    ![image](/docs/quick-start/agile/image/agile_12.png)

2. 添加列，操作如下：

 * 单击页面左上角的`添加列`按钮;
 * 输入列名称，选择列类型（待办、进行中、完成）；
 * 点击`确定`即可。

    ![image](/docs/quick-start/agile/image/agile_11.png)

3. 添加状态，操作如下：

 * 单击页面左上角的`添加状态`按钮;
 * 输入状态名称，选择状态类型（待办、进行中、完成），点击`确定`即可；
 * 将添加的状态拖拽到对应的列中；

    ![image](/docs/quick-start/agile/image/agile_13.png)

4. 查看看板中添加的列和状态；

 * 拖拽故事卡片，改变问题开发状态。

    ![image](/docs/quick-start/agile/image/agile_14.png)

## 下一步
- [知识库快速入门](../../../quick-start/knowledge/)
- [测试管理快速入门](../../../quick-start/test/)
- [DevOps快速入门](../../../quick-start/devops/)


