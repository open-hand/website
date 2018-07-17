+++
title = "分支管理"
description = "使用 GitLab 进行分支管理，默认分支为 master。在产品开发过程中对 Feature、Bugfix、Release、Hotfix 等分支进行管理。所有的提交将触发持续集成，可在持续集成菜单下查看代码集成情况"
weight = 2
+++

# 分支管理
  
使用 GitLab 进行分支管理，默认分支为 master。在产品开发过程中对 Feature、Bugfix、Release、Hotfix 等分支进行管理。所有的提交将触发持续集成，可在持续集成菜单下查看代码集成情况。

  - **菜单层次**：项目层  

  - **菜单路径**：开发流水线 >  分支

  - **默认角色**：项目所有者、项目成员

<blockquote class="note">
  项目所有者对分支管理权限对应 gitlab 的 Master 权限。

  项目成员对分支管理权限对应 gitlab 仅有 Developer 权限。
</blockquote>

## 分支类型

 - **Master**：默认分支，版本发布分支。
 
 - **Feature**：适用于日常开发新功能。

 - **Bugfix**：即漏洞修补分支，通常用于对发布分支进行错误修复

 - **Release**：适用于产品发布、产品迭代，完成时合并至主分支，并打上标签。

 - **Hotfix**：适用于产品发布后修复 bug，基于主分支生成，完成时合并至主分支，并打上标签。
 
 - **Custom**：除上述分支以外的用户自定义的分支。

## 分支使用流程
 
分支使用流程包括几个部分：创建分支、拉下分支至本地开发、开发完提交代码/解决冲突、创建合并请求、合并合并请求、删除分支。


## 创建分支

 1. 点击`创建分支`按钮，创建对应分支；

 1. 可选的为分支指定一个问题；

 1. 指定分支来源，分支将会基于目标分支创建。
    
 1. 指定分支类型，这个分支将要完成的功能类型。
 
 1. 输入分支名称。
 
 1. 点击创建，完成创建分支。
 <blockquote class="note">
  选择问题后默认切换分支类型，并且分支名称的默认值是问题的issue号，用户故事类问题对应feature分支，bug类问题对应bugfix分支类型，其余都是custom分支类型。
</blockquote>
 

## 拉下分支至本地开发

 1. 克隆代码到本地；

    ```bash
    # 在存放代码的文件夹下执行以下命令，拉取所需服务的代码仓库
    git clone http://choerodon.io/choerodon-choerodon-dev/choerodon-backend.git
    # 拉取远程仓库成功后进入仓库
    cd choerodon-backend
    ```
 1. 拉取最新代码和创建的分支；

    ```bash
    git fetch
    ```
 1. 切换到分支；

    ```bash
    # 切换到创建分支，以 feature/1 为例
    git checkout feature/1
    ```
 1. 开发；

    根据分支对应的 `Issue` 需求修改代码，完成后详细检查本地代码改动。

 1. 提交代码；

    ```bash
    # 将本地代码变动提交到暂存区
    git add .
    # 提交代码并且为本次提交添加 commit 信息
    # 注：[FIX]修改bug  [ADD]新增  [IMP]完善  [DEL]删除
    $ git commit –m “[ADD]readme: 新增代码示例”
    # 拉取最新远程仓库 master 分支代码
    git fetch origin master:master
    # 将 Feature 分支重新设立起点于最新的 master 代码
    git rebase master
    # 执行完 `rebase` 操作后，可能会产生对应的冲突，解决冲突后执行如下代码。
    # 不产生冲突则不执行
    git add .
    git rebase --continue
    # 将本地提交推送至远程仓库对应分支
    $ git push origin feature/1
    ```
 1. 界面操作结束分支。

## 解决分支冲突

 - 本地修改代码解决：

    ```bash
    # 以 feature/1 为例，确保当前正在 Feature 分支合并的目标分支 master 上
    git checkout master
    # 拉取最新远程仓库 master 分支代码
    git pull origin master
    # 合并 Feature 分支
    git merge feature/1
    # 执行完 `merge` 操作后，会产生对应的冲突，解决冲突后执行如下代码。
    git add .
    git commit
    # 完成后提交至远程仓库。
    # 根据设置，此处可能需要项目管理员权限，即 GitLab 的 master 角色。
    git push origin master
    ```

