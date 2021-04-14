+++
title = "项目概览"
description = ""
weight = 1
+++

# 项目概览

- **菜单层次**：项目层
- **菜单路径**：协作 > 项目概览
- **默认角色**：项目成员、项目管理员

## 概要

项目概览是项目开发情况的总览，主要包括以下图表：

- 应用服务卡片：展示当前项目启用和停用的应用服务数量，以便您了解项目的代码库使用情况。

<img src="https://file.open.hand-china.com/hsop-doc/doc_classify/0/684699a07d6b4eccbd723eb8c10ad3e5@image.png" alt="" width="auto" height="auto" />

- 环境卡片：展示当前项目环境的运行情况，包括运行中的环境和未连接的环境。

<img src="https://file.open.hand-china.com/hsop-doc/doc_classify/0/d762a3ee43fb430e83ac97f3acbc73e9@image.png" alt="" width="auto" height="auto" />


- 冲刺未完成统计：统计当前项目当前迭代未完成的问题项数量、故事点数、工时数量，以及当前迭代的剩余天数。

<img src="https://file.open.hand-china.com/hsop-doc/doc_classify/0/a46a9e61f3f0440592ac7b2049dbb620@image.png" alt="" width="auto" height="auto" />


- 燃尽图:跟踪记录所有问题的剩余工作工作时间，预估完成冲刺任务的可能性，回顾总结迭代过程中的经验与不足。

<img src="https://file.open.hand-china.com/hsop-doc/doc_classify/0/976ecea32e7f4ab3a6100458832c9405@image.png" alt="" width="auto" height="auto" />

- 迭代问题统计：统计当前迭代的问题项在已完成、未完成、待处理、未分配这4种状态的数量占比情况。

<img src="https://file.open.hand-china.com/hsop-doc/doc_classify/0/06cfad6b1616491eb4fa8692d53401a2@image.png" alt="" width="auto" height="auto" />


- 缺陷提出与解决：统计当前迭代团队成员提出和解决bug的数量。

<img src="https://file.open.hand-china.com/hsop-doc/doc_classify/0/5911b5c2a67d4c678d35da0a5b76fc21@image.png" alt="" width="auto" height="auto" />


- 在线成员：当前项目团队成员的在线情况，及其在项目中的角色。

<img src="https://file.open.hand-china.com/hsop-doc/doc_classify/0/66beac500f444d09adbb7a7267a369d6@image.png" alt="" width="auto" height="auto" />


- 缺陷累积趋势图：记录当前迭代新增和修复缺陷的数量变化趋势，以便于您了解迭代的开发质量变化。

<img src="https://file.open.hand-china.com/hsop-doc/doc_classify/0/348a34ff7b104657b2b3f9c2ae70e6f8@image.png" alt="" width="auto" height="auto" />

- 流水线触发次数：记录当前迭代内容，所有团队成员触发流水线的数量变化趋势。

<img src="https://file.open.hand-china.com/hsop-doc/doc_classify/0/529e8e514275427f8ca74a8f8ff543bb@image.png" alt="" width="auto" height="auto" />

- 迭代代码提交次数：记录当前迭代内团队成员提交代码的次数，以了解对项目代码库的贡献。

<img src="https://file.open.hand-china.com/hsop-doc/doc_classify/0/f00342cd64a141c6bbc50c348b0e158b@image.png" alt="" width="auto" height="auto" />


- 迭代部署次数：记录当前迭代团队成员部署的次数，以便了解团队的部署构建情况

<img src="https://file.open.hand-china.com/hsop-doc/doc_classify/0/fbcfeb62c3884198ba1b8ff13d09dd03@image.png" alt="" width="auto" height="auto" />

- 迭代问题类型分布图：按照问题类型统计不同状态类别下的问题数量，可快速分析冲刺下问题分布情况。

	- 横坐标表示问题类型，包括：故事、缺陷、任务、子任务以及自定义问题类型
	- 纵坐标表示在某个问题类型下，不同状态类别（待处理、处理中、已完成）下的问题数量。

<img src="https://file.open.hand-china.com/hsop-doc/doc_classify/0/3741c826fe944b16918a3ecf3cf2d0e2@image.png" alt="" width="auto" height="auto" />

- 优先级分布图：按照问题的优先级（高、中、低）为维度，统计冲刺下问题已完成和总计数的数量。
	- 深色表示当前冲刺中处在该优先级中已完成的问题项的数量（含子任务）。
	- 浅色表示：当前冲刺中处在该优先级的问题项的总数（含子任务）。

<img src="https://file.open.hand-china.com/hsop-doc/doc_classify/0/eb23bbbc2ddb444189098d3552a74a05@image.png" alt="" width="auto" height="auto" />

- 经办人分布图：按照问题的经办人为维度， 统计冲刺下各个经办人所经办的问题数量与所占百分比，以饼图的形式展示。更多详细信息查看`图表-统计图`。


<img src="https://file.open.hand-china.com/hsop-doc/doc_classify/0/a4a70c2fd76244e9be1b79baba6f651d@image.png" alt="" width="auto" height="auto" />

- 冲刺详情列表：
	- 已完成的问题：当冲刺中的问题已完成，则此问题将归类于此项。
	- 未完成的问题：当冲刺中的问题未完成，并且已预估故事点（问题类型为故事）或时间（其他类型的问题），则此问题将归类于此项。
	
字段描述：

	- 关键字：表示问题编号
	- 概要：表示问题概要
	- 问题类型：表示问题类型，包括史诗、故事、任务、缺陷
	- 优先级：表示问题优先级，包括高、中、低
	- 状态：表示问题关联的状态
	- 故事点：如果问题类型是故事，将显示该问题的故事点。其他类型不显示该字段
	- 新增的issue在issue编号右边标注*号表示。

-  项目动态：显示项目成员对问题项的操作记录。

<img src="https://file.open.hand-china.com/hsop-doc/doc_classify/0/65db6e3caab6495ea8bc8d48dd85c5c4@image.png" alt="" width="auto" height="auto" />
