+++
title = "查看应用服务版本"
description = ""
weight = 4
+++

## 1 概述
Choerodon支持多种分支管理模型，例如Gitflow、Gitlabflow、Githubflow等。在Choerodon中系统默认有feature、release、hotfix、bugfix、custom等5种类型的[分支](../../code-manage/manage-branch)，通过这些分支的不同组合，以适应不同的分支模型和管理需求。

## 2 查看应用服务版本详情

1. 进入`应用服务`后，在应用服务列表中点击某个服务的名称，点击`服务版本`页签进入服务版本详情页；
2. 查看该应用服务的所有版本信息，并可通过过滤表快速搜索版本号。

![image](/docs/user-guide/development/application-service/image/app-service-08.png)

* 版本：迭代升级中对应的不同版本；
* 生成时间：应用服务版本的生成时间；

## 3 版本生成相关变量说明
各变量说明如下：
|变量|说明|
| --- | --- |
|C7N_COMMIT_TIME| 本地Commit代码的时间，格式为年.月.日-时分秒，例如 2018.7.9-192511 |
|C7N_COMMIT_SHA|Commit的Sha值前八位|
|C7N_BRANCH|当前提交分支名|
|C7N_VERSION|Choerodon平台提供的默认版本号，格式为：C7N_COMMIT_TIME-C7N_BRANCH。若版本号为切出的 tag， 则展示为 tag 的名称。|

Eg： 分支名为feature-demo，提交时间2018年07月09日19:25:11， 那么得到的C7N_VERSION值为：2018.7.9-192511-feature-demo。若创建 tag 为0.5.0，则得到的C7N_VERSION值为0.5.0。

<blockquote class="note">
  注：因为生成Chart包时所指定的版本号必须符合语义化版本规则，这也是C7N_COMMIT_TIME时间戳格式为年.月.日-时分秒的原因。
    </blockquote>

## 4 阅读更多
* [创建应用服务](../create-app-service)
* [导入应用服务](../import)
* [权限分配](../permission)
* [共享应用服务](../sharing)
* [标记管理](../../code-manage/sign)