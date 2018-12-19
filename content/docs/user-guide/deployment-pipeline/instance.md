+++
title = "实例管理"
description = "实例是一次应用部署生成的应用实体。您可查看并且管理实例，对实例的可进行查看详情、修改配置、启用停用和删除实例操作"
weight = 4
+++

# 实例管理

查看实例列表，展示实例的运行信息，查看实例的详情，包括实例下的k8s对象信息，实例创建时各个阶段（job）的运行日志，以及上次部署时的values文件。当部署的实例的版本不是应用最新版本的时候，可以升级实例，当部署实例的values文件值填错的时候，可以修改values之后重新部署。当实例失去价值之后，可以酌情停止实例，重启实例，以及删除实例。
  
  - **菜单层次**：项目层
  - **菜单路径**：部署流水线 > 实例
  - **默认角色**：项目所有者、项目成员（环境成员）


## 应用实例列表
通过容器状态、实例、应用版本、环境的信息来观察应用的部署情况。在实例模块中，您可查看在某个环境下，所有应用的部署情况。


#### 应用部署情况
    
![single env](/docs/user-guide/deployment-pipeline/image/instance1.jpg)


  - 应用：选择相应环境下的应用。

  - 实例名称：实例的名称。

  - 应用版本：应用的版本。  
  
  - 点击页面左侧![展开按钮](/docs/user-guide/deployment-pipeline/image/arrow_button.jpg) 按钮 ，页面展开，会显示该实例下Deployments的相关信息，其中包括Deployment的名称与创建时间，ReplicaSet的上限数、当前实际数以及可用数。同时，还显示了其中Pods的数量与状态，并能在此跳转查看Pods的详情。此外，点击下方的`查看更多详情`，会从右侧展开显示更多关于deployment详情。如：端口、数据卷、健康检查、主机设置、环境变量、标签。  
  ![deployment-more](/docs/user-guide/deployment-pipeline/image/instance8.jpg)

  - 点击页面右侧 ![详情按钮](/docs/user-guide/development-pipeline/image/detail_button.png) 按钮 ，再点击`查看实例详情`，进入实例详情后观察其运行详情和部署详情。

 



## 实例状态

实例状态的显示由实例的当前状态和最后一次操作的状态来决定，不同的实例状态可以执行不同的操作。

操作状态|查看实例详情|修改配置信息|重新部署|重启实例|停止实例|删除实例
:----|:----:|:----:|:----:|:----:|:----:|:----:
创建中|✔|
创建成功|✔|✔|✔| |✔|✔
创建失败|✔|✔|✔| | |✔
更新中|✔|
更新完成|✔|✔|✔| |✔|✔
更新失败|✔|✔|✔| |✔|✔
停止中|✔| | | | |
停止完成|✔|✔||✔| |✔
停止失败|✔|✔|✔||✔|✔
重启中|✔| | | |
重启完成|✔|✔|✔| |✔|✔
重启失败|✔|✔||✔| |✔
删除中|✔|

## 运行详情
Chart 里定义的各个资源对象列表及参数信息。

  ![instance details](/docs/user-guide/deployment-pipeline/image/instance3.jpg)

资源对象|参数信息|参数介绍
:----|----|----
Pod |name, ready, status, restarts, age|name为Pod的名称，ready是是否可用，status是状态，restarts是重启过几次，age是创建时间
Deployment |name, desired, current, uo-to-date, available, age|name是Deployment的名称，desired是期望创建ReplicaSet的数量,current是指当前ReplicaSet的数量.up-to-date是达到配置中要求ReplicaSet的数量,available是指可用的ReplicaSet的数量，age是指创建时间
ReplicaSet |name, desired, current, ready, age|name是ReplicaSet的名称，desired是期望创建Pod的数量,current是指当前Pod的数量,ready是指可的Pod的数量，age是指创建时间
Service|name, type, cluster-ip, external-ip, port, age|name是指Service的名称，type是指service的类型,cluster-ip是节点ip，external-ip是指外部ip，port是指端口，age是指创建时间
Ingress|name, hosts, address, ports, age|name是指Ingress的名称，hosts是指Ingress主机host，address是指地址，ports是指端口

## 实例事件
包括该实例最近四个版本的job与deployments的事件及其对应的日志；同时，还能点击查看这些版本对应的部署配置信息。
       
  ![stage log](/docs/user-guide/deployment-pipeline/image/instance2.jpg)  

<blockquote class="note">
  鼠标移动到某个job模块时，在右上角会hover出该job的日志详情按钮，点击即可进入查看job日志。
</blockquote>


## 修改配置信息
点击页面右侧 ![详情按钮](/docs/user-guide/development-pipeline/image/detail_button.png) 按钮 ，再点击`修改配置信息`，进入修改配置信息界面后对实例配置信息进行修改后重新部署，只有项目所有者和被分配权限的项目成员能进行此操作。

## 升级实例
点击页面右侧 ![详情按钮](/docs/user-guide/development-pipeline/image/detail_button.png) 按钮，再点击`升级实例`，当运行中的实例的应用版本不是最新时，可以升级实例，升级实例是简化了 **应用版本**的替换实例操作，点击升级即可实现滚动更新，只有项目所有者和被分配权限的项目成员能进行此操作。

## 重新部署
点击页面右侧 ![详情按钮](/docs/user-guide/development-pipeline/image/detail_button.png) 按钮 ，再点击`重新部署`，便能按照当前的配置参数重新部署该实例，适用于因为网络等原因部署失败的情况。只有项目所有者和被分配权限的项目成员能进行此操作。

## 停止实例
点击页面右侧 ![详情按钮](/docs/user-guide/development-pipeline/image/detail_button.png) 按钮 ，再点击`停止实例`，该实例即为停止状态，且容器状态停止。容器状态为“0”时，实例存在，实质是实例的Pod被删掉。只有项目所有者和被分配权限的项目成员能进行此操作。


## 重启实例
点击页面右侧 ![详情按钮](/docs/user-guide/development-pipeline/image/detail_button.png) 按钮 ，再点击`重启实例`，当实例状态为已停止时候，可以点击重启实例，使实例重新启动，实质是实例的Pod重新创建。只有项目所有者和被分配权限的项目成员能进行此操作。

## 删除实例
点击页面右侧 ![详情按钮](/docs/user-guide/development-pipeline/image/detail_button.png) 按钮，再点击`删除实例`，该实例被删除，状态置为已删除。只有项目所有者和被分配权限的项目成员能进行此操作。

   <blockquote class="warning">
       删除实例会导致为该实例创建的service和ingress不可用，请谨慎操作！
    	</blockquote>

## 更多操作
- [环境总览](../environments-overview)
- [环境流水线](../environment-pipeline)
- [容器管理](../container)
- [网络管理](../service)
