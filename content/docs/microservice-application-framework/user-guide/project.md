+++
title = "项目层"
weight = 3
+++

# III 项目层

- 选中顶部导航栏的【组织/项目】选项

![image.png](http://upload-images.jianshu.io/upload_images/7452984-3f60b5cc0c03e003.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 弹出组织/项目列表的弹窗
    - 在下拉菜单中选择一个组织，组织/项目列表则变为被选组织与该组织下的所有项目
    - 项目过多时，可在搜索框中对项目名进行模糊搜索
    - 鼠标右键双击组织/项目列表的项目选项，则进入该项目

![image.png](http://upload-images.jianshu.io/upload_images/7452984-08a1f23716d4c9f6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


    
## 一、用户服务

### 1.角色分配（项目层）

- 管理成员（类型：用户/服务）角色
- 可对成员分配、删除、更改、查看（按成员/角色）角色
- 默认每个项目里，创建该项目的用户有【项目所有者】、【用户服务项目管理员】这两个角色

#### 1.1 角色分配（项目层）可选角色

- 用户服务
    - 项目查看者：只可看到被分配该角色的项目，进去项目界面后无任何功能权限
    - 用户服务项目管理员：只能看到被分配的项目，**项目层**具有【用户服务】所有功能权限-可角色分配（项目层）

- 开发管理
    - 项目所有者：只能看到被分配的项目，**项目层**具有【用户服务】所有功能权限-角色分配（项目层）；具有【开发管理】所有功能权限-服务管理、服务发布、环境管理
    - 项目成员：只能看到被分配的项目，**项目层**只有【开发管理】部分功能权限-服务详情查看、分支管理、服务版本、代码质量查看、服务发布
    - 源代码管理员：只能看到被分配的项目，**项目层**只有【开发管理】部分功能权限-服务创建、服务详情查看、分支管理、服务版本、代码质量查看、服务发布

- 看板服务
    - 看板项目所有者：只能看到被分配的项目，**项目层**具有【敏捷管理】所有功能权限-故事管理、冲刺管理、任务和缺陷
    - 看板项目成员：只能看到被分配的项目，**项目层**只有【敏捷管理】部分功能权限-故事管理、冲刺管理、任务和缺陷


- 洞察数据接口
    -开发监控查看者：只能看到被分配的项目，**项目层**具有【智能洞察】所有功能权限-全流程信息监控查看

#### 1.2 分配、更改角色

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

#### 1.3 其他操作

- **删除角色分配：**可删除角色分配列表中的数据

![删除角色分配](http://upload-images.jianshu.io/upload_images/7452984-461a980646cb33f7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- **查看角色分配：**可按成员/角色方式查看

![角色分配查看方式](http://upload-images.jianshu.io/upload_images/7452984-653fe60c446b6a99.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- **搜索角色分配：**可根据搜索条件查找角色分配列表的数据项
    - 不选择属性，根据输入值进行全局搜素
    - 选择一个属性：类型（用户/服务）、成员、昵称，输入相应属性值进行模糊搜索
