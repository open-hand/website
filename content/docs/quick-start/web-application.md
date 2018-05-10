+++
title = "创建一个Java库"
description = ""
weight = 4
+++

# 创建一个Java库
## 概述
众所周知，Java 的生态环境相当庞大，包含了数量相当可观的官方及第三方库。利用这些库，可以解决在用 Java 开发时遇到的各类问题，让开发效率得到显著提升。大部分项目实际上还是需要进行单元测试、日志记录、序列化、代码规范化等工作，因此用一些相关的Java库区解决问题，还是一个不错的选择。

## 目标

本页面介绍以Choerodon平台为基础，通过创建Java库，创建Java库应用模板、开发Java等方面介绍，演示如何创建一个Java库，让用户熟知整个操作流程。


## 前置条件

- 在操作之前保证[系统配置](../../user-guide/system-configuration)已经配置完全。
- 完成[创建项目](../project)操作。本章节使用在前面章节创建的项目`猪齿鱼研发`。

<h2 id="1">创建Java库</h2>

1. 使用项目所有者或者源代码管理员的角色登录Choerodon系统，选择项目`猪齿鱼研发`；
2. 选择`持续交付`模块，点击`应用`，进入应用管理页面；
3. 点击``创建应用``，系统会弹出窗口，在窗口中输入应用编码、应用名称和选择应用模板， 点击`创建`按钮，即可创建一个Java库；

    a. 应用编码：choerodon-jar
	 <blockquote class="warning">
    应用编码输入只能包含字母，数字，下划线，空格， '_', '.', "——",只能以字母，数字，下划线开头。
    </blockquote>

    b. 应用名称：猪齿鱼jar应用

    c. 选择应用模板: JavaLib  

5. 当应用创建成功，可以在应用管理查看到新建的应用；

6. 在创建应用的同时，系统还会在Gitlab中创建一个仓库，点击 ``仓库地址`` ，链接到Gitlab新建的仓库；
    
    <blockquote class="note">
        Gitlab 仓库的名称是 ``choerodon-jar``，为应用编码。
    </blockquote>

<h2 id="2">创建Java库应用模板</h2>

 当应用模板不符合您的要求，你可手动创建一个应用模板。具体步骤如下：
 
1. 在组织层的`持续交付`模块，选择`应用模板`；

2. 点击`创建应用模板`，输入相关信息，点击`创建`，即可创建一个模板；
      
3. 创建完成以后，会生成一个Gitlab地址，点击该地址；
     
4. 进入Gitlab仓库，克隆代码；
      
5. 创建一个普通Java应用
   
6. 编写一个Gitlab CI

      ```
	    stages:
	    - mvn-package
      ```
	  stage定义CI中包含的阶段
	  
	

	``` stylus
	maven-branches:
	  stage: mvn-package
	  script:
		- update_pom_version
		- mvn clean && mvn package -U -DskipTests=false
		- mvn --batch-mode verify sonar:sonar -Dsonar.host.url=${SONAR_URL} -Dsonar.analysis.mode=preview -Dsonar.gitlab.commit_sha=${CI_COMMIT_SHA} -Dsonar.gitlab.ref_name=${CI_COMMIT_REF_NAME} -Dsonar.gitlab.project_id=${CI_PROJECT_ID}
	  only:
		- develop
		- /^release-.*$/
		- /^hotfix-.*$/
		- /^feature-.*$/
	  except:
		- tags
	```
	   maven-branches指job名称
	   
       stage指对应的阶段
	   
	   script指执行的命令
       
	   only指触发的分支
      
	  except指不会触发的分支
	  
	  

	``` stylus
	.auto_devops: &auto_devops |
			   curl -o .auto_devops.sh \
					 "${CHOERODON_URL}/devops/ci?token=${Token}&type=lib"
				source .auto_devops.sh
	```   
  .auto_devops: 从指定仓库地址中拉取script脚本  用于docker-build阶段


       ```yaml
       before_script:
  
         - *auto_devops
       ```
       before_script:指ci执行前所执行的命令
	   
7. 提交代码；


<h2 id="2">开发Java库</h2>

Java库创建完成之后，开发Java库。具体的操作步骤如下：

 1. 创建Feature分支。

     点击`应用`，进入到应用管理界面，选择`猪齿鱼jar应用`，点击右侧`分支管理`，点击`创建分支`，系统弹出侧边栏，填写字段，如`数字1`，点击`创建`按钮，即可创建一个名称为`feature-1`的分支。 
        <blockquote class="warning">
        字段填写输入包含字母、数字、'——'、'_'），如feature-1
        </blockquote>
 2. 在存放代码的文件夹下，打开git bash,输入命令`git clone [仓库地址]`，拉取所需应用的代码仓库。
 3. 克隆成功后，进入项目根目录，打开git bash，输入`git checkout feature-1`，切换到新建分支feature-1，在此分支进行开发。
 4. 提交代码
  
		# 将本地代码变动提交到暂存区
		$ git add .
		# 提交代码并且为本次提交添加 commit 信息
		# 注：[FIX]修改bug  [ADD]新增  [IMP]完善  [DEL]删除
		$ git commit –m “[ADD]readme: 新增代码示例”
		# 将本地提交推送至远程仓库对应分支
		$ git push origin feature-1

	<blockquote class="note">
		记得修改maven 仓库地址。
	</blockquote>

 5. 基于feature分支运行CI。点击`CI流水线`,查看 CI 执行情况。

 6. 点击`应用`，进入应用管理界面，点击`猪齿鱼jar应用`的`分支管理`，在分支列表找到`feature-1`，点击`结束分支`。

 7. 创建Release分支。

      在应用管理界面，选择`猪齿鱼jar应用`，点击右侧`分支管理`，选择`创建分支`；系统会弹出侧边栏，填写字    段，点击创建按钮，即可创建一个Release分支；

 8. 在分支列表找到刚才创建的分支，点击`结束分支`。

 9. 点击`CI流水线`，再次查看CI运行情况。
    
	   <blockquote class="note">
			如果CI运行成功，去maven仓库地址查看是否打包成功。
		</blockquote>

 10. 生成的JAR包的信息如下：

 - 应用编码：choerodon-jar
 -   artifactId: 应用编码 
 -    version: 创建的Release分支名称
 
<h2 id="5">产品迭代</h2>

任何产品几乎都会经历产品的初创期、成长期、成熟期。在产品的初创期，需要通过快速试错探索出有用户黏性的功能；探索成功之后，就需要快速导入用户，这时候也会产生新的需求和新的问题，不断去完善产品；在产品的相对成熟期，则可以考虑产品的变现，和新功能的延展，以提升用户活跃。因此，当一个产品开发完成上线后，产品的周期化迭代就变得非常重要。固定的周期有助于为项目团队形成规范，从而提高开发效率。

Choerodon第一次发版前就准备好下个版本的需求。一般第一个版本上线后，开发人员就进入下一个版本的开发和测试。这样当问题暴露的时候，就可以迅速解决问题，优化到某个程度后，再放缓迭代节奏，这样就能更好的平衡好需求。


