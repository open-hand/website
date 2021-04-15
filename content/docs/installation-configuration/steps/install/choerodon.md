+++
title = "方式一：一键部署Choerodon[建议]"
description = "方式一：一键部署Choerodon"
weight = 18
+++

# 一键部署Choerodon

## 前置条件

- 成功安装kubernetes集群(1.10以上版本)
- 成功安装helm(v3.2.4及以上版本)
- 每个节点安装nfs-utils(Centos)或nfs-common(Debian/Ubuntu)
- 安装nfs-provisioner或自有nfs服务
- 正确解析域名到集群中

## 下载安装工具

如果您的主机没有配置kubernetes连接信息，则您需要到k8s服器中的master执行安装，如果您的主机已经配置了kubernetes的连接信息，并且可以正常执行`kubectl`命令，您可以在您的主机上执行安装，在安装之前您需要下载安装工具，目前支持Linux及MacOS:

```bash
curl -fsSL -o get_c7nctl.sh https://gitee.com/open-hand/c7nctl/raw/0.25/scripts/get-c7nctl.sh
chmod 700 get_c7nctl.sh
./get_c7nctl.sh
```

## 创建并编辑配置文件

```bash
vim config.yml
```

粘贴以下内容，并将域名修改为你自己的域名

```yml
version: 0.25
metadata:
  name: resource-choerodon
  namespace: c7n-system  # 指定命名空间安装choerodon
spec:
  persistence:
    storageClassName: nfs-provisioner
  resources:
    gitlab:
      domain: gitlab.example.choerodon.io
    minio:
      domain: minio.example.choerodon.io
    harbor:
      domain: harbor.example.choerodon.io
    chartmuseum:
      domain: chart.example.choerodon.io
    sonatype-nexus:
      domain: nexus.example.choerodon.io
    sonarqube:
      domain: sonarqube.example.choerodon.io
    choerodon-gateway:
      domain: api.example.choerodon.io
    choerodon-message:
      domain: notify.example.choerodon.io
    devops-service:
      domain: devops.example.choerodon.io
    choerodon-front-hzero:
      domain: hzero.example.choerodon.io
    choerodon-front:
      domain: app.example.choerodon.io
```

## 开始部署

- install 命令的第一个参数可选： c7n（全模块安装）、devops（Devops流程安装）、agile（敏捷管理安装）、test-manager（测试管理安装）、knowlagebase（知识管理安装）

- 在安装过程中，会提示设置某些组件用户名及密码，注意保存

- 如果安装失败，根据提示操作后，再次执行命令即可

- 执行部署命令，<b style="color:red">安装过程中如果遇到问题，请先查看本文最后一节关于常见问题的介绍</b>，如果未能解决你的问题，可以到[论坛](//openforum.hand-china.com)中提问。

```bash
./c7nctl install c7n -c config.yml --version=0.25
```

- 参数解释

| 参数 | 说明 |
| --- |  --- |
| \-\-debug | 输出 debug 级别的日志 |
| \-\-config | 设置安装的配置文件 |
| \-\-namespace |  指定安装的的 namespace，默认为 c7n-system |
| \-\-version | 设置安装的猪齿鱼版本 |
| \-\-resource-path | 设置安装资源的路径，用于离线安装 |
| \-\-prefix | 安装资源的前缀 |
| \-\-thin-mode | 最小资源占用安装,需要服务总配置为 6C32G，仅推荐用于测试体验安装 |
| \-\-client-only | 模拟安装，仅输出安装配置 |
| \-\-chart-repo | chart 仓库地址 |
| \-\-image-repo | 设置所有helm实例的镜像仓库 |

## 后续步骤

- 安装完成后您可以访问您配置的`choerodon-front`域名，默认用户名和密码为admin/Admin@123!

- 登录一次Gitlab，第一次登录会提示设置root用户密码，随后会跳转到Choerodon认证，使用admin/Admin@123!登录即可，如果使用root/admin用户拉取代码用户名为root，密码为界面设置的密码，其他用户创建后会通过站内信通知Gitlab密码

- [设置Harbor证书(必须设置)](../parts/base/harbor/#证书配置)

- [Nexus 匿名用户设置(可选)](../parts/base/choerodon-repo/)

- [安装Gitlab-Runner](../parts/gitlab-runner)

## 常见问题

##### 停留在等待slaver启动过程中/waiting slaver running

  1. 请确认每个节点都安装了nfs-utils
  2. nfs服务处于正常运行状态

##### 提示job已存在

  根据提示执行删除命令后，重新执行安装命令

##### 请检查您的域名: xxxx.xx.xx 已正确解析到集群

  域名未解析到集群中，如果你刚修改域名解析记录，新修改生效需要等待一段时间，该时间取决于你的DNS服务商，你可以在任意<b style="color:red">包含ping命令</b>的POD中使用PING命令查看解析是否正确，命令: `kubectl exec -ti [POD_NAME] -n [NAMESPACE] ping baidu.com`

##### Waiting xxx running

等待前置服务启动，服务启动需要拉取对应镜像，取决于你的网速，一般情况下需要等待1~2分钟，如果长时间未启动，执行命令`kubectl get po xxx -n [NAMESPACE]`查看对应服务的POD状态。

- 如果为Pending状态，则执行命令`kubectl describe po xxx -n [NAMESPACE]`查看Pending的原因。一般为内存、CPU或磁盘不足和网路不通导致。
  
- 如果为ContainerCreating，一般为正在拉取镜像，请耐心等待。
