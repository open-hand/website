+++
title = "应用管理"
description = "应用管理部分包括了应用管理、应用版本、应用发布和应用市场，能进行项目内应用的开发，版本管理，公开和应用市场内应用的部署以及导入导出"
weight = 4
icon = "icon-application-market"
+++

## 使用 Choerodon 应用管理

欢迎使用 Choerodon 猪齿鱼应用管理用户手册，如果您是项目成员和项目管理员，这些文档将对您有用。本节将围绕应用管理各个功能的使用进行详细的介绍，包括 **应用管理**、**应用模板**、**应用版本**、**应用发布**、**应用市场**，将涵盖您使用Choerodon猪齿鱼应用管理过程中所有可能进行的操作。

应用管理服务能进行项目内应用及应用版本管理，公开和应用市场内应用的部署以及导入导出。

## 快速开始

 - 如果您是第一次使用接触Choerodon应用管理，在学习阅读本章节之前，请阅读[快速入门手册](../../quick-start/agile/)。
 - 如果您对Choerodon应用管理已经非常熟悉，请使用文档搜索功能，查找您需要了解的内容。

## 前置条件

 - Choerodon的应用管理是基于整体项目的，在使用Choerodon应用管理之前，需要先了解和学习[Choerodon的项目管理](../../quick-start/project)。
 - 系统用户必须具有`项目所有者`，或者`项目成员`角色，才能是使用应用管理服务。所以，在使用应用管理之前，您需要为您的用户分配`项目所有者`，或者`项目成员`角色。关于权限管理，请参阅[项目角色分配](.././system-configuration/project/role-assignment/)。

## 权限说明

1. `项目所有者` 拥有以下权限：

    模块|操作
    |---|---|
    应用管理|查看列表，查看仓库地址，修改，停用，启用
    应用版本|查看列表，查看阶段详情
    应用发布|查看列表，修改，版本控制，发布
    应用市场|查看列表，查看阶段详情

2. `项目成员`拥有以下权限：

    模块|操作
    |---|---|
    应用管理|查看列表，查看阶段详情
    应用版本|查看列表，查看阶段详情
    应用发布|查看列表，查看阶段详情
    应用市场|查看列表，查看阶段详情

3. `部署管理员`拥有以下权限：

    模块|操作
    |---|---|
    应用管理|查看列表，查看阶段详情
    应用版本|查看列表，查看阶段详情
    应用市场|查看列表，管理应用市场

## 视频介绍

<div class="tutorial-img" id="tutorial-img">
    <div class="col-lg-6 col-md-6 col-xs-12 tutorial">
        <div class="tutorial-content" data-src="d0735n2dplx">
            <div class="mask">
                <div class="head">
                    <div class="title ellipsis">应用发布</div>
                    <a href="https://v.qq.com/x/page/d0735n2dplx.html" target="_blank"><i class="iconfont icon-shijian" title="稍后观看"></i></a>
                </div>
                <div class="foot">
                    <div class="description">以发布并部署应用的示例来介绍持续交付中应用发布的使用方法</div>
                    <div class="info">
                        <div class="begin">
                            <i class="iconfont icon-play-button"></i>
                            <div class="no-warp">开始</div>
                        </div>
                        <div class="time">3min</div>
                    </div>
                </div>
            </div>
            <img class="n-max " src="/docs/quick-start/video-tutorial/img/market.jpg">
        </div>
    </div>
</div>
<div class="tutorial-video" id="tutorial-video">
    <div class="bg"></div>
    <iframe frameborder="0" src='' allowfullscreen="true" quality="high"></iframe>
    <div class="iconfont icon-guanbi"></div>
</div>

{{< docdir >}}
