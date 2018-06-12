+++
title = "开发新页面"
description = "开发新页面"
weight = 2
+++

## 前置条件

在开发新页面之前，要确保已经在本地创建了新的模块。详见 [开发新模块](../new_module/)

## 介绍

本章节讲述了如何使用Choerodon 和React 开发一个全新的页面。包含如下内容：

* 菜单配置
* 页面编写
* 配置路由
* 获取后台数据
* 前台数据渲染

## 菜单配置

前端新加模块和页面，想在菜单中显示需要跟后端沟通各种事宜与配置，大大增加了开发效率与成本。在此版本中，只需要简单配置，菜单数据完全由前端控制。

在模块内部创建config文件夹，目录结构为:

```

├── language
|   ├── en.yml
|   └── zh.yml
|
└── Menu.yml

```
language | 菜单中英文配置文件夹
--- | ---
en.yml | 英文菜单
zh.yml | 中文菜单
Menu.yml | 菜单配置项

Menu.yml文件内容看起来是这样的:

``` yaml
"demo": # 此处为最外层的模块服务字段
  icon: IAM # 服务的图标
  sort: 1
  organization: # 组织层的菜单
    - "hello": # 菜单字段
        icon: manage_organization  # 菜单图标
        Routes: /demo/hello # 菜单对应路由
        sort: 1 # 菜单的次序
        permission: # 菜单内容具有的权限
          - 'demo-service.demo.hello'
  site: # site层的菜单
  project: # 项目层的菜单
  user: # 个人中心层的菜单
```

en.yml文件内容:

``` yaml
"demo": "DEMO"
# site

# organization
"demo.hello": "hello"

# project

# user
```

模板为[服务字段].[菜单字段]: [菜单英文名]

zh.yml文件内容:

``` yaml
"demo": "DEMO"
# site

# organization
"demo.hello": "你好"

# project

# user
```

在项目根目录下，执行
``` bash
$ python ./demo/node_modules/choerodon-front-boot/structure/configAuto.py demo
```
>(确保python版本为2.7.x,以及本地安装pyyaml包)脚本。

成功之后在项目根目录会生成config.yml文件。

然后再执行命令
``` bash
$ python ./demo/node_modules/choerodon-front-boot/structure/sql.py -i ip地址 -p 端口号 -u 用户名 -s 密码
```
在部署时候也可通过环境变量进行传递参数

变量名 | 说明
--- | ---
DB_HOST | 用户名
DB_PORT	| 端口
DB_USER	| 用户名
DB_PASS	| 密码
DB_NAME | 数据库（默认为iam_service）

成功后，会将前端配置的菜单信息插入后端数据库中。

## 页面编写

> - 此例子在组织层创建新页面,如果需要在其他层级创建页面，同理自行创建

在 `/demo/src/app/demo/containers/organization(project, user, global)`目录下新建一个新的功能文件夹`hello`及其相关的JS文件:

``` js
// Demo.js文件
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Demo extends Component {
  render() {
    return (
      <div>{'Hello, it is a demo!'}</div>
    );
  }
}
export default withRouter(Demo);
```

## 配置路由

在`/demo/src/app/demo/containers/DEMOIndex.js`文件中配置新建文件的访问路径：

``` js
// DEMOIndex.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { inject } from 'mobx-react';
import { asyncLocaleProvider, asyncRouter, nomatch } from 'choerodon-front-boot';
// 在头部引入异步路由模块
const HelloIndex = asyncRouter(() => import('./organization/hello'));

@inject('AppState')
class DEMOIndex extends React.Component {
    render() {
        const { match, AppState } = this.props;
        return (
            <Switch>
                <Route path={`${match.url}/hello`} component={HelloIndex} /> // 在下面路由中进行编写设置
                <Route path={'*'} component={nomatch} />
            </Switch>
        );
    }
}

export default DEMOIndex;

```

> 注意： 本次demo的访问路径应该为： `http://localhost:9090/#/demo/hello` ，因为在`gulp`自动生成路由配置时，`DEMOIndex`的路由被映射为`/demo`，配置完路由信息后就可以使用url访问刚刚新建的文件了。

## 获取后台数据

文件可以被访问后，接下来就是完善界面信息，从后台获取数据。获取数据的方法都写在和文件对应的store文件中。

### axios()函数

axios()可以设置全局的配置，例如请求头信息，拦截器等，这样的好处是可以避免重复配置。

关于axios()的相关信息可以参考：[https://www.npmjs.com/package/axios](https://www.npmjs.com/package/axios)