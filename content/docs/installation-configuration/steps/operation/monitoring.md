+++
title = "监控部署"
description = "监控部署"
weight = 26
+++

## 前置要求与约定

监控作为独立的一部分，如果您选择安装，需要准备额外的资源：

- 内存: 8G及以上
- 磁盘: ssd或高速存储介质50G及以上
- CPU: 2核2线程及以上

## 部署监控组件

<blockquote class="note">
监控非平台运行的必要组件，安装监控组件可以查看集群各个服务cpu,内存和网络等状态，便于优化和提高资源利用率。
</blockquote>

### 添加choerodon chart仓库

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

### 安装监控组件

- 创建存储卷pv和pvc

    ```bash
    helm install c7n/create-pv \
        --set type=nfs \
        --set pv.name=monitoring-pv \
        --set nfs.path=/u01/monitoring \
        --set nfs.server=nfs.example.com \
        --set pvc.name=monitoring-pvc \
        --set size=50Gi \
        --set accessModes={ReadWriteOnce} \
        --name monitoring-pv --namespace=monitoring
    ```
<blockquote class="note">
创建pvc时注意在nfs中创建对应的目录
</blockquote>

- 安装监控

    ```bash
    helm install c7n/choerodon-monitoring \
    --set global.storageType=nfs \
    --set grafana.host=grafana.example.com \
    --set global.persistence.existingClaim=monitoring-pvc \
    --set global.clusterName=example \
    --namespace=monitoring
    ```

    参数名 | 含义 
    --- |  --- 
    global.storageType|存储类型
    grafana.host|配置grafana的域名
    global.persistence.existingClaim|存储的pvc

<blockquote class="note">
执行之后需要一定的时间等待服务启动和自动导入grafana模板
</blockquote>

- 查看监控

    在浏览器中输入配置的grafana地址即可，更多信息参见[此处](../../../../user-guide/operating-manage/)。
