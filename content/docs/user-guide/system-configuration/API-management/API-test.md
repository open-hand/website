+++
title = "API测试"
weight = 1
description = "API测试过工具调用特定的API，获取输出，并记录系统的响应"
+++

# API测试

API是Application Programming Interface的简写。实现了两个或多个独立系统或模块间的通信和数据交换能力。

API测试需要与应用程序的API进行交互，测试时通过工具调用特定的API，获取输出，并记录系统的响应。

- **菜单层次**：全局层
- **菜单路径**：API管理 > API测试
- **默认角色**：平台管理员

## 查看微服务下的controller

1. 点击所属微服务选择框
1. 输入关键字搜索微服务
1. 选择微服务
1. 列表显示该微服务下的controller

## 查看controller下的API接口

1. 在列表的过滤框中，输入关键字搜索controller
1. 点击controller，展开该controller下的所有AIP接口

## 测试API接口

API的测试要点：

- API所暴露的资源是否恰当的列出、创建、删除、修改
- API是否可用，以及能被调用
- 根据具体的业务流程，实现自动化测试
- API是否包含了必要的认证，敏感数据是否做了脱敏处理，是否支持加密或明码的http访问

测试API接口能发现的问题一般包括：

- 不能正确处理有效参数值
- 无法正确处理错误的深入条件
- 缺少功能
- 功能重复
- 可靠性问题、安全问题、性能问题
- 多线程问题
- 响应数据结构不规范问题

步骤：

1. 点击API接口的查看详情按钮
1. 界面跳转到Swagger UI的接口详情
1. 在Swagger UI的接口详情点击default按钮→<img class="no-border" src="/docs/user-guide/system-configuration/API-management/image/oauth.png"/>
1. 选择default，点击Authorize按钮，进行权限登录认证→<img class="no-border" src="/docs/user-guide/system-configuration/API-management/image/default-oauth.png"/>
1. 输入参数值
1. 点击Try it out!按钮查看结果