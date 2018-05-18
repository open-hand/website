+++
title = "系统指标"
description = ""
weight = 1
alwaysopen=false
+++
# 系统指标

<h2 id="1">介绍</h2>

使用prometheus进行指标采集，然后使用grafana进行数据图形化展示。

grafana是基于JS开发的，功能齐全的度量仪表盘，可以对接多数据源，实现图形化实时监控。

<h2 id="2">模块</h2>

 - [**节点监控**](../grafana/node) 显示 kubernetes 集群中的节点指标。

 - [**elasticsearch监控**](../grafana/elasticsearch) 显示系统中 elasticsearch 数据库指标。

 - [**kafka监控**](../grafana/kafka) 显示系统中 kafka 消息队列指标。

 - [**mysql监控**](../grafana/mysql) 显示系统中 mysql 数据库指标。

 - [**节点概述监控**](../grafana/allnode) 显示 kubernetes 集群中的节点指标。

<h2 id="2">使用简介</h2>
登录后点击界面左上角方格状下拉列表（如下图）即可切换监控模块。

![01](/docs/user-guide/system-monitoring/grafana/image/01.png)

**菜单中**

`node` 为节点监控模块

`elasticsearch` 为elasticsearch监控模块

`kafka` 为kafka监控模块

`mysql` 为mysql监控模块

`All Node` 为节点概述监控模块