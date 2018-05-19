+++
title = "持续集成"
description = ""
weight = 4
+++

# 持续集成

持续集成是 Gitlab 自带的持续集成引擎，免去了第三方 CI 服务器只能定时检测 Git 仓库带来的延迟和对 Git Server 造成的性能压力。

  - **菜单层次**：项目层
  - **菜单路径**：持续交付 >  开发流水线 > 持续集成
  - **默认角色**：项目所有者、项目成员

### 查看持续集成详情

 1. 进入持续交付后，点击 `持续集成` 页签；

 1. 查看应用持续集成的完成情况；

 1. 查看应用持续集成的完成情况，只有 CI 各个阶段跑成功了才会生成一个应用版本。

    <blockquote class="note">
         版本命名方式：合并至 develop：develop. + 年月日时分秒。
      </blockquote>

 - Tag 生成：版本号（三位号码，如：1.1.0。release 修改前两位，hotfix 修改第三位）。
 - 提交：每次提交代码的操作，自动生成 Commit ID，由于字数多，平时多取前八位。
      
列表字段：

 - 状态：Job 的状态 Created，Pending，Running，Failed，Success，Canceled，Skipped，Manual。
 - 标识：持续集成标识+持续集成触发者。
 - 提交：提交的信息。
 - 阶段：持续集成的阶段,分为单元测试和生成镜像两个阶段。单元测试阶段完成单元测试的运行并且对代码质量进行审查，生成镜像阶段通过 docker 把应用生成镜像。
 - 时长：持续集成持续的时长。
 - 创建时间：持续集成创建的时间。
 - ![重置按钮](/docs/user-guide/Assembly line/image/重置按钮.png) ：当处于 Skipped、Canceled、Failed 状态时，可以重新运行 CI。