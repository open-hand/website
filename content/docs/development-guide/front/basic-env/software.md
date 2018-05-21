+++
title = "软件准备"
description = "软件准备"
weight = 1
+++

# 前置条件

在开发之前，要保证环境已经安装正确，详见 [开发环境搭建](../../develop-env/)

## 包管理工具

* npm是Node.js的包管理工具（package manager），可以根据依赖关系，把前端所有依赖的包都下载下来并管理起来。
* npm已经在Node.js安装的时候顺带装好了。
* 提示 `npm` 需要跟上命令。这样确保npm正确安装了，能运行就行。

> - 可以自行安装cnpm 和 yarn 进行包管理控制

## 全局安装 yeoman

* yeoman 是一个通用的脚手架系统允许创建任何类型的应用程序。它允许迅速开始新的项目,简化了维护现有项目。
* 在项目中，yeoman 用于自动生成与boot同级的模块目录和文件。
* 使用 `npm -g install yo` 安装yeoman
* 安装成功后，在终端里运行 `yo --version` 应该可以看到yeoman的相关信息。

## 全局安装 gulp

* Gulp 是一个自动化构建工具,开发者可以使用它在项目开发过程中自动执行常见任务。
* 使用 `npm -g install Gulp` 安装Gulp
* 安装成功后，在终端里运行 `Gulp --version` 应该可以看到Gulp的相关信息。
