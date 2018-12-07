+++
title = "NFS动态存储卷"
description = "NFS动态存储卷"
weight = 5
+++


# NFS动态存储卷

## 预备知识

如果你不知道NFS是做什么的，那么请参考下面链接（包括但不限于）进行学习：

- [NFS](https://baike.baidu.com/item/NFS/812203)

## 添加choerodon chart仓库

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```


## 安装步骤

- 在集群每一个节点安装`nfs-utils`

    ```
    sudo yum install -y nfs-utils
    ```

- 搭建NFS服务器，安装`nfs-provisioner`

    <blockquote class="note"> 
    如果您的环境中已经有NFS服务器请忽略此项，直接安装client即可。
    </blockquote>     


    {{< annotation shell "集群内提供存储的节点的Node Name，可通过 kubectl get node 命令查看" "该节点的物理目录，需手动创建">}}
    helm install c7n/nfs-provisioner \
        --set rbac.create=true \
        --set persistence.enabled=true \
        --set persistence.nodeName=node1 \(1)
        --set persistence.hostPath=/data \(1)
        --version 0.2.0 \
        --name nfs-provisioner \
        --namespace kube-system
    {{< /annotation >}}


- 在Kubernets集群中部署NFS-Client，安装`nfs-client-provisioner`

    {{< annotation shell "提供NFS服务的主机IP地址或域名" "NFS服务共享的目录">}}
    helm install c7n/nfs-client-provisioner \
        --set rbac.create=true \
        --set persistence.enabled=true \
        --set storageClass.name=nfs-provisioner \
        --set persistence.nfsServer=127.0.0.1 \(1)
        --set persistence.nfsPath=/u01/prod \(1)
        --version 0.1.0 \
        --name nfs-client-provisioner \
        --namespace kube-system
    {{< /annotation >}}


## 验证安装

- 新建`write-pod.yaml`文件，粘贴以下内容：

        kind: Pod
        apiVersion: v1
        metadata:
          name: write-pod
        spec:
          containers:
          - name: write-pod
            image: busybox
            command:
              - "/bin/sh"
            args:
              - "-c"
              - "touch /mnt/SUCCESS && exit 0 || exit 1"
            volumeMounts:
              - name: nfs-pvc
                mountPath: "/mnt"
          restartPolicy: "Never"
          volumes:
            - name: nfs-pvc
              persistentVolumeClaim:
                claimName: myclaim
        ---
        kind: PersistentVolumeClaim
        apiVersion: v1
        metadata:
          name: myclaim
        spec:
          accessModes:
            - ReadWriteOnce
          storageClassName: nfs-provisioner
          resources:
            requests:
              storage: 1Mi

- 部署测试用例

    ```yaml
    kubectl apply -f write-pod.yaml
    ```

- 验证是否正常

    ```console
    $ kubectl get po
    NAME                            READY     STATUS      RESTARTS   AGE
    write-pod                       0/1       Completed   0          8s
    ```

      pod状态为`Completed`则为正常，若长时间为`ContainerCreating`状态则为不正常，请确认安装操作步骤是否正确。

- 清除测试用例

    ```yaml
    kubectl delete -f write-pod.yaml
    ```