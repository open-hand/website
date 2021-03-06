+++
title = "通知"
description = ""
weight = 5
+++

# 通知

## 1. 概述

项目层通知设置主要用于为项目下的各类事件配置特定的通知方式与通知对象。并将消息分为3类，其中包括：敏捷消息、DevOps消息以及资源删除验证码。同时，还支持Webhook的设置功能。

## 2. 敏捷消息

敏捷消息指的是项目下与敏捷问题相关的事件消息。而用户可以在此为这些事件与消息配置特定的通知方式与通知对象，配置保存成功后，当该事件触发时，便会通过设置的通知方式通知到此处指定的通知对象。  
  
![image](/docs/user-guide/settings/image/agile-message.jpg)  

目前系统中内置的敏捷相关的事件有：问题创建、问题分配、问题已解决；用户可以直接在列表中为这些事件设置通知对象。    

选择一个事件，点击后面的`通知对象`下拉框，然后点击保存，便可设置该事件的通知对象。

<blockquote class="note"> 
 敏捷消息目前仅支持站内信的通知方式。
</blockquote>


## 3. DevOps消息

DevOps消息指的是项目下与DevOps模块（应用服务、代码管理以及部署资源）相关的事件消息。而用户可以在此为这些事件与消息配置特定的通知方式与通知对象，配置保存成功后，当该事件触发时，便会通过设置的通知方式通知到此处指定的通知对象。   

![image](/docs/user-guide/settings/image/devops-message.jpg)  

系统内置事件包含: 应用服务通知、流水线通知、代码管理通知以及部署资源通知；每类通知下面包含了多个事件，项目所有者可以直接在列表中设置每个事件的通知方式。设置保存成功后，当该事件触发时，便会通过设置的通知方式通知到此处指定的通知对象。  

选择一个事件，勾选其对应的`站内信`或`邮件`框，然后点击保存，便能设置该事件的通知方式。


> - DevOps消息已默认确定了其中各个事件的通知对象，且不支持自定义通知对象。     
> - 若出现 `通知方式`框禁选的情况，是因为在"平台层-消息服务"中已不支持该类通知方式，需联系平台管理员设置。



## 4. 资源删除验证

资源删除验证用于为项目下环境中的资源删除操作配置二次确认相关的通知信息，目前包括以下事件：删除实例、删除网络、删除域名、删除证书、删除配置映射以及删除密文。目前支持的通知方式为：站内信与邮件。此外，该类事件还支持自定义通知对象。

设置成功后，当用户在对应环境中执行相应的删除操作时，确认弹框中会出现`发送验证码`的按钮，点击后，会将验证码以设置的通知方式发送给指定的通知对象。联系相关人员获取到验证码后，需要输入至对应位置，最后点击删除即可。   

![image](/docs/user-guide/settings/image/resource-delete.jpg)    


若想为某个环境中的资源删除操作配置验证码二次确认通知，首先需要在此处选择好对应的环境。在此基础上勾选通知方式，设置通知对象。点击保存后，便可成功为该删除事件配置验证码二次确认通知了。


<blockquote class="note">     

若出现 `通知方式`框禁选的情况，是因为在"平台层-消息服务"中已不支持该类通知方式，需联系平台管理员设置。
</blockquote>


## 5. WebHook配置  


WebHook配置是为了便于项目下将各个通知消息同步发送到钉钉、企业微信以及其他第三方消息通知渠道。  

### 5.1 创建WebHooks

路径：设置->通知->Webhook设置。点击顶部操作栏的`创建WebHooks`按钮，右侧会弹出创建WebHook的页面。您可以在此选择WebHooks类型，填写对应的WebHooks地址。
目前WebHook类型支持钉钉、企业微信、JSON三种类型。
  

![image](/docs/user-guide/settings/image/create-proj-webhook.png)  

获取WebHook地址：钉钉与企业微信在创建机器人时，便会生成WebHook地址，或者在创建成功后直接点击对应机器人来查看WebHook地址。详细获取方法请查看第三方通知渠道的官方说明。  

钉钉加签密钥：选择WebHook类型为钉钉时，若钉钉机器人安全设置为加签，则需填入机器人的密钥，否则不能成功发送消息。    

 <blockquote class="note"> 
    WebHook类型为钉钉时，请注意钉钉机器人安全设置的要求。
 </blockquote>

然后，选择需要执行WebHooks推送的触发事件，当所选的事件发生后，系统会依照平台层中配置的消息模板向第三方推送消息。  
 
 <blockquote class="note"> 
    此处仅能选择在"平台层-消息服务"中存在WebHook模板的触发事件；若需添加模板，需联系平台管理员设置。
 </blockquote>

最后，点击确定，完成WebHook的创建。


<blockquote class="warning">   

使用WebHook的重要问题说明：

（1）WebHook通过请求发送数据到你的应用后，就不再关注这些数据。也就是说如果你的应用存在问题，数据会丢失。许多WebHook会处理回应，如果程序出现错误会重传数据。如果你的应用处理这个请求并且依然返回一个错误，你的应用就会收到重复数据。

（2）WebHook会发出大量的请求，这样会造成你的应用阻塞。确保你的应用能处理这些请求。  
</blockquote>


### 5.2 管理WebHooks  

当WebHooks创建成功之后，会展示在主页的列表之中；展示的信息有：WebHook中的触发事件、WebHook地址、WebHook类型以及WebHook状态（分为启用与停用状态）。  
 
![image](/docs/user-guide/settings/image/proj-webhook-list.png)    

项目所有者可在列表中，对所有WebHooks，进行修改、启用/停用、删除的操作；同时，还可以查看某个WebHook的所有历史执行记录及其详情。

### 5.3 查看WebHooks执行记录  

当列表中的WebHook执行后，会产生对应的执行记录，目前可通过在列表中选择某个WebHook来查看执行记录；或者直接点击顶部的“WebHook执行记录”的按钮，直接查看所有WebHook的执行记录；    

![image](/docs/user-guide/settings/image/proj-webhook-record.png)   

在执行记录列表中，对于每一条记录，可以查看到记录的触发事件、WebHook地址、执行状态、WebHook类型以及WebHook消息的发送时间；并能针对每一条记录执行重新执行的操作。此外，在列表中点击某一条记录的触发事件，还能查看该记录的详情，其中包括：该记录的基本信息以及在发送WebHook时的详细日志。


## 6. 阅读更多

- [接收设置](../../person/notify_setting/)
- [消息服务](../../manager-guide/system-configuration/message/)
