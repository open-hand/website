+++
title = "WebHook配置"
description = "WebHook配置是为了便于项目下将各个通知消息同步发送到钉钉、企业微信以及其他第三方消息通知渠道"
weight = 9
+++
# WebHook配置

## 1. 概述
WebHook配置是为了便于项目下将各个通知消息同步发送到钉钉、企业微信以及其他第三方消息通知渠道。  

## 2. 创建WebHooks

路径：管理中心->WebHook配置 。点击顶部操作栏的`创建Webhooks`按钮，右侧会弹出创建WebHook的页面。您可以在此选择Webhooks类型，填写对应的Webhooks地址。
目前WebHook类型支持钉钉、企业微信、JSON三种类型。
  

![image](/docs/user-guide//manager-guide/image/create-webhook.png)  

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


## 3. 管理WebHooks  

当WebHooks创建成功之后，会展示在主页的列表之中；展示的信息有：WebHook中的触发事件、WebHook地址、WebHook类型以及WebHook状态（分为启用与停用状态）。  
 
![image](/docs/user-guide/manager-guide/image/webhook-list.png)    

项目所有者可在列表中，对所有WebHooks，进行修改、启用/停用、删除的操作；同时，还可以查看某个WebHook的所有历史执行记录及其详情。

## 4. 查看WebHooks执行记录  

当列表中的WebHook执行后，会产生对应的执行记录，目前可通过在列表中选择某个WebHook来查看执行记录；或者直接点击顶部的`WebHook执行记录`的按钮，直接查看所有WebHook的执行记录；    

![image](/docs/user-guide/manager-guide/image/webhook-record.png)   

在执行记录列表中，对于每一条记录，可以查看到记录的触发事件、WebHook地址、执行状态、WebHook类型以及WebHook消息的发送时间；并能针对每一条记录执行重新执行的操作。此外，在列表中点击某一条记录的触发事件，还能查看该记录的详情，其中包括：该记录的基本信息以及在发送WebHook时的详细日志。