+++
title = "网络管理"
description = "网络是一种管理内部服务连通方式的策略，实现容器内部资源的负载均衡以及流量转发。配置后，平台会将网络流量定向转发到指定的单个或者多个实例容器组，完成服务的连通与流转"
weight = 5
+++

# 网络管理

网络是一种管理内部服务连通方式的策略，实现容器内部资源的负载均衡以及流量转发。配置后，平台会将网络流量定向转发到指定的单个或者多个实例容器组，完成服务的连通与流转。应用可以访问的两个必要条件：网络注册、应用部署。
    
  - **菜单层次**：项目层
  - **菜单路径**：部署流水线 > 网络
  - **默认角色**：项目所有者、项目成员、部署管理员
<blockquote class="note">
项目所有者和项目成员对网络只有查看界面的权限，不可进行编辑修改。
</blockquote>

  ![service](/docs/user-guide/deployment-pipeline/image/service.png)

## 创建网络

 1. 点击 `创建网络` ；

 2. 选择`环境`，只可选择运行中的环境，故障中的环境不可选；

 3. 选择`应用名称`应用分为本项目应用和应用市场应用、`版本`及`实例`只筛选状态为`运行中`的实例；

    <blockquote class="note">
       可以为同一个应用的不同版本创建同一个网络，也可以为同一个版本的多个实例创建同一个网络，以后用于灰度发布，（暂不支持灰度发布），版本只能查到所选环境下运行中实例的版本！
    	</blockquote>

     <blockquote class="warning">
      网络名称只能由小写字母、数字、"-"组成，并且以小写字母开头，不能以"-"结尾，网络名称是环境下唯一。
    	</blockquote>
 
 4. 输入`网络名称`、`外部IP`、`端口号`以及`目标端口号`；
    
    - 外部IP为选填项，需要外部网络访问时填写。

        <blockquote class="warning">
        外部IP的值不能随意填写，必须是service所在集群节点的ip！
    	</blockquote>

    - 端口号为实例service端口号，目标端口号为实例Pod端口号，用以配置网络的端口映射转发。

        <blockquote class="warning">
        端口号必须是数字且大小在0-65535之间
    	</blockquote>

 5. 点击 `创建`完成网络创建。


## 查看网络

 1. 进`部署流水线`后，点击`网络` ；

 2. 查看项目应用的网络配置信息。


## 修改网络

点击`修改网络` → ![修改网络按钮](/docs/user-guide/deployment-pipeline/image/update_network_button.png) 对网络进行修改。

<blockquote class="note">
修改网络，可以修改关联的应用的实例,端口号和目标端口号，如果选择的实例中包含状态不正常的实例则不能保存，提示“请移除不可用实例”！
</blockquote>

## 删除网络

点击`删除网络` → ![删除网络按钮](/docs/user-guide/deployment-pipeline/image/del_net_button.png) 对网络进行删除。
<blockquote class="note">
环境状态为未连接时或网络状态是处理中时不可操作
</blockquote>

<blockquote class="warning">
  删除网络，将导致网络关联的域名不可用！
</blockquote>

