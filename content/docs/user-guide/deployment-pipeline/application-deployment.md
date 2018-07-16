+++
title = "应用部署"
description = "提供可视化、一键式部署应用，支持并行部署和流水线无缝集成，实现部署环境标准化和部署过程自动化"
weight = 2
+++

# 应用部署

提供可视化、一键式部署应用，支持并行部署和流水线无缝集成，实现部署环境标准化和部署过程自动化,点击部署后，平台将相关的操作发送至 **环境流水线**创建的环境客户端，然后环境客户端执行相关的helm命令和k8s-api-server交互。常见的有helm install和helm upgrade，即实例创建和实例升级。
  
  - **菜单层次**：项目层
  - **菜单路径**：部署流水线 > 应用部署
  - **默认角色**：部署管理员

## 部署应用
部署应用是将一个版本的应用部署至指定环境的操作，提供可视化、一键式部署应用，支持并行部署和流水线无缝集成，实现部署环境标准化和部署过程自动化。

#### 操作流程:

 1. 选择将要部署的应用,可选择应用有2种,一种为项目下的应用，另外一种为应用市场的应用。这些应有都必须是启用而且有版本!

 2. 选择将要部署的版本,应用的版本.

 3. 选择要部署的已连接环境（若所选的环境状态为故障中，则不能完成部署应用的操作）

 4. 修改配置信息,第一次部署时为应用版本里面的默认values文件,在某个环境部署过之后，查询出来的为部署在某环境中上次部署实例的values文件和版本里面自带的values的合并值,合并逻辑为修改的values替换,新增的values新增.
     	<blockquote class="warning">
      当上次部署时候删除了某个values行，只会影响到上次部署，下次部署的时候，该行仍然会显示出来！
    	  </blockquote>
    
    ![enter description here](/docs/user-guide/deployment-pipeline/imge/envcreate.png)

<<<<<<< 6c230b9bff6580ed2dfaab21ad790b5f0a0ca0d3
 1. 选择部署模式；（部署模式有新建实例和替换实例两种）
=======
<<<<<<< Updated upstream
 1. 选择部署模式；（部署模式有创建实例和替换实例两种）
>>>>>>> [FIX] fix the doc of deployment-pipeline

    - 新建实例：建立新的实例。

<<<<<<< 6c230b9bff6580ed2dfaab21ad790b5f0a0ca0d3
    - 替换实例：滚动更新已创建实例。

 1. 确认部署信息；

 1. 点击 `部署应用` 按钮，完成部署。
=======
    - 替换实例：滚动更新实例。
=======
    - 部署values有四种显示格式：
        - 新增：新增的参数行，显示绿色
        - 修改：修改的values值，显示蓝色
        - 红色x: yaml格式错误的行，显示红色xx
        - 未改变：默认色
      	<blockquote class="note">
       每修改一次部署values的值都会校验一次yaml格式，有错就会界面上用红色x提示,鼠标点上去会显示具体的报错行。未修改是不能点击下一步的，修改之后点击下一步。但是当版本里面的values文件就有错时，修改完之后点击下一步仍然会报错，提示版本values有错，请修改应用的values文件！
    	  </blockquote>
 5. 选择部署模式；（部署模式有新建实例和替换实例两种）

    - 新建实例：建立新的实例。新建一个全新的实例，对应helm install操作

    - 替换实例：滚动更新已创建实例。能选到的实例为应用在该环境上所部署的实例，对应helm upgrade操作
>>>>>>> Stashed changes

 6. 确认部署信息；
      
      ![enter description here](/docs/user-guide/deployment-pipeline/imge/envcreate.png)
      
 7. 点击 `部署应用` 按钮，完成部署。
>>>>>>> [FIX] fix the doc of deployment-pipeline
