+++
title = "文档贡献"
description = "详细描述了文档贡献需要了解的规则"
weight = 2
+++

如果您想帮助贡献Choerodon文档或网站，我们很乐意为您提供帮助！任何人都可以贡献，无论您是刚接触项目还是已经使用Choerodon很长时间，无论是自我认同的开发人员、最终用户，还是那些无法忍受错别字的人，都可以对文档或者网站进行贡献。

## 前置条件

- 熟悉[用户指南](../../user-guide)和[开发手册](../../development-guide)
- 熟悉[GitHub 协同开发流程](https://help.github.com/categories/collaborating-with-issues-and-pull-requests/)
- 熟练掌握markdown
- 熟悉[Hugo](https://gohugo.io/)

## 文档基础知识

Choerodon文档使用Markdown编写，并使用Hugo进行处理和部署。

源代码位于[Github](https://github.com/choerodon/website) 大多数文档源都存储在`/content/docs/`

您可以从Github网站上提交问题，编辑内容和查看其他人的更改。


## 风格指南

1. 专有名词英文首字母大写

1. 不要出现大面积文字，应文字，图片，注意事项，表格，列表均匀排布，提高阅读效率

1. 对用户界面元素使用粗体

1. 将读者称为”您“

1. 避免使用”我们“

    在句子中使用“我们”可能会令人困惑，因为读者可能不知道他们是否是您所描述的“我们”的一部分。


## 页面模板

页面模板位于主题中的 `layouts/partials/` 目录中。

## Hogo 短代码

1. 子目录缩略

    需要在当前文档页中显示子目录连接及其简介时使用`{{</* docdir */>}}`

    目录结构：

    ``` bash
    ├── parent
    |   ├── _index.md
    │   ├── one-child.md
    │   ├── two-child.md
    ```

    举例如下：
    ```
    {{</* docdir */>}}
    ```

    最终显示：

    ## 功能

    - [第一个孩子](./#) 第一个孩子的描述
    - [第二个孩子](./#) 第二个孩子的描述

1. 注释

    需要在代码块中添加注释时，可以使用`{{</* annotation */>}}`短代码。

    举例如下：

    ```
    {{</* annotation shell "[mysql pod name]Replace it with the name of the container you want to enter" */>}}
    kubectl get po -n choerodon-devops-prod
    kubectl exec -it [mysql pod name] -n choerodon-devops-prod bash (1)
    mysql -uroot -p${MYSQL_ROOT_PASSWORD}
    {{</* /annotation */>}}
    ```

    最终显示：

    {{< annotation shell "[mysql pod name]Replace it with the name of the container you want to enter">}}
    kubectl get po -n choerodon-devops-prod
    kubectl exec -it [mysql pod name] -n choerodon-devops-prod bash (1)
    mysql -uroot -p${MYSQL_ROOT_PASSWORD}
    {{< /annotation >}}

1. 注意及警告

    对于HTML文档中的注意及警告，请使用`{{</* note */>}}`和`{{</* warning */>}}`标记。

    举例如下：

    ```
    {{</* warning */>}}Beware.{{</* /warning */>}}
    ```

    最终显示：

    {{< warning >}}Beware.
    {{< /warning >}}

1. 表格样式

    表格需要设置列不换行时，使用`{{</* table */>}}`短代码

    举例如下：

    设置`角色`和`层级`列不换行

    ```markdown
    {{</* table  0 2 */>}}
    角色 | 权限 | 层级
    --- | --- | ---
    项目所有者 | 项目角色分配、项目信息、应用管理、分支管理、持续集成、应用版本、应用发布、应用市场（仅查看）、环境流水线（仅查看）、应用部署（仅查看）、网络管理（仅查看）、域名管理（仅查看）、容器管理 | 项目层
    项目成员 | 应用管理（仅查看）、分支管理（仅有developer权限）、持续集成、应用版本、应用发布（仅查看）、应用市场（仅查看）、环境流水线（仅查看）、应用部署（仅查看）、网络管理（仅查看）、域名管理（仅查看）、容器管理 | 项目层
    部署管理员 | 应用市场、环境流水线、应用部署、网络管理、域名管理、容器管理| 项目层
    {{</* /table */>}}
    ```

    最终显示：
    {{< table  0 2>}}
    角色 | 权限 | 层级
    --- | --- | ---
    项目所有者 | 项目角色分配、项目信息、应用管理、分支管理、持续集成、应用版本、应用发布、应用市场（仅查看）、环境流水线（仅查看）、应用部署（仅查看）、网络管理（仅查看）、域名管理（仅查看）、容器管理 | 项目层
    项目成员 | 应用管理（仅查看）、分支管理（仅有developer权限）、持续集成、应用版本、应用发布（仅查看）、应用市场（仅查看）、环境流水线（仅查看）、应用部署（仅查看）、网络管理（仅查看）、域名管理（仅查看）、容器管理 | 项目层
    部署管理员 | 应用市场、环境流水线、应用部署、网络管理、域名管理、容器管理| 项目层{{< /table >}}

## 提出具体可查找的问题

任何拥有Github帐户的人都可以针对Choerodon文档提出问题（错误报告）。如果您发现错误，即使您不知道如何修复它，也应提出问题。

### 如何提出问题

1. 附加出现问题的文档链接。
1. 详细描述问题。
1. 描述问题对用户造成的困扰。
1. 提出建议修复的方式

## 提交案例

案例研究强调了组织如何使用Choerodon解决实际问题。它们与Choerodon运营团队合作编写。

看看[现有案例研究](https://github.com/choerodon/website/tree/master/content/case-studies)的来源 。

扫描下方二维码通过微信公众号联系运营团队，协商您的案例提交。

<img src="/img/footer/wechat-code.jpg" style="width:150px;height:150px">
