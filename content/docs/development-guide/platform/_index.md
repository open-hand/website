+++
title = "平台开发手册"
description = "介绍如何向我们报告Issues，和如何帮助我们改进我们的程序"
weight = 4
icon = "icon-choerodon"
+++

# 介绍

本手册介绍了如何向我们报告Issues，和如何帮助我们改进我们的程序。

## Reporting Issues

Choerodon 使用GitHub 来记录bugs 和feature requests，如果你想要提出一个issue，请遵循如下建议：

* 在你记录一个bug之前，请先在Github中检索是有已经有人提过同样的问题
* 如果这个issue不存在，请创建一个新的issue
* 请尽可能地提供多的信息和问题说明，同时提供您正在使用的版本，以及您的操作系统和JVM版本
* 如果你要提供代码，请使用Markdown格式

## 贡献

如果想要向我们贡献您的代码，您可以将代码fork 到自己的Git库中，然后向我们发起pull request。本地开发请遵循如下规范：

* 后端文件结构规范
* Java 开发规范
* SQL 规范
* Restful Api 规范
* 前端开发规范

### 后端文件结构规范

Choerodon 的微服务，采用DDD 的设计思想，整体架构如下图所示：

![framework_structure](/cimg/framework_structure.jpg)

从上往下整体分为四层：

#### 展现层：
主要用于用户显示信息，处理用户发送的Restful请求信息（用户命令），并将信息传递给Application层的接口。这里指的用户可以是另一个计算机系统，不一定是使用用户界面的人。
在本系统实现程序上主要包括：

- **controller**  接受用户restful请求
- **dto** 封装用户请求的数据信息
- **validator** 验证用户请求信息的合法性
- **eventhandler** 领域事件接收处理器

#### 应用层：
完成展现层指定的任务，并且调用领域对象或服务来解决问题。这一层所负责的工作对业务来说意义重大，也是与其它系统的应用层进行交互的必要渠道。应用层要尽量简单，不包含业务规则或者知识，而只为下一层中的领域对象协调任务，分配工作，使它们互相协作。
在本系统实现程序上主要包括：

- **service**  调用领域对象或服务来解决问题，应用层Service主要有以下特性：

```
1. 负责事务处理，所以事务的注解可以在这一层的service中使用。
2. 只处理非业务逻辑，重点是调度业务处理流程。业务逻辑处理一定要放在领域层处理。
3. 不做单元测试，只做验收测试。
4. 可能会有比较多的依赖组件(领域服务)，使用field注入依赖的组件。
5. 方法要求无状态，只接受dto和元数据类型作为参数。
```

#### 领域模型层：

负责表达业务概念，业务状态信息以及业务规则。尽管保存业务状态的技术细节是由基础设施层实现的，但是反映业务情况的状态是由本层控制并且使用的。领域层是业务软件的核心，领域模型位于这一层。

在本系统实现程序上主要包括：
- entity
- convertor
- event
- reposity

#### 基础设施层：
向其他层提供通用的技术能力，为应用层传递消息，为领域层提供持久化机制，为用户界面层绘制屏幕组件，等等。基础设施层还能够通过架构框架来支持四个层次间的交互模式。
在本系统实现程序上主要包括：
- mapper
- dataobject
- fegin
- common
- config

#### Java 开发规范

Choerodon 的后端主要以Java 为主，您所开发的Java 程序需要生效SonarQube的规范检查和CheckStyle的规范检查：

* SonarQube 的规范检查，SonarQube提供应用程序的能力，可以通过SonarQube 显示程序的健康程度和质量。你可以修复泄漏，系统地提高代码质量。Choerodon 使用sonarlint作为SonarQube的检查。
* CheckStyle 的规范检查，Checkstyle是一个开发工具来帮助程序员编写Java代码,提供了统一的编码标准。Choerodon 提供一份自己的checkStyle 文件。[choerodon_checkStyle.xml](./choerodon_checks.xml)

### SQL 规范

Choerodon 的数据库采用MySql，同时使用Liquibase 和groovy 作为数据库管理工具。如果您的提交涉及到表结构的修改，请遵循如下规范：

* [SQL 规范](./sql)
* groovy 规范

Choerodon 采用groovy 来编写数据库初始化脚本。需要遵循如下规范：

* 每一张表对应一个groovy文件
* groovy文件的路径应存放在服务的`/src/resources/script/db/` 路径下
* groovy changeSet 的id ：'yyyy-MM-dd-table_name'，author：`your@gmail.com`
* groovy 遵循liquibase语法。更多有关liquibase的信息请参照[liquibase官网](http://www.liquibase.org/)

### Restful Api 规范

Choerodon 的微服务之间，采用HTTP/REST 的请求作为数据传输。接口需要遵循Rest 原则:

* [Restful Api 规范](./restful)

### 前端开发规范

* CSS 规范：Choerodon 的前端采用 [stylelint](https://github.com/stylelint/stylelint-config-standard) 作为CSS 语法检查。同时遵循如下规范：
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

* JavaScript规范: Choerodon 的前端采用 [Eslint](https://eslint.org) 作为JavaScript 的语法规范。同时命名遵循如下规范：
    * 常量全部大写： const ENV = 'production'
    * 变量全都小写: const tablename = 'table'
    * 函数首字母小写其余首字母大写：fixColor(id, color) {}
    * 类名驼峰： class ClientEdit{}

* 其他规范：
    * HTML 使用语义化标签，禁止滥用Div，Span
    * 不在覆盖第三方开源UI库的样式
    * 尽量使用lodash函数工具包
    * 函数功能单一，且在每个函数必须写明注释，注释包含函数功能,参数说明。 

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

* 文件结构：所有页面和组件目录结构使用如下结构
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