+++
title = "Kafka监控"
description = "监控kafaka的topic，消费延迟等"
weight = 11
+++

# Kafka监控

## 操作指南

左上角 `topic` 菜单可切换监控的话题， `consumergroup` 菜单可切换消费组 。如下图所示：

![kafka_template](/docs/user-guide/operating-manage/application-monitoring/image/kafka_template.png)

## 监控指标

 - offset监控: `offset增长速度` 显示当前所选topic中消息增长速度。

 - 消费延迟监控: `消费组延迟` 显示订阅当前topic的消费组的消费进度，以延迟形式表示。 

 - topic监控: `topic消费总数` 显示所选topic中全部消息数量（包括已清除的历史消息），`topic分区数` 显示选中topic中的分区数量，`现存消息总量` 显示所选topic中现存消息数量（不包括已清除的消息）

 - 消费速率监控: `消费速率` 显示所选消费组对当前topic的消费速度。

 - 分区监控: `分区主节点ID` 显示选定topic中每个分区的主节点id，`分区ISR数量` 显示每个分区的可用副本数量。

## 更多操作
- [Elasticsearch监控](../elasticsearch)
- [Kibana基础入门](../kibana)
- [MySQL监控](../mysql)
- [zipkin操作指南](../zipkin)