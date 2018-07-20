+++
title = "调用链部署"
description = "调用链部署"
weight = 26
+++

## 前置要求与约定

调用链作为独立的一部分，你可以选择安装或者不安装，如果选择安装需要安装Elasticseach数据库。如何安装请参考[此处](../logging.md)

## 部署调用链

<blockquote class="note">
调用链平台运行的必要组件。安装调用链，可以查看各个服务之间的调用关系。
</blockquote>

### 添加choerodon chart仓库

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

### 安装调用链

- 安装zipkin-collector

    ```bash
    helm install c7n/zipkin-collector \
    --set env.open.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="http://register-server.choerodon-devops-prod:8000/eureka/" \
    --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS="kafka-0.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092\,kafka-1.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092\,kafka-2.kafka-headless.choerodon-devops-prod.svc.cluster.local:9092" \
    --set env.open.SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES="zookeeper-0.zookeeper-headless.choerodon-devops-prod.svc.cluster.local:2181\,zookeeper-1.zookeeper-headless.choerodon-devops-prod.svc.cluster.local:2181\,zookeeper-2.zookeeper-headless.choerodon-devops-prod.svc.cluster.local:2181" \
    --set env.open.ZIPKIN_STORAGE_ELASTICSEARCH_HOSTS="http://elasticsearch.logging:9200" \
    --name=zipkin-collector \
    --namespace=logging 
    ```

- 安装zipkin-ui

    ```bash
    helm install c7n/zipkin-ui \
    --set env.open.ZIPKIN_STORAGE_ELASTICSEARCH_HOSTS="http://elasticsearch.logging:9200" \
    --set service.enable=true \
    --set ingress.enable=true \
    --set ingress.host=zipkin.example.com \
    --name=zipkin-ui \
    --namespace=logging 
    ```