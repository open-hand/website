+++
title = "绩效"
description = ""
weight = 8
+++

# 绩效
- **菜单层次**：项目层
- **菜单路径**：协作 > 绩效
- **默认角色**：项目成员、项目管理员

## 概要
分析当前冲刺故事、任务、缺陷情况及历史冲刺故事、任务、缺陷趋势变化，以便用户更好的了解冲刺的完成情况，包括以下部分

-	进度与效率：故事点分布图、故事点完成情况图

-	质量分析：缺陷排行榜、缺陷分布图

-	趋势分析：问题完成趋势图、缺陷趋势分析图

## 进度与效率
分析当前正在进行冲刺故事、任务完成情况及分布

- 故事点分布图：从计划、实际两个维度展示故事点、任务工时主要负责人的数量以及占比。

![image](/docs/user-guide/cooperation/image/team-performance-01.png)

- 故事完成情况图：从故事点、任务两个维度展示主要负责人计划、实际完成对比及百分比。

![image](/docs/user-guide/cooperation/image/team-performance-02.png)

## 质量分析
分析当前冲刺缺陷的排名及分布

- 缺陷排行榜：从非生产环境、生产环境两个维度展示责任人、创建人缺陷数量并按降序排列

![image](/docs/user-guide/cooperation/image/team-performance-03.png)

- 缺陷分布图：从非生产环境、生产环境两个维度展示责任人、创建人缺陷数量柱状分布图

![image](/docs/user-guide/cooperation/image/team-performance-04.png)

## 趋势分析
分析故事点、任务工时、缺陷随冲刺的变化情况

- 问题完成趋势图：从故事点、任务工时两个维度展示每个冲刺计划、完成数量及顺冲刺的变化

![image](/docs/user-guide/cooperation/image/team-performance-05.png)

- 缺陷趋势分析图：从非生产环境、生产环境两个维度展示责任人、创建人每个冲刺缺陷数量及随冲刺的变化，可通过责任人筛选

![image](/docs/user-guide/cooperation/image/team-performance-06.png)

## 团队绩效规范
### 目标
- 可视化团队进度、效率
- 可视化团队研发质量
- 提供趋势信息展现

### 操作规范
#### 故事规范
- 输入故事点，以此统计故事维度进度
- 提供故事主要负责人，以此可视化故事点分布

场景如下：
- 按照故事主要负责人展示工作分布情况、完成情况
- 按照冲刺维度展示团队故事点容量的趋势情况

#### 任务规范
- 输入任务工时，以此统计任务维度进度
- 提供任务主要负责人，以此可视化任务工时分布

场景同故事。

#### 缺陷规范
- 输入`主要负责人`，非生产环境代表引入缺陷的开发人员，生产环境代表缺陷的原始功能的原始测试负责人
- 输入`环境`，`生产环境`代表生产环境产生，其他为`非生产环境`

组合之后的场景如下：
- 负责人+非生产环境：评估开发人员开发质量
- 负责人+生产环境：评估测试人员测试质量