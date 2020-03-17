+++
title = "集群管理"
description = ""
weight = 1
+++


# 集群管理


## 1. 概述

集群是用于运行k8s的托管群组，一个Choerodon集群对应为一个k8s集群。有了集群，我们就能以此来统一调配资源，管理环境。此外，每个集群可以对组织下各个项目设置是否公开，配置后，只有被分配权限的项目中的环境才能连接到该集群。

<blockquote class="warning"> 

  注意：自0.19.0版本后，我们将`集群管理`模块从组织层迁到了项目层；同时，为了统一存放以往版本在组织中创建的集群，我们在本组织下新建了一个名为“默认运维项目”的项目，且只有组织管理员才有该项目的项目所有者权限。
</blockquote>


<blockquote class="note"> 

  只有项目所有者对集群页面有查看和编辑操作的权限。
</blockquote>

  通过此页面，您可以了解到如何创建、修改和删除集群，以及如何查看节点详情。

  ![image](/docs/user-guide/deploy/cluster/image/cluster-management-01.jpg)

## 2. 创建集群

 ![image](/docs/user-guide/deploy/cluster/image/cluster-management-02.png)  


  (1) 点击左上方的 `创建集群`，右侧会弹出创建集群页面，输入相关信息，包括集群编码、集群名称和集群描述；

     > 集群创建成功后，默认向该组织下所有项目公开，若想为所创集群配置特定的公开范围，需要在集群的权限管理页面进行设置。

     - 集群编码：集群客户端的名称，限制为30个字符。  

      > 只能由小写字母、数字、”-“组成，且以小写字母开头，不能以”-“结尾。
     - 集群名称：项目下集群的显示名称。限制为10个字符。
     - 集群描述：环境的描述，限制为30字符。  


  (2) 填写完成后，点击`创建`，界面会自动生成可执行的shell脚本命令，其中各个参数已经由后端服务自动生成。  

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


  ​    
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

  (3) 复制脚本命令至集群中运行，与平台建立连接。

     > - 运行前需要先初始化helm helm init ，helm repo update。

     > - helm 的版本必须与服务器上helm版本一致。

  (4) 执行成功后回到集群管理界面，便可以看到之前创建好的集群状态变为连接状态。

  
## 3. 管理集群

  在左侧的树结构中，点击![image](/docs/user-guide/deploy/cluster/image/cluster-management-11.jpg) 标识，可选择 `修改集群`或者 `删除集群`。同时，对于未连接的集群，还可以选择 `激活集群`的选项。

   - 修改集群：此处仅支持修改集群的名称与描述
   - 删除集群：点击 `删除集群`，会弹出复制删除指令的提示框，当复制指令去k8s运行后，再回到平台点击“已执行，删除”，该集群将被彻底删除。   
   - 激活集群：该操作仅用于未连接状态的集群。  
     <blockquote class="note"> 只有未连接且无关联环境的集群才能被删除。
     </blockquote>

     

## 4. 查看集群详情

  在集群管理页面的树结构中，状态为运行中的集群会统一分布在树结构上部分，而状态为未连接的集群则聚集在树结构的下半部分。
  在集群树结构中，每一个处于运行中状态的集群下方都会展示出该集群下部分节点的信息，点击某个节点名称，可以看到`资源分配`和`节点监控`页签。默认展示`资源分配`页签下的内容。  
  
  (1) 资源分配
  在`资源分配`页签下，可以看到该节点中的资源分配情况和其中的Pods详情。
  ![image](/docs/user-guide/deploy/cluster/image/cluster-management-12.jpg)  

  (2) 节点监控
  如果集群安装了监控组件，点击`节点监控`页签，登录后即可看到节点的计算、存储、网络等资源。
  ![image](/docs/user-guide/deploy/cluster/image/cluster-management-13.jpg)   

  <blockquote class="note">
   如何安装监控组件，请查看组件管理一节。登录相关操作，请查看集群监控一节。   
   </blockquote>  

## 5. 集群权限分配

  点击 `权限分配`页签，便可查看到所选集群在组织内的公开范围，即拥有该集群权限的项目。

  ![image](/docs/user-guide/deploy/cluster/image/cluster-management-04.jpg)

  点击导航栏上方的 `权限管理`，便可设置集群的公开范围，其中包括组织下所有项目与组织下特定项目。

  - 若选择 `组织下所有项目`，那么表示该组织下所有项目中的环境都能与该集群相连接；

  - 若选择 `组织下特定项目`，就表示只有被分配权限的项目下的环境才能连接到该集群。

  ![image](/docs/user-guide/deploy/cluster/image/cluster-management-05.png)  


## 6. 健康检查  

  `健康检查`模块通过集成Polaris组件实现了集群的健康检查功能，支持检测出集群与环境中可能影响稳定性、可靠性、可伸缩性和安全性的配置问题。

  <blockquote class="warning">
  只有处于“运行中”状态且有关联环境的集群，才能执行健康检查。
  </blockquote>  

  （1） 执行健康检查  

  ![image](/docs/user-guide/deploy/cluster/image/cluster-management-07.jpg)  

  - 选择一个满足健康检查条件的集群，点击 `健康检查`页签，进入健康检查页面；  
  - 点击界面中的`扫描`按钮，开始执行健康检查；  

  （2） 查看健康检查结果

  健康检查成功后,能从“集群概览”和“环境详情”两个维度，查看存在配置项的问题。各个配置项在通过健康检查后，存在`passed`、`warning`以及`error`三个状态，分别代表检测通过、警告、错误的状态。而界面上的健康分值，也是根据`passed`状态配置项的占比计算得来的。需要注意的是，各类详情下，只会展示出`warning`与 `error`状态的配置项。  

  <blockquote class="note">
  健康分值= passed配置项数量/(passed配置项数量+1/2warning配置项数量+error配置项数量)

  </blockquote>

  - 从“集群概览”的维度查看集群中各个分类的配置项问题；主要分为了： 健康检查、镜像检查、网络配置、资源分配以及安全这五类，并可以分别查看各个分类下有问题的配置项（`warning`与 `error`状态的配置项）及其所属的环境。   
  ![image](/docs/user-guide/deploy/cluster/image/cluster-management-09.jpg)    

  - 从“环境详情”的维度查看集群中所有环境（包括Choerodon平台环境与非Choerodon平台环境）中存在问题的配置项（`warning`与 `error`状态的配置项）。  

  ![image](/docs/user-guide/deploy/cluster/image/cluster-management-10.jpg)  


## 7. 组件管理  

  点击 `组件管理`页签，便能对集群中的组件进行管理，目前支持CertManager和监控组件的安装与卸载。  

  ![image](/docs/user-guide/deploy/cluster/image/cluster-management-14.jpg)  
  
  (1) CertManager  

  此处的CertManager组件用于在集群对应的环境下创建证书。若集群未安装CertManager组件，将不能在集群对应的环境下进行“创建证书”的操作。  

  对于之前版本已安装CertManager组件的集群，此处会直接展示出组件处于已安装的状态。若是新建的集群，则需在此处自主安装CertManager组件。  

  (2) 监控组件 
  
  此处的监控组件对应`集群监控`功能，安装监控组件后，`集群监控`功能才可用。安装界面如下：  

  ![image](/docs/user-guide/deploy/cluster/image/cluster-management-15.jpg)   

  需要输入的参数有：
  - admin密码：Grafana组件admin账户的登录密码
  - 域名地址：Grafana访问地址
  - PrometheusPV、GrafanaPV和AlertManagerPV：对应组件需要使用到的PV,需要提前在PV管理中创建

  安装成功后，监控组件状态变为`可用`。同时，提供`修改`与`卸载`操作。其中`修改`操作只支持修改域名地址。
  
  ![image](/docs/user-guide/deploy/cluster/image/cluster-management-16.jpg)   
  <blockquote class="warning">
  只能在运行中状态的集群里管理组件！
  </blockquote>

## 8. 集群监控
  `集群监控`模块主要包括三个组件：  

  - Prometheus：负责采集集群数据  

  - Alertmanager：负责提供报警功能  

  - Grafana：作为可视化界面展示监控数据。

  安装监控组件后，只要成功登录Grafana，即可查看集群监控数据。  

### Grafana登录
  Grafana集成了猪齿鱼Oauth三方登录，如果未登录或登录过期用户在点击`集群监控`页签时，会引导至登录页面，成功登录后，即可回到集群管理页面。

  <blockquote class="warning">
  此处登录是指用户登录猪齿鱼Oauth-Server认证中心。
  </blockquote>

  已登录用户，点击`集群监控`页签，即可看到Grafana登录页面。  

  ![image](/docs/user-guide/deploy/cluster/image/cluster-management-17.jpg)    

  (1) 使用猪齿鱼账号登录
  点击`Sign in with Choerodon`按钮即可使用猪齿鱼账号登录Grafana，进入集群监控页面。

  <blockquote class="note">
  只有`管理员`、`组织管理员`、`项目所有者`、以及拥有`GitLab.Owner`标签的自定义角色有权限查看集群监控，所以只有拥有上述角色的猪齿鱼账号才可以成功登录。
  </blockquote>

  (2) 使用admin账户登录

  使用admin账户登录，密码为安装监控组件时输入的admin密码,点击`Log in`按钮，即可进入集群监控页面。 

   ![image](/docs/user-guide/deploy/cluster/image/cluster-management-18.jpg) 


## 9. 阅读更多

  - [证书管理](../certif-manage)
  - [环境配置](../../env-config)