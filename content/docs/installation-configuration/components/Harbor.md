+++
title = "Harbor"
description = ""
weight = 3
banner = "img/banners/banner-1.jpg"
+++

## Harbor 安装

介绍 Harbor 的安装和配置，Choerodon 使用 Harbor 作为私有镜像库。

--- 
## 安装所需镜像及文件
 - 镜像列表 

     ```
     registry.saas.choerodon.com/harbor/harbor-adminserver:v1.2.0
     registry.saas.choerodon.com/harbor/harbor-jobservice:v1.2.0
     registry.saas.choerodon.com/harbor/harbor-db:v1.2.0
     registry.saas.choerodon.com/harbor/registry:2.6.2-photon
     registry.saas.choerodon.com/harbor/harbor-ui:v1.2.0
     ```
 - 克隆安装脚本 

     ```
     git clone https://rdc.choerodon.com/gitlab/rdc_hip/devops-install-docs.git
     ```
---
## 使用外部数据库

 > 如果使用自带数据库请忽略此步骤。
 
 1. 创建一个`harbor`用户，创建`registry`数据库，并授予`harbor`用户权限
 
     ```
     # 创建用户
     CREATE USER 'harbor'@'%' IDENTIFIED BY 'handhand';
     # 请注意数据库名称一定不能改变
     CREATE DATABASE registry DEFAULT CHARACTER SET utf8;
     GRANT ALL PRIVILEGES ON registry.* TO harbor@'%';
     FLUSH PRIVILEGES;
     ```
 
 1. 将`devops-install-docs/devops/harbor/registry.sql`文件内容放到数据库执行初始化表结构。

---
## 安装Harbor
### 生成配置
 
  > 进入`devops-install-docs/devops/harbor`目录，下文我们将以此目录进行讲解。搭建后若使用https进行访问，请先阅读[访问](#访问)。
  
  1. 修改`harbor.cfg`的参数配置，主要包括harbor的访问地址  (hostname)，harbor的管理员密码(harbor_admin_password)和其他配置，参考配置如下:
      > 其他参数如果不清楚其用法请不要修改。
  
      ```
      hostname = register.choerodon.com
      harbor_admin_password = Harbor12345
  
      # 如果你使用的是外部数据库还需要修改以下参数为自己数据库实例相对于的值
      db_host = mysql
      db_port = 3306
      db_user = root
      ```
  1. 根据配置文件生成每个服务对应的configMap文件
      > 生成的configMap文件位于每个service对应的文件夹下，并且会在`kubernetes`目录下生成一个 `ingress.yaml`文件。
  
      ```
      python kubernetes/k8s-prepare
      ```
  1. 修改持久存储的地址
  - 在`kubernetes/pv`文件加下有对应三个服务的pv和pvc的yaml文件。请根据各自的需求修改对应`*.pv.yaml` 文件的配置。
  
      ```
      # 三对pv和pvc文件分别对应的服务是：
      log.pv.yaml       log.pvc.yaml          ===》      jobservice      存储日志文件
      registry.pv.yaml  registry.pvc.yaml     ===》      registry        存储镜像文件
      storage.pv.yaml   storage.pvc.yaml      ===》      mysql           mysql数据库的存储文件
      ```
  
  - **注意:** 如果使用已有数据库实例，则不需要修改storage.pv.yaml的配置，并且在后面的部署操作中，有关mysql的部署操作请全部忽略。

### 开始安装
  1. 创建命名空间harbor：
  
      ```
      kubectl create ns harbor
      ```
  1. 部署：
  
      ```
      # 创建jobservice的存储
      kubectl apply -f kubernetes/pv/log.pv.yaml
      kubectl apply -f kubernetes/pv/log.pvc.yaml -n harbor
  
      # 创建registry的存储
      kubectl apply -f kubernetes/pv/registry.pv.yaml
      kubectl apply -f kubernetes/pv/registry.pvc.yaml -n harbor
  
      # 创建mysql存储【使用已有数据库实例请略过】
      kubectl apply -f kubernetes/pv/storage.pv.yaml
      kubectl apply -f kubernetes/pv/storage.pvc.yaml -n harbor
  
      # 部署mysql【使用已有数据库实例请略过】
      kubectl apply -f kubernetes/mysql -n harbor
  
      # 部署镜像服务(registry)
      kubectl apply -f kubernetes/registry -n harbor
      # 部署harbor管理服务(adminserver)
      kubectl apply -f kubernetes/adminserver -n harbor
      # 部署日志服务(jobservice)
      kubectl apply -f kubernetes/jobservice -n harbor
      # 部署前端(ui)
      kubectl apply -f kubernetes/ui -n harbor
      ```
  
  1. 查看所有pod的运行状态：
  
      ```
      kubectl get po -n harbor
      ```
---
## 访问

### 使用HTTP进行访问
  1. 请直接部署ingress
  
      ```
      kubectl apply -f kubernetes/ingress.yaml -n harbor
      ```
      待所有pod的状态都为Running并且全部READY，表示已部署成功。可以使用在第一步中配置的hostname在浏览器中进行访问。
  
  1. 在需要对harbor使用docker命令进行`pull`和`push`操作时需要在相应的机器docker配置中添加  `insecure-registries`参数，该值为`harbor.cfg`文件中配置的`hostname`的值。
      - 可以根据操作系统和docker版本不同在对应位置的配置添加参数(请自行查阅)，比如:在centos7.X上配置，只需要在`/etc/docker/daemon.json`文件中添加以下参数:
  
      ```
      # 示例(仅供参考)
      {
          "exec-opts": ["native.cgroupdriver=systemd"],
          "storage-driver": "overlay",
          "log-driver": "json-file",
          "log-opts": {
          "max-size": "10m"
          },
          "insecure-registries": ["register.jaywoods.com"]
      }
      ```
  
      **注意：** 修改之后需要重启docker才能生效。
  
      ```
      systemctl daemon-reload && systemctl restart docker
      ```
 
### 使用HTTPS进行访问
#### 使用[kube-lego](https://github.com/jetstack/kube-lego)申请证书
  
   - 如果集群中部署了[kube-lego](https://github.com/jetstack/kube-lego)申请证书，请编辑   `ingress.yaml`，添加`secretName`属性到spce.tls.hosts中。[kube-lego]   (https://github.com/jetstack/kube-lego)会自动申请证书，部署成功后就可使用https进行访问了。
   
       - 1.为ingress添加注解`kubernetes.io/tls-acme: "true"`
   
       ```
       metadata:
       annotations:
           kubernetes.io/tls-acme: "true"
       ```
       - 2.为ingress添加添加`spec.tls`属性及其值
   
       ```
       spec:
       tls:
       - hosts:
           - register.jaywoods.com
           secretName: harbor-cert
       ```
   
       > **注意：** 这里的secretName值在当前命名空间是唯一的，且secretName值是必需的（即使这个secret对象不存在，它将由kube-lego创建）
   
   - 编辑完成后进行部署
       ```
       kubectl apply -f kubernetes/ingress.yaml -n harbor
       ```
  
#### 手动申请证书
  
   > 如果单纯的在ingress这里配置一个可信任证书的secret是不行的。在docker的操作时registry会进行证书校验， 也就是说ingress这配置的证书要与registry.cm.yaml里配置的能够匹配，否则就会报错。
   
   - 第一步：通过certbot生成证书(此方法每次更新只有3个月有效时间，若直接购买请跳过此步)。
   - 使用certbot生成证书需要注意几点:
        - 1.将域名解析到需要执行生成证书命令的机器上
        - 2.确保该机器上的80和443端口不能被占用
        - 3.该机器上已装有docker环境
   
       ```
       # 执行以下命令，注意更换域名地址
       docker run --rm -ti \
           --network host \
           -v /etc/letsencrypt:/etc/letsencrypt \
           -v /var/lib/letsencrypt:/var/lib/letsencrypt \
           certbot/certbot:v0.19.0 \
           certonly --standalone \ 
           -d example.choerodon.com
   
       # 过程中提示输入邮箱，完成之后证书在/etc/letsencrypt目录下
       ```
   
   - 第二步：修改harbor参数配置，并生成configmap
   
       - 这里需要修改除了[生成配置](#生成配置)中的变量还有以下参数:
   
       ```
       ui_url_protocol = https
   
       # 配置证书路径(修改为自己的证书路径)
       ssl_cert = /root/example.choerodon.com/fullchain.pem
       ssl_cert_key = /root/example.choerodon.com/privkey.pem
       ```
   
   - 然后就使用命令生成configmap文件:
   
       ```
       python kubernetes/k8s-prepare
       ```
   - 更新部署
   
       ```
       # 部署镜像服务(registry)
       kubectl apply -f kubernetes/registry -n harbor
       # 部署harbor管理服务(adminserver)
       kubectl apply -f kubernetes/adminserver -n harbor
       # 部署日志服务(jobservice)
       kubectl apply -f kubernetes/jobservice -n harbor
       # 部署前端(ui)
       kubectl apply -f kubernetes/ui -n harbor
       ```
   
   - 最后根据证书的内容生成一个secret:
   
       ```
       # 参数 --key 后指定证书私钥的路径
       # 参数 --cert 后指定证书的路径
       kubectl create secret tls harbor-cert --key privkey.pem --cert fullchain.pem -n harbor
       ```
   
   - 修改ingress配置，添加secretName属性值:


        kubectl edit ingress harbor -n harbor
        # 参考示例如下
        ...
        rules:
        - host: example.choerodon.com
            http:
            paths:
            - backend:
                serviceName: ui
                servicePort: 80
                path: /
            - backend:
                serviceName: registry
                servicePort: repo
                path: /v2
            - backend:
                serviceName: ui
                servicePort: 80
                path: /service
        tls:
        - hosts:
            - example.choerodon.com
            secretName: harbor-cert