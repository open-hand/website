+++
title = "前端加载页面"
weight = 4
+++

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