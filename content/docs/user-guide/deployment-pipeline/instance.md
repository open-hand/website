+++
title = "实例管理"
description = "实例是一次应用部署生成的应用实体。您可查看并且管理实例，对实例的可进行查看详情、修改配置、启用停用和删除实例操作"
weight = 4
+++

# 实例管理

查看实例列表,展示实例的运行信息，查看实例的详情，包括实例下的k8s对象信息，实例创建时各个阶段（job）的运行日志,以及上次部署时的values文件。当部署的实例的版本不是应用最新版本的时候，可以升级实例，当部署实例的values文件值填错的时候，可以修改values之后重新部署。当实例失去价值之后，可以酌情停止实例，重启实例，以及删除实例。
  
  - **菜单层次**：项目层
  - **菜单路径**：部署流水线 > 实例
  - **默认角色**：项目所有者、项目成员、部署管理员


## 应用实例列表
通过容器状态、实例、应用版本、环境的信息来观察应用的部署情况。分为三种视图，以不通侧重点展示实例状态、运行详情和部署详情等。部署管理员，项目成员，项目所有者都拥有查看权限。

#### 三种分视图：
 1. **部署实例** 通过容器状态、实例状态、应用及应用版本、环境来观察部署的实例情况。
      
      ![instances](/docs/user-guide/deployment-pipeline/image/instance1.png)

  - **容器状态**：容器当前的状态。数字代表已运行的容器数量，当数字为“0”时，容器状态为空；绿色代表已通过健康检查，红色代表未通过健康检查。颜色会根据容器数量的状态发生比例变化。例如：容器数量为2，一个通过健康检查，一个未通过健康检查，则颜色状态为一半红色，一半绿色。

  - 实例状态：在不同的操作类型中的实例状态不同，详见下面表格。

  - 实例名称：实例的名称。

  - 应用：应用的名称及其版本号。

  - 环境：环境的名称和环境编码。

  - 点击页面右侧 ![详情按钮](/docs/user-guide/development-pipeline/image/detail_button.png) 按钮 ，再点击`查看实例详情`，进入实例详情后观察其运行详情和部署详情。

 2. **单环境** 通过选择单个环境来筛选查看该环境下各应用所部署实例的情况。
    
      ![single env](/docs/user-guide/deployment-pipeline/image/instance4.png)

  - 环境名称：对环境进行选择。

  - 应用：选择相应环境下的应用。

  - 容器状态：容器当前的状态。（所代表含义与部署实例视图中容器状态相同）

  - 实例状态：在不同的操作类型中的实例状态不同。

  - 实例名称：实例的名称。

  -  应用版本：应用的版本。

  - 点击页面右侧 ![详情按钮](/docs/user-guide/development-pipeline/image/detail_button.png) 按钮 ，再点击`查看实例详情`，进入实例详情后观察其运行详情和部署详情。

 3. **单应用** 对应用和版本筛选，观察单个应用在不同环境下的部署情况。
    
      ![single app](/docs/user-guide/deployment-pipeline/image/instance5.png)

   - 应用名称：选择应用的名称确定应用。

   - 应用版本：选择应用版本。

   - 环境：环境的状态和名称。可以在环境中点击 ![查看部署应用按钮](/docs/user-guide/development-pipeline/image/scan_deploy_button.png) 按钮，对当前进行快速部署。

   - 容器状态：容器当前的状态。（所代表含义与部署实例视图中容器状态相同）

   - 实例状态：在不同的操作类型中的实例状态不同。

   - 实例名称：实例的名称。

   - 点击页面右侧 ![详情按钮](/docs/user-guide/development-pipeline/image/detail_button.png) 按钮 ，再点击`查看实例详情`，进入实例详情后观察其运行详情和部署详情。



## 实例状态

实例状态的显示由实例的当前状态和最后一次操作的状态来决定，不同的实例状态可以执行不同的操作。

操作状态|查看实例详情|修改配置信息|重启实例|停止实例|删除实例
:----|:----:|:----:|:----:|:----:|:----:
创建中|✔|
创建成功|✔|✔| |✔|✔
创建失败|✔|✔| | |✔
更新中|✔| | | | 
更新完成|✔|✔| |✔|✔
更新失败|✔|✔| |✔|✔
停止中|✔| | | |
停止完成|✔|✔|✔| |✔
停止失败|✔|✔| |✔|✔
重启中|✔| | | |
重启完成|✔|✔| |✔|✔
重启失败|✔|✔|✔| |✔
删除中|✔|

## 运行详情
Chart 里定义的各个资源对象列表及参数信息。

  ![instance details](/docs/user-guide/deployment-pipeline/image/instance3.png)

资源对象|参数信息|参数介绍
:----|----|----
Pod |name, ready, status, restarts, age|name为Pod的名称，ready是是否可用，status是状态，restarts是重启过几次，age是创建时间
Deployment |name, desired, current, uo-to-date, available, age|name是Deployment的名称，desired是期望创建ReplicaSet的数量,current是指当前ReplicaSet的数量.up-to-date是达到配置中要求ReplicaSet的数量,available是指可用的ReplicaSet的数量，age是指创建时间
ReplicaSet |name, desired, current, ready, age|name是ReplicaSet的名称，desired是期望创建Pod的数量,current是指当前Pod的数量,ready是指可的Pod的数量，age是指创建时间
Service|name, type, cluster-ip, external-ip, port, age|name是指Service的名称，type是指service的类型,cluster-ip是节点ip，external-ip是指外部ip，port是指端口，age是指创建时间
Ingress|name, hosts, address, ports, age|name是指Ingress的名称，hosts是指Ingress主机host，address是指地址，ports是指端口

## 部署详情
包括报错信息、配置信息、阶段及日志。
       
  ![stage log](/docs/user-guide/deployment-pipeline/image/instance2.png)


## 修改配置信息
点击页面右侧 ![详情按钮](/docs/user-guide/development-pipeline/image/detail_button.png) 按钮 ，再点击`修改配置信息`，进入修改配置信息界面后对实例配置信息进行修改后重新部署，只有部署管理员有权限。

## 升级实例
点击页面右侧 ![详情按钮](/docs/user-guide/development-pipeline/image/detail_button.png) 按钮，再点击`升级实例`，当运行中的实例的应用版本不是最新时，可以升级实例，升级实例是简化了 **应用版本**的替换实例操作，点击升级即可实现滚动更新，只有部署管理员有权限。

## 停止实例
点击页面右侧 ![详情按钮](/docs/user-guide/development-pipeline/image/detail_button.png) 按钮 ，再点击`停止实例`，该实例即为停止状态，且容器状态停止。容器状态为“0”时，实例存在，实质是实例的Pod被删掉。只有部署管理员有权限。


## 重启实例
点击页面右侧 ![详情按钮](/docs/user-guide/development-pipeline/image/detail_button.png) 按钮 ，再点击`重启实例`，当实例状态为已停止时候，可以点击重启实例，使实例重新启动，实质是实例的Pod重新创建。只有部署管理员有权限。只有部署管理员有权限。


## 删除实例
点击页面右侧 ![详情按钮](/docs/user-guide/development-pipeline/image/detail_button.png) 按钮，再点击`删除实例`，该实例被删除，状态置为已删除。只有部署管理员有权限。

   <blockquote class="warning">
       删除实例会导致为该实例创建的service和ingress不可用，请谨慎操作！
    	</blockquote>

## 更多操作
- [环境总览](../environments-overview)
- [环境流水线](../environment-pipeline)
- [容器管理](../container)
- [网络管理](../service)
