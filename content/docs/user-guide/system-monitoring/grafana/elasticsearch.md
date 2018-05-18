+++
title = "Elasicsearch监控"
description = ""
weight = 2
+++

# Elasicsearch监控

## 操作指南

左上角 `node` 菜单可切换监控的节点 。如下图所示:

![04](/docs/user-guide/system-monitoring/grafana/image/04.png)

## 监控指标

 - 堆栈监控: `HEAP USED` 用折线图显示堆栈已用的百分比。

 - GC监控: `GC COUNT` 统计节点进行内存回收的次数。

 - 等待中任务监控: `Pending task number` 用折线图表示等待的任务数量。

 - 任务最大等待时间: `Max task wait time` 表示任务的最大等待时间的折线图。

 - 磁盘监控: `Disk io bytes` 表示实时的磁盘读写数据大小， `Disk io operations` 表示实时磁盘读写操作次数。