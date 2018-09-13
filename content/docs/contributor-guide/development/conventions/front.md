+++
title = "前端开发"
description = "前端开发中的规范要求"
weight = 1
+++

# 前端开发规范

## CSS 规范
Choerodon 的前端采用 [Stylelint](https://github.com/stylelint/stylelint-config-standard) 作为CSS 语法检查。同时遵循如下规范：

* 选择Sass作为预处理
* 禁止使用CSS in JS
* CSS命名规范

    ``` CSS
    .choerodon-元素块-修饰符
    <Header className="choerodon-header">
        <li className="choerodon-header choerodon-ul">
            <li className="choerodon-header choerodon-ul choerodon-li-lg">test</li>
        </ul>
    </Header>
    ```

## JavaScript规范
Choerodon 的前端采用 [Eslint](https://eslint.org) 作为JavaScript 的语法规范。同时命名遵循如下规范：

* 常量全部大写： const ENV = 'production'
* 变量全都小写: const tablename = 'table'
* 函数首字母小写其余首字母大写：fixColor(id, color) {}
* 类名驼峰： class ClientEdit{}

## 其他规范：
* HTML 使用语义化标签，禁止滥用Div，Span
* 不覆盖第三方开源UI库的样式
* 尽量使用lodash函数工具包
* 函数功能单一，且在每个函数必须写明注释，注释包含函数功能，参数说明。 

    ``` javascript
    /*
        修改节点的颜色
        id:节点id,
        color: 颜色,
    */
    function fixColor(id, color) {
        id.style.color = color
    }
    ```

## 文件结构

所有页面和组件目录结构使用如下结构

``` bash
    ├── ClientIndex.js
    ├── clientCreate
    │   ├── ClientCreate.js
    │   ├── ClientCreate.scss
    │   └── index.js
    ├── clientDetail
    │   ├── ClientDetail.js
    │   ├── ClientDetail.scss
    │   └── index.js
    ├── clientEdit
    │   ├── EditClient.js
    │   ├── EditClient.scss
    │   └── index.js
    ├── clientHome
    │   ├── Client.js
    │   ├── Client.scss
    │   └── index.js
    ├── components
    └── index.js
```