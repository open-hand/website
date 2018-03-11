+++
title = "ANTD Pagination"
date = "2017-10-26"
draft = false
weight= 4
+++

ANTD Pagination
===============

数据展示界面都有一个分页，下面介绍Pagination组件及其相关的一些功能组件的用法。

Pagination 配置
---------------

1.  current 为当前页数。
2.  pageSize为每个页面显示的条数。
3.  total为总共的页数。
4.  loadOrganization函数功能为点击分页按钮，发送请求当前页面的数据。

``` {.sourceCode .js}
loadOrganization = (page) => {
  const { dispatch } = this.props;
  //使用fetchAPI进行请求
  fetch(`${API_ORG}?page=${page}&size=10`, {
    headers: HAP.getHeader()
  }).then(HAP.convertResponse(this)).then((data) => {
    //更新state状态
    dispatch(organizationLoaded(data));
  }).catch(HAP.catchHttpError());

};
```

> \<Pagination current={this.state.page + 1} pageSize={10}
> onChange={page =\> this.loadOrganization(page - 1)}
> total={totalElement} /\>

提示：

关于Pagination组件的更多用法请参考ant
design官网的api：<https://ant.design/components/pagination-cn/>

Pagination 存在的问题和解决方案
-------------------------------

1.由于使用Antd的Pagination分页，请求方式进行更改，如果当前页面只有一条数据，进行删除时，不会发起fetch请求，所以页面会一直停留在此页，不会自动向前翻页。解决处理方案如下：

``` {.sourceCode .js}
handleDelete = (event) => {
    const { dispatch } = this.props;
    const { id } = this.state;
    //当前页数条数
    let lastDatas = this.state.totalElements%10;
    fetch(`${API_ORG}/${id}`, {
      method: "DELETE",
      headers: HAP.getHeader()
    }).then((res) => {
      if (res != null) {
        HAP.convertResponse(this)
      }
    }).then(() => {
    // 在此处进行当前页数总条数判断，如果当前页数总条数为1，则在删除时候，当前页数向前翻一页
      if (lastDatas == 1 && this.state.page+1 == this.state.totalPage){
        this.loadOrganization(this.state.page-1)
      }else {
        this.loadOrganization(this.state.page)
      }
    }).catch(HAP.catchHttpError());
  };
```
