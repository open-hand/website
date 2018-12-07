+++
title = "域名解析"
description = "域名解析"
weight = 6
+++

# 域名解析


## 使用域名

您需要将你的域名解析到你集群中任意一台节点的外网IP（公网）

猪齿鱼需要的域名：

- 前台入口

    www.example.com

- 网关服务

    api.example.com

- Chartmuseum 

    chart.example.com

- Devops服务 

    devops.example.com

- Gitlab代码仓库 

    gitlab.example.com

- 私有镜像仓库 

    harbor.example.com or registry.example.com

- 对象存储 

    minio.example.com or file.example.com

- Notify服务 

    notify.example.com

- Wiki服务 

    wiki.example.com


## 没有域名

1. 自主搭建DNS服务器
1. 配置域名解析

[参考DNS搭建](../../../dns/#自主搭建DNS)