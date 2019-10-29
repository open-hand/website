+++
title = "导入应用服务"
description = ""
weight = 2
+++

# 导入应用服务

## 1. 概述


导入应用服务目前有3个来源，分别是：共享应用（组织内其他项目共享至本项目下的应用服务）、GitHub与GitLab。目的是从这些来源中导入已有的应用服务及其对应的[代码仓库](../../code-manage/repository)，并支持在已有应用服务的基础上进行开发，以此来避免重复造轮子的情况。

首先在应用服务界面中点击`导入应用服务`，进入到导入应用服务界面；接着选择来源，再根据所选的来源采用不同的导入方式，最终将选中的应用服务导入到该项目下。  

> 仅项目所有者角色能使用此功能；想了解如何在项目下分配角色，请参考[团队成员](../../../cooperation/teammember)页面。

## 2. 具体来源与步骤

### 2.1 共享应用 

![image](/docs/user-guide/development/application-service/image/app-service-03.png)

1. 选择导入方式为`共享应用`，点击 `添加应用服务`按钮，右侧弹出选择应用服务的页面。
2. 选择需要导入的应用服务，此处可多选（即支持批量导入应用服务）。选好后，点击添加，回到导入界面。  
    - 此处的应用服务来自于组织内其他项目（即组织内其他项目通过设置[共享规则](../sharing)共享出来的应用服务）。
3. 修改应用服务；在导入界面的应用服务列表中可直接对服务的名称、编码和版本进行修改。
    - 服务名称：由于应用服务名称在项目下唯一，因此导入时，平台会去校验名称是否重复；若存在重复名称，则需修改后才可导入。
    - 服务编码：Gitlab 仓库的地址将会取编码作为仓库地址中的一段路径，因此应用服务编码在项目下唯一。只有编码无重复时，才允许导入。
    - 服务版本：导入应用服务时，仅导入该服务对应的代码仓库，因此，此处的服务版本是指该服务版本对应的代码仓库。此外，只会在下拉框中显示近40条版本以供选择。若想选择其他版本，请直接在下拉框中精确搜索对应的版本即可。

### 2.2 从GitHub导入 

![image](/docs/user-guide/development/application-service/image/app-service-04.png)

1. 选择导入方式为 `从GitHub导入`。
2. 选择导入来源。
    - 系统预设模板：即系统预设的应用服务模板，其中包括了：微服务-MicroService；web前端-MicroServiceFront；Java库-JavaLib；Java库-SpringBoot；Go库-GoTemplate；自动化测试Mocha-ChoerodonMochaTemplate。 
    - 已有应用服务：即在GitHub上已存在的自定义应用服务。
3. 输入GitHub仓库地址。
    - 若选择来源为`系统预设模板`，则直接选择对应的应用服务模板即可，平台会自动生成对应的GitHub地址。
    - 若选择来源为`已有应用服务`，则需要手动输入对应的GitHub地址。
4. 输入应用服务名称；服务名称在项目下唯一。  
5. 输入应用服务编码；服务编码在项目下唯一。

<blockquote class="note">
目前仅支持从GitHub公库导入应用服务；且不能导入空库。
    </blockquote>

### 2.3 从GitLab导入 

![image](/docs/user-guide/development/application-service/image/app-service-05.png)

1. 选择导入方式为 `从GitLab导入`，输入GitLab仓库地址。
2. 若为私库，还需输入私有Token。
3. 输入应用服务名称；服务名称在项目下唯一。  
4. 输入应用服务编码；服务编码在项目下唯一。
 
<blockquote class="note">
目前支持从GitLab的公库和私库导入应用服务；且不能导入空库。
    </blockquote>

## 3. 阅读更多

* [团队成员](../../../cooperation/teammember)
* [权限分配](../permission)
* [共享应用服务](../sharing)

