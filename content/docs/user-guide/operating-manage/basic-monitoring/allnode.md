+++
title = "节点概述监控"
description = ""
weight = 5
+++

# 节点概述监控

## 操作指南

左上角 `cluster` 菜单可切换集群， `node` 菜单可切换要显示的节点（可以全选或选择指定节点），`nic` 菜单可以切换选中节点中的网卡，指定要监控那个网卡 。如下图所示：

![03](/docs/user-guide/operating-manage/basic-monitoring/image/allnode_template.png)

## 监控指标

 - 内存指标: `(NodeName) Memory Used` 表示节点内存使用量，展示了已用（绿色）和总共（黄色）两条指标。黄色线条表示总内存，绿色线条表示已用。

 - Cpu 指标: `(NodeName) cpu` 表示节点cpu使用百分比，展示了已用（绿色）和总共（黄色）两条指标。多核时总指标会大于100%（四核即为400%）。

 - 网络指标: `(NodeName) Network` 表示节点指定网卡的用量，展示接收（绿色）、发送（黄色）两端的数据。

 - 文件系统指标: `(NodeName) FileSystem Used` 表示节点磁盘用量。

 - 交换区指标: `(NodeName) Swap Used` 表示节点内存交换区用量。