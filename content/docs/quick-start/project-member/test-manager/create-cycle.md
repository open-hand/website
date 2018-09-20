+++
title = "创建测试循环"
weight = 2
description = "介绍如何快速创建测试循环"
+++

## 创建一个测试循环
---

## 概述

测试用例功能能够帮助测试管理模块的使用者按照版本规划测试计划，有条理的将测试归类、执行。

## 目标

本页面主要介绍 Choerodon 的测试管理中的测试循环部分，介绍如何创建测试循环。

## 前置条件

**1.** 在操作之前保证系统配置已经配置完全。

**2.** 用户必须拥有目标项目的`项目成员`或`项目所有者`的权限。

**3.** 测试循环的创建是基于敏捷管理的版本，所以您必须先在敏捷管理中[创建对应的版本](../../../../user-guide/agile/release/release-version/)。

## 创建一个测试循环

1. 在`测试循环`界面点击 ![](/img/docs/user-guide/test-management/case-management/add-cycle-button.jpg) 按钮。
2. 选择上一步创建的版本（必填）、输入名称（必填）、开始日期（可选）、结束日期（可选）。

    - 例如

        版本：0.1.0

        名称：功能测试循环

3. 点击`确定`即可创建一个新的测试循环。
4. 循环创建后，可在`测试循环`界面左侧树状图中查看。

![](/img/docs/quick-start/project-member/test-manager/create-test-cycle/test-cycle-3.png)

## 添加测试用例到测试循环中

1. 先在左侧树状图中选择目标循环，然后点击右侧循环详情页面的`添加执行`按钮。
2. 选择从`问题添加`，选择之前创建的测试用例 `自我介绍模块测试用例`。
3. 点击`确定`即可将之前创建的测试用例添加到目标循环中。
4. 添加执行后，可在`测试循环`页面对应的循环详情中看到对应的记录。

![](/img/docs/quick-start/project-member/test-manager/create-test-cycle/test-cycle-4.png)

## 执行测试

1. 在`测试循环`页面对应循环的详情页中执行列表里点击对应执行的 ![](/img/docs/user-guide/test-management/case-management/execution-button.jpg) 按钮。
2. 按照`测试详细信息`栏中的测试步骤进行测试，测试完每一步后，点击表格进行步骤详情记录。
3. 若测试通过，则将修改状态为通过。若测试失败，则修改状态为失败，并关联缺陷，添加描述。
4. 测试完所有步骤后，根据测试结果修改`执行状态`，若失败则选择缺陷。
5. 并且可以在`执行记录中`看到执行的信息变更记录。

- **执行测试详细讲解请移步**[查看执行测试详情](../../../../user-guide/test-management/execution-test/execution/)

## 相关文档

- [测试循环](../../../../user-guide/test-management/test-cycle/)