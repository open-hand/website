+++
title = "开放master之UserPreferences组件"
date = "2017-09-29"
draft = false
weight= 7
+++

# 开放master之UserPreferences组件

## 用途
UserPreferences组件用于登出用户和设置用户首选项

![](../images/user2.jpg)

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

参数 | 说明
--- | ---
imgUrl | 传入对应后端返回的头像字段(注意将字段保存在前端store中，避免在个人中心成功上传头像，页面不会动态刷新的问题)
