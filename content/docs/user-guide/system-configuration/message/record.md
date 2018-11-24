+++
title = "消息记录"
weight = 7
description = "查看使用模板发送消息的列表记录及状态"
+++

# 消息记录

消息记录是在平台使用已定义模板发送邮件的状态回执。通过此功能，用户可以了解使用服务器发送的邮件状态、邮件数量、失败原因。用户可以选择重发发送失败的邮件。

- **菜单层次**：全局层、组织层
- **菜单路径**：消息中心 > 消息记录
- **默认角色**：平台管理员、组织管理员

## 消息记录列表

列表字段：

- **状态**：邮件发送失败或成功的状态回执
- 接收邮箱：对方接受此邮件的邮箱账号。
- 模板类型：触发此模板发送的触发点类型。
- 失败原因：邮件发送失败的原因回执。
- 时间：消息发送的时间。

## 消息记录查询

可查询字段：

- 状态：分成功和失败两种状态。
- 模板类型：触发此模板发送的触发点类型。

## 重发

- 发送失败的短信，用户可以点击列表中的`图标`→![重发](/docs/user-guide/system-configuration/message/image/redo.png)重发此邮件。