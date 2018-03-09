+++
title = "ANTD Table"
date = "2017-10-26"
draft = false
weight= 1
+++

ANTD Table
==========

一般的查询界面都会有一个用来做数据展示的table，下面介绍table组件及其相关的一些功能组件的用法。

Table 展示数据
--------------

1.  使用fetch()获取table需要的数据源dataSource;
2.  定义table需要展示的数据源中对应的字段:‘title’对应前端展示的字段名称，‘dataIndex’对应后台传出来的字段名，‘key’为表格列需要的关键值；
3.  最后在render()的return中加入Table节点，并为其dataSource和columns属性赋值。

``` {.sourceCode .js}
const columns = [{
title: '姓名',
dataIndex: 'name',
key: 'name',
}, {
title: '年龄',
dataIndex: 'age',
key: 'age',
}, {
title: '住址',
dataIndex: 'address',
key: 'address',
}]；

<Table dataSource={dataSource} columns={columns} rowKey={function (record) { return record.roleId }} />
```

使用Table组件时需要首先在文件开始初使用import导入Table的rowKey属性需要加上，否则控制台会报警告。

关于Table组件的更多用法请参考ant
design官网的api：<https://ant.design/components/table-cn/>

Table 数据分页
--------------

Table数据分页可以使用Table组件的pagination属性，也可以使用ant
design的Pagination组件。

    <Table columns={columns} dataSource={data} pagination={{current:this.state.page + 1,onChange:page => this.loadRoles(page - 1),total:totalElement}} rowKey={function (record) { return record.roleId }} />

或者

    <Pagination current={this.state.page + 1} pageSize={10} onChange={page => this.loadRoles(page - 1)} total={totalElement} />

Table 数据操作
--------------

根据系统需求的不同，有时候需要对 table
的数据进行编辑、删除等不同的操作，此时需要在 table 的 columns
属性中定义：

``` {.sourceCode .js}
onEdit = (id) => {
    const { dispatch } = this.props;
    const currentLang = window.location.href.split('?')[1];
    if (currentLang == undefined) {
      this.context.router.push({
        pathname: 'home/role/edit?ZH_CN',
        query: { id: id }
      });
    } else {
      this.context.router.push({
        pathname: `home/role/edit?${currentLang}`,
        query: { id: id }
      });
    };
  };


const columns = [{
      title: HAP.languageChange("名称"),
      dataIndex: "name",
      key: "name"
    }, {
      title: HAP.languageChange("描述"),
      dataIndex: "descn",
      key: "descn",
    }, {
    //定义“操作”列
      title: <div style={{ textAlign: "center" }}>
        {HAP.languageChange("操作")}
      </div>,
      className: "operateIcons",
      key: 'action',
      //在render中渲染“操作”列在前端的展示效果
      render: (text, record) => (
        <div ref="opeIcon">
          {/*//Tooltip是对应操作在hover事件发生时出发的提示信息，可以删掉不写*/}
          <Tooltip title={HAP.languageChange("编辑")} placement="bottom" getTooltipContainer={(that) => that}>
            {/*//使用onClick事件来定义“编辑”操作所对应执行的操作*/}
            <a className="operateIcon small-tooltip" onClick={this.onEdit.bind(this, record.roleId)}>
              <Icon type="edit"/>
            </a>
          </Tooltip>
        </div>
      ),
    }];
```
