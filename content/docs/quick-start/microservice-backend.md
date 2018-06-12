+++
title = "创建一个后端应用"
description = ""
weight = 4
type = "docs"
+++

# 创建一个后端应用
---

## 概述
后端应用(Backend Application)的架构模式是将传统的单体应用拆分成多个小型应用，每个小型应用可以独立的编译和部署，应用之间的调用通过HTTP的restfull API方式进行通讯。它们彼此之间相互协作，作为一个整体对外开放。Choerodon 的应用后端采用SpringBoot、SpringCloud 作为应用的开发框架，利用丰富的文档、社区活跃和一套完整的应用框架解决方案提供技术支持。

## 目标

本章节将从创建后端应用、开发后端应用、生成版本、部署应用、.查看实例部署详情、配置网络等方面介绍，让读者能够熟悉使用Choerodon创建应用后端应用的步骤和流程，并且学会如何利用Choerodon部署应用等。

## 前置条件

**1.** 在操作之前保证[系统配置](../../user-guide/system-configuration)已经配置完全。特别在本章节用到的角色、环境管理等配置。

**2.** 完成[创建项目](../project)操作。本章节使用在前面章节创建的项目`猪齿鱼研发`。

**3.** <font>完成[创建环境](../../user-guide/deployment-pipeline/environment-pipeline)，环境流水线中有连接状态正常的环境。

**4.** 在Choerodon平台下，项目启动依赖于基础服务：

 - api-gateway(网关服务)
 - gateway-helper(授权校验、权限校验、请求限流)
 - manager-service(管理服务，配置管理、路由管理、swagger管理)
 - oauth-server(认证服务，用户的认证与授权)
 - register-server(注册服务，服务发现)
 - iam-service(用户服务，组织、项目、用户信息管理等)
 - 如果是本地开发，需要在api-gateway服务的application-default.yml配置文件配置路由信息

		zuul:
		  addHostHeader: true
		  routes:
			test:
			  path: /test/**
			  serviceId: test-service
			
      [具体服务启动配置参考][1]

<h2 id="1">创建后端应用</h2>

 **1.** 使用项目所有者或者源代码管理员的角色登录Choerodon系统，选择项目``猪齿鱼研发``。
 
 **2.** 选择`持续交付`模块，点击`开发流水线`，点击`应用`，进入应用管理页面。
 
 **3.** 点击``创建应用``，系统会从右边滑出页面，在页面中输入应用编码、应用名称，并且选择应用模板，点击`创建`，即可创建一个后端应用。

 - 应用编码：choerodon-backend
 -  应用名称：猪齿鱼后端应用
 -  选择应用模板: MicroService 
	<blockquote class="note">
       当应用模板不符合您的需求，您可手动创建一个[应用模板](../../user-guide/development-pipeline/application-template/)。
	    </blockquote>

 **4.** 当应用创建成功，可在应用管理界面查看到新建的应用。

 **5.** 在创建应用的同时，系统还会在Gitlab中创建一个仓库，点击 ``仓库地址`` ，链接到Gitlab新建的仓库。

<blockquote class="note">
	Gitlab 仓库的名称是 choerodon-backend，为应用编码。
</blockquote>

 
<h2 id="2">开发后端应用</h2>

应用创建完成之后，开发后端应用。具体的操作步骤如下：

 **1. 创建Feature分支**

 - 点击`应用`，进入到应用管理界面，选择`猪齿鱼后端应用`。
 
 - 点击右侧`分支管理`，点击`创建分支`，系统会从右边滑出页面，填写issue号，如`feature-1`。

 -  点击`创建`，即可创建一个分支。

**2. 拉取代码仓库**
 

 -  在Choerodon平台创建项目后，进入项目创建服务，服务名为gitlab平台的项目名，Choerodon后台将会自动为你生成模板代码，代码仓库地址可以在Choerodon平台查看。

 - 通过git命令拉取生成的项目代码。

	    git clone -b develop http://git.choerodon.io/devopstest-projecttest/choerodon-backend.git

 -  克隆成功后，进入应用根目录，执行命令`git checkout feature-1`，切换到新建分支feature-1，在此分支进行开发。


 - 项目使用DDD领域驱动设计，目录结构如图所示

    ![](/docs/quick-start/image/3.png) 

 - 项目代码通过IDEA打开后，如图所示

    ![](/docs/quick-start/image/dd.png) 
  
 
 **3. 修改配置信息**

 - pom.xml依赖
      

		<?xml version="1.0" encoding="UTF-8"?>
		<project xmlns="http://maven.apache.org/POM/4.0.0"
				 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
				 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
			<modelVersion>4.0.0</modelVersion>

		<groupId>devopstest-projecttest</groupId>
		<artifactId>choerodon-backend</artifactId>
		<version>1.0-SNAPSHOT</version>

		<parent>
			<groupId>io.choerodon</groupId>
			<artifactId>choerodon-framework-parent</artifactId>
			<version>0.5.0.RELEASE</version>
		</parent>

		<dependencies>
			<!-- swagger依赖 -->
			<dependency>
				<groupId>io.choerodon</groupId>
				<artifactId>choerodon-starter-swagger</artifactId>
				<version>0.5.0.RELEASE</version>
			</dependency>
			<!-- feign依赖 -->
			<dependency>
				<groupId>io.choerodon</groupId>
				<artifactId>choerodon-starter-feign-replay</artifactId>
				<version>0.5.0.RELEASE</version>
			</dependency>
			<!-- 数据库 -->
			<dependency>
				<groupId>mysql</groupId>
				<artifactId>mysql-connector-java</artifactId>
			</dependency>
			<dependency>
				<groupId>io.choerodon</groupId>
				<artifactId>choerodon-starter-core</artifactId>
				<version>0.5.0.RELEASE</version>
			</dependency>
			<dependency>
				<groupId>io.choerodon</groupId>
				<artifactId>choerodon-starter-hitoa</artifactId>
				<version>0.5.0.RELEASE</version>
			</dependency>
			<!-- 通用mapper -->
			<dependency>
				<groupId>io.choerodon</groupId>
				<artifactId>choerodon-starter-mybatis-mapper</artifactId>
				<version>0.5.0.RELEASE</version>
			</dependency>
			 <!-- 资源服务jwtToken校验工具包-->
			<dependency>
				<groupId>io.choerodon</groupId>
				<artifactId>choerodon-starter-oauth-resource</artifactId>
				<version>0.5.0.RELEASE</version>
			</dependency>
			<!-- 监控 -->
			<dependency>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-starter-actuator</artifactId>
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
				<artifactId>spring-boot-starter-undertow</artifactId>
			</dependency>
			<dependency>
				<groupId>org.springframework.cloud</groupId>
				<artifactId>spring-cloud-starter-eureka</artifactId>
			</dependency>
			<dependency>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-configuration-processor</artifactId>
				<optional>true</optional>
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
				<artifactId>spring-cloud-starter-bus-kafka</artifactId>
				<exclusions>
					<exclusion>
						<groupId>org.springframework.cloud</groupId>
						<artifactId>spring-cloud-bus</artifactId>
					</exclusion>
				</exclusions>
			</dependency>
			<dependency>
				<groupId>io.choerodon</groupId>
				<artifactId>choerodon-starter-bus</artifactId>
				<version>0.5.0.RELEASE</version>
			</dependency>
			<!-- test -->
			<dependency>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-starter-test</artifactId>
				<scope>test</scope>
			</dependency>
			<!--监控相关依赖 -->
			<dependency>
				<groupId>org.springframework.cloud</groupId>
				<artifactId>spring-cloud-stream-binder-kafka</artifactId>
			</dependency>
			<dependency><!-- 如果服务需要hystrix监控功能则需要此依赖 -->
				<groupId>org.springframework.cloud</groupId>
				<artifactId>spring-cloud-netflix-hystrix-stream</artifactId>
			</dependency>
			<dependency><!-- 如果服务需要zipkin监控功能则需要此依赖 -->
				<groupId>org.springframework.cloud</groupId>
				<artifactId>spring-cloud-sleuth-stream</artifactId>
			</dependency>
		</dependencies>

		<build>
			<finalName>app</finalName>
		</build>
		
	    </project>


 - springBoot配置文件

       Choerodon平台微服务都是采用yml配置文件的方式进行系统配置，通过修改application-default.yml文件修改数据库配置、端口配置等。
	   
      application-default.yml

	```
	spring:
		  datasource:
			url: jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=utf-8&useSSL=false
			username: root
			password: root
		  http:
			encoding:
			  charset: UTF-8
			  force: true
			  enabled: true
			multipart:
			  max-file-size: 30MB
			  max-request-size: 30MB
		eureka:
		  client:
			serviceUrl:
			  defaultZone: ${EUREKA_DEFAULT_ZONE:http://localhost:8000/eureka/}
		swagger:
		  oauthUrl: http://localhost:8080/oauth/oauth/authorize
		event:
		  consumer:
			enabled: true
			enable-duplicate-remove: false
			kafka:
			  bootstrapServers: localhost:9092
			  sessionTimeoutMs: 30000
		feign:
		  hystrix:
			enabled: true
		hystrix:
		  command:
			default:
			  execution:
				isolation:
				  thread:
					timeoutInMilliseconds: 30000
				timeout:
				  enabled: false
		ribbon:
		  ConnectTimeout: 10000
		  ReadTimeout: 30000
		serviceAccountId: 1
	```

 **4. 数据库初始化脚本**

 - 修改数据初始化脚本

    修改数据库配置
**init-local-database.sh**
	```
	#!/bin/bash
		mkdir -p target
		if [ ! -f target/choerodon-tool-liquibase.jar ]
		then
			curl http://nexus.choerodon.com.cn/repository/choerodon-release/io/choerodon/choerodon-tool-liquibase/0.5.0.RELEASE/choerodon-tool-liquibase-0.5.0.RELEASE.jar -o target/choerodon-tool-liquibase.jar
		fi
		java -Dspring.datasource.url="jdbc:mysql://localhost/test?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
		 -Dspring.datasource.username=root \
		 -Dspring.datasource.password=root \
		 -Ddata.drop=false -Ddata.init=true \
		 -Ddata.dir=src/main/resources \
		 -jar target/choerodon-tool-liquibase.jar
	```

 - 数据库表结构groovy脚本

       创建一个测试用户表，字段id、name、description、自维护字段（object_version_number、created_by、creation_date、last_updated_by、last_update_date）。自维护字段在项目mybatis依赖包中通过sql拦截器维护，文件命名方式：表名.groovy，存放路径如图所示
	   
     
	 ![](/docs/quick-start/image/2.png)


       **test_user.groovy**
		
		package script.db

			databaseChangeLog(logicalFilePath: 'script/db/test_user.groovy') {
				changeSet(id: '2018-05-14-test-user', author: 'dinghuang123@gmail.com') {
					createTable(tableName: "test_user", remarks: '测试用户表') {
						column(name: 'id', type: 'BIGINT UNSIGNED', autoIncrement: true, remarks: '主键') {
							constraints(primaryKey: true)
						}
						column(name: 'name', type: 'VARCHAR(255)', remarks: '用户名称') {
							constraints(nullable: false)
						}
						column(name: 'description', type: 'VARCHAR(255)', remarks: '描述')
						column(name: "object_version_number", type: "BIGINT UNSIGNED", defaultValue: "1")
						column(name: "created_by", type: "BIGINT UNSIGNED", defaultValue: "0")
						column(name: "creation_date", type: "DATETIME", defaultValueComputed: "CURRENT_TIMESTAMP")
						column(name: "last_updated_by", type: "BIGINT UNSIGNED", defaultValue: "0")
						column(name: "last_update_date", type: "DATETIME", defaultValueComputed: "CURRENT_TIMESTAMP")
					}
				}
			}
		

     进入项目根目录通过gitBash执行
   
         $ sh init-local-database.sh
执行成功后，数据库表初始化完成，如图所示

     ![](/docs/quick-start/image/csh.png)

 **5. 示例代码**

 - DO
 
     文件存放在infra文件夹下的dataobject，文件命名规范：对象名+DO.java，DO代表UserDO对象是DDD领域设计的持久层对象，该对象直接与mybatis进行持久层交互，对象继承AuditDomain，AuditDomain是自维护字段。

	 `@Id@GeneratedValue`
    
     2个注解分别对应主键和主键自增长，代码如下:
		
		package io.choerodon.test.infra.dataobject;


		import io.choerodon.mybatis.annotation.ModifyAudit;
		import io.choerodon.mybatis.annotation.VersionAudit;
		import io.choerodon.mybatis.domain.AuditDomain;
		import io.choerodon.test.infra.common.utils.StringUtil;

		import javax.persistence.GeneratedValue;
		import javax.persistence.Id;
		import javax.persistence.Table;
		import javax.validation.constraints.NotNull;

		/**
		 * 测试用户表
		 *
		 * @author dinghuang123@gmail.com
		 * @since 2018-05-15 11:44:28
		 */
		@ModifyAudit
		@VersionAudit
		@Table(name = "test_user")
		public class UserDO extends AuditDomain {

			/***/
			@Id
			@GeneratedValue
			private Long id;

			/**
			 * 用户名称
			 */
			@NotNull(message = "error.user.nameNotNull")
			private String name;

			/**
			 * 描述
			 */
			private String description;

			public Long getId() {
				return id;
			}

			public void setId(Long id) {
				this.id = id;
			}

			public String getName() {
				return name;
			}

			public void setName(String name) {
				this.name = name;
			}

			public String getDescription() {
				return description;
			}

			public void setDescription(String description) {
				this.description = description;
			}

			@Override
			public String toString() {
				return StringUtil.getToString(this);
			}

		}
		
   

 - Entity
    
       文件存放在entity文件夹下，文件命名规范：对象名+E.java，E代表UserE对象是DDD领域设计的实体对象，该对象用来实现业务逻辑，DDD思想最重要的就是在没有数据库的情况下实现完整的业务逻辑，所以entity不操作持久层，在entity进行的逻辑都是内存操作。

    代码如下所示
	
		
		package io.choerodon.test.domain.test.entity;


		import io.choerodon.test.infra.common.utils.StringUtil;
		import org.springframework.context.annotation.Scope;
		import org.springframework.stereotype.Component;

		/**
		 * 测试用户表
		 *
		 * @author dinghuang123@gmail.com
		 * @since 2018-05-15 11:44:28
		 */
		@Component
		@Scope("prototype")
		public class UserE {

			private Long id;

			private String name;

			private String description;

			private Long objectVersionNumber;

			public Long getId() {
				return id;
			}

			public void setId(Long id) {
				this.id = id;
			}

			public String getName() {
				return name;
			}

			public void setName(String name) {
				this.name = name;
			}

			public String getDescription() {
				return description;
			}

			public void setDescription(String description) {
				this.description = description;
			}

			public Long getObjectVersionNumber() {
				return objectVersionNumber;
			}

			public void setObjectVersionNumber(Long objectVersionNumber) {
				this.objectVersionNumber = objectVersionNumber;
			}

			@Override
			public String toString() {
				return StringUtil.getToString(this);
			}

		}
		
  

 - Mapper
    
	UserMapper.java
	
		package io.choerodon.test.infra.mapper;

		import io.choerodon.mybatis.common.BaseMapper;
		import io.choerodon.test.infra.dataobject.*;
		import org.springframework.stereotype.Repository;


		/**
		* 测试用户表
		* 
		* @author dinghuang123@gmail.com
		* @since 2018-05-15 11:44:28
		*/
		public interface UserMapper extends BaseMapper<UserDO> {

		}
		
	UserMapper.xml
	
			<?xml version="1.0" encoding="UTF-8" ?>
			<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
			<mapper namespace="io.choerodon.test.infra.mapper.UserMapper">


				<!-- ResultMap -->
				<resultMap id="BaseResultMap" type="io.choerodon.test.infra.dataobject.UserDO">
					<result column="id" property="id" />
					<result column="name" property="name" />
					<result column="description" property="description" />
					<result column="object_version_number" property="objectVersionNumber" />
					<result column="created_by" property="createdBy" />
					<result column="creation_date" property="creationDate" />
					<result column="last_updated_by" property="lastUpdatedBy" />
					<result column="last_update_date" property="lastUpdateDate" />
				</resultMap>

			</mapper>
    

 - Repository
    
    文件存放在repository文件夹下，文件命名规范：对象名+Repository.java，Repository代表UserE对象是DDD领域设计的仓储，引入仓储的概念，是因为部分业务逻辑有涉及到持久层，需要通过仓储来实现。这样做的好处是，以后不论持久层框架是mybatis还是hibernate，业务逻辑不变，只需要修改仓储实现类。
	
    UserRepository.java
	
		package io.choerodon.test.domain.test.repository;

		import io.choerodon.test.domain.test.entity.UserE;

		import java.util.List;


		/**
		 * 测试用户表
		 *
		 * @author dinghuang123@gmail.com
		 * @since 2018-05-15 11:44:28
		 */
		public interface UserRepository {

			/**
			 * 更新测试用户表
			 *
			 * @param userE userE
			 * @return UserE
			 */
			UserE update(UserE userE);

			/**
			 * 添加一个测试用户表
			 *
			 * @param userE userE
			 * @return UserE
			 */
			UserE create(UserE userE);

			/**
			 * 根据id删除测试用户表
			 *
			 * @param id id
			 * @return int
			 */
			int delete(Long id);

			/**
			 * 查询所有用户
			 *
			 * @return List<UserE>
			 */
			List<UserE> queryList();
		}
		
		
    UserRepositoryImpl.java
		
		
		package io.choerodon.test.infra.repository.impl;

		import io.choerodon.core.convertor.ConvertHelper;
		import io.choerodon.core.exception.CommonException;
		import io.choerodon.test.domain.test.converter.UserConverter;
		import io.choerodon.test.domain.test.entity.UserE;
		import io.choerodon.test.domain.test.repository.UserRepository;
		import io.choerodon.test.infra.dataobject.UserDO;
		import io.choerodon.test.infra.mapper.UserMapper;
		import org.springframework.beans.factory.annotation.Autowired;
		import org.springframework.stereotype.Component;
		import org.springframework.transaction.annotation.Transactional;

		import java.util.List;


		/**
		 * 测试用户表
		 *
		 * @author dinghuang123@gmail.com
		 * @since 2018-05-15 11:44:29
		 */
		@Component
		@Transactional(rollbackFor = CommonException.class)
		public class UserRepositoryImpl implements UserRepository {

			private static final String UPDATE_ERROR = "error.User.update";
			private static final String INSERT_ERROR = "error.User.insert";
			private static final String DELETE_ERROR = "error.User.delete";

			@Autowired
			private UserMapper userMapper;

			@Autowired
			private UserConverter userConverter;

			@Override
			public UserE update(UserE userE) {
				UserDO userDO = userConverter.entityToDo(userE);
				if (userMapper.updateByPrimaryKeySelective(userDO) != 1) {
					throw new CommonException(UPDATE_ERROR);
				}
				return userConverter.doToEntity(userMapper.selectByPrimaryKey(userDO.getId()));
			}

			@Override
			public UserE create(UserE userE) {
				UserDO userDO = userConverter.entityToDo(userE);
				if (userMapper.insert(userDO) != 1) {
					throw new CommonException(INSERT_ERROR);
				}
				return userConverter.doToEntity(userMapper.selectByPrimaryKey(userDO.getId()));
			}

			@Override
			public int delete(Long id) {
				UserDO userDO = userMapper.selectByPrimaryKey(id);
				int isDelete = userMapper.delete(userDO);
				if (isDelete != 1) {
					throw new CommonException(DELETE_ERROR);
				}
				return isDelete;
			}

			@Override
			public List<UserE> queryList() {
				List<UserDO> userDOlist = userMapper.selectAll();
				return ConvertHelper.convertList(userDOlist, UserE.class);
			}
		}
 

 - domainService
    
    领域层接口命名规范I+对象名+sercice，代码如下
   
       IUserService.java
	
		package io.choerodon.test.domain.service;
		import io.choerodon.test.infra.dataobject.UserDO;
		import io.choerodon.mybatis.service.BaseService;


		/**
		* 测试用户表
		* 
		* @author dinghuang123@gmail.com
		* @since 2018-05-15 11:44:28
		*/
		public interface IUserService extends BaseService<UserDO> {

		}
	
      IUserServiceImpl.java
	  
		package io.choerodon.test.domain.service.impl;

		import io.choerodon.mybatis.service.BaseServiceImpl;
		import io.choerodon.test.domain.service.*;
		import io.choerodon.core.exception.CommonException;
		import org.springframework.stereotype.Service;
		import org.springframework.transaction.annotation.Transactional;

		import io.choerodon.test.infra.dataobject.UserDO;
		/**
		* 测试用户表
		* 
		* @author dinghuang123@gmail.com
		* @since 2018-05-15 11:44:29
		*/
		@Service
		@Transactional(rollbackFor = CommonException.class)
		public class IUserServiceImpl extends BaseServiceImpl<UserDO> implements IUserService{

		}
    

 - DTO 
   
      DTO是与前端进行数据交互定义的对象，命名为：对象名+DTO.java，在DDD设计中，这样的设计确保了数据的安全性，可以根据前端需要传输的信息进行DTO的编写，一部分可以确保重要信息的泄露，另一部分可以确保不必要字段的插入更新。
   
     UserDTO.java
	 
		package io.choerodon.test.api.dto;



		import java.util.Date;
		import io.choerodon.test.infra.common.utils.StringUtil;

		/**
		* 测试用户表
		* 
		* @author dinghuang123@gmail.com
		* @since 2018-05-15 11:44:28
		*/
		public class UserDTO {

			private Long id;

			private String name;

			private String description;

			private Long objectVersionNumber;

			public Long getId() {
				return id;
			}

			public void setId(Long id) {
				this.id = id;
			}

			public String getName() {
				return name;
			}

			public void setName(String name) {
				this.name = name;
			}

			public String getDescription() {
				return description;
			}

			public void setDescription(String description) {
				this.description = description;
			}

			public Long getObjectVersionNumber() {
				return objectVersionNumber;
			}

			public void setObjectVersionNumber(Long objectVersionNumber) {
				this.objectVersionNumber = objectVersionNumber;
			}

		 @Override
			public String toString() {
				return StringUtil.getToString(this);
			}

		}

 - Converter
    
    Converter是实现do、dto、entity之间的转换，本例只是简单实现，由spring进行管理。根据业务逻辑需求，若需要不同dto，dto的转换在assembler文件夹下实现entity与dto的转换。
	
     UserConverter.java

		package io.choerodon.test.domain.test.converter;



		import io.choerodon.core.convertor.ConvertorI;
		import org.springframework.stereotype.Component;
		import org.springframework.beans.BeanUtils;
		import io.choerodon.test.api.dto.UserDTO;
		import io.choerodon.test.infra.dataobject.UserDO;
		import io.choerodon.test.domain.test.entity.UserE;

		/**
		* 测试用户表
		* 
		* @author dinghuang123@gmail.com
		* @since 2018-05-15 11:44:28
		*/
		@Component
		public class UserConverter implements ConvertorI<UserE,UserDO, UserDTO> {

			@Override
			public UserE dtoToEntity(UserDTO userDTO) {
				UserE userE = new UserE();
				BeanUtils.copyProperties(userDTO, userE);
				return userE;
			}

			@Override
			public UserE doToEntity(UserDO userDO) {
				UserE userE = new UserE();
				BeanUtils.copyProperties(userDO, userE);
				return userE;
			}

			@Override
			public UserDTO entityToDto(UserE userE) {
				UserDTO userDTO = new UserDTO();
				BeanUtils.copyProperties(userE, userDTO);
				return userDTO;
			}

			@Override
			public UserDO entityToDo(UserE userE) {
				UserDO userDO = new UserDO();
				BeanUtils.copyProperties(userE, userDO);
				return userDO;
			}

			@Override
			public UserDTO doToDto(UserDO userDO) {
				UserDTO userDTO = new UserDTO();
				BeanUtils.copyProperties(userDO, userDTO);
				return userDTO;
			}

			@Override
			public UserDO dtoToDo(UserDTO userDTO) {
				UserDO userDO = new UserDO();
				BeanUtils.copyProperties(userDTO, userDO);
				return userDO;
			}
		}

 - APP

     app层是对domain方法调用的封装，controller调用app中的service。
  
       UserService.java

		package io.choerodon.test.app.service;


		import io.choerodon.test.api.dto.UserDTO;

		import java.util.List;

		/**
		 * 测试用户表
		 *
		 * @author dinghuang123@gmail.com
		 * @since 2018-05-15 11:44:28
		 */
		public interface UserService {

			/**
			 * 查询所有用户
			 *
			 * @return UserDTO
			 */
			List<UserDTO> queryUserList();

		}

     UserServiceImpl.java

		package io.choerodon.test.app.service.impl;


		import io.choerodon.core.convertor.ConvertHelper;
		import io.choerodon.test.api.dto.UserDTO;
		import io.choerodon.test.app.service.UserService;
		import io.choerodon.test.domain.test.repository.UserRepository;
		import org.springframework.beans.factory.annotation.Autowired;
		import org.springframework.stereotype.Service;

		import java.util.List;

		/**
		 * 测试用户表
		 *
		 * @author dinghuang123@gmail.com
		 * @since 2018-05-15 11:44:28
		 */
		@Service
		public class UserServiceImpl implements UserService {

			@Autowired
			private UserRepository userRepository;

			@Override
			public List<UserDTO> queryUserList() {
				return ConvertHelper.convertList(userRepository.queryList(), UserDTO.class);
			}
		}

 - controller

      控制层结合了swagger进行RESTful的API规范进行设计，示例简单展示了通过GET请求获取所有用户信息。

    UserController.java
	
		package io.choerodon.test.api.controller.v1;

		import io.choerodon.core.exception.CommonException;
		import io.choerodon.test.api.dto.UserDTO;
		import io.choerodon.test.app.service.UserService;
		import io.swagger.annotations.ApiOperation;
		import org.springframework.beans.factory.annotation.Autowired;
		import org.springframework.http.HttpStatus;
		import org.springframework.http.ResponseEntity;
		import org.springframework.web.bind.annotation.*;

		import java.util.List;
		import java.util.Optional;

		/**
		 * 测试用户表
		 *
		 * @author dinghuang123@gmail.com
		 * @since 2018-05-15 11:44:28
		 */
		@RestController
		@RequestMapping(value = "/v1/user")
		public class UserController {

			@Autowired
			private UserService userService;

			@ApiOperation("查询所有用户")
			@GetMapping
			public ResponseEntity<List<UserDTO>> queryUserList() {
				return Optional.ofNullable(userService.queryUserList())
						.map(result -> new ResponseEntity<>(result, HttpStatus.CREATED))
						.orElseThrow(() -> new CommonException("error.queryUserList.get"));
			}
		}
  

 - ExtraDataManager

       编写该文件，可以节省在manager服务的数据库操作，如果是线上环境，可以省去在api-gateway服务的路由配置。

       CustomExtraDataManager.java
	   
		package io.choerodon.test.infra.common;

		import io.choerodon.core.swagger.ChoerodonRouteData;
		import io.choerodon.swagger.annotation.ChoerodonExtraData;
		import io.choerodon.swagger.custom.extra.ExtraData;
		import io.choerodon.swagger.custom.extra.ExtraDataManager;

		/**
		 * @author dinghuang123@gmail.com
		 */
		@ChoerodonExtraData
		public class CustomExtraDataManager implements ExtraDataManager {
			@Override
			public ExtraData getData() {
				ChoerodonRouteData choerodonRouteData = new ChoerodonRouteData();
				choerodonRouteData.setName("test");
				choerodonRouteData.setPath("/test/**");
				choerodonRouteData.setServiceId("test-service");
				extraData.put(ExtraData.ZUUL_ROUTE_DATA, choerodonRouteData);
				return extraData;
			}
		}
	

 -  application
    
       TestServiceApplication.java
	   

		package io.choerodon.test;

		import io.choerodon.resource.annoation.EnableChoerodonResourceServer;
		import org.springframework.boot.SpringApplication;
		import org.springframework.boot.autoconfigure.SpringBootApplication;
		import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
		import org.springframework.cloud.netflix.feign.EnableFeignClients;
		import org.springframework.scheduling.annotation.EnableAsync;

		/**
		 1. 测试服务入口类
		 2.  3. @author dinghuang123@gmail.com
		 */
		@EnableFeignClients("io.choerodon")
		@EnableChoerodonResourceServer
		@EnableAsync
		@EnableEurekaClient
		@SpringBootApplication
		public class TestServiceApplication {
			public static void main(String[] args) {
				SpringApplication.run(TestServiceApplication.class);
			}
		}
		
 **6. 测试结果**

通过Junit进行单元测试。

 

 - UserTest.java

		package io.choerodon.test.test;

		import io.choerodon.test.api.dto.UserDTO;
		import io.choerodon.test.app.service.UserService;
		import org.junit.Test;
		import org.junit.runner.RunWith;
		import org.slf4j.Logger;
		import org.slf4j.LoggerFactory;
		import org.springframework.beans.factory.annotation.Autowired;
		import org.springframework.boot.test.context.SpringBootTest;
		import org.springframework.test.context.junit4.SpringRunner;

		import java.util.List;


		/**
		 * @author dinghuang123@gmail.com
		 */
		@RunWith(SpringRunner.class)
		@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
		public class UserTest {

			@Autowired
			private UserService userService;

			private static Logger logger = LoggerFactory.getLogger(UserTest.class);

			@Test
			public void test() {
				List<UserDTO> userDTOList = userService.queryUserList();
				userDTOList.forEach(userDTO -> logger.info(userDTO.toString()));
			}

		}
		

 - 数据库数据如图所示

      ![](/docs/quick-start/image/sjk.png)

 - 测试结果如图所示

    ![](/docs/quick-start/image/csjg.png)

**7. swagger调用api**

   

 - 本地服务启动如图所示

    ![](/docs/quick-start/image/swagg.png)
    
 - 访问swagger地址：`http://localhost:8080/manager/swagger-ui.html`
 
 - 如图所示

      ![](/docs/quick-start/image/api.png)

至此，后端服务一个简单的API完成。

 **8. 提交代码**
  
	# 将本地代码变动提交到暂存区
	$ git add .
	# 提交代码并且为本次提交添加 commit 信息
	# 注：[FIX]修改bug  [ADD]新增  [IMP]完善  [DEL]删除
	$ git commit –m “[ADD]readme: 新增代码示例”
	# 将本地提交推送至远程仓库对应分支
	$ git push origin feature-1
	
**9. 代码集成**
   
  基于feature分支运行CI。点击`持续集成`,查看 CI 执行情况。

**10. 结束分支**　

 -  点击`应用`，进入应用管理，点击`choerodon-backend`的`分支管理`。
 -  在分支列表找到`feature-1`，点击`结束分支`。


<h2 id="3">生成版本</h2>

 应用版本是代码提交的历史记录，每提交一次修改后的代码，对应生成一个新的版本。具体的操作步骤如下：

**1.** 结束分支之后，`feature-1`分支的代码会合并到`develop`分支，并触发Gitlab CI。

**2.** 点击``持续集成``,查看CI执行情况。

<blockquote class="note">
	Choerodon 缺省的 CI 流程有两个阶段:
	<ul>
		<li>克隆子库，编译打包</li>
		<li>构建docker镜像</li>
	</ul>
</blockquote>

**3.** 当CI运行成功后，点击`应用版本`进行查看，确定应用版本已经生成。


<h2 id="4">部署应用</h2>

提供可视化、一键式部署应用，支持并行部署和流水线无缝集成，实现部署环境标准化和部署过程自动化。

 **1.** 使用部署管理员的角色登录Choerodon系统，选择项目``猪齿鱼研发``。
 
 **2.** 进入`持续交付`模块，选择`部署管理`，点击`应用部署`进入应用部署界面。
 
 **3.** 点击`部署应用`，系统会从右侧滑出部署应用界面，输入如下信息：
   

 -  选择应用：choerodon-backend
 -  选择版本：刚才创建的应用版本
 -  选择环境： 选择要部署的环境
 -   配置信息：配置部署应用所需的信息
 -  部署模式：新建实例（新建一个应用）或替换实例（滚动更新实例）
					
**4.**  点击`部署`按钮，即可完成部署。


<h2 id="5">查看实例部署详情</h2>

 **1.** 使用部署管理员的角色登录Choerodon系统，选择项目``猪齿鱼研发``。
 
 **2.** 进入`持续交付`模块，选择`部署管理`，点击`应用部署`进入应用部署界面。
 
 **3.** 点击`部署应用`即可查看实例。有四种查看视图，分别为：部署实例、单环境、单应用、多应用。

如何判断某版本的应用已经部署成功并通过？当实例出现在列表中，且实例名称后没有报错提示icon即为部署成功生成实例；当容器状态条为绿色，数值显示为1/1时表示容器数量为1且通过健康检查，点击右侧的`查看实例详情`，可以查看到阶段信息及日志。


<h2 id="4">配置网络</h2>

为所选的应用配置网络。

 **1.**  使用部署管理员的角色登录Choerodon系统，选择项目``猪齿鱼研发``。
 
 **2.** 进入`持续交付`模块，选择`部署管理`，点击`网络`，进入网络配置界面。
 
 **3.** 点击`创建网络`，系统从右侧滑出创建网络界面，输入如下信息：

 -  环境名称：选择要部署的环境
 - 应用名称：猪齿鱼前端应用
 - 版本：刚才创建的应用版本
 - 实例：刚才部署的实例
 -  网络名称：名称默认为“应用编码-4位随机码”，且可手动修改
 - 外部IP：需要外网时填写
 -  端口号：应用开放端口

**4.** 点击`创建`按钮即可。

<h2 id="5">产品迭代</h2>

任何产品几乎都会经历产品的初创期、成长期、成熟期。在产品的初创期，需要通过快速试错探索出有用户黏性的功能；探索成功之后，就需要快速导入用户，这时候也会产生新的需求和新的问题，不断去完善产品；在产品的相对成熟期，则可以考虑产品的变现，和新功能的延展，以提升用户活跃。因此，当一个产品开发完成上线后，产品的周期化迭代就变得非常重要。固定的周期有助于为项目团队形成规范，从而提高开发效率。

Choerodon第一次发版前就准备好下个版本的需求。一般第一个版本上线后，开发人员就进入下一个版本的开发和测试。这样当问题暴露的时候，就可以迅速解决问题，优化到某个程度后，再放缓迭代节奏，这样就能更好的平衡好需求。


