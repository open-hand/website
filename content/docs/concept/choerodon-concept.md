+++
title = "Choerodon 是什么?"
description = "介绍了Choerodon的概念，产品特征和使用价值"
weight = 1
icon = 'icon-choerodon'
+++

# Choerodon 是什么？
---

## 企业级数字化服务平台

Choerodon 猪齿鱼是一个开源企业服务平台，是基于 Kubernetes 的容器编排和管理能力，整合 DevOps 工具链、微服务和移动应用框架，来帮助企业实现敏捷化的应用交付和自动化的运营管理，并提供 IoT、支付、数据、智能洞察、企业应用市场等业务组件，来帮助企业聚焦于业务，加速数字化转型。

![](/docs/concept/image/choerodon1.png) 

Choerodon 使用 Kubernetes 来管理和部署服务。关于 Kubernetes，请参考 [Kubernetes](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/) 概览。

同时，Choerodon 使用 Spring Cloud 作为微服务分布式系统，并且 Choerodon 还使用 Spring Boot 进行了通用性模块的封装，例如组织管理、用户管理、权限管理等；前端使用 React 作为开发组件。关于 Choerodon 的开发请参考 [Choerodon 猪齿鱼微服务开发框架](../../development-guide/) 开发。

有关 Choerodon 组件的详细概念信息，请参阅我们的其他概念指南。

## 为什么要使用 Choerodon ？

Choerodon 解决了开发人员和运维人员面临的许多挑战。随着企业或者组织业务模式不断的互联网化，尤其是对于一些有软件研发能力的公司或者组织，如何有效的应对开发和运维之间的关系，提高IT部门的总体运作效率，以支撑业务的快速发展，已成为了我们面临的重大挑战。

同时，现代企业或者组织对于软件系统的需求，也在随着互联网和大数据等新技术的进步在悄然发生变化，尤其是在数字化转型的思潮中，企业或者组织要求：

- **零宕机**

    部署松耦合的组件，通过冗余来避免故障，零停机的情况下完成升级

- **极短反馈周期**

    经常发布代码，缩短反馈回路，降低风险

- **移动和多设备**

    充分利用移动设备，用户能够在多种设备使用，系统能够适应扩展的需求

- **设备互联**

    互联网连接的设备导致数据量剧增和要求“边缘”的计算能力，需要新的软件设计和实践

- **数据驱动**

    使用数据，通过更智能的应用向客户提供极致的体验和更高的价值

Choerodon 采用 DevOps 的原则和敏捷模型来管理软件的开发和运维，可以有效提高软件交付的质量（比如：提高可用性，提高变更成功率，减少故障等），加快产品推向市场（比如：缩短开发周期时间和更高的部署频率），并且提高组织的有效性（比如：将时间花在价值增加活动中，减少浪费，同时交付更多的价值至客户手中），有效地帮助企业或者组织提升 IT 效能。

![](/docs/concept/image/choerodon2.png) 

Choerodon 是将服务和应用构建在 Kubernetes 上，后端服务使用 Spring Boot 开发，前端使用 React 开发。Choerodon 分为两类环境，即应用 PaaS 环境和产品 PaaS 环境，应用 PaaS 环境为主要软件开发区，包括应用构建、敏捷管理、开发管理和持续发布管理等核心功能；产品 PaaS 环境主要软件运行区，包括测试环境、用户集成测试环境、正式环境等，用户可以根据自身需求定义。

## Choerodon 关键特性说明

<img class="no-border" src="/docs/concept/image/wiki-icon.png"> [**知识管理**](../../user-guide/wiki)

根据需求自定义wiki，提供方便的项目协作和强大的内容管理，集中式管理产品相关内容。

<img class="no-border" src="/docs/concept/image/agile-icon.png"> [**敏捷管理**](../../user-guide/agile)

通过故事地图、用户故事来管理用户故事和发布计划，通过迭代来管理冲刺，最后通过看板来可视化冲刺的执行，让需求、计划、执行一目了然，使整个软件开发流程管理规范化。

<img class="no-border" src="/docs/concept/image/application-icon.png"> [**应用管理**](../../user-guide/application-management)

方便地进行应用创建，灵活的版本控制，同时将开发的应用发布至应用市场，并部署应用市场中的项目。

<img class="no-border" src="/docs/concept/image/development-icon.png"> [**开发流水线**](../../user-guide/development-pipeline)

借助 Gitlab CI 作为持续集成工具，提供持续集成的流水线，简化应用开发、缩短应用生命周期，快速迭代。

<img class="no-border" src="/docs/concept/image/test-icon.png"> [**测试管理**](../../user-guide/test-management)

通过测试用例管理、测试循环、测试分析有效的提高软件测试的效率和质量，提高测试灵活性和可视化水平。

<img class="no-border" src="/docs/concept/image/deployment-icon.png"> [**部署流水线**](../../user-guide/deployment-pipeline)

方便地管理各种使用开发部署的应用服务和资源，包括应用启停、状态监控，以及应用对应的版本控制、容器管理等。

<img class="no-border" src="/docs/concept/image/operation-icon.png">[**运营管理**](../../user-guide/operating-manage)

提供一整套完整的运营管理工具，在软件交付生产的各个环节建立数据收集和度量，监控主要包含开发类指标、服务器日志、应用系统日志和微服务调用链等信息；同时，提供各种分析报告，帮助用户优化 IT 资源配置。

<img class="no-border" src="/docs/concept/image/microserver-icon.png"> [**微服务开发**](../../user-guide/system-configuration/microservice-management)

基于 Spring Cloud 的微服务应用开发框架，方便快捷的构建应用服务，简化开发，提高IT系统对业务的支撑能力。