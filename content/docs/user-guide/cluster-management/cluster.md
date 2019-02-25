+++
title = "集群"
description = "Kubernetes集群是一个用于运行Kubernetes的托管群组。"
weight = 2
+++

# 集群

Kubernetes集群是一个用于运行Kubernetes的托管群组。有了集群，我们就可以以此来统一调配资源，管理环境。在每个集群中，您可以设置是否对组织下各个项目公开，配置后，只有被勾选项目中的环境才能连接到该集群。  
同时，自0.12.0版本后，CertManager的安装被集成到了agent里，agent会根据设置自行安装对应版本的CertManager。集群中安装了CrtManager后，便能在连接该集群的环境下正常进行申请证书的操作。


  - **菜单层次**：组织层
  
  - **菜单路径**：DevOps管理 > 集群管理
  
  - **默认角色**：组织管理员
  
<blockquote class="note">
 只有组织管理员对集群页面有查看和编辑操作的权限。
</blockquote>

<blockquote class="note">
只能删除未连接且不含关联环境的集群。
</blockquote>

## 管理集群
- 进入`集群管理`后，点击 `集群` 页签；
 
 **1. 前置条件**

 - 使用集群节点地址，用户名，密码连接到所要创建环境的集群机器上，确保集群内安装了helm。


**2. 创建集群**
  
  ![创建集群](/docs/user-guide/cluster-management/image/clustercreate.png)
 
-  点击`创建集群`，系统会滑出创建集群页面，输入相关信息，包括集群编码、集群名称和集群描述；同时，组织管理员可以为该集群配置特定的项目，配置后，只有被勾选项目下的环境才能连接到此集群。
   
	
	集群编码：集群客户端的名称，限制30个字符。
	     <blockquote class="warning">
       只能由小写字母、数字、"-"组成，且以小写字母开头，不能以"-"结尾
    	</blockquote>

	集群名称：组织中集群的显示名称。现在为10个字符。
	
	集群描述：环境的描述，限制为30字符。  
	
    集群权限分配：可选择集群公开范围，包括组织下所有项目与组织下特定项目。若选择组织下所有项目，那么表示该组织下所有项目中的环境都能与该集群相连接；若选择项目下特定项目，就表示只有被勾选项目下的环境才能连接到该集群。目前平台默认选择公开范围为：组织下所有项目。  
      ![集群权限](/docs/user-guide/cluster-management/image/cluster-authority.jpg)


-  填写完成后，点击`创建`，界面会自动生成可执行的shell脚本命令，其中各个参数已经由后端服务自动生成。
	``` 
	helm install --repo=http://chart.choerodon.com.cn/choerodon/c7ncd/ \
    --namespace=choerodon \
    --name=choerodon-cluster-agent-asdasd123 \
    --version=2018.11.12-162515-master \
    --set config.connect=ws://devops-service-front.staging.saas.hand-china.com/agent/ \
    --set config.token=7f58f4cd-9ee0-4abd-9ca5-b2e667f2da59 \
    --set config.clusterId=14 \
    --set config.choerodonId=asdasd123 \
    --set rbac.create=true \
    choerodon-cluster-agent
	```
		
	

		- helm: 在集群中的kubectl创建的命名空间内通过helm install部署一个集群客户端。参数有：

			- repo: chart仓库地址，取值为部署持续交互时的环境变量`env.open.AGENT_REPOURL`
			- name: release name，取值为集群编码
			- version: chart version，取值为署持续交付时的环境变量`env.open.AGENT_VERSION`
			- config: 环境变量
				connect:取值为部署持续交付时的环境变量`env.open.AGENT_SERVICEURL` 
				token：生成集群时自动生成
				clusterId: 集群的唯一性标识
				rbac.create: 用于控制kubectl权限     
			- choerodon-agent: chart name


-  复制脚本命令至集群中运行，与平台建立连接。
     <blockquote class="note">
        运行前需要先初始化helm helm init ，helm repo update。
    </blockquote>
	     <blockquote class="warning">
        helm 的版本必须与服务器上helm版本一致。
    </blockquote>


- 执行成功后到集群界面可以看到我们之前创建好的集群状态为连接状态。
	    
**3. 升级集群**

- 当运行中的集群的版本低于部署持续交付devops-service环境变量`env.open.AGENT_VERSION`的值时，此时集群会自动置成未连接状态，并提示`版本过低，请升级！`，然后点击激活集群，会自动生成升级集群的shell命令，升级命令和创建命令的参数是一样的，不过是操作由helm install变为了helm upgrade。

	``` 
	helm upgrade --repo=http://chart.choerodon.com.cn/choerodon/c7ncd/ \
    --namespace=choerodon \
    --name=choerodon-cluster-agent-asdasd123 \
    --version=2018.11.12-162515-master \
    --set config.connect=ws://devops-service-front.staging.saas.hand-china.com/agent/ \
    --set config.token=677ccba9-fe35-4fc8-ae0e-fd1f4f30b9d4 \
    --set config.clusterId=13 \
    --set config.choerodonId=asdasd123 \
    --set rbac.create=true \
    choerodon \
    choerodon-cluster-agent
	```
- 复制脚本命令至集群中运行，集群重新置为已连接。
	 <blockquote class="warning">
       	当集群状态是未连接，提示要升级时，所有相关联的环境均为未连接状态！
    	</blockquote>  
          


**4. 查看集群详情**

 (1). 进入`集群管理`后，点击 `集群` 页签；

 (2). 查看集群的运行情况。运行中的集群会统一分布在列表的上部分，而状态为未连接的集群则聚集在列表的下半部分。

![集群](/docs/user-guide/cluster-management/image/cluster.png)
 

- 在集群列表中，点击`编辑集群`→ ![编辑集群](/docs/user-guide/deployment-pipeline/image/update_env_button.png) ，修改集群名称、描述以及集群公开范围。
- 在集群列表中，点击`删除集群`→ ![删除按钮](/docs/user-guide/cluster-management/image/del_button.png) ，会弹出复制删除指令的提示框，当复制指令去k8s运行后，再回到平台点击“已执行，删除”，该集群将被彻底删除。   
 <blockquote class="warning">
    只有未连接状态且其中不含关联环境的集群才能被删除！
    </blockquote>
   
- 在集群列表中，找一个未连接状态的集群，点击 `激活集群`→ ![激活按钮](/docs/user-guide/cluster-management/image/active_button.jpg) ，会从界面右侧弹出激活集群的指令，复制该脚本命令至集群中运行，成功后，集群状态会置为已连接。    

(3). 查看运行中集群的所有节点详情  

- 在集群列表中，每一个处于运行中状态的集群下方都会展示出该集群下部分节点的信息，点击`全部节点`，查看该集群下所有节点的相关信息；若想查看某个节点的详细信息，点击该节点的名称即可。  
![集群节点](/docs/user-guide/cluster-management/image/cluster-node.png)

- 同时，在某个节点的详情界面， 能查看到此节点中的资源分配情况和其中的节点Pods详情。  
![集群节点](/docs/user-guide/cluster-management/image/cluster-pod.png)


 

 
