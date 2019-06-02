+++
title = "Hello Word页面"
date = "2018-04-26T13:44:28+08:00"
draft = false
weight = 2
+++

## 前置条件

在开发`helloword`页面之前，要确保已经在本地创建了基础前端项目。详见 [新建项目](../create_project/)

1. 页面编写
2. 配置路由
3. 页面访问

## 页面编写
在项目的`react/src/app/demo/containers/organization(project, user, global)`目录下新建一个新的功能文件夹hello及其相关的JS文件。

``` bash
$ cd choerodon-todo-service
$ mkdir -p react/src/app/demo/containers/organization/hello
$ touch react/src/app/demo/containers/organization/hello/index.js
```

```js
// hello/index.js
import React, { Component } from 'react';

class Hello extends Component {
  render() {
    return (
      <div>Hello, it is a demo!</div>
    );
  }
}

export default Hello;
```

## 配置异步路由

在`react/src/app/demo/containers/DEMOIndex.js`文件中配置新建文件的访问路径：

```js
// DEMOIndex.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { inject } from 'mobx-react';
import { asyncRouter, nomatch } from '@choerodon/boot';

const HelloIndex = asyncRouter(() => import('./organization/hello'));

@inject('AppState')
class DEMOIndex extends React.Component {
  render() {
    const { match, AppState } = this.props;
    return (
      <Switch>
        <Route path={`${match.url}/hello`} component={HelloIndex} />
        <Route path="*" component={nomatch} />
      </Switch>
    );
  }
}

export default DEMOIndex;
```

## 页面访问

本次demo的访问路径应该为： `http://localhost:9090/#/demo/hello`

> 因为在编译自动收集路由配置时，本模块的路由被映射为`/demo`，也就是在package.json中设置的routeName字段。
