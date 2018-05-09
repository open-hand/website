+++
title = "应用部署"
description = ""
weight = 7
+++


# 应用部署

  提供可视化、一键式部署服务，支持并行部署和流水线无缝集成，实现部署环境标准化和部署过程自动化。
  
  - **菜单层次**：组织层
  - **菜单路径**：持续交付 > 应用部署
  - **默认角色**：部署管理员

### 查看运行中的服务

 1. 可在运行中查看正在部署/运行的版本，以及对容器状态进行调整。

 1. 点击`详情`，查看服务部署阶段和详情信息。
 
<blockquote class="note">
         不同服务类型，部署阶段不同。
      </blockquote>

### 部署实例
通过[容器状态](../continuous-delivery-container-management)、实例、应用、环境的信息来观察应用的部署情况。

 - 查看实例详情
点击页面右侧 ![详情按钮](/docs/user-guide/continuos-delivery/image/详情按钮.png)按钮 ，再点击`查看实例详情`，进入实例详情后观察其运行详情和部署详情。

 - 修改配置信息
点击页面右侧 ![详情按钮](/docs/user-guide/continuos-delivery/image/详情按钮.png)按钮 ，再点击`修改配置信息`，进入修改配置信息界面后对实例配置信息进行修改后重新部署。

 - 停止实例
点击页面右侧 ![详情按钮](/docs/user-guide/continuos-delivery/image/详情按钮.png)按钮 ，再点击`停止实例`，该实例即为停止状态，且容器状态停止。
<blockquote class="note">
         停止实例后，停止实例按钮转变未重启实例按钮。
      </blockquote>

 - 删除实例
点击页面右侧 ![详情按钮](/docs/user-guide/continuos-delivery/image/详情按钮.png) 按钮，再点击`删除实例`，该实例即被删除。


### 单环境
通过搜索单个环境名称来观察该环境应用中所部署的情况。

### 单应用
观察单个应用在不同环境下的部署情况。

在单应用界面中，点击页面右侧 ![查看部署应用按钮](/docs/user-guide/continuos-delivery/image/查看部署应用按钮.png) ，对应用进行重新部署。

### 多应用
观察所有应用在不同环境下的部署情况。