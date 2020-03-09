+++
title = "方式一：一键部署Choerodon[建议]"
description = "方式一：一键部署Choerodon"
weight = 18
+++

# 一键部署Choerodon

## 前置条件

- 成功安装kubernetes集群(1.10以上版本)
- 成功安装helm(2.10及以上版本)
- 每个节点安装nfs-utils(Centos)或nfs-common(Debian/Ubuntu)
- 安装nfs-provisioner或自有nfs服务
- 正确解析域名到集群中

## 下载安装工具

如果您的主机没有配置kubernetes连接信息，则您需要到k8s服器中的master执行安装，如果您的主机已经配置了kubernetes的连接信息，并且可以正常执行`kubectl`命令，您可以在您的主机上执行安装，在安装之前您需要下载安装工具，目前支持Linux及MacOS:

```bash
export VERSION=0.21.0
curl -L https://file.choerodon.com.cn/choerodon-install/c7nctl/${VERSION}/c7nctl-${VERSION}-`uname -s`-amd64.tar.gz | tar -xz && cd c7nctl-${VERSION}
```

## 创建并编辑配置文件

```bash
vim config.yml
```

粘贴以下内容，并将域名修改为你自己的域名

```yml
version: 0.21
metadata:
  name: install-choerodon
  namespace: c7n-system  # 指定命名空间安装choerodon
spec:
  persistence:
    storageClassName: nfs-provisioner
  resources:
    mysql:
      external: false
    gitlab:
      domain: gitlab.example.choerodon.io
      external: false
      username: root     # gitlab 默认用户名为root，不能修改
      schema: http
    minio:
      domain: minio.example.choerodon.io
      schema: http
    harbor:
      domain: harbor.example.choerodon.io
      schema: https
      username: admin    # harbor 默认用户名为admin，不能修改
    chartmuseum:
      domain: chart.example.choerodon.io
      schema: http
    api-gateway:
      domain: api.example.choerodon.io
      schema: http
    notify-service:
      domain: notify.example.choerodon.io
      schema: ws
    devops-service:
      domain: devops.example.choerodon.io
      schema: ws
    choerodon-front:
      domain: c7n.example.choerodon.io
      schema: http
      username: admin   # 前端 默认用户名为admin，暂不能修改
      password: admin   # 前端 默认密码为admin，暂不能修改
```

## 开始部署

- 在安装过程中，会提示设置某些组件用户名及密码，注意保存
- 如果安装失败，根据提示操作后，再次执行命令即可
- 如果安装api-gateway失败请重新执行一次安装命令
- 执行部署命令，<b style="color:red">安装过程中如果遇到问题，请先查看本文最后一节关于常见问题的介绍</b>，如果未能解决你的问题，可以到[论坛](//forum.choerodon.io)中提问。
- 更多关于c7nctl的配置请参考[此处](https://blog.vinkdong.com/c7nctl%E8%AF%A6%E8%A7%A3/)

```bash
./c7nctl install -c config.yml --no-timeout --version=0.20
```

- 参数解释

| 参数 | 作用 | 说明
| --- | --- |  ---
| --no-timeout | 取消默认任务等待超时| 微服务安装时需要执行初始化任务，默认超时时长为300秒，添加此参数将超时时长设置为24小时
| --debug | 输出调试信息 |

## 后续步骤

- 安装完成后您可以访问您配置的`choerodon-front`域名，默认用户名和密码都为admin
- 登录一次Gitlab，第一次登录会提示设置root用户密码，随后会跳转到Choerodon认证，使用admin/admin登录即可，如果使用root/admin用户拉取代码用户名为root，密码为界面设置的密码，其他用户默认密码为`password`
- [设置Harbor证书(必须设置)](../parts/base/harbor/#证书配置)
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
