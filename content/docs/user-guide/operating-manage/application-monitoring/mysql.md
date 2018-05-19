+++
title = "MySQL监控"
description = ""
weight = 4
+++

# MySQL监控

## 操作指南

左上角 `Interval` 菜单可切换监控频率， `host` 菜单可切换主机地址 。如下图所示：

![07](/docs/user-guide/operating-manage/application-monitoring/image/mysql_template.png)

## 监控指标

 - 运行时长: `MySQL Uptime` MySQL 服务器自从上次重启运行到现在的时长。

 - 每秒查询速率: `Current QPS` 根据使用 MySQL 的`SHOW STATUS`命令查询到的结果，它是服务器在最后一秒内执行的语句数量。这个变量包含在存储程序中执行的语句，与 Questions 变量不同。

 - InnoDB 缓冲池: `InnoDB Buffer Pool Size` InnoDB 维护一个称为缓冲池的存储区域，用于在内存中缓存数据和索引。了解 InnoDB 缓冲池如何工作，并利用它来将频繁访问的数据保存在内存中，这是 MySQL 调优最重要的方面之一。目标是将工作集保存在内存中。在大多数情况下，这个值应该处于主机上60％-90％的可用内存之间。

 - MySQL 连接数: `MySQL Connections` 是自服务器启动以来同时使用的最大连接数。

 - 客户端活动线程数: `MySQL Client Thread Activity` 未休眠线程数。

 - 服务器执行的语句数: `MySQL Questions` 与 QPS 计算中使用的查询不同，只包括客户端发送到服务器的语句，而不包括存储程序中执行的语句。

 - 线程缓存: `MySQL Thread Cache` 当客户端断开连接时，如果缓存未满，客户端的线程将被放入缓存中。

 - 排序使用情况: `MySQL Sorts` 显示当前排序功能的使用情况。

 - 慢查询使用情况: `MySQL Slow Queries` 显示当前慢查询功能的使用情况。

 - 终止的连接数: `MySQL Aborted Connections` 当一个给定的主机连接到 MySQL 并且连接在中间被中断（例如由于凭证错误）时，MySQL 会将该信息保存在系统表中。

 - 表级锁使用情况: `MySQL Table Locks` MySQL 因各种原因需要多个不同的锁。在这个图表中，我们看到 MySQL 从存储引擎请求了多少个表级锁。

 - 网络流量: `MySQL Network Traffic` 在这里我们可以看到 MySQL 产生了多少网络流量。出站是从 MySQL 发送的网络流量，入站是 MySQL 收到的网络流量。

 - 每小时网络流量: `MySQL Network Usage Hourly` 这里我们可以看到每小时 MySQL 产生多少网络流量。您可以使用条形图来比较 MySQL 发送的数据和 MySQL 收到的数据。

 - 内存概述: `MySQL Network Usage Hourly` 数据库使用的内存情况。

 - 表状态: `MySQL Table Open Cache Status` 正在打开的表的缓存大小。`MySQL Open Tables` 打开的表的数量。 `MySQL Table Definition Cache`  表定义缓存。