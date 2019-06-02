+++
title = "新建项目"
date = "2018-04-26T13:44:28+08:00"
draft = false
weight = 1
+++

## 介绍

此Demo项目基于`Choerodon`开发，使用`React`作为开发语言。

本文包括如下几个步骤：

1. 新建Demo项目
2. 新建Demo模块
3. 编写config.js
4. 编写package.json
5. 编写demo入口文件
6. 页面访问

## 新建Demo项目

本地新建一个空的项目`choerodon-todo-service`。

``` bash
$ mkdir -p choerodon-todo-service
$ cd choerodon-todo-service
```

## 新建Demo模块

创建新模块的文件夹

``` bash
$ mkdir -p react/src/app/demo/containers
```

## 编写config.js

在react文件夹下创建`config.js`

``` bash
$ cd react
$ touch config.js
```

```js
// config.js
const config = {
  local: true, //是否为本地开发
  server: 'http://api.staging.saas.hand-china.com', // 后端接口服务器地址
  master: '@choerodon/master',
  projectType: 'choerodon',
  buildType: 'single',
  dashboard: {},
};

module.exports = config;
```

## 编写package.json

在项目根目录下创建package.json

``` bash
$ cd ..
$ npm init
```

``` json
// package.json
{
  "name": "@choerodon/demo",  // name为模块名（可以增加@choerodon scope）
  "routeName": "demo",  // routeName为路由前缀（如空，取name为路由前缀）
  "version": "1.0.0",
  "description": "",
  "main": "./react/src/app/demo/containers/DEMOIndex.js",  // main为入口index的路径（如空，当前模块不会被编译进去，一般只有总前端类型不设置）
  "scripts": {
    "start": "choerodon-front-boot start --config ./react/config.js",
    "dist": "choerodon-front-boot dist --config ./react/config.js",
    "lint-staged": "lint-staged",
    "lint-staged:es": "eslint",
    "compile": "gulp compile"
  },
  "contributors": [
    "choerodon"
  ],
  "license": "ISC",
  "dependencies": {
    "@choerodon/boot": "0.17.x",
    "@choerodon/master": "0.17.x"  // 表示进入页面后的部分，菜单、header和AutoRouter等，可自己配置
  },
  "files": [
    "lib"
  ],
  "lint-staged": {
    "react/**/*.{js,jsx}": [
      "npm run lint-staged:es"
    ],
    "react/**/*.scss": "stylelint --syntax scss"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "devDependencies": {
    "babel-preset-env": "^1.7.0",
    "gulp": "^3.9.1",
    "gulp-babel": "^7.0.1",
    "through2": "^2.0.3"
  }
}
```

## 编写demo入口文件

在`containers`文件夹下创建`Index`文件，文件名为模块名大写+`Index`。

`containers`文件夹用于存放前端的页面。

``` bash
$ touch react/src/app/demo/containers/DEMOIndex.js
```

``` js
// DEMOIndex.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { inject } from 'mobx-react';
import { asyncRouter, nomatch } from '@choerodon/boot';

@inject('AppState')
class DEMOIndex extends React.Component {
  render() {
    const { match, AppState } = this.props;
    return (
      <Switch>
        <Route path="*" component={nomatch} />
      </Switch>
    );
  }
}

export default DEMOIndex;
```

## 启动及页面访问

在`package.json` 同级目录下，安装并启动。

``` bash
$ npm install
$ npm run start
```

当开始编译后会自动打开浏览器，通过 `localhost:9090`，查看页面效果。