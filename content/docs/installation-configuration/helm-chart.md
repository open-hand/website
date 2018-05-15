<!-- +++
title = "Helm Chart"
description = "Helm Chart"
weight = 110
+++ -->

# Helm Chart

应用 | 版本 | APP版本|依赖
--- | --- | --- | ---
redis | 0.1.0 | 3.2.9 |
mysql | 0.1.0 | 5.6 | 
harbor | 0.1.0 | 1.4.0 |
kafka | 0.1.0 | 1.0.0| 
zookeeper | 0.1.0 | 3.4.10| 
gitlab | 0.1.0 | 10.2.1
 

# 安装说明

- baseUrl: 泛解析到集群的基础域名,移除`*.`, 如`*.example.com`写作`example.com`
- storageType: 指定存储类型，包括glusterfs,nfs和host


## 创建一个pv

```
helm install create-pv  --set pv.name=test-pv-01 --set glusterfs.path=gv1/alpha
```

参数(等号后边为默认值)：

- `--set type=glusterfs` 指定pv类型可选`glusterfs`、`nfs`
- `--set "endpoint.ip[0]"=80.0.0.111,endpoint.ip[1]"=80.0.0.112` 指定endpoint ip
- `--set glusterfs.path=` 指定glusterfs路径
- `--set glusterfs.endpoints=glusterfs-cluster` 指定glusterfs endpoints
- `--set glusterfs.endpoints=glusterfs-cluster` 指定glusterfs endpoints
- `--set size=40Gi` 指定大小
- `--set pvc.enable=true` 是否创建pvc
- `--set endpoints.enable=true` 是否创建endpoints
- `--set labels.xxx=aaa,yyy=bbb` pv添加额外的标签
- `--set accessModes[0]=ReadWriteMany` 访问模式

## 微服务

### cloud框架

默认以sit配置进行部署。sit为staging环境配置。
如需要替换启动环境请按如下配置替换"sit"字样：

`--set "env.open.SPRING_PROFILES_ACTIVE"=sit`

替换环境变量需按如下格式修改：

`--set "env.open.FOO_BAR"=value` 

--set 指令可以替换的参数如下：

参数 | 含义
---|---
replicaCount | 服务副本数
image.repository | 镜像地址
image.tag | 镜像标签
image.pullPolicy | 镜像拉取策略
deployment.managementPort | 管理端口地址
service.type | svc类型
service.port | 服务启动端口地址
resources.limits.memory | 最大内存
resources.requests.memory | 请求内存

下列参数根据服务不同可能需要：

参数 | 含义
---|---
preJob.preConfig.configFile | 初始化配置文件
preJob.preConfig.mysql.host | 初始化配置数据库地址
preJob.preConfig.mysql.port | 初始化配置数据库端口
preJob.preConfig.mysql.database | 初始化配置数据库名
preJob.preConfig.mysql.username | 初始化配置数据库用户名
preJob.preConfig.mysql.password | 初始化配置数据库用户密码
preJob.preInitDB.mysql.host | 初始化表数据库地址
preJob.preInitDB.mysql.port | 初始化表数据库端口
preJob.preInitDB.mysql.database | 初始化表数据库名
preJob.preInitDB.mysql.username | 初始化表数据库用户名
preJob.preInitDB.mysql.password | 初始化表数据库用户密码

#### register-server

```bash
helm install go-register-server/chart/register-server --namespace=io-choerodon
```

注册服务可使用 `KAFKA_ADDRESSES` 环境变量配置Kafka地址。

#### manager服务

```bash
helm install manager-service/chart/manager-service --namespace=framework
```

**manager服务需初始化配置。**

**manager服务需初始化表。**


#### config-server

```bash
helm install config-server/chart/config-server --namespace=framework
```

#### api-gateway

**api-gateway服务需初始化配置。**

```bash
helm install api-gateway/chart/api-gateway --namespace=framework
```

#### gateway-helper

**gateway-helper服务需初始化配置。**

```bash
helm install gateway-helper/chart/gateway-helper --namespace=framework
```

#### iam服务

**iam服务需初始化配置。**

**iam服务需初始化表。**

```bash
helm install iam-service/chart/iam-service --namespace=framework
```

#### oauth-server

**oauth-server需初始化配置。**

```bash
helm install oauth-server/chart/oauth-server --namespace=framework
```

#### event-store服务

**event-store服务需初始化配置。**

**event-store服务需初始化表。**

```bash
helm install event-store-service/chart/event-store-service --namespace=framework
```

#### file服务

**file服务需初始化配置。**

```bash
helm install file-service/chart/file-service --namespace=framework
```

#### hystrix-dashboard

**hystrix-dashboard服务需初始化配置。**

```bash
helm install hystrix-dashboard/chart/hystrix-dashboard --namespace=framework
```

#### hystrix-turbine

**hystrix-turbine服务需初始化配置。**

```bash
helm install hystrix-turbine/chart/hystrix-turbine --namespace=framework
```

#### usermap-service 

- 创建一个数据库名称为 `usermap_service`

```sql
CREATE USER 'root'@'%' IDENTIFIED BY "handhand";
CREATE DATABASE usermap_service DEFAULT CHARACTER SET utf8;
GRANT ALL PRIVILEGES ON usermap_service.* TO root@'%';
FLUSH PRIVILEGES;
```

- 注意默认环境变量，一般情况下`CHOERODON_GATEWAY_DOMAIN`，`CHOERODON_SWAGGER_OAUTH_URL`需要修改，其他变量根据实际情况确定是否需要修改

```yaml
    EUREKA_DEFAULT_ZONE: http://register-server.io-choerodon:8000/eureka/
    SPRING_DATASOURCE_URL: jdbc:mysql://kanban-mysql.db.svc:3308/usermap_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
    SPRING_DATASOURCE_USERNAME: root
    SPRING_DATASOURCE_PASSWORD: handhand
    CHOERODON_EVENT_CONSUMER_KAFKA_BOOTSTRAP_SERVERS: kafka-0.kafka-headless.kafka.svc.cluster.local:9092, kafka-1.kafka-headless.kafka.svc.cluster.local:9092, kafka-2.kafka-headless.kafka.svc.cluster.local:9092
    SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS: kafka-0.kafka-headless.kafka.svc.cluster.local:9092, kafka-1.kafka-headless.kafka.svc.cluster.local:9092, kafka-2.kafka-headless.kafka.svc.cluster.local:9092
    SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES: zookeeper-0.zookeeper-headless.zookeeper.svc.cluster.local:2181,zookeeper-1.zookeeper-headless.zookeeper.svc.cluster.local:2181,zookeeper-2.zookeeper-headless.zookeeper.svc.cluster.local:2181
    SPRING_KAFKA_PRODUCER_VALUE_SERIALIZER: org.apache.kafka.common.serialization.ByteArraySerializer
    SPRING_CLOUD_CONFIG_URI: http://config-server.framework:8010/
    ZUUL_ROUTES_MANAGER_PATH: "/usermap/**"
    ZUUL_ROUTES_MANAGER_SERVICE_ID: usermap-service
    CHOERODON_GATEWAY_DOMAIN: gateway.staging.saas.hand-china.com
    CHOERODON_SWAGGER_OAUTH_URL: http://gateway.staging.saas.hand-china.com/iam/oauth/authorize
    SPRING_PROFILES_ACTIVE: default
```

- 安装

```
helm install . --debug --namespace=scrum --name=usermap_service --set env.open.CHOERODON_GATEWAY_DOMAIN="gateway.alpha.saas.hand-china.com" --set env.open.CHOERODON_SWAGGER_OAUTH_URL="http://gateway.staging.saas.hand-china.com/iam/oauth/authorize"
```

#### scrum-service 

- 创建一个数据库名称为 `scrum_service`

```bash
CREATE USER 'root'@'%' IDENTIFIED BY "handhand";
CREATE DATABASE scrum_service DEFAULT CHARACTER SET utf8;
GRANT ALL PRIVILEGES ON scrum_service.* TO root@'%';
FLUSH PRIVILEGES;
```

- 注意默认环境变量根据实际情况确定是否需要修改

```yaml
    EUREKA_DEFAULT_ZONE: http://register-server.io-choerodon:8000/eureka/
    SPRING_DATASOURCE_URL: jdbc:mysql://kanban-mysql.db.svc:3308/scrum_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
    SPRING_DATASOURCE_USERNAME: root
    SPRING_DATASOURCE_PASSWORD: handhand
    CHOERODON_EVENT_CONSUMER_KAFKA_BOOTSTRAP_SERVERS: kafka-0.kafka-headless.kafka.svc.cluster.local:9092, kafka-1.kafka-headless.kafka.svc.cluster.local:9092, kafka-2.kafka-headless.kafka.svc.cluster.local:9092
    SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS: kafka-0.kafka-headless.kafka.svc.cluster.local:9092, kafka-1.kafka-headless.kafka.svc.cluster.local:9092, kafka-2.kafka-headless.kafka.svc.cluster.local:9092
    SPRING_CLOUD_STREAM_KAFKA_BINDER_ZK_NODES: zookeeper-0.zookeeper-headless.zookeeper.svc.cluster.local:2181,zookeeper-1.zookeeper-headless.zookeeper.svc.cluster.local:2181,zookeeper-2.zookeeper-headless.zookeeper.svc.cluster.local:2181
    SPRING_KAFKA_PRODUCER_VALUE_SERIALIZER: org.apache.kafka.common.serialization.ByteArraySerializer
    SPRING_CLOUD_CONFIG_URI: http://config-server.framework:8010/
    ZUUL_ROUTES_MANAGER_PATH: "/usermap/**"
    ZUUL_ROUTES_MANAGER_SERVICE_ID: usermap-service
    CHOERODON_GATEWAY_DOMAIN: gateway.staging.saas.hand-china.com
    CHOERODON_SWAGGER_OAUTH_URL: http://gateway.staging.saas.hand-china.com/iam/oauth/authorize
    SPRING_PROFILES_ACTIVE: default
```

- 安装

```
helm install . --namespace=scrum --name=scrum-service
```