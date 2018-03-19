+++
title = "系统配置"
description = ""
weight = 1
+++

# 系统配置
  
  本页面介绍了用户使用系统功能前需要进行的系统配置，以便不同用户可以进行[敏捷管理](../scrum)、[持续集成](../continuous-integration)、[持续部署](../continuous-deployment)等操作。该系统配置基本由平台管理员、项目创建者、项目所有者等高权限角色完成。每个模块都包含其概念定义、主要功能及其他注意事项。使用本页面，你可以了解：

   - [角色管理](#1)
   - [用户管理](#2)
   - [角色分配](#3)
   - [项目管理](#4)
   - [环境管理](#5)
   - [用户组管理](#6)



<h2 id="1">角色管理</h2>
  
  角色是一组权限的集合。当用户进行某些操作时，系统会检查该用户拥有的角色里是否具有对应的操作权限，因此需要根据实际系统使用情况设置角色。给用户分配角色后，用户即拥有对应的操作权限。该模块将详细介绍如何管理角色。
  
  - **菜单层次**：全局层
  - **菜单路径**：管理 > 角色
  - **默认角色**：平台管理员

### 创建角色

   1. 点击 `创建` ，输入 “角色名” ， “角色编码” ，设置是否可编辑以及是否启用。

      ![](../assets/system-configuration/添加权限.png)

   1. 点击 `添加权限`，勾选所需相应权限，点击 `确定` ，进行创建角色。
      
      ![](../assets/system-configuration/确定权限.png)

### 编辑角色权限配置

   1. 针对已存在的角色，点击 `编辑` ，或者从详情界面点击 `编辑` 。

      ![](../assets/system-configuration/编辑角色.png)

   1. 点击 `添加权限`，对角色相关信息进行修改，以及权限进行修改 。

      ![](../assets/system-configuration/修改添加权限.png)

   1. 点击 `确定`，添加或删除一个或多个权限 。

      ![](../assets/system-configuration/确定修改权限.png)

### 停用/启用角色
 
   点击 `停用` ，该角色将不可分配给用户。

   点击 `启用` ，该角色正常使用，可以分配给相应用户。

   ![](../assets/system-configuration/停用角色.png)

### 角色权限添加说明
   
   注：下表为系统使用前需手动添加的角色权限列表
   
   角色名称 | 权限名称 | 权限描述 | 权限层级
   --- | --- | --- | ---
   项目创建者 | hap-user-service.password-policy.queryOrganization | 查询目标组织密码策略 | organization
   项目创建者 | hap-devops-service.environment.listEnvironment | 查询全部环境信息 | organization
   项目创建者 | hap-devops-service.environment.createEnvironment | 创建环境 | organization
   项目创建者 | hap-devops-service.environment.checkEnvironmentByName | 检查环境名是否可用 | organization
   项目创建者 | hap-devops-service.environment.listEnvironmentByPageSize | 分页查询环境信息 | organization
   项目创建者 | hap-devops-service.environment.getEnvironmentByEnvironmentId | 环境管理详情 | organization
   项目创建者 | hap-devops-service.environment.updateEnvironment | 更新环境 | organization
   项目创建者 | hap-devops-service.environment.deleteEnvironmentByEnvironmentId | 删除环境 | organization
   项目创建者 | hap-devops-service.project.checkProject | 校验项目code,name是否重复 | organization
   项目创建者 | hap-user-service.project.select | 分页查询项目 | organization
   项目创建者 | hap-user-service.project.create | 添加项目，organization id不需要，强制当前用户所属organization | organization
   项目创建者 | hap-user-service.project.checkProjectCode | checkProjectCode | organization
   项目创建者 | hap-user-service.project.queryOrganizationProject | 根据组织id查询项目 | organization
   项目创建者 | hap-user-service.user.select | 分页查询 | organization
   项目创建者 | hap-user-service.user.create | 新增用户 | organization
   项目创建者 | hap-user-service.user.query | 通过用户id查询用户 | organization
   项目创建者 | hap-user-service.user.updateUser | 根据id修改用户 | organization
   项目创建者 | hap-user-service.organization.query | 根据组织id查询组织 | organization
   项目创建者 | hap-user-service.role.selectOrganizationRole | 查询可分配组织角色列表 | organization
   项目创建者 | hap-user-service.project.update | 根据id修改项目信息，只能修改自己组织项目 | organization
   项目所有者 | hap-user-service.project.query | 按照Id查询项目，只能查询自己组织项目 | project
   项目所有者 | hap-user-service.member-role-project.select | 查询项目成员角色 | project
   项目所有者 | hap-user-service.member-role-project.create | 项目层新增成员角色 | project
   项目所有者 | hap-user-service.member-role-project.update | 更新项目层成员角色 | project
   项目所有者 | hap-user-service.member-role-project.createSingle | 项目层新增成员角色 | project
   项目所有者 | hap-user-service.member-role-project.delete | 删除项目层成员角色 | project
   项目所有者 | hap-user-service.role.selectProjectRole | 查询可分配项目角色列表 | project
   项目所有者 | hap-user-service.role.selectProjectRoleGroupByService | 查询可分配项目角色列表（查询结果以服务分组） | project
   源代码管理员 | hap-user-service.project.query | 按照Id查询项目，只能查询自己组织项目 | project
   项目成员 | hap-user-service.project.query | 按照Id查询项目，只能查询自己组织项目 | project
   看板所有者 | hap-user-service.project.query | 按照Id查询项目，只能查询自己组织项目 | project
   看板成员 | hap-user-service.project.query | 按照Id查询项目，只能查询自己组织项目 | project
   开发监控 | hap-user-service.project.query | 按照Id查询项目，只能查询自己组织项目 | project
   部署管理员 | hap-user-service.groups.select | 查询Group | organization
   部署管理员 | hap-user-service.groups.create | 创建Group | organization
   部署管理员 | hap-user-service.groups.query | 查询Group | organization
   部署管理员 | hap-user-service.groups.update | 更新Group | organization
   部署管理员 | hap-user-service.groups.delete | 删除Group | organization
   部署管理员 | hap-user-service.user-groups.insertUserGroups | 创建userGroups | organization
   部署管理员 | hap-user-service.user-groups.delete | 删除userGroups | organization

<h2 id="2">用户管理</h2>
  
  该模块提供用户管理功能，可以新建用户，进行用户信息维护等。用户也可由其他系统批量导入。

  - **菜单层次**：组织层
  - **菜单路径**：IAM > 用户管理
  - **默认角色**：平台管理员、项目创建者

### 新建用户

   1. 点击`创建`按钮。

      ![](../assets/system-configuration/创建用户.png)

   1. 输入用户相关信息，点击`创建`按钮，完成创建。

      ![](../assets/system-configuration/填写信息创建用户.png)

   1. 新建的用户“张三”在用户列表中显示，gitlab自动生成同样的用户“张三”。

      ![](../assets/system-configuration/新用户创建成功.png)

### 查看用户详情

   1. 点击`详情`，进入用户详情界面。

      ![](../assets/system-configuration/点击用户详情.png)

   1. 查看所需信息。

      ![](../assets/system-configuration/用户详细信息.png)

### 编辑用户信息

   1. 点击`编辑`，进入用户编辑界面。或如上一条示例从用户详情界面点击`编辑`按钮，进入用户编辑界面。

      ![](../assets/system-configuration/点击用户编辑.png)
  
   1. 对用户信息进行修改，点击`保存`按钮，用户信息修改完成。

      ![](../assets/system-configuration/保存用户信息编辑.png)

### 删除用户

   1. 点击`删除`。

      ![](../assets/system-configuration/点击删除用户.png)

   1. 再次点击`删除`按钮，用户删除成功。

      ![](../assets/system-configuration/确认删除用户.png)

<h2 id="3">角色分配</h2>
  
  角色分配是面向平台管理员、项目所有者提供的权限管理，可以在组织或项目内添加成员，为其分配适当的角色，也可以调整现有成员的角色，从而使这些成员可以有适当的权限使用对应的资源。注意：需选择对应的组织或项目后再进入角色分配，其角色控制范围不同。

  - **菜单层次**：组织层/项目层
  - **菜单路径**：IAM > 角色分配
  - **默认角色**：平台管理员、项目所有者 

### 添加角色

   1. 若需要分配的用户不在该组织/项目中，点击 `添加` 按钮进行角色添加。

      ![](../assets/system-configuration/添加角色.png)

      例如：当用户“25777”不属于“演示项目0131”项目时，点击`添加`，输入用户名，为该用户分配角色权限。

      ![](../assets/system-configuration/添加成员.png)

   1. 若用户存在于成员角色管理列表中，无需点击 `添加` ，点击 `▼` ，选择一个或多个角色进行分配。

      ![](../assets/system-configuration/分配成员角色.png)

      例如，创建用户完成后，平台会自动分配 “组织查看者” 的角色，该用户存在于成员角色管理列表中，直接进行角色分配，点击 `保存` 按钮，完成角色修改。

      ![](../assets/system-configuration/创建完成示例.png)

      ![](../assets/system-configuration/保存角色分配.png)

   _小tips：找不到用户怎么办？  
   直接在搜索框内输入用户名或昵称，回车一下即可显示搜索结果。_
   
   ![](../assets/system-configuration/搜索用户.png)

  注：**角色权限列表**
  
  下表为目前平台使用的常见角色及对应功能

   角色 | 权限 | 层级
   --- | --- | ---
   平台管理员 | 菜单管理、角色管理、用户管理（初始化导入）、角色分配（组织层）及除服务发布之外所有功能 | 系统层/组织层/项目层
   项目创建者 | 用户管理、项目管理、环境管理、用户组管理 | 组织层
   部署管理员 | 资源管理、网关管理、域名管理、服务管理、服务部署、部署详情（阶段及日志）、设置自动部署 | 组织层
   项目所有者 | 角色分配（所在项目下）服务创建、服务详情查看、分支管理、服务版本、代码质量查看、服务发布、设置自动发布 | 项目层
   源代码管理员 | 服务创建、服务详情查看、分支管理、服务版本、代码质量查看、服务发布 | 项目层
   项目成员 | 服务详情查看、分支管理、服务版本、代码质量查看、服务发布 | 项目层
   看板项目所有者 | 故事管理、冲刺管理、任务和缺陷 | 项目层
   看板项目成员 | 故事管理、冲刺管理、任务和缺陷 | 项目层
   开发监控查看者 | 全流程信息监控查看 | 项目层

### 删除角色

   1. 点击 `删除` 。

      ![](../assets/system-configuration/点击删除角色.png)

   1. 点击 `删除` ，用户从该组织/项目移除成功。

      ![](../assets/system-configuration/删除角色.png)

<h2 id="4">项目管理</h2>
  
  根据企业产品研发情况拆分团队，建议采用敏捷项目管理团队为一个项目单位，项目管理可以提供项目创建、项目查询、项目编辑等功能。
  
  - **菜单层次**：组织层
  - **菜单路径**：IAM > 项目。
  - **默认角色**：平台管理员、项目所有者

### 新建项目

   1. 点击 `创建` 按钮。

      ![](../assets/system-configuration/创建项目.png)

   1. 输入 “项目编码” 和 “项目名称” ，点击 `创建` 按钮。

      ![](../assets/system-configuration/输入项目信息创建项目.png)

   1. 新建项目 `“演示0131”` 已在项目管理列表中， gitlab自动对应生成group `“演示0131”` 。

      ![](../assets/system-configuration/新创建项目示意.png)

### 编辑项目信息

   1. 点击 `编辑` ，进入项目编辑界面。

      ![](../assets/system-configuration/编辑项目信息.png)

   1. 对 `“项目名称”` 进行修改，点击 `保存` 按钮。

      ![](../assets/system-configuration/保存项目信息.png)

### 禁用/启用项目

  点击 `禁用` ，项目禁用后，该项目下的其他操作将无法进行。

  ![](../assets/system-configuration/禁用项目.png)

  点击`启用`，启用后，该项目恢复正常使用。

  ![](../assets/system-configuration/启用项目.png)

<h2 id="5">环境管理</h2>
  
  环境管理是面向平台管理员、项目创建者和项目所有者根据不同用途配置相对应的环境信息。可以创建环境，删除环境，及对环境详情信息进行编辑修改。
  
  平台管理员 、项目创建者可以从组织层管理某组织的环境信息，这些环境会继承到该组织下的所有项目；项目所有者可以从项目层管理某项目的环境信息，由项目层创建的这些环境也会显示在对应的组织层；源代码管理员、项目成员仅可以从项目层查看该项目可用的环境列表（包括该项目上创建的及由组织上继承的）。
  
  常见环境包含：测试环境，UAT环境及正式环境等。

  - **菜单层次**：组织层/项目层
  - **菜单路径**：开发管理 > 环境
  - **默认角色**：平台管理员、项目创建者、项目所有者、源代码管理员、项目成员

### 创建环境

   1. 点击 `创建` 按钮。

      ![](../assets/system-configuration/创建环境.png)

   1. 输入 “环境名称” 、 “环境地址” 以及 “环境密钥” ，点击 `测试连接` ，若环境地址、秘钥配置正确，会提示“连接成功”；若看到提示信息为“连接失败”，请修改为正确的环境地址或秘钥，点击 `创建` 按钮。

      ![](../assets/system-configuration/测试环境链接.png)

### 编辑环境信息

   1. 点击 `编辑` ，进入环境编辑界面。

      ![](../assets/system-configuration/点击编辑环境.png)

   1. 对环境信息进行修改，如环境名称，点击 `保存` 按钮，修改完成。

      ![](../assets/system-configuration/保存环境修改.png)

   1. “环境名称” 修改完成。

      ![](../assets/system-configuration/环境修改完成.png)

### 停用/启用环境

   1. 点击 `停用` 。环境 “Charlietest” 已停用，停用后，该环境将不可使用。

      ![](../assets/system-configuration/停用环境.png)

      ![](../assets/system-configuration/环境被停用.png)

   1. 点击 `启用` 。环境 “Charlietest” 已启用，启用后，该环境可正常使用。

      ![](../assets/system-configuration/启用环境.png)

      ![](../assets/system-configuration/环境被启用.png)

### 环境删除

   1. 点击 `删除` 。

      ![](../assets/system-configuration/删除环境.png)

   1. 再次确认，点击 `删除` 。

      ![](../assets/system-configuration/确认删除环境.png)

<h2 id="6">用户组管理</h2>

  用户组是将不同群体的用户进行分类组合，主要用于灰度部署时选择个别用户组进行测试验证。用户组管理包括创建、编辑、删除用户组及管理该用户组的用户。

  - **菜单层次**：组织层
  - **菜单路径**：用户管理 > 用户组
  - **默认角色**：平台管理员、部署管理员

### 创建用户组

   点击 `创建` ，输入 “用户组编码” ， “用户组名” ，“用户组描述” ，点击 `创建` ，用户组创建完成。

   ![](../assets/system-configuration/创建用户组.png)

### 编辑用户组

   1. 点击 `编辑` 。

      ![](../assets/system-configuration/编辑用户组.png)

   1. 修改用户组信息，点击 `编辑` 。

      ![](../assets/system-configuration/修改用户组.png)

### 管理用户组用户 

   1. 点击 `添加用户` 。

      ![](../assets/system-configuration/用户组添加用户.png)

   1. 点击 `添加` ，勾选需要添加到该用户组的用户。如需删除用户则取消勾选即可。

      ![](../assets/system-configuration/用户组勾选用户.png)

### 删除用户组

   点击 `删除` ，删除当前用户组。
    ![](../assets/system-configuration/删除用户组.png)






+++
title = "Configuration"
description = ""
weight = 1
+++

# Configuration
  
  This chapter introduces the system configuration that needs to be performed before the user uses system functions, for the user doing operations, such as [Scrum management] (../scrum), [Continuous-integration] (../continuous-integration), [Continuous-deployment] (../continuous-deployment). The system configuration is completed by the platform administrator, project creator, project owner, and other high authority roles. Each module contains its conceptual definition, main functions, and other considerations. Through this page, you can learn about these things, as follows：

   - [Role Management](#1)
   - [User Management](#2)
   - [Role Assignment](#3)
   - [Project Management](#4)
   - [Environment Management](#5)
   - [User group Management](#6)


<h2 id="1">Role Management</h2>
  
  A role is a set of permissions. When the user performs certain operations, the system checks whether the user has the corresponding rights in the role. Therefore, the role needs to be set according to actual use. After assigning a role to a user, the user has the corresponding operation authority. This module will detail how to manage the role.  
  - **Menu hierarchy**：Organization Layout
  - **Menu path**：Management > Role
  - **Default role **：Platform Administrator

### Create Role

   1. Click `Create` ，and then input “Name”, “Role code”, finally set it whether to enable and to editable.

      ![](../assets/系统配置/添加权限.png)

   1. Click `Add permission`，select the appropriate permissions required, and click `Confirm` to create the permissions. 
      ![](../assets/系统配置/确定权限.png)

      Note：[API Permission list]()

### The permission of roles configuration.

   1. For existing roles, click `Edit`, or click `Edit` from the details interface.

      ![](../assets/系统配置/编辑角色.png)

1.	Modify the information of role, as well as permissions, click `add permission`.

      ![](../assets/系统配置/修改添加权限.png)

   1. Add or delete permissions, click `OK`.

      ![](../assets/系统配置/确定修改权限.png)

### Disable or enable roles
 
   Click `Disable`, this role will not be assigned to the users.

   Click `Enable`, this role could be assigned to the appropriate user.

   ![](../assets/系统配置/停用角色.png)

### The instructions for adding permissions to the role
   
   Note: The permission list of existing roles needed manual configuration.
   
   Role name | Permission name | Permission description | Permission layout
   --- | --- | --- | ---
   Project creator | hap-user-service.password-policy.queryOrganization | Query the password policy of target organization | organization
   Project creator | hap-devops-service.environment.listEnvironment Query the information of all environment | organization
   Project creator | hap-devops-service.environment.createEnvironment | Create environment | organization
   Project creator | hap-devops-service.environment.checkEnvironmentByName | Query whether the environment name is available | organization
   Project creator | hap-devops-service.environment.listEnvironmentByPageSize | Paging query environment’s information | organization
   Project creator | hap-devops-service.environment.getEnvironmentByEnvironmentId | Query the detail information of environment | organization
   Project creator | hap-devops-service.environment.updateEnvironment | Update environment | organization
   Project creator | hap-devops-service.environment.deleteEnvironmentByEnvironmentId | Delete environment | organization
   Project creator | hap-devops-service.project.checkProject | Query Project code and whether name is unique | organization
   Project creator | hap-user-service.project.select | Paging query project | organization
   Project creator | hap-user-service.project.create | Add project, an organization and force current user to belong organization | organization
   Project creator | hap-user-service.project.checkProjectCode | checkProjectCode | organization
   Project creator | hap-user-service.project.queryOrganizationProject | Query the project according to the organization id | organization
   Project creator | hap-user-service.user.select | Paging to query | organization
   Project creator | hap-user-service.user.create | Add new users | organization
   Project creator | hap-user-service.user.query | Delete all users according ID| organization
   Project creator | hap-user-service.user.updateUser | Query the user according to the user id | organization
   Project creator | hap-user-service.organization.query | Query organization according to the organization id | organization
   Project creator | hap-user-service.role.selectOrganizationRole | Query the list of organization roles assignable | organization
   Project creator | hap-user-service.project.update | According to ID to modify the project information, it only can modify the project of its own organization. | organization
   Project Owner | hap-user-service.project.query | According to ID to query the project information, it only can query the project of its own organization. | project
   Project Owner | hap-user-service.member-role-project.select | Query the project member roles | project
   Project Owner | hap-user-service.member-role-project.create | Create new member roles in the project layout | project
   Project Owner | hap-user-service.member-role-project.update | Update the member roles in the project layout | project
   Project Owner | hap-user-service.member-role-project.createSingle | Create new member roles in the project layout | project
   Project Owner | hap-user-service.member-role-project.delete | Delete the member roles in the project layout | project
   Project Owner | hap-user-service.role.selectProjectRole | 	Query the list of the project role assignable | project
   Project Owner | hap-user-service.role.selectProjectRoleGroupByService |Query the list of the project role assignable (Group on the results to base itself on service) | project
   Source code manager | hap-user-service.project.query | Query the project according to Id, you only can query the project of your own organization. | project
   Project member | hap-user-service.project.query | Query project according to the Id, you only can query the project of your own organization. | project
   Kanban owner | hap-user-service.project.query | Query project according to the Id, you only can query the project of your own organization.| project
   Kanban member | hap-user-service.project.query | Query project according to the Id, you only can query the project of your own organization. | project
  Development monitor | hap-user-service.project.query | Query project according to the Id, you only can query the project of your own organization. | project
   Deployment monitor | hap-user-service.groups.select | Query Group | organization
   Deployment monitor | hap-user-service.groups.create | Create Group | organization
   Deployment monitor | hap-user-service.groups.query | Query Group | organization
   Deployment monitor | hap-user-service.groups.update | Update Group | organization
   Deployment monitor | hap-user-service.groups.delete | Delete Group | organization
   Deployment monitor | hap-user-service.user-groups.insertUserGroups | Create userGroups | organization
   Deployment monitor | hap-user-service.user-groups.delete | Delete userGroups | organization

<h2 id="2">User management</h2>
  
  This module provides the functions of user management, such as creating new users and maintaining user information. Users can also be imported in bulk by other systems.

  - **Menu hierarchy**：Organization Layout
  - **Menu path**：IAM > User Management
  - **Default role**：Platform administrator, Project creator

### Create new user

   1. Click `Create`.

      ![](../assets/系统配置/创建用户.png)

   1. Enter the information of user, and then click `create` to accomplish the creation.

      ![](../assets/系统配置/填写信息创建用户.png)

   1. The new user “ZhangSan” has already in the user list，gitlab automatically generate the same user "Zhang San".

      ![](../assets/系统配置/新用户创建成功.png)

### View detail of user

   1. Click `Detail`, enter into the user detail interface.
      ![](../assets/系统配置/点击用户详情.png)

   1. View the information

      ![](../assets/系统配置/用户详细信息.png)

### Edit users’ information

   1. Click `Edit`, enter into the	user’s compile interface. It is another way enter into the user’s compile interface that click the edit button in the user’s detail interface.

      ![](../assets/系统配置/点击用户编辑.png)
  
   1. Modify the users’ information, and click `Save`, so the user’s information can be completely modified.


      ![](../assets/系统配置/保存用户信息编辑.png)

### Delete users

   1. Click `Delete`.

      ![](../assets/系统配置/点击删除用户.png)

   1. Click `Delete` again, and the user can be delete successfully.

      ![](../assets/系统配置/确认删除用户.png)

<h2 id="3">Role Assignment </h2>
  
  Role Assignment offer the authority management to the platform administrator and the Project Owner, for the purpose of having appropriate authority about using resource. It not only can add the members and assign roles to them, but also adjust the role of existing member. Note: You need to select the corresponding organization or project before entering the role assignment. And the role control range is different.

  - **Menu hierarchy**：Organization Layout/Project Layout
  - **Menu path**：IAM > Role Assignment
  - **Default role**：Platform Administrator, Project Owner 

### Add up roles

   1. If the assignment user is not in the `Organization/Project`, you should click the `add` and add up the role.

      ![](../assets/系统配置/添加角色.png)

      For example: When the user “25777” does not belong to “演示项目0131”, and then you should click the `Add`, input the user’s name and assign the authority of users.

      ![](../assets/系统配置/添加成员.png)

   1. If the client has existed in the list of role management, you should click the ▼ sign, and then you should select one or a batch of roles to assign.	

      ![](../assets/系统配置/分配成员角色.png)

  For example, after create a new user, the platform will auto assign a role of “organizational viewer”. If the user exist in the list of role management, you can assign a role to them directly, click `Save`, finishing the modification of role.
      ![](../assets/系统配置/创建完成示例.png)

      ![](../assets/系统配置/保存角色分配.png)

   _tips：You can input the name or nickname of the user in the search bar, then enter. Then you get the user.   
   ![](../assets/系统配置/搜索用户.png)

Note：** The list of Role permission **
  
  The following table shows the common roles and corresponding functions used by the platform

   Role | permission | Layout
--- | --- | ---
  Platform Administrator |Menu Management, Role Management, User Management (initialize import), Role Assignment (Global Layout) and all functions excerpt for Service Release | System layout
  Project creator | User Management, Project Management, Environment Management, User group Management| Organization Layout
  Development monitor| Resource Management, Gateway Management, Domain name Management, Service Management, Service Deployment, Deployment details (Stages and logs), Auto Deploy | Organization Layout
  Project Owner | Role Assignment (Under all services) Service Creation, Service Detail, Branch Management, Service Version, Code quality, Service Release, Auto release | Project Layout
  Source code administrator | Service Creation, Service details, Branch Management, Service Version, Code quality Check, Service Release | Project Layout
  Project Members | Service detail, Branch Management, Service Version, Code quality, Service Release | Project Layout
  Kanban Project Owner | Story Management, Sprint Management, Tasks and bugs| Project Layout
  Kanban members | Story Management, Sprit Management, Task and bugs | Project Layout
  Deployment monitoring viewer| Full process information monitoring and viewing.| Project Layout
### Delete Role

   1. Click `Delete`.

      ![](../assets/系统配置/点击删除角色.png)

   1. Click `Delete`, and the user no longer belong to the Organization/Project.

      ![](../assets/系统配置/删除角色.png)

<h2 id="4">Project Management </h2>

  In accordance with the case of the enterprise products’ R&D, it should split the group. We suggest that you should treat a scrum project management team as a project unit. Meanwhile, the project management should offer the function of project operation. 
  - **Menu hierarchy**：Organization Layout
  - **Menu path**：IAM > Project
  - **Default role**：Platform Administrator、Project owner

### Create a new project

   1. Click `Create`.

      ![](../assets/系统配置/创建项目.png)

   1. Enter “Project Number” 和 “Project name”, and click `Create`.

      ![](../assets/系统配置/输入项目信息创建项目.png)

   1. “演示0131” has already in the project management list, and gitlab will automatically generate the corresponding the group “演示0131”.

      ![](../assets/系统配置/新创建项目示意.png)

### Edit the information of project.

   1. Click `Edit`, and then enter into the interface of editing project.

      ![](../assets/系统配置/编辑项目信息.png)

   1. Modify `Project Name`, and click `Save`.

      ![](../assets/系统配置/保存项目信息.png)

### Disable /enable Project

  Click `Disable`, and after it is blocked up, the other operation of the project cannot be in process.

  ![](../assets/系统配置/禁用项目.png)

  Click `Enable`, the project can recover to the normal use after enable it.


  ![](../assets/系统配置/启用项目.png)

<h2 id="5">Environment Management </h2>
  
  It is used by platform administrator and Project creator, configure the environment message according to the different usage.	It is not only create environment and delete environment, but also can edit and modify the environment detail information. 
  
  Platform administrators and project creators can manage the environmental information of an organization from the organization layout, and these environments inherit from all the projects under the organization. The project owner can manage the environmental information of a project from the project layout. And these are created by the project layer. Source code administrators, project members can only be view in the list of environments that available for the project from the project level (including those created on this project and inherited by the organization).
  
  Common environment: Test environment, UAT environment and production environment, etc.

  - **Menu hierarchy**：Administration / project Layout
  - **Menu path**：Development management > Environment
  - **Default role**：Platform Administrator, Project Creator, Project Owner, Source Code Administrator, Project Member

### Create environment

   1. Click `create`.

      ![](../assets/系统配置/创建环境.png)

   1. Enter “environment name”, “environment URL”, “environment token”, Click `Test connection`. If the environment URL and the token are correct, it will hint the “Success for connection”; if it hint the “loss for connection”, please modify the correct environment ID or secret password, and then click `create`.

      ![](../assets/系统配置/测试环境链接.png)

### Edit the information of environment

   1. Click `Edit`, and then enter into the edit interface.

      ![](../assets/系统配置/点击编辑环境.png)

   1. Modify the environment information, such as the name of environment, and then click `Save`.
      ![](../assets/系统配置/保存环境修改.png)

   1. Modify the “Environment Name” has done.

      ![](../assets/系统配置/环境修改完成.png)

### Disable/Enable environment

   1. Click `Disable`. Environment “Charlietest” has been blocked up, and after blocked up, the environment will be unavailable.
      ![](../assets/系统配置/停用环境.png)

      ![](../assets/系统配置/环境被停用.png)

   1. The environment of the “Charlietest” has been enable, after enable it, the environment is available. 

      ![](../assets/系统配置/启用环境.png)

      ![](../assets/系统配置/环境被启用.png)

### Delete environment

   1. Click `Delete`.
      ![](../assets/系统配置/删除环境.png)

   1. After verified, click `Delete`.

      ![](../assets/系统配置/确认删除环境.png)

<h2 id="6"> User group management </h2>

  The user group is a combination of different groups of users, mainly used to select individual user groups for test verification during grayscale deployment. User group management includes users who create, edit, delete user groups, and manage the user groups. 

  - **Menu hierarchy**：Administration Layout
  - **Menu path**：User management > User Group
  - **Default role**：Platform administrator, deployment manager

### Edit User Group

   1. Click `edit`.

      ![](../assets/系统配置/编辑用户组.png)

   1.  For modifying the information of User groups, click `edit`.

      ![](../assets/系统配置/修改用户组.png)

### Add users on the User group

   1. Click `Add user`.

      ![](../assets/系统配置/用户组添加用户.png)

   1. Click `Add`, and select users needed to add. If you need to delete a user, uncheck it.
      ![](../assets/系统配置/用户组勾选用户.png)

### Delete the user group

   Click `Delete`, and delete existing User group.

   ![](../assets/系统配置/删除用户组.png)

