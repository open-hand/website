+++
title = "结构说明"
description = "结构说明"
weight = 3
+++

# 结构说明

## 目录划分

开发仿照iam项目结构（推荐通过yo命令自动生成目录结构，节省自动建立目录时间），源文件目录在 `iam/src/app/iam` ，主要目录结构如下：

```

├── src
│   └── app
│       └── iam
│           ├── assets
│           │   ├── css
│           │   └── images
│           ├── components
│           │   ├── loadingBar
│           │   ├── memberRole
│           │   └── menuType
│           ├── config
│           │   ├── Menu.yml
│           │   └── language
│           ├── containers
│           │   ├── Home.js
│           │   ├── IAMIndex.js
│           │   ├── Masters.js
│           │   ├── global
│           │   ├── master.css
│           │   ├── organization
│           │   ├── project
│           │   └── user
│           ├── locale
│           │   ├── en.js
│           │   └── zh.js
│           ├── stores
│           │   ├── globalStores
│           │   ├── organization
│           │   ├── project
│           │   └── user
│           └── test
│               └── util
├── package-lock.json
├── package.json
├── tsconfig.json
└── yarn.lock

```

- assets 中css存放模块通用样式表,images存放图片资源
- containers 存放前端的页面
- stores 存放前端页面所需的数据
- common 存放公共的配置文件
- components 存放的是公共的组件
- local 存放模块多语言文件
- config 存放Menu.yml配置文件(包括菜单的code, icon, 跳转Route, 菜单的权限)和language中的中英文yml(zh.yml, en.yml)
- test 存放测试文件
