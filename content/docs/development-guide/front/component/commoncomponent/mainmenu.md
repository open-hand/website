+++
title = "开放master之CommonMenu组件"
date = "2017-09-29"
draft = false
weight= 8
+++

# 开放master之CommonMenu组件

## 用途
CommonMenu组件集成了所有菜单资源，用于用户选择查看当前菜单，通过管理设置里的菜单配置层级，可动态显示自定义菜单层级。
![](../images/commonmenu2.jpg)

## 用法
通过组件头部引入，直接调用
```
...
import CommonMenu from 'CommonMenu'
...
return(
  <CommonMenu />
)
```