+++
title = "ClientSearch"
data = "2017-09-29"
draft = false
weight= 10
+++

# ClientSearch 搜索框

## 用途
ClientSearch搜索框组件是为实现页面table表过滤搜索功能。

![](../images/clientsearch.jpg)

## 用法
在组件头部引用后直接调用
```
...
import ClientSearch from ClientSearch
...
handleSearch = (result) => {
  this.setState({
    search: result,
  });
}
...
return (
  <ClientSearch 
    options={[{
      name: '客户端ID',
      code: 'id',
    }, {
      name: '客户端名称',
      code: 'name',
    }, {
      name: '授权类型数',
      code: 'authorizedGrantTypes',
    }]}
    onSearch={this.handleSearch.bind(this)}
  />
)
```

参数 | 说明
--- | ---
options | 搜索框下拉列表的数据 `name`代表一行的文字 `code`代表该行对应的字段
onSearch | 搜索的点击事件 默认带一个对象参数 该对象参数有两个`key`为`code`和`input`,分别对应下拉框选中的字段和input框输入的内容

