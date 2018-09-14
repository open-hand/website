+++
title = "敏捷管理"
description = "对敏捷管理各个功能的使用进行详细的介绍，包括问题管理、待办事项、版本发布、活跃冲刺、模块管理等"
weight = 3
+++

## 使用 Choerodon 敏捷管理

欢迎使用 Choerodon 猪齿鱼敏捷管理用户手册，如果您是项目成员和项目管理员，这些文档将对您有用。本节将围绕敏捷管理各个功能的使用进行详细的介绍，包括**问题管理**、**待办事项**、**发布版本**、**活跃冲刺**、**模块管理**、**报告**，将涵盖您使用Choerodon猪齿鱼敏捷管理过程中所有可能进行的操作。

敏捷管理服务主要用来管理项目的 **需求**、**计划**和 **执行**，以下将围绕敏捷的Scrum模型，阐述如何使用Choerodon的敏捷管理来管理项目。

![](/docs/user-guide/agile/imge/scrum.png "scrum")

- 产品经理或者PO可以使用**问题管理**来管理需求，将**问题管理**视作**Product Backlog**，也可以使用**模块管理**对需求进行分类。
- **待办事项**是优先级比较高的需求，例如，业务系统用户的关键需求，评审会中反馈的比较紧急的问题，或者是已经发布的版本中的缺陷和功能使用反馈等。
- 产品经理或者PO可以通过**发布版本**制定产品发布计划。
- 在冲刺的计划会议中，产品经理或者PO根据产品发布计划和功能优先级，决定冲刺的需求范围，即 **Sprint Backlog**，并且结合开发团队一起制定明细的冲刺计划，例如任务拆分，任务工时和故事点评估等，并最终确定一个 **活动冲刺**。
- 在冲刺执行过程中，开发团队可以使用 **活动冲刺**的 **看板**功能，可视化整个开发过程。
- 在冲刺评审会中，需求方、Scrum团队和其他利益相关人员，根据计划会议的结果，对系统功能进行逐个评审，此时可以结合 **活动冲刺**的 **看板**。在评审会议中，需求方等提出各种反馈问题，可以记录在 **问题管理**或者 **待办事项**中。


<blockquote class="note">
    除了敏捷的Scrum模型，用户也可以根据自身项目管理的特点和实际情况，灵活地使用Choerodon的敏捷管理服务。
</blockquote>

## 快速开始

 - 如果您是第一次使用接触Choerodon敏捷管理，在学习阅读本章节之前，请阅读[快速入门手册](../../quick-start/)或观看对应[视频教程](../../quick-start/video-tutorial/)。
 - 如果您对Choerodon敏捷管理已经非常熟悉，请使用文档搜索功能，查找您需要了解的内容。

## 前置条件

 - Choerodon的敏捷管理是基于项目的，在使用Choerodon敏捷管理之前，需要先了解和学习[Choerodon的项目管理](../../quick-start/admin/project)。
 - 系统用户必须具有`项目所有者`，或者`项目成员`角色，才能是使用敏捷管理服务。所以，在使用敏捷管理之前，您需要为您的用户分配`项目所有者`，或者`项目成员`角色。关于权限管理，请参阅[项目角色分配](.././system-configuration/project/role-assignment/)。
 - 本文档中不包含敏捷理论等相关知识,如果要深入的了解敏捷相关的知识，您可以阅读相关的书籍，或参加相关的培训。

## 权限了解
1. `项目所有者`拥有以下额外的权限：

    模块|操作
    |---|---|
    版本|创建、发布、归档、删除、编辑version以及版本合并
    状态配置|包括创建、编辑、删除status、不能移除status
    模块|创建、编辑、删除模块。
    项目配置|项目配置
    问题链接|创建、编辑、删除问题链接。
    看板|删除看板
    问题|删除问题（issue）
1. `普通成员`拥有剩余的其他权限

以下将围绕敏捷管理各个功能的使用进行详细的介绍，包括 **待办事项**、**活动冲刺**、**问题管理**、**发布版本**、**模块管理**、**报告**。

## 视频介绍

<div class="tutorial-img" id="tutorial-img">
    <div class="col-lg-4 col-md-4 col-xs-12 tutorial" data-src="h07358jaa5q">
        <div class="tutorial-head" style="background: url(/img/docs/quick-start/video/agile.svg)no-repeat center 100%;    background-size: cover;">
            <div class="title">敏捷管理</div>
            <div class="time">
                <div class="content">
                    <i class="iconfont icon-play-button"></i>
                    <div>22分43秒</div>
                </div>
            </div>
        </div>
        <div class="tutorial-footer">
            <div class="content">
                <div class="title">敏捷管理</div>
                <div class="description">围绕敏捷的Scrum模型，阐述如何使用Choerodon的敏捷管理来管理项目。</div>
            </div>
        </div>
    </div>
</div>
<div class="tutorial-video" id="tutorial-video">
    <div class="bg"></div>
    <iframe frameborder="0" src='' allowfullscreen="true" quality="high"></iframe>
    <div class="iconfont icon-guanbi"></div>
</div>

{{< docdir >}}

