+++
title = "如何执行自动化测试"
description = ""
weight = 2
+++

# 如何执行自动化测试

## 1. 概述

通过此页面，您将会了解如何执行自动化测试以及如何查看测试结果。


## 2. 执行自动化测试

Choerodon猪齿鱼提供了自动化测试功能，但目前版本支持 mocha + chai 以及 TestNG + Assured 两种API测试框架，后续版本会逐步增加对其他自动化测试框架的支持。执行自动化测试需要如下几个步骤：

### 2. 1 添加测试

![image](/docs/user-guide/test/automation/image/AutoTest-02.png)

在下拉框中选择应用，点击左上方的`添加测试`，点击进入创建测试步骤

### 2. 2 选择测试实例

![image](/docs/user-guide/test/automation/image/AutoTest-03.png)

1. 点击打开应用列表

    此处只能选到测试类型的应用，关于如何创建应用请参考[创建应用](../../../development/application-service/create-app-service)。

2. 点击选择`版本`。

3. 点击选择`环境`。

### 2. 3 修改配置信息

![image](/docs/user-guide/test/automation/image/AutoTest-04.png)

在此编辑框内编辑配置信息，**与默认值不同的配置会被标注高亮**，如果有误，错误部分会红色高亮。

### 2. 4 确认信息并执行

![image](/docs/user-guide/test/automation/image/AutoTest-05.png)

1. 配置测试类型，有两种测试类型可以选择，分别是立即执行和定时执行，如果选择定时执行，则还需要配置`开始时间`、`重复间隔`和`执行次数`等参数

2. 确认应用信息和配置信息无误后点击执行测试。

## 3. 查看测试结果

查看测试结果概要，包括运行状态、环境、执行方、测试框架（目前仅支持mocha）、应用版本、时长、执行时间和执行结果。若运行状态或测试结果长期没有变化，请尝试刷新。

![image](/docs/user-guide/test/automation/image/AutoTest-06.png)

1. 运行结果 有3种，分别是：

    - 等待中
    - 完成
    - 失败

2. 测试结果 有4种，分别是：

    - 未执行
    - 全部通过
    - 部分通过
    - 失败

3. 点击![image](https://minio.choerodon.com.cn/knowledgebase-service/file_0075dbbe627940238b5c67301edb1730_blob.png)标识，有4个选项：

    - 查看日志：可以查看运行该自动化测试的容器的日志，通过日志进行错误定位和状态监控。
    - 重新执行：点击重新执行该测试，该测试的状态变为`等待中`并置顶。
    - 测试循环：点击跳转到测试执行页，查看该测试对应的测试循环。
        <blockquote class="note"> 
        因 `TestNG `框架支持通过配置文件运行多 `Test Suite` 的模式，所以一次自动化执行可能对应多个测试循环。
        </blockquote>
    - 测试报告：点击查看测试结果报表

## 4. 阅读更多

- [创建测试用例](../../store/create)
- [创建测试循环](../../plan/create)
- [如何执行测试](../../execution/howto-excute)
