+++
title = "Choerodon 使用的开源组件"
description = ""
weight = 3
+++

### 微服务应用框架使用的开源工具集
---

Choerodon 的微服务应用系统架构由五个不同的层组成，从应用程序代码到所需运行平台和连接服务。这些应用程序和服务通过一致的调度和编排和监督进行管理，所有这些应用程序和服务都运行在K8s提供的运行环境上。

![](/img/docs/concept/system-component.png)

### DevOps平台使用的开源工具集
---

自动化是整个DevOps实现的核心，对应生命周期的每个阶段都可以选择开源工具框架。将DevOps工具集环境作为整体服务交付是一件非常有挑战的事情。Choerodon融合了多个DevOps的开源工具，并且结合自身的能力。DevOps不同阶段的工具使用不同的编程语言开发，需要不同的运行环境(OS、数据库、中间件服务器等)。我们选取了如下的工具集的组合来落地实施DevOps，并且通过Choerodon平台融合能力，将不同的工具融合到Choerodon的DevOps流程中，用户仅需简单的配置即可使用，开始敏捷迭代之旅。

![](/img/docs/concept/devops-opensource-component.png)

