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

**3.** <font>完成[创建环境](../../user-guide/deployment-pipeline/environment-pipeline)，环境流水线中有状态为运行中的环境。

**4.** 在Choerodon平台下，项目启动依赖于基础服务：

 - api-gateway(网关服务)
 - gateway-helper(授权校验、权限校验、请求限流)
 - manager-service(管理服务，配置管理、路由管理、swagger管理)
 - oauth-server(认证服务，用户的认证与授权)
 - eureka-server(注册服务，服务发现)
 - iam-service(用户服务，组织、项目、用户信息管理等)
 - 如果是本地开发，需要启动这些服务，而且需要在api-gateway服务的application-default.yml配置文件配置路由信息,serviceId为创建应用时填写的应用编码，详细见下文

		zuul:
		  addHostHeader: true
		  routes:
			demo:
			  path: /demo/**
			  serviceId: xxxxxx
			
      [具体服务启动配置参考][1]

<h2 id="1">创建后端应用</h2>

 **1.** 使用项目所有者的角色登录Choerodon系统，选择项目``猪齿鱼研发``。
 
 **2.** 选择`持续交付`模块，点击`开发流水线`，点击`应用`，进入应用管理页面。
 
 **3.** 点击``创建应用``，系统会从右边滑出页面，在页面中输入应用编码、应用名称，并且选择应用模板，点击`创建`，即可创建一个后端应用。
 
 创建应用前，请保证搭建的gitlab中有对应的模板库，详情看文档分布式部署搭建gitlab，克隆模板仓库部分（已克隆过的请重新克隆最新的版本）
 
 - 应用编码：choerodon-backend
 - 应用名称：猪齿鱼后端应用
 - 选择应用模板：MicroService 
<blockquote class="note">
当应用模板不符合您的需求，您可手动创建一个[应用模板](../../user-guide/development-pipeline/application-template/)。
</blockquote>

 **4.** 当应用创建成功，可在应用管理界面查看到新建的应用。

 **5.** 在创建应用的同时，系统还会在Gitlab中创建一个仓库，点击 ``仓库地址`` ，链接到Gitlab新建的仓库。

<blockquote class="note">
	Gitlab 仓库的名称是 choerodon-backend，对应创建应用时候的应用编码。
</blockquote>

 
<h2 id="2">开发后端应用</h2>

应用创建完成之后，开发后端应用。具体的操作步骤如下：

 **1. 创建Feature分支**

 - 点击`应用`，进入到应用管理界面，选择`猪齿鱼后端应用`。
 
 - 点击右侧`分支管理`，点击`创建分支`，系统会从右边滑出页面，填写issue号，如`feature-1`。

 -  点击`创建`，即可创建一个分支。

**2. 拉取代码仓库**
 
 - 通过点击创建应用之后生成的gitlab仓库地址，链接到对应的仓库地址，然后通过git命令拉取生成的项目代码。

	    git clone -b develop http://xxxxxx/xxxxxx/xxxxxx.git

 -  克隆成功后，进入应用根目录，执行命令`git checkout feature-1`，切换到新建分支feature-1，在此分支进行开发。


 - 项目代码通过IDEA打开后，如图所示

    ![](/docs/quick-start/image/backend1.png) 
  
 
 **3. 数据库初始化脚本**

 - 修改数据初始化脚本

    修改数据库配置,如果本地开发,请在项目根目录下创建脚本文件，注意修改对应的数据库用户密码

　**init-local-database.sh**
	
	```
	#!/bin/bash
    mkdir -p target
    if [ ! -f target/choerodon-tool-liquibase.jar    ]
    then
        curl http://repo1.maven.org/maven2/io/choerodon/choerodon-tool-liquibase/0.5.1.RELEASE/choerodon-tool-liquibase-0.5.1.RELEASE.jar -o target/choerodon-tool-liquibase.jar
    fi
    java -Dspring.datasource.url="jdbc:mysql://localhost/demo_service?useUnicode=true&characterEncoding=utf-8&useSSL=false" \
     -Dspring.datasource.username=choerodon \
     -Dspring.datasource.password=choerodon \
     -Ddata.drop=false -Ddata.init=true \
     -Ddata.dir=src/main/resources \
     -jar target/choerodon-tool-liquibase.jar
	```

 - 数据库表结构groovy脚本

       创建一个测试用例表，文件命名方式：表名.groovy，存放路径如图所示
	   
     
	 ![](/docs/quick-start/image/backend2.png)


       **demo.groovy**
		
		package script.db

		databaseChangeLog(logicalFilePath: 'demo.groovy') {
    		changeSet(id: '2018-02-06-add-table-demo', author: 'crockitwood') {
        createTable(tableName: "demo") {
            column(name: 'id', type: 'BIGINT UNSIGNED', autoIncrement: true, remarks: '表ID，主键，unsigned bigint、单表时自增、步长为 1') {
                constraints(primaryKey: true)
            }
            column(name: 'name', type: 'VARCHAR(64)', remarks: '名称') {
                constraints(unique: true)
            }

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

 **４. 示例代码**

 - Demo.java
 
     数据库持久层对象类

	 `@Id@GeneratedValue`
    
     2个注解分别对应主键和主键自增长，代码如下:
		
		package com.test.devops.entity;

		import io.choerodon.mybatis.annotation.ModifyAudit;
		import io.choerodon.mybatis.annotation.VersionAudit;
		import io.choerodon.mybatis.domain.AuditDomain;

		import javax.persistence.Table;

		@VersionAudit
		@ModifyAudit
		@Table(name = "demo")
		public class Demo extends AuditDomain {

    	private Long id;
		private String name;

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
	}

 - DemoMapper.java
    
		package com.test.devops.mapper;

		import com.test.devops.entity.Demo;
		import io.choerodon.mybatis.common.BaseMapper;

		/**
		* @author crcokitwood
		*/
		public interface DemoMapper extends  BaseMapper<Demo> {
		}
		
 - DemoService.java
    
    接口以及接口实现类代码如下
   
       package com.test.devops.service;

		import com.test.devops.entity.Demo;

		import java.util.List;

		public interface DemoService {
			List<Demo> queryAll();

			void add(Demo demo);
		}

	
      	package com.test.devops.service.impl;

		import com.test.devops.entity.Demo;
		import com.test.devops.service.DemoService;
		import com.test.devops.mapper.DemoMapper;
		import org.springframework.beans.factory.annotation.Autowired;
		import org.springframework.stereotype.Service;

		import java.util.List;

		/**
		* @author crcokitwood
		*/
		@Service
		public class DemoServiceImpl implements DemoService {
			@Autowired
			private DemoMapper mapper;

			@Override
			public List<Demo> queryAll() {
				return mapper.selectAll();
			}

			@Override
			public void add(Demo demo) {
				mapper.insert(demo);
			}
		}
    
 - DemoController.java

      控制层结合了swagger进行RESTful的API规范进行设计
	
		package com.test.devops.controller;

		import com.test.devops.entity.Demo;
		import com.test.devops.service.DemoService;
		import io.swagger.annotations.ApiOperation;
		import io.swagger.annotations.ApiParam;
		import org.springframework.beans.factory.annotation.Autowired;
		import org.springframework.web.bind.annotation.RequestBody;
		import org.springframework.web.bind.annotation.RequestMapping;
		import org.springframework.web.bind.annotation.RequestMethod;
		import org.springframework.web.bind.annotation.RestController;

		import io.choerodon.core.iam.ResourceLevel;
		import io.choerodon.swagger.annotation.Permission;

		import java.util.List;

		@RestController
		@RequestMapping("/v1")
		public class DemoController {

			@Autowired
			DemoService demoService;

			@Permission(permissionPublic = true,level = ResourceLevel.USER)
			@ApiOperation(value = "运行的Demo")
			@RequestMapping(value = "/demos", method = RequestMethod.GET)
			public List<Demo> getVersion() {
				return demoService.queryAll();
			}


			@Permission(permissionPublic = true,level = ResourceLevel.USER)
			@ApiOperation(value = "运行的Demo")
			@RequestMapping(value = "/demos", method = RequestMethod.POST)
			public void insertVersion(
					@ApiParam("demo")
					@RequestBody Demo demo
			) {
			demoService.add(demo);
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
	如果没有写该文件，在线上部署示例微服务，需要手工调用manager-service的api去添加路由
		   
	![](/docs/quick-start/image/backend3.png)	

 **５. 提交代码**
  
	# 将本地代码变动提交到暂存区
	$ git add .
	# 提交代码并且为本次提交添加 commit 信息
	# 注：[FIX]修改bug  [ADD]新增  [IMP]完善  [DEL]删除
	$ git commit –m “[ADD]readme: 新增代码示例”
	# 将本地提交推送至远程仓库对应分支
	$ git push origin feature-1
	
**６. 代码集成**
   
  基于feature分支运行CI。点击`持续集成`,查看 CI 执行情况。

**７. 结束分支**　

 -  点击`应用`，进入应用管理，点击`choerodon-backend`的`分支管理`。
 -  在分支列表找到`feature-1`，点击`结束分支`。


<h2 id="3">生成版本</h2>

 应用版本是代码提交的历史记录，每提交一次修改后的代码，对应生成一个新的版本。具体的操作步骤如下：

**1.** 结束分支之后，`feature-1`分支的代码会合并到`develop`分支，并触发Gitlab CI。

**2.** 点击``持续集成``,查看CI执行情况。

**3.** 当CI运行成功后，点击`应用版本`进行查看，确定应用版本已经生成。


<h2 id="4">部署应用</h2>

提供可视化、一键式部署应用，支持并行部署和流水线无缝集成，实现部署环境标准化和部署过程自动化。

 **1.** 使用部署管理员的角色登录Choerodon系统，选择项目``猪齿鱼研发``。
 
 **2.** 进入`持续交付`模块，选择`部署流水线`，点击`应用部署`进入应用部署界面。
 -  选择应用：choerodon-backend
 -  选择版本：刚才创建的应用版本
 -  选择环境：选择要部署的环境
 -  配置信息：配置部署应用所需的信息
 -  部署模式：新建实例（新建一个应用）或替换实例（滚动更新实例）

	此模板在部署时有一个初始化数据的阶段，所以部署此模板创建好的应用之前，应该去数据库中
	创建一个数据库。并且部署时需要将对应的数据库名称填写正确


	部署时须有三处需要填写数据库，如下所示
	```yml
	preJob:
	preConfig:
		configFile: application-default.yml
		mysql:
		host: 192.168.12.175
		port: 3306
		database: manager_service #manager service对应的数据库
		username: root
		password: choerodon
	preInitDB:
		mysql:
		host: 192.168.12.175
		port: 3306
		database: demo_service #初始化数据对应的数据库
		username: root
		password: choerodon

	deployment:
	managementPort: 8091

	env:
	open:
		EUREKA_DEFAULT_ZONE: http://register-server.io-choerodon:8000/eureka/
		#服务启动时对应的数据库
		SPRING_DATASOURCE_URL: jdbc:mysql://localhost/demo_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
		SPRING_DATASOURCE_USERNAME: root
		SPRING_DATASOURCE_PASSWORD: choerodon
	```				
**３.**  点击`部署`按钮，即可完成部署。

**４.**  服务注册
	
	此服务部署好之后，有可能不会注册到注册中心中，因为注册中心只会监听特定的K8s集群`命令空间`的微服务，需要检查注册中心配置的监听的命名空间。如果不在其中，可以修改注册中心的配置，将此应用所属的命名空间，加入注册中心的监听范围。

- 本地查看服务是否被注册发现地址：
	
	`http://localhost:8000`

- 线上访问服务是否被注册发现地址：xxxxx为部署register-server时创建路由的地址

	`xxxxx/eureka/apps`

**５. swagger调用api**

 - 本地访问swagger地址：

	`http://localhost:8080/manager/swagger-ui.html`
 
 - 线上访问swagger地址：xxxxx是部署api-gateway时所创建域名的地址
 
 	`http://xxxxx:8080/manager/swagger-ui.html`
 
 - 如图所示

   ![](/docs/quick-start/image/backend4.png)

可在swagger-ui上找到该服务，至此，后端服务一个简单的API完成。

![](/docs/quick-start/image/backend5.png)

	然后在配置文件的REGISTER_SERVICE_NAMESPACE加入之前创建环境时候的环境编码

![](/docs/quick-start/image/backend6.png)

<h2 id="5">查看实例部署详情</h2>

 **1.** 使用部署管理员的角色登录Choerodon系统，选择项目``猪齿鱼研发``。
 
 **2.** 进入`持续交付`模块，选择`部署流水线`，点击`实例`进入实例界面。
 有四种查看视图，分别为：部署实例、单环境、单应用、多应用。

如何判断某版本的应用已经部署成功并通过？当实例出现在列表中，且实例名称后没有报错提示icon即为部署成功生成实例；当容器状态条为绿色，数值显示为1/1时表示容器数量为1且通过健康检查，点击右侧的`查看实例详情`，可以查看到阶段信息及日志。


<h2 id="4">配置网络</h2>

为所选的应用配置网络。

 **1.**  使用部署管理员的角色登录Choerodon系统，选择项目``猪齿鱼研发``。
 
 **2.** 进入`持续交付`模块，选择`部署流水线`，点击`网络`，进入网络配置界面。
 
 **3.** 点击`创建网络`，系统从右侧滑出创建网络界面，输入如下信息：

 - 环境名称：选择要部署的环境
 - 应用名称：猪齿鱼前端应用
 - 版本：刚才创建的应用版本
 - 实例：刚才部署的实例
 - 网络名称：名称默认为“应用编码-4位随机码”，且可手动修改
 - 外部IP：需要外网访问时填写
 - 端口号：网络开放的端口号
 - 目标端口号：网络选择的目标实例所暴露的端口号

**4.** 点击`创建`按钮即可。

<h2 id="5">产品迭代</h2>

任何产品几乎都会经历产品的初创期、成长期、成熟期。在产品的初创期，需要通过快速试错探索出有用户黏性的功能；探索成功之后，就需要快速导入用户，这时候也会产生新的需求和新的问题，不断去完善产品；在产品的相对成熟期，则可以考虑产品的变现，和新功能的延展，以提升用户活跃。因此，当一个产品开发完成上线后，产品的周期化迭代就变得非常重要。固定的周期有助于为项目团队形成规范，从而提高开发效率。

Choerodon第一次发版前就准备好下个版本的需求。一般第一个版本上线后，开发人员就进入下一个版本的开发和测试。这样当问题暴露的时候，就可以迅速解决问题，优化到某个程度后，再放缓迭代节奏，这样就能更好的平衡好需求。


