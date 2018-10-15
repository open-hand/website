+++
title = "第七步：安装监控及日志"
description = "第七步：安装监控及日志"
date = 2018-03-30T13:06:38+08:00
draft = false
weight = 27
+++

# 部署与配置

此章节提供如果安装监控、日志及调用链的教程。安装这些服务以提高系统稳定性，帮助开发者发现瓶颈。当系统出现问题时告警。你可以选择安装或者不安装这些服务都不会影响Choerodon的正常运行。

<blockquote class="warning">
  <ul>
  <li>如果需要部署调用链，则必须先安装Elasticsearch</li>
  <li>部署下列服务需要额外的资源</li>
  <li>安装命令基于NFS存储进行部署，非NFS存储不能使用本教程命令</li>
  <li>请确认集群中每个节点都安装了nfs-utils，若未安装请进行<a href="../nfs/#客户端挂载nfs服务器共享目录" target="_blank">安装</a></li>
  <li>请注意所有目录都是基于NFS Server主机的根目录，并非mount到的主机上的根目录，请清楚之间的关系，NFS相关信息请参考<a href="../nfs" target="_blank">这里</a></li>
  </ul>
</blockquote>

## 前置要求与约定

- 硬件要求：
    - 核心数量：2核2线程及以上
    - 内存信息：4G及以上
    - 节点数量：3+       
    <blockquote class="note">
    由于Elasticsearch大量的io操作，部署Elasticsearch时会将Elasticseach分别部署在不同的节点。即使某节点有很大的内存剩余也不会部署两个Elasticsearch到同一节点上。
    </blockquote>