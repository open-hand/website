+++
title = "创建一个应用模板"
description = "创建应用模板的介绍"
weight = 22
type = "docs"

+++

# 创建一个应用模板

## 概述

[应用模板](../../user-guide/application-management/application-template/)是将同类型应用的代码库结构整理成模板，用于创建应用时能引用相应模板快速创建初始代码库。您也可以根据实际情况自定义应用模板。

## 目标

本章节将从创建应用模板介绍，让读者能够熟悉使用Choerodon创建应用模板的步骤和流程，并且学会如何利用模板创建应用等。

## 前置条件

1. 在操作之前保证[系统配置](../../user-guide/system-configuration)已经配置完全。

1. 用户必须属于组织层。

## 创建应用模板

1. 使用组织管理员的角色登录Choerodon系统，系统会默认一个组织，点击该组织，弹出组织/项目选择界面。

1. 点击组织`choerodon`，选择`应用管理`模块。

1. 进入`应用管理`后，点击`应用模板`。

1. 进入`应用模板`页面后，点击`创建应用模板`，系统会从右侧滑出创建应用模板页面，输入应用模板编码、应用模板名称、应用模板描述和选择应用模板的来源模板。

    字段名 |说明| 输入值
    ---|---|--- 
    编码 | 应用模板的编码 | `choerodon-app-temp`
    名称 | 应用模板的名称 | `猪齿鱼应用模板`
    描述 | 应用模板的描述 | `猪齿鱼应用模板示例`
    复制于 | 应用模板的来源模板，选择并复制当前列表内的一个已有模板 | 
     
1. 当应用模板创建成功，可在`应用管理`模块，点击`应用模板` 界面查看到新建的应用模板。

1. 在创建应用的同时，系统会对应在`Gitlab`中创建一个仓库，选择`应用管理`点击`应用模板`，找到创建好的应用模板，点击`地址`，链接到`Gitlab`新建的仓库。
 
## 开发应用模板

应用创建完成之后，可以视具体情况修改模板内容。以后端模板为例，具体的操作步骤如下：

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

    ```yaml
    image: registry.cn-hangzhou.aliyuncs.com/choerodon-tools/cibase:0.6.0
           
    stages:
      - mvn-package
      - docker-build
    
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
            docker build --pull -t ${DOCKER_REGISTRY}/${GROUP_NAME}/${PROJECT_NAME}:${CI_COMMIT_TAG} ${1:-"src/main/docker"}
            docker push ${DOCKER_REGISTRY}/${GROUP_NAME}/${PROJECT_NAME}:${CI_COMMIT_TAG}
            rm -rf /cache/${CI_PROJECT_NAME}-${CI_PROJECT_ID}-${CI_COMMIT_REF_NAME}-${CI_COMMIT_SHA}
        }
    
    before_script:
      - *auto_devops
    ```

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
      
 1. 提交改动至 `master` 分支。

## 总结

通过上述的步骤，就可以很快速的在 `Choerodon` 中创建应用模板。  