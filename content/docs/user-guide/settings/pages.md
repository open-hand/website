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

字段列表页面看到所有的可编辑字段方案，在此页面您能对当前层级下的字段方案进行编辑，列表显示内容包含字段名称、显示范围、字段来源、字段类型、必填项，如图：


<img src="https://file.open.hand-china.com/hsop-doc/doc_classify/0/8dcf37918e4745628450534daceb2c4f@image.png" alt="" width="auto" height="auto" />


<blockquote class="note">注1：组织层字段列表只显示系统默认字段、组织层创建字段，不显示项目层创建字段。</blockquote>
<blockquote class="note">注2：项目层字段列表显示系统默认字段、组织层创建字段以及<span style="color:#ab4642">当前项目创建字段</span></blockquote>

### 2.1 创建字段
点击导航栏上方的`创建字段`按钮，会跳出创建字段页面，填写编码、名称、字段类型、问题类型、默认值，添加字段值后，即可创建新字段，如图：


<img src="https://file.open.hand-china.com/hsop-doc/doc_classify/0/b87f37cbe6c8449ba38a99d2315cfc54@image.png" alt="" width="300" height="auto" />


* 字段类型包括：单选框、复选框、时间选择器、日期时间选择器、数字输入框、文本框（单行）、文本框（多行）、选择器（单选）、选择器（多选）、人员（单选）、人员（多选）、日期选择器，共十二种类型。

* 问题类型设置字段显示范围，包括：史诗、故事、缺陷、任务、子任务5种范围。

### 2.4 导入字段

- 点击顶部操作栏的`导入字段`按钮，打开导入字段页面。
- 下载页面字段模板。
- 根据模板说明填写Excel，点击`导入`按钮导入字段。

<img src="https://file.open.hand-china.com/hsop-doc/doc_classify/0/4aac012681664aa5b2c9bc4005340e80@image.png" alt="" width="auto" height="auto" />

<blockquote class="note">如果数据格式都正确，界面会提示文件解析成功，否则将会反馈失败文件，您可以将导入失败的字段修改正确，重新导入。</blockquote>

### 2.3 删除字段

点击字段名称后的<img src="http://file.open.hand-china.com/hsop-doc/doc_classify/0/1f48337682634675a027b66c6039a4f2/image.png" alt="" width="auto" height="auto" >标识，选择删除会跳出删除字段提示框提醒当前字段使用情况。

<img src="http://file.open.hand-china.com/hsop-doc/doc_classify/0/2eb0944f90944971990cb7b20ed3eeab/image.png" alt="" width="auto" height="auto" >

> 删除字段后，此字段将会从所有使用问题中删除，并且字段数据会清空。

## 3. 页面管理

- 页面管理可以设置系统内不同页面的匹配字段方案，并对该页面下字段的显示和排序进行设置。

- 点击某个问题类型，进入该问题类型的字段编辑界面。
- 您可以在此配置是否在创建页、编辑页显示。
- 您可以在此配置是否必输和字段的默认值。
- 您可以上下拖动字段改变字段的显示顺序。
- 您可以在此设置描述的填写规范。例如可以规定故事类型的问题描述框填写规则为：
		作为一个<某种类型的用户>，
		我要<达成某些目的>，
		我这么做的原因是<开发的价值>。

<img src="https://file.open.hand-china.com/hsop-image/doc_classify/0/6885dd96ec724e5b9c649e679c8f93f7@pages-03.png" alt="pages-03.png" width="auto" height="auto" />


<blockquote class="note">注1：系统默认显示字段不能进行显示编辑。部分系统字段不支持维护默认值和设置为不必输。</blockquote>

<blockquote class="note">注2：如果组织层编辑了页面字段后，没有字段定义的项目会同步组织成页面编辑所有操作，创建过字段的项目之会同步增加、删除的信息，不同步排序和显示。</blockquote>

<blockquote class="note">注3：没有字段定义的项目，指项目创建后没有进行过项目层字段创建的项目。</blockquote>


## 4. 阅读更多

- [测试设置](../test)
- [状态机设置](../state)