+++
title = "组件设置"
description = "组件设置用于管理项目下所有的组件配置，目前包括了Helm仓库与Docker仓库。"
weight = 3
+++

# 组件设置

组件设置用于管理项目下所有的组件配置，目前包括了Helm仓库与Docker仓库。在此创建成功的组件配置可用于项目下所有应用。即在创建应用或者编辑应用时便可以使用高级设置来更改系统预置的Helm仓库与Docker仓库。更改了默认的Docker仓库后，此应用之后生成的镜像均会被存放于目前的Docker仓库内；同理，更改Helm仓库后，之后生成的charts包也将存放在新的Helm仓库之中。

  - **菜单层次**：项目层
  - **菜单路径**：项目设置 > 组件设置
  - **默认角色**：项目所有者
  
    <blockquote class="note">
    系统预设的组件配置不可进行操作
    </blockquote>
    	  
## 创建组件配置

 1. 点击 `创建组件配置` ；  
 
 2. 选择`组件配置类型`，目前可选择Docker仓库和Helm仓库；


  - Docker仓库：选择了Docker仓库后，需要填写该仓库的的名称（项目下唯一且不超过10个字符）、地址、有推拉代码权限的用户名和密码及其对应的邮箱。至于最后的Harbor project的填写，若您想将之后生成的镜像存放于Docker仓库里已有的project中，则在此填入对应的Harbor project名称即可。若不填，则默认在此仓库中新建一个Harbor project用于存放之后的镜像。  
  ![创建Docker仓库](/docs/user-guide/system-configuration/project/image/create-elements-docker.jpg)

  - Helm仓库：选择了Helm仓库后，只需填写该仓库的的名称（项目下唯一且不超过10个字符）与地址。  
  ![创建Helm仓库](/docs/user-guide/system-configuration/project/image/create-elements-helm.jpg)

  
   <blockquote class="warning"> 填写完成后，建议先点击页面下方的`测试连接`按钮以确保所填信息无误。测试连接成功后，才能成功创建对应的组件配置。 </blockquote>


## 查看组件配置列表
 在`项目设置`模块，点击`组件设置`，进入组件设置的主界面。通过列表，可以查看到此项目下所有的自定义组件配置和系统预置组件配置及其相关的信息，其中包括了组件配置类型、名称、地址与来源。
 
  ![组件配置](/docs/user-guide/system-configuration/project/image/elements.jpg)


 
## 编辑组件配置
点击`编辑组件配置` → ![编辑组件配置按钮](/docs/user-guide/deployment-pipeline/image/update_env_button.png) 来编辑对应的组件配置。在组件配置的编辑界面，除了组件固有的组件配置类型不可修改，其他的信息均可修改。修改后，只有通过测试连接后才能成功保存。  

![编辑组件配置](/docs/user-guide/system-configuration/project/image/edit-elements.jpg)  


## 删除组件配置

点击`删除组件配置` → ![删除组件配置按钮](/docs/user-guide/deployment-pipeline/image/del_net_button.png) 来删除列表中的自定义的组件配置。

<blockquote class="warning">
  仅允许删除没有关联应用的自定义组件配置。
</blockquote>



## 更多操作
- [项目管理](../../tenant/project)
- [项目角色分配](../role-assignment)




