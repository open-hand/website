
+++
title = "仓库"
description = ""
weight = 6
+++

# 仓库

## 1. 概述

仓库设置支持用户在项目下配置使用自定义的Docker仓库与Helm仓库，配置成功后，该项目下使用默认仓库的应用服务，之后生成的镜像均会被存放于目前的Docker仓库内；同理，更改Helm仓库后，之后生成的charts包也将存放在新的Helm仓库之中。

## 2. 修改仓库
![image](/docs/user-guide/settings/image/proj-repo.jpg)

点击`设置-仓库`进入详情页，便可在主页修改仓库的相关配置。



1. 修改默认Docker仓库为自定义Docker仓库。  

    ![image](/docs/user-guide/settings/image/harbor-setting.jpg)  


    * 将默认Docker仓库切换为自定义Docker仓库。  
    
    * 输入仓库地址。
    * 输入登录名与密码；此处需要输入有推拉代码权限的登录名和密码。
    * 输入登录名对应的邮箱。
    * 输入Harbor project；此项为非必填。若您想将之后生成的镜像存放于Docker仓库里已有的project中，则在此填入对应的Harbor project名称即可。若不填，则默认在此仓库中新建一个Harbor project用于存放之后的镜像。
    * 点击测试连接，若连接成功，则代表自定义仓库有效；若连接失败，则无法使用。
    
    <blockquote class="note">此页面仅支持将默认的Docker仓库置为私有，自定义的Docker仓库需自主设置。</blockquote>

2. 修改默认Helm仓库为自定义Helm仓库。
    * 将默认Helm仓库切换为自定义Helm仓库。
    * 输入仓库地址。
    * 点击测试连接，若连接成功，则代表自定义仓库有效；若连接失败，则无法使用。