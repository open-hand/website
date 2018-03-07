+++
title = "后端环境部署"
date = "2017-10-30"
draft = false
weight = 5
+++

# HAPCloud 后端demo环境部署
>  前置条件kubernetes环境

本教程旨在于k8s中通过现有的部署文件轻松部署一个HAPCloud环境，所有部署文件的在[hapcloud-deploy](https://rdc.hand-china.com/gitlab/HAPCloud/hapcloud-deploy)。
## 部署DB以及相关基础依赖
### 部署mysql

1. 在k8s管理节点上通过执行`kubectl create -f pv.yml`新建在k8s控制台界面上或者在节点终端建立mysql所对应的`PersistentVolumeClaim`(简称pv)即持久卷，因为mysql容器中'/var/lib/mysql目录需挂载出去。并在nfs上建立pv.yml中所设设置的挂载目录。建立好之后执行`kubectl get pv`所建pv的状态为`Available`。
2. 在k8s控制台界面上或者在节点终端建立mysql所对应的PersistentVolumeClaim(简称pvc)、Service、deploymentConfig`ConfigMap。pvc建立好之后如果与先前建立的pv绑定成功，此时再查看pv的状态则为`Bound`。

### 部署rabbitmq和redis

1. rabbitmq和redis无需挂载卷所以只需在k8s上执行对应的部署文件即可。

### 首次初始化数据库

1. 可以通过phpmyadmin或者通过连接openvpn在mysql容器中建立用户和数据库并赋予权限。脚本如下：
```
CREATE USER 'hapcloud'@'%' IDENTIFIED BY "handhand";
CREATE DATABASE hap_user_service DEFAULT CHARACTER SET utf8;
CREATE DATABASE hap_framework_service DEFAULT CHARACTER SET utf8;
CREATE DATABASE hap_scheduler_service DEFAULT CHARACTER SET utf8;
CREATE DATABASE hap_zipkin_ui DEFAULT CHARACTER SET utf8;
GRANT ALL PRIVILEGES ON hap_user_service.* TO hapcloud@'%';
GRANT ALL PRIVILEGES ON hap_framework_service.* TO hapcloud@'%';
GRANT ALL PRIVILEGES ON hap_scheduler_service.* TO hapcloud@'%';
GRANT ALL PRIVILEGES ON hap_zipkin_ui.* TO hapcloud@'%';
FLUSH PRIVILEGES;
```
### 建立配置文件git仓库
  
  可以从我们的[git仓库](https://rdc.hand-china.com/gitlab/HAPCloud/hap-cloud-config.git)fork出一份自己的仓库，以便添加一些额外的配置。此时hap-config-server.yml文件中把注释部分取消并换成自己的仓库地址。

## 部署HAPCloud核心服务

    1. 注册服务hap-register-server
    直接执行。
    2. 配置服务hap-config-server
        在注释处替换自己的配置文件仓库，直接运行即可。

    3. 认证服务hap-oauth-server
        直接执行
    4. 网关hap-api-gateway
        hap-api-gateway的SWAGGER认证地址需要根据所配置的路由地址来确认。
    5. 用户服务hap-user-service
        首次需先执行数据库的初始化。在hap-user-service项目的根目录下执行`sh init-local-database.sh`，需连上openvpn并把脚本中的mysql地址替换为k8s上mysql pod地址。现在也可直接执行hap-user-service.yml中的job即可初始化话数据库。
        现在也
    6. 用户管理服务hap-user-admin-service
        用户管理服务也是依赖`hap_user_service`数据库的初始化，与hap-user-service所依赖数据库相同。
    7. 框架服务hap-framework-service
        框架服务的数据库初始化需在用户服务的数据库初始化之后，同样可以通过执行yml文件的job初始化和远程执行`sh init-local-database.sh`进行初始化数据。
        hap-user-service先执行数据库初始化。

## 部署HAPCloud其他服务

    1. 调度服务hap-scheduler-service
        确保`hap_user_service`数据初始化后，进入项目目录，执行`sh init-local-database.sh`初始化项目数据库，初始化结束后即可启动应用。