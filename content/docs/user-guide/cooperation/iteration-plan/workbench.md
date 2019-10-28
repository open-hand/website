+++
title = "使用迭代工作台"
description = ""
weight = 7
+++

# 使用迭代工作台

## 1. 概述

迭代工作台以[冲刺](../../work-lists/sprint)为维度为用户快速展示某冲刺的各种统计信息，有利于项目管理者预估冲刺进度，并且及时评估项目存在的风险。

进入迭代计划页面，点击工具栏最右侧的按钮，切换为`工作台模式`，即可进入迭代工作台。

迭代工作台显示当前项目正在进行的冲刺信息，即活跃冲刺，分为冲刺概要图、状态分布图、距离冲刺结束图、燃尽图、迭代问题类型分布图、优先级分布图、经办人分布图、冲刺详情图八个部分。

此页面将为您介绍迭代工作台中的具体图表内容。

## 2. 冲刺概要图

![image](/docs/user-guide/cooperation/iteration-plan/image/scrumboard-30.png)

展示该冲刺的概要信息，包括：

- 冲刺名称
- 该冲刺下的问题可见数量，统计活跃冲刺看板中的可见问题（包括故事、任务、故障）
- 冲刺目标
- 冲刺开始时间与结束时间

## 3. 状态分布图

按照状态类别的维度统计待处理、处理中、已完成三类问题数量与所占比例。

![image](/docs/user-guide/cooperation/iteration-plan/image/scrumboard-31.png)

## 4. 距离冲刺结束图

计算当前时间具体冲刺结束时间的天数。

![image](/docs/user-guide/cooperation/iteration-plan/image/scrumboard-32.png)

## 5. 燃尽图

用于跟踪记录所有问题的剩余工作工作时间，预估完成冲刺任务的可能性，回顾总结迭代过程中的经验与不足。

![image](/docs/user-guide/cooperation/iteration-plan/image/scrumboard-33.png)

详情情查看[燃尽图](../../../report/agile-report/burn-down)

## 6. 迭代问题类型分布图

按照问题类型统计不同状态类别下的问题数量，可快速分析冲刺下问题分布情况。

![image](/docs/user-guide/cooperation/iteration-plan/image/scrumboard-34.png)

- 横坐标表示问题类型，包括：故事、故障、任务、子任务
- 纵坐标表示在某个问题类型下，不同状态类别（待处理、处理中、已完成）下的问题数量。

## 7. 优先级分布图

按照问题的优先级（高、中、低）为维度，统计冲刺下问题已完成和总计数的数量。

![image](/docs/user-guide/cooperation/iteration-plan/image/scrumboard-35.png)

例如： 1/3表示已完成问题数为1，总计数为3。

## 8. 经办人分布图

按照问题的经办人为维度， 统计冲刺下各个经办人所经办的问题数量与所占百分比，以饼图的形式展示。

![image](/docs/user-guide/cooperation/iteration-plan/image/scrumboard-36.png)

## 9. 冲刺详情图

展示冲刺下的问题详情列表。

![image](/docs/user-guide/cooperation/iteration-plan/image/scrumboard-37.png)

详情模块：

* 已完成的问题：当冲刺中的问题已完成，则此问题将归类于此项。
* 未完成的问题：当冲刺中的问题未完成，并且已预估故事点（问题类型为故事）或时间（其他类型的问题），则此问题将归类于此项。
* 未完成的未预估问题：当冲刺中的问题未完成，并且未预估故事点（问题类型为故事）或时间（其他类型的问题），则此问题将归类于此项。

字段描述：

* 关键字：表示问题编号
* 概要：表示问题概要
* 问题类型：表示问题类型，包括史诗、故事、任务、缺陷
* 优先级：表示问题优先级，包括高、中、低
* 状态：表示问题关联的状态
* 故事点：如果问题类型是故事，将显示该问题的故事点。其他类型不显示该字段

## 10. 阅读更多

- [什么是看板](../whatisboard)
- [分支管理](../../../development/code-manage/manage-branch/)
- [代码质量](../../../development/code-manage/code-quality)
