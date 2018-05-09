+++
title = "创建一个前端应用"
description = ""
weight = 2
+++

# 创建一个前端应用
---

## 概述

就前端主流技术框架的开发而言，过去几年里发展极快，在填补原有技术框架空白和不足的同时也渐渐趋于成熟。未来前端在已经趋向成熟的技术方向上面会慢慢稳定下来，并进入技术迭代优化阶段，但这并不代表前端领域技术就此稳定了，因为新的技术方向已经出现，并在等待下一个风口的到来。可能是虚拟现实也有可能是人工智能或者其他。

Choerodon 使用 React 和 MobX 作为前端的UI应用框架，并且对前端的展示做了一定的封装和处理，能够让用户方便快捷地进行前端应用的开发和部署。React 和 MobX都提供了最优和独特的解决方案。React 提供了优化UI渲染的机制， 这种机制就是通过使用虚拟DOM来减少昂贵的DOM变化的数量。MobX 提供了优化应用状态与 React 组件同步的机制，这种机制就是使用响应式虚拟依赖状态图表，它只有在真正需要的时候才更新并且永远保持是最新的。

## 目标

本章节将从创建前端应用、开发前端应用、生成版本、部署应用、配置网络、配置域名等方面介绍，让读者能够熟悉使用Choerodon创建前端应用的步骤和流程，并且学会如何利用Choerodon创建并部署前端应用。


## 前置条件

- <font>在操作之前保证[系统配置](../../user-guide/system-configuration)已经配置完全。</font>

- <font>完成[创建项目](../project)，本章节使用在前面章节创建的项目`猪齿鱼研发`。</font>

<h2 id="1">创建前端应用</h2>

1. 使用项目所有者或者源代码管理员的角色登录Choerodon系统，选择项目``猪齿鱼研发``；
2. 选择`持续交付`模块，点击`应用`，进入应用管理页面；
3. 点击``创建应用``，系统会弹出窗口，在窗口中输入应用编码、应用名称和选择应用模板，点击`创建`按钮，即可创建一个前端应用；；

    a. 应用编码：choerodon-front 

     <blockquote class="warning">
       应用编码输入只能包含字母，数字，下划线，空格， '_', '.', "——",只能以字母，数字，下划线开头。
     </blockquote>
   
    b. 应用名称：猪齿鱼前端应用

    c. 选择应用模板: MicroServiceUI
    <blockquote class="note">
        当应用模板不符合您的要求，你可手动创建一个应用模板。具体步骤如下：
    </blockquote>
    
      第一步：在组织层的`持续交付`模块，选择`应用模板`；

      第二部：点击`创建应用模板`，输入相关信息，点击`创建`，即可创建一个模板；
      
      第三部：创建完成以后，会生成一个Gitlab地址，点击该地址；
     
      第四部：进入Gitlab仓库，克隆代码；
      
      第五步：[创建一个spring-boot项目](../../development-guide/backend/demo/create_project)；
   
      第六步：编写一个dockerfile；

      ```shell
      FROM registry.choerodon.io/choerodon-cloud/base

      COPY app.jar /app.jar

      ENTRYPOINT [ "java", "-jar", "/app.jar" 
      ```

      第七步：[编写gitlab-ci文件](http://eco.hand-china.com/doc/hip/latest/user_guide/integrated_deployment.html)
     
         image: registry.choerodon.io/tools/devops-ci:1.1.0    
     
       image指ci运行基础镜像


         stages:
  
         - maven-package
  
         - docker-build  

       stages指包含 maven-package 和docker-build两个阶段
         
         maven-test-feature:
  
         stage: maven-package
  
         script:
    
           - git_merge develop
    
           - update_pom_version
    
           - mvn package -U -DskipTests=false
    
           - mvn --batch-mode verify sonar:sonar -Dsonar.host.url=${SONAR_URL}- Dsonar.analysis.mode=preview -Dsonar.gitlab.commit_sha=${CI_COMMIT_SHA} -Dsonar.gitlab.ref_name=${CI_COMMIT_REF_NAME} -Dsonar.gitlab.project_id=${CI_PROJECT_ID}
  
         only:
    
           - /^feature-.*$/
     
       maven-test-feature指job名称
       
       stage指对应的阶段
       
       only指触发的分支

        .auto_devops: &auto_devops |
    
              curl -o .auto_devops.sh \
        
                  "${CHOERODON_URL}/devops/ci?token=${Token}&type=microservice"
    
              source .auto_devops.sh

       .auto_devops: 从指定仓库地址中拉取script脚本  用于docker-build阶段
        
        before_script:
  
          - *auto_devops
       before_script: ci执行前所执行的命令

      第八步：编写charts模块
      
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
      
      第九步：提交代码

4. 当应用创建成功，可在应用管理界面查看到新建的应用；

5. 在创建应用的同时，系统还会在Gitlab中创建一个仓库，点击 ``仓库地址`` ，链接到Gitlab新建的仓库；
    <blockquote class="note">
        Gitlab 仓库的名称是 choerodon-backend，为应用编码。
    </blockquote>
  
<h2 id="2">开发前端应用</h2>

应用创建完成之后，开发前端应用。具体的操作步骤如下：

　1、 创建Feature分支。

- 点击`应用`，进入到应用管理界面，选择`猪齿鱼前端应用`，点击右侧`分支管理`；

![](/img/docs/quick-start/assets/microservice-front/分支管理.jpg)

- 点击`创建分支`；

- 系统弹出侧边栏，填写字段； 
    <blockquote class="warning">
    字段填写输入包含字母、数字、'——'、'_'），如feature-1
    </blockquote>

- 点击创建按钮，即可创建一个名称为`feature-1`的分支。
 
　２、 在存放代码的文件夹下，打开git bash,输入命令`git clone [仓库地址]`，拉取所需应用的代码仓库。

　３、 克隆成功后，进入项目根目录，打开git bash，输入`git checkout feature-1`，切换到新建分支feature-1，在此分支进行开发。
   
      ```shell
       $ git checkout feature-1
      ```
　４、提交代码。   

    ```shell
    # 将本地代码变动提交到暂存区
    $ git add .
    # 提交代码并且为本次提交添加 commit 信息
    # 注：[FIX]修改bug  [ADD]新增  [IMP]完善  [DEL]删除
    $ git commit –m “[ADD]readme: 新增代码示例”
    # 将本地提交推送至远程仓库对应分支
    $ git push origin feature-1:feature-1
    ```
　５、基于feature分支运行CI。点击`CI流水线`,查看 CI 执行情况。

　６、点击`应用`，进入应用管理，点击应用编码`choerodon-front`的`分支管理`，在分支列表找到`feature-1`，点击`结束分支`。


<h2 id="3">生成版本</h2>

 应用版本是代码提交的历史记录，每提交一次修改后的代码，对应生成一个新的版本。具体的操作步骤如下：

1. 结束分支之后，`feature-1`分支的代码会合并到`develop`分支，并触发Gitlab CI。点击``CI流水线``，
查看CI执行情况。
<blockquote class="note">
        Choerodon 缺省的 CI 流程有三个阶段:
        <ul>
            <li>单元测试，编译打包，代码质量检查</li>
            <li>构建docker镜像</li>
            <li>创建应用版本</li>
        </ul>
    </blockquote>

2. CI运行完成以后，点击`应用版本`进行查看，确定应用版本已经生成。


<h2 id="4">部署应用</h2>

  提供可视化、一键式部署应用，支持并行部署和流水线无缝集成，实现部署环境标准化和部署过程自动化。

- 使用部署管理员的角色登录Choerodon系统，选择项目``猪齿鱼研发``；

- 在菜单栏选择`应用部署`，进入应用部署界面，点击`部署应用`；
     
     a. 选择应用：刚才创建的应用，choerodon-front

     b. 选择版本：刚才所创建的应用版本

     c. 选择环境: 选择所要部署的环境

     d. 配置信息：配置部署应用所需的信息

     e. 部署模式：新建实例（新建一个应用）
                  替换实例（新建一个实例，将旧实例替换）

<h2 id="4">配置网络</h2>

  为所选的应用配置网络。

- 在`持续交付`模块中选择`网络`，进入网络配置界面，点击`创建网络`

     a. 环境名称：选择要部署的环境
    
     b. 应用名称：刚才创建的应用，猪齿鱼前端应用
    
     c. 版本：选择刚才创建的应用版本
    
     d. 实例：选择刚才创建的实例

     e. 网络名称：系统默认一个网络名称（可手动修改）

     f. 外部IP：需要外网时填写

     g. 端口号：应用开放端口

<h2 id="4">配置域名</h2>
  
  为所选的应用配置域名。
  
- 在`持续交付`模块中选择`域名`，进入域名管理界面，点击`创建网络`
     
     a. 域名名称：测试域名
  
     b. 域名地址：填写域名地址，如choerodon.io
    
     c. 环境名称：选择要部署的环境

     d. 路径：choerodon-front
  
     e. 网络：选择配置的网络


<h2 id="5">查看运行信息</h2>

进入持续交付模块，选择应用部署，点击部署应用即可查看运行状态。有四种查看视图，分别为：部署实例、单环境单应用、多应用。

那么如何判断这个应用版本已经部署成功？当可用容器数量、当前容器状态为1时，代表该应用版本已经部署成功了。
 在应用版本界面，右侧的`查看部署详情`，进入到查看部署详情界面。点击`部署详情`可以查看到阶段信息及日志。


<h2 id="5">产品迭代</h2>

任何产品几乎都会经历产品的初创期、成长期、成熟期。在产品的初创期，需要通过快速试错探索出有用户黏性的功能；探索成功之后，就需要快速导入用户，这时候也会产生新的需求和新的问题，不断去完善产品；在产品的相对成熟期，则可以考虑产品的变现，和新功能的延展，以提升用户活跃。因此，当一个产品开发完成上线后，产品的周期化迭代就变得非常重要。固定的周期有助于为项目团队形成规范，从而提高开发效率。

Choerodon第一次发版前就准备好下个版本的需求。一般第一个版本上线后，开发人员就进入下一个版本的开发和测试。这样当问题暴露的时候，就可以迅速解决问题，优化到某个程度后，再放缓迭代节奏，这样就能更好的平衡好需求。

