+++
title = "应用版本"
description = "由于 Choerodon 采用 GitLab 管理分支，所以对于版本的控制也是根据 Feature、Release、Hotfix、Bugfix、custom 等分支在 GitLab 的 CI/CD 进行的， 针对具体分支上提交可以生成相应的版本。"
weight = 3
+++

# 应用版本
 
 由于 Choerodon 采用 GitLab 管理分支，所以对于版本的控制也是根据 Feature、Release、Hotfix 等分支在 GitLab 的 CI/CD 进行的

  - **菜单层次**：项目层
  - **菜单路径**：应用管理 > 应用版本
  - **默认角色**：项目所有者、项目成员

## 查看应用版本详情

 1. 进入`应用管理`后，点击 `应用版本` 页签；

 1. 查看应用版本信息。

![](/docs/user-guide/application-management/image/version.png "version") 

 - 版本：迭代升级中对应的不同版本；

 - 编码：创建应用的自定义编码；

 - 名称：创建应用的自定义名称；

 - 生成时间：应用创建时的时间。
 
## 版本生成相关变量

- 各变量说明如下：

    变量|说明  
    --- | ---
    C7N_COMMIT_TIME|本地Commit代码的时间，格式为`年.月.日-时分秒`，例如 `2018.7.9-192511`
    C7N_COMMIT_SHA|Commit的Sha值前八位
    C7N_BRANCH|当前提交分支名
    C7N_VERSION|Choerodon平台提供的默认版本号，格式为：`C7N_COMMIT_TIME-C7N_BRANCH`。若为切出的 tag 则为 tag 的值。
    
    > e.g. 分支名为feature-demo，提交时间2018年07月09日19:25:11， 那么得到的C7N_VERSION值为：2018.7.9-192511-feature-demo。若打 tag 为0.5.0，则得到的C7N_VERSION值为0.5.0。

- **注意：** 因为生成Chart包时所指定的版本号必须符合[语义化版本](https://semver.org/lang/zh-CN/)规则，这也是`C7N_COMMIT_TIME`时间戳格式为`年.月.日-时分秒`的原因。

## 更多操作
- [应用管理](../application)
- [应用发布](../application-release)
- [应用市场](../application-market)