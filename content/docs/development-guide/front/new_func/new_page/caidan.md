+++
title = "菜单配置"
weight = 1
+++

# 菜单配置

前端新加模块和页面，想在菜单中显示需要跟后端沟通各种事宜与配置，大大增加了开发效率与成本。在此版本中，只需要简单配置，菜单数据完全由前端控制。

在模块内部创建config文件夹，目录结构为:

```

├── language
|   ├── en.yml
|   └── zh.yml
|
└── Menu.yml

```
language | 菜单中英文配置文件夹
--- | ---
en.yml | 英文菜单
zh.yml | 中文菜单
Menu.yml | 菜单配置项

Menu.yml文件内容看起来是这样的:

```
"iam": # 此处为最外层的模块服务字段
  icon: account_circle # 服务的图标
  global: # global层的菜单
    - "role": # 菜单字段
        icon: assignment_ind # 菜单图标
        Routes: /iam/role # 菜单对应路由
        permission: # 菜单内容具有的权限
          - 'hap-user-service.role.update'
          - 'hap-user-service.role.delete'
          - 'hap-user-service.role.select'
          - 'hap-user-service.role.updateRoleWithPermission'
          - 'hap-user-service.role.createRoleWithPermission'
  organization: # 组织层的菜单
    - "client":
        icon: laptop_mac
        Routes: /iam/client
        permission:
          - 'hap-user-service.client.create'
          - 'hap-user-service.client.update'
          - 'hap-user-service.client.delete'
          - 'hap-user-service.client.select'
  project: # 项目层的菜单
    - "member-role-project":
        icon: person_add
        Routes: /iam/projectMemberRole
        permission:
          - 'hap-user-service.member-role-project.create'
          - 'hap-user-service.member-role-project.delete'
          - 'hap-user-service.member-role-project.select'
          - 'hap-user-service.member-role-project.update'
  user: # 个人中心层的菜单
    - "user-info":
        icon: more
        Routes: /iam/user/info
        permission:
          - 'hap-user-service.user-info.querySelf'
          - 'hap-user-service.user-info.updateSelf'

```

en.yml文件内容:

```
"iam": IAM
"iam.client": "Client"
"iam.member-role-project": "Role Assignment"
"iam.role": "Role"
"iam.user-info": "User Information Maintenance"

```

模板为[服务字段].[菜单字段]: [菜单英文名]

zh.yml文件内容:

```
"iam": "用户服务"
"iam.client": "客户端"
"iam.member-role-project": "角色分配"
"iam.role": "角色"
"iam.user-info": "用户信息维护"
```

在项目根目录下，执行python .\boot\structure\configAuto.py iam(确保python版本为2.7.x,以及本地安装pyyaml包)脚本。

成功之后在项目根目录会生成config.yml文件。

然后再执行python ./boot/structure/pythonsql.py -i ip地址 -p 端口号 -u 用户名 -s 密码

在部署时候也可通过环境变量进行传递参数

变量名 | 说明
--- | ---
DB_HOST | 用户名
DB_PORT	| 端口
DB_USER	| 用户名
DB_PASS	| 密码

成功后，会将前端配置的菜单信息插入后端数据库中。

如果要显示插入的菜单，需要在全局层的菜单配置下，进行页面操作，将数据已有的菜单展示在菜单列。