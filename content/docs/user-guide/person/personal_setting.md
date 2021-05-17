﻿+++
title = "个人设置"
description = "代码库、SVN、制品库账号密码的管理"
weight = 1
+++

# 个人设置

## 1. 概述

个人设置用于管理自己的代码库、SVN、制品库账号密码信息。

  - **菜单层次**：个人中心
  - **菜单路径**：个人中心 > 个人设置
  - **默认角色**：登录即可访问


## 2. 代码库设置

（1）进入“个人设置”界面后，点击`代码库设置`Tab；

（2）用户可以看到Gitlab用户名、Gitlab地址

（3）用户自己可以对Gitlab密码进行修改或者重置；


### 2.1 修改GitLab密码
（1） 与登录密码不同的是，此处的GitLab密码指的是拉取仓库代码时所需的密码。若您忘记了当前的GitLab密码，直接点击`重置GitLab密码`后，平台会将重置后的GitLab密码发送给您，但为了您的账号安全，需要尽快前往GitLab修改重置后的密码。

（2） 修改GitLab代码库拉取密码：  

- 菜单路径：个人中心-个人设置-代码库设置-修改Gitlab密码。
- 点击`修改GitLab密码`后，会弹出确认弹框，确认后将会跳转至GitLab中修改此密码的页面。  

<blockquote class="warning"> 
         在修改GitLab代码库的拉取密码之前，请确认您已在"平台管理-通用-重置gitlab密码页面链接"中设置了修改gitlab仓库密码页面的跳转链接；若未设置，该页面将无法看到`修改仓库密码`的按钮。

</blockquote>
      
## 3. SVN设置

（1）进入“个人设置”界面后，点击`SVN设置`Tab；

（2）用户可以看到SVN用户名、SVN初始密码

（3）点击`修改密码`后，会弹出侧弹窗，用户自己可以对SVN密码进行修改

<blockquote class="note">
         SVN账号登录名默认是当前系统的登录名，不可以修改。
         项目所有者在`文档库管理界面`分配SVN权限后，会为项目成员自动创建SVN账号。
      </blockquote>

## 4. 制品库设置

（1）进入“个人设置”界面后，点击`制品库设置`Tab；

（2）用户可以看到制品库用户名、制品库初始密码

（3）点击`修改密码`后，会弹出侧弹窗，用户自己可以对制品库密码进行修改

<blockquote class="note">
         项目所有者在`制品库管理界面`分配权限后，会为项目成员自动创建制品库账号。
      </blockquote>


## 5. 更多操作

- [个人信息](../information)
- [权限信息](../role-info)
- [接收设置](../notify_setting)
- [Token管理](../token)
