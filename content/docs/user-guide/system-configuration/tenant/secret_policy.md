﻿+++
title = "密码策略"
weight = 6
+++

# 密码策略

密码策略是对组织应用的密码安全策略和登录安全策略的信息设置的管理。当应用密码安全策略时，同组织下用户的密码设定和修改都要遵守该密码规则；当应用登录安全策略时，同组织下用户登录系统时的密码输入情况要遵守该登录规则。

  - **菜单层次**：组织层
  - **菜单路径**：组织管理 > 密码策略
  - **默认角色**：组织管理员

<h2 id="1">密码安全策略</h2>

密码安全策略为用户的密码创建或更改时需要满足的规则。修改完密码安全策略后，点击保存，修改的内容生效。

- 是否启用：如果启用，密码安全策略的其他字段保存后生效；否则，不生效。
- 不可与登录名相同：选择是，则用户的密码不能有用户的登录名相同；否则，可以与登录名相同。
- 最小密码长度：设置密码时，密码长度不能小于填入的最小密码长度。
- 最大密码长度：设置密码时，密码长度不能大于填入的最大密码长度。为空时，表示没有最大密码长度，即密码长度可以无限大。
- 最少小写字母数：密码中至少应包含的小写字母数。
- 最少大写字母数：密码中至少应包含的大写字母数。
- 最少特殊字符数：密码中至少应包含的特殊字符数。
- 最大近期密码数：与最近使用的n次密码不能相同。例：若填入数值为3，则表示不能与最近3次历史密码相同。
- 密码正则：定义针对给定文本检查的匹配模式，通过填入特定的正则表达式来制定密码规则。

<h2 id="2">登录安全策略</h2>

登录安全策略为用户使用密码登录平台时的规则。修改登录安全策略后，点击保存，修改的内容生效。

- 是否启用：如果启用，登录安全策略的其他字段保存后生效；否则，不生效。
- 开启验证码：如果开启，当用户密码输错次数大于设置的输错次数的值时，出现验证码；如果不开启，则不会出现验证码。
    - 输错次数：密码输错次数超过填写的输错次数后，出现验证码。
- 开启锁定：如果开启，当用户密码输错次数大于设置的输错次数的值时，用户将会被锁定，无法登录系统。
    - 输错次数：当用户密码输错次数大于设置的输错次数的值时，用户将会被锁定，无法登录系统。
    - 锁定时长：用户被锁定后，经过输入的密码输错锁定时间后，系统自动将该用户解锁，该用户可重新进行输入密码登入系统的操作.




