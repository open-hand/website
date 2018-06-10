+++
title = "开发新模块"
description = "开发新模块"
weight = 1
+++

## 介绍

本章节讲述了如何使用Choerodon 和React 开发一个全新的模块。

## 开发新模块

1、在本地新建一个文件夹，然后将`choerodon-front-boot` clone到本地，并执行`npm install`。
```bash
$ mkdir choerodn-front-demo
$ cd choerodon-front-demo
$ git clone https://github.com/choerodon/choerodon-front-boot boot
$ cd boot
$ npm install
```

2、创建新的模块文件夹，并且创建`favicon.ico`, `config.js` 和 `webpack.config.js`文件。
```bash
$ cd ..
$ mkdir demo
$ touch favicon.ico
$ touch config.js
$ touch webpack.config.js
```

3、修改`config.js` 文件，添加如下内容。
``` js
const config = {
  local: true, //是否为本地开发
  clientId: 'localhost', // 必须填入响应的客户端（本地开发）
  titlename: 'Demo', //项目页面的title名称
  favicon: 'favicon.ico', //项目页面的icon图片名称
  theme: true, //是否开启主题色设定
  mainCss: JSON.stringify('boot'), //master选择哪个项目的主题
  Masters: JSON.stringify('boot'), //master选择哪个项目模块
  Home: JSON.stringify('demo'), //Home选择哪个项目模块
  themeSetting: {
    antdTheme: {
      'primary-color': '#3F51B5', //antd的主题颜色设定
    },
    header: '#3F51B5', //头部主题颜色设定
    // header: 'rgb(59,120,231)', //头部主题颜色设定
    backgroundColor: 'white', //背景色主题颜色设定
  },
  cookieServer: '', //子域名token共享
  server: 'http://api.choerodon.com.cn', //api gateway地址
  webpackConfig: '', //webpack扩展配置，当未设定时默认为webpack.config.js
};

module.exports = config;
```

4、修改`webpack.config.js` 文件，添加如下内容。
```js
const webpack = require('./boot/node_modules/webpack');

module.exports = function (config) {
  return config;
};
```

5、进入到 `boot` 的目录下, 运行 `npm run gulp` , 之后新开一个窗口，运行 `npm run dev` 启动项目, 在 `localhost:9090/#/demo` 便可以查看页面。
```bash
$ cd boot
$ npm run gulp
```

* 在继续开发新页面，请查看[开发新页面](../new_page/)文档

* 如果开发模块需要其他的第三方安装包,可以直接在当前模块添加安装。