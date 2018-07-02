+++
title = "节点监控"
description = "显示 Kubernetes 集群中的节点指标"
weight = 22
+++

# 节点监控

## 操作指南

左上角 `cluster` 菜单可切换集群， `node` 菜单可切换集群中的节点 。如下图所示：

![02](/docs/user-guide/operating-manage/basic-monitoring/image/node_template.png)

## 监控指标

 - 内存指标: `Memory Used` 显示已用内存，`Memory` 显示节点机器总内存数。

 - CPU 指标: `CPU Used` 显示已用CPU（每个核心），`CPU CORES` 显示节点机器CPU核心数。

 - 内存交换指标: `Swap Used` 显示已用内存交换空间，`Swap` 显示内存交换区总大小。

 - 硬盘指标: `Disk on '/' Used` 显示 '/' 路径下硬盘占用，`File System` 显示文件系统大小。

 - CPU 占用折线图: `(NodeName) cpu` 使用折线图展示所选节点不同时间的 cpu 占用率。

 - Pod CPU 使用折线图: `Pod Cpu` 使用折线图展示节点上运行的 Pod 的 Cpu 负载折线图。使用不同显色表示不同Pod。

 - Pod 内存占用折线图: `Pod Memory Percentage` 使用折线图展示节点上运行的 Pod 的内存占用，以相对于节点内存的百分比形式展示。使用不同显色表示不同Pod。

 - Pod 内存用量折线图: `Pod Memory` 使用折线图展示节点上运行的 Pod 使用了多少内存。使用不同显色表示不同 Pod。

 - 节点网络使用情况折线图: `Node Network` 使用折线图展示节点收发两端的带宽占用。绿色线条代表接收，黄色线条代表发出。

 - Pod 网络用量折线图: `Pod Network Receive` 代表节点上不同 Pod 使用的下行带宽，`Pod Network Trasmit` 代表节点上不同 Pod 使用的上行带宽。使用不同显色表示不同 Pod。