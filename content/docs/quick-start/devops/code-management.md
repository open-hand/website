+++
title = "7.3.代码管理"
description = ""
weight = 3
+++

# 代码管理
## 目标
Choerodon 代码仓库基于 Git 进行代码版本管理。本文档面向初次使用 Choerodon 猪齿鱼的用户，引导新手用户在 Choerodon 猪齿鱼系统中`创建应用服务仓库`、`克隆、推拉代码`。

## 前置条件
1. 已部署安装Choerodon 猪齿鱼，并使用默认的 admin 用户名和密码登录了 Choerodon 系统。
2. 默认的 admin 用户进入 Choerodon 系统后，默认拥有一个组织并为该组织的组织管理员角色。关于Choerodon角色的详情，请移步角色管理。

    |账号|角色|职责|
    |---|---|---|
    |admin|组织管理员|管理组织下的项目和成员（组织成员、项目管理员、项目成员）|
3. 已完成项目创建及团队成员建设。
4. 配置 Git，包括下载安装、设置等。

## 创建应用服务仓库
### 操作示例
1. 路径：开发->应用服务；

2. 点击`创建应用服务`，接着上传服务图标，选择服务类型，输入服务编码和服务名称，最后选择一个已有的应用服务及其对应的版本作为模板（此步骤可选），以此来创建一个应用服务;

3. 创建一个应用服务的同时，会在GitLab中生成一个对应的代码仓库.若不选择任何应用服务作为模板，则默认在GitLab中创建一个空库;

4. 最后，点击`创建`按钮，回到应用服务列表页面；当该应用服务状态变为`启用`时，则创建成功。

![image](/docs/user-guide/development/code-manage/image/code-management-01.png)

## 克隆代码仓库到本地
### 操作示例
1. 路径：开发->代码管理；

2. 通过应用服务选择器选中某个应用服务，点击应用服务下拉框右侧的`复制仓库地址`按钮，选择`复制SSH地址`或是`HTTPS的地址即可`。

![image](/docs/quick-start/devops/image/code-1.png)

 - **HTTPS的地址即可**
     1. 选择“SSH”，复制地址;
     2. 在 Git Bash 中输入克隆命令。

         ```
         git clone  换成你复制的仓库地址
          ```
     
     3. 完成后就可以将github服务器上的仓库克隆到本地。

 - **复制SSH地址** 


## 本地代码推送到仓库

### 操作示例
1. 路径：开发->代码管理->分支管理；

2. 基于主分支 master 创建 feature 分支；

    ![image](/docs/quick-start/devops/image/code-2.png)

3. 基于分支`feature-feifei-05-17` 进行代码修改；
    ```
git checkout feature-feifei-05-17
    ```

4. 将第一次的修改的本地代码保存并提交到分支仓库；

     - 查看代码改动
    ```
git status
     ```
     
     - 追踪文件的版本变化
    ```
git add .
git commit -m "fisrt commit"
    ```
     
     - 提交到分支仓库
     ```
git push
    ```

5. 合并分支;

 - 将分支`feature-feifei-05-17`合并至`master`。创建合并分支请求,点击`创建合并请求`按钮;

     ![image](/docs/quick-start/devops/image/code-3.png)
 
 - 浏览器新开页面，链接至GitLab新建合并请求界面。在GitLab进行相关操作后，平台会请求相关数据，合并请求列表数据将更新。

## 拉取仓库代码到本地
当代码仓库里有文件修改时，可以通过`git pull`命令将远程的代码拉取到本地。

### 操作示例
在 Git Bash 中输入一下命令：

![image](/docs/quick-start/devops/image/code-4.png)

## 下一步
[集群管理](../../../quick-start/devops/cluster-management)