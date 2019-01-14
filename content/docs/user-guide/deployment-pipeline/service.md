+++
title = "网络管理"
description = "网络是一种管理内部服务连通方式的策略，实现容器内部资源的负载均衡以及流量转发。配置后，平台会将网络流量定向转发到指定的单个或者多个实例容器组，完成服务的连通与流转"
weight = 5
+++

# 网络管理

网络是一种管理内部服务连通方式的策略，实现容器内部资源的负载均衡以及流量转发。配置后，平台会将网络流量定向转发到指定的单个或者多个实例容器组，完成服务的连通与流转。应用可以访问的两个必要条件：网络注册、应用部署。
    
  - **菜单层次**：项目层
  - **菜单路径**：部署流水线 > 资源 > 网络
  - **默认角色**：项目所有者、项目成员（环境成员）
<blockquote class="note">
只有项目所有者和被分配环境权限的项目成员才能对网络进行查看和编辑的操作。
</blockquote>

## 创建网络
![创建网络](/docs/user-guide/deployment-pipeline/image/create-service.jpg)
 
 1. 点击 `创建网络` ；

 1. 选择`环境`，只可选择运行中的环境，故障中的环境不可选；

 1. 选择`目标对象`，选择类型为选择实例、填写标签或是Endpoints；

    - 选择实例：选择应用名称然后选择实例以关联网络，这里的应用只能选择到在该环境下存在实例的；
    
    - 填写标签：填写标签以应用到 `service.spec.selector` ，供 k8s 关联本集群的实例。  

    - Endpoints：填写目标IP以及目标端口，供k8s关联外部的实例。
 
 1. 选择`网络配置`，选择类型为 `ClusterIP`、`NodePort`或`LoadBalancer` ；
 
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
    
        - 节点端口为节点对外提供的端口，端口号为实例service端口号，目标端口号为实例Pod端口号，用以配置网络的端口映射转发。
              
            <blockquote class="warning">
              节点端口号必须在30000-32767之间，端口号必须是数字且大小在0-65535之间
            </blockquote>
    - LoadBalancer:
    
        - 端口号为service端口号，目标端口号为实例Pod端口号，用以配置网络的端口映射转发。
              
            <blockquote class="warning">
              端口号必须是数字且大小在0-65535之间
            </blockquote>
 1. 输入网络名称，若是选择关联实例，则会默认生成一个名称，可以修改。
    <blockquote class="warning">
      网络名称只能由小写字母、数字、"-"组成，并且以小写字母开头，不能以"-"结尾，网络名称是环境下唯一。
    </blockquote>
    
 1. 点击 `创建`完成网络创建。


## 查看网络
 进`部署流水线`后，点击`网络` ；查看项目应用的网络配置信息。

  ![service](/docs/user-guide/deployment-pipeline/image/service.jpg) 

## 修改网络

点击`修改网络` → ![修改网络按钮](/docs/user-guide/deployment-pipeline/image/update_network_button.png) 对网络进行修改。

<blockquote class="note">
  修改网络，可以修改目标对象和网络配置，如果选择的实例中包含状态不正常的实例则不能保存，提示“请移除不可用实例”！
</blockquote>

## 删除网络

点击`删除网络` → ![删除网络按钮](/docs/user-guide/deployment-pipeline/image/del_net_button.png) 对网络进行删除。

<blockquote class="note">
  环境状态为未连接时或网络状态是处理中时不可操作
</blockquote>

<blockquote class="warning">
  删除网络，将导致网络关联的域名不可用！
</blockquote>

## 更多操作
- [环境总览](../environments-overview)
- [环境流水线](../environment-pipeline)
- [容器管理](../container)
- [实例管理](../instance)


