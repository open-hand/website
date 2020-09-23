+++
title = "liquibase初始化工具"
weight = 4
description = "讲述了如何使用liquibase工具初始化数据"
+++

## 前置条件

此文档介绍[choerodon-tool-liquibase](https://github.com/open-hand/choerodon-starters.git)`0.17.0.RELEASE`及以上版本使用详情。

## 介绍

初始化数据库工具，使用指定文件夹的groovy文件创建数据库表，使用execl文件(只能是`.xlsx`格式文件)初始化数据。
此工具是对[hzero-installer](https://open.hand-china.com/document-center/doc/component/1356/11884?doc_id=6876#%E5%9C%A8%E7%BA%BF%E8%BF%90%E7%BB%B4%E5%AE%89%E8%A3%85)初始化工具的二开。


## 使用

### 初始化文件目录
- 初始化文件应放于资源目录`script/db`目录下
- groovy文件存放需要初始化的groovy脚本
- init-data文件存放需要初始化的excel文件
- `service-mapping.xml`初始化配置
````
<?xml version="1.0" encoding="UTF-8"?>
<!--服务映射-->
<services>
    <schema-merge>
        <!-- oracle merge是否默认安装到一个库下，若要分多个库，需设置 merge=false -->
        <oracle merge="false" target-schema="" />
        <mysql merge="false" target-schema="" />
        <sqlserver merge="false" target-schema="" />
        <postgresql merge="false" target-schema="" />
    </schema-merge>
     <!-- name和filename: 对应本地文件名，默认与安装目标库名一致;  schema: 安装目标库名 env:使用对应的数据源，非必填，多数据源初始化时需要用到 -->
    <service name="hzero_platform" filename="hzero_platform" schema="hzero_platform" env="platform" description="平台服务"/>
    <service name="devops_service" filename="devops_service" schema="devops_service" description="devops服务"/>
</services>
````
- 目录层级如下：
    ![](/docs/development-guide/backend/framework/image/liquibase_1.png)

### choerodon-tool-liquibase.jar包初始化脚本
````
#!/usr/bin/env bash
MAVEN_LOCAL_REPO=$(cd / && mvn help:evaluate -Dexpression=settings.localRepository -q -DforceStdout)
TOOL_GROUP_ID=io.choerodon
TOOL_ARTIFACT_ID=choerodon-tool-liquibase
TOOL_VERSION=0.17.1.RELEASE
TOOL_JAR_PATH=${MAVEN_LOCAL_REPO}/${TOOL_GROUP_ID/\./\/}/${TOOL_ARTIFACT_ID}/${TOOL_VERSION}/${TOOL_ARTIFACT_ID}-${TOOL_VERSION}.jar
mvn org.apache.maven.plugins:maven-dependency-plugin:get \
 -Dartifact=${TOOL_GROUP_ID}:${TOOL_ARTIFACT_ID}:${TOOL_VERSION} \
 -Dtransitive=false

java -Dspring.datasource.url="jdbc:mysql://localhost:3306/?serverTimezone=CTT&useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true" \
 -Dspring.datasource.username=root \
 -Dspring.datasource.password=123456 \
 -Dspring.datasource.driver-class-name=com.mysql.jdbc.Driver \
 -Ddata.init=true \
 -Dlogging.level.root=info \
 -Dinstaller.jarPath=target/app.jar \
 -Dinstaller.jarPath.init=true \
 -jar ${TOOL_JAR_PATH}
 
````

- `-Dspring.datasource.url`： 数据源url **不需要指定数据库名会根据配置的数据库名初始化到对应的数据库**
- `-Dspring.datasource.username`：数据库登陆用户
- `-Dspring.datasource.driver-class-name`：数据库驱动，默认oracle
- `-Ddata.init`：是否使用excel数据进行数据初始化
- `-Dlogging.level.root`：日志级别
- `-Dinstaller.jarPath`：groovy和excel所在的jar包，扫描`.groovy`和`.xlsx`文件 
- `-Dinstaller.jarPath.init`：是否递归扫描jar包中依赖的jar包中的`.groovy`和`.xlsx`文件 

### 多数据源初始化
- 更改service-mapping.xml文件，对于需要多数据源初始化的服务，添加初始化数据源
    ![](/docs/development-guide/backend/framework/image/liquibase_2.png)

- 执行liquibse工具的时候，添加数据源
```
# env=platform的数据源
-Dinstaller.datasources.platform.url="jdbc:mysql://localhost:3306/?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true" \
-Dinstaller.datasources.platform.username=root \
-Dinstaller.datasources.platform.password=root \
-Dinstaller.datasources.platform.driver-class-name=com.mysql.jdbc.Driver \

# 默认数据源 必须配置
-Dspring.datasource.url="jdbc:mysql://localhost:3307/?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true" \
-Dspring.datasource.driver-class-name=com.mysql.jdbc.Driver \
-Dspring.datasource.username=root \
-Dspring.datasource.password=root \
-Dlogging.level.root=info \
-Dinstaller.mapping=mapping/service-mapping.xml \
-Dinstaller.jarPath=target/app.jar \
-jar ${TOOL_JAR_PATH}

```

### 镜像初始化配置
````
 ## 初始化配置至配置服务及初始化本服务数据库
preJob:
  # job 超时时间
  timeout: 1200
  # 工具 jar 包镜像库地址
  image: registry.cn-shanghai.aliyuncs.com/c7n/dbtool:0.7.2
  # 初始化数据库定义
  preInitDB:
    # 是否初始化本服务数据库
    enabled: true
    datasource:
      # 本服务数据库相关信息
      url: jdbc:mysql://localhost:3306/?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
      username: username
      password: password
      driver: com.mysql.jdbc.Driver
    datasources:
      # 多数据源初始化
      platform:
         url: jdbc:mysql://localhost:3307/?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
         username: username
         password: password
         driver: com.mysql.jdbc.Driver
````

### 注意事项
####  排除更新的excel中表和列
在service-mapping.xml中添加
```
  <!--  排除更新的表和列(不带列标识忽略整个表)以逗号分隔  -->
    <exclusion>
        hpfm_tenant.tenant_id
    </exclusion>
```

#### 初始化依赖jar中的数据
`installer.jarPath.init=true`
所有依赖jar包中的groovy和excel文件不能重名，根据jar包解析顺序，后面解析的文件会直接覆盖直接的文件，最后一个被读取的文件生效。

## 更多配置参考hzero-installer
[hzero-installer](https://open.hand-china.com/document-center/doc/component/1356/11884?doc_id=6876#%E5%9C%A8%E7%BA%BF%E8%BF%90%E7%BB%B4%E5%AE%89%E8%A3%85)

