+++
title = "卸载"
description = "卸载Choerodon"
weight = 12

+++

## 卸载Choerodon

<blockquote class="warning">
此操作不可逆，如有需要请做好备份操作。此删除方式将会删除部署的所有基础组件比如Gitlab、Harbor，kafka等，以及Choerodon的所有服务，若需保留基础组件，请参考下面卸载分步安装的Choerodon。
</blockquote>

- 命令格式为： `helm delete [flags] RELEASE_NAME [...]`，详细请参考[Helm官方文档](https://docs.helm.sh/helm/#helm-delete)
- 删除`helm list | grep c7n-system | xargs helm delete --purge`
- 如有需要最后可将`namespace`一并删除，`kubectl delete ns [namespace]`。