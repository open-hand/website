+++
title = "创建一个Java库"
description = ""
weight = 4
+++

# 创建一个Java库
---

## 目标

众所周知，Java 的生态环境相当庞大，包含了数量相当可观的官方及第三方库。利用这些库，可以解决在用 Java 开发时遇到的各类问题，让开发效率得到显著提升。

本页面介绍以DevOps平台为基础，演示如何创建一个Java库，让用户熟知整个操作流程。


## 前置条件

- 在操作之前保证[系统配置](../../user-guide/system-configuration)已经配置完全。
- 完成[创建项目](../project)操作。本章节使用在前面章节创建的项目`猪齿鱼研发`。

<h2 id="1">创建Java库</h2>

1. 使用项目所有者或者源代码管理员的角色登录Choerodon系统，选择项目`猪齿鱼研发`；
2. 选择`持续交付`模块，点击`应用`，进入应用管理页面；
3. 点击``创建应用``，系统会弹出窗口，在窗口中输入应用编码、应用名称和选择应用模板；

    a. 应用编码：choerodon-java

    b. 应用名称：猪齿鱼java应用

    c. 选择应用模板: JavaLib

    <blockquote class="warning">
    应用编码输入只能包含字母，数字，下划线，空格， '_', '.', "——",只能以字母，数字，下划线开头。
    </blockquote>

4. 点击`创建`按钮，即可创建一个Java库；

5. 当应用创建成功，可以在应用管理查看到新建的应用；

6. 在创建应用的同时，系统还会在Gitlab中创建一个仓库，点击 ``仓库地址`` ，链接到Gitlab新建的仓库；
    
    <blockquote class="note">
        Gitlab 仓库的名称是 ``choerodon-java``，为应用编码。
    </blockquote>


<h2 id="2">开发Java库</h2>

Java库创建完成之后，开发Java库。具体的操作步骤如下：

1. 创建Feature分支。

    点击`应用`，进入到应用管理界面，选择应用编码`choerodon-java`，点击右侧`分支管理`，选择`创建分支`，系统会弹出侧边栏，填写字段，点击创建按钮，即可创建一个Feature分支。
    
    <blockquote class="warning">
    字段填写输入包含字母、数字、'——'、'_'），例如 feature-1
    </blockquote>

2. 在存放代码的文件夹下，打开git bash,输入命令`git clone [仓库地址]`，拉取所需应用的代码仓库。

3. 克隆成功之后，进入项目根目录，打开git bash,输入命令`git checkout feature-1`,切换到新建分支feature-1，并在此分支进行开发。
   
    ```shell
    $ git checkout feature-1
    ```
4. 提交代码。    

    ```shell
    # 将本地代码变动提交到暂存区
    $ git add .
    # 提交代码并且为本次提交添加 commit 信息
    # 注：[FIX]修改bug  [ADD]新增  [IMP]完善  [DEL]删除
    $ git commit –m “[ADD]readme: 新增代码示例”
    # 将本地提交推送至远程仓库对应分支
    $ git push origin feature-1:feature-1
    ```
   <blockquote class="note">
        记得修改maven 仓库地址。
    </blockquote>
   
5. 基于feature分支运行CI。点击`CI流水线`,查看 CI 执行情况。

6. 当CI运行完成以后，点击`应用`，进入应用管理界面，点击`猪齿鱼java应用`的`分支管理`，在分支列表找到`feature-1`，点击`结束分支`。

7. 创建Release分支。
   
    在应用管理界面，选择应用编码`choerodon-java`，点击右侧`分支管理`，选择`创建分支`，系统会弹出侧边栏，填写字段，点击创建按钮，即可创建一个Release分支。

8. 在分支列表找到刚才创建的分支，点击`结束分支`。

9. 点击`CI流水线`，再次查看CI运行情况。
    
    <blockquote class="note">
        如果CI运行成功，去maven仓库地址查看是否打包成功。
    </blockquote>

10. 生成的JAR包的信息如下：
    
    groupId：组织编码-项目编码
   
    artifactId: 应用编码
   
    version: 创建的Release分支名称

