+++
title = "运行与测试"
date = "2018-04-25T11:00:28+08:00"
draft = false
weight = 3
+++

## 前置条件

* 开发环境配置：[开发环境安装](../../develop-env/)
* 数据环境准备：[数据初始化](../init/)
* Demo程序已经开发完毕，详见 [开发Demo程序](../../demo/)
* 启动 `mysql`，`redis`等容器

## 介绍

本小节介绍如何在本地通过 `Choerodon` 来进行微服务开发。

## 启动`todo` 服务

进入`choerodon-todo-service`目录下，运行以下命令启动本地项目

```bash
mvn clean spring-boot:run
```

> * 本地开发服务，如果不调用其他服务，则可以不需要启动注册中心，在`TodoServiceApplication`中不需要添加`@EnableEurekaClient` 注解。
> * 如果不需要测试到kafka相关的，可以将kafka的相关的依赖注释掉。提交时再打开。

## 服务注册

在`TodoServiceApplication`中添加`@EnableEurekaClient` 注解。

在`application.yml`中添加关于Eureka的配置

```yml
eureka:
  instance:
    preferIpAddress: true
    leaseRenewalIntervalInSeconds: 1
    leaseExpirationDurationInSeconds: 3
  client:
    serviceUrl:
      defaultZone: http://localhost:8000/eureka/
```

如果需要自动将该服务在线上添加到路由列表中，需在`xxx.infra.util`包下创建拓展数据配置类，并继承`ExtraDataManager`，以用于自动初始化路由。示例如下：
```java
@ChoerodonExtraData
public class CustomExtraDataManager implements ExtraDataManager {
    @Override
    public ExtraData getData() {
        ChoerodonRouteData choerodonRouteData = new ChoerodonRouteData();
        choerodonRouteData.setName("todo");
        choerodonRouteData.setPath("/todo/**");
        choerodonRouteData.setServiceId("choerodon-todo-service");
        extraData.put(ExtraData.ZUUL_ROUTE_DATA, choerodonRouteData);
        return extraData;
    }
}
```

或者以管理员权限登录平台，在`管理` -> `微服务管理` -> `路由管理` 中添加对应服务的路由信息。

## 接口权限

Choerodon 的接口权限遵循`RBAC`。需要在接口上添加`@Permission()`注解。

包含如下参数。

参数名 | 说明
|---|---|
level | 接口层级，ResourceLevel.SITE，ResourceLevel.ORGANIZATION，ResourceLevel.PROJECT三种
permissionLogin | 登录允许访问，默认为false
permissionPublic | 公开接口，默认为false

其中如果层级为组织层或项目层，则接口的`mapping` 中必须包含`organization_id` 或 `project_id` 作为变量。否则`gateway-helper`校验时不会识别该权限。

## 本地测试

由于Choerodon 包含的服务比较多和依赖的组件较多。一般不会在本地将所有的服务都启动，只会根据自己的需要启动对应的服务。建议在服务器运行一整套环境，本地做服务的单体测试，服务器上进行集成测试。

**1.** 如果不需要获取当前登录的用户信息，在`TodoServiceApplication`中不需要添加`@EnableChoerodonResourceServer` 注解。然后直接通过`postman` 或其他接口测试工具对服务提供的接口进行测试。

**2.** 如果需要获取当前登录的用户信息，则需要在本地启动如下服务，进行登录。

* register-server
* api-gateway
* gateway-helper
* oauth-server

**3.** 然后通过`api-gateway` 的输出日志，获取登录用户的 `jwt_token`。然后添加请求头。

``` json
{
  "Jwt_Token": jwt_token
}
```

## 启动相关服务

如果需要启动其他模块，可以在[github](https://github.com/choerodon/)上获取到对应服务的最新代码，克隆到本地，将`./src/main/resources/application.yml` 复制一份出来，修改里面的默认值。根据本地环境信息，修改数据库和kafka连接。

``` bash
$ cp ./src/main/resources/application.yml ./src/main/resources/application-default.yml
$ mvn clean spring-boot:run
```

这里提供一份`docker-compose.yaml`仅供参考，具体根据配置修改本地程序的配置。服务启动之前，请确保`iam-service` 和 `manager-service` 的数据库已初始化完成。

``` yaml
version: "3"
services:
  mysql:
    container_name: mysql
    hostname: mysql
    image: registry.cn-hangzhou.aliyuncs.com/choerodon-tools/mysql:5.7.17
    ports:
    - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: root
    volumes:
    - ./mysql/mysql_data:/var/lib/mysql
    - ./mysql/mysql_db.cnf:/etc/mysql/conf.d/mysql_db.cnf
    - ./mysql/init_user.sql:/docker-entrypoint-initdb.d/init_user.sql
    expose:
    - "3306"
    networks:
    - "c7nNetwork"
  redis:
    container_name: redis
    hostname: redis
    image: redis:4.0.11
    ports:
    - "6379:6379"
    expose:
    - "6379"
    networks:
    - "c7nNetwork"
  eureka-server:
    container_name: eureka-server
    hostname: eureka-server
    image: registry.choerodon.com.cn/choerodon-framework/eureka-server:0.9.0
    ports:
    - "8000:8000"
    environment:
    - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server:8000/eureka/
    - EUREKA_CLIENT_REGISTER_WITH_EUREKA=false
    - EUREKA_CLIENT_FETCH_REGISTRY=false
    - LOGGING_LEVEL=WARN
    - JAVA_OPTS=-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap -Xms256M -Xmx512M
    expose:
    - "8000"
    networks:
    - "c7nNetwork"
  api-gateway:
    container_name: api-gateway
    hostname: api-gateway
    image: registry.cn-shanghai.aliyuncs.com/choerodon/api-gateway:0.11.0
    links: 
    - eureka-server
    depends_on:
    - eureka-server
    ports:
    - "8080:8080"
    environment:
    - SPRING_CLOUD_CONFIG_ENABLED=false
    - HYSTRIX_STREAM_QUEUE_ENABLED=false
    - SPRING_CLOUD_BUS_ENABLED=false
    - SPRING_SLEUTH_STREAM_ENABLED=false
    - LOGGING_LEVEL=WARN
    - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server:8000/eureka/
    - ZUUL_ADDHOSTHEADER=true
    - SPRING_APPLICATION_JSON='{"zuul":{"routes":{"dev":{"path":"/todo/**", "serviceId":"choerodon-todo-service"}}}}'
    - JAVA_OPTS=-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap -Xms512M -Xmx768M
    expose:
    - "8080"
    networks:
    - "c7nNetwork"
  gateway-helper:
    container_name: gateway-helper
    image: registry.cn-shanghai.aliyuncs.com/choerodon/gateway-helper:0.11.0
    depends_on:
    - eureka-server
    - redis
    - mysql
    - redis
    links: 
    - eureka-server
    - redis
    - mysql
    - redis
    ports:
    - "9180:9180"
    environment:
    - SPRING_CLOUD_CONFIG_ENABLED=false
    - HYSTRIX_STREAM_QUEUE_ENABLED=false
    - SPRING_CLOUD_BUS_ENABLED=false
    - SPRING_SLEUTH_STREAM_ENABLED=false
    - LOGGING_LEVEL=WARN
    - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server:8000/eureka/
    - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/iam_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
    - SPRING_DATASOURCE_USERNAME=choerodon
    - SPRING_DATASOURCE_PASSWORD=123456
    - SPRINT_CACHE_NULTI_L1_ENABLED=false
    - SPRINT_CACHE_NULTI_L2_ENABLED=false
    - SPRINT_REDIS_HOST=redis
    - SPRING_REDIS_PORT=6379
    - SPRING_REDIS_DATABASE=4
    - SPRING_APPLICATION_JSON='{"zuul":{"routes":{"dev":{"path":"/todo/**", "serviceId":"choerodon-todo-service"}}}}'
    - JAVA_OPTS=-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap -Xms512M -Xmx768M
    networks:
    - "c7nNetwork"
  iam-service:
    container_name: iam-service
    image: registry.cn-shanghai.aliyuncs.com/choerodon/iam-service:0.11.0
    depends_on:
    - eureka-server
    - mysql
    links: 
    - eureka-server
    - mysql
    ports:
    - "8030:8030"
    environment:
    - SPRING_CLOUD_CONFIG_ENABLED=false
    - HYSTRIX_STREAM_QUEUE_ENABLED=false
    - SPRING_CLOUD_BUS_ENABLED=false
    - SPRING_SLEUTH_STREAM_ENABLED=false
    - LOGGING_LEVEL=WARN
    - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server:8000/eureka/
    - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/iam_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
    - SPRING_DATASOURCE_USERNAME=choerodon
    - SPRING_DATASOURCE_PASSWORD=123456
    - CHOERODON_SAGA_CONSUMER_ENABLED=false
    - CHOERODON_SCHEDULE_CONSUMER_ENABLED=false
    - JAVA_OPTS=-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap -Xms512M -Xmx768M
    networks:
    - "c7nNetwork"
  manager-service:
    container_name: manager-service
    image: registry.cn-shanghai.aliyuncs.com/choerodon/manager-service:0.11.0
    depends_on:
    - eureka-server
    - mysql
    links: 
    - eureka-server
    - mysql
    ports:
    - "8963:8963"
    environment:
    - SPRING_CLOUD_CONFIG_ENABLED=false
    - HYSTRIX_STREAM_QUEUE_ENABLED=false
    - SPRING_CLOUD_BUS_ENABLED=false
    - SPRING_SLEUTH_STREAM_ENABLED=false
    - LOGGING_LEVEL=WARN
    - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server:8000/eureka/
    - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/manager_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
    - SPRING_DATASOURCE_USERNAME=choerodon
    - SPRING_DATASOURCE_PASSWORD=123456
    - CHOERODON_SWAGGER_CLIENT=client
    - CHOERODON_SWAGGER_OAUTH_URL=http://api-gateway:8080/oauth/oauth/authorize
    - CHOERODON_GATEWAY_DOMAIN=api-gateway:8080
    - JAVA_OPTS=-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap -Xms512M -Xmx768M
    networks:
    - "c7nNetwork"
  oauth-server:
    container_name: oauth-server
    image: registry.cn-shanghai.aliyuncs.com/choerodon/oauth-server:0.11.0
    depends_on:
    - eureka-server
    - redis
    - mysql
    - redis
    links: 
    - eureka-server
    - redis
    - mysql
    - redis
    ports:
    - "8020:8020"
    environment:
    - SPRING_CLOUD_CONFIG_ENABLED=false
    - HYSTRIX_STREAM_QUEUE_ENABLED=false
    - SPRING_CLOUD_BUS_ENABLED=false
    - SPRING_SLEUTH_STREAM_ENABLED=false
    - LOGGING_LEVEL=WARN
    - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server:8000/eureka/
    - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/iam_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
    - SPRING_DATASOURCE_USERNAME=choerodon
    - SPRING_DATASOURCE_PASSWORD=123456
    - SPRINT_REDIS_HOST=redis
    - SPRING_REDIS_PORT=6379
    - SPRING_REDIS_DATABASE=4
    - CHOERODON_OAUTH_LOGIN_SSL=false
    - CHOERODON_OAUTH_LOGIN_PATH=/login
    - CHOERODON_DEFAULT_REDIRECT_URL=http://localhost:9000
    - JAVA_OPTS=-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap -Xms512M -Xmx768M
    networks:
    - "c7nNetwork"
networks:
  c7nNetwork:
    driver: bridge
```

> 有关Docker的更多信息请见[此处](https://docs.docker.com/)

> 有关Docker-Compose的更多信息请见[此处](https://docs.docker.com/compose/overview/)