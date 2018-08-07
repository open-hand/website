+++
title = "应用模板"
description = "是将同类型应用的代码库结构整理成模板，用于创建应用时能引用相应模板快速创建初始代码库，目前系统预置了三种模板分别是:  JavaLib(jar库)、MicroServiceFront(web前端应用模板)、MicroService(微服务应用模板)。"
weight = 1
+++

# 应用模板
  
应用模板是将同类型应用的代码库结构整理成模板，用于创建应用时能引用相应模板快速创建初始代码库。每种非空应用模板至少都包括 Dockerfile 文件、CI 文件以及 Chart 目录文件。

平台提供默认的常用模板，用户可以根据实际情况自定义符合更多需求的应用模板。

  - **菜单层次**：组织层
  - **菜单路径**：应用管理 > 应用模板
  - **默认角色**：组织管理员

## 预置应用模板
系统中已经预置了几种应用模板，其中包括 `JavaLib(jar库)`、`MicroServiceFront(web前端应用模板)`、`MicroService(微服务应用模板)`在创建应用时可以根据自己的需求选择应用模板，进行快速开发，预定义模板不可操作。

## 创建应用模板

输入`应用模板编码`，`名称`，`描述`，创建默认最简模板，步骤如下。您也可以通过复制于现有模板，以便节省部分共同操作，提升效率。

   1. 点击`创建应用模板`按钮；
   1. 输入应用相关信息，进行数据校验
      - 模板编码：编码只能由小写字母、数字、"-"组成，且以小写字母开头，不能以"-"结尾，并且是唯一的，不能与其他的模板编码相同。
      - 模板名称：名称要求唯一，不能与其他的模板名称相同。
      - 模板描述：不允许为空。
   1. 点击`创建`按钮；
   1. 本地克隆应用模板对应的代码库。一个正确的模板中应该包含: Spring-boot 项目+ Gitlab-ci.yml 文件+ Dockerfile 文件+ Charts 模块。

      > Spring-boot 项目: 生成应用时的初始项目

      > Gitlab-ci.yml 文件: 定义 Gitlab CI 的阶段

      > Dockerfile 文件: 用于应用部署时生成镜像

      > Charts 模块: 用于创建应用时生成创建 k8s 对象 

      如: Deployment job service ingress ,部署时配置信息里的 Key-value 值会被应用到对应的 k8s 对象中用于部署。

## 创建前端应用模板
 
当应用模板不符合您的要求，你可手动创建一个应用模板。具体步骤如下：
  
1. 选择组织后，在组织层的`应用管理`模块，选择`应用模板`；

1. 输入应用相关信息，进行数据校验
    - 模板编码：编码只能由小写字母、数字、"-"组成，且以小写字母开头，不能以"-"结尾，并且是唯一的，不能与其他的模板编码相同。
    - 模板名称：名称要求唯一，不能与其他的模板名称相同。
    - 模板描述：不允许为空。

1. 点击`创建`，即可创建一个模板；
  
1. 创建完成以后，会生成一个 Gitlab 地址，点击该地址；
 
1. 进入 Gitlab 仓库，克隆代码；
  
1. 创建一个 React 的前端UI项目；

1. 编写一个Dockerfile；
   
    将 Dockerfile 文件放在项目根目录下
    
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
1. 编写 [Gitlab-CI](https://docs.gitlab.com/ee/ci/) 文件
     
      ```
      image: registry.cn-hangzhou.aliyuncs.com/choerodon-tools/cifront:0.5.0    
      ```
      image 指 CI 运行基础镜像。

      ```yaml
        stages:
        -  node_build
        -  docker_build
      ``` 
       stages指包含 node_build 和 docker_build 两个阶段 。	

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
       node_build_dev 指 job 名称。
	   
       stage 指对应的阶段。
	   
       script 指执行的命令。
       
       only 指触发的分支。

       ```yaml
       .auto_devops: &auto_devops |
           curl -o .auto_devops.sh \
                 "${CHOERODON_URL}/devops/ci?token=${Token}&type=microservice"
            source .auto_devops.sh
       ```
       
	   .auto_devops: 从指定仓库地址中拉取 script 脚本  用于 docker-build 阶段。

       ```
       before_script:
  
         - *auto_devops
       ```
       before_script 指 ci 执行前所执行的命令。
  
1. 编写 charts 模块；
      
      目录结构如下

        |--charts
           ｜--model-service    
              ｜--templates               
                ｜--_helper.tpl
                ｜--deplopment.yaml
              ｜--.helmignore
              ｜--Chart.yaml
              ｜--values.yaml  
      `templates`为模板文件，将模板文件渲染成实际文件，然后发送给 Kubernetes。
      
      `values.yaml`为模板的预定义变量。                      
      
      `Chart.yaml`包含 chart 的版本信息说明，您可以从模板中访问它。
      
      `deployment.yaml`：创建 Kubernetes 部署的基本清单。

      `_helpers.tpl`：放置模板助手的地方，您可以在整个 chart 中重复使用。
      
1. 编写 config.js；

1. 提交代码，即可完成模板创建。


### 创建后端应用模板

当应用模板不符合您的要求，你可手动创建一个应用模板。具体步骤如下：
    
 1. 选择组织后，在组织层的`应用管理`模块，选择`应用模板`；

 1. 点击`创建应用模板`，输入相关信息进行数据校验，点击`创建`，即可创建一个模板；
      
 1. 创建完成以后，会生成一个 Gitlab 地址，点击该地址；
     
 1. 进入 Gitlab 仓库，克隆代码；
      
 1. [创建一个 spring-boot 项目](../../../development-guide/backend/demo/create_project)；
   
 1. 目录结构如下：

        |--src
        ｜--main 
            ｜--docker        
            ｜--dockerfile
 
 1. 编写一个 dockerfile；

    ```
    FROM registry.choerodon.io/choerodon-cloud/base

    COPY app.jar /app.jar

    ENTRYPOINT [ "java", "-jar", "/app.jar"] 
    ```

 1. [编写 Gitlab-ci 文件](https://docs.gitlab.com/ee/ci/)

    ```
    image: registry.cn-hangzhou.aliyuncs.com/choerodon-tools/cibase:0.5.0   
    ```
    image 指 ci 运行基础镜像。

    ```yaml
    stages:

     - maven-package

     - docker-build 
    ```

    stages 指包含 maven-package 和 docker-build 两个阶段。
    
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

    maven-feature 指 job 名称。
    
    stage 指对应的阶段。
    
    only 指触发的分支。
    
    ```yaml
    .auto_devops: &auto_devops |
    
       curl -o .auto_devops.sh \
    
             "${CHOERODON_URL}/devops/ci?token=${Token}&type=microservice"
    
        source .auto_devops.sh
    ```
    
    .auto_devops: 从指定仓库地址中拉取 script 脚本  用于 docker-build 阶段。
    
    ```yaml
    before_script:
    
     - *auto_devops
    ```
    
    before_script：ci 执行前所执行的命令

 1. 编写 charts 模块
      
      目录结构如下：

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
      `templates`为模板文件，将模板文件渲染成实际文件，然后发送给 Kubernetes。
      
      `values.yaml`为模板的预定义变量。                      
      
      `Chart.yaml`包含 chart 的版本信息说明，您可以从模板中访问它。
      
      `deployment.yaml`：创建 Kubernetes 部署的基本清单。

      `service.yaml`：为您的部署创建服务端点的基本清单。

      `_helpers.tpl`：放置模板助手的地方，您可以在整个 chart 中重复使用。
      
 1. 提交代码，即可完成模板创建。

### 创建Java库应用模板

当应用模板不符合您的要求，你可手动创建一个应用模板。具体步骤如下：
 
1. 选择组织后，在组织层的`应用管理`模块，选择`应用模板`；

2. 点击`创建应用模板`，输入相关信息进行数据校验，点击`创建`，即可创建一个模板；
      
3. 创建完成以后，会生成一个 Gitlab 地址，点击该地址；
     
4. 进入 Gitlab 仓库，克隆代码；
      
5. 创建一个普通 Java 应用；
   
6. 编写一个 Gitlab CI；

    ```
    stages:
        - mvn-package
    ```
    
    stages 定义 CI 中包含的阶段。
    
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
    maven-branches 指 job 名称。
       
    stage 指对应的阶段。
    
    script 指执行的命令。
       
    only 指触发的分支。
      
    except 指不会触发的分支。
 
   ``` yaml
.auto_devops: &auto_devops |
           curl -o .auto_devops.sh \
                 "${CHOERODON_URL}/devops/ci?token=${Token}&type=lib"
            source .auto_devops.sh
  ```
  .auto_devops：从指定仓库地址中拉取 script 脚本  用于 docker-build 阶段。

  ```yaml
before_script:

 - *auto_devops
  ```
  before_script：指 ci 执行前所执行的命令。
	   
7. 提交代码。

## 查看应用模板详情

在详情界面根据应用模板名称、应用模板编码、应用模板描述、应用模板地址、应用模板来源来查看应用模板详情。

列表字段

 - 应用模板名称：应用模板的自定义名称；
 - 应用模板编码：应用模板的自定义编码；
 - 应用模板描述：应用模板的自定义描述；
 - 应用模板地址：应用模板的 Git 仓库地址；
 - 应用模板来源：有预定义和自定义两种来源。预定义是 Choerodon 系统预置的模板；自定义是由用户自己创建的模板；

## 修改模板信息

点击`修改模板`→ ![修改环境按钮](/docs/user-guide/development-pipeline/image/update_env_button.png) 按钮 ，进行应用模板名称和描述的修改。

## 删除模板

 1. 预定义模板无法删除；

 1. 点击`删除模板`→ ![删除网络按钮](/docs/user-guide/development-pipeline/image/del_net_button.png) 按钮，进行模板的删除。
 
<blockquote class="warning">
若删除模板，该条数据将被永久删除，不可恢复!
</blockquote>

## 更多操作
- [创建应用](../application)
- [应用版本](../application-version)
- [应用发布](../application-release)