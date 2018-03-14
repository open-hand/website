+++
title = "Action"
date = "2017-02-01"
draft = false
weight= 13
+++

# Action 操作组件

## 用途
Action组件为封装的框架统一Table表操作一栏功能组件。

![](../images/action.jpg)

## 用法
在组件头部引用后直接调用
```
...
import Action from 'Action';
...
return (
  ...
  <Action
    data={
      [{
        service: 'hap-user-service.client.select',
        icon: 'search',
        text: '详情',
        action: this.handleDetail.bind(this, record.id),
      }, {
        service: 'hap-user-service.client.update',
        icon: 'border_color',
        text: '编辑',
        action: this.handleChange.bind(this, record.id),
      }, {
        service: 'hap-user-service.client.delete',
        icon: 'delete_forever',
        text: '删除',
        action: this.handleOpen.bind(this, record.id),
      }]
    }
  />
  ...
)
```

参数 | 说明
--- | ---
service | 该按钮具有的permision字段， 如果没有权限则不显示该按钮
icon | 图标
text | 按钮文字
action | 点击之后的事件