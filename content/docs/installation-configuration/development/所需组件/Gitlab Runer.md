+++
title = "Gitlab Runner"
description = ""
weight = 3
banner = "img/banners/banner-1.jpg"
+++

## 搭建所需镜像及文件
 - 镜像列表 

     ```
     registry.saas.hand-china.com/tools/gitlab-runner:alpine-v10.1.0
     ```
 - 克隆安装脚本 

     ```
     git clone https://rdc.hand-china.com/gitlab/rdc_hip/devops-install-docs.git
     ```
## 前置准备

 ### 获取Runner注册Token

  > 此教程注册的Runner属性为共享，若需注册私有Runner，Token请在Git项目仓库`Settings -> CI/CD`菜单中获取

  ![WX20180120-200145@2x.png](https://i.loli.net/2018/01/20/5a632fc4725c0.png)

## 注册Runner

 ### 方式1
  ```
  docker run -it --rm --entrypoint=bash   registry.saas.hand-china.com/tools/gitlab-runner:alpine-v10.1.0
  
  gitlab-runner register
  
  # 注册成功后查看生成的token
  cat /etc/gitlab-runner/config.toml
  ```
  ![WX20180120-201422@2x.png](https://i.loli.net/2018/01/20/5a63374918e2b.png)
 
 ### 方式2

  ```
  docker run -it --rm registry.saas.hand-china.com/tools/gitlab-runner:alpine-v10.1.0   register
  ```
  > 注册完成后在Gitlab管理界面获取Runner的token、name和url
  
  ![WX20180120-203636@2x.png](https://i.loli.net/2018/01/20/5a6337e86bb92.png)

## 修改部署配置
 - 将上一步得到的token、name和url复制出来填写到`gitlab-runner-config`中的对应位置。
 - 修改`cache-pv.yml`和`maven-pv.yml`中nfs服务器地址和路径，并且在nfs的机器上创建这些目录。

## 运行

 ```
 # 创建namespace
 kubectl create ns tools
 # 部署Runner
 kubectl apply -f gitlab-runner/ -n tools
 ```