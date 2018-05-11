+++
title = "应用部署"
description = ""
weight = 2
+++


# 应用部署

  提供可视化、一键式部署应用，支持并行部署和流水线无缝集成，实现部署环境标准化和部署过程自动化。
  
  - **菜单层次**：组织层
  - **菜单路径**：持续交付 > 应用部署
  - **默认角色**：部署管理员

### 查看运行中的应用详情

 1. 可在运行中查看正在部署/运行的版本，以及对容器状态进行调整；

 1. 点击`详情`，查看应用部署阶段和详情信息。
 
<blockquote class="note">
         不同应用类型，部署阶段不同。
      </blockquote>

#** 部署应用

 部署应用是将一个版本的应用部署至指定环境的操作。

 部署应用前期，需部署的应用及所操作的环境都是已创建状态，并且能正常运行。

[应用管理](../../../continuos-delivery/assembly-line/application-management)和[环境流水线](../../../continuos-delivery/deploy/environment)可以帮助您梳理前期工作。

- 操作流程

 1. 选择前期所创建的应用；

 1. 选择版本；

 1. 选择环境；（若所选的环境为故障中，则不能完成部署应用操作）

 1. 确认配置信息；

 1. 选择部署模式；部署模式有新建实例和替换实例两种；

 1. 点击 `部署` 按钮，完成部署。

- 部署模式

 - 新建实例：建立新的实例。

 - 替换实例：替换之前所建立的实例。


### 部署实例
通过容器状态、实例、应用、环境的信息来观察应用的部署情况。

 - 查看实例详情
点击页面右侧 ![详情按钮](/docs/user-guide/continuos-delivery/Assembly line/image/详情按钮.png)按钮 ，再点击`查看实例详情`，进入实例详情后观察其运行详情和部署详情。

 - 修改配置信息
点击页面右侧 ![详情按钮](/docs/user-guide/continuos-delivery/Assembly line/image/详情按钮.png)按钮 ，再点击`修改配置信息`，进入修改配置信息界面后对实例配置信息进行修改后重新部署。

 - 停止实例
点击页面右侧 ![详情按钮](/docs/user-guide/continuos-delivery/Assembly line/image/详情按钮.png)按钮 ，再点击`停止实例`，该实例即为停止状态，且容器状态停止。
<blockquote class="note">
         停止实例后，停止实例按钮转变为重启实例按钮。
      </blockquote>

 - 删除实例
点击页面右侧 ![详情按钮](/docs/user-guide/continuos-delivery/Assembly line/image/详情按钮.png) 按钮，再点击`删除实例`，该实例被删除。


### 单环境
通过搜索单个环境名称来观察该环境应用中所部署的情况。

### 单应用
观察单个应用在不同环境下的部署情况。

在单应用界面中，点击页面右侧 ![查看部署应用按钮](/docs/user-guide/continuos-delivery/Assembly line/image/查看部署应用按钮.png) ，对当前选择的条件进行快速部署。

### 多应用
观察所有应用在不同环境下的部署情况。