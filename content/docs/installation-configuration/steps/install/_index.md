+++
title = "第五步：服务部署"
description = "Choerodon安装步骤的详细介绍及一些对应的注意事项"
weight = 22

+++

# 安装步骤

## 介绍

下面我们开始进行部署，你可以选择使用脚本进行一键式安装Choerodon，也可以分步定制化安装Choerodon。最后我们部署Gitlab Runner，用于代码提交后自动进行代码测试、构建服务的镜像及生成helm chart并将结果发回给Choerodon。它与GitLab CI一起使用，Gitlab CI是Gitlab中包含的开源持续集成服务，用于协调作业。

监控组件作为一个可选组件提供给用户监控jvm虚拟机，集群监控和报警等功能，不安装监控组件不会影响正常的流程。

---

{{< docdir >}}