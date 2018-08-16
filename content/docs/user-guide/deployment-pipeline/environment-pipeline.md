+++
title = "环境流水线"
description = "是面向平台管理员、项目创建者和项目所有者根据不同用途配置相对应的环境信息。可以创建环境，删除环境，及对环境详情信息进行编辑修改"
weight = 1
+++

# 环境流水线

环境是一个客户端,是部署流水线和k8s信息交互的桥梁，实质上也是一个实例，只不过该实例是直接用helm部署在集群中，有了环境，我们就可以部署实例，部署网络，部署域名。

环境可以部署在不同的集群中，由此就会产生不同的环境。比如开发测试环境、预生产环境、生产环境等。使系统的开发，测试，上线变的更加可视化，流程化。

当创建多个环境后环境流水线会自动生成一条环境流水线，用户可以根据需要调整顺序环境的顺序，通过环境流水线，用户可以清晰地定义和查看应用部署的顺序。

  
  - **菜单层次**：项目层
  - **菜单路径**：部署流水线 > 环境流水线
  - **默认角色**：项目所有者、项目成员、部署管理员
    <blockquote class="note">
         项目所有者和项目成员对环境流水线只有查看界面的权限，不可进行编辑修改。
      </blockquote>

## 环境流水线

- 进入`部署流水线`后，点击 `环境流水线` 页签；
 
 **1. 前置条件**

 - 使用集群节点地址，用户名，密码连接到所要创建环境的集群机器上，确保集群内安装了helm。


**2. 创建环境**
  
  ![创建环境](/docs/user-guide/deployment-pipeline/image/envcreate.png)
 
-  点击`创建`，系统会滑出创建环境页面，输入相关信息，有环境编码、环境名称、环境描述。
	
	环境编码:集群中产生的环境客户端的名称，限制60个字符。
	     <blockquote class="warning">
       只能由小写字母、数字、"-"组成，且以小写字母开头，不能以"-"结尾
    	</blockquote>

	环境名称：平台环境的显示名称。现在为10个字符。
	
	环境描述：环境的描述，限制为60字符。

    <blockquote class="note">
        根据用途配置不同的环境，常见的有开发环境，集成测试环境，用户访问测试环境及正式环境。新环境默认新增在环境流水线的最后一个节点。
     </blockquote>

-  填写完成后，点击`创建`，界面会自动生成可执行的shell脚本命令，其中各个参数已经由后端服务自动生成。
	``` 
	if ! [ -x "$(command -v kubectl)" ]; then
  	echo 'Error: kubectl is not installed.' >&2
  	exit 1
	fi
	if ! [ -x "$(command -v helm)" ]; then
 	 echo 'Error: helm is not installed.' >&2
  	exit 1
	fi
	helm install --repo=http://chart.choerodon.com.cn/choerodon/c7ncd/ \
    --namespace=younger-env \
    --version=0.8.0-dev.20180710092530 \
    --set config.connect=ws://devops-service.alpha.saas.hand-china.com/agent/ \
    --set config.token=3c7e95f3-1de7-40b4-8859-69c697f65574 \
    --set config.envId=17 \
    --set rbac.create=true \
    choerodon-agent
	```
	- shell命令介绍：shell命令由2个if判断命令和一个kubectl命令以及helm命令组成
		
		- if判断: 判断集群中是否支持kubectl命令以及是否支持helm命令
		
		- kubectl: 在集群中创建一个命名空间，命名空间的名字为创建环境时候的编码

		- helm: 在集群中的kubectl创建的命名空间内通过helm install部署一个环境客户端的release,等同于平台的实例。参数有：

			- repo: chart仓库地址，取值为部署持续交互时的环境变量`env.open.AGENT_REPOURL`
			- namespace: 所属命名空间，取值为环境编码
			- name: release name，取值为环境编码
			- version: chart version，取值为署持续交互时的环境变量`env.open.AGENT_VERSION`
			- config: 环境变量
				connect:取值为部署持续交互时的环境变量`env.open.AGENT_SERVICEURL` 
				token：生成环境时自动生成
				envId: 环境的唯一性标识
				rbac.create: 用于控制kubectl权限     
			- choerodon-agent: chart name


-  复制脚本命令至集群中运行，与平台建立连接。
     <blockquote class="note">
        运行前需要先初始化helm helm init ，helm repo update。
    </blockquote>
	     <blockquote class="warning">
        helm 的版本必须与服务器上helm版本一致。
    </blockquote>


- 执行成功后到环境流水线界面可以看到我们之前创建好的环境状态为连接状态。
	    
**3. 升级环境**

- 当运行中的环境的版本低于部署持续交互devops-service环境变量`env.open.AGENT_VERSION`的值时,此时环境会自动置成未连接状态,并提示`版本过低，请升级！`,然后点击激活环境，会自动生成升级环境的shell命令,升级命令和创建命令的参数是一样的，只不过是操作由helm install变为了helm upgrade。

	``` 
	if ! [ -x "$(command -v kubectl)" ]; then
  	echo 'Error: kubectl is not installed.' >&2
  	exit 1
	fi
	if ! [ -x "$(command -v helm)" ]; then
 	 echo 'Error: helm is not installed.' >&2
  	exit 1
	fi
	helm upgrade --repo=http://chart.choerodon.com.cn/choerodon/c7ncd/ \
    --namespace=younger-env \
    --version=0.8.0-dev.20180710092530 \
    --set config.connect=ws://devops-service.alpha.saas.hand-china.com/agent/ \
    --set config.token=3c7e95f3-1de7-40b4-8859-69c697f65574 \
    --set config.envId=17 \
    --set rbac.create=true \
    younger-env \
    choerodon-agent
	```
- 复制脚本命令至集群中运行，环境重新置为已连接。
	 <blockquote class="warning">
       	当环境状态是未连接,提示要升级时,实例,网络,域名只能查看,不能操作！
    	</blockquote>

**4. 查看环境流水线详情**

 1. 进入`部署流水线`后，点击 `环境流水线` 页签；

 2. 查看应用环境的运行情况。

![应用环境](/docs/user-guide/deployment-pipeline/image/应用环境.png)
 
- 在环境卡片中，点击`复制指令`→ ![复制指令按钮](/docs/user-guide/deployment-pipeline/image/copy_button.png) ，复制代码至Kubernetes运行，与平台建立链接。
- 在环境卡片中，点击`修改环境`→ ![修改环境按钮](/docs/user-guide/deployment-pipeline/image/update_env_button.png) ，修改环境名称及描述。
-  在环境卡片中，点击`禁用环境`→ ![停用按钮](/docs/user-guide/deployment-pipeline/image/stop_button.png) ，当点击确认后，该环境将被禁用。
 <blockquote class="warning">
    当环境中有运行中的实例，网络，域名时，环境不可禁用！
    </blockquote>
 
## 环境客户端补充说明

环境客户端使用了平台的 [Choerodon-Agent](../../../concept/choerodon-agent/) 技术，通过 websocket 方式连接到猪齿鱼平台。双方通过 `command/response` 方式来进行交互，来完成 `helm release` 的管理、网络管理、 k8s 对象监听和容器日志和 shell 等功能。 

## 环境停用区 

可在环境停用区查看已被停用的环境，点击卡片右上角`启用按钮` → ![启用按钮](/docs/user-guide/deployment-pipeline/image/start_button.png) 重新启用，重新启用后默认加至流水线最后一个节点。

## 更多操作
- [应用部署](../application-deployment)
- [实例管理](../instance)
- [网络管理](../service)

 
