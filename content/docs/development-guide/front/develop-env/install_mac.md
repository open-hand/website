+++
title = "开发环境搭建(Mac)"
description = "开发环境搭建(Mac)"
weight = 1
+++

# 开发环境搭建(Mac)

本章节讲述了使用Choerodon 做前端开发所需要的一些软件依赖，以及如何在Mac OS 环境下进行安装使用。

## 开发工具

- Git
- Node.js 8.11.1及以上版本
- python
- PyYAML
- PyMySQL

## 安装提前准备

1. 在[HomeBrew官网](https://brew.sh/)下载或者根据文档安装homebrew。

## Git 安装

1. 在 [Git 官网](https://git-scm.com/download/)下载Mac平台的Git。
2. 运行 `brew install git` 安装git。
3. 安装完成后打开终端后执行 `git --version` ，有提示则说明环境安装成功。

## node 安装

1. 在 [Node.js官网](https://nodejs.org/en/download/)下载用于Mac平台的安装包。
2. 运行 `brew install node` 安装node。
3. 配置完成后打开终端执行 `node --version`，有提示则说明环境安装成功。

## 在Mac上安装python

在项目中,python(2.7.X)用于执行功能性脚本。

1. 在[python 官网](https://www.python.org/downloads/release/python-2712/) 下载2.7版本的python 安装包。
2. 运行`brew install python@2` 安装python。
3. 配置完成后打开 `git bash` 执行 `python`，有提示则说明环境安装成功。
4. 通过`pip` 安装`PyYAML`，`PyMySQL`。打开 `git bash` 执行 `pip install PyYAML PyMySQL`，然后安装完成之后执行`pip list` 查看安装的版本。
