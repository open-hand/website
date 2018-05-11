+++
title = "LDAP管理"
weight = 3
+++

# LDAP

LDAP管理是对组织应用的LDAP信息设置的管理。LDAP只针对LDAP用户，LDAP用户的登录名和密码取自LDAP指向的外部系统中的数据。

**层级：**

- 组织层

<h2 id="1">修改LDAP</h2>

必填字段：

- LDAP名称：通过应用LDAP访问LDAP 目录服务器中注册的用户、群组条目，方便统一管理用户的密码登陆方式

选填字段：

- 服务器地址：LDAP要访问的服务器地址
- LDAP属性名：要访问的数据的名称
- 加密方式：分为SSL、TSL、STARTTLS三种
- 基础DN：获取数据的路径
- 描述：对该LDAP得附加信息
