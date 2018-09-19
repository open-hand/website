+++
title = "创建一个应用模板"
description = "创建应用模板的介绍"
weight = 2
type = "docs"

+++

# 创建一个应用模板
---

## 概述

[应用模板](../../../user-guide/application-management/application-template/)是将同类型应用的代码库结构整理成模板，用于创建应用时能引用相应模板快速创建初始代码库。您也可以根据实际情况自定义应用模板。

## 目标

本章节将以应用模板“猪齿鱼应用模板”的创建为例展开介绍，让读者能够熟悉使用Choerodon创建应用模板的步骤和流程。

## 前置条件

**1.** 在操作之前保证[系统配置](../../../user-guide/system-configuration)已经配置完全。

**2.** 用户须属于组织层，且为组织管理员角色。

## 创建应用模板

**第一步：** 使用组织管理员的角色登录Choerodon系统，此时进入平台Dashboard界面，点击选择项目，弹出组织/项目选择界面。

    
**第二步：** 点击组织`choerodon`。

**第三步：** 进入`应用管理`后，点击`应用模板`。

 ![enter app template](/docs/quick-start/image/Application_template.gif)

**第四步：** 进入`应用模板`页面后，点击`创建应用模板`，系统会从右侧滑出创建应用模板页面，输入应用模板编码、应用模板名称、应用模板描述和选择应用模板的来源模板。例如：   

- 编码：choerodon-app-temp  
- 名称：猪齿鱼应用模板  
- 描述：猪齿鱼应用模板示例    


    ![create app template](/docs/quick-start/image/Create_template.png)   

    ![fill app template](/docs/quick-start/image/Create_template2.png)
    
    字段名 |说明 
    ---|---
    编码 | 应用模板的编码 | 
    名称 | 应用模板的名称 | 
    描述 | 应用模板的描述 | 
    复制于 | 应用模板的来源模板，选择并复制当前列表内的一个已有模板 | 
    
    
       


**第五步：** 当应用模板创建成功，可在`应用管理`模块，点击`应用模板` 界面查看到新建的应用模板。

**第六步：** 在创建应用的同时，系统会对应在`Gitlab`中创建一个仓库，选择`应用管理`点击`应用模板`，找到创建好的应用模板，点击`地址`，链接到`Gitlab`新建的仓库。

![check app template](/docs/quick-start/image/check_app_template.png)
 
## 开发应用模板

应用创建完成之后，可以视具体情况修改模板内容。以后端模板为例，具体的操作步骤如下：

 **第一步：** 编写一个 dockerfile：
 
    目录结构如下：
 
    ```
    |--src
    |--main 
       ｜--docker        
          ｜--dockerfile
    ```
    
    dockerfile 文件内容

    ```
    FROM registry.choerodon.io/choerodon-cloud/base

    COPY app.jar /app.jar

    ENTRYPOINT [ "java", "-jar", "/app.jar"] 
    ```
    
    此为后端模板的 dockerfile，应视模板具体语言的对其进行修改。

 **第二步：** [编写 Gitlab-ci 文件](https://docs.gitlab.com/ee/ci/)

      ```yaml
      image: registry.cn-hangzhou.aliyuncs.com/choerodon-tools/cibase:0.6.0
             
      stages:
        - mvn-package # mvn-package 这一阶段为后端应用需要的 ci 阶段，可根据模板具体情况进行修改
        - docker-build # docker-build 为 Choerodon 构建镜像版本等的必要步骤，不建议修改
      
      maven-test-build:
        stage: mvn-package
        script:
          - update_pom_version
          - mvn package -U -DskipTests=false
          - mkdir -p /cache/${CI_PROJECT_NAME}-${CI_PROJECT_ID}-${CI_COMMIT_REF_NAME}-${CI_COMMIT_SHA} 
          - cp target/app.jar /cache/${CI_PROJECT_NAME}-${CI_PROJECT_ID}-${CI_COMMIT_REF_NAME}-${CI_COMMIT_SHA}/app.jar
      
      docker-build:
        stage: docker-build
        script:
          - docker_build
          - chart_build
        only:
          - master
          - tags
          - develop
          - /^hotfix-.*$/
          - /^release-.*$/
      
      .auto_devops: &auto_devops |
          curl -o .auto_devops.sh \
              "${CHOERODON_URL}/devops/ci?token=${Token}&type=microservice"
          if [ $? -ne 0 ];then
            cat .auto_devops.sh
            exit 1
          fi
          source .auto_devops.sh
          function docker_build(){
              cp /cache/${CI_PROJECT_NAME}-${CI_PROJECT_ID}-${CI_COMMIT_REF_NAME}-${CI_COMMIT_SHA}/app.jar ${1:-"src/main/docker"}/app.jar || true
              docker login -u ${DOCKER_USER} -p ${DOCKER_PWD} ${DOCKER_REGISTRY}
              docker build --pull -t ${DOCKER_REGISTRY}/${GROUP_NAME}/${PROJECT_NAME}:${CI_COMMIT_TAG} ${1:-"src/main/docker"}
              docker push ${DOCKER_REGISTRY}/${GROUP_NAME}/${PROJECT_NAME}:${CI_COMMIT_TAG}
              rm -rf /cache/${CI_PROJECT_NAME}-${CI_PROJECT_ID}-${CI_COMMIT_REF_NAME}-${CI_COMMIT_SHA}
          }
      
      before_script:
        - *auto_devops
      ```



**第三步：** [编写 charts 模块](../../development-guide/basic/helm-chart)

      
      目录结构如下：
      ```
      |--charts
         ｜--model-service    
            ｜--templates               
            ｜ ｜--_helper.tpl
            ｜ ｜--deplopment.yaml
            ｜ ｜--pre-config-congig.yaml
            ｜ ｜--pre-config-db.yaml
            ｜ ｜--service.yaml
            ｜--.helmignore
            ｜--Chart.yaml
            ｜--values.yaml  
      ```
      
      Choerodon 会在使用模板创建应用时，对文档的相关变量进行替换。例如，charts 文件夹下的 model-service 文件夹的名称，会替换为对应的应用名称。
      
      `templates`为模板文件，将模板文件渲染成实际文件，然后发送给 Kubernetes。
      
      `values.yaml`为模板的预定义变量。                      
      
      `Chart.yaml`包含 chart 的版本信息说明，您可以从模板中访问它。
      
      `deployment.yaml`：创建 Kubernetes 部署的基本清单。

      `service.yaml`：为您的部署创建服务端点的基本清单。

      `_helpers.tpl`：放置模板助手的地方，您可以在整个 chart 中重复使用。
      
**第四步：** 提交改动至 `master` 分支。通过这些步骤，便能快速的在Choerodon里创建应用模板了。

## 相关文档  

- [系统配置](../../../user-guide/system-configuration)  

- [应用模板](../../../user-guide/application-management/application-template/)

- [编写 charts 模块](../../../development-guide/basic/helm-chart)

- [GitLab Continuous Integration (GitLab CI/CD)](https://docs.gitlab.com/ee/ci/)
