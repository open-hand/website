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
在项目的`react/src/app/demo/containers/organization(project, user, global)`目录下新建一个新的功能文件夹table及其相关的JS文件。

1.编写index.js文件

``` bash
$ cd choerodon-todo-service
$ mkdir -p react/src/app/demo/containers/organization/table
$ touch react/src/app/demo/containers/organization/table/index.js
```

```js
// table/index.js
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Table } from 'choerodon-ui';
import { Action, Content, Header, Page } from '@choerodon/boot';
import Store from './stores';

@observer
class TableDemo extends Component {
  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    Store.loadData();
  }

  renderLevel(text) {
    const LEVEL_MAP = {
      organization: '组织',
      project: '项目',
    };
    return LEVEL_MAP[text] || '全局';
  }

  renderTable = () => {
    const { isLoading, pagination } = Store;
    const columns = [
      {
        title: '名字',
        dataIndex: 'name',
        key: 'name',
        width: '25%',
      },
      {
        title: '编码',
        dataIndex: 'code',
        key: 'code',
        width: '25%',
      },
      {
        title: '层级',
        dataIndex: 'level',
        key: 'level'
      },
      {
        title: '状态',
        dataIndex: 'enabled',
        key: 'enabled',
      },
      {
        title: '',
        key: 'action',
        align: 'right',
        render: (text, record) => {
          const actionDatas = [{
            icon: '',
            type: 'site',
            text: '修改',
          }];
          if (record.enabled) {
            actionDatas.push({
              icon: '',
              type: 'site',
              text: '停用',
            });
          } else {
            actionDatas.push({
              icon: '',
              type: 'site',
              text: '启用',
            });
          }
          return <Action data={actionDatas} getPopupContainer={() => document.getElementsByClassName('page-content')[0]} />;
        },
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={Store.data.slice()}
        pagination={pagination}
        rowKey={record => record.id}
        onChange={this.handlePageChange}
        loading={isLoading}
        filterBarPlaceholder="过滤表"
      />
    );
  }

  render() {
    return (
      <Page className="choerodon-role">
        <Header title="表格演示">
          <Button
            onClick={this.handleRefresh}
            icon="refresh"
          >
            刷新
          </Button>
        </Header>
        <Content
          title="标题"
          description="描述"
          link="#"
        >
          {this.renderTable()}
        </Content>
      </Page>
    );
  }
}

export default TableDemo;
```

2.编写store代码

``` bash
$ cd choerodon-todo-service
$ mkdir -p react/src/app/demo/containers/organization/table/stores
$ touch react/src/app/demo/containers/organization/table/stores/index.js
$ touch react/src/app/demo/containers/organization/table/stores/Store.js
```

```js
// stores/index.js
import Store from './Store';

export default Store;

```

```js
// stores/Store.js
import { action, computed, observable } from 'mobx';
import { axios } from '@choerodon/boot';

class Store {
  @observable data = [];
  @observable isLoading = true;
  @observable pagination = {
    current: 1,
    pageSize: 10,
    total: '',
  };

  @action
  setData(data) {
    this.data = data;
  }

  @action
  setIsLoading(data) {
    this.isLoading = data;
  }

  @computed
  get getData() {
    return this.data.slice();
  }

  @action
  loadData(page = this.pagination.current, size = this.pagination.pageSize) {
    const body = {};
    const sorter = [];
    this.isLoading = true;
    axios.post(
      `/iam/v1/roles/search?page=${page}&size=${size}&sort=${sorter.join(',')}`,
      JSON.stringify(body),
    )
      .then((res) => {
        this.isLoading = false;
        this.data = res.list;
        this.pagination = {
          current: res.pageNum,
          pageSize: res.pageSize,
          total: res.total,
        };
      });
  }
}

const store = new Store();

export default store;

```


## 配置异步路由

修改`react/src/app/demo/containers/DEMOIndex.js`文件中配置新建文件的访问路径：

```js
// DEMOIndex.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { inject } from 'mobx-react';
import { asyncRouter, nomatch } from '@choerodon/boot';

const HelloIndex = asyncRouter(() => import('./organization/hello'));
const TableIndex = asyncRouter(() => import('./organization/table'));

@inject('AppState')
class DEMOIndex extends React.Component {
  render() {
    const { match, AppState } = this.props;
    return (
      <Switch>
        <Route path={`${match.url}/hello`} component={HelloIndex} />
        <Route path={`${match.url}/table`} component={TableIndex} />
        <Route path="*" component={nomatch} />
      </Switch>
    );
  }
}

export default DEMOIndex;
```

## 页面访问

本次demo的访问路径应该为： `http://localhost:9090/#/demo/table`

> 因为在编译自动收集路由配置时，本模块的路由被映射为`/demo`，也就是在package.json中设置的routeName字段。
