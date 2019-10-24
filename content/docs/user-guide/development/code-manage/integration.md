+++
title = "持续集成"
description = ""
weight = 4
+++

## 1 概述
持续集成是 Gitlab 自带的持续集成引擎，工作原理是将小代码块推送到Git存储库中托管的应用程序[代码库](../../code-manage/repository)，并在每次推送时运行脚本管道，以便在将代码更改合并到主分支之前进行构建，测试和验证代码更改。
![image](/docs/user-guide/development/code-manage/image/code-management-07.png)

### 1.1 持续集成的状态
Choerodon猪齿鱼的持续集成允许您查看单个提交的所有相关作业，并且快速通知您所有作业是否通过或出现故障，使您能快速查看失败并修复它。
状态：Job 的状态 Created，Pending，Running，Failed，Success，Canceled，Skipped，Manual。

### 1.2 持续集成的阶段
持续集成的阶段是在gitlab-ci文件里定义的。例如，可以分为单元测试和生成镜像两个阶段。单元测试阶段完成单元测试的运行并且对代码质量进行审查，生成镜像阶段通过 docker 把应用生成镜像。
当持续集成的每个阶段都Success时，该条流水线的状态才会Success。


## 2 查看持续集成详情
点击进入代码管理，选择需要查看的应用服务，点击持续集成页签进入持续集成详情列表，查看持续集成流水线状态。

  状态：Job 的状态 有Created，Pending，Running，Failed，Success，Canceled，Skipped，Manual。
  标识：持续集成流水线的标识，以及持续集成流水线创建者。 
  提交：最新一次提交的提交编码及提交信息，以及触发的分支。
  阶段：持续集成的阶段是在gitlab-ci文件里定义的。
  时长：完成这条持续集成流水线的总时长。
  创建时间：创建这条持续集成流水线的时间。

## 3 阅读更多
* [代码仓库](../../code-manage/repository)
* [分支管理](../manage-branch)
* [合并请求](../merge-request)
* [标记管理](../sign)
* [代码质量](../code-quality)
