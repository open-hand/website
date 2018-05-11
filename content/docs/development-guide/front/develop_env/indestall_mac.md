+++
title = "软件安装(Mac)"
description = "软件安装(Mac)"
weight = 1
+++

# Mac下软件安装

## 开发工具

- Git
- Node.js 8.11.1及以上版本
- python

## 安装提前准备

1. 在[HomeBrew官网](https://brew.sh/)下载或者根据文档安装homebrew。

## Git 安装

1. 在 [Git 官网](https://git-scm.com/download/)下载Mac平台的Git。
2. 运行 `brew install git` 安装git。
3. 安装完成后打开终端后执行 `git --version` ，有提示则说明环境安装成功。

## node 安装

1. 在 [Node.js官网](https://nodejs.org/en/download/)下载用于Mac平台的安装包。
2. 运行 `brew install node` 安装node。
3. 配置完成后打开终端执行 `node --version`，有提示则说明环境安装成功。

## 在Macn上安装python

在项目中,python(2.7.X)用于执行功能性脚本。

1. 在[python 官网](https:/www.python.org/downloads/release/python-2712/) 下载2.7版本的python 安装包。
2. 运行`brew install python@2` 安装python。
3. 配置完成后打开 git bash 执行 `python`，有提示则说明环境安装成功。


## 克隆代码

可以新建一个 `choerodon-cloud-front` 的目录，进入到该目录下，在终端执行

```
git clone -b release-1.2.0 https://xxxx@rdc.hand-china.com/gitlab/HAPCloud/HAPCloudFront.git --recursive
```

其中 `xxxx` 是你的工号。

(确保克隆之前设置了 `git config --global user.name git config --global user.email` )

- [git submodule 子模块操作](https:/git-scm.com/book/zh/v1/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)
- [git config 配置操作](https:/git-scm.com/book/zh/v1/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-%E9%85%8D%E7%BD%AE-Git)
