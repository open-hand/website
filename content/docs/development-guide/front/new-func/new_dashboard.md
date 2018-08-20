+++
title = "开发仪表盘"
description = "开发仪表盘"
weight = 3
+++

## 前置条件

在开发新页面之前，要确保已经在本地创建了新的模块。详见 [开发新模块](../new_module/)。同时，需要保证你的`choerodon-front-boot` 依赖在`0.7.2`版本之上。

## 介绍

本章讲述了如何使用Choerodon 开发新的`Dashboard`，并且如何将`Dashboard`注册到平台。包含如下内容：

* 仪表盘配置
* 页面编写
* 配置路由
* 初始化仪表盘

## 仪表盘配置

在模块内部创建`dashboard`文件夹，路径为`choerodon-front-demo/demo/src/app/demo/config/dashboard`目录结构为:

```
├── language
|   ├── en.yml
|   └── zh.yml
|
└── dashboard.yml
```

language | 仪表盘中英文配置文件夹
--- | ---
en.yml | 英文code
zh.yml | 中文code
dashboard.yml | 仪表盘配置项

`dashboard.yml`文件内容看起来是这样的:

``` yaml
dashboard:
  - code: "Guide" ## code
    icon: APItest ## 图标
    title: "快速入门" ## 显示的title
    description: "新手指引" ## 描述
    level: site ## 层级，包含site/organization/project
    sort: 1 ## 默认顺序
  - code: "Document"
    icon: description
    title: "文档"
    description: "文档"
    level: site
    sort: 2
  - code: "Announcement"
    icon: import_contacts
    title: "公告"
    description: "公告"
    level: site
    sort: 3
```

其中`Dashboard` 的名称由`language` 中的配置决定。

``` yaml
## zh.yml
"Guide": "快速入门"
"Document": "文档"
"Announcement": "公告"
```

``` yaml
## en.yml
"Guide": "Guide"
"Document": "Document"
"Announcement": "Announcement"
```

## 页面编写

仪表盘的页面的编写与普通页面一致。在`choerodon-front-demo/demo/src/app/demo/dashboard` 创建对应`code` 对应的文件夹。每个文件夹中包含`index.js` 和`index.scss`。

``` js
// index.js
import React, { Component } from 'react';
import { DashBoardNavBar } from 'choerodon-front-boot';
import './index.scss';

export default class Document extends Component {
  render() {
    return (
      <div className="c7n-iam-dashboard-document">
        <ul>
          <li>
            <a target="choerodon" href="#">这是第一行</a>
          </li>
        </ul>
        <DashBoardNavBar>
          <a target="choerodon" href="http://choerodon.io/zh/docs/">这是底部链接</a>
        </DashBoardNavBar>
      </div>
    );
  }
}

```

## 配置路由

修改`config.js` 文件。

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
  port: 9090, // 端口
  dashboard: {
    demo: 'src/app/demo/dashboard/*' // 路径为相对package.json 文件的路径
  }
};
```

## 初始化仪表盘

前端配置好仪表盘之后，需要将仪表盘数据初始化到数据库中。

在服务的根目录下。打开`git-bash`。输入如下命令：

```bash
$ python ./demo/node_modules/choerodon-front-boot/structure/dashboard.py -o yml -m demo
```
该命令会在根目录下生成一个`dashboard.yml`。

然后再执行：

```bash
$ python ./demo/node_modules/choerodon-front-boot/structure/dashboard.py -o sql -i ip -p port -u user -s pwd
```
将`dashboard.yml` 数据初始化进数据库。

需要注意的是，这两个步骤分别在`.gitlab-ci.yml` 和 `charts` 中体现。