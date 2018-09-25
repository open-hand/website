+++
title = "LDAP"
weight = 5
description = "是对组织应用的LDAP信息设置的管理"
+++

# LDAP

LDAP是轻量目录访问协议。LDAP管理是对组织应用的LDAP信息设置的管理。LDAP只针对LDAP用户，LDAP用户的登录名和密码取自LDAP指向的外部系统中的数据。

组织下的LDAP属于该组织。LDAP设置包括服务器设置和用户属性设置两种LDAP信息设置，且有LDAP连接测试和LDAP用户同步这两种功能。用户可以使用测试连接功能来检测LDAP服务器是否可以连通以及是否可以正常获取用户属性值。用户可以使用同步用户功能来将LDAP服务器中的用户信息同步到平台中。

  - **菜单层次**：组织层
  - **菜单路径**：组织管理 > LDAP
  - **默认角色**：组织管理员

## 修改LDAP

#### 服务器设置

  ![](/docs/user-guide/system-configuration/tenant/image/setting-server.png)

1. 目录类型：平台目前提供了两种常用的目录类型可供选择。

    - Microsoft Active Director：微软Windows Server中，负责架构中大型网络环境的集中式目录管理服务。

    - OpenLDAP：由OpenLDAP项目开发的轻量级目录访问协议（LDAP）的免费开源实现。

1. 主机名：运行 LDAP 的服务器主机名。例如，ldap.example.com。
1. 是否使用SSL：此选项会影响端口号。
1. 端口号：使用SSL时，端口号是636，不使用SSL时，端口号是389。
1. 基准DN：从LDAP根节点搜索用户。例如，cn=users，dc=example，dc=com。
1. 管理员登录名：拥有LDAP管理员权限的用户登录到 LDAP的登录名。例如，user@domain.name 或 cn =用户， dc =域、dc =名称。
1. 管理员密码：拥有LDAP管理员权限的用户登录到LDAP的密码。

#### 用户属性设置

  ![](/docs/user-guide/system-configuration/tenant/image/setting-attribute.png)

1. 用户对象类:加载用户时使用的LDAP用户对象类。
1. 登录名属性：与平台中用户的登录名相匹配的LDAP字段。例如，cn、sAMAccountName、LoginName。
1. 邮箱属性：与用户的邮箱属性相匹配的LDAP字段。例如，email。
1. 用户名属性：与用户的用户名相匹配的LDAP字段。例如，username。
1. 手机号属性：与用户的手机号相匹配的LDAP字段。例如，phonenumber。

## 测试连接

测试连接时，用户首先需要进行LDAP认证登录。

- LDAP登录名：登录LDAP系统进行LDAP用户认证时需要填写的登录名。
- LDAP登录密码：登录LDAP系统进行LDAP用户认证时需要填写的密码。

用户认证通过后可以进行LDAP基础连接和用户属性的校验。

## 同步用户

如果LDAP基础连接和用户属性校验通过。即可同步LDAP服务器中的用户信息至平台。

## 启用/停用LDAP

用户停用LDAP后，之前所同步的用户将无法登录平台，且之后无法继续同步用户和测试连接。启用后恢复正常登录和功能可用。

## 更多操作
- [项目管理](../project)
- [用户管理](../user)
- [密码策略](../secret_policy)
