+++
title = "事务定义"
weight = 1
description = "定义分布式系统中分布式事务"
+++

# 事务定义

分布式系统会造成数据一致性问题，由此，产生了分布式事务。分布式事务是指，事务发起者、事务协调者、资源及资源管理器分别位于不同的分布式系统的不同节点上。

使用事务定义，可以使在跨数据库、跨消息、跨微服务的情况下接入事务。从复杂的事务问题中抽出，更好的实现分布式事务，避免了分布式场景下产生数据不一致的问题，且对已有的业务代码不造成干扰。

猪齿鱼使用Saga模式进行事务定义。Saga的定义是Long Lived Transaction（LLT，长活事务)，长是指跨系统的多次“事务”，其核心理念是避免使用长期持有锁（例如两阶段提交）的长事务，而应将事务切分为一组按序依次提交的短事务。Saga一般由多个外部任务构成，需要通过多次外部系统的消息交互，才能将整体事务从开始迁移到结束状态，这与我们原来常见的在一个数据库的短事务是不一样的。

<img class="no-border" src="/docs/user-guide/microservice-development/global-transaction/image/saga-definition.png"/>

Saga采用了BASE（Basic Availability， Soft， Eventual consistency，即基本的可用性，柔性，最终的一致性）事务的方式，也就是走向最终一致性的柔性事务，来避免消耗大量资源的同步、锁定。这与ACID事务，（Atomicity、Consistency、Isolation、Durability，即原子性，一致性，隔离性，持久性），要么一起成功，要么一起失败的方式是不同的。和ACID相比，BASE不能轻易的回滚，只能通过补偿（Compensating）操作达到最终一致性。

- **菜单层次**：全局层
- **菜单路径**：全局事务 > 事务定义
- **默认角色**：平台管理员、平台开发者

## 事务定义列表

事务定义列表的展示字段有：编码、定义的服务、描述。

<img class="no-border" src="/docs/user-guide/microservice-development/global-transaction/image/saga-list.png"/>

- 编码：saga的编码，用来标识事务定义，具有唯一性。
- 所属微服务：定义saga的微服务。一般选择在saga的处理流程中，第一步涉及的微服务，在该微服务中定义saga。
- 描述：saga的描述，说明saga中定义的事务所执行的功能流程。

## 事务定义详情

<img class="no-border" src="/docs/user-guide/microservice-development/global-transaction/image/saga.png"/>

- 点击事务定义列表的操作按钮→<img class="no-border" src="/docs/user-guide/microservice-development/global-transaction/image/particulars.png"/>可查看事务定义的详情。

- 查看事务定义的详情一共有视图和Json文件两种查看方式。图根据Json文件内容所生成。点击流程图中的节点可查看该节点的详细信息。

- 按图的方式查看事务定义：图由输入、任务、输出组成。输入与输出模块呈圆形，任务模块呈正方形。点击输入与任务模块可查看具体信息。点击输入时，展示输入参数信息；点击任务时，展示任务的详情：
     - 任务编码：用来标识任务，具有唯一性。
     - 任务描述：描述任务执行的功能。
     - 序列：任务在执行流程中的执行顺序。
     - 最大重试次数：若任务执行失败后，系统自动重试的次数。
     - 超时时间：若在时间值内未接受到返回消息，则判断为请求超时。
     - 超时策略：超时之后所执行的策略。
     - 所属微服务：定义任务的微服务。

- 按Json的方式查看事务定义：输入、任务、输出信息、执行流程等信息以Json文件的方式展示。

## 更多操作
- [事务实例](../saga-instance)