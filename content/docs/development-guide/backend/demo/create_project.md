+++
title = "新建项目"
date = "2018-04-26T13:44:28+08:00"
draft = false
weight = 2
+++

# 新建项目

项目是基于spring boot的maven项目。

1. 新建meven项目
2. 添加项目依赖
3. 添加默认配置文件

## 创建maven项目

* 本地新建一个空的maven 项目```choerodon-todo-service-parent```
* 进入项目中，创建子模块```choerodon-todo-service```

## 添加项目依赖

* 在父项目中添加一些公用的pom属性。修改父项目的pom文件。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>choerodon-todo-service-parent</groupId>
    <artifactId>choerodon-todo-service-parent</artifactId>
    <packaging>pom</packaging>
    <version>0.1.0</version>
    <modules>
        <module>choerodon-todo-service</module>
    </modules>

    <properties>
        <choerodon.version>0.1.0</choerodon.version>
    </properties>
    <!--parent-->
    <parent>
        <groupId>io.choerodon</groupId>
        <artifactId>choerodon-framework-parent</artifactId>
        <version>0.1.0</version>
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

</project>
```

* 在子项目中添加一些子项目的依赖。修改子项目的pom文件。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>choerodon-todo-service-parent</artifactId>
        <groupId>choerodon-todo-service-parent</groupId>
        <version>0.1.0</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>choerodon-todo-service</artifactId>

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

        <!--spring cloud-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-eureka</artifactId>
        </dependency>

        <!--choerodon-->
        <dependency>
            <groupId>io.choerodon</groupId>
            <artifactId>choerodon-starter-core</artifactId>
            <version>${choerodon.version}</version>
        </dependency>
        <dependency>
            <groupId>io.choerodon</groupId>
            <artifactId>choerodon-starter-oauth-resource</artifactId>
            <version>${choerodon.version}</version>
        </dependency>
        <dependency>
            <groupId>io.choerodon</groupId>
            <artifactId>choerodon-starter-mybatis-mapper</artifactId>
            <version>${choerodon.version}</version>
        </dependency>
        <dependency>
            <groupId>io.choerodon</groupId>
            <artifactId>choerodon-starter-swagger</artifactId>
            <version>${choerodon.version}</version>
        </dependency>

        <!--other dependencies-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>

        <!-- test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <finalName>app</finalName>
    </build>
</project>
```

根据子级模块所需jar包添加需要的依赖。

* (必须)choerodon-starter-core，核心工具包。提供了一些基础类用于开发过程中使用。以及主要帮助获取自定义的userDetail和一些通用的方法。
* (必须)choerodon-starter-oauth-resource，oauth资源服务工具包，主要提供了服务controller的异常统一捕获，并转换成用户语言对应的描述信息，以及配置了服务在接受请求时对jwt token的验证规则。
* choerodon-starter-mybatis-mapper，通用mapper和分页插件集成，扩展多语言、审计字段等功能。

## 添加默认配置文件

项目采用spring boot 进行管理。需要在子项目中配置默认的配置项。

在子模块resource文件夹中创建 bootstrap.yaml

包含如下内容：

* 项目基础配置，类如数据库、端口号等等
* 项目与choerodon进行集成，关联注册服务器、验证服务器、以及gateway
* bootstrap.yml ,一定会执行的配置文件，声明项目的一些基本配置。


``` yaml
spring:
  application:
    name: choerodon-todo-service
server:
  port: 8080
mybatis:
  mapperLocations: classpath*:/mapper/*.xml
  configuration:
    mapUnderscoreToCamelCase: true
management:
  port: 8081
  security:
    enabled: false
feign:
  hystrix:
    enabled: true
security:
  basic:
    enabled: false
  ignored: /v2/api-docs
```
