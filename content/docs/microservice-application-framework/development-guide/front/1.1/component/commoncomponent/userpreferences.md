+++
title = "开放master之UserPreferences组件"
date = "2017-09-29"
draft = false
weight= 7
+++

# 开放master之UserPreferences组件

## 用途
UserPreferences组件用于登出用户和设置用户首选项

![](../images/userpreferences.jpg)

## 用法
在组件头部引入后直接调用
```
...
import UserPreferences from 'UserPreferences';
...
return(
  <UserPreferences
    imgUrl={imgUrl}
  />
)
```

该组件携带一个`imgUrl`参数，传入一个图片url地址用于替换显示头像，如果不填则显示系统默认头像