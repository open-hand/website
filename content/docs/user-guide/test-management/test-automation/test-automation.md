+++
title = "自动化测试"
weight = 1
description = "本节介绍了自动化测试功能的使用方法"
+++

## 执行自动化测试

我们提供了自动化测试功能，但目前版本仅支持`mocha`框架，后续版本会逐步增加对其他自动化测试框架的支持。执行自动化测试需要如下几个步骤：

### 点击新建测试

<img src="/img/docs/user-guide/test-management/test-automation/create-automation-test-1.png" width="550"/>

1. 点击此处`选择应用`
2. 点击进入`创建测试`步骤

### 选择测试实例

<img src="/img/docs/user-guide/test-management/test-automation/create-automation-test-2.png" width="450"/>
<img src="/img/docs/user-guide/test-management/test-automation/create-automation-test-3.png" width="700"/>

3. 点击`打开应用列表`

    <blockquote class="note">
    此处只能选到测试类型的应用，关于如何创建应用请参考[创建应用](../../application-management/application/)
    </blockquote class="note">

4. 点击选择`应用名称`
5. 点击选择`应用版本`
6. 点击`确定`
7. 点击选择`版本`
8. 点击选择`环境`
9. 点击`下一步`

### 修改配置信息

<img src="/img/docs/user-guide/test-management/test-automation/create-automation-test-4.png" width="430"/>

1. 在此编辑框内编辑配置信息，**与默认值不同的配置会被标注高亮**，如果有误，错误部分会红色高亮
2. 点击`下一步`

### 确认信息并执行

1. 配置测试类型，有两种测试类型可以选择，分别是`立即执行`和`定时执行`，如果选择`定时执行`，则还需要配置如下参数：

    <img src="/img/docs/user-guide/test-management/test-automation/create-automation-test-6.png" width="550"/>


    其中，`开始时间`、`重复间隔`和`执行次数`必填

2. 确认`应用信息`和`配置信息`无误
3. 点击`执行测试`

## 查看测试结果

<img src="/img/docs/user-guide/test-management/test-automation/automation-test-result-1.png"/>

1. 查看测试结果概要，包括`运行状态`、`环境`、`执行方`、`测试框架`（目前仅支持`mocha`）、`应用版本`、`时长`、`执行时间`和`执行结果`。若`运行状态`或`测试结果`长期没有变化，请尝试刷新。

2. `运行结果` 有3种，分别是：

    * `等待中`
    * `完成`
    * `失败`

3. `测试结果` 有4种，分别是：

    * `未执行`
    * `全部通过`
    * `部分通过`
    * `失败`

4. 点击下拉菜单，有4个选项：

    <img src="/img/docs/user-guide/test-management/test-automation/automation-test-result-2.png" width="250"/>


    * `查看日志`：可以查看运行该自动化测试的容器的日志，通过日志进行错误定位和状态监控

        <img src="/img/docs/user-guide/test-management/test-automation/automation-test-result-3.png" width=""/>

    * `重新执行`：点击重新执行该测试，该测试的状态变为`等待中`并置顶

    * `测试循环`：点击跳转到测试执行页，查看该测试对应的测试循环

    * `测试报告`：点击查看测试结果报表

### 测试报告

<img src="/img/docs/user-guide/test-management/test-automation/automation-test-result-5.png" width="450"/>


1. 测试用例通过与未通过数量比例统计（饼状图）
2. 本次自动化测试运行详情数据

<img src="/img/docs/user-guide/test-management/test-automation/automation-test-result-6.png" width="600"/>


3. 测试用例测试时长统计（柱状图），鼠标悬停在某一用例上可以显示该用例的名称和时长
4. 拖动滑块，可以调整柱状图的X轴长度，在用例数量很多时，可以通过调节X轴长度，只关注部分用例的执行情况
5. 显示用例执行详情，包括`用例名称`、`执行状态`和`用时`