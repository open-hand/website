+++
title = "创建一个微服务后端服务"
description = ""
weight = 3
type = "docs"
+++

## 概述

微服务后端(Microservice)的架构模式是将传统的单体应用拆分成多个小型服务，每个小型服务可以独立的编译和部署，服务之间的调用通过HTTP的restfull API方式进行通讯。它们彼此之间相互协作，作为一个整体对外开放。微服务后端采用SpringBoot、SpringCloud 作为微服务的开发框架，利用丰富的文档、社区活跃和一套完整的微服务框架解决方案提供技术支持。

### 目标

本章节将从创建微服务后端、开发微服务后端、生成版本、发布服务、部署服务、查看运行信息等方面介绍，让读者能够熟悉使用Choerodon创建微服务后端服务的步骤和流程，并且学会如何利用Choerodon发布版本和部署服务等。

### 目录

   - [创建微服务后端](#1)  
   - [开发微服务后端](#2)
   - [生成版本](#3)
   - [发布服务](#4)
   - [部署服务](#5)
   - [查看运行信息](#6)
 
---
## 前置条件

- <font>在操作之前保证[系统配置](../../user-guide/system-configuration)已经配置完全。</font>

<h2 id="1">创建微服务后端</h2>

使用``项目所有者``或者``源代码管理员``的角色登录Choerodon系统，选择新建的项目``DevOps``,点击菜单栏``开发管理``，选择``服务``，进入服务管理页面，在服务管理中``创建``服务。系统会弹出模态框，在框中输入**服务编码、服务名称和服务组**，选择**服务类型**，点击创建，即可创建一个微服务后端服务。

例如，

服务编码：`order-service`

服务名称：`订单服务`

服务组: `io.choerodon.test`

> `服务编码`输入只能包含小写字母、数字、中划线(-)、英文句号(.)和反斜杠(\)，``服务名称``输入最大64个字符，`服务组`输入不能包含中文或大写字母,不能以'.'开头或结尾。

当服务创建成功，可以在服务列表查看到新建的服务。点击 ``仓库地址`` ，链接到gitlab新建的仓库。

> Gitlab 仓库的名称是 ``order-service``，是服务编码。
 
<h2 id="2">开发微服务后端</h2>

服务创建完成之后，开发微服务后端。具体的操作步骤如下：

1. 创建Feature分支。

    进入到服务管理界面，搜索服务编码``order-service``,选择这行记录，点击右侧``详情``，进入到服务详情界面，点击``分支管理``，点击``创建Feature``按钮，会弹出模态框，输入分支名称，例如`1001`。详情参考[分支管理](../../user-guide/continuous-integration#2)。

1. 克隆代码到本地。

1. 克隆成功之后，进入项目根目录，打开git bash,输入命令`git checkout feature-1001`,切换到新建分支feature-1001，并在此分支进行开发。

1. 开发项目。
    
    gitlab仓库克隆下来的项目就是一个简单的微服务，开发人员可以根据具体的业务需求进行开发。这里主要讲述.gitlab-ci.yml和.deploy.yml文件。如果一个服务要部署在Choerodon系统，这2个文件必不可少。

    GitLab提供可持续集成服务。只要在你的仓库根目录 创建一个.gitlab-ci.yml 文件， 并为该项目指派一个Runner，当有合并请求或者 push的时候就会触发build。.gitlab-ci.yml 文件定义GitLab runner要做哪些操作，默认有3个[stages(阶段)]: build、test、deploy，开发人员可以根据不同的情况进行自定义。以下面为例子。

```yaml
#基础镜像，提供mvn、docker命令以及自定义的文件
image: registry.saas.hand-china.com/tools/devops-ci:1.0.1

#表示构建阶段，下面定义了3个阶段。所有 Stages 会按照顺序运行，即当一个 Stage 完成后，下一个 Stage 才会开始
#只有当所有 Stages 完成后，该构建任务 (Pipeline) 才会成功
#如果任何一个 Stage 失败，那么后面的 Stages 不会执行，该构建任务 (Pipeline) 失败
stages:
- maven-build
- docker-build
- web-hook

unit-test-branches: #job的名字,允许你创建无限个jobs,每个job必须有一个独一无二的名字，而且不能是ci的关键字
stage: maven-build  #执行阶段
script:  #job执行的脚本
    - unit_test  #具体实现参考下面方法
only:  #表示job触发条件，表示只有feature分支才能触发。
    - /^feature-.*$/

maven-unit-test:
stage: maven-build
script:
    - update_pom_version
    - maven_build
only:
    - develop
    - /^release-.*$/
    - /^hotfix-.*$/
    - tags

docker-build:
stage: docker-build
script:
    - docker_build
only:
    - develop
    - /^release-.*$/
    - /^hotfix-.*$/
    - tags

notification:
stage: web-hook
script:
    - devops_ci_notification  #自定义可执行的二进制文件，主要作用是将.deploy.yml文件里的数据转成json格式，调用API，生成一条服务版本。
only:
    - develop
    - /^release-.*$/
    - /^hotfix-.*$/
    - tags

.auto_devops: &auto_devops |
export CI_TAG_SUF=$(echo $CI_COMMIT_REF_NAME | awk -F '-' '{print $1}')
export CI_TAG_PRE=$(echo $CI_COMMIT_REF_NAME | awk -F '-' '{print $2}')
export CI_COMMIT_TIME=$(git log -1 --pretty=format:"%ci" | awk '{print $1$2}' | sed 's/[-:]//g')
if [ ! $CI_TAG_PRE ]; then
    export CI_APPLICATION_TAG=$CI_TAG_SUF.$CI_COMMIT_TIME
else
    export CI_APPLICATION_TAG=$CI_TAG_PRE-beta.$CI_COMMIT_TIME.$CI_TAG_SUF
fi
if [ ! $CI_COMMIT_TAG ]; then
    export CI_COMMIT_TAG=$CI_APPLICATION_TAG
fi

function update_pom_version(){
    find . -name pom.xml | xargs xml ed \
        -L -N x=http://maven.apache.org/POM/4.0.0 -u '/x:project/x:version' -v "${CI_COMMIT_TAG}"
    find . -name pom.xml | grep -v "\./pom.xml" | xargs xml ed \
        -L -N x=http://maven.apache.org/POM/4.0.0 -u '/x:project/x:parent/x:version' -v "${CI_COMMIT_TAG}" 2>/dev/null || true
}

function unit_test() {
    git config user.name $GITLAB_USER_NAME
    git config user.email $GITLAB_USER_EMAIL
    git checkout origin/develop
    git merge $CI_COMMIT_SHA --no-commit --no-ff
    mvn package -U -DskipTests=false
    mvn --batch-mode verify sonar:sonar \
        -Dsonar.host.url=$SONAR_URL \
        -Dsonar.analysis.mode=preview \
        -Dsonar.gitlab.commit_sha=$CI_COMMIT_SHA \
        -Dsonar.gitlab.ref_name=$CI_COMMIT_REF_NAME \
        -Dsonar.gitlab.project_id=$CI_PROJECT_ID \
        -Dsonar.gitlab.user_token=$SONAR_TOKEN || true
}

function maven_build() {
    mvn package -U -DskipTests=false
    cat target/site/jacoco/index.html || true
    mvn --batch-mode verify sonar:sonar \
        -Dsonar.host.url=$SONAR_URL \
        -Dsonar.analysis.serviceGroup=$SERVICE_GROUP \
        -Dsonar.analysis.commitId=$CI_COMMIT_SHA || true
    mkdir -p $HOME/.m2/$CI_COMMIT_SHA
    cp target/app.jar $HOME/.m2/$CI_COMMIT_SHA/app.jar
}

function docker_build() {
    cp $HOME/.m2/$CI_COMMIT_SHA/app.jar src/main/docker/app.jar
    # docker login -u gitlab-ci-token -p $CI_JOB_TOKEN $REGISTRY_ADDRESS
    docker login -u $REGISTRY_USER -p $REGISTRY_PWD $REGISTRY_ADDRESS
    docker build --pull -t $REGISTRY_ADDRESS/$PROJECT_NAME/$APPLICATION_NAME:$CI_COMMIT_TAG src/main/docker
    docker push $REGISTRY_ADDRESS/$PROJECT_NAME/$APPLICATION_NAME:$CI_COMMIT_TAG
    rm -rf $HOME/.m2/$CI_COMMIT_SHA
}

#用来定义 所有的jobs开始之前执行的命令
before_script:
- *auto_devops
```

.deploy.yml文件介绍，通过下面事例进行简单讲解。
```yaml
# Api服务版本
apiVersion: devops/v1alpha2
# 服务类型
kind: MicroService
# 服务所属分组
group: io.choerodon.test
# 服务代码
code: order-service
# 服务名称
name: 订单服务
# 服务版本，该值不需要填写，在CI中会自动生成
version: ${VERSION}
# 在构建镜像阶段生成的镜像地址，该值不需要填写，在CI中会自动生成
image: registry.digital.saas.carllhw.com/devops/order-service:${IMAEG_TAG}
# Git Commit ID，该值不需要填写，在CI中会自动生成
commit: ${COMMIT}

# 如要开放在网关进行访问，则添加该属性，如不需要删除即可
gatewayPath: "/test/**"

# 依赖服务列表
services:
# 依赖的服务类型
- kind: MicroService
# 依赖的服务所属组
group: com.hand.hapcloud
# 依赖的服务代码
code: hap-register-server
# 是否必要
require: 1
- kind: MicroService
group: com.hand.hapcloud
code: hap-api-gateway
require: 1
- kind: MicroService
group: com.hand.hapcloud
code: hap-config-server
require: 1
- kind: MicroService
group: com.hand.devops
code: hap-gitlab-service
require: 1
- kind: MicroService
group: com.hand.hapcloud
code: hap-user-service
require: 1

# 定义环境变量列表，此处声明的环境变量可以在部署服务时在界面上进行重新赋值
vars:
# 环境变量名称，该值对应下面stages列表中各需填充的属性
- name: SPRING_PROFILES_ACTIVE
# 环境变量描述
description: springProfiels
# 默认值，该值对应下面stages列表中各需填充的属性值
value: sit
- name: SPRING_CLOUD_CONFIG_DISCOVERY_SERVICE_ID
description: configServer
value: hap-config-server
- name: SPRING_CLOUD_CONFIG_DISCOVERY_ENABLED
description: isConfigEnabled
value: "true"

# 依赖资源列表
resources:
# 自定义资源名称，该值对应下面stages列表中各需填充的属性值
- name: db
# 资源类型
type: mysql
- name: userdb
type: mysql
- name: rabbitmq
type: rabbitmq
- name: configdb
type: mysql
- name: eureka
type: url
- name: kafka
type: url

# 部署阶段
stages:
# 该阶段名称
- name: 初始化数据库
# 该阶段类型
type: PrepareDB
# 该阶段描述
description: "初始化当前服务数据库和用户服务数据库"
# 配置信息
config:
# 数据库列表
db:
    # 自定义名称
- name: 初始化当前服务数据库
    # 这里的db对应上面依赖资源列表中的db,HOST则为db的属性
    host: "{{ db.HOST }}"
    port: "{{ db.PORT }}"
    schema: "{{ db.SCHEMA }}"
    username: "{{ db.USERNAME }}"
    password: "{{ db.PASSWORD }}"
    # 指定数据源
    dataJar: /app.jar
- name: 初始化用户服务数据库
    host: "{{ userdb.HOST }}"
    port: "{{ userdb.PORT }}"
    schema: "{{ userdb.SCHEMA }}"
    username: "{{ userdb.USERNAME }}"
    password: "{{ userdb.PASSWORD }}"
    # 指定数据源，这里与上面dataJar属性二选一
    dataDir: /hap-user-service-db
- name: 初始化配置
type: ConfigJob
description: "初始化配置信息"
config:
# 数据库列表
db:
    # 自定义名称
- name: 初始化当前服务数据库
    # 这里的db对应上面依赖资源列表中的configdb,HOST则为configdb的属性
    host: "{{ configdb.HOST }}"
    port: "{{ configdb.PORT }}"
    schema: "{{ configdb.SCHEMA }}"
    username: "{{ configdb.USERNAME }}"
    password: "{{ configdb.PASSWORD }}"
    # 指定数据源
    configFile: application-deploy.yml
- name: 部署
type: Deploy
description: "部署当前服务"
config:
# 服务端口号
port: 8060
# 服务管理端口
managementPort: 8061
# 服务运行时会用到的环境变量列表，name为环境变量名
env:
- name: SPRING_DATASOURCE_URL
    # 引用resources列表中资源值
    value: "jdbc:mysql://{{ db.HOST }}:{{ db.PORT }}/{{ db.SCHEMA }}?useUnicode=true&characterEncoding=utf-8&useSSL=false"
- name: SPRING_DATASOURCE_USERNAME
    value: "{{ db.USERNAME }}"
- name: SPRING_DATASOURCE_PASSWORD
    value: "{{ db.PASSWORD }}"
- name: SPRING_PROFILES_ACTIVE
    # 应用Vars列表中的环境变量
    value: "{{ vars.SPRING_PROFILES_ACTIVE }}"
- name: SPRING_CLOUD_CONFIG_DISCOVERY_SERVICE_ID
    value: "{{ vars.SPRING_CLOUD_CONFIG_DISCOVERY_SERVICE_ID }}"
- name: SPRING_CLOUD_CONFIG_DISCOVERY_ENABLED
    value: "{{ vars.SPRING_CLOUD_CONFIG_DISCOVERY_ENABLED }}"
- name: EUREKA_DEFAULT_ZONE
    value: "{{eureka.HOST}}"
- name: SPRING_RABBITMQ_HOST
    value: "{{rabbitmq.HOST}}"
- name: EVENT_CONSUMER_KAFKA_BOOTSTRAP_SERVERS
    value: "{{kafka.HOST}}"
```

1. 单元测试。

    进入项目根目录，打开命令窗口，输入命令mvn package -U -DskipTests=false，检查单元测试是否通过。

1. 提交代码。    

    ```bash
    # 将本地代码变动提交到暂存区
    git add .
    # 提交代码并且为本次提交添加 commit 信息
    # 注：[FIX]修改bug  [ADD]新增  [IMP]完善  [DEL]删除
    $ git commit –m “[ADD]readme: 新增代码示例”
    # 将本地提交推送至远程仓库对应分支
    $ git push origin feature-1001:feature-1001
    ```

1. 运行CI，基于feature分支，具体执行细节请看上面.gitlab-ci.yml文件。进入服务详情，点击``流水线``,查看ci执行情况。

    ![](../assets/microservice-backend/流水线.jpg) 

1. 进入服务详情页面，点击`分支管理`，在分支列表找到`feature-1001`，点击`结束`分支。


<h2 id="3">生成版本</h2>

1. 结束分支之后，`feature-1001`分支的代码会合并到`develop`分支，并触发Gitlab CI。进入服务详情，点击``流水线``,查看CI执行情况。CI阶段具体执行细节参考.gitlab-ci.yml文件。

    CI流程有三个阶段。1.单元测试，编译打包，代码质量检查；2.构建docker镜像；3.创建服务版本。

    ![](../assets/microservice-backend/流水线1.jpg) 

1. 进入服务详情，点击`服务版本`，确定服务版本已经生成。

<h2 id="4">发布服务</h2>

服务版本成功生成后，使用`项目所有者`、`源代码管理员`和`项目成员`的任一角色就可以将服务发布到不同的环境。发布之前确定环境可以连接测试成功，关于环境的配置信息请参考[环境配置](../../user-guide/system-configuration#5)。具体的操作步骤如下：

1. 点击菜单栏`开发管理`，选择`服务`，进入服务管理页面，搜索服务编码`order-service`,选择这行记录，点击右侧`详情`，进入到服务详情界面，点击服务版本查看生成的服务版本。

1. 点击菜单栏`发布`，进入到服务发布界面，查看到服务版本，点击右侧`发布`，系统会弹出模态框，输入你要发布到哪个环境，点击`保存`。发布成功后，右侧边栏会显示服务基本信息和发布环境。

    ![](../assets/microservice-backend/已发布环境信息.jpg) 

1. 在服务详情页面，设置服务`自动发布`，下一次CI执行完成后生成的服务版本会自动发布到已配置的环境。[自动发布配置](../../user-guide/continuous-integration#6)

<h2 id="5">部署服务</h2>

1. 确认部署时需要使用的资源已配置完全。[资源配置](../../user-guide/continuous-deployment#1)

1. 使用``部署管理员``的角色登录Choerodon系统，选择``运营组织``,在菜单栏选择``部署管理``，在``部署管理``下面选择``服务``，进入服务管理页面，搜索`order-service`服务，点击右侧`详情`，进入到服务版本界面。

1. 点击`服务版本`，选择要部署的服务版本，点击右侧`部署服务`，进入到部署界面，选择资源，点击`部署`。

> 注：服务第一次部署需要自己手动填写资源，再次部署页面会显示上一次部署选择的资源。选择资源一定要谨慎，选择错误严重会导致数据库数据丢失。

<h2 id="6">查看运行信息</h2>

1. 进入服务管理页面，搜索`order-service`服务，点击右侧`详情`，进入到服务版本界面，点击`运行中`，可以查看运行中的版本。
那么如何判断这个服务版本已经部署成功？当可用容器数量、当前容器数量、期望容器数量都为1时，代表该服务版本已经部署成功了。期望容器数量的加减实际是对kubernetes的pod数量的加减，例如期望容器数量为2，代表kubernetes启动了2个pod，如果其中一个故障了，还能保证程序正常使用，目前期望容器数量不可为0。

1. 在服务版本界面，点击`运行中`，点击服务版本右侧的`详情`，进入到部署详情界面。点击`部署阶段`可以查看到阶段信息，点击`日志`可以查看到每个阶段的日志信息。点击`详情`可以查看到服务部署在kubernetes上的信息。