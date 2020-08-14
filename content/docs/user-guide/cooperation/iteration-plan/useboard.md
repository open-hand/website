+++
title = "使用看板"
description = ""
weight = 2
+++

# 使用看板

## 1. 概述

看板是一种灵活的可视化管理工具，您可以随意切换看板，拖动故事卡片来更改问题状态，快速搜索当前迭代看板中的问题，查看对应经办人下的[故事](../../work-lists/user-story)。
 
在整个迭代周期中，您还能通过看板记录每一天故事完成所耗工时；对故事评论和添加描述；创建故事对应的分支。
 
通过此页面，您将会了解到如何使用看板，包括看板的切换、故事卡片的拖动、搜索、评论、登记工时、查看经办人、创建分支等。
 
## 2. 看板的切换

在工具栏的看板名称处的下拉菜单处，选择你想要查看的看板，即可快速切换看板。

![image](/docs/user-guide/cooperation/iteration-plan/image/scrumboard-06.png)

## 3. 故事卡片拖动

在同一个泳道内，看板中的卡片可以拖动到不同的状态列，随着拖动改变问题的状态和解决状态。

当问题卡片从一列移动到另一列时，其状态会发生改变，相应的状态会在卡片上体现。系统初始将会默认三种状态，关于问题状态的描述，请查看[什么是看板](../whatisboard)。

![image](/docs/user-guide/cooperation/iteration-plan/image/scrumboard-07.png)

## 4. 快速搜索

点击工具栏的`快速搜索`下拉菜单，可以使看板只显示出对应条件的问题，支持的搜索条件有：`仅我的问题`和`仅故事`，以及其他未完成选项，支持单选和双选。

![image](/docs/user-guide/cooperation/iteration-plan/image/scrumboard-08.png)

## 5. 查看经办人

点击工具栏上的`经办人`，可以筛选某一个或某几个经办人所处理的问题。

## 6. 登记工时

在编辑一个问题时，您可以为该问题设置一个预计的处理时间，该时间会以剩余时间的形式显示在问题详情页面的问题概要下方。

您可以通过登记工作来记录您每次处理问题所耗时间，系统会自动核减时间，显示出该问题最新的剩余时间。

1. 点击一个问题，在问题详情中选择记录，点击登记工作。

    ![image](/docs/user-guide/cooperation/iteration-plan/image/scrumboard-09.png)

2. 登记您此次工作所用时间，并选择此次工作开始的日期。

    ![image](/docs/user-guide/cooperation/iteration-plan/image/scrumboard-10.png)

3. 剩余时间估计

    若您填写了1、2步骤，剩余时间则选择自动调整，系统会自动为您核减时间；选择不设预估时间，则表示您对该问题不设置完成时间限制；填写设置为____ h表示您对剩余时间进行了重新设置；填写缩减___h表示您对该问题设置具体核减时间。

    > 四个时间剩余预估方法中只需选择一个即可。

4. 填写工作说明对今日的工作进行描述。


## 7. 评论故事

在处理某个问题时，您可能需要与团队成员共享一些信息、阐述一些需求，或者与你的团队讨论有关该问题的一些细节，通过问题的评论可以很容易解决。

![image](/docs/user-guide/cooperation/iteration-plan/image/scrumboard-11.png)

1. 选择要添加评论的问题。
2. 在问题详情页面中，找到并单击“添加评论”按钮。
3. 在评论文本框中，输入您的评论。

## 8. 创建分支

您可以针对某一问题创建对应的分支并对其进行管理。

使用 GitLab 进行分支管理，默认分支为 master，您可以在产品开发过程中对 Feature、Bugfix、Release、Hotfix 等分支进行管理。所有的提交将触发持续集成，可在持续集成菜单下查看代码集成情况。

![image](/docs/user-guide/cooperation/iteration-plan/image/scrumboard-12.png)

1. 在问题详情页面中，找到并单击开发处的“添加”按钮，可看到分支创建界面

    ![image](/docs/user-guide/cooperation/iteration-plan/image/scrumboard-13.png)

2. 通过选择应用、分支来源，修改分支类型及分支名称，即可为该问题创建关联的分支。

更多关于分支管理的介绍，请查看[分支管理](../../../development/code-manage/manage-branch)。

## 9. 全屏显示看板

冲刺开启后，您可以通过点击`工具栏`的`全屏`按钮全屏显示用户故事地图。

## 10. 阅读更多

- [什么是看板](../whatisboard)
- [多看板](../multi-board)
- [选择泳道](../lane)