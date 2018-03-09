+++
title = "ANTD Spin"
date = "2017-10-26"
draft = false
weight= 8
+++

ANTD Spin
=========

当前端向后台发起请求后，需要一定的时间去加载数据，在这段加载的时间间隙中，为了给用户更好的用户体验，需要给界面增加一个“加载中”的样式；ant
design 中 的 Spin
组件的用法比较简单，下面主要介绍如何使页面在发起网络请求期间展示出 Spin
样式，供开发者参考。

配置步骤
--------

-   首先需要在当前页面的根组件的 constructor 方法中对组件的 state
    进行初始化，增加一个 isLoading 的state属性，初始值设为 true；
-   在需要显示加载样式的fetch()前，将state的isLoading设为true；在数据请求成功后再将isLoading设为false；

``` {.sourceCode .js}
constructor(props) {
  super(props);
  this.state = {
    isLoading: true,
  };
  this.setState({
    //将isLoading设为true
    isLoading: true,
  })
  //发起网络请求
  fetch(`${API_ROLE}?page=${page}&size=10`, {
    headers: HAP.getHeader({ 'Content-Type': 'application/json' })
  })
  .then(HAP.convertResponse(this))
  //成功拿到服务端返回的数据后
  .then((data) => {
  //将isLoading设为false
    this.setState({
      isLoading: false,
      totalPage:data.totalPages,
      totalElements:data.totalElements,
    })
    dispatch(roleLoaded(data));
  })
  .catch(HAP.catchHttpError());
};
```

-   在 render 方法中定义一个 loadingBar 的变量，用来在后期渲染 Spin；

``` {.sourceCode .js}
const loadingBar = (
      <div style={{ display: 'inherit', margin: '200px auto', textAlign: "center" }}>
        <Spin />
      </div>
    );
```

-   最后在 render() 的return 中对 isLoading 的值进行判断，如果为
    true，则渲染步骤3中定义的
    loadingBar；flase则渲染我们用来显示数据的组件。

``` {.sourceCode .js}
{this.state.isLoading ? loadingBar : (
            <Table columns={columns} dataSource={data} pagination={false} rowKey={function (record) { return record.roleId }} />
          )}
```

数据加载中的样式：![image0](./images/spin.png)加载完成后的显示：![image1](./images/spin2.png)
