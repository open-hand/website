+++
title = "日志部署"
description = "日志部署"
weight = 26
+++

## 前置要求与约定

日志作为独立的一部分，如果您选择安装，需要准备额外的资源：

- 内存: 12G及以上(3个节点每个节点空闲4G以上)
- 磁盘: ssd或高速存储介质50G及以上(根据实际情况增加磁盘)
- CPU: 4核4线程及以上

## 部署日志组件

<blockquote class="note">
日志非平台运行的必要组件，但如果需要安装调用链则需要安装。安装日志组件，可以统一查看日志和搜索日志。
</blockquote>

### 添加choerodon chart仓库

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

### 创建日志存储卷（绑定SSD磁盘）

- 在有<span style="color: red">SSD磁盘</span>的主机上配置NFS Server
    - 假设SSD磁盘挂载到目录 `/ssd` 上
    - 编辑`/etc/exports`文件添加需要共享目录及参数

        ``` bash
        /ssd 192.168.1.1/16(rw,sync,insecure,no_subtree_check,no_root_squash)
        ```

- 配置完成后，启动 NFS Server：

    ``` bash
    sudo systemctl enable nfs-server
    sudo systemctl start nfs-server
    ```

- 在可执行helm命令的主机上，使用helm命令安装`ssd-nfs-client-provisioner`
{{< annotation shell "提供NFS服务的主机IP地址或域名" "NFS服务共享的目录">}}
helm install c7n/nfs-client-provisioner \
    --set rbac.create=true \
    --set persistence.enabled=true \
    --set storageClass.name=ssd \
    --set storageClass.provisioner=choerodon.io/ssd-nfs-client-provisioner \
    --set persistence.nfsServer=127.0.0.1 \(1)
    --set persistence.nfsPath=/ssd \(1)
    --version 0.1.0 \
    --name ssd \
    --namespace logging
{{< /annotation >}}

<blockquote class="note">
更多详情可参考<a href="../../nfs" target="_blank">NFS动态存储卷</a>搭建
</blockquote>

### 安装日志组件

- 安装Elasticsearch

    ```bash
    helm install c7n/elasticsearch \
         --name elasticsearch \
         --set data.persistence.storageClass=ssd,data.storage=20Gi \
         --set master.persistence.storageClass=ssd,data.storage=5Gi \
         --version=1.13.2-1 \
         --namespace logging
    ```

   有关elasticsearch chart的介绍可在此处查询[helm charts](https://github.com/helm/charts/tree/master/stable/elasticsearch)
   elasticsearch启动速度与您的网络磁盘性能有关。

- 安装日志收集服务

    ```bash
    helm install c7n/choerodon-logging \
        --set fluent-bit.es.host="elasticsearch.logging" \
        --version=0.8.2 \
        --name=choerodon-logging \
        --namespace=logging
    ```

- 安装kibana

    ```bash
    helm install c7n/kibana \
        --set elasticsearch.host="elasticsearch.logging" \
        --set service.enabled=true \
        --set ingress.enabled=true \
        --set ingress.host=kibana.example.choerodon.io \
        --version=0.8.1 \
        --namespace=logging \
        --name=kibana
    ```

部署完成后打开kibana按照提示创建index即可查看相应的日志
