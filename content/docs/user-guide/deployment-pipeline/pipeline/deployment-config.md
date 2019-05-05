+++
title = "部署配置"
description = "部署配置用于管理流水线中添加部署任务时需要用到的配置信息。"
weight = 4
+++

# 部署配置

部署配置用于管理流水线中添加部署任务时需要用到的配置信息。您可在部署配置页面创建所需的部署配置，创建成功后的部署配置将能在流水线中添加部署任务时进行选择。


  - **菜单层次**：项目层
  - **菜单路径**：部署流水线 > 流水线 > 部署配置
  - **默认角色**：项目所有者、项目成员（环境成员）
  
    <blockquote class="note">
      只有项目所有者和被分配环境权限的项目成员才能在此创建对应环境的部署配置。
    </blockquote>
    	  
## 创建部署配置
![创建部署配置](/docs/user-guide/deployment-pipeline/pipeline/image/create-deployment-config.jpg)
 
 1. 点击 `创建部署配置` ；  
 
 2. 填写`部署配置名称`，此处名称在项目下唯一；
 
 3. 填写`描述`，用于描述此部署配置的用途；  
 
 4. 选择`应用`，为此项目下的应用；  

 5. 选择`环境`，此处仅能选择项项目下有权限的环境； 
 
 6. 修改`配置信息`，选择应用与环境之后会出现一个默认的配置信息，可以在此对其进行修改。
 

## 查看部署配置
 进`部署流水线`后，点击`部署配置`，进入至部署配置主界面。通过列表，可以查看到部署配置的名称、描述、对应的应用与对应的环境。
 
  ![查看部署配置](/docs/user-guide/deployment-pipeline/pipeline/image/deployment-config.jpg)       



## 编辑部署配置
点击`编辑部署配置` → ![编辑部署配置按钮](/docs/user-guide/deployment-pipeline/image/update_env_button.png) 来编辑部署配置，可以编辑修改部署配置中的名称、描述以及对应的配置信息。 
![编辑部署配置](/docs/user-guide/deployment-pipeline/pipeline/image/edit-deployment-config.jpg)   

<blockquote  class="warning">若部署配置已有关联的部署任务，则不能再修改应用与环境。
</blockquote>



## 删除部署配置

点击`删除部署配置` → ![删除部署配置按钮](/docs/user-guide/deployment-pipeline/image/del_net_button.png) 来删除对应的部署配置。
<blockquote  class="warning">仅能删除没有关联流水线中部署任务的部署配置。
</blockquote>



## 更多操作
- [流水线管理](../pipeline-management)
- [流水线执行总览](../pipeline-record)
- [应用部署](/zh/docs/user-guide/deployment-pipeline/application-deployment)






