+++
title = "PV管理"
description = ""
weight = 3
+++

# PV管理

## 1. 概述

PersistentVolume（PV）是集群中由管理员配置的一段网络存储。 它是集群中的资源，就像节点是集群资源一样。 PV是容量插件，如Volumes，但其生命周期独立于使用PV的任何单个pod。

<blockquote class="note"> 
    只有项目所有者才能对集群中的PV进行查看、创建和删除的操作。
    </blockquote>

通过该页面，您将了解到如何创建与删除PV。

## 2. 创建PV

1. 点击菜单栏`创建PV`按钮，右侧会弹出创建页面。

    ![image](/docs/user-guide/deploy/cluster/image/create-pv.jpg)

2. 选择集群。
    - 此处仅能选择该项目有权限的集群。
    - 仅能选择`运行中`状态的集群。

3. 输入PV名称和描述。  
    - PV名称：限制为30字符，由小写字母开头，只能包含小写字母、数字、“.”和“-”；且在集群和项目下唯一。
    - 描述：非必输，限制为40字符。

4. 选择类型，目前支持创建NFS和HostPath类型的PV。  

5. 选择访问模式。
    - ReadWriteOnce：该卷能够以读写模式被加载到一个节点上。  

    - ReadOnlyMany：该卷能够以只读模式加载到多个节点上。  
    - ReadWriteMany：该卷能够以读写模式被多个节点同时加载。  


6. 定义存储容量。  
   - 此处存储容量得数值仅支持填写整数，且单位可选：Mi、Gi与Ti。    

7. 输入路径。

（1）若选择的类型为NFS：  

   - 输入路径：路径须以“/”开头。
   - 输入服务器IP： 格式为(0-255).(0-255).(0-255).(0-255)。

（2）若选择的类型为HostPath：  

   - 输入路径：路径须以“/”开头。

## 3. 查看PV列表

在PV管理主界面，通过列表，可以查看到PV相关的具体信息。

![image](/docs/user-guide/deploy/cluster/image/pv-index.jpg)  

- 名称：此处展示了PV的状态与名称。目前PV的状态有以下几种： 
    - Operating：指DevOps向Agent发消息过程中的状态。该状态的PV不支持任何操作。  
    - Pending： 指Agent解析后发消息回来时的状态。该状态的PV不支持任何操作。  
	- Available：可用资源，尚未被绑定到 PVC 上。该状态的PV支持`权限管理`与`删除`操作。
    - Bound：表示该卷已经被绑定。该状态的PV不支持任何操作。  
    - Released：表示关联的PVC 已经被删除，但该资源尚未被集群回收，须手动删除。该状态的PV支持`删除`操作。  
    - Failed：表示该卷创建失败。该状态的PV支持`删除`操作。  
    - Deleting：指DevOps向Agent发消息的过程中的状态。该状态的PV不支持任何操作。   
    - Terminating：指Agent解析后发消息回来时的状态。该状态的PV不支持任何操作。
	  
- 描述：即PV的描述。  
- 所属集群：PV选择的集群。  
- 类型：PV的类型。  
- 关联PVC：指的是PV绑定的PVC，若暂无绑定的PVC，此处将不会显示。  
- 访问模式：指的是PV在创建时，所选的访问模式。分为RWO、ROM与RWM三种。  
- 存储容量：指的是该PV在创建时定义的存储容量。  

## 4. PV权限分配

选择一个“Available”状态的PV，点击PV列表的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_b53c0c1755864d7f9e3f7bb1f88b37fc_blob.png)标识，选择 ` 权限管理`，此时会弹出PV权限分配的界面，便可在此设置PV的公开范围，其中包括集群下所有项目与集群下特定项目。

- 若选择 `集群下所有项目`，那么表示在拥有该集群权限的所有项目中对应的环境下创建PVC都能选到该PV。
- 若选择 `集群下特定项目`，就表示只有在此处被分配PV权限的项目下的环境中创建PVC时才能选择该PV。

<blockquote class="note"> 
    仅Available状态的PV能进行权限分配的操作。
</blockquote>

## 5. 删除PV

选择一个“Available”、“Released”或“Failed”状态的PV，点击PV列表的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_b53c0c1755864d7f9e3f7bb1f88b37fc_blob.png)标识，可以选择删除该PV。

 <blockquote class="note"> 
   仅Available、Released以及Failed状态的PV才能执行删除操作。   
 </blockquote>
 
## 6. 阅读更多
 
- [集群管理](../../cluster/cluster-manage)
