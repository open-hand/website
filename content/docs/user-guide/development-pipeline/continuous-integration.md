+++
title = "持续集成"
description = "是 Gitlab 自带的持续集成引擎，免去了第三方 CI 服务器只能定时检测 git 仓库带来的延迟和对 Git Server 造成的性能压力。能够解决的问题有小步伐的产品迭代，高频率的版本发布，随时随地的系统集成等，达到效率极大增加的作用"
weight = 5
+++

# 持续集成

持续集成是 Gitlab 自带的持续集成引擎，免去了第三方 CI 服务器只能定时检测 Git 仓库带来的延迟和对 Git Server 造成的性能压力。

  - **菜单层次**：项目层
  - **菜单路径**：开发流水线 > 持续集成
  - **默认角色**：项目所有者、项目成员

## 查看持续集成详情

 1. 进入`开发流水线`后，点击 `持续集成` ；

 1. 查看应用持续集成的完成情况；

 1. 查看应用持续集成的完成情况，只有 CI 各个ment阶段跑成功了才会依据[版本生成规则](../branch)生成一个[应用版本](../../application-management/application-version)。

      
列表字段：

 - 状态：Job 的状态 Created，Pending，Running，Failed，Success，Canceled，Skipped，Manual。
 - 标识：持续集成流水线的标识，以及持续集成流水线创建者。
 - 提交：最新一次提交的提交编码及提交信息，以及触发的分支。
 - 阶段：持续集成的阶段是在gitlab-ci文件里定义的。例如，可以分为单元测试和生成镜像两个阶段。单元测试阶段完成单元测试的运行并且对代码质量进行审查，生成镜像阶段通过 docker 把应用生成镜像。
 - 时长：完成这条持续集成流水线的总时长。
 - 创建时间：创建这条持续集成流水线的时间。
 - ![重试按钮](/docs/user-guide/development-pipeline/image/retry_button.png) ：当处于 Skipped、Canceled、Failed 状态时，可以重新运行持续集成流水线。
 - ![取消按钮](/docs/user-guide/development-pipeline/image/cancle_button.png) ：当处于 Pending，Running 状态时，可以取消运行持续集成流水线。 

## 更多操作
- [分支管理](../branch)
- [标记管理](../tag)
- [合并请求](../merge-request)