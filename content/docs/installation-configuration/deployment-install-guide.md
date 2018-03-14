+++
title = "运行区安装指南"
description = ""
weight = 3
banner = "img/banners/banner-1.jpg"
+++

# 运行区安装指南

- 当前Choerodon运行区各服务版本信息如下

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
    K8S服务	|	com.hand.devops 	|	devops-kubernetes-service	|	1.1.0
    文件服务	|	com.hand.devops 	|	hap-file-service 	|	1.1.0
    部署服务	|	com.hand.devops 	|	devops-deploy-service	|	1.1.6
    数据整合服务	|	com.hand.insight 	|	data-intergration-service	|	1.0.0
    数据提供服务	|	com.hand.insight 	|	data-provide-service 	|	1.0.1
    数据操作服务	|	com.hand.insight	|	data-operation-service 	|	1.0.0
    移动服务	|	com.hand.mobile 	|	mobile-cloud-service 	|	1.0.0
    框架前端	|	com.hand.hapcloud	|	hapcloud-front  	|	1.2.2
    开发前端	|	com.hand.devops 	|	devops-front 	|	1.1.3
    部署前端	|	com.hand.devops 	|	deploy-front 	|	1.1.5
    洞察前端	|	com.hand.insight 	|	analysis-insight-front  	|	1.0.0
    监控前端	|	com.hand.insight 	|	monitor-front	|	1.0.0
    移动前端	|	com.hand.mobile 	|	mobile-front 	|	1.0.0

## 运行环境
Kubernetes v1.8.5
> 搭建Devops平台时，默认已经搭建好K8S集群，若未搭建请[移步K8S集群搭建](https://rdc.hand-china.com/gitlab/rdc_hip/kubeadm-ansible)

## 依赖组件
名称| 版本
---|---
Harbor(可选) | 1.1.1
监控 | 1.0.0
日志 | 1.0.0

## 搭建所需软件及文件

- 在要执行ansible脚本的机器上安装ansible运行需要的环境以及git。

    ```
    sudo yum install -y epel-release && \
    sudo yum install -y ansible git
    ```

- 克隆安装脚本
    ```
    git clone https://rdc.hand-china.com/gitlab/rdc_hip/devops-ansible.git
    ```

## 使用NFS存储

> 若选择其他存储方式或已有NFS Server请跳过此步。

1. 复制搭建K8S集群时所用到的`inventory/hosts`文件内容到本项目的`inventory/hosts`文件中。添加`[nfs]`分区，该分区只能添加一个节点，`[nfs]`分区节点即为提供nfs服务的节点。
1. 修改`inventory/vars.yml`文件，将不需要部署的资源`enable`置为`false`，这里会自动创建所需目录；请设置`nfs.ip`属性，默认为指定节点ipv4地址；计算包含所有各节点的子网掩码将值赋予`nfs.client_net`，默认为"*"即所有主机都可以访问。
1. 执行以下命令搭建nfs

    ```
    ansible-playbook -i inventory/hosts -e @inventory/vars.yml nfs-server.yml
    ```

## 安装部署区

1. 修改`inventory/hosts`文件，其中`[run]`分区只能添加一个节点且该节点可以使用`kubectl`命令。
1. 确认所要部署的资源(mysql、rabbitmq、redis、zookeeper、kafka,minio),若资源已有不需要部署，请在`inventory/vars.yml`文件中将资源`enable`置为`false`。
1. 执行以下命令搭建部署区所需资源。

    ```
    ansible-playbook -i  inventory/hosts -e @inventory/vars.yml dev-resource.yml
    ```
1. 手动部署监控[参考链接](../components/监控)
1. 手动部署日志[参考链接](../components/日志)
1. 创建部署区所需数据库
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
        CREATE DATABASE devops_deploy_service DEFAULT CHARACTER SET utf8;
        CREATE DATABASE mobile_cloud_service DEFAULT CHARACTER SET utf8;
        CREATE DATABASE devops_operation_portal DEFAULT CHARACTER SET utf8;
        GRANT ALL PRIVILEGES ON devops_deploy_service.* TO hapcloud@'%';
        GRANT ALL PRIVILEGES ON mobile_cloud_service.* TO hapcloud@'%';
        GRANT ALL PRIVILEGES ON devops_operation_portal.* TO hapcloud@'%';
        FLUSH PRIVILEGES;
        ```
1. **重要：** 注释掉`inventory/config.yml`文件中第2109行到文件最后一行的配置，这些配置为开发区所需的，若未注释那么系统搭建完成后会将开发区的信息扫描进去，所以注释掉它。
1. 修改`inventory/config.yml`文件中资源区域维护好相应参数。
1. 运行脚本搭建部署端

    ```
    ansible-playbook -i  inventory/hosts -e @inventory/config.yml run.yml
    ```