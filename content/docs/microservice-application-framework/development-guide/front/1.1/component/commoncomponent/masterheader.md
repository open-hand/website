+++
title = "开放master之MasterHeader组件"
data = "2017-09-29"
draft = false
weight= 5
+++

# 开放master之MasterHeader组件

## 头部标题栏展示
MasterHeader组件用于自定义头部标题栏
![](../images/masterheader.jpg)
如上图头部蓝色部分

## 使用方法
在组件头部引入MasterHeader
```
...
import MasterHeader from 'MasterHeader';
...
```
在组件return中引入该组件
```
...
return(
...
<MasterHeader />
...
)
...
```
## 组件参数
MasterHeader默认携带一个menuChild参数，该参数是一个对象数组,用于给菜单栏添加多个菜单列表

例子：
```
...
<MasterHeader
  menuChild={[{
    component: <LeftIconButton />,
    style: {},
  }, {
    component: <MenuTitle />,
    style: {},
  }, {
    component: <MenuType
      projectFlag={this.state.projectFlag}
      organizationFlag={this.state.organizationFlag}
    />,
    style: {},
  }, {
    component: <UserPreferences />,
    style: {
      float: 'right',
      paddingTop: '6px',
      paddingRight: '0px',
    },
  }]}
/>
...
```
一个数组对象带一个component参数和style参数

component参数定义该菜单项的组件， 需要在页面头部引入该组件

style定义该菜单项的样式