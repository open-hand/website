# Changelog

本文档记录了Choerodon 0.8.0中**微服务开发框架**、**持续交付**、**敏捷管理**、**知识管理**、**测试管理**等功能的增强、变更等。在此版本中新增了**知识管理**、**测试管理**等功能服务。并对**微服务开发框架**、**持续交付**、**敏捷管理**等服务的功能进行了优化和增强。

## 知识管理
### [0.8.0] - 2018-07-20
### 新增

知识管理服务是一个轻量级的强大Wiki平台，允许用户根据自己的特定需求自定义Wiki，为企业、IT团队提供方便的项目协作平台和强大的项目内容管理平台，集中式管理产品相关内容、管理相关内容等，例如需求收集、架构设计、功能设计、开发规范、命名规范、会议记录、计划安排等。

知识管理包括如下功能服务：

- **空间**相当于一个分组，页面隶属于空间之下。空间和页面有两个主要属性，名称（name）和标题（titile），Name是唯一标识，用做相互关联。Title是页面或空间的显示标题，用作显示。

- **页面**隶属于空间之下，通过此文档，您可以了解页面的概念、如何编辑和管理页面以及如何设置页面的权限。

- **权限设置**可以被设置为不同范围或者不同层次，wiki全局级别权限，可以被空间级别权限覆盖，而空间级别的权限会被页面级别的权限覆盖。

- **系统管理**是对Wiki系统的功能，权限，用户等进行自定义设置。

## 测试管理
### [0.8.0] - 2018-07-20
### 新增

测试管理为用户提供敏捷化的持续测试工具，包括测试用例管理、测试循环、测试分析等，可以有效地提高软件测试的效率和质量，提高测试的灵活性和可视化水平，最终减少测试时间，让用户将主要精力放到软件功能构建上。

测试管理包括如下功能服务：

- **测试用例**是保障产品质量的的基础，是开发人员与测试人员在项目中通过各自的工作流进行工作的一个交汇点。测试用例可以被关联到缺陷，等待开发人员解决缺陷后再次进行关联测试，从而确保测试与开发紧密结合。

- **测试循环**用于以结构化方式设置和执行测试用例，比如：您可以按照测试不同版本的功能测试、界面测试、接口测试等不同对象进行分类，或者集成测试 、回归测试、验收测试等不同阶段来划分，或者根据您自己的需求来划分。

- **执行测试**，测试可以是一行简单的代码，也可以是非常复杂的问题，其中包含了很多细节、步骤、链接和与之相关的文件。当我们创建好一个测试后，理所应当的应该了解如何去执行它。执行一个测试意味着为测试运行或执行时发生的事情提供一个高级的状态，并对其进行一些后续操作（如关联缺陷等）。

- **测试分析**，如果您想查看项目下测试总数、执行统计或按不同版本、模块、标签、时间统计用例可以选择查看测试摘要。您也可以通过查看测试追踪性报告来查看需求或缺陷关联的测试执行情况。

## Choerodon 微服务开发框架
### [0.8.0] - 2018-07-20
### 新增

#### 0.8.0显著新增特性

- 新增微服务功能，可以查看平台中的所有微服务。
- 新增API测试，可以查看微服务下的controller以及controlller下面的API接口。
- 新增个人中心的组织信息，可以查看在不同组织中被分配的角色以及这些角色的权限。
- 新增个人中心的项目信息，可以查看在不同项目中被分配的角色以及这些角色的权限。
- 客户端新增了作用域和自动授权域字段。

#### 控件0.3.4

- 新增了一些图标。

#### boot0.6.4

- 菜单初始化添加可选参数，通过`-a or --attrs` 或者添加环境变量`UP_ATTRS` 在初始化时指定更新菜单`sort` 和`parent_id` 字段。
- 菜单初始化添加可选参数，通过`-d or --delete` 或者添加环境变量`ENABLE_DELETE` 在初始化时指定删除菜单，对应要删除的菜单或目录需要添加`delete: true`。
#### 框架的依赖0.5.4

- `choeordon-tool-liquibase`: 支持测试时使用h2作为测试数据库

### 修改

#### 0.8.0显著修改特性

- 创建组织优化为组织列表跳转到第一页。
- 删除自设目录时提示优化。
- 创建用户、修改用户页字段优化与密码取值修改。
- 端nginx优化。
- LDAP组件合并优化。

#### 控件0.3.4

- eslint 升级到最新版本。
- 首页重新设计和实现。

#### boot0.6.4

- 修改菜单初始化数据库中`getopt` 为`argparse`，用户现在可以通过`python choerodon-front-boot/structure/sql.py -h` 来获取帮助信息。

#### 框架的依赖0.5.4

- `choerodon-starter-core`: 修改了统一异常处理，异常返回信息添加了errorCode

### 修复

#### 0.8.0显著修复特性

- 修复添加权限时，如果进行了权限过滤，再次进入没有清空搜索结果的问题。
- 修复项目无法停用成功的问题。
- 修复后端配置https不跳转的问题。
- 修复用户全局过滤时后端没有返回数据的问题。
- 修复密码策略无法保存的问题。
- 修复实例管理在选择微服务之后，不能查询对应的实例的问题。
- 修复个人中心页修改头像之后，再次保存用户时失败的问题。
- 修复无法更新用户的问题。
- 修复移动端无法登录跳错误页的问题。
- 修复实例详情元数据标无过滤表文字的问题。
- 修复liquibase工具包如果excel的某一行有空值的问题。

#### 框架的依赖0.5.4

- `choerodon-starter-mybatis-mapper`: 修复了selectCount在多语言查询时异常。
- `choerodon-starter-mybatis-mapper`: 修复了excel插入时，最后一列为空则无法插入的问题。

## 持续交付
### [0.8.0] - 2018-07-20
### 新增

- 增加代码仓库、分支、标记、合并请求，以实现更多灵活的分支管理模型。
- 与敏捷管理连通，实现敏捷问题管理及持续交付代码管理一致性。
- `分支管理`集成push、merge request webhook。
- 在`容器日志`中增加job操作事件消息。
- 配置文件信息支持保存新增的参数。
- 支持ci pipeline的额外阶段-代码质量检查在界面显示。
- `应用管理`增加sonarqube代码质量检查链接跳转。
- 版本升级的时候通过请求API实现版本间的平滑升级。
- `应用导出`时默认获取所有应用的最新版本。


### 修改

#### 0.8.0显著修改特性

- 修改CI生成版本号的命名规则。
- 配置文件信息存储方式修改为只保存修改内容。
- 表格列宽自适应。
- 调整菜单结构。
- 修改阶段日志的log组件。
- 优化部分页面的加载、跳转速度。
- 优化部分页面字段长度及显示方式。
- 修改`应用管理`排序方式。
- 修改Agent默认返回消息行数。
- 完善网络唯一性校验及域名地址校验规则。


### 修复

#### 0.8.0显著修复特性

- 修复Select框的全选取数据问题。
- Table组件的筛选条件，从父组件刷新无法清空。
- 修复`网络管理`修改网络切换版本未清空实例值的问题。
- 修复`实例详情日志`阶段切换内容未改变的问题。
- 修改Agent多余时间戳的问题。

## 敏捷管理
### [0.8.0] - 2018-07-20
### 新增

- `问题分支管理`功能：用户可以在问题详情中操作与问题关联的Gitlab远程仓库分支，包括创建、合并、查看分支信息。
- `版本报告`功能：用版本报告显示了您的团队在完成版本方面的进展，版本报告可根据：剩余预估时间、故事点、问题计数进行筛选，版本报告还会根据您的团队自版本开始以来的平均进度（速度）以及估计的剩余工作量向您显示预测的发布日期。
- `累积流程图功能`：累积流程图是一个区域图，显示应用程序、版本、sprint的各种工作项状态。水平x轴表示时间，垂直y轴表示问题计数，图表的每个彩色区域等同于面板上列的问题变化，累积流程图可用于识别瓶颈，如果您的图表包含随时间垂直加宽的区域，则等于加宽区域的列通常会成为瓶颈。
- `测试类型问题功能`：问题类型新增测试类型。测试类型的问题用于“测试管理”模块之中，用户可以从该模块中创建测试类型问题，用于管理测试用例。
- `项目默认设置功能`：项目管理员可以设置项目的默认经办人、问题默认优先级，若用户未设置默认经办人、优先级，则系统根据项目设置的默认经办人、优先级创建，特别的是，项目默认经办人优先级低于模块默认经办人。
- `用户默认面板功能`：用户选择面板后会记录在系统中，用户再次点击进入面板中，将会展示用户选择后的面板。
- `问题导出Excel功能`：用户可以根据选择的条件过滤出问题并导出到表格中。
- `问题转换为子任务功能`：用户可以将其他类型问题转换为子任务，特别的是，故事转化为子任务，故事点会修改为0。
- `问题复制功能`：用户可以通过选择参数复制问题，参数包括：问题链接、子任务，复制问题会生成一条与原问题的复制类型链接。
- `版本界面`新增查看发布日志。
- `版本日志Markdown文档导出功能`：用户可以在发布版本的版本日志中将问题信息导出为Markdown文档。

### 修改

- `史诗类型`问题默认初始颜色修改。
- `更新问题`的版本关联，不能删除已经归档的版本关联。
- 优化`搜索接口`，修改触发逻辑。
- 优化`燃尽图`数据查询接口。
- `版本发布时间`显示字段由开始时间修改为发布时间。
- 面板中未分配`泳道`没有问题时隐藏。
- 面板中的`问题卡片`可以查看史诗信息。
- 修改菜单顺序中`活跃冲刺`首位。
- 修改`问题详情`中的史诗名称位置。
- `问题详情`样式优化。
- `待办事项`问题列表样式优化。
- 去除`项目设置`中的项目编号重名校验。
- `面板问题`排列每次刷新按照一定顺序刷新。
- `待办事项`中多选问题时，若有点击其中一个问题的详情，则以点开的问题为基准多选。
- 项目创建初始化`测试类型问题`。
- `问题详情`中操作添加转化为子任务、复制操作。
- `发布版本问题`可以通过点击链接到问题管理中。
- `报告界面`可以关联查看问题列表和每个问题详情。
- `报告控制台`添加版本报告、累积流程图入口。
- 报告切换新增`版本报告`、`累积流程图`。
- `冲刺报告`中的问题可以通过报告中的分组跳转到`问题管理界面`查看相关问题。
- 面板设置中`泳道类型`新增根据史诗泳道展示问题。

### 修复

- `问题详情`锚点定位不准确。
- `问题详情`中所属史诗颜色与史诗颜色不一致。
- 问题基于`故事`展示时，选择仅我的问题后，父任务不属于同一经办人泳道展示的缺陷。
- 选择面板样式问题。
- `活跃冲刺`故事点统计颜色错误。
- `简易创建`问题卡顿。
- 筛选器创建时筛选人员限制20个人员。
- `问题详情`选择经办人、报告人组件问题。
- 选择链接关联问题时最多只能选择400条。
- 选择链接关联问题搜索结果创建失败。
- `待办事项`问题拖动到版本中，对应版本中问题列表没有实时刷新。
- 界面提示文本错误。
- 列表展示数据操作加载延迟。
- `待办事项`问题拖动至冲刺，冲刺人员信息没有更新。
- 问题标题为编辑状态时切换时，编辑框内容会被清除。
- 问题拖动到版本中没有记录日志。
- 新建项目创建问题，问题编号从2开始。
- `问题管理`快速创建史诗没有史诗名称。
- 富文本编辑器在多英文的情况下断词失败。
- 更改`问题类型`，故事更改为其他类型故事点没有置为0，`史诗类型`更改为其他类型时之前属于该史诗下的问题没有更新。
- 火狐浏览器下面板展示样式错误。
- `史诗问题`不存在时面板泳道错误

