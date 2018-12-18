
+++
title = "配置映射"
description = "配置映射是用来存储配置文件的Kubernetes资源对象，其中存储的键值对可以在pods中使用。"
weight = 9
+++

# 配置映射

配置映射是用来存储配置文件的Kubernetes资源对象，其中存储的键值对可以在pods中使用。
    
  - **菜单层次**：项目层
  - **菜单路径**：部署流水线 > 配置管理 > 配置映射
  - **默认角色**：项目所有者、项目成员（环境成员）
<blockquote class="note">
只有项目所有者与被分配环境权限的项目成员才能查看和操作此页面。
</blockquote>

## 创建配置映射  
![创建配置映射](/docs/user-guide/deployment-pipeline/image/create-configmap.jpg)
 
 1. 点击 `创建配置映射` ；

 2. 选择`环境`，只可选择运行中的环境，故障中的环境不可选；

 3. 填写`配置映射名称`与`配置映射描述`，为该配置映射填写一个名称并添加描述；
 <blockquote class="warning"> 配置映射名称：由小写字母、数字或‘-’组成，并且必须以字母或数字开始和结束！环境下唯一。</blockquote>

 4. 填写`键值对`，或是直接粘贴多行“键=值”格式的字段至任何键框中，来批量输入键值对 ；  
 <blockquote class="warning"> 键：可以是任意的大小写字母，不能输入除"."、"-"和"_"以外的字符！且在同一个配置映射下键不能相同。</blockquote>  
 
 5. 点击 `创建`完成配置映射的创建。  
<blockquote class="note">
  高级功能：您可粘贴多行“键=值”格式的字段至任何键框中，以便于批量输入键值对。
</blockquote>


## 查看配置映射详情
 进`部署流水线`后，点击`配置映射`，进入配置映射界面。通过列表，可以查看到配置映射的状态、名称、键以及最近更新时间；
 
  ![配置映射](/docs/user-guide/deployment-pipeline/image/configmap.png)  
  
## 编辑配置映射
点击`编辑配置映射` → ![编辑配置映射按钮](/docs/user-guide/deployment-pipeline/image/update_env_button.png) 来编辑此配置映射中的键值对。  
![编辑配置映射](/docs/user-guide/deployment-pipeline/image/edit-configmap.jpg)  

## 删除配置映射

点击`删除配置映射` → ![删除配置映射按钮](/docs/user-guide/deployment-pipeline/image/del_net_button.png) 来删除此配置映射。

<blockquote class="note">
  环境状态为未连接时或状态是处理中时不可操作。
</blockquote>


## 更多操作
- [环境总览](../environments-overview)
- [环境流水线](../environment-pipeline)
- [容器管理](../container)
- [密文](../secret)



