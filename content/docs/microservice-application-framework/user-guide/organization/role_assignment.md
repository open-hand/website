+++
title = "角色分配"
weight = 4
+++

# 角色分配（组织层）

在组织层的角色分配中，不能给用户分配全局层的角色，即用户没有作用于全局层的功能权限，只有作用于组织层和项目层的功能权限。

> 注意：所有系统用户初始都被分配了默认的**运营组织**的**组织查看者**的角色

**功能：**

- [角色分配（组织层）可选角色](#1)
- [分配角色](#2)
- [更改角色](#3)
- [其他操作](#4)


<h2 id="1">角色分配（组织层）可选角色</h2>

- 用户服务
    - 用户服务组织管理员：**组织层**可进入单个组织界面（默认为运营组织）且有组织层【用户服务】所有功能权限-可管理用户、项目、用户组、客户端、LDAP、密码策略、角色分配（组织层）；**项目层**可进入所有项目的单个项目界面，具有项目层【用户服务】所有功能权限-可角色分配（项目层）
    - 用户服务组织维护者
    - 用户服务项目管理员：**组织层**只有【项目】项目管理功能权限；**项目层**具有【用户服务】所有功能权限-可角色分配（项目层）
    - 组织查看者：**组织层**只可进入单个组织界面（默认为运营组织）而无任何功能权限
    - 项目查看者：**组织层**可进入【项目】项目管理界面查看项目列表而无操作权限；**项目层**可进入所有项目的单个项目界面而无任何功能权限

- 部署管理
    - 部署管理员：**组织层**可进入单个组织界面（默认为运营组织）且有组织层【部署管理】所有功能权限-可资源管理、网关管理、域名管理、服务管理、服务部署、部署详情（阶段及日志）、设置自动部署

- 运营监控
    - 运营监控查看者：全流程信息监控查看。**组织层**可进入单个组织界面（默认为运营组织）且有组织层【智能监控】所有功能权限-性能监控、模板控制、指标控制

- 移动管理
    - 移动开发管理员：**组织层**可进入单个组织界面（默认为运营组织）且有组织层【移动管理】所有功能权限-APP管理、模块管理

- 文件管理
    - 文件管理员：有文件上传下载接口的权限

- 系统
    - 框架服务组织管理员

- 自定义角色
    - 在全局层具有角色管理的用户在创建组织层角色后，该角色将会在自定义角色中显示
    - 例如：定义了一个组织层角色-项目创建者，该角色权限如下。用户被分配项目创建者角色后，**组织层**可进入单个组织界面（默认为运营组织）且有组织层【用户服务】的【项目】、【用户】、【用户组】功能权限，和组织层【开发管理】的【环境】功能权限

权限名称 | 权限描述| 权限层级
--- | --- | ---
hap-user-service.password-policy.queryOrganization | 查询目标组织密码策略 | organization
hap-devops-service.environment.listEnvironment | 查询全部环境信息 | organization
hap-devops-service.environment.createEnvironment | 创建环境 | organization
hap-devops-service.environment.checkEnvironmentByName | 检查环境名是否可用 | organization
hap-devops-service.environment.listEnvironmentByPageSize | 分页查询环境信息 | organization
hap-devops-service.environment.getEnvironmentByEnvironmentId | 环境管理详情 | organization
hap-devops-service.environment.updateEnvironment | 更新环境 | organization
hap-devops-service.environment.deleteEnvironmentByEnvironmentId | 删除环境 | organization
hap-devops-service.project.checkProject | 校验项目code,name是否重复 | organization
hap-user-service.project.select | 分页查询项目 | organization
hap-user-service.project.create | 添加项目，organization id不需要，强制当前用户所属organization | organization
hap-user-service.project.checkProjectCode | checkProjectCode | organization
hap-user-service.project.queryOrganizationProject | 根据组织id查询项目 | organization
hap-user-service.user.select | 分页查询 | organization
hap-user-service.user.create | 新增用户 | organization
hap-user-service.user.query | 根据删除组织下所有用户 | organization
hap-user-service.user.updateUser | 通过用户id查询用户 | organization
hap-user-service.organization.query | 根据组织id查询组织 | organization
hap-user-service.role.selectOrganizationRole | 查询可分配组织角色列表 | organization
hap-user-service.project.update | 根据id修改项目信息，只能修改自己组织项目 | organization

<h2 id="2">分配角色</h2>

1. 点击【添加】

    ![分配角色](../images/2-7.2_1.png)

1. 输入成员（用户：用户名），选择角色

    ![分配角色](../images/2-7.2_2.png)

<h2 id="3">更改角色</h2>

- 点击角色名，出现下图列表即可继续角色更改

![更改角色](../images/2-7.2_3.png)

> 注意：对已存在在角色分配列表里的成员，若进行**添加**操作会报错（因为**添加**操作是对没有被分配过角色的成员进行的），而应在更新操作中进行角色的更改

![已被分配角色的成员无法进行添加操作](../images/2-7.2_4.png)

![已被分配角色的成员只能进行更改操作](../images/2-7.2_5.png)

<h2 id="4">其他操作</h2>

- **删除角色分配：**可删除角色分配列表中的数据

![删除角色分配](../images/2-7.3_1.png)

- **查看角色分配：**可按成员/角色方式查看

![角色分配查看方式](../images/2-7.2_2.png)

- **搜索角色分配：**可根据搜索条件查找角色分配列表的数据项
    - 不选择属性，根据输入值进行全局搜素
    - 选择一个属性：类型（用户/服务）、成员、昵称，输入相应属性值进行模糊搜索
