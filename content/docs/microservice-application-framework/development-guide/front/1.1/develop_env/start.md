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
├── assets
│   ├── css
│   │   └── main.less
│   └── images
│       ├── jsa-128.jpg
│       └── menu.png
├── common
│   ├── axios.js
│   ├── HAP.js
│   ├── Icons.js
│   ├── RouterMap.js
│   └── store.js
├── components
│   ├── Header.js
│   ├── Label.js
│   ├── LabelService.js
│   ├── memberRole
│   │   ├── RoleList.js
│   │   └── RolePanels.js
│   ├── menu
│   │   ├── MainMenu.js
│   │   ├── MenuType.js
│   │   └── ResourceMenu.js
│   ├── PageHeader.js
│   └── Remove.js
├── containers
│   ├── Home.js
│   ├── IAMIndex.js
│   ├── Masters.js
│   ├── organization
│   │   ├── adminClient
│   │   ├── adminOrganization
│   │   ├── catalog
│   │   ├── client
│   │   ├── excel
│   │   ├── ldap
│   │   ├── lookup
│   │   ├── memberRole
│   │   ├── organization
│   │   ├── passwordPolicy
│   │   ├── project
│   │   ├── role
│   │   ├── service
│   │   ├── token
│   │   └── user
│   ├── project
│   │   ├── language
│   │   └── menberRole
│   └── UserPreferences.js
├── locale
│   ├── en.js
│   └── zh.js
└── stores
    ├── globalStores
    │   ├── AppState.js
    │   └── README
    ├── MenuStore.js
    ├── organization
    │   ├── adminClient
    │   ├── adminOrganization
    │   ├── catalog
    │   ├── client
    │   ├── excel
    │   ├── ldap
    │   ├── lookup
    │   ├── menberRole
    │   ├── organization
    │   ├── passwordPolicy
    │   ├── project
    │   ├── role
    │   ├── service
    │   ├── token
    │   └── user
    └── project
        └── language
```

- containers 存放前端的页面
- stores 存放前端页面所需的数据
- assets 存放样式表和图片资源
- common 存放公共的配置文件
- components 存放的是公共的组件
- local 存放多语言文件

## 文件命名方式

- 文件夹命名

统一小写，比如模块 user。同一个模块的组件都放在同一个目录下，比如与 user 相关的 UserIndex, EditUser 等文件。

- 组件命名

采用帕斯卡命名规范，单个单词首字母大写，比如 User,多个单词仅首字母大写，比如 CreatUser