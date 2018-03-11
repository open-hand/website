+++
title = "开放master之AutoRouter组件"
date = "2017-09-29"
draft = false
weight= 9
+++

# 开放master之AutoRouter组件

## 用途
AutoRouter是用于存放各个模块的路由配置，通过引入AutoRouter，可灵活配置路由切换，页面展示的区域

## 用法
通过组件头部引入，直接调用
```
...
import AutoRouter from 'AutoRouter'
...
return(
  <AutoRouter />
)
...
```