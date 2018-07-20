+++
title = "域名管理"
description = "域名是用户通过浏览器可以从外部访问系统内部应用程序的地址。您可以在此配置已经预定义好的域名，使外部能够通过指定的域名访问到系统内部的实例"
weight = 6
+++


# 域名管理

域名是用户通过浏览器可以从外部访问系统内部应用程序的地址。您可以在此配置已经预定义好的域名，使外部能够通过指定的域名访问到系统内部的实例。

目前**Web前端**需配置域名，若不配置域名，不能进行外网访问该前端，只能查看系统提供的 Pod IP。

  - **菜单层次**：项目层
  - **菜单路径**：部署流水线 > 域名
  - **默认角色**：项目所有者、项目成员、部署管理员
    <blockquote class="note">
         项目所有者和项目成员对域名只有查看界面的权限，不可进行编辑修改。
      </blockquote>

    ![ingress](/docs/user-guide/deployment-pipeline/image/ingress.png) 

## 创建域名

 1. 点击 `创建域名` ，选择需要配置域名的应用，并输入`域名`、`域名地址`、`路径`及选择网络，点击 `创建` ；
    
     <blockquote class="warning">
     域名名称: 由小写字母、数字、'-'组成，并且必须以字母、数字开始和结束！环境下唯一。
     
     域名地址: 不能随便填写，必须指向集群的泛域名！
     
     路径: 目前Web前端不支持创建多个路径，即多个子域名！域名地址和路径组成唯一性校验。
      </blockquote>

 2. 创建成功后，域名将会出现在域名管理列表中,然后根据域名就可以访问服务。
  

## 编辑域名信息

点击页面右侧 ![修改环境按钮](/docs/user-guide/deployment-pipeline/image/update_network_button.png) 按钮，进入修改域名界面后,对域名信息进行修改,最后`保存`。
<blockquote class="note">
域名修改中选择的网络不能包含状态不正常的网络。
</blockquote>


## 删除域名

点击页面右侧 ![删除网络按钮](/docs/user-guide/deployment-pipeline/image/delete_network_button.png) 按钮，删除该域名。
<blockquote class="warning">
若删除域名，该条数据将被永久删除，不可恢复!
</blockquote>
