+++
title = "全局层"
weight = 1
+++

# I 全局层

选中顶部导航栏的【管理】选项，即可进入全局层

![全局层](http://upload-images.jianshu.io/upload_images/7452984-f38b006f961ca8f0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



## 一、 用户服务

### 1. 服务

- 所有服务的列表
- 可根据搜索条件查询服务

![服务](http://upload-images.jianshu.io/upload_images/7452984-9d0b35052491750d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 1.1 搜索服务

- 不选择属性，根据输入值全局搜索
- 选择一个属性：ID、服务编码、服务名称、描述，输入相应属性值进行模糊搜索

### 2.权限

- 所有权限的列表
- 可根据搜索条件查询权限
- 根据角色层级（全局层/组织层/项目层）、服务、类型；或根据输入值进行搜索

![权限](http://upload-images.jianshu.io/upload_images/7452984-59964f439471d26c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 2.1 搜索权限

- 先选择角色层级：全局层/组织层/项目层，进行层级过滤
- 然后根据输入值进行搜索；或通过选择服务/类型进行权限过滤


### 3.角色

- 权限的集合
- 可创建、根据所选角色创建、删除、编辑、停用/启用、查看详情、根据搜索条件查询角色

![角色](http://upload-images.jianshu.io/upload_images/7452984-3d75e78e73f3c44a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 3.1 创建角色

**必填项：**

- 角色名：角色创建成功并启用后，可在角色分配（与角色权限相对应的层级）的自定义角色中，根据角色名选择

- 角色编码：
    - 具有唯一性
    - 用于与Git Lab角色关联

- 权限：全局层与组织层/项目层不可共存，组织层与项目层权限可共存。选择权限时，如果对于功能所需的权限不清楚，可以使用导航栏右上角的调试功能来查看

![image.png](http://upload-images.jianshu.io/upload_images/7452984-28c56091d813a7bc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


**选填项：**

- 角色标签：实现不同系统之间角色的映射
    - 角色标签选项是针对GItLab或其他平台的角色灵活变更
    - 角色标签的选项不是固定的，可根据对应的其他平台进行设置，角色标签代表的是与其他平台角色关联关系

- 是否可编辑：目前不可选，所有新建的角色都默认勾选可编辑

- 是否启用：勾选后，角色可以被应用到角色分配中

![创建角色](http://upload-images.jianshu.io/upload_images/7452984-c71f6585536d6359.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



#### 3.2 根据所选角色创建

- **操作：**勾选要被继承的角色后，选中【根据所选角色创建】
- **结果：**新建的角色将继承被选角色的权限

#### 3.3 其他操作

- **删除：**如果为内置角色，不可删除；不为内置角色，可删除
- **详情：**可查看创建角色时的信息
- **编辑：**如果是从后台数据库导入的角色，则不可编辑；前端创建的角色默认都可编辑
- **启用/停用：**停用角色后，角色信息依然存在，但在分配角色时无该角色选项


### 4.菜单配置

- 侧边栏/菜单栏
- 可创建、配置菜单栏 

![菜单配置](http://upload-images.jianshu.io/upload_images/7452984-292e19b1faa7d6af.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 4.1 菜单配置

- （1）层级选择
   
    - 通过选择层级，来查看、配置不同层级（全局层/组织层/项目层）的菜单栏

- （2）勾选要添加到菜单栏的目录/菜单
- （3）点击[将所选菜单项添加至菜单结构]
- （4）在菜单展示页将出现刚刚添加的目录/菜单，可拖动进行位置顺序调节

![菜单配置流程](http://upload-images.jianshu.io/upload_images/7452984-573b6571f4f02c54.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 4.2 添加目录

**必填项：**

- 目录中文名称
- 目录英文名称
- 目录编码

**选填项：**

- 目录ICON（目录图标）
    
    - （1）在搜索栏，输入图标名称进行搜索
    - （2）鼠标悬停在图标上，显示图标全称
    - （3）在添加栏，输入图标全称
    - （4）点击添加按钮
    - （5）弹出弹窗，点击确认

![添加目录图标流程](http://upload-images.jianshu.io/upload_images/7452984-cbab412c511232d3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**后继操作：**

- 创建目录成功后，该目录在菜单配置页和菜单展示页底部
- 长按鼠标右键，可对该目录进行位置拖动
- 注：只有目录下有菜单时，该目录才在菜单栏显示；否则该目录在菜单栏不显示 

![添加目录后](http://upload-images.jianshu.io/upload_images/7452984-b29a0096b48de5aa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 4.3 其他操作

- **删除：**目录可删除，菜单不可删除
- **详情：**在菜单配置页可查看菜单详情（目录不可）
- **编辑：**在菜单展示页可编辑目录（菜单不可）

![其他操作](http://upload-images.jianshu.io/upload_images/7452984-46df5fb66f83548a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 5.角色分配（全局层）

- 管理成员（类型：用户/服务）角色
- 可对成员分配、删除、更改、查看（按成员/角色）角色
- 所有用户创建后，在全局层都被赋予【用户服务平台使用者】这个角色

#### 5.1 角色分配（全局层）可选角色

- 用户服务
    - 用户服务平台管理员：菜单管理、角色管理、用户管理（初始化导入）、角色分配（组织层）及除服务发布之外所有功能
    - 用户服务平台使用者：只能进入平台，无其他任何功能权限

- 用户管理
    - 用户管理服务平台管理员

- 系统
    - 框架服务平台使用者

- 微服务管理服务
    - 微服务管理服务管理员

- 自定义角色
    - 如：项目查看者

#### 5.2 分配、更改角色

- **分配角色：**

- （1）点击【添加】

![分配角色](http://upload-images.jianshu.io/upload_images/7452984-fc92f13893fc02ed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- （2）输入成员（用户：用户名），选择角色

![分配角色](http://upload-images.jianshu.io/upload_images/7452984-c43d0380bac74a02.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- **更改角色分配：**
- 点击角色名，出现下图列表即可继续角色更改

![更改角色](http://upload-images.jianshu.io/upload_images/7452984-78919a153893ca9f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- **注意：**

    - 对已存在在角色分配列表里的成员，若进行【添加】操作会报错（因为【添加】操作是对没有被分配过角色的成员进行的），而应在更新操作中进行角色的更改

![已被分配角色的成员无法进行添加操作](http://upload-images.jianshu.io/upload_images/7452984-4b190b602e41cca0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![已被分配角色的成员只能进行更改操作](http://upload-images.jianshu.io/upload_images/7452984-53f0d20fc0579b29.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 5.3 其他操作

- **删除角色分配：**可删除角色分配列表中的数据

![删除角色分配](http://upload-images.jianshu.io/upload_images/7452984-461a980646cb33f7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- **查看角色分配：**可按成员/角色方式查看

![角色分配查看方式](http://upload-images.jianshu.io/upload_images/7452984-653fe60c446b6a99.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- **搜索角色分配：**可根据搜索条件查找角色分配列表的数据项
    - 不选择属性，根据输入值进行全局搜素
    - 选择一个属性：类型（用户/服务）、成员、昵称，输入相应属性值进行模糊搜索