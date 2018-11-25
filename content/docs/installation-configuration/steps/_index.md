+++
title = "安装步骤"
description = "Choerodon安装步骤的详细介绍及一些对应的注意事项"
weight = 8

+++

# 安装步骤

## 介绍
下面我们开始进行部署，首先我们[部署NFS服务端](./nfs/#客户端挂载nfs服务器共享目录-验证nfs服务端部署)并将所有节点安装NFS客户端必须工具包[nfs-utils](./nfs/#客户端挂载nfs服务器共享目录-验证nfs服务端部署)，当然如果你选择其他类型的文件存储，请忽略NFS搭建相关信息。然后我们进行Kubernetes集群部署，集群部署完成后，你可以选择使用脚本进行一键式安装Choerodon，也可以分步定制化安装Choerodon。最后我们部署Gitlab Runner，用于代码提交后自动进行代码测试、构建服务的镜像及生成helm chart并将结果发回给Choerodon。它与GitLab CI一起使用，Gitlab CI是Gitlab中包含的开源持续集成服务，用于协调作业。

监控组件作为一个可选组件提供给用户监控jvm虚拟机，集群监控和报警等功能，不安装监控组件不会影响正常的流程。

---

## 前置学习内容
在安装之前，你需要了解一些基本知识及概念，下面提供了一些学习资料(包括但不限于)的链接，请一定了解他们。

- [域名](https://baike.baidu.com/item/%E5%9F%9F%E5%90%8D)
- [NFS](https://baike.baidu.com/item/NFS/812203)
- [Docker](https://baike.baidu.com/item/Docker)
- [Kubernetes](http://docs.kubernetes.org.cn/)
- [Helm](https://www.helm.sh/)

{{< docdir >}}