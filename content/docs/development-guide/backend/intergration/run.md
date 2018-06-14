+++
title = "模块运行"
date = "2018-04-25T11:00:28+08:00"
draft = false
weight = 3
+++

## 前置条件

* 开发环境配置：[开发环境安装](../../develop-env/)
* 数据环境准备：[数据初始化](../init/)
* Demo程序已经开发完毕，详见 [开发Demo程序](../../demo/)
* 启动 `mysql`，`redis`，`kafka`等容器

## 介绍

本小节介绍如何在本地使用docker compose运行choerodon 微服务开发框架，并启动demo程序

## 启动相关服务

要使功能完整可用，在本地至少启动如下模块：

* register-server
* api-gateway
* gateway-helper
* oauth-server
* manager-service
* iam-service

<blockquote class="note">
本地通过docker-compose启动服务，建议本地内存至少16G。建议在服务器运行一整套环境，然后本地实际开发的服务注册到服务器的`register`上。
</blockquote>

1.编写`docker-compose.yaml` 文件。

2.打开`git bash` 执行`docker-compose up -d`。

3.执行`docker ps` 或`docker-compose ps` 查看容器是否启动。

这里提供一份`docker-compose.yaml`以供参考，具体根据本地配置进行修改

``` yaml
version: "3"
services:
  zookeeper-0:
    container_name: zookeeper-0
    image: registry.saas.hand-china.com/tools/zookeeper:3.4.10
    hostname: zookeeper-0
    environment:
    - ZK_REPLICAS=1
    - ZK_HEAP_SIZE=2G
    - ZK_TICK_TIME=2000
    - ZK_INIT_LIMIT=10
    - ZK_SYNC_LIMIT=5
    - ZK_MAX_CLIENT_CNXNS=60
    - ZK_SNAP_RETAIN_COUNT=3
    - ZK_PURGE_INTERVAL=1
    - ZK_LOG_LEVEL=INFO
    - ZK_CLIENT_PORT=2181
    - ZK_SERVER_PORT=2888
    - ZK_ELECTION_PORT=3888
    ports:
    - "2181:2181"
    - "2888:2888"
    - "3888:3888"
    command:
    - sh
    - -c
    - zkGenConfig.sh && exec zkServer.sh start-foreground
    volumes:
    - "./kafka/zk:/var/lib/zookeeper"
  kafka-0:
    container_name: kafka-0
    image: registry.cn-hangzhou.aliyuncs.com/choerodon-tools/kafka:1.0.0
    hostname: kafka-0
    depends_on:
    - zookeeper-0
    links:
    - zookeeper-0
    ports:
    - "9092:9092"
    command:
    - sh
    - -c
    - "/opt/kafka/bin/kafka-server-start.sh config/server.properties \
           --override zookeeper.connect=zookeeper-0:2181 \
           --override log.dirs=/opt/kafka/data/logs \
           --override broker.id=0 "
    volumes:
    - "./kafka/kafka:/opt/kafka/data"
  mysql:
    container_name: mysql
    image: registry.cn-hangzhou.aliyuncs.com/choerodon-tools/mysql:5.7.17
    hostname: mysql
    ports:
    - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: root
    volumes:
    - ./mysql/mysql_data:/var/lib/mysql
    - ./mysql/mysql_db.cnf:/etc/mysql/conf.d/mysql_db.cnf
    expose:
    - "3306"
  eureka-server:
    container_name: eureka-server
    hostname: eureka-server
    image: registry.cn-shanghai.aliyuncs.com/choerodon/eureka-server:0.6.0
    ports:
    - "8000:8000"
    links:
    - kafka-0
    environment:
    - spring.kafka.bootstrap-servers=kafka-0:9092
    - eureka.client.serviceUrl.defaultZone=http://127.0.0.1:8000/eureka/
    - eureka.client.register-with-eureka=false
    - eureka.client.fetch-registry=false
    - hystrix.stream.queue.enabled=false
    - spring.cloud.bus.enabled=false
    - spring.sleuth.stream.enabled=false
    - logging.level=WARN
    expose:
    - "8000"
  api-gateway:
    container_name: api-gateway
    image: registry.cn-shanghai.aliyuncs.com/choerodon/api-gateway:0.6.0
    links: 
    - eureka-server
    depends_on:
    - eureka-server
    ports:
    - "8080:8080"
    environment:
    - zuul.addHostHeader=true
    - zuul.routes.dev.path=/todo/**
    - zuul.routes.dev.serviceId=choerodon-todo-service
    - eureka.client.serviceUrl.defaultZone=http://eureka-server:8000/eureka/
    - hystrix.stream.queue.enabled=false
    - spring.cloud.bus.enabled=false
    - spring.sleuth.stream.enabled=false
    - logging.level=WARN
    expose:
    - "8080"
  gateway-helper:
    container_name: gateway-helper
    image: registry.cn-shanghai.aliyuncs.com/choerodon/gateway-helper:0.6.0
    depends_on:
    - eureka-server
    - mysql
    links: 
    - eureka-server
    - mysql
    ports:
    - "9180:9180"
    environment:
    - eureka.client.serviceUrl.defaultZone=http://eureka-server:8000/eureka/
    - spring.datasource.url=jdbc:mysql://mysql/iam_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
    - spring.datasource.username=root
    - spring.datasource.password=root
    - hystrix.stream.queue.enabled=false
    - spring.cloud.bus.enabled=false
    - spring.sleuth.stream.enabled=false
    - logging.level=WARN
  iam-service:
    container_name: iam-service
    image: registry.cn-shanghai.aliyuncs.com/choerodon/iam-service:0.6.0
    depends_on:
    - eureka-server
    - mysql
    - kafka-0
    links: 
    - eureka-server
    - mysql
    - kafka-0
    ports:
    - "8030:8030"
    environment:
    - eureka.client.serviceUrl.defaultZone=http://eureka-server:8000/eureka/
    - spring.kafka.bootstrap-servers=kafka-0:9092
    - spring.datasource.url=jdbc:mysql://mysql/iam_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
    - spring.datasource.username=root
    - spring.datasource.password=root
    - hystrix.stream.queue.enabled=false
    - spring.cloud.bus.enabled=false
    - spring.sleuth.stream.enabled=false
    - logging.level=WARN
  manager-service:
    container_name: manager-service
    image: registry.cn-shanghai.aliyuncs.com/choerodon/manager-service:0.6.0
    depends_on:
    - eureka-server
    - mysql
    - kafka-0
    links: 
    - eureka-server
    - mysql
    - kafka-0
    ports:
    - "8963:8963"
    environment:
    - spring.kafka.bootstrap-servers=kafka-0:9092
    - eureka.client.serviceUrl.defaultZone=http://eureka-server:8000/eureka/
    - spring.datasource.url=jdbc:mysql://mysql/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
    - spring.datasource.username=root
    - spring.datasource.password=root
    - hystrix.stream.queue.enabled=false
    - spring.cloud.bus.enabled=false
    - spring.sleuth.stream.enabled=false
    - logging.level=WARN
  oauth-server:
    container_name: oauth-server
    image: registry.cn-shanghai.aliyuncs.com/choerodon/oauth-server:0.6.0
    depends_on:
    - eureka-server
    - mysql
    links: 
    - eureka-server
    - mysql
    ports:
    - "8020:8020"
    environment:
    - eureka.client.serviceUrl.defaultZone=http://eureka-server:8000/eureka/
    - spring.datasource.username=root
    - spring.datasource.url=jdbc:mysql://mysql/iam_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
    - spring.datasource.password=root
    - hystrix.stream.queue.enabled=false
    - spring.cloud.bus.enabled=false
    - spring.sleuth.stream.enabled=false
    - logging.level=WARN
  manager-service:
    container_name: manager-service
    image: registry.cn-shanghai.aliyuncs.com/choerodon/manager-service:0.6.0
    depends_on:
    - eureka-server
    - mysql
    links: 
    - eureka-server
    - mysql
    environment:
    - eureka.client.serviceUrl.defaultZone=http://eureka-server:8000/eureka/
    - spring.datasource.username=root
    - spring.datasource.url=jdbc:mysql://mysql/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
    - spring.datasource.password=root
    - hystrix.stream.queue.enabled=false
    - spring.cloud.bus.enabled=false
    - spring.sleuth.stream.enabled=false
    - choerodon.swagger.oauth.url=http://oauth-server8020/oauth/oauth/authorize
    - choerodon.gateway.domain=http://api-gateway:8080
    - logging.level=WARN
    ports:
    - "8963:8963"
```

停止容器通过命令`docker-compose down`。

> 有关Docker的更多信息请见[此处](https://docs.docker.com/)

> 有关Docker-Compose的更多信息请见[此处](https://docs.docker.com/compose/overview/)

## 启动todo服务

进入`choerodon-todo-service`目录下，运行以下命令启动本地项目

```bash
mvn clean spring-boot:run
```