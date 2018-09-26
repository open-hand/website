+++
title = "结构说明"
description = "结构说明"
weight = 3
+++

## 前置条件

请确保已经将代码clone 到本地。详见 [代码运行](../run/)

## 结构说明

### 目录划分

开发仿照`choerodon-front-iam`项目结构，源文件目录在 `choerodon-front-iam/iam/src/app/iam` ，主要目录结构如下：
```
choerodon-front-iam
│  .editorconfig
│  config.js
│  favicon.ico
│  webpack.config.js             
└─iam
    │  .editorconfig
    │  .eslintrc.json
    │  .stylelintrc.json
    │  package.json
    │  tsconfig.json  
    └─src
        └─app
            └─iam
                ├─assets
                │  ├─css
                │  │      *.less
                │  │      
                │  └─images
                │          *.svg
                │          *.png
                ├─components
                │          
                ├─config
                │  │  Menu.yml
                │  │  
                │  └─language
                │          en.yml
                │          zh.yml
                │          
                ├─containers
                │  │  IAMIndex.js
                │  │  
                │  ├─global
                │  │           
                │  ├─organization
                │  │              
                │  ├─project
                │  │              
                │  └─user
                │                  
                ├─locale
                │      en_US.js
                │      zh_CN.js
                │      
                ├─stores
                │  ├─globalStores
                │  │          
                │  ├─organization
                │  │              
                │  ├─project
                │  │          
                │  └─user
                │              
                └─test
                    └─util
                            index.test.js

```

- assets 中css存放模块通用样式表，images存放图片资源
- containers 存放前端的页面
- stores 存放前端状态管理文件
- common 存放公共的配置文件
- components 存放的是公共的组件
- local 存放模块多语言文件
- config 存放Menu.yml配置文件(包括菜单的code， icon， 跳转Route，菜单的权限)和language中的中英文yml(zh.yml， en.yml)
- test 存放测试文件
