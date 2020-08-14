+++
title = "代码质量"
description = ""
weight = 6
+++

# 代码质量

## 1. 概述

代码质量页面用于直观地展示某个应用服务的代码通过SonarQube检测后的结果详情。以便您实时了解应用服务中代码的健康程度。

<blockquote class="note">
若所选应用服务未曾使用SonarQube进行代码质量的检测，则没有相关的代码质量详情。
</blockquote>
添加代码质量检查请参考[Choerodon应用关联SonarQube项目](../../../../installation-configuration/steps/install/parts/base/sonarqube)。

![image](/docs/user-guide/development/code-manage/image/code-management-10.png)

## 2. 查看代码质量的可靠性

![image](/docs/user-guide/development/code-manage/image/code-management-11.png)

* 查看代码中Bug的数量与评级；若想查看代码中Bug的详情，点击Bug的数量即可。而点击其中的图表图标则会直接跳转至代码质量图。

    - Bug对代码可靠性评级的影响
    - A = 0 Bug （没有Bug时，评估为最高级别A）
    - B = at least 1 Minor Bug （只要包含一个次要漏洞，评估为B）
    - C = at least 1 Major Bug （只要包含一个重要漏洞，评估为C）
    - D = at least 1 Critical Bug （只要包含一个严重漏洞，评估为D）
    - E = at least 1 Blocker Bug （只要包含一个阻断漏洞，评估为最低级别E）

* 查看代码中安全漏洞的数量与评级；若想查看安全漏洞的详情，点击其数量即可。而点击其中的图表图标则会直接跳转至代码质量图。

    - 安全漏洞对代码安全度评级的影响
    - A = 0 Vulnerability （没有漏洞时，评估为最高级别A）
    - B = at least 1 Minor Vulnerability （只要包含一个次要漏洞，评估为B）
    - C = at least 1 Major Vulnerability （只要包含一个重要漏洞，评估为C）
    - D = at least 1 Critical Vulnerability （只要包含一个严重漏洞，评估为D）
    - E = at least 1 Blocker Vulnerability （只要包含一个阻断漏洞，评估为最低级别E）

* 查看最近一次检测后的新增Bug与新增安全漏洞的数量。

## 3. 查看代码质量的可维护性

![image](/docs/user-guide/development/code-manage/image/code-management-12.png)

* 查看技术债务；点击技术债务对应的具体时间，即可查看详情。
* 查看代码异味；点击代码异味的具体数量，即可查看详情；而点击其中的图表图标则会直接跳转至代码质量图。
* 查看最近一次检测后新增的技术债务与新增代码异味。

## 4. 查看代码的覆盖率

![image](/docs/user-guide/development/code-manage/image/code-management-13.png)

* 查看技术债务；点击技术债务对应的具体时间，即可查看详情。
* 查看代码异味；点击代码异味的具体数量，即可查看详情；而点击其中的图表图标则会直接跳转至代码质量图。
* 查看最近一次检测后新增的技术债务与新增代码异味。

## 5. 查看个应用代码的重复度

![image](/docs/user-guide/development/code-manage/image/code-management-14.png)

* 查看此应用代码的重复率。
* 查看此应用代码的重复行数。
* 查看最近一次检测后新增代码部分的重复率。

## 6. 阅读更多

* [代码仓库](../../code-manage/repository)
* [分支管理](../manage-branch)
* [标记管理](../sign)


