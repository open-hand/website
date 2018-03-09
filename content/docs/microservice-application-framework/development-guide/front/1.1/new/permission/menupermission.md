+++
title = "菜单权限"
data = "2017-10-20"
draft = false
weight= 2
+++

# 菜单权限
菜单权限为在当前项目下判断用户是否有显示该菜单的权限
(注: 使用菜单权限前确保点击菜单进入的页面使用至少一个权限组件)

## 菜单权限配置文件
在当前模块`src/app/模块名/common`目录下新建Permission.js文件

以iam模块为例，iam模块下的菜单权限配置文件看起来是这样的
```
const Permission = {
  'hap-user-service.client': ['hap-user-service.client.update', 'hap-user-service.client.delete'],
  'hap-user-service.excel': ['hap-user-service.excel.select', 'hap-user-service.excel.create'],
  'hap-user-service.ldap': ['hap-user-service.ldap.updateSelf'],
  'hap-user-service.organization': ['hap-user-service.organization.updateSelf'],
  'hap-user-service.password-policy': ['hap-user-service.password-policy.updateSelf'],
  'hap-user-service.role': ['hap-user-service.role.update', 'hap-user-service.role.delete'],
  'hap-user-service.service': ['hap-user-service.service.self'],
  'hap-user-service.user': ['hap-user-service.user.updateUser', 'hap-user-service.user.create', 'hap-user-service.user.delete'],
  'hap-user-service.project': ['hap-user-service.project.crete', 'hap-user-service.project.update', 'hap-user-service.project.delete'],
  'hap-user-service.member-role-organization': ['hap-user-service.member-role-organization.create', 'hap-user-service.member-role-organization.delete', 'hap-user-service.member-role-organization.setMemberRole'], //  组织菜单=》用户服务=》角色分配
  'hap-user-service.member-role-project': ['hap-user-service.member-role-project.create', 'hap-user-service.member-role-project.delete', 'hap-user-service.member-role-project.setMemberRole'],
  'hap-user-admin-service.organization': ['hap-user-admin-service.organization.create'],
  'hap-user-service.userLabel': ['hap-user-service.client.update', 'hap-user-service.client.delete'],
};

export default Permission;

```
13个键值对对应13个菜单，每个菜单的键名为后端api分配的不同菜单code，可从不同服务菜单api查看。

不同菜单对应的属性值为页面中权限组件的service字段数组。

以`hap-user-service.client`客户端菜单为例

客户端菜单页面具有一个创建菜单功能

查看创建菜单接口`swagger`在`client-controller`并具有`create`的action值

则创建权限为`hap-user-service.client.create`

系统会检测当前用户在菜单页面如果至少具有一个权限，则显示该菜单，没有则不显示。
