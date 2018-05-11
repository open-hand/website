+++
title = "开发流水线"
description = ""
weight = 1
alwaysopen=false
+++

# 开发流水线

<h2 id="1">介绍</h2>

开发流水线中描述了集成gitlab作为代码托管的仓库，以及采用gitflow分支模型进行一个应用的管理。可以查看应用的所有版本信息、应用编码、应用名称及版本创建时间，描述应用的持续集成流水线信息。

<h2 id="2">功能</h2>

- [**应用模板**](../assembly-line/application-template) 是将同类型应用的代码库结构整理成模板，用于创建应用时能引用相应模板快速创建初始代码库。
- [**应用管理**](../assembly-line/application-management) 一个系统可以被解耦成很多应用。每一个应用都可以独立部署，每一个应用仅关注于完成一部分任务，每部分任务代表一个小的业务模块，因此各应用之间关系是松耦合的。另外，每创建一个应用，系统会自动在gitlab创建好对应的代码库。
- [**分支管理**](../assembly-line/branch-management) 在应用管理中对应用信息的分支管理。
- [**CI流水线**](../assembly-line/assembly-line) 是持续集成的过程，能够解决的问题有小步伐的产品迭代，高频率的版本发布，随时随地的系统集成等，达到效率极大增加的作用。
- [**应用版本**](../assembly-line/service-version) 使得团队内部互相 code review 成为可能。Code review 是在研发阶段消灭软件质量最好的方法，也是促进新手程序员成长的最高效方式。