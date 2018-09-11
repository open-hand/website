+++
title = "分支管理"
description = "分支是将您的开发工作从主线上分离开来，以免影响主线。使用 GitLab 进行分支管理，默认分支为 master。在产品开发过程中对 Feature、Bugfix、Release、Hotfix 等分支进行管理。所有的提交将触发持续集成，可在持续集成菜单下查看代码集成情况"
weight = 2
+++

# 分支管理

分支是将您的开发工作从主线上分离开来，以免影响主线。使用 GitLab 进行分支管理，默认分支为 master。在产品开发过程中对 Feature、Bugfix、Release、Hotfix 等分支进行管理。所有的提交将触发持续集成，可在持续集成菜单下查看代码集成情况。您可以在此查看各应用的分支，创建分支，并将代码拉至本地开发后提交代码。

  - **菜单层次**：项目层

  - **菜单路径**：开发流水线 >  分支

  - **默认角色**：项目所有者、项目成员

    <blockquote class="note">
      项目所有者对分支管理权限对应 gitlab 的 Master 权限。

      项目成员对分支管理权限对应 gitlab 仅有 Developer 权限。
    </blockquote>

## 分支管理策略

我们主要采用 [`github-flow`](https://guides.github.com/introduction/flow/) 作为我们的分支管理策略的主体。并在此基础上，参考了一些其他策略，对开发者的开发分支做了一定程度上的细分。

![](/docs/user-guide/development-pipeline/image/flow.jpg) 

具体介绍如下。

1. 主分支 `master`
    - 首先，代码库应该有且仅有一个主分支 `master`。
    - 所有提供给用户使用的正式版本，都在这个主分支上发布。
    - 所有提供给用户的使用的正式版本，都要一对一的生成一个 `tag`。
    - 除初始化仓库生成的 `master` 分支以外，`master` 分支的所有提交都应是提供给用户的正式版本。
    - `master` 只用来发布正式版本，确保主分支的任何内容都是可部署的。
    - 只对 `master` 进行其他分支的合并和制作标记操作，不单独在 `master` 分支上进行提交。
    - `master` 应该只授权给项目代码的管理者。不允许其余人员操作。

1. 开发分支 `develop`
    - 用于日常开发用的分支，视不同的分支管理策略有不同的表现形式。
    - 我们规定，将开发分支细化为 `release` ， `feature` ， `bugfix` 三个分支。
    - 我们规定，不需要单独的创建 `develop` ，而是作为上述三种分支的总称。

1. 预发布分支 `release`
    - 将开发分支细化为以 `release` 分支为主，指发布正式版本之前（即合并到 `master` 分支之前），需要有一个预发布的版本进行测试。
    - 分支基于 `master` 创建。
    - 一个 `release` 分支对应一个版本发布计划，包含一个或多个的用户故事、不定量的功能点、漏洞修复等。
    - 完成发布计划的所有开发后，将 `release` 分支的内容部署到一个 UAT(User Acceptance Testing) 环境进行测试验收。
    - 完成一个发布计划后，为 `release` 制作一个新的次版本标记。
    - 完成一个发布计划后合并入 `master` 分支，并删除 `relaease` 分支。

1. 功能分支 `feature`
    - 功能分支 `feature` 为开发某个功能点创建。
    - 基于对应的 `master` 分支创建。
    - 完成功能点的开发后，将 `feature` 分支的最新内容部署至 `staging` 环境进行功能测试验收。
    - 功能点完成后合并入 `master` 分支，并删除 `feature` 分支。

1. 修补 Bug 分支 `bugfix`
    - 修补 Bug 分支 `bugfix` 是在开发过程中，对于发现的漏洞进行修补的分支。
    - 基于当前的 `master` 分支创建。
    - 完成漏洞修补的开发后，将 `bugfix` 分支的最新内容部署至 `staging` 环境进行功能测试验收。
    - 漏洞修复完成后合并入 `master` 分支，并删除 `bugfix` 分支。

1. 热修复分支 `hotfix`
    - 软件正式发布以后，难免会出现 Bug 。这时就需要创建一个分支 `hotfix` ，进行 Bug 热修复。
    - 基于出现漏洞的版本对应的版本标记 `tag` 创建。
    - 漏洞修复后为 `hotfix` 制作一个新的修订号版本标记。
    - 漏洞修复后，根据实际情况可选的合并入 `master` 分支，最后删除 `hotfix` 分支。

1. 用户自定义分支 `custom`
    - 分支管理策略都具有各种方面上的优劣性，可能不满足或不适合用户的某些特殊场景。
    - 对此，用户可以自定义分支的命名规范等，以满足日常的使用需求。
    - 我们推荐使用 `github-flow` 为主，可以[参考](http://scottchacon.com/2011/08/31/github-flow.html) Scott Chacon 对于主流分支管理策略的探讨。

## 创建分支
![](/docs/user-guide/development-pipeline/image/git branch .png "git branch ") 

 - 点击`创建分支`按钮，创建对应分支；

 - 可选的为分支指定一个[问题](http://choerodon.io/zh/docs/user-guide/agile/issue/)，问题对应这个分支将要改动的内容；

 - 指定分支来源，分支将会基于目标分支创建。

 - 指定分支类型，这个分支将要完成的功能类型。

 - 输入分支名称。

 - 点击创建，完成创建分支。
 
 - 具体分支的本地开发使用 [git](https://git-scm.com/book/zh/v1/%E8%B5%B7%E6%AD%A5) 。

 <blockquote class="note">
  分支名有唯一性校验。
  选择问题后默认切换分支类型，并且分支名称的默认值是问题的issue号。
  若所选应用是基于空模板创建，在分支界面将不会有`创建按钮`，因为空模板应用没有分支，也就没有分支来源，必须本地手动推代码到对应仓库才能看到相应的`创建按钮`。
</blockquote>

## 分支列表操作
![](/docs/user-guide/development-pipeline/image/list.png "list")

- 在分支列表上可以为分支修改关联的问题。

- 在分支列表上可以为分支创建一个合并请求。

- 在分支列表上可以通过删除按钮删除分支。


## 操作规范

日常团队开发中，遵循一个合理、清晰的 Git 使用流程，是非常重要的。清晰的 commit 记录，对于项目的协调、维护有很大帮助。

开发一个新功能的流程如下。

1. 新建分支
    - 每次开发新功能等提交代码的行为，都应新建一个单独的分支。
        - 建议在 origin 先基于最新的分支创建一个新分支。在这里，我们以基于 master 来创建的 feature 分支为例。
            ```bash
            # 抓取远程仓库
            $ git fetch origin
            # 执行后会获取到 origin 的最新信息，包括在 origin 创建的 feature 分支
            > From http://demo.gitlab.com/demo-group/demo
            >  * [new branch]      feature         -> origin/feature

            # 将远程分支抓取至本地
            $ git fetch origin feature:feature
            # 执行后会为本地生成一个新的 feature 分支，或是覆盖已有的 feature 分支
            > From http://demo.gitlab.com/demo-group/demo
            >  * [new branch]      feature    -> feature

            # 切换至 feature 分支
            $ git checkout feature
            > Switched to branch 'feature'
            ```
        - 若是对 git 操作相对熟练，则可以在本地直接创建 feature 分支。在这里，同样基于 master 来创建。
            ```bash
            # 切换至本地的 master 分支
            $ git checkout master
            > Switched to branch 'master'

            # 更新本地的 master 分支，若已确认 master 为最新，则可以跳过此步
            $ git pull origin master
            > From http://demo.gitlab.com/demo-group/demo
            >  * branch            master    -> FETCH_HEAD
            > Updating 8e11cf6..dacf93e
            > Fast-forward
            > ... (更新信息)

            # 创建 feature 分支
            $ git checkout -b feature master
            > Switched to a new branch 'feature'
            ```

1. 提交分支 commit
    - 分支的代码改动后，就可以将改动进行提交。
    - 首先，查看自己做的代码改动。

        ```bash
        $ git status
        > On branch feature
        > Untracked files:
        >   (use "git add <file>..." to include in what will be committed)
        >
        >       add-sql
        >       demo-api
        >       demo-service
        >       init-DB
        >
        > nothing added to commit but untracked files present (use "git add" to track)
        ```
        
    - 示例里做了四个改动，建议根据文件或功能点来划分，并且分别提交信息。
    - 提交 commit 时，**必须**给出完整扼要的提交信息。
        ```bash
        # 按顺序分别为自己的划分范围来做不同的提交信息，这里以按文件划分为例
        #
        # 若按功能点划分，则要求开发完一个功能点后，及时进行提交。
        # 防止不同功能点对相同文件操作后对提交造成阻碍

        $ git add init-DB
        $ git commit -m "[INIT] init database demo"
        > [feature e8b2f52] [INIT] init database demo
        > 1 file changed, 0 insertions(+), 0 deletions(-)
        > create mode 100644 init-DB

        $ git add add-sql
        $ git commit -m "[ADD] add sql demo"
        > [feature 5f19a3c] [ADD] add sql demo
        > 1 file changed, 0 insertions(+), 0 deletions(-)
        > create mode 100644 add-sql

        $ git add demo-service
        $ git commit -m "[ADD] add demo service"
        > [feature 25110aa] [ADD] add demo service
        > 1 file changed, 0 insertions(+), 0 deletions(-)
        > create mode 100644 demo-service

        $ git add demo-api
        $ git commit -m "[ADD] add demo API"
        > [feature c5f9bfd] [ADD] add demo API
        > 1 file changed, 0 insertions(+), 0 deletions(-)
        > create mode 100644 demo-api
        ```
    - 此时若是查看提交记录，应能看到合理、有序的提交信息（非必要）
        ```bash
        $ git reflog
        > * c5f9bfd - (HEAD -> feature) [ADD] add demo API (4 minutes ago) <Runge>
        > * 25110aa - [ADD] add demo service (4 minutes ago) <Runge>
        > * 5f19a3c - [ADD] add sql demo (4 minutes ago) <Runge>
        > * e8b2f52 - [INIT] init database demo (5 minutes ago) <Runge>
        > * 2fdc021 - (origin/master, origin/HEAD, master) Init Repository (12 minutes ago) <Runge>
        > (END)
        ```
    - 合理有序的提交信息保证了分支的干净整洁，然而当失误造成了错误的提交或是事后发现提交信息冗余等，可通过一些操作来合并 commit 信息。
        - 接下来的说明的示例都是危险操作，严禁在生产环境进行测试。
        - 合并commit的一种简便方法，就是先撤销过去的 commit ，然后再重新提交一个新的 commit 。
            ```bash
            # 将提交信息撤回至远程主干分支，或是 HEAD
            $ git reset --soft HEAD

            # 提交改动
            $ git add .
            $ git commit -m "[FIX] Fix msg"

            # 强制推送。
            #   若之前已经推送，则必定存在冲突，需要 `--force` 或是 `-f` 参数强制推送。
            #   若之前并未推送，则不需要 `--force` 参数。直接执行正常推送。
            $ git push --force
            ```
        - 使用 `git rebase` 命令。具体可以参考 [Tute Costa 的文章](https://robots.thoughtbot.com/git-interactive-rebase-squash-amend-rewriting-history)。
            ```bash
            # i 参数表示互动（interactive），执行后git 会打开一个互动界面，进行下一步操作。
            $ git rebase -i origin/master
            ```
        - 将 `squash` 和 `fixup` 命令当作命令行参数使用，自动合并 commit 记录。具体可以参考 [Florent Lebreton 的文章](https://fle.github.io/git-tip-keep-your-branch-clean-with-fixup-and-autosquash.html)。

1. 与主干同步
    - 分支开发的过程中，要经常保证分支与主干的同步。特别是分支推送前，强制要求同步主干。
        ```bash
        # 抓取 origin 的最新提交
        $ git fetch origin
        > remote: Counting objects: 3, done.
        > remote: Total 3 (delta 0), reused 0 (delta 0)
        > Unpacking objects: 100% (3/3), done.
        > From http://demo.gitlab.com/demo-group/demo
        >    2fdc021..b097f2f  master    -> origin/master

        # 对当前分支执行变基操作
        # 示例中 feature 是基于 master 创建的，所以变基操作的目标是 origin 的 master 分支
        # 即 origin/master
        $ git rebase origin/master
        > First, rewinding head to replay your work on top of it...
        > Applying: [INIT] init database demo
        > Applying: [ADD] add sql demo
        > Applying: [ADD] add demo service
        > Applying: [ADD] add demo API
        ```
    - 根据控制台反馈，可以看到 demo 示范的四个提交被重新应用于最新的 origin/master 并且更新了当前分支。

1. 推送到远程仓库
    - 完全提交了本地的改动并且也已经同步主干分支后，可以将当前分支推送到远程仓库
        ```bash
        git push origin feature
        ```
    - 若因为 `rebase` 操作导致分支历史改变，与远程仓库的分支不兼容。可能需要加上 `--force` 或 `-f` 参数进行强制推送。
    - 强制推送是一个危险操作，进行这个操作前务必慎重。具体参见 [Will Anderson 的文章](https://willi.am/blog/2014/08/12/the-dark-side-of-the-force-push/)。

1. 提出合并请求
    - 发出 `feature` 到 `master` 的合并请求，或是按实际情况的合并请求。
    - 向项目代码的管理者提出 code review 要求。
    - 根据 reviewer 提出的建议等进行讨论修改代码，再次提交，重复 code review
    - 在代码审核通过后，接受合并请求，并删除该分支。（强烈建议此步由 reviewer 或是管理者操作）

## 注意事项

1. 每日工作结束前，必须提交当前的工作目录改动，无论是否完成功能点。

1. 不论采用哪种分支管理策略，务必严格遵守操作规范。

1. 提交信息应能清晰描述所做的改动，方便后来人的阅读。

1. 提交信息可以视具体项目的规定来提交，但是一定要保证格式统一。建议包括改动类型、改动文件位置、改动内容、关联 issue 信息等。

1. 禁止任何不能清晰表达改动的提交信息。

1. 如有条件，修改他人关键代码部分最好能够通知当事人。比如口头通知或是代码审核增加 reviewer 等。

1. 合理使用 `git status` 命令，任何情况特别是失误操作后，随时可以使用该命令查看当前状态。特别建议新手在每一步的操作中间都增加 `git status` 命令。

1. 严禁对 origin 仓库的强制推送，不论方式。除非目标是自己的开发分支并且了解强制推送会造成的后果。

1. 在要进行或是测试危险操作前，备份当前分支。防止意外造成代码丢失。

1. 远程仓库合并结束后，必须删除源分支。建议在合并请求勾选 `Remove source branch` 选项。

1. 严禁任何类似 `[FIX] Handling conflicts` 的提交。


## 危险操作

所有可能改变工作目录代码的操作都会是危险操作。所有相关操作过程都需要格外慎重。

以下列举一些较为常见的 git 上可能会接触使用到的危险操作。

1. 解决冲突
    - 代码冲突是 git 使用过程中最常见的问题，大量的冲突往往是因为当前分支同步不及时导致的。所以再次强调及时同步。
    - 解决冲突时一定要细心，从代码的第一行开始，由上至下解决冲突部分。
    - 当冲突代码中存在逻辑冲突的，需要仔细分析。如有条件，与当前冲突提交的提交人协商讨论。
    - 解决冲突完成后，全文搜索冲突标志。即 `<<<<<<<` 、 `=======` 、 `>>>>>>>` 。
    - 冲突解决完成后，提交前必须再次运行并且测试代码。

1. 强制推送
    - `git push --force`
    - 强制推送是一个不可避免的危险操作，慎重使用。
    - 若因为种种原因导致分支历史改变，与远程仓库的分支不兼容。可能需要加上 `--force` 或 `-f` 参数进行强制推送。
    - 强制推送是一个危险操作，进行这个操作前务必慎重。具体参见 [Will Anderson 的文章](https://willi.am/blog/2014/08/12/the-dark-side-of-the-force-push/)。

1. 重置
    - `git reset`
    - reset 分为 hard-reset 和 soft-reset 。
    - soft-reset 将撤回对应的提交信息。
    - hard-reset 将撤回对应的提交信息以及所有修改。
    - 重置前务必确认当前分支做了备份，以免代码遗失。

1. 储藏
    - `git stash`
    - 储藏是个很便捷的应用，但是不推荐使用。
    - 当因为种种原因需要切换当前分支，但是暂存区或者工作目录里，还存在没有提交的修改，它会和你即将检出的分支产生冲突从而阻止 Git 为你切换分支。
    - 切换分支的时候最好保持一个清洁的工作区域，这时可能会用到 `git stash` 命令。
    - “储藏”可以获取你工作目录的中间状态——也就是你修改过的被追踪的文件和暂存的变更——并将它保存到一个未完结变更的堆栈中，随时可以重新应用。
    - 对于新手时常能造成工作内容丢失，储藏内容丢失等等意外情况。没有充分练习掌握请勿使用以免造成损失。
    - 可以使用 `git commit` 和 `git reset` 组合来替代， `git reset` 虽然同样是个危险操作，但是掌控比储藏操作来的更加简单。

1. 变基
    - `git rebase`
    - 把一个分支中的修改整合到另一个分支的办法有两种： `merge` 和 `rebase` 。 `rebase` 可以把在一个分支里提交的改变移到另一个分支里重放一遍。
    - `rebase` 的操作不当，可能导致原分支被修改等后果。作为一个危险操作，需要慎重。
    - 变基操作解决冲突后应执行 `git add .` 和 `git rebase --continue` ，而不是 `git commit` 命令。
    - 变基操作在操作规范中已有提及，还可以参考 [Git 分支 - 分支的变基](https://git-scm.com/book/zh/v1/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E5%8F%98%E5%9F%BA)

1. 抛弃文件修改
    - `git checkout -- demo.demo`
    - 抛弃文件的改动，使文件恢复到修改前的状态。
    - 在使用前，对当前分支备份。

1. 重写历史
    - 在 Git 上工作的时候，你也许会由于某种原因想要修订你的提交历史。
    - 通过 amend-commit 、 reset 、 rebase 等多种操作都能达到这个效果，具体参见 [Git 工具 - 重写历史](https://git-scm.com/book/zh/v1/Git-%E5%B7%A5%E5%85%B7-%E9%87%8D%E5%86%99%E5%8E%86%E5%8F%B2)。

## 修改分支相关联问题

点击`修改分支`可以更改、清空分支相关联的问题。
<blockquote class="note">
  若分支创建时未关联问题，并且分支名称是以某一个问题的issue号开头的则修改分支相关联问题时系统会默认勾选该问题。
</blockquote>

## 创建合并请求
![](/docs/user-guide/development-pipeline/image/branch.png "branch")

点击`创建合并请求`按钮，系统会默认打开gitlab的创建合并请求的界面，其中源分支就是点击列的分支，目标分支默认是master，用户可以更改。

## 删除分支

点击`删除分支`按钮，将会删除该分支。

## 更多操作
- [标记管理](../tag)
- [合并请求](../merge-request)
- [持续集成](../continuous-integration)