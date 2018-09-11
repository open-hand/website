+++
title = "分支管理"
description = "您将了解到如何针对某一问题建立对应分支并进行管理。"
weight = 4
+++

# 分支管理

您可以针对某一问题建立对应分支并对其进行管理。

使用 GitLab 进行分支管理，默认分支为 master，您可以在产品开发过程中对 Feature、Bugfix、Release、Hotfix 等分支进行管理。所有的提交将触发持续集成，可在持续集成菜单下查看代码集成情况。

更多关于开发分支的介绍，请查看[**开发流水线分支管理**](../../../development-pipeline)

![enter description here](/docs/user-guide/agile/imge/manage-branch.png)

1. 点击此处创建分支
2. 点击`提交`进入关联分支页面
3. 点击`合并请求`进入关联合并请求页面

## 创建分支

通过选择应用、分支来源，修改分支类型及分支名称，即可为该问题创建关联的分支。

点击创建分支，可看到分支创建界面

![enter description here](/docs/user-guide/agile/imge/create-branch.png )

1. `应用名称`：选择项目下的应用 
2. `分支来源`：选择一个项目下已有的分支，新建的分支将依据此来源分支创建。
3. `分支类型`：选择要创建的分支类型，如：
    - `feature`：功能分支
    - `bugfix`：修补 Bug 分支
    - `release`：预发布分支
    - `hotfix`：热修复分支
    - `custom`：用户自定义分支
4. `分支名称`：用户自定义分支名称
     创建成功后，在页面下方展示关联分支的提交总数，如0提交，以及更新情况以及更新时间等。
     （有链接就加链接跳转到devops）

## 关联分支

展示该问题关联的所有分支、提交及合并请求状态，及为某分支创建合并请求。

单击问题页面下方的`提交`跳转到关联分支页面，您可以看到如下信息：

- `应用名称`：选择项目下的应用 
- `分支`：关联的分支名称
- `提交数`:该分支提交次数
- `状态`：分支状态，包括开放，已合并，结束。
- ![enter description here](/docs/user-guide/agile/imge/link-branch.png )`创建合并请求图标`：跳转到gitlab页面的合并请求创建页面，在gitlab上创建合并请求。
    
    跳转到gitlab页面创建合并请求后，在问题详情页面的`创建分支`下将产生一条合并请求数据，包括合并请求数量、状态、更新情况以及更新时间等。点击该合并请求的链接将跳转到[**关联合并请求**](../../../development-pipeline/merge-request)界面。


## 关联合并请求

展示该问题关联的所有合并请求相关信息，及查看合并请求详情。

页面展示信息如下：

- `编码`：合并请求编码
- `名称`：合并请求名称
- `状态`: 当前合并请求状态
- `审查人`: 合并请求最后审核人
- `更新时间`：合并请求最后更新时间
- ![enter description here](/docs/user-guide/agile/imge/merge-request.png )`合并请求图标`：跳转到gitlab界面查看[**合并请求**](../../../development-pipeline/merge-request)界面的详细信息，之后可在gitlab界面上操作。

## 更多操作
- [创建一个问题](../create-issue)
- [了解问题相关概念](../../issue)
- [创建一个看板](../../sprint/create-kanban)