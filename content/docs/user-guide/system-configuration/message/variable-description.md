+++
title = "变量说明"
weight = 8
description = "模板中所有可用参数变量的解释说明"
+++

# 变量说明

以下是邮件、短信、站内信模板中可以使用的变量参数。

| 变量名 | 说明 | 示例 |
| --- | --- | --- |
| ${loginName} | 登录名 | 模板：您的登录名为${loginName}。<br>发送参数：`loginName=张三`。<br>发送信息：您的登录名为张三。 |
| ${userName} | 用户名 | 模板：${userName},您好。<br>发送参数：`userName=张三`。<br>发送信息：张三，您好。 |
| ${defaultPassword} | 初始密码 | 模板：您的初始密码为${defaultPassword}。<br>发送参数：`defaultPassword=abc123`。<br>发送信息：您的初始密码为abc123。 |
| ${verifyCode} | 验证码 |  模板：您的验证码为${verifyCode}。<br>发送参数：`verifyCode=123456`。<br>发送信息：您的验证码为123456。 |

模板中的参数变量通过`${}`进行替换，在发送时，将`${}`替换成对应的实际变量。

例如：

    邮件标题：验证邮件
    邮件内容：
    ${userName}，您好！您正在进行邮箱验证，您本次请求的验证码为：${verifyCode}。
    此验证码用于重置密码，XXX内有效。