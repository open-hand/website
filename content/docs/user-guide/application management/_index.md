+++
title = "应用管理"
description = ""
weight = 5
+++

# 应用管理

<h2 id="1">介绍</h2>

本节介绍应用管理，也就是持续交付（Continuous Delivery，简称CD）模块的内容。

持续交付是一种软件开发策略，用于优化软件交付的流程，以尽快得到高质量、有价值的软件。这种方法能帮助组织更快地验证业务想法，并通过快速迭代的方式持续为用户提供价值。

本页面介绍了研发团队在完成敏捷管理后进行产品开发时，如何管理应用、如何使用Git-Flow模型进行分支管理、如何查看持续集成流水线、如何管理容器、如何了解代码质量等。


<h2 id="2">功能</h2>

 - **部署功能** 提供了普通部署功能，普通部署又分为手动部署和自动部署，自动部署建议正式环境不启用。部署功能中还提供取消部署。

- [**环境流水线**](../application-management/continuous-delivery-environment) 面向平台管理员、项目创建者和项目所有者根据不同用途配置相对应的环境信息。可以创建环境，删除环境，及对环境详情信息进行编辑修改。

- [**容器管理**](../application-management/continuous-delivery-container-management) 容器管理是持续交付过程中的完成情况，包括状态、容器名称、应用、容器地址、是否可用等情况信息，从而生成容器日志。每个容器中都运行一个应用并为该应用提供完整的运行环境。

- [**网络管理**](../application-management/continuous-delivery-network-management) 网络管理是针对于应用，是为所选择的应用将网络信息注册至应用管理应用，取消网络，应用将无法访问。

- [**域名管理**](../application-management/continuous-delivery-domain-name) 域名管理针对于Web前端和普通应用，为相应的应用按照一定的命名规则创建可访问的域名。域名可以随时修改。