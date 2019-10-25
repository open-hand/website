+++
title = "表格页面"
date = "2018-04-26T13:44:28+08:00"
draft = false
weight = 3
+++

## 前置条件

在开发`table`页面之前，要确保已经在本地创建了基础前端项目。详见 [新建项目](../create_project/)

1. 页面编写
2. 配置路由
3. 页面访问

## 页面编写
在项目的`react/routes`目录下新建一个新的功能文件夹table及其相关的JS文件。

1.编写index.js文件

``` bash
$ cd choerodon-todo-service
$ mkdir -p react/routes/table/list/stores
$ touch react/routes/table/index.js
$ touch react/routes/table/list/ListView.js
```

```js
// table/index.js
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { asyncRouter, nomatch } from '@choerodon/boot';

const List = asyncRouter(() => import('./list'));

const Index = ({ match }) => (
  <Switch>
    <Route exact path={match.url} component={List} />
    <Route path="*" component={nomatch} />
  </Switch>
);

export default Index;
```

```js
// table/list/index.js
import React from 'react';
import { StoreProvider } from './stores';
import ListView from './ListView.js';

export default (props) => (
  <StoreProvider {...props}>
    <ListView />
  </StoreProvider>
);

```

2.编写stores代码

``` bash
$ cd choerodon-todo-service
$ touch react/routes/table/stores/index.js
$ touch react/routes/table/stores/adminListDataSet.js
```

```js
// stores/adminListDataSet.js
export default () => {
  return {
    autoQuery: true,
    selection: false,
    transport: {
      read: {
        url: '/base/v1/users/admin',
        method: 'get',
      },
    },
    fields: [
      { name: 'realName', type: 'string', label: '用户名' },
      { name: 'loginName', type: 'string', label: '登录名' },
    ],
    queryFields: [
      { name: 'realName', type: 'string', label: '用户名' },
      { name: 'loginName', type: 'string', label: '登录名' },
    ],
  };
};
```

```js
// stores/index.js
import React, { createContext, useMemo } from 'react';
import { DataSet } from 'choerodon-ui/pro';
import { inject } from 'mobx-react';
import { injectIntl } from 'react-intl';
import AdminListDataSet from './adminListDataSet';

const Store = createContext();

export default Store;

export const StoreProvider = injectIntl(inject('AppState')(
  (props) => {
    const { children } = props;
    const adminListDataSet = useMemo(() => new DataSet(AdminListDataSet()), []);
    const value = {
      ...props,
      adminListDataSet,
    };
    return (
      <Store.Provider value={value}>
        {children}
      </Store.Provider>
    );
  },
));
```
3.编写ListView.js文件

``` bash
$ cd choerodon-todo-service
$ mkdir -p react/routes/table/list/stores
$ touch react/routes/table/index.js
$ touch react/routes/table/list/ListView.js
```

```js
// table/list/ListView.js
import React, { useContext } from 'react';
import { Content, Header, Breadcrumb, TabPage } from '@choerodon/boot';
import { Table, Button } from 'choerodon-ui/pro';
import Store from './stores';

const { Column } = Table;
export default function ListView() {
  const { adminListDataSet } = useContext(Store);

  return (
    <TabPage>
      <Header>
        <Button icon="playlist_add" onClick={() => console.log('创建')}>创建</Button>
      </Header>
      <Breadcrumb />
      <Content style={{ paddingTop: 0 }}>
        <Table pristine dataSet={adminListDataSet}>
          <Column name="realName" />
          <Column name="loginName" />
        </Table>
      </Content>
    </TabPage>
  );
}
```


## 配置异步路由

修改`react/routes/index.js`文件中配置新建文件的访问路径：

```js
// index.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { inject } from 'mobx-react';
import { asyncRouter, nomatch } from '@choerodon/boot';

const HelloIndex = asyncRouter(() => import('./routes/hello'));
const TableIndex = asyncRouter(() => import('./routes/table'));

function Index({ match }) {
  return (
    <Switch>
      <Route path={`${match.url}/hello`} component={HelloIndex} />
      <Route path={`${match.url}/table`} component={TableIndex} />
      <Route path="*" component={nomatch} />
    </Switch>
  );
}

export default inject('AppState')(Index);
```

## 页面访问

本次demo的访问路径应该为： `http://localhost:9090/#/demo/table`

> 因为在编译自动收集路由配置时，本模块的路由被映射为`/demo`，也就是在package.json中设置的routeName字段。
