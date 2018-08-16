+++
title = "使用知识管理工具"
description = "介绍了Choerodon的知识管理，从创建空间、页面，设置用户权限来介绍如何快速了解知识管理的操作方法"
weight = 5

+++

# 使用知识管理工具

## 概述

Choerodon知识管理服务是一个轻量级的强大Wiki平台，允许用户根据自己的特定需求自定义Wiki，为企业、IT团队提供方便的项目协作平台和强大的项目内容管理平台，集中式管理产品相关内容，例如需求收集、架构设计、功能设计、开关规范、命名规范、会议记录、计划安排等。

四个特点：文档编辑，内容组织，导入导出，模板定制

## 目标

本页面主要从创建空间、页面，设置用户权限来介绍如何快速了解知识管理的操作方法。

## 前置条件

在操作之前保证系统配置已经配置完全。

## 创建和管理一个空间

### 创建一个空间
 
空间是wiki页面的集成，一个空间可以包括很多项目和页面。

![enter description here](/docs/user-guide/wiki/image/image3.png)

1. 在组织设置菜单栏中点击`wiki管理`，进入wiki管理页面
2. 点击`创建空间`，会弹出空间创建页面，选择空间图标，填写空间名称，单击创建即可。
    <blockquote class="note">
    空间图标可以用来表示空间的类型，但并不强制，共有935个图标以供选择。
    </blockquote>

详细创建空间的方法浏览请查看用户手册[创建空间](../../user-guide/wiki/space/create-space)
 

### 管理一个空间

在空间主页右上角，点击`更多`，会显示出空间管理菜单。

![enter description here](/docs/user-guide/wiki/image/image8.png)

 1. Manage：包括Administer page（页面权限管理）、复制、重命名、删除。
 2. Action：导出、打印预览、查看源码、邮件分享。
 3. Viewers：子空间、评论、附件、记录、信息。

更多管理和编辑空间的详情可查看[管理空间](../../user-guide/wiki/space/manage-space)。

## 创建和编辑一个页面

### 创建一个页面

在空间主页中，您能快速创建一个页面，并对页面进行编辑和管理。想要了解更多关于编辑、管理页面的内容，请点击[编辑页面](../../user-guide/wiki/page/edict-page) 查看。

![enter description here](/docs/user-guide/wiki/image/image9.png)

1. 点击`创建`，进入创建的页面。
2. 填写页面标题。
3. 点击此处可以选择页面层次结构。
4. 选择要创建的页面类型模板，单击创建接即可。 

更多创建页面的方法浏览请查看用户手册[创建页面](../../user-guide/wiki/page/create-page)

### 编辑一个页面

通过此页面，您将了解到如何对页面进行编辑以及一些编辑功能的使用方法。

![enter description here](/docs/user-guide/wiki/image/image10.png)

1. 此处可以修改页面的标题。
2. 通过富文本编辑器，可以编辑和修改Wiki页面的内容。
3. 选择这个页面需汇总的版本。
4. 完成编辑后可以选择：预览、保存并继续编辑或者保存并查看。
5. 勾选自动保存，填写时间，系统会自动帮您进行页面的保存。
6. 填写文档信息中的文档默认语言。
7. 选择页面使用语法，在此默认为XWiki，你可以选择其他更多语法。
8. 勾选可选择在空间中隐藏此页面，当页面被隐藏时，如果你导航到它仍然可见，但它将从搜索，页面索引，导航树等中消失。
9. 点击`en`，系统会帮助翻译初始文档。
10. 单击拖动可对富文本编辑页面大小进行调整。
11. 单击`更多`可对页面进行管理

### 管理一个页面

点击页面右上角的`更多`，然后点击`Administer page`会跳转至页面管理页面。

![enter description here](/docs/user-guide/wiki/image/image12.png)
 
1. 外观和感觉：更改wiki的外观和布局。
2. 用户和权限：管理用户、小组及其访问权限。

更多管理详情可查看[管理页面](../../user-guide/wiki/page/manage-page)。

## 页面和空间的权限设置

点击页面右上角的`更多`，然后点击`Administer page`跳转至页面管理页面，点击`Users & Rights`。

![enter description here](/docs/user-guide/wiki/image/image17.png)

1. 显示小组团队列表。
2. 点击`user`可切换至用户权限设置。
3. 查找过滤器，用于快速查找小组和用户。
4. 通过打钩的方式针对每个小组和用户进行权限设置，包括：视图（仅查看）、评论、编辑、运行脚本、删除和设置管理员。
5. 选择不同的页面权限设置，有Rights:Page & Children 和 Rights:Page 两种设置方式。
   
    -  Page & Children设置的权限适用于本页面/空间及其所有子页面/空间。
    -  Rights: Page 设置的权限仅适用于本页面/空间不影响其子页面/空间。

    <blockquote class="note">
    当使用Rights: Page 这项设置时，是没有设置管理员这项权限的。
    </blockquote>

更多关于权限的详情，请查看[权限管理](../../user-guide/wiki/hierarchy)