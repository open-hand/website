+++
title = "Kibana监控"
description = ""
weight = 12
+++

# Kibana基础入门

## 前言
Kibana是一个开源的分析与可视化平台，设计出来用于和Elasticsearch一起使用的。你可以用kibana搜索、查看、交互存放在Elasticsearch索引里的数据，使用各种不同的图表、表格、地图等kibana能够很轻易地展示高级数据分析与可视化。

## 演示

上图中，提示你所拥有的索引，并要求你编写一个对应的模式，我们需要手动配置。在 Index Pattern 下边的输入框中输入 access-*(Elasticsearch中存在的一个索引开头)，它是 Elasticsearch 中的一个索引名称开头。

Kibana 会自动检测在 Elasticsearch 中是否存在该索引名称，如果有，则下边出现 `Create` 按钮，我们点击进行创建并来到如下界面：

![kibana-index_pattern](/docs/user-guide/operating-manage/application-monitoring/image/kibana-index_pattern.png)


#### Discovery

在`Discovery` 菜单界面中，通过查询语句，过滤结果，即可查看文档数据，可以看到相关的统计情况比如文档总数，字段总数，并通过可视化查看。

点击左侧 `Discovery` 菜单，来到如下界面：

![kibana_discover](/docs/user-guide/operating-manage/application-monitoring/image/kibana_discover.png)

点击标签，可以筛选数据的值。

不了解查询条件如何使用，点击 Uses lucene query syntax可以到语法页面，可参考使用。
            

#### Visualize

`Visualize` 菜单界面主要用于将查询出的数据进行可视化展示，且可以将其保存或加载合并到 Dashboard 中。

点击左侧 `Visualize` 菜单，再点击界面中间的 `Create a visualization` 按钮：

本次测试选择柱状图演示，点击柱状图

点击右上角`Save` 按钮可以进行保存。笔者将该可视化保存为 “test-Visualize”。

####  Dashboard

在`Dashboard` 菜单界面中，可以组合在Visualize菜单中保存的可视化数据，并对其进行排列。

点击左侧 `Dashboard` 菜单，再点击界面中间的 `Create a dashboard` 按钮进行创建：


####  Timelion

`Timelion` 是一个时间序列数据的可视化，可以结合在一个单一的可视化完全独立的数据源。它是由一个简单的表达式语言驱动的，用来检索时间序列数据，进行计算，找出复杂的问题的答案，并可视化的结果。


#### Dev Tools

`Dev Tools` 菜单界面使用户方便的通过浏览器直接与 Elasticsearch 进行交互，发送请求即可操作Elasticsearch中的数据 


## 参考资料

- [**Kibana官方文档**](https://www.elastic.co/guide/en/kibana/current/getting-started.html)

