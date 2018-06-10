+++
title = "安装步骤"
description = "安装步骤"
weight = 8
+++

## 安装步骤

下面我们开始进行部署，首先我们[部署NFS服务端](../steps/nfs/#nfs服务端安装及配置)并将所有节点安装NFS客户端必须工具包[nfs-utils](../steps/nfs/#客户端挂载nfs服务器共享目录)，当然如果你选择其他类型的文件存储，请忽略NFS搭建相关信息。然后我们进行Kubernetes集群部署，集群部署完成后，你可以选择使用脚本进行一键式安装Choerodon，也可以分步定制化安装Choerodon。最后我们部署Gitlab Runner，用于代码提交后自动进行代码测试、构建服务的镜像及生成helm chart并将结果发回给Choerodon。它与GitLab CI一起使用，Gitlab CI是Gitlab中包含的开源持续集成服务，用于协调作业。

---

1. [NFS服务搭建](../steps/nfs)
1. [Kubernetes集群部署](../steps/kubernetes)
1. [一键部署Choerodon](../steps/choerodon)
1. [分步部署Choerodon](../steps/parts)
1. [Gitlab Runner部署](../steps/gitlab-runner)