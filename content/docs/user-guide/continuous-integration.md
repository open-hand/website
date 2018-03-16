+++
title = "持续集成"
description = ""
weight = 4
+++

# 持续集成
  
  持续集成（Continuous Integration，简称CI）是指开发过程中不断集成团队成员的代码，每次集成都可以通过自动化构建来实现，因此为开发人员节省大量的时间，让他们能更专注于实现业务逻辑。
  
  本页面介绍了研发团队在完成[敏捷管理](../scrum)后进行产品开发时，如何管理服务、如何使用Git-Flow模型进行分支管理、如何查看持续集成流水线、如何管理服务版本、如何了解代码质量及如何进行服务发布。
  
  持续集成基本由敏捷开发团队所有成员完成，包括项目所有者、源代码管理员、项目成员。每个模块都包含其概念定义、主要功能及其他注意事项。使用本页面，你可以了解：

   - [服务管理](#1)
   - [分支管理](#2)
   - [流水线](#3)
   - [服务版本](#4)
   - [代码质量](#5)
   - [服务发布](#6)

  若您遇到无法访问对应功能，请联系对应负责人进行[系统配置](../system-configuration)，特别是[角色分配](../system-configuration#3)。

  若您完成代码开发及发布，可继续了解如何进行[持续部署](../continuous-deployment)。

<h2 id="1">服务管理</h2>
 
  服务是一部分功能的集合。一个系统可以被解耦成很多服务。每一个微服务都可以独立部署，每一个微服务仅关注于完成一部分任务，每部分任务代表一个小的业务模块，因此各服务之间关系是松耦合的。另外，每创建一个服务，系统会自动在gitlab创建好对应的group、默认分支及issue代码库。

  只有该项目的项目所有者和源代码管理员才能创建服务，项目成员仅能查看服务。
  
  - **菜单层次**：项目层
  - **菜单路径**：开发管理 > 服务
  - **默认角色**：项目所有者、源代码管理员、项目成员

### 服务类型

  **微服务**：微服务后端，可以定义依赖的资源和服务，部署时需配置网关。

  **Web前端**：微服务前端，部署时需配置域名。

  **移动**：移动端应用开发使用，部署流程与其他类型不同。

  **普通应用**：非微服务架构的服务类型，如HAP、HBI等，一个系统一个服务。

  **Java库**：管理Java工具包。

### 服务组

  服务组是用于区分服务的开发来源，因此创建服务时比填写此标识。

  可参考如下设置。

  项目名称 | 项目编码 | 服务组
  --- | --- | ---
  HAPCloud | hapcloud | com.hand.hapcloud
  DevOps | devops | com.hand.devops
  智能洞察 | insight | com.hand.insight
  敏捷看板 | kanban | com.hand.kanban
  移动应用 | mobile | com.hand.mobile
  应用框架 | hap | com.hand.hap
  云维开发 | cloopm | com.hand.cloopm

### 新建服务

 1. 点击 `创建` 按钮。

    ![](../assets/持续集成/创建服务.png)

 1. 输入 “服务编码” 、 “服务名称” 、以及 “服务组” ，并选择相应服务类型，点击 `创建` 按钮。

    ![](../assets/持续集成/服务创建.png)

 1. 新建服务 “微服务0201” 已在服务管理列表中。

    ![](../assets/持续集成/服务创建示意.png)

 1. gitlab已自动创建好对应服务类型的代码库 “webservice” 。点击 `仓库地址` ，可以查看该服务在gitlab的代码仓库。

    ![](../assets/持续集成/仓库地址.png)

    ![](../assets/持续集成/gitlab仓库.png)

### 停用/启用服务

 点击 `停用`，如： “微服务0201” 已停用，服务详情不可查看。 

  ![](../assets/持续集成/停用服务.png)

  ![](../assets/持续集成/停用服务示意.png)

 点击 `启用` ，如： “微服务0201” 已启用，可对该服务进行相关操作。

  ![](../assets/持续集成/启用服务.png)

  ![](../assets/持续集成/启用服务示意.png)

<h2 id="2">分支管理</h2>
  
  Choerodonc采用 `git-flow` 工作流模式，有`master`和`develop`两个默认分支。在持续交付过程中对 `feature`、`release`、`hotfix` 等分支进行管理。结束分支可自动触发分支合并和持续集成，可在[流水线](#3)查看代码集成情况。
  
  - **菜单层次**：项目层  
  - **菜单路径**：开发管理 > 服务 > 服务详情
  - **默认角色**：项目所有者、源代码管理员、项目成员

### 分支类型

 **Master**：默认分支，版本发布分支。
    
 **Develop**：默认分支，日常开发分支。  
 
 **Feature**：适用于日常开发、bug修复，基于开发分支生成，完成时合并至开发分支。

 **Release**：适用于产品发布、产品迭代，基于开发分支生成，完成时合并至主分支和开发分支，并打上标签。

 **Hotfix**：适用于产品发布后修复bug，基于主分支生成，完成时先合并至主分支和开发分支，并打上标签。

### 分支使用流程
 
 分支使用流程包括四个部分：新建分支、拉下分支至本地开发、开发完提交代码/解决冲突、结束分支。

 ![GitFlow 使用流程](../assets/持续集成/GitFlow使用流程.png)

### 新建分支

 1. 点击`创建Feature`/`创建Release`/`创建Hotfix`按钮，创建对应分支。

    ![创建 Feature 示意](../assets/持续集成/创建Feature.png)

    ![创建 Release/Hotfix 分支按钮示意](../assets/持续集成/创建Release.png)

 1. 输入`Issue`编码或版本号。点击`保存`按钮。
    
    `Feature`/`Hotfix` 分支创建时输入`Issue`编码作为分支名。
     
    ![输入 issue 编码示意图](../assets/持续集成/输入Issue.png)
   
    `Release` 分支创建时会自动生成下一个版本号，也可以手动输入需要的版本号。（版本号由三个数字组成，中间以小数点间隔。如：`1.1.0`。`Release` 版本号默认为末位清零，中间一位进一）。

    ![Release 分支版本号示意](../assets/持续集成/分支版本号示意.png)

### 结束分支
 
 1. `feature` 分支在结束时会合并生成对应的服务版本，版本号与创建时填写一致。

 2. `Release` 分支在结束时会生成对应的服务版本，版本号与创建时填写一致。

 3. `Hotfix` 分支在结束时会提示以最新版本的第三位加一作为版本号。如最新版本为`1.1.5`，则`hotfix`分支结束时生成新版本为`1.1.6`。

 >注：无提交时点击结束分支，将不创建合并请求，直接删除。
 
 >另外，新建分支及结束分支只能在平台界面进行操作，请勿随意在gitlab界面创建合并请求和删除分支。

### 示例：分支管理操作步骤

 1. 克隆代码到本地

    ```bash
    # 在存放代码的文件夹下执行以下命令，拉取所需服务的代码仓库
    git clone http://git.saas.hand-china.com/devops/hap-devops-service.git
    # 拉取远程仓库成功后进入仓库
    cd hap-devops-service
    ```

 1. 拉取最新代码和新建的分支

    ```bash
    git pull
    ```
 1. 切换到分支

    ```bash
    # 切换到新建分支，以 feature-2 为例
    git checkout feature-2
    ```
 1. 开发

    根据分支对应的 `Issue` 需求修改代码。  
    完成后详细检查本地代码改动。

 1. 提交代码

    ```bash
    # 将本地代码变动提交到暂存区
    git add .
    # 提交代码并且为本次提交添加 commit 信息
    # 注：[FIX]修改bug  [ADD]新增  [IMP]完善  [DEL]删除
    $ git commit –m “[ADD]readme: 新增代码示例”
    # 将本地提交推送至远程仓库对应分支
    $ git push origin feature-2:feature-2
    ```
 1. 界面操作结束分支

### 解决分支冲突

#### Feature 分支冲突

 常见两种解决冲突的方式如下

 - 本地修改代码解决：

    ```bash
    # 确保当前正在 Feature 分支上，以 feature-2 为例
    git checkout feature-2
    # 拉取最新远程仓库 develop 分支代码
    git fetch origin develop:develop
    # 将 Feature 分支重新设立起点于最新的 develop 代码
    git rebase develop
    ```
    执行完 `rebase` 操作后，会产生对应的冲突，解决冲突后执行如下代码。
    ```bash
    git add .
    git rebase --continue
    ```
    根据本次 `Feature` 分支上提交次数的不同，解决冲突可能会重复多次，只需要重复执行上述解决冲突操作。  
    完成后强制提交至远程仓库。
    ```bash
    git push -f origin feature-2:feature-2
    ```

 - 界面解决冲突（不建议）：

    在gitLab对应的合并请求界面点击 `Solve conficts` 按钮。

#### Release&Hotfix 分支冲突

 当分支对于 `develop` 和 `master` 分支中任意一个或以上存在冲突时，会提示当前存在冲突及建议做法。

 若此时继续点击`确定`按钮，并且没有**解决冲突**，那么会提示分支冲突，无法继续操作。
 
 解决冲突具体步骤可查看界面提示，说明如下：

  1. 只有对应 `develop` 的合并请求存在冲突，按界面提示解决冲突会导致分支对应 `develop` 分支的合并请求被合并。此时再进行**结束分支**操作，会处理分支对 `master` 的合并请求，然后生成对应版本号的 `Tag` 并删除分支。

  1. 只有对应 `master` 的合并请求存在冲突，按界面提示解决冲突会导致分支对应 `master` 分支的合并请求被合并。此时再进行**结束分支**操作，会处理分支对 `develop` 的合并请求，然后生成对应版本号的 `Tag` 并删除分支。

  1. 若分支对应 `develop` 和 `master` 分支的合并请求都存在冲突，按界面提示解决冲突会导致分支对应 `develop` 和 `master` 分支的合并请求依次都被合并。此时再进行**结束分支**操作，会生成对应版本号的 `Tag` 并删除分支。

<h2 id="3">流水线</h2>

流水线是持续集成过程中完成情况，包括状态、标识、创建者、提交、分支、提交者、阶段、时长及创建时间。

  - **菜单层次**：项目层
  - **菜单路径**：开发管理 > 服务> 服务详情 > 流水线
  - **默认角色**：项目所有者、源代码管理员、项目成员

### 查看流水线信息

 1. 进入服务详情后，点击 `流水线` 页签。

    ![](../assets/持续集成/流水线.png)

 1. 查看服务CI pipeline的完成情况。

    ![](../assets/持续集成/pipeline.png)

    注：版本命名方式：合并至develop：develop. + 年月日时分秒。

    Tag生成：版本号（三位号码，如：1.1.0。release修改前两位，hotfix修改第三位）。
    提交：每次提交代码的操作，自动生成Commit ID，由于字数多，平时多取前八位。

    ![](../assets/持续集成/自动生成Commit.png)

<h2 id="4">服务版本</h2>
 
 服务版本是代码提交的历史记录，每提交一次修改后的代码，对应生成一个新的版本。

  - **菜单层次**：项目层
  - **菜单路径**：开发管理 > 服务> 服务详情 > 服务版本
  - **默认角色**：项目所有者、源代码管理员、项目成员
 
### 查看服务版本信息

 1. 进入服务详情后，点击 `服务版本` 页签。

    ![](../assets/持续集成/服务版本.png)

 1. 查看服务版本信息。

    ![](../assets/持续集成/服务版本信息.png)

<h2 id="5">代码质量</h2>

代码质量是直观地向用户反馈代码质量信息。按照相应的代码规范及标准在线进行代码静态检查、代码安全检查、质量评分、代码缺陷改进趋势分析，辅助管控代码质量。

  - **菜单层次**：项目层
  - **菜单路径**：开发管理 > 服务 > 服务详情 > 代码质量
  - **默认角色**：项目所有者、源代码管理员、项目成员

  >注：在此只看该服务下经单元测试后的代码质量情况。可从开发监控了解项目整体及DevOps全链路各个环节进展情况，包括所有服务的代码质量。

<h2 id="6">服务发布</h2>

  该模块提供将服务发布至不同环境的功能，向目标环境传输部署文件，同时附带服务版本信息以便追踪。 

  - **菜单层次**：项目层
  - **菜单路径**：开发管理 > 发布
  - **默认角色**：项目所有者、源代码管理员、项目成员

### 服务发布

 1. 点击 `发布` 。

    ![](../assets/服务发布/点击服务发布.png)

 1. 关键字搜索或直接从从下拉列表中选择部署文件发布的环境。

    ![](../assets/服务发布/选择部署文件发布的环境.png)

 1. 点击 `保存` 。

    ![](../assets/服务发布/服务发布.png)

 1. 该服务部署文件已成功发布在开发或正式环境。

    ![](../assets/服务发布/成功发布.png)

### 自动发布

  自动发布是提供便捷的发布功能。尤其对于开发/测试环境，需频繁的发布服务版本，则建议项目所有者对这些环境配置自动发布。若该服务设置自动发布后，每当持续集成生成新的服务版本后将会自动发布至对应的环境。

  - **菜单层次**：项目层
  - **菜单路径**：开发管理 > 服务 > 服务详情 
  - **默认角色**：项目所有者

  1. **项目所有者**可以勾选“是否自动发布” 。

      ![](../assets/服务发布/自动发布.png)

  2. 在弹框中选择一个或多个环境。

      ![](../assets/服务发布/选择一个或多个环境.png)

  3. 点击 `保存` ，版本生成会自动发布部署文件至所选环境。

      ![](../assets/服务发布/自动发布部署文件.png)

      >注：建议自动发布仅配置使用于开发/测试环境，而正式环境建议在UAT环境测试通过后进行手动发布。


+++
title = " Continuous integration "
description = ""
weight = 4
+++

# Continuous integration
  
  Continuous Integration (CI) refers to the continuous integration of team members' code during the development process. Each integration can be achieved through automated builds. This saves developers a lot of time and allows them to focus more on implementing business logic. 
  
  This chart introduces how the R&D team manages services after implementing [Agile Management] (../scrum), such as, how to management service how to use Git-Flow model for branch management, how to view the continuous integration Pipeline, how to manage service versions, and how to understand the quality of the code and how to release it.
  
  Continuous integration is basically completed by all members of the scrum development team, including project owners, source code administrators, and project members. Each module contains its concept definition, major functions, and other considerations. Thought this chart, you can understand：

   - [Service Management](#1)
   - [Branch Management](#2)
   - [Pipeline](#3)
   - [Service Version](#4)
   - [Code’s Quality](#5)
   - [Service Release](#6)

  If you are unable to access the corresponding function, please contact the responsible person for [System Configuration] (../system-configuration)，especially[Role Configuration](../system-configuration#3).

  If you complete the development and release of code, you can continue to understand how to conduct [continuous deployment] (../continuous-deployment).

<h2 id="1">Service Management</h2>
 
  Services are a collection of functions, furthermore, a system can be decoupled into many services. Besides, each micro-service can be deployed by its own. It is worth noting that each micro-service just concentrate on one accomplishment task, and each task represents a little operation Module. So the relationship of the each micro-service is loose coupling. In addition, each time a service is created, the system automatically creates the corresponding group, default branch, and issue code repository.

  Note: Only the project owner and the source code administrators can create service, project members can only check the service.  
  - **Menu hierarchy**：Project Layout
  - **Menu path**：Devops management > Service
  - **Default role**：Project owner, Source code administrator, Project member

### Service type

  **Micro-service**：micro-service back-end, it can define the dependent resources and services when it need to configure the gateway in the way of deploying.
  **Web front-end **： micro-service front-end, it need a domain name when it is deployment.
  **Mobile**：Used for mobile application development. The process of the deployment is different from other types.
  **Common application**：The service type of the non-micro-service structure, such as HAP, HBI, etc. One service works for one system.
  **Java warehouse**：Manage the JAVA toolkit.
### Service Group

  Distinguish the development sources of the service. It should sign a signature when we create the service.
 Setting as follows:

  Project name | Project code | Service Group
--- | --- | ---
HAPCloud | hapcloud | com.hand.hapcloud
DevOps | devops | com.hand.devops
Intelligence insight | insight | com.hand.insight
Scrum Kanban | kanban | com.hand.kanban
Mobile application | mobile | com.hand.mobile
Application framework | hap | com.hand.hap
Devops | cloopm | com.hand.cloopm

### Create service

 1. Click the `Create`.

    ![](../assets/持续集成/创建服务.png)

 1. Enter `Service code`, `service name` and `service group`, and then select the corresponding services’ type. Click `create`.

    ![](../assets/持续集成/服务创建.png)

 1. Create the new service “micro-service 0201” has been in the service management list.

    ![](../assets/持续集成/服务创建示意.png)

 1. Gitlab has already created in accordance with the service code warehouse “webservice”. Click the repository address, we can check the service in the gitlab’s code warehouse.


    ![](../assets/持续集成/仓库地址.png)

    ![](../assets/持续集成/gitlab仓库.png)

### Disable/enable service

 Click the `Disable`, such as: The service detail cannot be checked when the service “micro-service 0201”has been blocked off. 

  ![](../assets/持续集成/停用服务.png)

  ![](../assets/持续集成/停用服务示意.png)

 Click `Enable`, it has some related operation of the services, when the service “micro-service 0201”has enabled.

  ![](../assets/持续集成/启用服务.png)

  ![](../assets/持续集成/启用服务示意.png)

<h2 id="2">Branch Management</h2>
  
  Choerodonc uses the `git-flow` workflow pattern with two default branches, `master` and `develop`. Manage the branches of `feature`, `release`, and `hotfix` during continuous delivery. Ending the branch automatically triggers branch consolidation and continuous integration. You can see the code integration in [Pipeline] (#3).
  
  - **Menu hierarchy**：Project Layout  
  - **Menu path**：Devops management > Service > Service detail
  - **Default role**：Project owner, Source code administrator, Project member.

### Branch category

 **Master**：Default Branch，Production branch.   
 **Develop**：Default Branch，Develop branch.
 
 **Feature**：It used for daily development, repair bugs, and branch generation based on the develop branch. It were merge to the develop branch after finishing.

 **Release**：It used for product release, product iteration. And the branch generated based on the develop branch. After finished, it would merge to the master branch and the develop branch, and then generate a tag.

 **Hotfix**：It used for repair the bugs after publishing the product, and it generated based on the master branch. When it’s finished, it will merge to the master branch and develop branch, and then generate a tag.

### The usage process
 
The branch usage process consists of four parts: creating a new branch, pulling down the branch to local development, submitting code/resolving conflicts, and ending the branch.
 ![GitFlow 使用流程](../assets/持续集成/GitFlow使用流程.png)

### Create branch

 1. Click `Create Feature`/`Create Release`/`Create Hotfix`，create corresponding branch.

    ![Create Feature ](../assets/持续集成/创建Feature.png)

    ![Create Release/Hotfix branch](../assets/持续集成/创建Release.png)

 1. Input `Issue` number or version number, click `Save`.
    
When you create the `Feature`/`Hotfix` branch, input the number of `Issue`.
     
    ![Input issue number](../assets/持续集成/输入Issue.png)
   
    When create a branch of `release`, it would automatically generate the next version number, or you can manual input the needed version number. (The version number consists of 3 numbers, and the interval of the number is the radix point.) 	 Such as: `1.1.0`. The `Release` version number has defined that number at the end to be clear and the middle one adds one by default.


    ![ The release version number](../assets/持续集成/分支版本号示意.png)

### End up branch 
 
 1. When you end up the branch of `feature`, the branches will be merged to generate the corresponding service version. The version number is the same as the one created during creation.

 2. When you end up the branch of `Master`, the branches will be merged to generate the corresponding service version. The version number is the same as the one created during creation.

 3. When you end up the branch of `Hotfix`, the platform prompts to add the third digit of the latest version as the version number. For except, when the `hotfix` branch ends, if the latest version is `1.1.5`, the new version will be `1.1.6`.

 >Note： When you click the finish branch while there is no commit, and it would not create the merge request, and then delete it directly.
 
 >Besides, when create branch and finish branch ,we should notice that it only can be operated in the platform. So please do not create merge request and delete the branches at the gitlab platform.

### The steps of Branch Management

 1. Cloning the code to local 

    ```bash
    # Execute the following command in the folder which store the code, Pull the code repository for the desired service. 
    git clone http://git.saas.hand-china.com/devops/hap-devops-service.git
    # Enter the repositories after pulling remote repositories.
    cd hap-devops-service
    ```

 1. Pull the latest code and create new branch

    ```bash
    git pull
    ```
 1. Checkout to the new branch

    ```bash
    # Checkout to the new branch, such as feature-2.
    git checkout feature-2
    ```
 1. Development

    Commit code as issue’s requirement in accordance of the branches.   
    When it is finished, we should check the changes of the local code in detail.

 1. Commit code

    ```bash
    # Add the changes of the local code.
    git add .
    # Commit the code and add the information about this commit.
    # Note:[FIX]fix the bug [ADD]Add [IMP]improve [DEL]Delete.
    $ git commit –m “[ADD]readme: Example of adding the code”
    # Push the local commitment to the remote repository.
    $ git push origin feature-2:feature-2
    ```
 1. Finish branch.

### Solve branch conflict

#### The feature branch conflict

 There are two methods of solving the conflicts in common as follows:

 - Local solution：

    ```bash
    # Make sure at the feature branch, such as feature-2.
    git checkout feature-2
    # Pull the newest develop branch codes in remote repository.
    git fetch origin develop:develop
    # Rebase feature branch to develop branch.
    git rebase develop
    ```
    After finishing the `rebase` operation, the corresponding conflict will be generated.
    ```bash
    git add .
    git rebase --continue
    ```
    Based on commit times of the feature branch, we would solve the conflict problems again and again. But the way of solving this problem is repeating to execute those operation of conflicts.After finishing it, you can force commit it to remote repository.
    ```bash
    git push -f origin feature-2:feature-2
    ```

 - Resolve the conflict problem in the interface (deprecated) :

    Click the button of `Solve conflict` in the merge request interface on the GitLab.

#### Release & Hotfix Branch Conflict

 As follows, there are some suggestion and methods when the branch has conflict with the `develop` branch or the `master` branch.

 If the conflict did not resolved and you still click the `ok` at this time, it will mention the branches are conflict and you will not be able to continue. There are some mentions’ steps can help us to solve the conflicts in the interface. 
 
 There are some mentions’ steps can help us to solve the conflicts in the interface，described as follows：

  Note: The branch can be finished only if the conflicts were resolved.

<h2 id="3">Pipeline</h2>

The pipeline is the completion of the continuous integration process, including status, identification, creator, submission, branch, submitter, stage, duration, and creation time.

  - **Menu hierarchy**：Project Layout
  - **Menu path**：Devops management > Service > Service detail > Pipeline
  - **Default role**：Project owner, Source code administrator, Project member

### Pipeline

 1. After enter the service detail, and click `Pipeline`.

    ![](../assets/持续集成/流水线.png)

 1. View the accomplishment situation of service CI pipeline.

    ![](../assets/持续集成/pipeline.png)

    Note: The way of naming the version: merge into the develop：develop. +year month day hour minute second.

    Tag: Version Code (The 3 numbers, such as 1.1.0; If the version is release, modify the first two digits. If the version is hotfix, modify the third one).
    Commitment: When you hand in the code, it can automatically generate the Commit ID, because the few of words, we get the first eighth words at ordinary times.

    ![](../assets/持续集成/自动生成Commit.png)

<h2 id="4">Service Version</h2>
 
 The history of committing the code: when delivery the modification code after amending, it will generate a new version.

  - **Menu hierarchy**：Project Layout
  - **Menu path**：Devops management > Service > Service detail > Service version
  - **Default role**：Project owner, Source code adminstrator, Project member
 
### View the version information of the service

 1. After we enter the service detail, we can click `service version `.

    ![](../assets/持续集成/服务版本.png)

 1. View the information of the service version.

    ![](../assets/持续集成/服务版本信息.png)

<h2 id="5">Code quality</h2>

Code quality can intuitively feed back code quality information to users. In accordance with the corresponding code specifications and standards online, we can assist in the control of code quality through code static inspections, code security checks, quality scores, and code defect improvement trend analysis.

  - **Menu hierarchy**：Project Layout
  - **Menu path**：Devops management > Service > Service detail > Code quailty 
  - **Default role**：Project owner, Source code administrator, Project member

  >Note: We can know about the whole project and the DevOps’ whole link situation in the whole circle from the development monitoring.

<h2 id="6">Service release</h2>

  This module provides the ability to publish services to different environments, meaning to transmit deployment files to the target environment, along with service version information for tracking. 

  - **Menu hierarchy**：Project Layout
  - **Menu path**：Devops management > Release
  - **Default role**：Project owner, Source code administrator, Project member

### Service Release

 1. Click `Release`.

    ![](../assets/服务发布/点击服务发布.png)

 1. Select the release environment of the deployment document in the way of searching of the keywords or from the drop-down list directly.

    ![](../assets/服务发布/选择部署文件发布的环境.png)

 1. Click `Save`.

    ![](../assets/服务发布/服务发布.png)

 1. The service deployment service has already released to the development or official environment.

    ![](../assets/服务发布/成功发布.png)

### Auto Release

  Automatic releaseing provides convenient publishing features. In particular, for development/test environments where service versions need to be released frequently, it is recommended that project owners automatically publish these environment configurations. If this service setting is automatically released, it will be automatically released to the corresponding environment each time the continuous integration generates a new service version.

  - **Menu hierarchy**：Project Layout
  - **Menu path**：Devops Management > Service > Service detail 
  - **Default role**：Project owner

  1. **Project owner**The owner of the project can set service “auto release”.

      ![](../assets/服务发布/自动发布.png)

  2. Select one or a few of environments

      ![](../assets/服务发布/选择一个或多个环境.png)

  3. Click `Save`, and the new version can auto release the deploy documents to the selected environment.

      ![](../assets/服务发布/自动发布部署文件.png)

      >Note: Auto release is only for the develop environment, but it should be manual released in the formal environment.
