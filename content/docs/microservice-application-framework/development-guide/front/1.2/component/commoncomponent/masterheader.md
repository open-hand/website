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
    component: <LeftIconButton history={this.props.history} />,
    style: {
      padding: '0',
    },
  }, {
    component: <MenuType
      projectFlag={this.state.projectFlag}
      organizationFlag={this.state.organizationFlag}
    />,
    style: {
      marginLeft: '14px',
      padding: '4px 10px 4px 10px',
    },
    hoverIf: true,
  }, {
    component: <RightIconButton />,
    style: {
      marginLeft: 'calc(2rem - 10px)',
      marginRight: '-20px',
      padding: '4px 10px 4px 10px',
    },
    hoverIf: true,
  }, {
    component: <div />,
    style: {
      flex: 1,
      display: 'block',
      visibility: 'hidden',
    },
    hoverIf: false,
  },{
    component: <Tooltip placement="bottom" title={'全屏'}>
      <span className="icon-zoom_out_map fullbutton" onClick={HAP.fullscreen} />
    </Tooltip>,
    hoverIf: false,
  },{
    component: <UserPreferences imgUrl={imgUrl} />,
    style: {
      paddingRight: '2rem',
    },
    hoverIf: false,
  }]}
/>
...
```

参数 | 说明
--- | ---
component |  封装的组件，用于按次序放入头部
style | 组件的样式
hoverIf | 鼠标悬停组件是否出发hover事件