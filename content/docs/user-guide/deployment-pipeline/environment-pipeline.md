+++
title = "环境流水线"
description = ""
weight = 1
+++

# 环境流水线

环境是指一个应用可以被部署的地方。常见环境有开发测试环境、预生产环境、生产环境等。Choerodon 自动为您的项目生成一条环境流水线，用户可以根据需要调整顺序环境的顺序，通过环境流水线，用户可以清晰地定义和查看应用部署的顺序。

  
  - **菜单层次**：项目层
  - **菜单路径**：持续交付 > 部署流水线 > 环境流水线
  - **默认角色**：项目所有者、项目成员、部署管理员
    <blockquote class="note">
         项目所有者和项目成员对环境流水线只有查看界面的权限，不可进行编辑修改。
      </blockquote>

### 创建环境

 **1. 前置条件**

 - 本机安装kubectl
 - 本机安装helm
     <blockquote class="warning">
        helm需要先初始化。
    </blockquote>

**2. 具体的创建步骤如下：**

 -  点击`创建`，系统会滑出创建环境页面，输入相关信息，有环境编码、环境名称、环境描述。

    <blockquote class="note">
        根据用途配置不同的环境，常见的有开发环境，集成测试环境，用户访问测试环境及正式环境。新环境默认新增在环境流水线的最后一个节点。
     </blockquote>

 -  填写完成后，点击`创建`。
 -  复制Kubectl命令至kubernetes中运行，与平台建立连接。
     <blockquote class="note">
        运行前需要先初始化helm helm init ，helm repo update。
    </blockquote>
	     <blockquote class="warning">
        helm 的版本必须与服务器上helm版本一致。
    </blockquote>
    从界面上复制下来的安装命令如下所示，其中各个参数已经由后端服务自动生成。
     	 	 
	``` 
	if ! [ -x "$(command -v kubectl)" ]; then
	  echo 'Error: kubectl is not installed.' >&2
	  exit 1
	fi
	if ! [ -x "$(command -v helm)" ]; then
	  echo 'Error: helm is not installed.' >&2
	  exit 1
	fi
	kubectl create namespace cfe
	helm install --repo=http://your.chart.url/ \
		--namespace=cfe \
		--name=cfe \
		--version=0.6.0-dev.20180524035017 \
		--set config.connect=ws://your.devops.service.domain/agent/ \
		--set config.token=e43d5398-635a-48c1-98fd-30a97e10f8c6 \
		--set config.envId=19 \
		choerodon-agent
	```

 - 将此命令粘贴至命令行执行。

 - 执行成功后到环境流水线界面可以看到我们之前创建好的环境状态为连接状态。

**3. 环境客户端补充说明**

环境客户端使用了平台的[Choerodon-Agent](../../../concept/choerodon-agent/)技术，通过websocket方式连接到猪齿鱼平台。双方通过`command/response`方式来进行交互，来完成`helm release`的管理、网络管理、k8s对象监听和容器日志和shell等功能。 
		

### 查看环境流水线详情

 1. 进入持续交付后，点击 `环境流水线` 页签；

 1. 查看应用环境的运行情况。

>- 在环境卡片中，点击`复制指令`→ ![复制指令按钮](/docs/user-guide/deployment-pipeline/image/复制指令按钮.png) ，复制代码至Kubernetes运行，与平台建立链接。
>- 在环境卡片中，点击`修改环境`→ ![修改环境按钮](/docs/user-guide/deployment-pipeline/image/修改环境按钮.png) ，修改环境名称及描述。
>- 在环境卡片中，点击`禁用环境`→ ![停用按钮](/docs/user-guide/deployment-pipeline/image/停用按钮.png) ，当点击确认后，该环境将被禁用。

### 环境停用区 

可在环境停用区查看已被停用的环境，点击卡片右上角`启用按钮` → ![启用按钮](/docs/user-guide/deployment-pipeline/image/启用按钮.png) 重新启用。


 
