+++
title = "应用模板"
description = ""
weight = 1
+++

# 应用模板
  
  应用模板是将同类型应用的代码库结构整理成模板，用于创建应用时能引用相应模板快速创建初始代码库。 每种应用模板至少都包括CI文件以及Chart目录文件。 平台提供默认的常用模板，用户可以根据实际情况自定义符合更多需求的应用模板。

  - **菜单层次**：组织层
  - **菜单路径**：持续交付 >  开发流水线 > 应用模板
  - **默认角色**：平台管理员、项目创建者

### 新建应用模板

  输入应用模板编码，名称，描述，创建默认最简模板。您也可以通过复制于现有模板，以便节省部分共同操作，提升效率。

   1. 点击`创建应用模板`按钮；

   1. 输入应用相关信息，点击`创建`按钮；

   1. 本地克隆应用模板对应的代码库。
      一个正确的模板中应该包含:
spring-boot项目+gitlab-ci.yml文件+dockerfile文件+charts模块

      >spring-boot项目: 生成应用时的初始项目

      >gitlab-ci.yml文件: 定义gitlab ci的阶段

      >dockerfile文件: 用于应用部署时生成镜像

      >charts模块: 用于创建应用时生成创建k8s对象 

      如:deployment job service ingress,部署时配置信息里的key-value值会被应用到对应的k8s对象中用于部署。

### 创建前端应用模板
 
  当应用模板不符合您的要求，你可手动创建一个应用模板。具体步骤如下：
  
  1. 在组织层的`持续交付`模块，选择`应用模板`；

  2. 点击`创建应用模板`，输入相关信息，点击`创建`，即可创建一个模板；
      
  3. 创建完成以后，会生成一个Gitlab地址，点击该地址；
     
 4. 进入Gitlab仓库，克隆代码；
      
 5. 创建一个React的前端UI项目；
   
 6. 编写一个dockerfile；
       
      将dockerfile文件放在项目根目录下
     
      ```
	   FROM registry.choerodon.io/tools/nginx:stable
       RUN echo "Asia/shanghai" > /etc/timezone;
       ADD dist /usr/share/nginx/html
       COPY entrypoint.sh .
       ENTRYPOINT [ "sh","./entrypoint.sh" ]
      ```
     entrypoint.sh文件如下	 

		``` 
		#bin/bash
		set -e

		PRO_API_HOST=${PRO_API_HOST:-"gateway.devops.saas.choerodon.com"}
		PRO_CLIENT_ID=${PRO_CLIENT_ID:-"devops"}

		find /usr/share/nginx/html -name '*.js' | xargs sed -i "s/localhost:8080/$PRO_API_HOST/g"
		find /usr/share/nginx/html -name '*.js' | xargs sed -i "s/localhost:clientId/$PRO_CLIENT_ID/g"

		nginx -g 'daemon off;'

		exec "$@"
		```
7. [编写Gitlab-CI文件](https://docs.gitlab.com/ee/ci/)
     
      ```
      image: registry.choerodon.io/tools/devops-ci:1.1.0    
      ```
      image指CI运行基础镜像

      ```yaml
        stages:
        -  node_build
        -  docker_build
      ``` 
       stages指包含 node_build 和docker_build两个阶段 	

 	  ```yaml
	  node_build_dev:
        stage: node_build
		script:
		  - node_config
		  - node_module iam
		  - node_build devbuild
          - clean_cache
        only:
          - /^release-.*$/
          - /^hotfix-.*$/
          - develop
          - tags
      ``` 
       node_build_dev指job名称
	   
       stage指对应的阶段
	   
	   script指执行的命令
       
	   only指触发的分支

       ```yaml
       .auto_devops: &auto_devops |
           curl -o .auto_devops.sh \
                 "${CHOERODON_URL}/devops/ci?token=${Token}&type=microservice"
            source .auto_devops.sh
       ```
       
	   .auto_devops: 从指定仓库地址中拉取script脚本  用于docker-build阶段

       ```
       before_script:
  
         - *auto_devops
       ```
       before_script指ci执行前所执行的命令

8. 编写charts模块；
      
      目录结构如下

        |--charts
           ｜--model-service    
              ｜--templates               
                ｜--_helper.tpl
                ｜--deplopment.yaml
              ｜--.helmignore
              ｜--Chart.yaml
              ｜--values.yaml  
      `templates`为模板文件，将模板文件渲染成实际文件，然后发送给Kubernetes。
      
      `values.yaml`为模板的预定义变量。                      
      
      `Chart.yaml`包含chart的版本信息说明，您可以从模板中访问它。
      
      `deployment.yaml`：创建Kubernetes 部署的基本清单。

      `_helpers.tpl`：放置模板助手的地方，您可以在整个chart中重复使用。
      
9. 编写config.js；
10.  提交代码，即可完成模板创建；

### 创建后端应用模板

当应用模板不符合您的要求，你可手动创建一个应用模板。具体步骤如下：
    
 6. 在组织层的`持续交付`模块，选择`应用模板`；

 7. 点击`创建应用模板`，输入相关信息，点击`创建`，即可创建一个模板。
      
 8. 创建完成以后，会生成一个Gitlab地址，点击该地址；
     
 9. 进入Gitlab仓库，克隆代码；
      
 10. [创建一个spring-boot项目](../../../../development-guide/backend/demo/create_project)
   
 11. 编写一个dockerfile

    目录结构如下

        |--src
        ｜--main 
            ｜--docker        
            ｜--dockerfile


    ```
    FROM registry.choerodon.io/choerodon-cloud/base

    COPY app.jar /app.jar

    ENTRYPOINT [ "java", "-jar", "/app.jar"] 
    ```

 12. [编写gitlab-ci文件](https://docs.gitlab.com/ee/ci/)

    ```
    image: registry.choerodon.io/tools/devops-ci:1.1.0    
    ```
    image指ci运行基础镜像

    ```yaml
        stages:

        - maven-package

        - docker-build 
      ``` 

       stages指包含 maven-package 和docker-build两个阶段
        
       ```yaml 
       maven-feature:
  
       stage: maven-package
  
       script:
    
         - git_merge develop
    
         - update_pom_version
    
         - mvn package -U -DskipTests=false
    
         - mvn --batch-mode verify sonar:sonar -Dsonar.host.url=${SONAR_URL}- Dsonar.analysis.mode=preview -Dsonar.gitlab.commit_sha=${CI_COMMIT_SHA} -Dsonar.gitlab.ref_name=${CI_COMMIT_REF_NAME} -Dsonar.gitlab.project_id=${CI_PROJECT_ID}
  
       only:
    
         - /^feature-.*$/
       ```
       maven-feature指job名称
       
       stage指对应的阶段
       
       only指触发的分支

       ```yaml
       .auto_devops: &auto_devops |
    
           curl -o .auto_devops.sh \
        
                 "${CHOERODON_URL}/devops/ci?token=${Token}&type=microservice"
    
            source .auto_devops.sh
       ```
       .auto_devops: 从指定仓库地址中拉取script脚本  用于docker-build阶段

       ```yaml
       before_script:
  
         - *auto_devops
       ```
       before_script: ci执行前所执行的命令

 13. 编写charts模块
      
      目录结构如下

        |--charts
           ｜--model-service    
              ｜--templates               
                ｜--_helper.tpl
                ｜--deplopment.yaml
                ｜--pre-config-congig.yaml
                ｜--pre-config-db.yaml
                ｜--service.yaml
              ｜--.helmignore
              ｜--Chart.yaml
              ｜--values.yaml  
      `templates`为模板文件，将模板文件渲染成实际文件，然后发送给Kubernetes。
      
      `values.yaml`为模板的预定义变量。                      
      
      `Chart.yaml`包含chart的版本信息说明，您可以从模板中访问它。
      
      `deployment.yaml`：创建Kubernetes 部署的基本清单

      `service.yaml`：为您的部署创建服务端点的基本清单

      `_helpers.tpl`：放置模板助手的地方，您可以在整个chart中重复使用
      
 9. 提交代码，即可完成模板创建。

### 创建Java库应用模板

 当应用模板不符合您的要求，你可手动创建一个应用模板。具体步骤如下：
 
1. 在组织层的`持续交付`模块，选择`应用模板`；

2. 点击`创建应用模板`，输入相关信息，点击`创建`，即可创建一个模板；
      
3. 创建完成以后，会生成一个Gitlab地址，点击该地址；
     
4. 进入Gitlab仓库，克隆代码；
      
5. 创建一个普通Java应用；
   
6. 编写一个Gitlab CI；

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

### 查看应用详情

  在详情界面根据应用模板名称、应用模板编码、应用模板描述、应用模板地址、应用模板来源来查看应用详情。

列表字段

 - 应用模板名称：应用模板的自定义名称。
 - 应用模板编码：应用模板的自定义编码。
 - 应用模板描述：应用模板的自定义描述。
 - 应用模板地址：应用模板的git仓库地址。
 - 应用模板来源：有预定义和自定义两种来源。预定义是Choerodon系统预置的模板；自定义是由用户自己创建的模板。

### 修改模板信息
点击`修改模板`→ ![修改环境按钮](/docs/user-guide/continuos-delivery/Assembly line/image/修改环境按钮.png)按钮 ，进行应用模板名称和描述的修改。

### 删除模板信息
 1. 预定义模板无法删除；
 1. 点击`删除模板`→ ![删除网络按钮](/docs/user-guide/continuos-delivery/Assembly line/image/删除网络按钮.png) 按钮，进行模板的删除。
<blockquote class="warning">
         若删除模板，该条数据将被永久删除，不可恢复!
      </blockquote>
