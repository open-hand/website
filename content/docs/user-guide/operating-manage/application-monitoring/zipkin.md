+++
title = "调用链监控"
description = ""
weight = 14
+++

#  zipkin操作指南

##  概念

Span:基本工作单元，一次链路调用(可以是RPC，DB等没有特定的限制)创建一个span，通过一个64位ID标识它， 
span通过还有其他的数据，例如描述信息，时间戳，key-value对的(Annotation)tag信息，parent-id等,其中parent-id 
可以表示span调用链路来源，通俗的理解span就是一次请求信息

Trace:类似于树结构的Span集合，表示一条调用链路，存在唯一标识

Annotation: 注解,用来记录请求特定事件相关信息(例如时间)，通常包含四个注解信息

```
cs - Client Start,表示客户端发起请求

sr - Server Receive,表示服务端收到请求

ss - Server Send,表示服务端完成处理，并将结果发送给客户端

cr - Client Received,表示客户端获取到服务端返回信息
```


BinaryAnnotation:提供一些额外信息，一般已key-value对出现

##  页面介绍

上图是zipkin的筛选菜单,有以下几个过滤维度：
1，服务名
2，url
3,时间区间 start time - end time
4,Duration 只显示时长大于所填值的trace
5,条数限制 只显示当前排序规则下前N条数据

![zipkin_sort](/docs/user-guide/operating-manage/application-monitoring/image/zipkin-sort.png)

点击`Find Traces`按钮，将依据指定的过滤规则，过滤出结果;
使用`Sort`可以改变排序规则。有六种排序规则
点击`JSON`按钮，可以切换图标形式和Json形式

点击`Find Traces`按钮，列出了适合条件的trace标签。


## 详细介绍

![zipkin-detail](/docs/user-guide/operating-manage/application-monitoring/image/zipkin-detail.png)

点击某一trace，即可进入该trace的详细页面，可以看出调用链中的span顺序，每个span标注其所消耗的时间

![zipkin-detail2](/docs/user-guide/operating-manage/application-monitoring/image/zipkin-detail2.png)

点击每个span，可以看出其详细的API调用顺序，通过对sr,ss,cs,cr时间的计算，可以得出每个调用的详细延迟，从而对调用链进行相应的分析。



