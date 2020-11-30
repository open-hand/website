+++
title = "卸载"
description = "卸载Choerodon"
weight = 12

+++

## 卸载Choerodon

<blockquote class="warning">
此操作不可逆，如有需要请做好备份操作。此删除方式将会删除部署的所有基础组件比如Gitlab、Harbor，Mysql等，以及Choerodon的所有服务，若需保留基础组件，请参考下面卸载分步安装的Choerodon。
</blockquote>

- 命令格式为： `helm delete [flags] RELEASE_NAME [...]` ，详细请参考[Helm官方文档](https://docs.helm.sh/docs/intro/using_helm/)
- 删除 `helm list -n c7n-system | grep c7n-system | awk '{print $1}' | xargs helm uninstall -n c7n-system`
- 删除 namespace，`kubectl delete ns c7n-system`。