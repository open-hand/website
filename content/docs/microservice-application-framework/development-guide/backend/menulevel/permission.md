+++
title = "@Permission注解使用说明"
date = "2017-02-01"
draft = false
+++

# @Permission注解使用说明

## 功能简介

设置API访问权限。

## 属性说明

![](./images/permission.png)

- roles：设置可访问用户角色，此为数组，可以设置多个角色。
- level：设置可访问层级资源。
    * 取值范围：
        - project：访问项目层级
        - resource：访问资源层级
        - organization：访问组织层级
- permissionLogin：设置是否需要登录访问。
- permissionPublic：设置任意访问（极少使用）。

## 使用方法

在Controller中的API上添加@Permission注解，按需求设置值：

```java
@Permission(permissionLogin = true)
@ApiOperation(value = "创建user")
@RequestMapping(value = "/create", method = RequestMethod.POST)
public ResponseEntity<TodoUser> create(@RequestBody @Valid TodoUser user) throws HapException {
……
}
```