+++
title = "编写页面"
weight = 2
+++

## 编写页面

> - 此例子在组织层创建新页面,如果需要在其他层级创建页面，同理自行创建

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