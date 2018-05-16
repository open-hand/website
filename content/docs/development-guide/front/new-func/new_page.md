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

```
"iam": # 此处为最外层的模块服务字段
  icon: account_circle # 服务的图标
  global: # global层的菜单
    - "role": # 菜单字段
        icon: assignment_ind # 菜单图标
        Routes: /iam/role # 菜单对应路由
        permission: # 菜单内容具有的权限
          - 'iam-service.role.update'

  organization: # 组织层的菜单
    - "client":
        icon: laptop_mac
        Routes: /iam/client
        permission:
          - 'iam-service.client.create'
          - 'iam-service.client.update'
          - 'iam-service.client.delete'
          - 'iam-service.client.select'
  project: # 项目层的菜单
    - "member-role-project":
        icon: person_add
        Routes: /iam/projectMemberRole
        permission:
          - 'iam-service.member-role-project.create'
          - 'iam-service.member-role-project.delete'
          - 'iam-service.member-role-project.select'
          - 'iam-service.member-role-project.update'
  user: # 个人中心层的菜单
    - "user-info":
        icon: more
        Routes: /iam/user/info
        permission:
          - 'iam-service.user-info.querySelf'
          - 'iam-service.user-info.updateSelf'

```

en.yml文件内容:

```
"iam": IAM
"iam.client": "Client"
"iam.member-role-project": "Role Assignment"
"iam.role": "Role"
"iam.user-info": "User Information Maintenance"

```

模板为[服务字段].[菜单字段]: [菜单英文名]

zh.yml文件内容:

```
"iam": "用户服务"
"iam.client": "客户端"
"iam.member-role-project": "角色分配"
"iam.role": "角色"
"iam.user-info": "用户信息维护"
```

在项目根目录下，执行python .\boot\structure\configAuto.py iam(确保python版本为2.7.x,以及本地安装pyyaml包)脚本。

成功之后在项目根目录会生成config.yml文件。

然后再执行python ./boot/structure/pythonsql.py -i ip地址 -p 端口号 -u 用户名 -s 密码

在部署时候也可通过环境变量进行传递参数

变量名 | 说明
--- | ---
DB_HOST | 用户名
DB_PORT	| 端口
DB_USER	| 用户名
DB_PASS	| 密码

成功后，会将前端配置的菜单信息插入后端数据库中。

如果要显示插入的菜单，需要在全局层的菜单配置下，进行页面操作，将数据已有的菜单展示在菜单列。


## 页面编写

> - 此例子在组织层创建新页面,如果需要在其他层级创建页面，同理自行创建

在 `/iam/src/app/iam/containers/organization(project, user, global)`目录下新建一个新的功能文件夹`demo`及其相关的JS文件:

```
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

```
// DemoIndex.js文件
import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import asyncRouter from '../../../../../util/asyncRouter';

const Demo = asyncRouter(()=>import('./Demo'));

const DemoIndex = ({ match }) => (
  <Switch>
    <Route exact path={match.url} component={Demo} />
  </Switch>
);

export default DemoIndex;
```

## 配置路由

在`/iam/sr/app/iam/containers/IAMIndex.js`文件中配置新建文件的访问路径：

```
...
// 在头部引入异步路由模块
const DemoIndex = asyncRouter(()=>import('./organization/demo/DemoIndex'));

//在下面路由中进行编写设置
...
              <Route path={`${match.url}/demo`} component={DemoIndex} />
...

```

> 注意： 本次demo的访问路径应该为： `/iam/demo` ，因为在gulp自动生成路由配置时，IAMIndex的路由被映射为iam，配置完路由信息后就可以使用url访问刚刚新建的文件了。

## 获取后台数据

文件可以被访问后，接下来就是完善界面信息，从后台获取数据。获取数据的方法都写在和文件对应的store文件中。

### axios()函数

axios()可以设置全局的配置，例如请求头信息，拦截器等，这样的好处是可以避免重复配置。
```
// store/organization/demo/DemoStore.js文件

import { observable, action, computed } from 'mobx';
// 该axios是封装过的，设置了请求头信息和响应拦截器
import axios from 'Axios';
import store from 'Store';

// store注解符令组件可以通过DemoStore来找到该store
@store('DemoStore')
class DemoStore {
  @observable roles = [];

  @computed get getRoles() {
    return this.roles.slice();
  }

  @action setRoles(data) {
    this.roles = data;
  }

  loadRole() {
    axios.get('uaa/v1/roles?page=0&size=100').then((data) => {
      if (data) {
        this.setRoles(data.content);
      }
    });
  }
}

const demoStore = new DemoStore();

export default demoStore;
```

更多关于axios()的相关信息可以参考：[https://www.npmjs.com/package/axios](https://www.npmjs.com/package/axios)


## 前端数据渲染

拿到后台数据后就可以将数据渲染到界面了，下面将介绍如何将数据渲染到前端界面：

### 加载DemoStore

修改`/iam/src/app/iam/containers/organization/demo/DemoIndex.js`，添加添加异步加载DemoStore：

```
// DemoIndex.js文件
import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import asyncRouter from '../../../../../util/asyncRouter';
// DemoIndex.js文件中异步加载DemoStore
const Demo = asyncRouter(() => import('./Demo'), () => import('../../../stores/organization/demo/DemoStore'));

const DemoIndex = ({ match }) => (
  <Switch>
    <Route exact path={match.url} component={Demo} />
  </Switch>
);

export default DemoIndex;
```

### 获取数据并渲染

在 react 的状态处理函数 `componentDidMount()` 中调用 `loadRoles` 函数获取数据，此时才真正拿到后台的数据。数据被存储在了组件的 `props.DemoStore.roles` 中。我们可以在 `render()` 中（或者在任何 `componentDidMount()` 函数之后执行的函数中）通过`console.log(this.props.DemoStore.getRoles())`查看拿到的数据。

```
componentDidMount(){
  this.props.DemoStore.loadRoles();
}
```

最终的demo界面源码如下：

```
import React, { Component } from 'react';
import { Table } from 'antd';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@observer
class Demo extends Component {
  componentDidMount() {
    this.props.DemoStore.loadRole();
  }

  render() {
    const columns = [{
      title: HAP.languageChange('role.name'),
      dataIndex: 'name',
      key: 'name',
    }, {
      title: HAP.languageChange('role.level'),
      dataIndex: 'roleLevel',
      key: 'roleLevel',
    }, {
      title: HAP.languageChange('role.description'),
      dataIndex: 'description',
      key: 'description',
    }, {
      title: HAP.languageChange('role.serviceName'),
      dataIndex: 'serviceName',
      key: 'serviceName',
    }];
    return (
      <div style={{ margin: 20 }}>
        <Table
          columns={columns}
          dataSource={this.props.DemoStore.getRoles}
          pagination="true"
          rowKey={
            function func(record) {
              const rec = record.id;
              return rec;
            }
          }
        />
      </div>
    );
  }
}
// withRouter添加history支持
export default withRouter(Demo);
```
<!-- <div align="center">
  <img src="../images/new/showData.png" width="900"/>
</div> -->