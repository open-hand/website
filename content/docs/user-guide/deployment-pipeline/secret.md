
+++
title = "密文"
description = "密文是用来保存小片敏感数据的Kubernetes资源对象，例如密码，token，或者密钥。"
weight = 10
+++

# 密文

密文是用来保存小片敏感数据的Kubernetes资源对象，例如密码，token，或者密钥。
    
  - **菜单层次**：项目层
  - **菜单路径**：部署流水线 > 配置管理 > 密文
  - **默认角色**：项目所有者、项目成员（环境成员）
<blockquote class="note">
只有项目所有者与被分配环境权限的项目成员才能查看和操作此页面。
</blockquote>

## 创建密文  
![创建密文](/docs/user-guide/deployment-pipeline/image/create-secret.jpg)
 
 1. 点击 `创建密文` ；

 2. 选择`环境`，只可选择运行中的环境，故障中的环境不可选；

 3. 填写`密文名称`与`密文描述`，为该密文填写一个名称并添加描述；
 <blockquote class="warning"> 密文名称：由小写字母、数字或‘-’组成，并且必须以字母或数字开始和结束！环境下唯一。</blockquote>

 4. 填写`键值对`，或是直接粘贴多行“键=值”格式的字段至任何键框中，来批量输入键值对 ，密文的value输入后，会以密文的形式展示；  
 <blockquote class="warning"> 键：可以是任意的大小写字母，不能输入除"."、"-"和"_"以外的字符！且在同一个密文中键不能相同。</blockquote>  
 
 5. 点击 `创建`完成密文的创建。  
<blockquote class="note">
  高级功能：您可粘贴多行“键=值”格式的字段至任何键框中，以便于批量输入键值对。
</blockquote>



## 查看密文详情
 进`部署流水线`后，点击`密文`，进入密文界面。通过列表，可以查看到密文的状态、名称、键以及最近更新时间；
 
  ![secret](/docs/user-guide/deployment-pipeline/image/secret.jpg)   
 
 
## 编辑密文
点击`编辑密文` → ![编辑密文按钮](/docs/user-guide/deployment-pipeline/image/update_env_button.png) 来编辑此密文中的键值对。  
![编辑密文](/docs/user-guide/deployment-pipeline/image/edit-secret.jpg)  


## 删除密文

点击`删除密文` → ![删除密文按钮](/docs/user-guide/deployment-pipeline/image/del_net_button.png) 来删除此密文。

<blockquote class="note">
  环境状态为未连接时或状态是处理中时不可操作。
</blockquote>


## 更多操作
- [环境总览](../environments-overview)
- [环境流水线](../environment-pipeline)
- [容器管理](../container)
- [配置映射](../configmap)


