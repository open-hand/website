+++
title = "分支管理"
description = ""
weight = 3
+++


# 分支管理
  
  Choerodon采用 `git-flow` 工作流模式，有`master`和`develop`两个默认分支。在持续交付过程中对 `feature`、`release`、`hotfix` 等分支进行管理。结束分支可自动触发分支合并和持续集成，可在流水线查看代码集成情况。
  
  - **菜单层次**：项目层  
  - **菜单路径**：持续交付 > 应用 > 分支管理
  - **默认角色**：项目所有者、源代码管理员、项目成员

### 分支类型

 **Master**：默认分支，版本发布分支。
    
 **Develop**：默认分支，日常开发分支。  
 
 **Feature**：适用于日常开发、bug修复，基于开发分支生成，完成时合并至开发分支。

 **Release**：适用于产品发布、产品迭代，基于开发分支生成，完成时合并至主分支和开发分支，并打上标签。

 **Hotfix**：适用于产品发布后修复bug，基于主分支生成，完成时先合并至主分支和开发分支，并打上标签。

### 分支使用流程
 
 分支使用流程包括四个部分：新建分支、拉下分支至本地开发、开发完提交代码/解决冲突、结束分支。

 ![GitFlow使用流程](/docs/user-guide/assets/continuous-integration/GitFlow使用流程.png)

### 新建分支

 1. 点击`创建Feature`/`创建Release`/`创建Hotfix`按钮，创建对应分支；

 1. 输入`Issue`编码或版本号。点击`保存`按钮；
    
    `Feature`/`Hotfix` 分支创建时输入`Issue`编码作为分支名。
   
    `Release` 分支创建时会自动生成下一个版本号，也可以手动输入需要的版本号。（版本号由三个数字组成，中间以小数点间隔。如：`1.1.0`。`Release` 版本号默认为末位清零，中间一位进一）。

### 结束分支
 
 1. `feature` 分支在结束时会合并生成对应的服务版本，版本号与创建时填写一致；

 2. `Release` 分支在结束时会生成对应的服务版本，版本号与创建时填写一致；

 3. `Hotfix` 分支在结束时会提示以最新版本的第三位加一作为版本号。如最新版本为`1.1.5`，则`hotfix`分支结束时生成新版本为`1.1.6`；
<blockquote class="note">
         无提交时点击结束分支，将不创建合并请求，直接删除。
         另外，新建分支及结束分支只能在平台界面进行操作，请勿随意在gitlab界面创建合并请求和删除分支
      </blockquote>

### 示例：分支管理操作步骤

 1. 克隆代码到本地

    ```bash
    # 在存放代码的文件夹下执行以下命令，拉取所需服务的代码仓库
    git clone http://choerodon.io/choerodon-choerodon-dev/choerodon-backend.git
    # 拉取远程仓库成功后进入仓库
    cd choerodon-backend.git
    ```

 1. 拉取最新代码和新建的分支

    ```bash
    git pull
    ```
 1. 切换到分支

    ```bash
    # 切换到新建分支，以 feature-1 为例
    git checkout feature-1
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
    $ git push origin feature-1
    ```
 1. 界面操作结束分支

### 解决分支冲突

#### Feature 分支冲突

 常见两种解决冲突的方式如下

 - 本地修改代码解决：

    ```bash
    # 确保当前正在 Feature 分支上，以 feature-1 为例
    git checkout feature-1
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
    git push -f origin feature-1
    ```

#### Release&Hotfix 分支冲突

 当分支对于 `develop` 和 `master` 分支中任意一个或以上存在冲突时，会提示当前存在冲突及建议做法。

 若此时继续点击`确定`按钮，并且没有**解决冲突**，那么会提示分支冲突，无法继续操作。
 
 解决冲突具体步骤可查看界面提示，说明如下：

  1. 只有对应 `develop` 的合并请求存在冲突，按界面提示解决冲突会导致分支对应 `develop` 分支的合并请求被合并。此时再进行**结束分支**操作，会处理分支对 `master` 的合并请求，然后生成对应版本号的 `Tag` 并删除分支。

  1. 只有对应 `master` 的合并请求存在冲突，按界面提示解决冲突会导致分支对应 `master` 分支的合并请求被合并。此时再进行**结束分支**操作，会处理分支对 `develop` 的合并请求，然后生成对应版本号的 `Tag` 并删除分支。

  1. 若分支对应 `develop` 和 `master` 分支的合并请求都存在冲突，按界面提示解决冲突会导致分支对应 `develop` 和 `master` 分支的合并请求依次都被合并。此时再进行**结束分支**操作，会生成对应版本号的 `Tag` 并删除分支。
