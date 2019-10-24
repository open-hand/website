+++
title = "分支管理"
description = ""
weight = 2
+++

# 分支管理

## 1. 概述

分支管理是整个开发流程中非常重要的一环，旨在帮助开发团队建立规范，从而进行快速开发与持续交付。通过此页面您将了解到如何规范地在Choerodon平台中创建分支和管理分支。

### 1.1 分支管理策略

分支是将您的开发工作从主线上分离开来，以免影响主线。Choerodon平台主要使用 GitLab 进行分支管理。目前平台中支持的分支类型为：master，feature、bugfix、release、hotfix ；此外，您还可以根据需求，创建自定义类型的分支。  

至于分支管理模型，Choerodon采用了 github-flow 作为分支管理策略的主体。并在此基础上，参考了一些其他策略，从而对开发者的开发分支做了一定程度上的细分。

![image](/docs/user-guide/development/code-manage/image/code-management-15.png)

#### 1.1.1 主分支 master

* 每个[代码库](../repository)有且仅有一个主分支 master。所有提供给用户使用的正式版本，都在这个主分支上发布，同时都要一对一的生成一个[标记](../sign)。除初始化仓库生成的 master 分支以外，master 分支的所有提交都应是提供给用户的正式版本。
* master 分支仅用于发布正式版本，所以需确保主分支的任何内容都是可部署的。并且只允许对 master 进行其他分支的合并和创建标记操作，不能单独在 master 分支上进行提交。
* master 分支应该只授权给项目代码的管理者，不允许其余人员操作。


#### 1.1.2 开发分支 develop

* 用于日常开发的分支，视不同的分支管理策略有不同的表现形式。
* Choerodon平台规定，将开发分支细化为 release ， feature ， bugfix 三个分支。
* Choerodon平台规定，不需要单独创建 develop分支 ，而是作为上述三种分支的总称。


#### 1.1.3 预发布分支 release

* release 分支是指发布正式版本之前，基于 master 分支切出来作为预发布版本，从而进行测试的分支。
* 一个 release 分支对应一个版本发布计划，包含一个或多个用户故事、不定量的功能点、漏洞修复等。
* 完成发布计划的所有开发后，将 release 分支的内容部署到 UAT(User Acceptance Testing) 环境进行测试验收，测试通过后，再基于该 release 分支创建一个新的版本标记。
* 最后确认发布后，需要将 release 分支合并至 master 分支，并删除 release 分支；表示产品进行了发布，所有的新功能与新特性已经合并到了master分支。
* 分支的命名格式为release-[版本号]，例如release-0.1.0。


#### 1.1.4 功能分支 feature

* feature 分支为开发某个功能点而创建。
* feature分支基于对应的 master 分支创建。
* 完成功能点的开发后，feature 分支的最新内容会被部署至 staging 环境进行功能测试验收。功能点测试完成后再合并入 master 分支，并删除 feature 分支。
* feature分支的名称格式一般为feature-[task number]的格式，例如feature-10980，10980对应为任务管理平台中的任务号码。


#### 1.1.5 修补 Bug 分支 bugfix

* 修补 Bug 分支 bugfix 是指在开发过程中，对于发现的漏洞进行修补的分支。
* 修补 Bug 分支 bugfix 基于当前的master分支创建，与feature分支的开发过程比较类似。
* 完成漏洞修补的开发后，bugfix 分支的最新内容会被部署至 staging 环境进行功能测试验收。最后将其合并入 master 分支，并删除 bugfix 分支。
* 分支的命名格式为bugfix-[任务号码]，例如bugfix-10980，10980对应任务管理系统中的bug任务号码。


#### 1.1.6 热修复分支 hotfix

* 软件正式发布以后，难免会出现 Bug 。这时就需要创建一个 hotfix 分支 ，进行 Bug 热修复。
* 漏洞修复后需要为hotfix 分支制作一个新的修订号版本标记。最后，根据实际情况可选的合并入 master 分支，并删除 hotfix 分支。
* 分支的命名格式为hotfix-[新版本号码]，例如hotfix-0.1.1。


#### 1.1.7 用户自定义分支 custom

* 任何分支管理策略或多或少都会存在一些局限性，可能不满足或不适合用户的某些特殊场景。对此，用户可以根据实际使用需求，创建自定义类型的分支。
* Choerodon平台推荐使用 github-flow 为主，具体可以[参考](http://scottchacon.com/2011/08/31/github-flow.html) Scott Chacon 对于主流分支管理策略的探讨。

## 2 开发流程
借助Choerodon平台进行开发，可以实现整个开发流程的规范化与可视化。以下是开发流程中的具体步骤与相应规范。

### 2.1 创建分支   

#### 2.1.1 在Choerodon平台中创建分支

![image](/docs/user-guide/development/code-manage/image/code-management-03.png)

 * 点击创建分支按钮，创建对应分支；

* 为分支关联一个问题，该问题对应为敏捷管理中的一个用户故事、任务或缺陷；
 
* 指定分支来源；新分支将会基于所选分支进行创建。

* 指定分支类型；该分支将要完成的任务类型。

* 输入分支名称；分支名称在应用服务下具有唯一性。

* 点击创建，完成创建分支。

#### 2.1.2 在本地创建分支

如果您对 git 操作相对熟练，则可以在本地直接创建 feature 分支。在这里，同样基于 master 来创建。
![image](/docs/user-guide/development/code-manage/image/code-management-16.png)

### 2.2 提交分支

* 在新分支上完成开发后（即改动代码），就可以将改动进行提交。  

* 首先，查看自己做的代码改动。

![image](/docs/user-guide/development/code-manage/image/code-management-17.png)

* 示例里做了四个改动，建议根据文件或功能点来划分，并且分别提交信息。

* 提交 commit 时，必须给出完整扼要的提交信息。

![image](/docs/user-guide/development/code-manage/image/code-management-18.png)

此时若是查看提交记录，应能看到合理、有序的提交信息（非必要）

![image](/docs/user-guide/development/code-manage/image/code-management-19.png)

* 合理有序的提交信息保证了分支的干净整洁，然而当失误造成了错误的提交或是事后发现提交信息冗余等，可通过一些操作来合并 commit 信息。

   * 接下来的说明的示例都是危险操作，严禁在生产环境进行测试。
   * 合并commit的一种简便方法，就是先撤销过去的 commit ，然后再重新提交一个新的 commit 。
   
   ![image](/docs/user-guide/development/code-manage/image/code-management-20.png)
   
* 使用 git rebase 命令。具体可以参考 [Tute Costa 的文章](https://thoughtbot.com/blog/git-interactive-rebase-squash-amend-rewriting-history)。
![image](/docs/user-guide/development/code-manage/image/code-management-21.png)
将 squash 和 fixup 命令当作命令行参数使用，自动合并 commit 记录。具体可以参考 [Florent Lebreton 的文章](https://fle.github.io/git-tip-keep-your-branch-clean-with-fixup-and-autosquash.html)。

### 2.3 与主干同步分支

* 分支开发的过程中，要经常保证分支与主干的同步。特别是分支推送前，强制要求同步主干。
![image](/docs/user-guide/development/code-manage/image/code-management-22.png)
* 根据控制台反馈，可以看到 demo 示范的四个提交被重新应用于最新的 origin/master 并且更新了当前分支。

### 2.4 推送到远程仓库

* 完全提交了本地的改动并且也已经同步主干分支后，可以将当前分支推送到远程仓库 bash git push origin feature
* 若因为 rebase 操作导致分支历史改变，与远程仓库的分支不兼容。可能需要加上 --force 或 -f 参数进行强制推送。
* 强制推送是一个危险操作，进行这个操作前务必慎重。具体参见 [Will Anderson 的文章](https://willi.am/blog/2014/08/12/the-dark-side-of-the-force-push/)。

### 2.5 创建合并请求

<blockquote class="note"> Note： 创建合并请求同样支持两种方法，一种是直接在代码中处理，一种是直接在猪齿鱼平台中操作：</blockquote>

1. 在git中创建合并请求

    * 发出 feature 到 master 的合并请求，或是按实际情况的合并请求。
    * 向项目代码的管理者提出 code review 要求。
    * 根据 reviewer 提出的建议等进行讨论修改代码，再次提交，重复 code review
    * 在代码审核通过后，接受合并请求，并删除该分支。（强烈建议此步由 reviewer 或是管理者操作）

2. 在猪齿鱼平台中创建合并请求
分支被推送到远程仓库之后，可以直接在猪齿鱼平台中创建分支合并请求，然后在Gitlab中进行分支合并。
![image](/docs/user-guide/development/code-manage/image/code-management-04.png)

## 3. 修改分支关联问题

如果您想修改分支关联的问题，可以点击修改分支，从而对关联的问题进行更改或清空。

<blockquote class="note"> Note： 若分支创建时未关联问题，并且分支名称是以某一个问题的issue号开头的则修改分支相关联问题时系统会默认关联到该问题。</blockquote>

## 4. 删除分支

分支创建之后，若发现分支不必要，可以直接进行删除。但是需要注意的是，分支删除之后，分支上的代码也将一起被删除。
![image](/docs/user-guide/development/code-manage/image/code-management-05.png)

## 5. 注意事项

1. 每日工作结束前，必须提交当前的工作目录改动，无论是否完成功能点。

2. 不论采用哪种分支管理策略，务必严格遵守操作规范。

3. 提交信息应能清晰描述所做的改动，方便后来人的阅读。

4. 提交信息可以视具体项目的规定来提交，但是一定要保证格式统一。建议包括改动类型、改动文件位置、改动内容、关联 issue 信息等。

5. 禁止任何不能清晰表达改动的提交信息。

6. 如有条件，修改他人关键代码部分最好能够通知当事人。比如口头通知或是代码审核增加 reviewer 等。

7. 合理使用 git status 命令，任何情况特别是失误操作后，随时可以使用该命令查看当前状态。特别建议新手在每一步的操作中间都增加 git status 命令。

8. 严禁对 origin 仓库的强制推送，不论方式。除非目标是自己的开发分支并且了解强制推送会造成的后果。

9. 在要进行或是测试危险操作前，备份当前分支。防止意外造成代码丢失。

10. 远程仓库合并结束后，必须删除源分支。建议在合并请求勾选 Remove source branch 选项。

11. 严禁任何类似 [FIX] Handling conflicts 的提交。

## 6. 危险操作

所有可能改变工作目录代码的操作都会是危险操作。所有相关操作过程都需要格外慎重。

以下列举一些较为常见的 git 上可能会接触使用到的危险操作。

1. 解决冲突

    * 代码冲突是 git 使用过程中最常见的问题，大量的冲突往往是因为当前分支同步不及时导致的。所以再次强调及时同步。
    * 解决冲突时一定要细心，从代码的第一行开始，由上至下解决冲突部分。
        当冲突代码中存在逻辑冲突的，需要仔细分析。如有条件，与当前冲突提交的提交人协商讨论。
    * 解决冲突完成后，全文搜索冲突标志。即 <<<<<<< 、 ======= 、 >>>>>>> 。
    * 冲突解决完成后，提交前必须再次运行并且测试代码。

2. 强制推送

    * git push --force
    * 强制推送是一个不可避免的危险操作，慎重使用。
    * 若因为种种原因导致分支历史改变，与远程仓库的分支不兼容。可能需要加上 --force 或 -f 参数进行强制推送。
        * 强制推送是一个危险操作，进行这个操作前务必慎重。具体参见 [Will Anderson 的文章](https://willi.am/blog/2014/08/12/the-dark-side-of-the-force-push/)。

3. 重置

    * git reset
    * reset 分为 hard-reset 和 soft-reset 。
    * soft-reset 将撤回对应的提交信息。
    * hard-reset 将撤回对应的提交信息以及所有修改。
    * 重置前务必确认当前分支做了备份，以免代码遗失。

4. 储藏

    * git stash
    * 储藏是个很便捷的应用，但是不推荐使用。
    * 当因为种种原因需要切换当前分支，但是暂存区或者工作目录里，还存在没有提交的修改，它会和你即将检出的分支产生冲突从而阻止 Git 为你切换分支。
    * 切换分支的时候最好保持一个清洁的工作区域，这时可能会用到 git stash 命令。
    * “储藏”可以获取你工作目录的中间状态——也就是你修改过的被追踪的文件和暂存的变更——并将它保存到一个未完结变更的堆栈中，随时可以重新应用。
    * 对于新手时常能造成工作内容丢失，储藏内容丢失等等意外情况。没有充分练习掌握请勿使用以免造成损失。
    * 可以使用 git commit 和 git reset 组合来替代， git reset 虽然同样是个危险操作，但是掌控比储藏操作来的更加简单。

5. 变基

    * git rebase
    * 把一个分支中的修改整合到另一个分支的办法有两种： merge 和 rebase 。 rebase 可以把在一个分支里提交的改变移到另一个分支里重放一遍。
    * rebase 的操作不当，可能导致原分支被修改等后果。作为一个危险操作，需要慎重。
    * 变基操作解决冲突后应执行 git add . 和 git rebase --continue ，而不是 git commit 命令。
    * 变基操作在操作规范中已有提及，还可以参考 [Git 分支 - 分支的变基](https://git-scm.com/book/zh/v1/Git-分支-分支的变基)。

6. 抛弃文件修改

    * git checkout -- demo.demo
    * 抛弃文件的改动，使文件恢复到修改前的状态。
    * 在使用前，对当前分支备份。

7. 重写历史

    * 在 Git 上工作的时候，你也许会由于某种原因想要修订你的提交历史。
    * 通过 amend-commit 、 reset 、 rebase 等多种操作都能达到这个效果，具体参见 [Git 工具 - 重写历史](https://git-scm.com/book/zh/v1/Git-工具-重写历史)。

## 7. 阅读更多

* [代码仓库](../../code-manage/repository)
* [合并请求](../merge-request)
* [持续集成](../integration)
* [标记管理](../sign)


