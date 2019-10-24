+++
title = "实例视图"
description = ""
weight = 1
+++

# 实例视图

## 1. 概述

实例视图支持开发人员从应用服务的维度来查看与管理与其相关的所有资源。实例视图以树结构为基础，分为：环境层、应用服务层和实例层三个层级。在这三个层级中，用户能分别看到每个层级对应的功能与详情。

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-14.png)

## 2. 环境层

在实例视图的环境层中，项目所有者能查看到该环境的GitOps日志以及为该环境分配权限；而有环境权限的项目成员仅能查看GitOps日志。同时，还支持在该环境下关联项目中的应用服务，以便于直接在该环境中为此应用服务创建网络、域名、配置映射以及密文等资源。

<blockquote class="note"> 
环境层中，仅项目所有者能够对环境权限进行管理。
</blockquote>

### 2.1 查看GitOps日志

因为目前的部署方式为[GitOps](http://choerodon.io/zh/blog/gitops/) 操作，日志页面用于展示目前代码的提交同步情况，同时列举出操作同步过程中产生的错误信息。

点击某个环境，可以直接查看GitOps日志，包含提交同步情况和错误日志两部分内容。

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-15.png)

- 由于目前的部署方式为 [GitOps](http://choerodon.io/zh/blog/gitops/) 操作，因此在过程中可以对一些不当的操作进行错误的追踪。而产生报错日志显示在日志页签下。
- 提交同步情况：由于 GitOps 对部署信息进行异步处理，提交同步情况可以查看当前对部署信息的解析进度。点击提交的 commit SHA 可以查看对应的 GitOps 代码仓库。
- 错误日志：显示解析过程中产生的错误信息以及错误的文件源，点击文件可以跳转查看产生错误的文件。
- 若是在解析或执行过程中出现错误，此时在提交同步情况中，三个过程下面的 commit SHA会出现不一致的情况，同时错误日志中显示具体错误信息。而在实例状态总览左侧也会显示目前正在“同步中”，只有解决了当前的错误，才能进行接下来的操作。
- 重试：当阶段一（配置库）与阶段二（已解析）的commit SHA不一致时，可点击阶段一与阶段二之间的重试按钮→ 重试按钮 来重试GitOps。

### 2.2 权限分配

#### 2.2.1 查看权限分配详情

1. 在树结构中点击某个环境的名称，点击`权限分配`页签进入权限分配详情页。
2. 查看已被分配环境权限的项目人员的用户名、登录名以及项目角色，并且可通过过滤表快速搜索目标人员。  

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-16.png)

* 用户名：团队成员的名称；
* 登录名：团队成员的系统登录名称；
* 项目角色：团队成员的项目角色，有项目成员和项目所有者两种；
* 添加时间：添加角色权限的时间；

#### 2.2.2 权限管理

在此页面点击顶部的 `权限管理`进入权限管理的操作界面，便可为该环境配置特定的操作人员。

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-17.png)

1. 设置该环境的操作人员
    * 项目下所有成员：即该项目下所有项目成员都能在此环境中部署应用服务和资源；
    * 项目下特定成员：选择为`项目下特定成员`后，您需要在下方添加成员来分配权限，只有被分配权限的项目成员才能在此环境中部署应用服务和资源；
2. 点击`保存`，回到权限分配的详情页面，页面中显示出刚配置的权限人员，即权限分配成功。

<blockquote class="note"> 
项目所有者默认拥有应用服务的权限，且不能被删除。
</blockquote>

#### 2.2.3 删除权限

在`权限分配`页签下的列表中，选中某个已被分配权限的项目成员，点击删除按钮，即可删除该成员在此应用服务中的开发权限。

<blockquote class="note"> 
只有在权限管理页面中将权限分配给`项目下特定成员`时，才能在列表中删除某个成员的权限；若将权限分配给项目下所有成员，则不能在列表中删除任何成员的权限。
</blockquote>

权限配置成功后，有权限的项目成员便可在该环境中进行应用部署、实例管理、网络管理、域名管理、证书管理以及配置管理的操作。

### 2.3 关联应用服务

在树结构中，点击选择某个环境，接着点击左上角 `关联应用服务`按钮；会从右侧弹出关联界面，支持在此为所选应用服务与该环境建立关联关系。成功关联后，即可在应用服务层创建与之相关的各类资源。

<blockquote class="note"> 
此处仅支持关联与当前环境没有关系的应用服务。
</blockquote>

### 2.4 解除应用服务关联

在树结构中，选择某个已经和环境关联的应用服务，点击后面的操作按钮，选择 `解除关联`即可解除该应用服务与对应环境的关联关系。

<blockquote class="note"> 
若应用服务在对应环境中存在资源，则无法解除关联。
</blockquote>

## 3. 应用服务层

实例视图的应用服务层中，支持用户在此创建和管理与该应用服务相关的资源，包括网络、域名、配置映射和密文。

### 3.1 网络和域名

#### 3.1.1 创建网络

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-18.png)
 
1. 点击 顶部的`创建网络`按钮。

2. 填写 `网络名称`。
    网络名称只能由小写字母、数字、"-"组成，并且以小写字母开头，不能以"-"结尾，网络名称是环境下唯一。

3. 选择`目标对象`，选择类型为`选择实例`或是`填写标签`。

    - 选择实例：选择该应用服务下相关的实例来关联网络；且只能选择单个实例或该应用服务相关的所有实例。
    
    - 填写标签：填写标签以应用到 `service.spec.selector` ，供 k8s 关联本集群的实例。  

 
 4. 选择`网络配置`，选择类型为 `ClusterIP`、`NodePort`或`LoadBalancer` 。
 
    - ClusterIP:
    
        - 外部IP为选填项，需要外部网络访问时填写。
    
            <blockquote class="warning">
              外部IP的值不能随意填写，必须是service所在集群节点的IP！
            </blockquote>

        - 端口号为实例service端口号，目标端口号为实例Pod端口号，用以配置网络的端口映射转发。
    
            <blockquote class="warning">
              端口号必须是数字且大小在0-65535之间
            </blockquote>
    - NodePort:
    
        - 节点端口为节点对外提供的端口，端口号为实例service端口号，目标端口号为实例Pod端口号，用以配置网络的端口映射转发。最后，可选择网络协议为TCP或UDP。
              
            <blockquote class="warning">
              节点端口号必须在30000-32767之间，端口号必须是数字且大小在0-65535之间
            </blockquote>
    - LoadBalancer:
    
        - 端口号为service端口号，目标端口号为实例Pod端口号，用以配置网络的端口映射转发。
              
            <blockquote class="warning">
              端口号必须是数字且大小在0-65535之间
            </blockquote>


5. 点击 `创建`完成网络创建。

#### 3.1.2 修改网络

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-19.png)

在列表中选择一个网络，点击该网络的名称，右侧会弹出网络的修改界面；此处支持修改网络的目标对象以及网络配置。
 
<blockquote class="note"> 
若某个网络的目标对象不可用或是被删除后，需要在此手动修改其目标对象。
</blockquote>

#### 3.1.3 删除网络

在列表中选择一个网络，点击网络后的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_4db3cb6300ca47369bbf2512d2eabf3d_blob.png)图标，选择 `删除`，即可删除对应的网络。

<blockquote class="note"> 
删除网络后，将导致与其关联的域名不可用！
</blockquote>

#### 3.1.4 创建域名

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-20.png)

1. 点击顶部的 `创建域名`按钮。
2. 在创建页面，输入`域名名称`。
   - 域名名称由小写字母、数字、'-'组成，并且必须以字母、数字开始和结束。
3. 选择网络协议。
   - 目前支持选择 `普通协议`与 `加密协议`。若选择为 `普通协议`，则表示创建出的域名将不会使用特殊加密的安全方式，而选择为 `加密协议`后，则需要选择该项目下可用的域名证书，以此来作为域名加密的载体。
4. 填写域名地址。
   - 域名地址不能随意填写，必须指向集群的泛域名。

5. 填写路径、选择网络与端口。
    
    - 路径: 即子路径，同时每条路径与域名地址会组成唯一性校验。
    - 网络：在实例视图的应用服务层创建域名时，只能选择与该应用服务相关的网络。
    - 端口：此处的端口指的是网络端口，只能从所选网络对应的端口中进行选择。

6. 域名创建成功后，将会出现在列表中对应网络的下方，同时根据此域名就可以访问相应的服务。

#### 3.1.5 修改域名

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-21.png)

 在列表中选择一个网络，点击该网络名称前面的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_b3326a7239c743ae97ddf40e9a274ae4_blob.png)图标，会在下方展开与该网络关联的所有域名；此时，选中一个域名并点击其名称，右侧会弹出域名的修改界面，此处支持修改域名的网络协议、路径、网络及端口。


#### 3.1.5 删除域名

点击某个域名后面的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标，选择 `删除`选项，即可删除对应的域名。

<blockquote class="note"> 
域名删除后，该条数据将被永久删除，不可恢复。且环境状态为未连接或处理中时不可操作。
</blockquote>

### 3.2 配置映射

#### 3.2.1 创建配置映射  

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-22.png)
 
1. 点击顶部的 `创建配置映射` 按钮。
2. 填写`配置映射名称`与 `配置映射描述`。
    配置映射名称由小写字母、数字或‘-’组成，并且必须以字母或数字开始和结束。且在环境下唯一。

3. 填写`键值对`，或是直接粘贴多行“键=值”格式的字段至任何键框中，来批量输入键值对 ；或者直接点击`编辑YAML`，便可以YAML格式进行编辑； 
  
    - 键可以是任意的大小写字母，不能输入除"."、"-"和"_"以外的字符，且在同一个配置映射下键不能相同。  
    - YAML格式：YAML格式与键值对格式仅可在正确格式的情况下进行切换。  
 
4. 点击 `创建`完成配置映射的创建。  
    - 高级功能：您可粘贴多行“键=值”格式的字段至任何键框中，以便于批量输入键值对。

  
#### 3.2.2 修改配置映射

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-23.png)

在列表中点击某个配置映射的名称，右侧会弹出修改界面，支持在此修改配置映射中的键值对或YAML文件。  

#### 3.2.3 删除配置映射

点击某个配置映射后面的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标，选择 `删除`选项，即可删除对应的配置映射。

<blockquote class="note"> 
环境状态为未连接或处理中时不可操作。
</blockquote>

### 3.3 密文

#### 3.3.1 创建密文 

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-24.png)
 
 1. 点击顶部的 `创建密文` 按钮。
 2. 填写`密文名称`与 `密文描述`。
 
    - 密文名称由小写字母、数字或‘-’组成，并且必须以字母或数字开始和结束。且在环境下唯一。

3. 填写`键值对`，或是直接粘贴多行“键=值”格式的字段至任何键框中，来批量输入键值对 ； 
  
    - 键可以是任意的大小写字母，不能输入除"."、"-"和"_"以外的字符，且在同一个配置映射下键不能相同。  

4. 点击 `创建`完成密文的创建。  
     高级功能：您可粘贴多行“键=值”格式的字段至任何键框中，以便于批量输入键值对。

  
#### 3.3.2 修改密文

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-25.png)

在列表中点击某个密文的名称，右侧会弹出修改界面，支持在此修改密文中的键值对。

#### 3.3.3 删除密文

点击某个密文后面的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标，选择 `删除`选项，即可删除对应的密文。

<blockquote class="note"> 
环境状态为未连接或处理中时不可操作。
</blockquote>

## 4. 实例层

实例视图的实例层中，支持用户在此查看某个实例的所有详情，其中包括实例事件、操作记录、运行详情以及Pod的详情。此外，还能在此页面对实例进行变更、停用、启用以及删除的操作。

### 4.1 实例事件

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-26.png)

实例事件标签页中包括了该实例所有的操作记录，同时还支持查看当前实例最近四个版本的job与deployments的事件及其对应的日志；主要用于开发或部署人员查看应用服务部署的进度、状态以及记录。
         
鼠标移动到某个job模块时，在右上角会hover出该job的日志详情按钮，点击即可进入查看job日志。

### 4.2 运行详情

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-27.png)

运行详情页面展示了Chart 里定义的资源对象的参数信息，其中主要包括：Deployment、StatefulSet、DaemonSet、PVC、Ingress 与Service。

<blockquote class="note"> 
运行详情中支持显示以上资源对象的具体参数，但只会展示Chart包中已定义好的资源。
</blockquote>

1. Deployment：包括Deployment的名称与创建时间，标签、端口号、ReplicaSet的上限数、当前实际数以及可用数。同时，还显示了其中Pods的数量与状态，并能在此页面直接完成Pod的增减。此外，点击下方的`查看更多详情`，会从右侧展开显示更多关于deployment详情。如：数据卷、健康检查、主机设置、环境变量。  
2. StatefulSet：包括StatefulSet的名称、更新时间、状态和Pod的数量与状态。
3. DaemonSet：包括DaemonSet的名称、更新时间、状态和Pod的数量与状态。
4. PVC：包括PVC的名称、状态、资源请求大小、访问模式和更新时间。
5. Ingress：包括name（Ingress的名称）、hosts（Ingress主机host）、address（地址）、ports（端口）。  
6. Service：name（Service的名称），type（service的类型）、cluster-ip（节点ip）、external-ip（外部ip）、ports（端口）、age（创建时间）。

### 4.3 Pod详情

Pod详情页面主要用于查看和管理系统中的容器化实例，用户可在此实时查看相关 Pod 的状态以确定应用服务是否正常运行，同时可以查看对应的 Pod 日志进行错误定位和状态监控。

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-28.png)

#### 4.3.1 查看容器详情

 1. 点击 `Pod详情`进入Pod与容器的管理界面，可以通过列表信息观察Pod与容器的状态、Pod IP、可用情况以及创建时间；
    - Pod：此处包含了Pod的可用状态与名称；
    - 容器：即Pod中所含的Container；
    - Pod IP：Pod的地址；
    - 创建时间：容器创建的时间； 

 2. 点击Pod名称后的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标，选择 `容器日志`，即可查看对应Pod中所有容器的日志。  
 
    ![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-29.png)
 
 3. 点击Pod名称后的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标，选择 `运行命令`， 即可使用shell命令操作该容器。

    ![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-30.png)

#### 4.3.2 Pod 状态

Pod的状态分为以下五种，分别为 Pending、Running、Succeeded、Failed 和 Unknown。

1. Pending：Kubernetes 已经开始创建容器，但是容器中的一个或多个容器还没有被启动。比如容器正处在应该被分配到哪个节点上这个调度过程中，或者 Kubernetes 还在从镜像仓库中下载容器中容器镜像这个下载过程中。

2. Running：Kubernetes 已经将容器分配到节点上，并且容器中的所有容器都启动了。还包括容器中至少有一个容器仍然在运行状态，或者正在重新启动状态。

3. Succeeded：容器中的所有容器都处在终止状态，并且这些容器是自主正常退出到终止状态的，也就是退出代码为0，而且 Kubernetes 也没有重启任何容器。

4. Failed：容器中的所有容器都处在终止状态，并且至少有一个容器不是正常终止的，也就是退出代码不为0，或者是由于系统强行终止的。

5. Unknown：由于一些特殊情况无法获取容器状态，比如由于网络原因无法同容器所在的主机通讯等。

<blockquote class="note">
Pod与Container名称前的状态标志表示了各自的可用状态，只有当Pod内所有Container均可用时，Pod才为可用状态；而Pod的运行中状态与可用状态无特别联系。
</blockquote>

### 4.4 实例操作

在实例层，除了能查看以上的信息之外，还能在此处对实例进行各种操作，其中包括：修改Values、变更实例、重新部署、停用/启用实例以及删除实例。

#### 4.4.1 修改Values

点击顶部的 `修改Values`按钮，右侧会弹出配置信息的修改界面，修改后，点击下方的`部署`按钮，即可完成对该实例配置信息的修改。

#### 4.4.2 变更实例

点击顶部的 `变更实例`按钮，右侧会弹出变更实例的界面，您可在此升级或回滚实例对应的应用服务版本。

#### 4.4.3 重新部署

点击顶部的 `重新部署`按钮，会弹出确认弹框，点击确定后，便能重新按照当前的配置参数重新部署该实例，适用于因为网络等原因部署失败的情况。

#### 4.4.4 停用/启用实例

1. 在左侧树结构中选择某个处于运行状态的实例，点击该实例后面的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标 ，选择`停用实例`，操作成功后，该实例即为停用状态，且容器状态停止。

2. 在左侧树结构中选择某个处于停用状态的实例，点击该实例后面的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标 ，选择`启用实例`，操作成功后，该实例即为启用状态。

#### 4.4.5 删除实例

在左侧树结构中选择一个启用或停用状态的实例，点击该实例后面的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标 ，选择`删除实例`，操作成功后，该实例会从树结构中移除。

<blockquote class="warning">
删除实例会导致为该实例创建的service 和ingress 不可用，请谨慎操作！
</blockquote>

#### 4.4.6 实例操作状态

实例操作状态指的是该实例最近一次操作的状态，而不同的操作状态可以执行不同的操作。具体细节如下所示：

操作状态|修改Values|重新部署|启用实例|停用实例|删除实例
----|----|----|---|---|----
创建中|✔|
创建成功|✔|✔|✔| |✔|✔
创建失败|✔|✔|✔| | |✔
更新中|✔|
更新完成|✔|✔|✔| |✔|✔
更新失败|✔|✔|✔| |✔|✔
停用中|✔| | | | |
停用完成|✔|✔||✔| |✔
停用失败|✔|✔|✔||✔|✔
启用中|✔| | | |
启用完成|✔|✔|✔| |✔|✔
启用失败|✔|✔||✔| |✔
删除中|✔|  

## 5. 阅读更多

- [资源视图](../resource-view)
- [应用部署](../../../app-deploy)
- [集群管理](../../../cluster)