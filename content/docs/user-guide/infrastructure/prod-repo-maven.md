+++
title = "制品库管理-Maven"
description = ""
weight = 1
+++

# 通用

## 1. 概述

统一制品库（Maven）主要用来管理Maven包，项目所有者可创建Maven仓库，给项目成员分配权限，拥有权限的用户可以上传、查看包。

## 2. 前置条件

具有管理项目制品库的权限，例如项目所有者。各角色所拥有权限详情如下：

* 项目成员：查看Maven仓库列表、查看包列表、查看配置指引、查看权限列表
* 项目所有者：创建Maven仓库、查看Maven仓库、查看包列表、查看操作日志
* 项目所有者&&制品库权限角色为“项目管理员”：还可以分配用户权限、修改Maven仓库、删除/上传包
* 组织管理员：查看Maven仓库列表、查看包列表、查看权限列表、查看操作日志

## 3. 添加自定义nexus服务

`创建maven制品仓库时，可以使用默认的nexus服务，若不想使用Choerodon默认的nexus服务。也可以在该项目下添加nexus服务使用，添加服务要求版本在3.21.0及其以上`
1. 进入项目层菜单“基础>制品库管理”，点击`自定义nexus服务`，可看到当前项目下nexus服务列表
2. 字段描述
    1. 服务名称： 该服务的名称
    2. 服务地址：nexus服务的访问地址。如：http://192.168.179.2:8081
    3. 管理用户：管理员用户（admin）
    4. 用户密码：管理用户的密码
    5. 是否启用匿名访问控制：是/否，若开启访问控制，则在创建maven库时，可以做是否可匿名的配置。当选择【是】时，需要参照【匿名访问控制说明】在nexus服务上做相应的配置。当选择【否】时，不需要额外配置
    6. 匿名用户：开启匿名访问控制时，需要配置
    7. 匿名用户对应角色：开启匿名访问控制时，需要配置

![image](/docs/user-guide/infrastructure/image/prod-repo/nexusCreate.png)

## 4. 创建Maven仓库

1. 进入项目层菜单“基础>制品库管理”，点击`创建制品库`
2. 选择制品库类型为“Maven”，选择“创建仓库”
3. 字段描述
    1. 仓库类型：本地仓库（hosted）、代理仓库（proxy）、仓库组（group）
    2. 仓库策略：RELEASE、SNAPSHOT、MIXED
    3. 仓库名称：仓库的唯一标识
    4. 版本策略：允许覆盖、禁止覆盖、只读（向nexus服务发布jar包时，使用的策略）
    5. 是否允许匿名访问：当启用的nexus服务(可在`自定义nexus服务`查看当前使用的nexus服务)，开启了【匿名访问控制】时。可做该配置
4. 创建后，会在nexus服务生成相应账号，并赋予当前用户该仓库的访问权限。登录名为Choerodon登录名，生成默认随机密码（个人信息>个人设置>制品库设置TAB可查看）
 
![image](/docs/user-guide/infrastructure/image/prod-repo/mavenRepoCreate.png)

## 5. 关联Maven仓库

1. 功能描述：当nexus服务上已经创建了仓库，若想要将让仓库在Choerodon上管理，则可以使用`关联仓库`功能
2. 字段描述
    1. 仓库列表：需要纳入在该项目下管理的仓库
    2. 管理员用户：管理员用户名
    3. 密码： 管理员用户的密码

![image](/docs/user-guide/infrastructure/image/prod-repo/mavenRepoRelate.png)


## 6. 修改Maven仓库

1. 在制品库列表，选择操作`修改配置`
2. 本地仓库（hosted）修改字段
    - 仓库策略
    - 匿名访问控制
    
![image](/docs/user-guide/infrastructure/image/prod-repo/mavenRepoUpdateHosted.jpg)

3. 代理仓库（proxy）修改字段
    - 代理仓库地址
    - 代理仓库用户名/密码
    - 匿名访问控制

![image](/docs/user-guide/infrastructure/image/prod-repo/mavenRepoUpdateProxy.jpg)    

4. 仓库组（group）修改字段
    - 仓库组成员
    - 匿名访问控制

![image](/docs/user-guide/infrastructure/image/prod-repo/mavenRepoUpdateGroup.jpg)


## 7. 仓库失效/启用

1. 在制品库列表，选择操作`失效/启用仓库`
    - 失效：分配的用户权限会失效掉。同时将禁止更新、分配用户权限等操作
    - 启用：将该仓库先前分配的用户权限重新赋予、同时将禁用的操作限制放开

## 8. 包管理

1. 在制品库列表，点击进入详情页，选择`包列表`tab页
2. 包管理提供：包列表查询、包列表删除、如何引用该jar包的配置指引、如何向该仓库发布jar包的配置指引等功能

![image](/docs/user-guide/infrastructure/image/prod-repo/mavenComponentGuid.jpg)


## 9. 权限管理

1. 在制品库列表，点击进入详情页，选择`用户权限`tab页
2. 包管理提供功能
    - 分配权限：点击`添加成员`，可以进行权限分配，选择用户信息、权限角色、过期时间即可。
    - 更新权限：可修改权限信息
    - 删除权限：可删除分配权限。 制品库创建者的权限信息不可更改也不可删除
3. 分配权限时，可分配以下角色权限
    - 仓库管理员：push包、pull包、删除包、修改仓库配置(且用户同时是项目所有者)、管理用户权限(且用户同时是项目所有者)、查看日志
    - 开发人员：push包、pull包、删除包
    - 访客：pull包

![image](/docs/user-guide/infrastructure/image/prod-repo/mavenAuth.jpg)

## 10. 操作日志

1. 在制品库列表，点击进入详情页，选择`操作日志`tab页
2. 操作日志记录该仓库权限分配更新的操作日志
