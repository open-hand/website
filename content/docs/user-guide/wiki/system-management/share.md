+++
title = "未注册用户如何查看分享的页面"
description = ""
weight = 9
+++
# 未注册用户如何查看分享的页面
wiki系统提供了未注册用户查看页面的功能，我们只需简单配置就可以实现。

使用admin用户登录wiki系统(直接访问wiki系统的域名)，然后点击顶部导航栏右侧的齿轮（设置）按钮，进入系统设置： 设置->用户与权限->权限，找到下图中`XWikiAdminGroup`和`XWikiAllGroup`组，并按照下图对组的权限进行勾选，特别注意图中红框的权限不要勾选也不要禁用。

![solr](/docs/user-guide/wiki/system-management/image/unregisteredview.jpg)

紧接着切换到用户，在`未注册用户`一栏，对红框的权限不要勾选也不要禁用。
![solr](/docs/user-guide/wiki/system-management/image/unregisteredview1.jpg)

进入到要分享的页面，然后点击`更多`，选择`管理`，进入到页面管理权限分配。
![solr](/docs/user-guide/wiki/system-management/image/unregisteredview2.jpg)

选择`用户与权限`，如果用户选择`权限:页面和子页面`菜单，那么分享的这个页面及其子页面对未注册用户都可见，如果用户选择`权限:页面`菜单，就只有这个页面对未注册用户可见。然后切换到用户，在`未注册用户`一栏，对红框的权限进行勾选。
![solr](/docs/user-guide/wiki/system-management/image/unregisteredview3.jpg)

到此，配置就完成了，未注册用户就能查看到分享的页面。

## 下一步
- [**其他**](../other)：通知的设置。

## 更多操作
- [管理空间](../../space/manage-space)
- [管理页面](../../page/manage-page)
- [编辑页面](../../page/edict-page)