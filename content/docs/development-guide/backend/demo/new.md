+++
title = "新建项目"
date = "2017-02-01"
draft = false
weight = 2
+++

# 新建项目

## 新建maven项目

![](../images/createMvnPro_01.png)

![](../images/createMvnPro_02.png)

![](../images/createMvnPro_03.png)

## 创建子模块

![](../images/createMvnSubPro_01.png)

![](../images/createMvnSubPro_02.png)

![](../images/createMvnSubPro_03.png)

## 添加pom依赖

### 父级pom

这里添加一些公用的pom属性，类似私有仓库等等。

```xml
<!--加parent-->
<parent>
<groupId>com.hand.hap.cloud</groupId>
<artifactId>hap-cloud-parent</artifactId>
<version>1.0.0-Release</version>
</parent>
<!--添加公司私有仓库-->
<repositories>
<repository>
    <id>hand-snapshot-repository</id>
    <name>Hand Snapshot Repository</name>
    <url>http://nexus.saas.hand-china.com/content/repositories/rdcsnapshot/</url>
    <snapshots>
        <enabled>true</enabled>
    </snapshots>
</repository>
<repository>
    <id>hand-release-repository</id>
    <name>Hand Release Repository</name>
    <url>http://nexus.saas.hand-china.com/content/repositories/rdc/</url>
</repository>
</repositories>
<!--添加dependencyManagement-->
<dependencyManagement>
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-dependencies</artifactId>
        <version>Dalston.RELEASE</version>
        <type>pom</type>
        <scope>import</scope>
    </dependency>
</dependencies>
</dependencyManagement>
<build>
<plugins>
    <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
    </plugin>
</plugins>
</build>
```

### 子级pom

根据子级模块所需jar包添加需要的依赖。以下介绍一些hap-cloud特有的依赖：

- hap-feign-replay-starter，为feign提供token转发功能，如果本服务需要使用feign调用其他服务需加
- hap-mybatis-mapper-starter，mybatis的工具包，增删改查和分页和多语言功能。
- hap-resource-server-starter，resource-server工具包，resource-server必加，我们这个就是resource-server。
- hap-swagger-starter，swgger工具包，对菜单和权限注解的解析

```xml
<dependencies>
    <dependency>
        <groupId>com.hand.hap.cloud</groupId>
        <artifactId>hap-resource-server-starter</artifactId>
        <version>1.0.0-Release</version>
    </dependency>
    <dependency>
        <groupId>com.hand.hap.cloud</groupId>
        <artifactId>hap-swagger-starter</artifactId>
        <version>1.0.0-Release</version>
    </dependency>
    <dependency>
        <groupId>com.hand.hap.cloud</groupId>
        <artifactId>hap-mybatis-mapper-starter</artifactId>
        <version>1.0.0-Release</version>
    </dependency>
    <dependency>
        <groupId>com.hand.hap.cloud</groupId>
        <artifactId>hap-feign-replay-starter</artifactId>
        <version>1.0.0-Release</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-eureka</artifactId>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>
    <!-- config server -->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-config-client</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-aop</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.retry</groupId>
        <artifactId>spring-retry</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-bus-amqp</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-sleuth</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-sleuth-stream</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-stream-binder-rabbit</artifactId>
    </dependency>
    <!-- test -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

## 项目结构

![](../images/projectStructure.png)

## 在子模块resource文件夹中配置

- 项目基础配置，类如数据库、端口号等等
- 项目与hap-cloud-parent进行集成，关联注册服务器、验证服务器、以及gateway、swagger服务器
- bootstrap.yml ,一定会执行的配置文件，声明项目的一些基本配置.spring.profiles会指定application.yml生效的版本，这里是default。

```
server:
  port: 8378
mybatis:
  mapperLocations: classpath*:/mapper/*.xml
  configuration:
    mapUnderscoreToCamelCase: true
spring:
  application:
    name: hap-todo-service
eureka:
  instance:
    preferIpAddress: true
    leaseRenewalIntervalInSeconds: 1
    leaseExpirationDurationInSeconds: 3
  client:
    serviceUrl:
      defaultZone: ${EUREKA_DEFAULT_ZONE:http://localhost:8000/eureka/}
---
spring:
  profiles: default
  cloud:
    config:
      enabled: false
---
spring:
  profiles: docker,sit
  cloud:
    config:
      discovery:
        serviceId: hap-config-server
        enabled: true
    failFast: true
    retry:
      maxAttempts: 32
      multiplier: 1.5
      maxInterval: 10000
```

- application-default.yml

```
spring:
    datasource:
        url: jdbc:mysql://localhost/hap_demo_service_todo?useUnicode=true&characterEncoding=utf-8&useSSL=false
        username: hapdemo
        password: handhand
    eureka:
      client:
        serviceUrl:
          defaultZone: http://localhost:8000/eureka
swagger:
    oauthUrl: http://localhost:8080/oauth/oauth/authorize
```

## 结构图

![](../images/bootstrap.png)