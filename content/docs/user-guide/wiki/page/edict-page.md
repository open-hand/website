+++
title = "编辑页面"
description = ""
weight = 2
+++

# 编辑页面

通过此页面，您将了解到如何对页面进行编辑以及一些编辑功能的使用方法。

![enter description here](/docs/user-guide/wiki/image/edict-page.png)

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
11. 单击`更多`可对页面进行管理，详情可查看[管理页面](../manage-page)。

## 页面编辑工具栏

您可以通过工具栏为文本添加特殊效果，添加图像，插入链接，添加宏等，在此仅介绍几种效果。

![enter description here](/docs/user-guide/wiki/image/toolbar.png)

1. 在文本中插入分割线。
2. 插入文本背景模块，可以选择不同颜色样式。
3. 点击`原始码`可以换成markdown语法进行编辑。
4. 点击此处可以全屏模式进行编辑，完成后单击按钮可返回到常用界面。

## 页面锁定
    
默认情况下，当您编辑页面时，页面设置为锁定，直到您保存或取消编辑。 

如果您离开页面而没有保存或取消，则锁定将保持一段预定的时间（可以配置持续时间）。因此如果您没有对页面进行任何更改建议点击取消，而不是仅仅关闭浏览器选项卡。

任何试图编辑被锁定页面的人都会看到“页面被锁定”的警告消息，让您知道该页面已被锁定并且还强制锁定。

## 宏的使用
1. 在编辑页面，选择下面红框处的图标，会显示XWiki一些常用的宏，在此我们将介绍下面宏的作用。
![enter description here](/docs/user-guide/wiki/image/macros-navigation.jpg)

1. XWiki宏弹出界面，目前我们筛选了8种常用的宏。
![enter description here](/docs/user-guide/wiki/image/macros.jpg)

1. 下面列举了XWiki宏使用的对应效果图，并对其中几种宏做出了文字说明。
![enter description here](/docs/user-guide/wiki/image/macros-use.png)

    - 选择`代码块`宏(上面标记1)，宏里面各种代码将显示高亮效果。
    - 选择`公式`宏，显示数学公式(上面标记3)，要遵循LaTeX语法的数学公式。
    - 选择`块引用`宏(上面标记4)，将输入的内容放入一块区域内，可以输入标题、CSS样式、宽度和插入图片。
    - 选择`子页面`宏(上面标记5)，显示当前页面的子页面树状浏览器。

## 插入issue
1. 在编辑页面，选择下面红框处的图标，会显示敏捷创建的issue。
![enter description here](/docs/user-guide/wiki/image/issue-navigation.png)

1. 选择项目会显示项目下创建的issue，您可以翻页查看更多的issue，也可以模糊搜索具体的issue。
![enter description here](/docs/user-guide/wiki/image/issue.png)

1. 选择项目下某个issue，然后点击`确定`，会在编辑器内容里面显示这条issue。双击会显示issue的链接地址。
![enter description here](/docs/user-guide/wiki/image/issue-select.png)

1. 点击`创建`，选择`项目`和`问题类型`，然后输入摘要，就可以创建一条新的issue。
![enter description here](/docs/user-guide/wiki/image/issue-insert.png)

## 下一步

- [**管理页面**](../manage-page)：您将了解到如何管理页面，对页面外观如面板布局等进行自定义。


## 更多操作

- [创建空间](../../space/create-space)
- [管理空间](../../space/manage-space) 
- [权限管理](../../hierarchy)





