+++
title = "第三步：NFS动态存储卷"
description = "第三步：NFS动态存储卷"
weight = 15
+++

# NFS动态存储卷

## 前置要求

- 系统要求：CentOS

## 预备知识

如果你不知道NFS是做什么的，那么请参考下面链接（包括但不限于）进行学习：

- [NFS](https://baike.baidu.com/item/NFS/812203)

## 创建 NFS 服务器

NFS 允许系统将其目录和文件共享给网络上的其他系统。通过 NFS，用户和应用程序可以访问远程系统上的文件，就象它们是本地文件一样。

### 安装nfs-utils

- 在集群每一个节点安装`nfs-utils`

    ```
    sudo yum install -y nfs-utils
    ```

### 配置nfs-server
- 创建共享目录

    ```
    mkdir -p /u01/prod
    ```

- 编辑`/etc/exports`文件添加需要共享目录，每个目录的设置独占一行，编写格式如下：

    ```
    NFS共享目录路径 客户机IP段(参数1,参数2,...,参数n)
    ```

- 例如：

    ```
    /u01 192.168.1.1/16(rw,sync,insecure,no_subtree_check,no_root_squash)
    ```

    | 参数 | 说明 |
    | :--- | :--- |
    | ro | 只读访问 |
    | rw | 读写访问 |
    | sync | 所有数据在请求时写入共享 |
    | async | nfs在写入数据前可以响应请求 |
    | secure | nfs通过1024以下的安全TCP/IP端口发送 |
    | insecure | nfs通过1024以上的端口发送 |
    | wdelay | 如果多个用户要写入nfs目录，则归组写入（默认） |
    | no_wdelay | 如果多个用户要写入nfs目录，则立即写入，当使用async时，无需此设置 |
    | hide | 在nfs共享目录中不共享其子目录 |
    | no_hide | 共享nfs目录的子目录 |
    | subtree_check | 如果共享/usr/bin之类的子目录时，强制nfs检查父目录的权限（默认） |
    | no_subtree_check | 不检查父目录权限 |
    | all_squash | 共享文件的UID和GID映射匿名用户anonymous，适合公用目录 |
    | no_all_squash | 保留共享文件的UID和GID（默认） |
    | root_squash | root用户的所有请求映射成如anonymous用户一样的权限（默认） |
    | no_root_squash | root用户具有根目录的完全管理访问权限 |
    | anonuid=xxx | 指定nfs服务器/etc/passwd文件中匿名用户的UID |
    | anongid=xxx | 指定nfs服务器/etc/passwd文件中匿名用户的GID |

    + 注1：尽量指定IP段最小化授权可以访问NFS 挂载的资源的客户端
    + 注2：经测试参数insecure必须要加，否则客户端挂载出错mount.nfs: access denied by server while mounting

### 启动NFS服务

- 配置完成后，您可以在终端提示符后运行以下命令来启动 NFS 服务器：

    ```
    sudo systemctl enable nfs-server
    sudo systemctl start nfs-server
    ```

### 检查NFS服务提供是否正常

- 到客户机上执行showmount命令进行检查

    ```
    $ showmount -e <NFS服务器IP地址>
    Exports list on <NFS服务器IP地址>:
    /u01
    ```

## 安装 nfs-client-provisioner

### 添加choerodon chart仓库

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```

- 在集群每一个节点安装`nfs-utils`

    ```
    sudo yum install -y nfs-utils
    ```

- 在任意一个master节点执行下面helm命令，安装`nfs-client-provisioner`
{{< annotation shell "提供NFS服务的主机IP地址或域名" "NFS服务共享的目录">}}
helm upgrade --install nfs-client-provisioner c7n/nfs-client-provisioner \
    --set rbac.create=true \
    --set persistence.enabled=true \
    --set storageClass.name=nfs-provisioner \
    --set persistence.nfsServer=127.0.0.1 \(1)
    --set persistence.nfsPath=/u01/prod \(1)
    --version 0.1.1 \
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

    ```
    kubectl apply -f write-pod.yaml
    ```

- 验证是否正常

    ```
    $ kubectl get po
    NAME                            READY     STATUS      RESTARTS   AGE
    write-pod                       0/1       Completed   0          8s
    ```

    pod状态为`Completed`则为正常，若长时间为`ContainerCreating`状态则为不正常，请确认安装操作步骤是否正确。

- 清除测试用例

    ```
    kubectl delete -f write-pod.yaml
    ```