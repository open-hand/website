+++
title = "安装概述"
description = ""
weight = 1
+++


### 安装概述
---
Choerodon 采用Spring Cloud作为微服务框架，运行在Docker上，以Kubernetes作为容器的编排工具。理论上讲只要服务器资源允许，只要可以运行Kubernetes，就可以在Kubernetes上运行Choerodon。由于Choerodon不是一个单体应用系统，而是一个包含多个微服务的分布式系统，所以安装相对比较复杂，目前，我们不提供基于源码的安装方式，仅提供基于Docker镜像的安装方式。

根据Choerodon的系统架构，Choerodon有两个类型的部署，即开发区和运行区。作为**应用的开发平台**，可以仅安装开发区；作为**应用的运行平台**，可以仅安装运行区；作为**应用PaaS平台**，需要同时安装开发区和与运行区。

### 部署
---
由于Choerodon存在开发区和运行区的概念，所以在具体部署Choerodon的时候就有多种选择。这里有四种部署方式：

1. 仅部署开发相关的微服务，作为应用的开发平台
2. 仅部署运行相关的微服务，作为应用的运行平台
3. 同时部署开发和运行相关的服务，作为应用的PaaS平台。应用的PaaS平台分为两种部署方式：
    - 将开发和运行相关的服务部署在同一个Kubernetes集群上
    - 将开发和运行相关的服务分别部署在不同的Kubernetes集群上

用户可以根据自身的情况来决定采用哪一种方式。为了能够更加清晰的说明Choerodon的部署方式，下面我们将这四种不同的部署方式分别说明。在这之前，我们先来看一下Choerodon的系统服务架构图。关于Choerodon的详细系统架构，请参考[系统架构](./concept/choerodon-system-architecture)。

![](/img/docs/installation-configuration/choerodon-infrastructure.png)

其中，部署管理是属于运行相关的服务，敏捷看板、移动开发、开发管理属于开发相关服务。也就是说，我们在选择安装开发区和运行区的时候，可以根据这几个服务来决定。

#### 仅部署开发相关的微服务
---



#### 仅部署运行相关的微服务
---

#### 将开发和运行相关的服务部署在同一个Kubernetes集群上
---

#### 将开发和运行相关的服务分别部署在不同的Kubernetes集群上
---

HUGO **v0.32** minimum required to use this theme

The following steps are here to help you initialize your new website. If you don’t know Hugo at all, we strongly suggest you to train by following this [great documentation for beginners](https://gohugo.io/overview/quickstart/).
<!--more-->

## Installation

We assume that all changes to Hugo content and customizations are going to be tracked by git (GitHub, Bitbucket etc.). Develop locally, build on remote system.

Before start real work:

1. Initialize Hugo
2. Install DocDock theme
3. Configure DocDock and Hugo

### Prepare empty Hugo site

Create empty directory, which will be root of your Hugo project. Navigate there and let Hugo to create minimal required directory structure:
```
$ hugo new site .
```
AFTER that, initialize this as git directory where to track further changes
```
$ git init
```

Next, there are at least three ways to install DocDock (first recommended):

1. **As git submodule**
2. As git clone
3. As direct copy (from ZIP)

Navigate to your themes folder in your Hugo site and use perform one of following scenarios.

### 1. Install DocDock as git submodule

DocDock will be added like a dependency repo to original project. When using CI tools like Netlify, Jenkins etc., submodule method is required, or you will get `theme not found` issues. Same applies when building site on remote server trough SSH.

If submodule is no-go, use 3rd option.

On your root of Hugo execute:

```
$ git submodule add https://github.com/vjeantet/hugo-theme-docdock.git themes/docdock
```
Next initialize submodule for parent git repo:

```
$ git submodule init
$ git submodule update
```

Now you are ready to add content and customize looks. Do not change any file inside theme directory.

If you want to freeze changes to DocDock theme itself and use still submodules, fork private copy of DocDock and use that as submodule. When you are ready to update theme, just pull changes from origin to your private fork.

### 2. Install DocDock simply as git clone

This method results that files are checked out locally, but won't be visible from parent git repo. Probably you will build site locally with `hugo` command and use result from `public/` on your own.

```
$ git clone https://github.com/vjeantet/hugo-theme-docdock.git themes/docdock
```


### 3. Install DocDock from ZIP

All files from theme will be tracked inside parent repo, to update it, have to override files in theme. [ download following zip](https://github.com/vjeantet/hugo-theme-docdock/archive/master.zip) and extract inside `themes/`.

```
https://github.com/vjeantet/hugo-theme-docdock/archive/master.zip
```
Name of theme in next step will be `hugo-theme-docdock-master`, can rename as you wish.

## Configuration

[Follow instructions here]