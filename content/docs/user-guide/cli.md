+++
title = "Choerodon CLI工具"
description = "CLI工具主要面向开发人员，支持使用命令行的方式来执行平台中的页面操作。"
weight = 13
+++

# Choerodon CLI工具

Choerodon CLI工具主要面向开发人员，支持使用命令行的方式来执行平台中的页面操作。在使用Choerodon的CLI工具前，需要做以下准备。

## 准备操作
#### 1. 下载CLI工具  
- 首先需要下载CLI安装包，请下载0.17.0版本或者更高版本,下载地址如下：https://file.choerodon.com.cn/choerodon-install/c7nctl
- 下载至本地后，将其解压至可执行文件bin目录下即可。
  

#### 2. 创建client    

由于CLI工具在访问Choerodon平台的时候需要授权，因此需要采用password类型的oauth2方式去获取token；换言之，用户需要在Choerodon平台的`组织层-组织设置-客户端`中创建客户端，具体设置如下图：  
![Client](/docs/user-guide/image/client.png)


## 工具操作  

Choerodon CLI工具目前支持以下操作，后续的版本将会涵盖平台中更多的功能。
#### 1. 登陆

在用户根目录下创建一个.c7n文件夹，里面新建一个config.yaml文件，内容为, 一个context代表一个环境，
server指环境的gateway地址,currentContext是指当前使用环境，可以使用命令切换，详见后面.

```
Contexts:
- Name: staging
  Server: http://api.staging.com
  User:
    OrganizationCode: ""
    OrganizationId: 0
    ProjectCode: ""
    ProjectId: 0
    Token: ""
    UserName: ""
- Name: uat
  Server: http://api.alpha.com
  User:
    OrganizationCode: ""
    OrganizationId: 0
    ProjectCode: ""
    ProjectId: 0
    Token: ""
    UserName: ""
CurrentContext: staging
```

登陆完之后的文件内容更新为:
```
Contexts:
- Name: staging
  Server: http://api.staging.com
  User:
    OrganizationCode: xxx
    OrganizationId: xxx
    ProjectCode: xxx
    ProjectId: xxx
    Token: xxx
    UserName: xxx
- Name: uat
  Server: http://api.alpha.com
  User:
    OrganizationCode: xxx
    OrganizationId: xxx
    ProjectCode: xxx
    ProjectId: xxx
    Token: xxx
    UserName: xxx
CurrentContext: staging

```

#### 1. 登陆

> c7nctl login 
  
![login](/docs/user-guide/image/login.png)  


#### 2. 登出

> c7nctl logout
  
登出之后，会清空配置文件中当前环境的配置信息，登出之后再进行命令操作会提示此操作需要登陆。  
![logout](/docs/user-guide/image/logout.png)  


#### 3. 切换环境配置

> c7nctl context --name xxx
  
切换环境之后，后续操作c7nctl使用该环境的登陆信息到该环境进行操作。  
![logout](/docs/user-guide/image/context.png) 

#### 4. 查询组织

> c7nctl get org  

此操作用于查询此用户在平台中有权限的组织，结果如下:  
![get-org](/docs/user-guide/image/get-org.png)  



#### 5. 修改默认组织

> c7nctl use org -o xxx    

此操作用于修改上下文中用户默认的组织，已设置的默认组织会用于后续的命令之中。  

![use-org](/docs/user-guide/image/use-org.png)  



#### 6. 查询项目

> c7nctl get proj  

此操作用于查询此用户在默认组织或指定组织中有权限的项目，结果如下:   
![get-pro](/docs/user-guide/image/get-pro.png)  



#### 7. 修改默认项目

> c7nctl use proj -p  xxx  

此操作用于修改上下文中用户默认的项目，已设置的默认项目会用于后续的命令之中。  
![use-pro](/docs/user-guide/image/use-pro.png)   


#### 8. 查询组织层的应用模板 

> c7nctl get appTemplate -o xxx  
(-o 非必输,传了用指定组织，不传用默认组织)  

此操作用于查询组织层的应用模板，且只能在此用户有权限的组织中查询。  
![get-app-template](/docs/user-guide/image/get-app-template.png)   

#### 9. 创建组织层的模板

> c7nctl create appTemplate --name xxx --code xxx --desciption xxx --copyFrom xxx  
(--copyFrom 非必输,可选择已有的模板code创建，不填创建空模板库)    

![create-apptemplate](/docs/user-guide/image/create-apptemplate.png)   



#### 10. 查询组织层集群

> c7nctl get cluster -o xxx(-o 非必输)  

![get-cluster](/docs/user-guide/image/get-cluster.png)   




#### 11. 创建组织层集群

> c7nctl create cluster --name xxx --code xxx --description xxx -o xxx(-o 非必输)  

![create-cluster](/docs/user-guide/image/create-cluster.png)  

#### 12. 查询项目应用

> c7nctl get app -p xxx(-p 非必输)  

![get-app](/docs/user-guide/image/get-app.png)  


#### 13. 创建项目应用

> c7nctl create app --name xxx --code xxx --type xxx --appTemplate xxx  -p xxx(-p 非必输)  

![create-app](/docs/user-guide/image/create-app.png)  


#### 14. 查询应用版本

> c7nctl get appVersion -a xxx -p xxx(-p 非必输)  

![get-app-version](/docs/user-guide/image/get-app-version.png)  


#### 15. 查询环境列表

> c7nctl get envs -p xxx(-p 非必输)  

![get-env](/docs/user-guide/image/get-env.png)  


#### 16. 创建环境

> c7nctl create env --name xxx --code xxx --cluster xxx -p xxx(-p 非必输)  

![create-env](/docs/user-guide/image/create-env.png)  


#### 17. 查询实例列表

> c7nctl get instance --env xxx -p xxx(-p 非必输)  

![get-instance](/docs/user-guide/image/get-instance.png)  


#### 18. 创建实例

> c7nctl create instance --env xxx --content xxx -p xxx(-p 非必输)  


![create-instance](/docs/user-guide/image/create-instance.png)  


#### 19. 创建网络

> c7nctl create service --env xxx --content xxx -p xxx(-p 非必输)  

![create-sercice](/docs/user-guide/image/create-service.png) 


#### 20. 创建域名

> c7nctl create ingress --env xxx --content xxx -p xxx(-p 非必输)  

![create-ingress](/docs/user-guide/image/create-ingress.png) 



#### 21. 创建证书

> c7nctl create cert --env xxx --content xxx -p xxx(-p 非必输)   

![create-cert](/docs/user-guide/image/create-cert.png) 



#### 22. 创建配置映射

> c7nctl create configMap --env xxx --content xxx -p xxx(-p 非必输)  

![create-configmap](/docs/user-guide/image/create-configmap.png) 



#### 23. 创建密文

> c7nctl create secret --env xxx --content xxx -p xxx(-p 非必输)    

![create-secret](/docs/user-guide/image/create-secret.png) 




