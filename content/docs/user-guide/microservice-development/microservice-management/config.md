+++
title = "配置管理"
weight = 3
description = "配置管理用来集中管理应用的当前环境的配置，配置修改后能够实时推送到应用端"
+++

# 配置管理

配置管理用来集中管理应用的当前环境的配置，配置修改后能够实时推送到应用端。

配置与微服务的关系：微服务与配置为一对多的从属关系。一个微服务可以有多个配置，一个配置只能属于一个微服务。

配置与实例的关系：配置与实例为一对多的应用关系。同一个微服务下，一个配置可以被多个实
例应用，一个实例只能应用一个配置。

- **菜单层次**：全局层
- **菜单路径**：微服务管理 > 配置管理
- **默认角色**：平台管理员

## 创建配置

配置必须以已有的配置为模版，在配置模版基础上进行修改从而生成一个新的配置。创建配置步骤如下。

1. 点击`创建配置`按钮。

1. 选择微服务及填写配置基本信息

    - 选择一个微服务：配置属于微服务，先选择微服务是为了定位该微服务下的配置。
    - 选择一个配置模版：选择一个属于该微服务的配置，则新配置以该配置为模版，用户可在配置模版的基础上进行修改。
    - 填写配置版本：系统会自动生成一个配置版本，用户也可根据需求自定义配置版本。

    ![](/docs/user-guide/microservice-development/microservice-management/image/config-basic.png) 

1. 修改配置信息

    - yml文件从上一步所选的配置模版中获取。用户可基于该yml文件修改配置信息。

    ![](/docs/user-guide/microservice-development/microservice-management/image/config-updata.png) 

1. 确认信息并创建

    - 对所创建的配置的信息进行确认，包括配置ID、配置版本、配置所属的微服务以及配置yml详细信息。
    - 配置ID：系统自动生成，全平台唯一，是配置的标志，用户无法修改。配置版本：用户自定义。所属微服务：新创建的配置属于的微服务。
    - 配置yml详细信息：上一步中配置的yml文件，确认信息时为只读形式，如需修改请返回上一步进行修改。
    - 确认信息无误后，点击‘创建’按钮。

    ![](/docs/user-guide/microservice-development/microservice-management/image/config-confirm.png) 

## 基于一个已有配置创建

1. 在配置中选择一条配置，点击更多操作→![detail_button](/docs/user-guide/microservice-development/microservice-management/image/detail_button.png)
 按钮。选择‘基于此配置创建’。

1. 选择微服务及填写配置基本信息

    - 微服务：为服务为所选配置的所属微服务。
    - 配置模版：配置模版为所选配置。
    - 配置版本：系统会自动生成一个配置版本，用户也可根据需求自定义配置版本。

1. 修改配置信息

    - yml文件从上一步所选的配置模版中获取。用户可基于该yml文件修改配置信息。

1. 确认信息并创建

![](/docs/user-guide/microservice-development/microservice-management/image/config.png) 

## 设置默认配置

每个微服务有且仅有一个默认配置，在微服务下新建的实例会自动应用默认配置。设置默认配置的步骤如下。

1. 在配置列表中选择一条配置，点击更多操作→ ![detail_button](/docs/user-guide/microservice-development/microservice-management/image/detail_button.png)按钮。
1. 选择‘设为默认配置’。

## 应用配置

如果配置和实例属于同一个微服务，则实例可以应用配置。一个配置可以被多个实例应用。

1. 在配置列表中选择一条配置，点击更多操作→ ![detail_button](/docs/user-guide/microservice-development/microservice-management/image/detail_button.png)按钮。
1. 选择‘应用配置’。
1. 选择实例，可以选择零个到多个实例。
1. 点击‘保存’。

## 修改配置

1. 在配置列表中选择一条配置，点击更多操作→ ![detail_button](/docs/user-guide/microservice-development/microservice-management/image/detail_button.png)按钮。
1. 选择‘修改’。
1. 修改配置信息。
1. 最后确认信息后点击保存。


## 删除配置

1. 在配置列表中选择一条配置，点击更多操作→ ![detail_button](/docs/user-guide/microservice-development/microservice-management/image/detail_button.png)按钮。
1. 选择‘删除’。
1. 在界面弹出删除确认提示后，点击‘确定’即可删除此配置。

<blockquote class="note">
          默认配置不可删除！
      </blockquote>

## 更多操作
- [什么是微服务](../microservice)
- [实例管理](../instance)
- [路由管理](../route)

