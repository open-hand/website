+++
title = "授权管理"
weight = 3
description = "查看和管理用户的ACCESS-TOKEN"
+++

# 授权管理

ACCESS-TOKEN是您访问平台的密钥。您可以在此查看和管理您的密钥。

  - **菜单层次**：个人中心
  - **菜单路径**：个人中心 > 授权管理
  - **默认角色**：登录即可访问

## token列表

列表字段：

- token：用户的ACCESS-TOKEN。
- 客户端名称：客户端的名称。
- 重定向地址：登录后跳转的链接。
- 创建时间：token的创建时间。
- 失效时间：token的失效时间。
- 状态：状态分为正常、已失效两种状态。

## 删除token

- 点击你想要删除的token所在列的![三点](/docs/user-guide/manager-guide/image/more-vert.png)按钮，选中`删除`，删除token。删除token后，用户需要重新登录。

<blockquote class="note">
        不能删除当前token。
      </blockquote>
