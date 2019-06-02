+++
title = "新建项目"
date = "2018-04-26T13:44:28+08:00"
draft = false
weight = 2
+++

## 介绍

项目是基于 `Spring boot` 的 `maven` 项目。

1. 新建maven项目
2. 添加项目依赖
3. 添加默认配置文件

## 创建maven项目

本地新建一个空的 `maven` 项目`choerodon-todo-service`。
``` bash
$ mkdir -p choerodon-todo-service
$ cd choerodon-todo-service
```

## 添加项目依赖

创建`pom.xml` 文件。
``` bash
$ touch pom.xml
```

修改`pom.xml`。
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://maven.apache.org/POM/4.0.0"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <groupId>io.choerodon</groupId>
    <artifactId>choerodon-todo-service</artifactId>
    <version>1.0.0</version>
    <!--choerodon-framework-parent dependency-->
    <parent>
        <groupId>io.choerodon</groupId>
        <artifactId>choerodon-framework-parent</artifactId>
        <version>0.11.0.RELEASE</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <!--choerodon-starters dependency-->
    <properties>
        <choerodon.starters.version>0.11.0.RELEASE</choerodon.starters.version>
        <choerodon.serviceBuild>true</choerodon.serviceBuild>
        <choerodon.mainClass>io.choerodon.todo.TodoServiceApplication</choerodon.mainClass>
    </properties>
    <dependencies>
        <!--spring boot-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-undertow</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <exclusions>
                <exclusion>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-tomcat</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <!-- 允许注册到注册中心时，添加此依赖 -->
        <!--        &lt;!&ndash;spring cloud&ndash;&gt;-->
        <!--        <dependency>-->
        <!--            <groupId>org.springframework.cloud</groupId>-->
        <!--            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>-->
        <!--        </dependency>-->

        <!--choerodon-->
        <dependency>
            <groupId>io.choerodon</groupId>
            <artifactId>choerodon-starter-core</artifactId>
            <version>${choerodon.starters.version}</version>
        </dependency>
        <dependency>
            <groupId>io.choerodon</groupId>
            <artifactId>choerodon-starter-oauth-resource</artifactId>
            <version>${choerodon.starters.version}</version>
        </dependency>
        <dependency>
            <groupId>io.choerodon</groupId>
            <artifactId>choerodon-starter-swagger</artifactId>
            <version>${choerodon.starters.version}</version>
        </dependency>
        <!-- 配置文件中添加数据库配置后，添加以下依赖 -->
        <!--        <dependency>-->
        <!--            <groupId>io.choerodon</groupId>-->
        <!--            <artifactId>choerodon-starter-mybatis</artifactId>-->
        <!--            <version>${choerodon.starters.version}</version>-->
        <!--        </dependency>-->
        
        <!--other dependencies-->
        
        <!--        <dependency>-->
        <!--            <groupId>mysql</groupId>-->
        <!--            <artifactId>mysql-connector-java</artifactId>-->
        <!--        </dependency>-->
        
        <!-- 添加cpu监控 -->
        <dependency>
            <groupId>io.choerodon</groupId>
            <artifactId>choerodon-starter-metric</artifactId>
            <version>${choerodon.starters.version}</version>
        </dependency>

        


        <!-- Test Dependencies -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>io.choerodon</groupId>
            <artifactId>choerodon-liquibase</artifactId>
            <version>${choerodon.starters.version}</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <version>1.4.197</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.spockframework</groupId>
            <artifactId>spock-core</artifactId>
            <version>1.1-groovy-2.4-rc-2</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.spockframework</groupId>
            <artifactId>spock-spring</artifactId>
            <version>1.1-groovy-2.4-rc-3</version>
            <scope>test</scope>
        </dependency>


    </dependencies>

    <build>
        <finalName>choerodon-todo-service</finalName>
    </build>

</project>
```

根据子级模块所需jar包添加需要的依赖。

* (必须)choerodon-starter-core，核心工具包。提供了一些基础类用于开发过程中使用。以及主要帮助获取自定义的 `userDetail` 和一些通用的方法。
* (必须)choerodon-starter-oauth-resource，oauth资源服务工具包，主要提供了服务`controller` 的异常统一捕获，并转换成用户语言对应的描述信息，以及配置了服务在接受请求时对jwt token的验证规则。

更多`choerodon-starter`的依赖可以参考[choerodon-starters](https://github.com/choerodon/choerodon-starters)。

## 添加默认配置文件

在根目录下创建源码文件夹和资源文件夹。

``` bash
$ mkdir -p src/main/java
$ mkdir -p src/main/resources
```

项目采用spring boot 进行管理。需要在子项目中配置默认的配置项。

在`resource`文件夹中创建 `application.yml`, `bootstrap.yml`。
``` bash
$ cd src/main/resources
$ touch application.yml
$ touch bootstrap.yml
```

- `bootstrap.yml`: 存放不会通过环境变量替换和必须在bootstrap中指定的变量。包括项目端口，应用名，`config-server`地址等。
- `application.yml`: 存放项目的基础配置，包含默认的线上数据库连接配置，`kafka`配置，注册中心地址等，这些变量可以通过`profile`或者环境变量修改。
- `application-default.yml`: 本地开发配置文件，需要将该文件添加到`.gitignore`。包含本地一些差异化的配置，如数据库连接配置，注册中心地址等。

``` yml
# bootstrap.yml
server:
  port: 28080
spring:
  application:
    name: choerodon-todo-service
  cloud:
    config:
      failFast: true
      retry:
        maxAttempts: 6
        multiplier: 1.5
        maxInterval: 2000
      uri: localhost:8010
      enabled: false
management:
  server:
    port: 28081
  endpoints:
    web:
      exposure:
        include: '*'
```

``` yml
# application.yml
eureka:
  instance:
    preferIpAddress: true
    leaseRenewalIntervalInSeconds: 10
    leaseExpirationDurationInSeconds: 30
    metadata-map:
      VERSION: v1
  client:
    serviceUrl:
      defaultZone: ${EUREKA_DEFAULT_ZONE:http://localhost:8000/eureka/}
    registryFetchIntervalSeconds: 10
mybatis:
  mapperLocations: classpath*:/mapper/*.xml
  configuration: # 数据库下划线转驼峰配置
    mapUnderscoreToCamelCase: true
```

## 编写TodoServiceApplication类

在`src/main/java`中创建TodoServiceApplication。
``` bash
$ mkdir -p src/main/java/io/choerodon/todo
$ touch src/main/java/io/choerodon/todo/TodoServiceApplication.java
```

添加`main` 函数。
``` java
package io.choerodon.todo;

import io.choerodon.base.annotation.Permission;
import io.choerodon.resource.annoation.EnableChoerodonResourceServer;
import io.swagger.annotations.ApiOperation;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
// 是否允许注册到注册中心，暂时注释掉
//@EnableEurekaClient
// 是否开启猪齿鱼资源服务器
@EnableChoerodonResourceServer
@RestController
public class TodoServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(TodoServiceApplication.class, args);
    }

    @GetMapping
    @Permission(permissionPublic = true)
    @ApiOperation(value = "demo")
    public ResponseEntity<String> hello() {
        return new ResponseEntity<String>("hello world.", HttpStatus.OK);
    }
}
```

## 启动应用

项目根目录下执行命令。
``` bash
$ mvn clean spring-boot:run
```


控制台打印出如下信息，则表示启动成功。
```bash
Started TodoServiceApplication in 8.3 seconds (JVM running for 13.342)
```

此时可以打开浏览器，在浏览器输入：```http://localhost:28081/actuator/health```

返回如下信息：

``` json
{"status":"UP"}
```

在浏览器输入：```http://localhost:28080/hello```，页面打印 `hello world.`。

这样，一个简单的`Spring boot` 应用就已经搭建成功。