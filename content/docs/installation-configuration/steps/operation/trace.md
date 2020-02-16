+++
title = "调用链部署"
description = "调用链部署"
weight = 26
+++

## 前置要求与约定

调用链作为独立的一部分，你可以选择安装或者不安装，如果选择安装需要安装Elasticseach数据库。如何安装请参考[此处](../logging),
Choerodon从0.12版本开始支持Skywalking，如果您使用之前的版本请安装zipkin。

## 部署调用链

<blockquote class="note">
调用链平台非运行的必要组件。安装调用链，可以查看各个服务之间的调用关系。
</blockquote>

### 添加choerodon chart仓库

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

### 安装调用链

```
helm install c7n/skywalking \
    --set oap.elasticsearch.host=elasticsearch.logging.svc:9200 \
    --set oap.env.JAVA_OPTS="-Xms2048M -Xmx2048M" \
    --set ui.service.enabled=true \
    --set ui.ingress.enabled=true \
    --set ui.ingress."hosts[0]"=skywalking.example.choerodon.io \
    --version 6.5.0 \
    --name skywalking \
    --namespace logging
```