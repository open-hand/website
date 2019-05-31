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
调用链平台运行的必要组件。安装调用链，可以查看各个服务之间的调用关系。目前Skywalking V6.0.0仍在测试中，不建议用于对调用链数据严格的生产环境
</blockquote>

### 添加choerodon chart仓库

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

### 安装调用链

- 安装skywalking oap

    ```bash
    helm install c7n/skywalking-oap \
    --set elasticsearch.host=elasticsearch.logging.svc:9200 \
    --set env.JAVA_OPTS="-Xms2048M -Xmx2048M" \
    --version 0.1.0 \
    --name skywalking-oap \
    --namespace logging 
    ```

- 安装skywalking ui

    ```bash
    helm install c7n/skywalking-ui \
    --set service.enabled=true \
    --set ingress.enabled=true \
    --set ingress."hosts[0]"=skywalking.example.choerodon.io \
    --set env.JAVA_OPTS="-Xms2048M -Xmx2048M" \
    --version 0.1.1 \
    --name skywalking-ui \
    --namespace logging  
    ```