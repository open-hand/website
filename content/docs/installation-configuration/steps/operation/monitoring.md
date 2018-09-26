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
监控非平台运行的必要组件，安装监控组件可以查看集群各个服务cpu，内存和网络等状态，便于优化和提高资源利用率。
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
创建pvc时注意在nfs中创建对应的目录，并且赋予该文件夹可执行权限
</blockquote>

- 授权 

   在nfs服务器中执行:

   ```bash
   chmod 755 /u01/monitoring
   ```

- 安装监控

    ```bash
    helm install c7n/choerodon-monitoring \
    --set grafana.persistence.enabled=true \
    --set grafana.persistence.existingClaim=monitoring-pvc \
    --set grafana.ingress.enabled=true \
    --set "grafana.ingress.hosts[0]"=grafana.example.com \
    --set alertmanager.persistence.enabled=true \
    --set alertmanager.persistence.existingClaim=monitoring-pvc \
    --set prometheus.persistence.enabled=true \
    --set prometheus.persistence.existingClaim=monitoring-pvc \
    --set prometheus.clusterName=your_cluster_name \
    --name=choerodon-monitorin \
    --version=0.6.0 \
    --namespace=monitoring
    ```

    参数名 | 含义 
    --- |  --- 
    x.persistence.enabled|启用持久化存储
    grafana.ingress.hosts[0]|配置grafana的域名
    prometheus.clusterName|为了区分多集群指定一个集群名称，可以是任意字母组合

<blockquote class="note">
执行之后需要一定的时间等待服务启动和自动导入grafana模板，首次登陆密码为 admin/admin， 登陆会提示修改密码，请同样使用 admin 作为新密码，等待dashboard有内容之后再修改为其他密码。
</blockquote>

- 查看监控

    在浏览器中输入配置的grafana地址即可，更多信息参见[此处](../../../../user-guide/operating-manage/)。
