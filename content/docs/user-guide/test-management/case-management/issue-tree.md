+++
title = "测试用例树"
weight = 4
description = "阐述了什么是测试用例树"
+++

# 测试用例树

测试用例树将测试用例进行分类，表明了一个测试用例所处的版本和文件夹。

## 测试用例树的结构

![](/img/docs/user-guide/test-management/issue-tree/tree-shape.png)

1. 版本对应的状态
1. 版本
1. 文件夹
2. 重命名文件夹
2. 删除文件夹


## 查看文件夹对应测试用例

点击对应项将展示内部测试用例。

- 点击所有版本，加载所有测试用例
- 点击版本状态，加载该状态下的版本内的测试用例
- 点击单个版本，加载版本内测试用例
- 点击单个文件夹，加载文件夹内内测试用例

## 测试用例拖动

测试用例可以进行拖动来改变文件夹。
![](/img/docs/user-guide/test-management/issue-tree/issue-drag.png)

1. 当前拖动用例数
3. 目标文件夹
4. 当前拖动状态，包含移动/复制

- 可使用shift或ctrl进行多选

## 更多操作

- [创建测试用例](../create-case)
- [在测试循环中添加执行](../../test-cycle/add-execution)
- [查看测试报告](../../test-report/)