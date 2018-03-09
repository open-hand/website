+++
title = "NewButton 按钮组件"
date = "2017-02-01"
draft = false
weight= 9
+++

# NewButton 按钮组件

## 用途
NewButton组件为封装的框架统一按钮组件，通过一系列参数配置可实现按钮基础功能效果。

![](../images/button.jpg)

## 用法
在组件头部引用后直接调用
```
...
import NewButton from 'NewButton'
...
return (
  ...
  <NewButton
    text: '创建',
    htmlType: 'button',
    width: '100px',
    height: '100px',
    className: 'color2',
    style: {},
    onClick: PropTypes.func,
    icon: 'playlist_add',
    disabled: false,
    loading: false,
    loadingRender: PropTypes.func,
  />
  ...
)
```

参数 | 说明
--- | ---
text | 按钮的文字内容
htmlType | 按钮的类型 `submit`/`button`/`reset`
width | 按钮的宽度
height | 按钮的高度
className | 按钮的class名 默认有三种 `color2`/`color3`/`color4`
style | 按钮的样式
onClick | 按钮的点击事件
icon | 按钮内部的图标
disabled | 按钮是否不可点击
loading | 按钮是否是加载中
loadingRender | 自定义按钮加载样式，不填为默认