+++
title = "代码仓库"
description = ""
weight = 1
+++

# 代码仓库

## 1. 概述

一般地，Choerodon平台中每个[应用服务](../../application-service)均会有一个对应的GitLab代码仓库，用于存储该应用服务下所有的代码及其提交历史。同时，每个代码仓库还支持开发人员通过Git持续不断地在此推拉代码来实现敏捷开发与持续交付。  

通过此页面您将了解到如何查看某个项目下的代码仓库、仓库地址及其关联的应用名称。

## 2. 查看代码仓库地址

代码仓库列表可以在`应用服务`页面进行查看。列表中每个应用服务后面都会展示出对应的代码仓库地址。点击仓库地址，即可跳转至Gitlab界面对应的仓库。

![image](/docs/user-guide/development/code-manage/image/code-management-01.png)

## 3. 复制代码仓库地址

在`代码管理`页面，通过应用服务选择器选中某个应用服务，点击应用服务下拉框右侧的`复制仓库地址`按钮，选择复制SSH地址或是HTTPS的地址即可。

![image](/docs/user-guide/development/code-manage/image/code-management-02.jpg)

## 4. GitLab密码

### 4.1 GitLab代码库登录密码
1. GitLab登录密码，即Choerodon平台的用户登录密码；由于Choerodon是通过oAuth协议与GitLab建立连接的，因此通过Choerodon平台进入GitLab时，需要用Choerodon账号再次登录，而此处的账号和密码就是登录Choerodon平台的用户和密码。

2. 修改登录密码：
- 菜单路径：个人中心-个人信息-修改密码。
- 点击`修改密码`后，即可在个人信息界面修改当前账号的登录密码。

![image](/docs/user-guide/development/code-manage/image/edit-login-password.jpg)

<blockquote class="note"> 
LDAP用户不可在此修改登录密码。
</blockquote>

### 4.2 GitLab代码库拉取密码
1. 与登录密码不同的是，GitLab仓库中拉取代码的默认密码为环境变量中预先配置的密码。想知道默认密码需要查看应用服务devops-service里环境变量中的`SERVICES_GITLAB_PASSWORD`字段。  

2. 修改GitLab代码库拉取密码：  

- 菜单路径：个人中心-个人信息-修改仓库密码。
- 点击`修改仓库密码`后，会弹出确认弹框，确认后将会跳转至GitLab中修改此密码的页面。  

![image](/docs/user-guide/development/code-manage/image/edit-gitlab-password.jpg)

<blockquote class="warning"> 
在修改GitLab代码库的拉取密码之前，请确认您已在"平台管理-通用-重置gitlab密码页面链接"中设置了修改gitlab仓库密码页面的跳转链接；若未设置，该页面将无法看到`修改仓库密码`的按钮。

</blockquote>


## 5. 阅读更多

* [分支管理](../manage-branch)
* [合并请求](../merge-request)
* [持续集成](../integration)
* [代码质量](../code-quality)



