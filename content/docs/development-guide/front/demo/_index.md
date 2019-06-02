+++
title = "开发Demo程序"
description = "述了如何创建一个简单的项目，实现基础页面编写"
weight = 2
+++

## 前置条件

在开发之前，要保证环境已经安装正确，详见 [开发环境搭建](../develop-env/)

## 介绍

创建一个简单的项目，实现基础的hello页面以及分页表格页面。

## 项目结构
```bash
choerodon-todo-service
├── package.json
└── react
    ├── config.js
    └── src
        └── app
            └── demo
                ├── assets
                │   ├── css
                │   └── images
                ├── common
                ├── components
                ├── containers
                │   ├── DEMOIndex.js
                │   └── organization
                │       ├── hello
                │       │   └── index.js
                │       └── table
                │           ├── index.js
                │           └── stores
                │               ├── Store.js
                │               └── index.js
                ├── locale
                └── stores
```

## 结构说明
- `assets`中css存放模块通用样式表，images存放图片资源
- `common`存放公共的配置文件
- `components`存放的是公共的组件
- `containers`存放前端的页面
- `locale`存放模块多语言文件
- `stores`存放前端状态管理文件
