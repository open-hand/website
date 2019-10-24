+++
title = "配置网络和域名"
description = "介绍了Choerodon的网络、域名管理，从创建网络、创建域名等来介绍如何快速了解网络管理、域名管理的操作"
weight = 5
type = "docs"
+++

# 配置网络和域名
---

## 概述

通过配置网络和域名，使得已经部署的实例能够开放对应的端口并且通过配置的域名进行访问。

## 目标

本章节将以创建网络“service-ingress-example-b9f7”、创建域名 “service-ingress-example.choerodon.com.cn”为例，
从网络管理、域名管理等方面，展开介绍`Choerodon`的网络和域名管理功能，让读者学会使用`Choerodon`去创建、管理和操作实例的访问配置。

## 前置条件

**1.** 在操作之前保证[系统配置](../../../user-guide/manager-guide/system-configuration)已经配置完全。特别在本章节用到的角色、环境管理、实例部署等配置。

**2.** 配置网络和域名需要项目所有者或已被分配目标环境权限的项目成员角色，确保登陆用户有分配此角色。

**3.** 配置网络和域名都是基于环境管理操作的，确保已配置好可用环境。


## 创建网络

为了访问应用实例的特定端口，首先需要创建一个网络。更多相关信息以及详细操作步骤参考[网络管理](../../../user-guide/deployment-pipeline/service)。

**第一步：** 使用拥有项目所有者或已被分配目标环境权限的项目成员角色角色的用户登录`Choerodon`系统，选择项目猪齿鱼研发。

**第二步：** 点击左侧菜单栏，选择部署流水线，点开网络。点击`创建网络`(确保已拥有该权限)。

![创建网络](/docs/quick-start/image/create_service_front.gif)

**第三步：** 选择可用的环境。

**第四步：** 选择环境下的应用和应用下对应的实例，也可以通过填写标签的形式指定部署文件中的`selector`。

**第五步：** 填写`网络配置`。可选网络配置类型为`ClusterIP`或是`NodePort`。
            
  - ClusterIP：
  
   - 外部IP为选填项，需要外部网络访问时填写。
  
          <blockquote class="warning">
         外部IP的值不能随意填写，必须是service所在集群节点的IP！
       </blockquote>
  
   - 端口号为实例`service`端口号，目标端口号为实例`Pod`端口号，用以配置网络的端口映射转发。

          <blockquote class="warning">
         端口号必须是数字且大小在0-65535之间。
       </blockquote>
  
  - NodePort：
  
   - 节点端口为节点对外提供的端口，端口号为实例`service`端口号，目标端口号为实例`Pod`端口号，用以配置网络的端口映射转发。
         
**第六步：** 输入网络名称，用于描述网络名称，如果目标对象是选择实例，则会自动生成一个名称，可以自行修改。

**第七步：** 填写网络相关信息，部分字段会自动生成，默认即可

例如，

* 环境：开发环境
* 目标对象：选择实例
* 应用名称：配置网络和域名示例
* 选择实例：service-ingress-example-b8d1f
* 网络配置：Cluster-IP
* 端口：80
* 目标端口：80

![创建网络](/docs/quick-start/image/create_service.png)

**第八步：** 等待网络状态变为运行中。

创建成功后，您就可以为这个网络创建相应的域名。

## 创建域名

为了让用户能通过浏览器从外部访问系统内部应用程序，需要在网络的基础上配置域名。更多相关信息以及详细操作步骤参考[域名管理](../../../user-guide/deployment-pipeline/ingress)。

**第一步：** 使用拥有项目所有者或已被分配目标环境权限的项目成员角色角色的用户登录`Choerodon`系统，选择项目`猪齿鱼研发`。

**第二步：** 点击左侧菜单栏，选择部署流水线，点开域名。点击`创建域名`(确保已拥有该权限，并且已在上一步创建网络)。

**第三步：** 选择可用的环境。

**第四步：** 输入域名名称。

**第五步：** 选择域名协议，填写`域名地址`。可选网络协议类型为 `普通协议` 或是 `加密协议` ，期中加密协议需要为域名指定一个对应的证书。
       
**第六步：** 填写`路径`，选择需要访问的网络，选择网络的端口，可以视情况增加多个路径。

**第七步：** 点击`创建`就可以生成一个域名。

例如，

* 环境名称：开发环境
* 域名名称：service-ingress-example
* 网络协议：普通协议
* 域名地址：service-ingress-example.choerodon.com.cn
* 网络：service-ingress-example-b9f7
* 端口：80

![创建域名](/docs/quick-start/image/create_domain.png)

**第八步：** 等待域名状态变为运行中。

创建成功后，您就可以在通过这个域名访问对应的网络的对应端口对应的实例了。

## 相关文档

- [系统配置](../../../user-guide/manager-guide/system-configuration)

- [创建环境](../../../user-guide/deployment-pipeline/environment-pipeline)

- [创建网络](../../../user-guide/deployment-pipeline/service)

- [创建域名](../../../user-guide/deployment-pipeline/ingress)

