+++
title = "目录划分"
date = "2017-02-01"
draft = false
weight= 4
+++

# 前端开发手册

## 目录划分

开发仿照iam项目结构（推荐通过yo命令自动生成目录结构，节省自动建立目录时间），源文件目录在 `iam/src/app/iam` ，主要目录结构如下：

```
.
├── package-lock.json
├── package.json
├── src
│   └── app
│       └── iam
│           ├── assets
│           │   ├── css
│           │   │   ├── Codemirror.less
│           │   │   ├── logView.less
│           │   │   └── search.less
│           │   └── images
│           │       ├── gulp.png
│           │       ├── react.png
│           │       └── webpack.png
│           ├── common
│           │   ├── IconAntd.js
│           │   ├── IconMaterial.js
│           │   ├── Icons.js
│           │   ├── Permission.js
│           │   └── RouteMap.js
│           ├── components
│           │   ├── ClientSearch.js
│           │   ├── Codemirror.js
│           │   ├── FullButton.js
│           │   ├── MasterHeaderCopys.js
│           │   ├── SearchField.js
│           │   ├── memberRole
│           │   │   ├── PoReRoleCas.js
│           │   │   ├── ReRoleCas.js
│           │   │   ├── RoleCas.js
│           │   │   ├── RoleCasPro.js
│           │   │   ├── RoleList.js
│           │   │   ├── RolePanels.js
│           │   │   └── globalRoleCas.js
│           │   ├── menuOld
│           │   │   ├── CommonMenu.js
│           │   │   ├── LeftIconButton.js
│           │   │   ├── MainMenuOne.js
│           │   │   ├── MainMenuold.js
│           │   │   ├── MenuTitle.js
│           │   │   ├── MenuType.js
│           │   │   ├── MutilMenu.js
│           │   │   ├── ResourceMenu.js
│           │   │   ├── RightIconButton.js
│           │   │   ├── headerOrg.js
│           │   │   └── menu.css
│           │   ├── menuType
│           │   │   ├── menuType.js
│           │   │   └── menuType.less
│           │   ├── organization
│           │   │   ├── DeploymentTable.js
│           │   │   ├── Label.js
│           │   │   ├── LabelList.js
│           │   │   ├── LabelTable.js
│           │   │   ├── OrganizationList.js
│           │   │   ├── ServiceDeployment.js
│           │   │   ├── ServiceTable.js
│           │   │   ├── labelOrganizationList.js
│           │   │   ├── reLabel.js
│           │   │   └── reLabelTable.js
│           │   └── rightTabs
│           │       ├── RightTab.js
│           │       └── rightTab.less
│           ├── config
│           │   ├── Menu.yml
│           │   └── language
│           │       ├── en.yml
│           │       └── zh.yml
│           ├── containers
│           │   ├── Home.js
│           │   ├── IAMIndex.js
│           │   ├── MasterOld2.js
│           │   ├── Masters.js
│           │   ├── MastersNew.js
│           │   ├── MatersOld.js
│           │   ├── global
│           │   │   ├── MemberRole
│           │   │   │   ├── GlobalIndex.js
│           │   │   │   ├── GlobalMemberRole.css
│           │   │   │   └── GlobalMemberRole.js
│           │   │   ├── Menu
│           │   │   │   ├── GlobalMenuPermission.js
│           │   │   │   └── MenuIndex.js
│           │   │   ├── MenuPermission
│           │   │   │   ├── EditRole.js
│           │   │   │   ├── MenuPermission.js
│           │   │   │   ├── MenuPermissionIndex.js
│           │   │   │   └── role.css
│           │   │   ├── MenuTree
│           │   │   │   ├── InputIcon.js
│           │   │   │   ├── MenuDetail.js
│           │   │   │   ├── MenuTree.js
│           │   │   │   ├── MenuTreeIndex.js
│           │   │   │   ├── MenuTreeOld.js
│           │   │   │   ├── node.js
│           │   │   │   ├── react-ui-tree.js
│           │   │   │   ├── theme.less
│           │   │   │   └── tree.js
│           │   │   ├── adminOrganization
│           │   │   │   ├── AdminOrganization.js
│           │   │   │   ├── AdminOrganizationIndex.js
│           │   │   │   ├── AdminOrganizationLabel.js
│           │   │   │   ├── CreateAdminOrganization.js
│           │   │   │   ├── EditAdminOrganization.js
│           │   │   │   └── LabelOrganization.js
│           │   │   ├── excel
│           │   │   │   ├── Excel.js
│           │   │   │   └── ExcelIndex.js
│           │   │   ├── permission
│           │   │   │   ├── permission.js
│           │   │   │   └── permissionIndex.js
│           │   │   ├── role
│           │   │   │   ├── CreateRole.js
│           │   │   │   ├── EditRole.js
│           │   │   │   ├── Role.js
│           │   │   │   ├── RoleIndex.js
│           │   │   │   └── role.css
│           │   │   ├── service
│           │   │   │   ├── Service.js
│           │   │   │   └── ServiceIndex.js
│           │   │   └── token
│           │   │       ├── CreateSaasToken.js
│           │   │       ├── SaasToken.js
│           │   │       └── TokenIndex.js
│           │   ├── master.css
│           │   ├── organization
│           │   │   ├── adminClient
│           │   │   │   ├── Client.js
│           │   │   │   ├── ClientIndex.js
│           │   │   │   ├── CreateClient.js
│           │   │   │   └── EditClient.js
│           │   │   ├── adminDeploymentLabel
│           │   │   │   ├── AdminLabel.js
│           │   │   │   ├── AdminLabelIndex.js
│           │   │   │   └── AdminLabels.js
│           │   │   ├── client
│           │   │   │   ├── ClientDetail.js
│           │   │   │   ├── ClientIndex.js
│           │   │   │   ├── Clients.js
│           │   │   │   ├── CreateClient.js
│           │   │   │   └── EditClient.js
│           │   │   ├── language
│           │   │   │   ├── EditLanguage.js
│           │   │   │   ├── Language.js
│           │   │   │   └── LanguageIndex.js
│           │   │   ├── ldap
│           │   │   │   ├── EditLDAP.js
│           │   │   │   └── LDAPIndex.js
│           │   │   ├── lookup
│           │   │   │   ├── CreateLookup.js
│           │   │   │   ├── EditLookup.js
│           │   │   │   ├── Lookup.js
│           │   │   │   └── LookupIndex.js
│           │   │   ├── memberRole
│           │   │   │   ├── MemberRole.js
│           │   │   │   ├── MemberRoleIndex.js
│           │   │   │   ├── ReMemberRole.css
│           │   │   │   ├── ReMemberRole.js
│           │   │   │   └── all.css
│           │   │   ├── organization
│           │   │   │   ├── Organization.js
│           │   │   │   └── OrganizationIndex.js
│           │   │   ├── passwordPolicy
│           │   │   │   ├── PasswordPolicy.js
│           │   │   │   ├── PasswordPolicyIndex.js
│           │   │   │   └── UpdatePasswordPolicy.js
│           │   │   ├── project
│           │   │   │   ├── CreateProject.js
│           │   │   │   ├── EditProject.js
│           │   │   │   ├── Project.js
│           │   │   │   └── ProjectIndex.js
│           │   │   ├── reProject
│           │   │   │   ├── Project.js
│           │   │   │   └── project.less
│           │   │   ├── user
│           │   │   │   ├── CreateUser.js
│           │   │   │   ├── EditUser.js
│           │   │   │   ├── ModifyPassword.js
│           │   │   │   ├── User.js
│           │   │   │   ├── UserDetail.js
│           │   │   │   ├── UserIndex.js
│           │   │   │   └── UserInfo.js
│           │   │   └── userGroup
│           │   │       ├── CreateUserGroup.js
│           │   │       ├── UserGroup.js
│           │   │       ├── UserGroupIndex.js
│           │   │       └── userGroup.css
│           │   └── project
│           │       ├── language
│           │       │   ├── EditLanguage.js
│           │       │   ├── Language.js
│           │       │   └── LanguageIndex.js
│           │       └── memberRole
│           │           ├── MemberRole.js
│           │           ├── MemberRoleIndex.js
│           │           ├── ReMemberRole.css
│           │           ├── ReMemberRole.js
│           │           └── all.css
│           ├── locale
│           │   ├── en.js
│           │   └── zh.js
│           ├── stores
│           │   ├── globalStores
│           │   │   ├── GlobalMenuStore.js
│           │   │   ├── MemberRoleStore.js
│           │   │   ├── MenuTreeStore.js
│           │   │   ├── role
│           │   │   │   └── RoleStore.js
│           │   │   ├── service
│           │   │   │   └── ServiceStore.js
│           │   │   └── token
│           │   │       └── SaasTokenStore.js
│           │   ├── organization
│           │   │   ├── adminClient
│           │   │   │   └── AdminClientStore.js
│           │   │   ├── adminOrganization
│           │   │   │   ├── AdminOrganizationStore.js
│           │   │   │   └── LabelStore.js
│           │   │   ├── client
│           │   │   │   └── ClientStore.js
│           │   │   ├── excel
│           │   │   │   └── ExcelStore.js
│           │   │   ├── language
│           │   │   │   └── LanguageStore.js
│           │   │   ├── ldap
│           │   │   │   └── LDAPStore.js
│           │   │   ├── lookup
│           │   │   │   └── LookupStore.js
│           │   │   ├── memberRole
│           │   │   │   └── MemberRoleStore.js
│           │   │   ├── organization
│           │   │   │   └── OrganizationStore.js
│           │   │   ├── passwordPolicy
│           │   │   │   └── PasswordPolicyStore.js
│           │   │   ├── project
│           │   │   │   └── ProjectStore.js
│           │   │   ├── reProject
│           │   │   │   └── ProjectStore.js
│           │   │   ├── user
│           │   │   │   ├── CreateUserStore.js
│           │   │   │   └── UserStore.js
│           │   │   └── userGroup
│           │   │       └── UserGroupStore.js
│           │   └── project
│           │       └── memberRole
│           │           └── MemberRoleStore.js
│           └── test
│               └── index.test.js
├── tsconfig.json
└── yarn.lock
```

- containers 存放前端的页面
- stores 存放前端页面所需的数据
- assets 存放样式表和图片资源
- common 存放公共的配置文件
- components 存放的是公共的组件
- local 存放多语言文件
- config 存放yml配置文件
- test 存放测试文件
## 文件命名方式

- 文件夹命名

统一小写，比如模块 user。同一个模块的组件都放在同一个目录下，比如与 user 相关的 UserIndex, EditUser 等文件。

- 组件命名

采用帕斯卡命名规范，单个单词首字母大写，比如 User,多个单词仅首字母大写，比如 CreatUser