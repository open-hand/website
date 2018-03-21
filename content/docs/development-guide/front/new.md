+++
title = "开发新功能"
description = ""
weight = 2
+++

# 开发新页面

## 新建文件夹

在 \iam\src\app\iam\containers\organization目录下新建一个新的功能文件夹\demo及其相关的JS文件：

![](../images/new/newDemo.png)

```
// Demo.js文件
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Demo extends Component {
  render() {
    return (
      <div>{'Hello, it\'s a demo!'}</div>
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

在\iam\src\app\iam\containers\IAMIndex.js文件中配置新建文件的访问路径：

```
...
//异步路由
const DemoIndex = asyncRouter(()=>import('./organization/demo/DemoIndex'));
...
              <Route path={`${match.url}/demo`} component={DemoIndex} />
...
```

> 注意： 本次demo的访问路径应该为： `/iam/demo` ，因为在gulp自动生成路由配置时，IAMIndex的路由被映射为iam

![](../images/new/autoRouter.png)

配置完路由信息后就可以使用url访问刚刚新建的文件了。

![](../images/new/demo.png)

## 获取后台数据

文件可以被访问后，接下来就是完善界面信息，从后台获取数据。获取数据的方法都写在和文件对应的store文件中。

### axios()函数

axios()可以设置全局的配置，例如请求头信息，拦截器等，这样的好处是可以避免重复配置。 常用方法：

- axios.request(config)
- axios.get(url[, config])
- axios.delete(url[, config])
- axios.head(url[, config])
- axios.post(url[, data[, config]])
- axios.put(url[, data[, config]])
- axios.patch(url[, data[, config]])

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

修改\iam\src\app\iam\containers\organization\demo\DemoIndex.js，添加添加异步加载DemoStore：

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

在 react 的状态处理函数 `componentDidMount()` 中调用 `loadRoles` 函数获取数据，此时才真正拿到后台的数据。数据被存储在了组件的 `props.DemoStore.roles` 中。我们可以在 `render()` 中（或者在任何 `componentDidMount()` 函数之后执行的函数中）查看拿到的数据：`console.log(this.props.DemoStore.getRoles())`。

```
componentDidMount(){
  this.props.DemoStore.loadRoles();
}
```

更多关于react的信息可以参考： [https://hulufei.gitbooks.io/react-tutorial/content/introduction.html](https://hulufei.gitbooks.io/react-tutorial/content/introduction.html)

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

![](../images/new/showData.png)

# 开发新模块

## 新建模块

###  新建模块

切换到boot/generator-hap的目录下，运行 `npm link` 。

在项目根目录，运行 `yo hap` ,则会出现需要输入和选择的信息.

注意: 在后面文档中,模块名默认输入的是demo, 如果输入的其他的模块名, 相应替换便可。

信息如图所示:

![](../images/new/yohap.jpg)

此时会自动构建模块的结构，目录结构如图所示:

![](../images/new/demo.jpg)

然后进入到 `boot` 的目录下, 运行 `gulp` , 之后运行 `npm start` 启动项目, 在 `localhost:9090/#/demo` 便可以查看页面.

其中 `输入的模块名` + `Index` 文件是必须的，该文件的命名规则为 `模块名的大写` + `Index` ，如若模块名为test，则该文件应命名为TESTIndex.js，这是在gulp的配置文件中规定的。

## 配置路由

在containers 目录中新建test\Page1.js：

```
import React from 'react';

const Page1 = () => (
    <div>
        <h1>This is page1!</h1>
    </div>
);
export default Page1;
```

在containers 目录中新建test\Page1Index.js,配置Page1的访问路径：

```
//Page1Index.js文件
import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import asyncRouter from '../../../../util/asyncRouter';


const Page1 = asyncRouter(()=>(import('./Page1')));
const Page1Index=({ match })=>(
    <Switch>
        <Route exact path={match.url} component={Page1} />
    </Switch>
);

export default Page1Index;
```

在DEMOIndex.js文件,配置demo模块的路由：

```
import React, {Component} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom'

import asyncRouter from '../../../util/asyncRouter'

class DEMOIndex extends Component {
    render() {
        const Home = asyncRouter(() => import('./Home'));
        const Page1Index = asyncRouter(() => import('./test/Page1Index'));
        const {match} = this.props;
        return (
            <div>
                <Switch>
                    <Route exact path={match.url} component={Home}/>
                    <Route path={`${match.url}/page1`} component={Page1Index}/>
                </Switch>
            </div>
        )
    }
}
export default DEMOIndex;
```

### 查看效果

在浏览器中键入 `http://localhost:9090/#/demo`

![](../images/new/demo1.png)

在浏览器中键入 `http://localhost:9090/#/demo/page1`

![](../images/new/page1.png)

> 提示: 在新模块中开发新页面与前面在iam中开发新页面的规则和规范完全一致,可以参考iam中开发过程。

### 第三方文件包安装

如果开发模块需要其他的第三方安装包,可以直接添加在模块`package.json`文件, 在部署集成时, 通过执行boot目录下的 `npm run preinstall` 可以将各个子模块package.json文件合并到boot的package.json文件中,再执行`npm install`安装项目依赖。

# 权限组件

通过引入权限组件，可以动态判断用户是否具有此操作权限，并控制页面是否展示功能。

## 引用
通过组件头部引入权限组件
```
...
import Permission from 'PerComponent';
...
```

## 调用
调用权限组件需要额外当前组织或项目类型和id参数

在组件头部引入inject组件,导入Appstate
```
...
import { inject } from 'mobx-react'
...
@inject('AppState')
```
在组件适当位置获取当前组织或项目类型type和id

如果当前组件在组织层
```
...
const { AppState } = this.props;
const menuType = AppState.currentMenuType;
const organizationId = menuType.id;
let type;
if (AppState.getType) {
  type = AppState.getType;
} else if (sessionStorage.type) {
  type = sessionStorage.type;
} else {
  type = menuType.type;
}
...
```

如果当前组件在项目层
```
...
const { AppState } = this.props;
const menuType = AppState.currentMenuType;
const organizationId = menuType.organizationId;
const projectId = menuType.id;
let type;
if (AppState.getType) {
  type = AppState.getType;
} else if (sessionStorage.type) {
  type = sessionStorage.type;
} else {
  type = menuType.type;
}
...
```


在需要调用权限的地方用Permission包裹住要展示的组件，如果有权限则展示，没有则隐藏
```
...
<Permission
  service={'hap-user-service.client.update'}
  type={type}
  organizationId={organizationId}
  projectId={projectId} //如果在项目层加上这一条参数
>
  <Tooltip
    title={HAP.languageChange('edit')}
    placement="bottom"
    getTooltipContainer={that => that}
  >
    <a
      role="none"
      className="operateIcon small-tooltip"
      onClick={this.handleChange.bind(this, record.id)}
    >
      <Icon type="edit" />
    </a>
  </Tooltip>
</Permission>
...
```

Permission组件的service参数是后台存储的权限code，可以通过不同服务的api接口获取。


# 项目配置项

## 配置项详解
为了应对不同开发环境和不同项目需求，可以对`hap cloud`框架多个配置进行个性化。

配置项文件在项目根目录的`config.js`文件中。看起来是这样的
```
  const config = {
  local: false,
  clientId: 'localhost',
  titlename: 'HAPCloud',
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
  server: 'http://gateway.devops.saas.hand-china.com',
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

## 新建或覆盖全局配置

在项目根目录右键`git bash here`,输入`yo hap:1.2.0`
根据提示 键入各个配置项参数
完成后将会覆盖原有config文件

![](../images/new/yoconfig.jpg)

# 菜单配置

在Hap Cloud之前开发版本中，前端新加模块和页面，想在菜单中显示需要跟后端沟通各种事宜与配置，大大增加了开发效率与成本。在此版本中，只需要简单配置，菜单数据完全由前端控制。

以`iam`模块为例.

![](../images/new/menu1.jpg)

在模块内部创建`config`文件夹，目录结构为：

```
├── language
|   ├── en.yml
|   └── zh.yml
|
└── Menu.yml
```

文件 | 说明
--- | ---
language | 菜单中英文配置文件夹
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
          - 'hap-user-service.role.update'
          - 'hap-user-service.role.delete'
          - 'hap-user-service.role.select'
          - 'hap-user-service.role.updateRoleWithPermission'
          - 'hap-user-service.role.createRoleWithPermission'
    -  "permission":
        icon: verified_user
        Routes: /iam/permission
        permission:
          - 'hap-user-service.permission.awesomeSelect'
    - "menu-management":
        icon: view_list
        Routes: /iam/menuTree
        permission:
          - 'hap-user-service.menu.menuOrganizations'
          - 'hap-user-service.menu.menuProjects'
          - 'hap-user-service.menu.menuGlobal'
    - "menu-permission":
        icon: security
        Routes: /iam/globalMenuPermission
        permission:
          - 'hap-user-service.menu.selectAll'
    - "member-role-global":
        icon: person_add
        Routes: /iam/globalMemberRole
        permission:
          - 'hap-user-service.member-role-global.delete'
          - 'hap-user-service.member-role-global.create'
          - 'hap-user-service.member-role-global.select'
          - 'hap-user-service.member-role-global.update'
    - "service":
        icon: next_week
        Routes: /iam/service
        permission:
          -  'hap-user-service.service.self'
          - 'hap-user-service.service.select'
  organization: # 组织层的菜单
    - "client":
        icon: laptop_mac
        Routes: /iam/client
        permission:
          - 'hap-user-service.client.create'
          - 'hap-user-service.client.update'
          - 'hap-user-service.client.delete'
          - 'hap-user-service.client.select'
    - "ldap":
        icon: device_hub
        Routes: '/iam/ldap'
        permission:
          - 'hap-user-service.ldap.updateSelf'
          - 'hap-user-service.ldap.query'
    - "password-policy":
        icon: verified_user
        Routes: /iam/password-policy
        permission:
          - 'hap-user-service.password-policy.updateSelf'
          - 'hap-user-service.password-policy.queryOrganization'
    - "user":
        icon: person
        Routes: /iam/user
        permission:
          - 'hap-user-service.user.updateUser'
          - 'hap-user-service.user.create'
          - 'hap-user-service.user.delete'
          - 'hap-user-service.user.select'
          - 'hap-user-service.user.query'
    - "project":
        icon: widgets
        Routes: /iam/project
        permission: 
          - 'hap-user-service.project.crete'
          - 'hap-user-service.project.update'
          - 'hap-user-service.project.delete'
          - 'hap-user-service.project.query'
          - 'hap-user-service.project.select'
    - "member-role-organization":
        icon: person_add
        Routes: /iam/origanizationMemberRole
        permission:
          - 'hap-user-service.member-role-organization.create'
          - 'hap-user-service.member-role-organization.delete'
          - 'hap-user-service.member-role-organization.update'
          - 'hap-user-service.member-role-organization.select'
    - "user-groups":
        icon: people
        Routes: /iam/userGroup
        permission:
          - 'hap-user-service.groups.update'
          - 'hap-user-service.user-groups.insertUserGroups'
          - 'hap-user-service.groups.delete'
  project: # 项目层的菜单
    - "member-role-project":
        icon: person_add
        Routes: /iam/projectMemberRole
        permission:
          - 'hap-user-service.member-role-project.create'
          - 'hap-user-service.member-role-project.delete'
          - 'hap-user-service.member-role-project.select'
          - 'hap-user-service.member-role-project.update'
  user: # 个人中心层的菜单
    - "user-info":
        icon: more
        Routes: /iam/user/info
        permission:
          - 'hap-user-service.user-info.querySelf'
          - 'hap-user-service.user-info.updateSelf'
    - "password":
        icon: grain
        Routes: /iam/user/modifyPwd
        permission:
          - 'hap-user-service.password-policy.queryOrganization'
          - 'hap-user-service.password-policy.updateSelf'
          - 'hap-user-service.password.updateSelf'
    - "token":
        icon: lock
        Routes: /iam/token
        permission:
          -  'hap-user-service.token.querySelf'
          - 'hap-user-service.token.create'
          - 'hap-user-service.token.deleteSelf'

```

en.yml文件内容：

```
"iam": IAM
"iam.client": "Client"
"iam.ldap": "LDAP"
"iam.member-role-global": "Role Assignment"
"iam.member-role-organization": "Role Assignment"
"iam.member-role-project": "Role Assignment"
"iam.menu-management": "Menu Setting"
"iam.organization": "Organization"
"iam.password": "Password Modification"
"iam.password-policy": "Password Policy"
"iam.permission": "Permission"
"iam.project": "Project"
"iam.role": "Role"
"iam.service": "Service"
"iam.token": "Authorization"
"iam.user": "User"
"iam.user-groups": "User Group"
"iam.user-info": "User Information Maintenance"
"iam.menu-permission": "Menu Permission"
```
模板为`[服务字段].[菜单字段]: [菜单英文名]`

zh.yml文件内容：
```
"iam": "用户服务"
"iam.client": "客户端"
"iam.ldap": "LDAP"
"iam.member-role-global": "角色分配"
"iam.member-role-organization": "角色分配"
"iam.member-role-project": "角色分配"
"iam.menu-management": "菜单配置"
"iam.organization": "组织"
"iam.password": "密码修改"
"iam.password-policy": "密码策略"
"iam.permission": "权限"
"iam.project": "项目"
"iam.role": "角色"
"iam.service": "服务"
"iam.token": "授权"
"iam.user": "用户"
"iam.user-groups": "用户组"
"iam.user-info": "用户信息维护"
"iam.menu-permission": "菜单权限"
```
模板为`[服务字段].[菜单字段]: [菜单中文名]`

在项目根目录下，执行`python .\boot\structure\configAuto.py iam`(确保python版本为2.7.x,以及本地安装pyyaml包)脚本。

成功之后在项目根目录会生成`config.yml`文件。

然后再执行`python ./boot/structure/pythonsql.py -i ip地址 -p 端口号 -u 用户名 -s 密码`

在部署时候也可通过环境变量进行传递参数 

变量名 | 说明
--- | ---
DB_HOST | 用户名
DB_PORT | 端口
DB_USER | 用户名
DB_PASS | 密码


成功后，会将前端配置的菜单信息插入后端数据库中。

*如果要显示插入的菜单，需要在全局层的菜单配置下，进行页面操作，将数据已有的菜单展示在菜单列。*