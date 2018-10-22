+++
title = "通知设置"
description = "设置选择发送对象，触发该类型事件时，向该对象发送对应事件的站内信通知"
weight = 4
+++

# 通知设置
通知设置可以让用户按照通知设置中的不同类型的事件来编辑发送站内信通知的对象

通过编辑事件的站内信通知对象，在事件被触发时，会给通知对象发送该事件类型的站内信通知

## 菜单层次

* 菜单层次：项目层
* 菜单路径：敏捷管理>设置>通知设置
* 默认角色：项目成员

系统内置事件包含: `问题创建`、`问题分配`、`问题已解决`，用户可以编辑事件所对应的站内信通知对象。


## 操作步骤
* 编辑通知类型<br>
<img src="/docs/user-guide/agile/setup/img/message-notification1_set.png"  height="213" width="600"><br/>
<img src="/docs/user-guide/agile/setup/img/message-notification2_set.png"  height="282" width="600"><br/>

1. 点击`详情`按钮；
2. 跳转到的`编辑通知类型`页面，在页面中可以多选站内信通知对象，选项包括`当前处理人`、`报告人`、`项目所有者`、`用户`；
    <blockquote class="note">
    `请选择`下拉列表中选择特定站内信通知对象后，选中`用户`，触发对应事件时，会给该特定对象发送对应类型的站内信通知
    </blockquote>
3. 点击`保存`按钮。
<br/>
<br/>


* 查看站内信通知<br/>
<img src="/docs/user-guide/agile/setup/img/message-notification3_set.png"  height="364" width="400"><br/>

1. 点击导航栏的![](/docs/user-guide/agile/setup/img/messageIco.png)图标，可以查看收到的站内信通知;
    <blockquote class="note">
        图标上面的红底数字代表收到未读站内信通知的数量
；    </blockquote>
2. 点击站内信通知列表中的![](/docs/user-guide/agile/setup/img/message_deletIco.png) 图标，可删除对应的站内信通知；
3.  点击`全部清空`按钮，可清除站内信通知列表中本页的所有消息；
4. 点击`查看所有消息`按钮会跳转到`个人中心`的[`消息通知`](../../../system-configuration/person/message_notification)页面看到所有的站内信通知。
 

## 后续处理

项目设置中的`默认经办人策略`选择了`默认创建人`并且在`问题创建`事件的站内信通知对象中选择`当前处理人`，会给创建人发问题分配通知，如果创建人不想接收这样的通知，可以到[项目设置](../project-setting)修改中的`3`。

## 更多操作

- [问题链接](../issue-link)
- [项目设置](../project-setting)
- [快速搜索](../quick-search)