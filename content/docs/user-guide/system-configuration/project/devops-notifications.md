+++
title = "通知设置"
description = "为环境中删除操作二次确认时发送的验证码设置通知对象与通知方式。"
weight = 4
+++

# 通知设置

通知设置用于为项目下环境中执行删除操作时配置二次确认相关的通知信息，其中包括：设置触发事件、通知方式与通知对象；  

设置成功后，当用户在对应环境中执行相应的删除操作时，确认弹框中会出现`发送验证码`的按钮，点击后，会将验证码以设置好的通知方式发送给指定的通知对象。联系相关人员获取到验证码后，需要输入至对应位置，最后点击删除即可。  

在此处创建通知之前需要确保您已为此类事件关联了相应的邮件模板与站内信模板，关联模板的具体步骤请查看[`发送设置`](http://choerodon.io/zh/docs/user-guide/system-configuration/message/send-config/)处的文档。

## 菜单层次

* 菜单层次：项目层
* 菜单路径：项目设置>通知设置
* 默认角色：项目所有者  

 <blockquote class="warning">
  前置条件：请确保您已在“平台层-消息中心-发送设置”内，为触发类型“资源删除确认通知”关联了相应的邮件模板与站内信模板。  
 </blockquote>

## 创建通知  
![创建通知](/docs/user-guide/system-configuration/project/image/create-noti.jpg)
 
 1. 点击 `创建通知`；

 2. 选择`环境`；

 3. 选择`触发事件`，目前环境中的触发事件包含: `删除实例`、`删除网络`、`删除域名`、`删除证书`、`删除配置映射`、`删除密文`；用户可以为各个环境中的这些事件设置通知方式与通知对象；
 <blockquote class="warning"> 每个环境中的每个事件仅能选择一次；若在之前创建的通知中已经选择过该环境中的该事件，那么之后创建通知又选择到该环境时，就不能再选择其中已设置过的事件。 </blockquote>

 4. 选择`通知方式`，目前通知方式包括：短信、邮件和站内信；（注意：短信功能暂未开放使用）  

     <blockquote class="note">
 通知方式可多选，选择后，在环境中执行对应的事件时，会通过所选的方式发送验证码给通知对象。
     </blockquote>

 5. 选择`通知对象`，通知对象可以选择：操作者、项目所有者或是在项目下指定人员；
<blockquote class="note">
 此处的通知对象类型只能单选，即：勾选通知对象为操作者后，便不能同时勾选项目所有者与指定人员。
</blockquote>


## 查看通知详情
 进`项目设置`后，点击`通知设置`，进入通知设置主界面。通过列表，可以查看到通知设置的环境、触发事件、通知方式与通知对象；
 
  ![通知设置](/docs/user-guide/system-configuration/project/image/notification.jpg)  
  
## 编辑通知
点击`编辑通知` → ![编辑通知按钮](/docs/user-guide/deployment-pipeline/image/update_env_button.png) 来编辑此通知中的环境、触发事件、通知方式与通知对象。    

 ![编辑通知](/docs/user-guide/system-configuration/project/image/edit-noti.jpg)  

## 删除通知

点击`删除通知` → ![删除配置映射按钮](/docs/user-guide/deployment-pipeline/image/del_net_button.png) 来删除此通知。  
<blockquote class="note">
 若想停用某条已有通知，将对应的通知删除即可。
</blockquote>


