+++
title = "页面"
description = ""
weight = 2
+++

# 页面

## 1. 概述

在页面设置中，您可以对系统页面中的显示字段进行自定义。

通过此页面，您将了解到字段的创建和编辑，以及不同页面的匹配字段设置。

## 2. 字段列表

![image](/docs/user-guide/settings/image/page-01.png) 

字段列表页面看到所有的可编辑字段方案，在此页面您能对当前层级下的字段方案进行编辑，列表显示内容包含字段名称、显示范围、字段来源、字段类型、必填项，如图：

<blockquote class="note">注1：组织层字段列表只显示系统默认字段、组织层创建字段，不显示项目层创建字段。</blockquote>
<blockquote class="note">注2：项目层字段列表显示系统默认字段、组织层创建字段以及<span style="color:#ab4642">当前项目创建字段</span></blockquote>

### 2.1 创建字段

![image](/docs/user-guide/settings/image/page-02.png)

点击导航栏上方的`创建字段`按钮，会跳出创建字段页面，填写编码、名称、字段类型、问题类型、默认值，添加字段值后，即可创建新字段，如图：

* 字段类型包括：单选框、复选框、时间选择器、日期时间选择器、数字输入框、文本框（单行）、文本框（多行）、选择器（单选）、选择器（多选）、成员选择、日期选择器，共十一种类型。

* 问题类型设置字段显示范围，包括：全局、特性、史诗、故事、缺陷、任务、子任务七种范围。

### 2.2 删除字段

点击字段名称后的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_b53c0c1755864d7f9e3f7bb1f88b37fc_blob.png)标识，选择删除会跳出删除字段提示框提醒当前字段使用情况。

![image](/docs/user-guide/settings/image/page-03.png)

> 删除字段后，此字段将会从所有使用问题中删除，并且字段数据会清空。

## 3. 页面管理

页面管理可以设置系统内不同页面的匹配字段方案，并对该页面下字段的显示和排序进行设置。

![image](/docs/user-guide/settings/image/page-04.png)

点击某个页面，进入该页面的字段编辑界面。

![image](/docs/user-guide/settings/image/page-05.png)

<blockquote class="note">注1：系统默认显示字段不能进行显示编辑。</blockquote>

<blockquote class="note">注2：如果组织层编辑了页面字段后，没有字段定义的项目会同步组织成页面编辑所有操作，创建过字段的项目之会同步增加、删除的信息，不同步排序和显示。</blockquote>

<blockquote class="note">注3：没有字段定义的项目，指项目创建后没有进行过项目层字段创建的项目。</blockquote>

## 4. 阅读更多

- [测试设置](../test)
- [通用设置](../common)