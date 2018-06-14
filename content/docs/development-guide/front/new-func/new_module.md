+++
title = "开发新模块"
description = "开发新模块"
weight = 1
+++

## 介绍

本章节讲述了如何使用Choerodon 和React 开发一个全新的模块。

## 开发新模块

1、在本地创建新模块的文件夹。
``` bash
$ mkdir -p choerodon-front-demo/demo/src/app/demo/containers
```

2、在文件夹下创建`config.js`，`webpack.config.js`，并修改。
``` bash
$ cd choerodon-front-demo
$ touch config.js
$ touch webpack.config.js
```

``` js
// config.js
const config = {
  local: true, //是否为本地开发
  clientId: 'localhost', // 必须填入响应的客户端（本地开发）
  titlename: 'Demo', //项目页面的title名称
  // favicon: 'favicon.ico', //项目页面的icon图片名称
  theme: {
    'primary-color': '#3F51B5',
  },
  cookieServer: '', // 子域名token共享
  server: 'http://localhost:8080', // 后端接口服务器地址
  port: 9090 // 端口
};

module.exports = config;
```

``` js
// webpack.config.js
const webpack = require('./boot/node_modules/webpack');

module.exports = function (config) {
  return config;
};
```

3、在子文件夹下创建`package.json`文件，并修改。
``` bash
$ cd demo
$ touch package.json
```

``` json
{
  "name": "choerodon-front-demo",
  "version": "1.0.0",
  "description": "",
  "main": "src/app/demo/containers/DEMOIndex.js",
  "scripts": {
    "start": "choerodon-front-boot start --config ../config.js",
    "build": "choerodon-front-boot build --config ../config.js"
  },
  "contributors": [
    "choerodon"
  ],
  "license": "ISC",
  "dependencies": {
    "choerodon-front-boot": "^0.6.1"
  }
}
```

4、创建`Index`文件，文件名为模块名大写+`Index`。
``` bash
$ touch src/app/demo/containers/DEMOIndex.js
```

``` js
// DEMOIndex.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { inject } from 'mobx-react';
import { asyncLocaleProvider, asyncRouter, nomatch } from 'choerodon-front-boot';

@inject('AppState')
class DEMOIndex extends React.Component {
    render() {
        const { match, AppState } = this.props;
        return (
            <Switch>
                <Route path={'*'} component={nomatch} />
            </Switch>
        );
    }
}

export default DEMOIndex;
```

5、在`package.json` 同级的目录下，安装并启动。
``` bash
$ npm install
$ npm start
```

6、查看效果

在浏览器中键入 `localhost:9090`，查看页面效果。