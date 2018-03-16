
+++
title = "SonarQube"
description = ""
weight = 4
banner = "img/banners/banner-1.jpg"
+++

## SonarQube 安装

介绍 SonarQube 的安装和配置，Choerodon 使用 SonarQube 作为代码质量的检查工具。

- <font>[安装所需镜像及文件](#安装所需镜像及文件)</font>
- <font>[前置准备](#前置准备)</font>
- <font>[安装](#安装)</font>
- <font>[集成Gitlab](#集成gitlab)</font>
    - <font>[网络好](#网络好)</font>
    - <font>[网络不好](#网络不好)</font>

--- 
## 安装所需镜像及文件
 - 镜像列表 

     ```
     registry.saas.hand-china.com/library/postgres:latest
     registry.saas.hand-china.com/library/sonarqube:6.5-alpine
     ```
 - 克隆安装脚本 

     ```
     git clone https://rdc.hand-china.com/gitlab/rdc_hip/devops-install-docs.git
     ```
---   
## 前置准备

 > 进入`devops-install-docs/devops/middleware/sonarqube`目录，下文我们将以此目录进行讲解。
 - 修改各目录下pv.yml的nfs地址和路径

---
## 安装

 ```
 # pv修改后再自行以下命令
 kubectl apply -f postgresql/ -n tools
 kubectl apply -f sonarqube/ -n tools
 ```
---
## 集成Gitlab

### 网络好

- 使用admin用户登录SonarQube,安装gitlab插件

![WX20180121-011251@2x.png](https://i.loli.net/2018/01/21/5a6378a5d8090.png)

### 网络不好

> 由于网络的原因，可能gitlab插件安装不了会提示错误。请使用以下方式安装。

- 下载此jar包

```
https://github.com/gabrie-allaigre/sonar-gitlab-plugin/releases/download/2.1.0/sonar-gitlab-plugin-2.1.0.jar
```

- 将jar包拷贝到`SONARQUBE_HOME/extensions/plugins`目录中。
- 重启SonarQube生效
- 接下来按照图片提示配置这两个选项

![WX20180121-013050@2x.png](https://i.loli.net/2018/01/21/5a637cfe09b7b.png)
![WX20180121-013120@2x.png](https://i.loli.net/2018/01/21/5a637cfdb49e5.png)

[参考链接](https://gitlab.talanlabs.com/gabriel-allaigre/sonar-gitlab-plugin)
