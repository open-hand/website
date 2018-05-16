+++
title = "项目配置项"
description = "项目配置项"
weight = 3
+++

## 前置条件

在开发新页面之前，要确保已经在本地创建了新的模块。详见 [开发新模块](../new_module/)

## 介绍

本章节介绍了choerodon 的默认配置项，并对配置项进行了说明。

## 新建或覆盖全局配置

在项目根目录右键`git bash here`,输入`yo choerodon:1.3.0`，根据提示,键入各个配置项参数，完成后将会覆盖原有config文件。

## 配置项详解

为了应对不同开发环境和不同项目需求，可以对`choerodon`框架多个配置进行个性化。

配置项文件在项目根目录的`config.js`文件中。看起来是这样的
```
  const config = {
  local: false,
  clientId: 'localhost',
  titlename: 'choerodon-framework',
  favicon: 'a.png',
  theme: true,
  mainCss: JSON.stringify('boot'),
  Masters: JSON.stringify('boot'),
  Home: JSON.stringify('iam'),
  themeSetting: {
    antdTheme: {
      'primary-color': '#3b78e7',
    },
    header: '#3F51B5',
    backgroundColor: 'white',
  },
  server: '',
};

module.exports = config;
```

参数 | 说明
--- | ---
local | 是否本地开发，如果是true，点击本地开发没有的模块菜单，会跳转到404，否则会跳转已发布的线上域名
clientId | 认证成功之后的回调参数，对应后端的回调地址
titlename | 标签页名称
favicon | 标签页图标
theme | 是否开启主题色设定
mainCss | 选择哪个模块的主css文件
Masters | 选择哪个模块的master.js文件作为入口文件
Home | 选择哪个模块的Home.js文件作为Home页
primary-color | antd的主体颜色设定
header | 头部主题色
backgroundColor | 背景色
server | 后端的api host地址