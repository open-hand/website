+++
title = "自动化测试"
description = ""
weight = 4
+++


## 1. 概述

自动化测试的本质是使用一些测试框架开发测试代码，运行测试代码即对已有的业务应用进行相应的测试。对于一个项目来说，测试应用与普通的业务应用应该是同等重要的。

Choerodon平台现在提供了三个测试应用的模板，分别是 mocha+chai，TestNG+Assured，TestNG+Selenium。

这些测试模板都对于helm chart，Dockerfile，gitlabci等进行了加工，并在其中封装了简单的demo代码，例如登录接口测试的简单实现。通过demo代码可以快速上手进行测试代码的开发。

并且为了方便对“测试数据”，“预期结果”这两个测试步骤的字段进行维护，我们对官方提供的可以在测试报告中加注释的方法进行了封装并进行数据提取，可以满足步骤信息的维护需求。

![image](/docs/user-guide/test/automation/image/AutoTest-01.png)

## 2. 什么是自动化测试

了解什么是自动化测试以及为什么要做自动化测试。

详情请查看<span style="color:#7cafc2">什么是自动化测试</span>。

## 3. 如何执行自动化测试

了解如何执行自动化测试以及如何查看测试结果。

自动化测试功能的使用方法详情请查看<span style="color:#7cafc2">如何执行自动化测试</span>。