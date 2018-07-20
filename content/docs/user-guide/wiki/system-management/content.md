+++
title = "内容"
description = ""
weight = 4
+++

# 内容
在页面的编辑过程中，您可以通过将内容放入页面（也称为文档）来组织Wiki中的内容，每个页面通常只包含给定主题的内容。

以下操作可以组织您的页面：

## 模板
您在页面中使用的模板可以在此处创建，有效的模板提供者也会在此处可见。

![模板](/docs/user-guide/wiki/system-management/image/template.png)

1.在此处填写模板提供者，此处为必填栏

2.此处显示页面层次结构中此新页面的位置

3.点击此处创建模板

## 国际化
Wiki语言可以自行设置，支持一种或多种语言，设置语言可以在管理中完成。

![语言](/docs/user-guide/wiki/system-management/image/language.png)

1.此处可以设置是否选择多语言，即使选择多语言，在查看界面时也会以首选语言为主。

2.在此处选择界面中可用的语言。用户将能够以任何一种语言翻译您的WIKI页面（如果启用了多语言模式）

3.选择WIKI的默认语言

4.设置时区及时间

## 导入/导出
管理员可以通过导入/导出管理功能导出WIKI的所有页面。
### 导入Wiki页面
先决条件：

- 如果您的Wiki是空的并且这是您的第一次导入，则需要以superadmin身份登录才能进行第一次导入，因为此时Wiki中没有定义用户。
- 已配置了数据库和Servlet容器。

按着以下次序：

- 确保您的数据库和容器已启动
- 获得Wiki的管理页面（右上方的抽屉菜单），然后找到导入菜单。
- 附加要导入的XAR文件，然后从 “可用包”下的列表中选择它。几秒钟后，您应该会看到XAR中列出并默认选中所有页面的列表（取消选择您不想导入的页面/文件夹）：

![导入](/docs/user-guide/wiki/system-management/image/dr.png)

- 如果要将文档历史记录替换为导入包中的历史记录，请选择第二个单选按钮。如果您不选择它，新导入的页面将具有修订版“1.1”
- 如果要保留导入页面的作者，请选中“作为备份包导入”选项。
- 单击“导入”。这将导入所有选定的页面
- 在此阶段，您的权利可能已被更改，因为导入可能会导入不同的权限，因此您可能需要注销并重新登录。

### 导入扩展

导入XAR时，如果XAR的package.xml包含extensionId值（表示扩展ID），则导入器将检查扩展是否存在于其配置的XWiki扩展存储库中（其配置位于xwiki.properties下）extension.repositories键）。如果找到Extension，则Importer会将其注册到Extensions列表中。

### 导出Wiki页面
先决条件：

- 已配置了数据库和Servlet容器。

按着这些次序：

- 确保您的数据库和容器已启动
- 将浏览器指向http：// localhost：8080 / xwiki / bin / admin / XWiki / XWikiPreferences
- 单击“导出”并填写表单
- 点击“导出”

![导出](/docs/user-guide/wiki/system-management/image/dc.png)

### 自定义XAR
执行导出时，Wiki页面使用XAR格式保存。导出时创建的典型XAR将包含Wiki实例上的所有页面。但是，您可以使用自定义导出URL控制此操作。

也就是说，也可以创建一个仅包含所需页面的XAR。例如，当您只想导出特定应用程序的页面时，这非常有用。以下是步骤：

- 解压压缩文件
- 保留要放入存档的页面
- 编辑package.xml以删除不希望存档的页面
- 将修改后的package.xml文件和要归档的页面压缩在一起，命名文件为“MyArchive”.xar其中“MyArchive”是您要为其提供的实际名称
- 完成后您现在可以将此特定页面集导入任何Wiki实例

## 注释
### 注释激活
以下两个设置可让你具体配置哪个空间可以启用注释功能。
第一个总的勾选框代表在Wiki上激活注释功能；其他的勾选框用于设置某一特定的空间是否需要激活注释功能。

![注释](/docs/user-guide/wiki/system-management/image/annotation.png)

### 注释显示设置和注释类型设置
在注释显示设置中，您可以勾选默认显示注释或者默认突出显示注释。默认显示注释是在每页上选中“显示注释”时显示注释，默认突出显示注释是指只要将鼠标悬停在注释或注释结构上时，就会显示出注释。

关于注释类型设置，如果您希望为您的注释添加额外的属性，可以在此增加属性。
## Office Server
Office 需要后端打开 Office 服务器才能运行，操作如图。
![office](/docs/user-guide/wiki/system-management/image/office.png)

## 下一步
- [**编辑**](../editing)：对编辑模式进行设置。

## 更多操作
- [管理页面](../../page/manage-page)
- [空间层次结构](../../space/permissions-space)
- [页面层次结构](../../page/permissions-page)