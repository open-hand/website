+++
title = "集群管理"
description = ""
weight = 1
+++


## 1. 概述

集群是用于运行k8s的托管群组。有了集群，我们就可以以此来统一调配资源，管理环境。此外，每个集群可以对组织下各个项目设置是否公开，配置后，只有被分配权限的项目中的环境才能连接到该集群。

同时，自0.12.0版本后，CertManager的安装被集成到了agent里，agent会根据设置自行安装对应版本的CertManager。集群中安装了CrtManager后，便能在连接该集群的环境下正常进行申请证书的操作。

>  只有项目所有者对集群页面有查看和编辑操作的权限。
>   只能删除未连接且不含关联环境的集群。

通过此页面，您可以了解到如何创建、修改和删除集群，以及如何查看节点详情。

![image](/docs/user-guide/deploy/cluster/image/cluster-management-01.png)

## 2. 创建集群

![image](/docs/user-guide/deploy/cluster/image/cluster-management-02.png)

1. 点击左上方的 `创建集群`，右侧会弹出创建集群页面，输入相关信息，包括集群编码、集群名称和集群描述；

> 集群创建成功后，默认向该组织下所有项目公开，若想为所创集群配置特定的公开范围，需要在集群的权限管理页面进行设置。

- 集群编码：集群客户端的名称，限制为30个字符。
    > 只能由小写字母、数字、”-“组成，且以小写字母开头，不能以”-“结尾

- 集群名称：项目下集群的显示名称。限制为10个字符。
- 集群描述：环境的描述，限制为30字符。



2. 填写完成后，点击`创建`，界面会自动生成可执行的shell脚本命令，其中各个参数已经由后端服务自动生成。
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
	- connect:取值为部署持续交付时的环境变量`env.open.AGENT_SERVICEURL` 
	- token：生成集群时自动生成
	- clusterId: 集群的唯一性标识
	- rbac.create: 用于控制kubectl权限     
    - choerodon-agent: chart name


3.  复制脚本命令至集群中运行，与平台建立连接。
     
      > - 运行前需要先初始化helm helm init ，helm repo update。
      > - helm 的版本必须与服务器上helm版本一致。



4. 执行成功后回到集群管理界面，便可以看到之前创建好的集群状态变为连接状态。

## 3. 管理集群

在左侧的树结构中，点击![image](https://minio.choerodon.com.cn/knowledgebase-service/file_b53c0c1755864d7f9e3f7bb1f88b37fc_blob.png)标识，可选择 `修改集群`或者 `删除集群`。同时，对于未连接的集群，还可以选择 `激活集群`的选项。

- 修改集群：此处仅支持修改集群的名称与描述
- 删除集群：点击 `删除集群`，会弹出复制删除指令的提示框，当复制指令去k8s运行后，再回到平台点击“已执行，删除”，该集群将被彻底删除。   

> 只有未连接状态且其中不含关联环境的集群才能被删除！
- 激活集群：该操作仅用于未连接状态的集群。

 ## 4. 查看集群详情

在集群管理页面的树结构中，状态为运行中的集群会统一分布在树结构上部分，而状态为未连接的集群则聚集在树结构的下半部分。

![image](/docs/user-guide/deploy/cluster/image/cluster-management-03.png)

在集群树结构中，每一个处于运行中状态的集群下方都会展示出该集群下部分节点的信息，点击某个节点名称，即可查看到该节点中的资源分配情况和其中的Pods详情。

## 6. 集群权限分配

点击 `权限分配`页签，便可查看到所选集群在组织内的公开范围，即拥有该集群权限的项目。

![image](/docs/user-guide/deploy/cluster/image/cluster-management-04.png)

点击导航栏上方的 `权限管理`，便可设置集群的公开范围，其中包括组织下所有项目与组织下特定项目。

- 若选择 `组织下所有项目`，那么表示该组织下所有项目中的环境都能与该集群相连接；

- 若选择 `组织下特定项目`，就表示只有被分配权限的项目下的环境才能连接到该集群。

![image](/docs/user-guide/deploy/cluster/image/cluster-management-05.png)

## 7. 阅读更多

- [证书管理](../certif-manage)
- [环境配置](../../env-config)