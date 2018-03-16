+++
title = "开发区安装"
description = ""
weight = 2
banner = "img/banners/banner-1.jpg"
+++

## 开发区安装

> 由于开发区各服务也需要进行更新和管理，所以将部署开发区和部署区的所有服务。本文以CentOS为例进行讲解。

本章节介绍开发区的安装。

- <font>[开发区服务](#开发区服务)</font>
- <font>[硬件需求](#硬件需求)</font>
    - <font>[存储](#存储)</font>
    - <font>[CPU](#CPU)</font>
    - <font>[内存](#内存)</font>
- <font>[依赖组件](#依赖组件)</font>
- <font>[安装所需软件及文件](#安装所需软件及文件)</font>
- <font>[使用NFS存储](#使用NFS存储)</font>
- <font>[执行安装步骤](#执行安装步骤)</font>


---
## 开发区服务

当前Choerodon开发区各服务版本信息如下：

服务名	|服务组	|	服务代码	|	版本号
---	|---	|	---	|	---
注册服务	|	com.hand.hapcloud	|	hap-register-server 	|	1.2.0
管理服务	|	com.hand.hapcloud	|	hap-manager-service 	|	1.2.0
配置服务	|	com.hand.hapcloud	|	hap-config-server	|	1.2.0
用户服务	|	com.hand.hapcloud	|	hap-user-service 	|	1.2.11
授权服务	|	com.hand.hapcloud	|	hap-oauth-server 	|	1.2.1
网关服务	|	com.hand.hapcloud	|	hap-api-gateway 	|	1.2.2
消息服务	|	com.hand.hapcloud	|	hap-event-store-service 	|	1.2.1
框架服务	|	com.hand.hapcloud	|	hap-framework-service	|	1.2.1
用户管理服务	|	com.hand.hapcloud	|	hap-user-admin-service  	|	1.2.0
K8S消息收集	|	com.hand.devops 	|	k8s-informer 	|	V0.1.1
Gitlab服务	|	com.hand.devops 	|	hap-gitlab-service  	|	1.1.0
K8S服务	|	com.hand.devops 	|	devops-kubernetes-service	|	1.1.0
文件服务	|	com.hand.devops 	|	hap-file-service 	|	1.1.0
开发服务	|	com.hand.devops 	|	hap-devops-service  	|	1.1.0
部署服务	|	com.hand.devops 	|	devops-deploy-service	|	1.1.6
SonarQube服务	|	com.hand.insight 	|	data-sonar-service  	|	1.0.1
数据整合服务	|	com.hand.insight 	|	data-intergration-service	|	1.0.0
数据提供服务	|	com.hand.insight 	|	data-provide-service 	|	1.0.1
数据操作服务	|	com.hand.insight	|	data-operation-service 	|	1.0.0
看板服务	|	com.hand.kanban 	|	hap-kanban-service 	|	1.1.0
移动服务	|	com.hand.mobile 	|	mobile-cloud-service 	|	1.0.0
框架前端	|	com.hand.hapcloud	|	hapcloud-front  	|	1.2.2
开发前端	|	com.hand.devops 	|	devops-front 	|	1.1.3
部署前端	|	com.hand.devops 	|	deploy-front 	|	1.1.5
洞察前端	|	com.hand.insight 	|	analysis-insight-front  	|	1.0.0
监控前端	|	com.hand.insight 	|	monitor-front	|	1.0.0
看板前端	|	com.hand.kanban 	|	hap-kanban-front 	|	1.1.0
移动前端	|	com.hand.mobile 	|	mobile-front 	|	1.0.0

---
## 硬件需求

### 存储
存储空间的大小主要取决于你将存储的docker image，Gitlab所存储的Git仓库以及使用文件服务时上传的文件大小。但是你应该考虑多留一些空间用来存储备份。
除此之外你还可以挂在一个支持NFS的分卷，比如NAS、 SAN、AWS、EBS。

### CPU
将所有服务运行起来，一定要注意当前集群内至少有16C可用。

### 内存
安装使用Choerodon开发区所有应用需要至少50GB可用内存(RAM + Swap)! 由于操作系统和其他正在运行的应用也会使用内存, 所以安装Choerodon开发区前一定要注意当前集群内至少有70GB的可用内存. 少于70GB内存会导致在部署后Pod一直处于等待状态或者在使用中出现各种诡异的问题。

Kubernetes v1.8.5  

> 搭建Devops平台时，默认已经搭建好K8S集群，若未搭建请[移步K8S集群搭建](https://rdc.hand-china.com/gitlab/rdc_hip/kubeadm-ansible)

---
## 依赖组件
 名称| 版本
 ---|---
 Gitlab| 10.2.0
 Gitlab Runner | 10.1.0
 SonarQube | 6.5
 Harbor(可选) | 1.1.1
 监控 | 1.0.0
 日志 | 1.0.0

---
## 安装所需软件及文件

- 在要执行ansible脚本的机器上安装ansible运行需要的环境以及git。

    ```
    sudo yum install -y epel-release && \
    sudo yum install -y ansible git
    ```

- 克隆安装脚本
    ```
    git clone https://rdc.hand-china.com/gitlab/rdc_hip/devops-ansible.git
    ```
---
## 使用NFS存储

> 若选择其他存储方式或已有NFS Server请跳过此步。

1. 复制搭建K8S集群时所用到的`inventory/hosts`文件内容到本项目的`inventory/hosts`文件中。添加`[nfs]`分区，该分区只能添加一个节点，`[nfs]`分区节点即为提供nfs服务的节点。
1. 修改`inventory/vars.yml`文件，将不需要部署的资源`enable`置为`false`，这里会自动创建所需目录；请设置`nfs.ip`属性，默认为指定节点ipv4地址；计算包含所有各节点的子网掩码将值赋予`nfs.client_net`，默认为"*"即所有主机都可以访问。
1. 执行以下命令搭建nfs

    ```
    ansible-playbook -i inventory/hosts -e @inventory/vars.yml nfs-server.yml
    ```

---
## 执行安装步骤

1. 修改`inventory/hosts`文件，其中`[dev]`分区只能添加一个节点且该节点可以使用`kubectl`命令。
1. 确认所要部署的资源(mysql、rabbitmq、redis、zookeeper、kafka、sonarqube,minio),若资源已有不需要部署，请在`inventory/vars.yml`文件中将资源`enable`置为`false`。
1. 执行以下命令搭建开发区所需资源

    ```
    ansible-playbook -i  inventory/hosts -e @inventory/vars.yml dev-resource.yml
    ```
1. 手动部署harbor(外部数据库要手工初始化)[参考链接](../components/harbor)
1. 手动部署Gitlab，等Devops所有服务部署后再配置oauth授权(Mysql 5.6需要转表)[参考链接](../components/gitlab)

    > 搭建完成Gitlab完成后创建一个名为`template`的Public Group，将`http://git.choerodon.com.cn/template`库中所有的仓科克隆并推送到新搭建的Gitlab仓库中,注意这个git库也应是public的，这样开发服务才能正常使用。
1. 手动部署Gitlab Runner[参考链接](../components/gitlab-runer)
1. 配置SonarQube[参考链接](../components/sonarqube)
1. 手动部署监控[参考链接](../components/监控)
1. 手动部署日志[参考链接](../components/日志)
1. 创建开发区所需数据库
    - 若使用容器运行的mysql，可以参照以下命令进入容器创建数据库

        ```
        查看pod名称，进入容器
        kubectl get po -n devops
        kubectl exec -it [PodName] -n devops bash
        进入mysql命令行
        mysql -uroot -p${MYSQL_ROOT_PASSWORD}
        ```
    - 创建hapcloud用户及数据库

        ```sql
        CREATE USER 'hapcloud'@'%' IDENTIFIED BY 'Handhand123';
        CREATE DATABASE hap_user_service DEFAULT CHARACTER SET utf8;
        CREATE DATABASE hap_manager_service DEFAULT CHARACTER SET utf8;
        CREATE DATABASE hap_event_service DEFAULT CHARACTER SET utf8;
        CREATE DATABASE hap_framework_service DEFAULT CHARACTER SET utf8;
        GRANT ALL PRIVILEGES ON hap_user_service.* TO hapcloud@'%';
        GRANT ALL PRIVILEGES ON hap_manager_service.* TO hapcloud@'%';
        GRANT ALL PRIVILEGES ON hap_event_service.* TO hapcloud@'%';
        GRANT ALL PRIVILEGES ON hap_framework_service.* TO hapcloud@'%';
        CREATE DATABASE hap_devops_service DEFAULT CHARACTER SET utf8;
        CREATE DATABASE devops_portal DEFAULT CHARACTER SET utf8;
        CREATE DATABASE hap_kanban_service DEFAULT CHARACTER SET utf8;
        CREATE DATABASE devops_operation_portal DEFAULT CHARACTER SET utf8;
        CREATE DATABASE devops_deploy_service DEFAULT CHARACTER SET utf8;
        CREATE DATABASE mobile_cloud_service DEFAULT CHARACTER SET utf8;
        GRANT ALL PRIVILEGES ON hap_devops_service.* TO hapcloud@'%';
        GRANT ALL PRIVILEGES ON devops_portal.* TO hapcloud@'%';
        GRANT ALL PRIVILEGES ON hap_kanban_service.* TO hapcloud@'%';
        GRANT ALL PRIVILEGES ON devops_operation_portal.* TO hapcloud@'%';
        GRANT ALL PRIVILEGES ON devops_deploy_service.* TO hapcloud@'%';
        GRANT ALL PRIVILEGES ON mobile_cloud_service.* TO hapcloud@'%';
        FLUSH PRIVILEGES;
        ```
1. 修改`inventory/config.yml`文件中资源区域维护好相应参数。
1. 执行以下命令开始开发区

    ```
    ansible-playbook -i  inventory/hosts -e @inventory/config.yml dev.yml
    ```