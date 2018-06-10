+++
title = "NFS部署"
description = "NFS部署"
weight = 5
+++

# NFS部署

## 前置要求

- CentOS7.2+

## 结点信息

|主机名(hostname)|主机IP|描述|
|:---:|:---:|:---:|
|vs01|192.168.1.1|nfs服务器|
|vs02|192.168.1.2|nfs客户端|

## NFS服务端安装及配置

### 安装NFS服务端

<blockquote class="note">
在CentOS6.X及以上版本是默认已经安装了NFS服务端的，如果你操作系统的版本符合上述要求，可跳过此步，也可执行此命令进行依赖包升级。
</blockquote>

```bash
sudo yum upgrade -y && sudo yum install -y nfs-utils portmap
```

### 配置NFS服务端

- NFS服务的配置文件为：`/etc/exports`，这个文件是NFS的主要配置文件，不过系统并没有默认值，所以这个文件不一定会存在，可能要使用`vim`手动建立，然后在文件里面写入配置内容。

    - `/etc/exports`文件内容格式：

    ```
    <输出目录> [客户端1 选项（访问权限,用户映射,其他）] [客户端2 选项（访问权限,用户映射,其他）]
    ```

    - 例子：

    ```bash
    # 创建文件目录
    mkdir -p /u01

    # /u01 为上面创建的目录。
    # 192.168.0.0/16为要连接到这台文件服务器的客户端的ip地址，这里使用的是掩码的方式。
    # 其他配置请看本文“详细配置选项”，这里不再累述。
    echo '/u01 192.168.0.0/16(rw,sync,no_root_squash,no_all_squash)' >> /etc/exports
    ```

### 开启NFS服务

```bash
# 设置启动项
systemctl enable nfs-server

# 启动服务
systemctl start nfs-server
```

## 客户端挂载NFS服务器中的共享目录

```bash
# 创建挂的目录
mkdir -p /var/app/data

# 写入配置文件，其中`192.168.1.1:/u01`为nfs服务器端ip地址和rdc的文件共享目录，`/var/app/data`为上面创建的目录，即要挂载的目录
echo '192.168.1.1:/u01 /var/app/data nfs auto,nofail,noatime,nolock,intr,tcp,actimeo=1800 0 0' >> /etc/fstab

# 挂载目录，使配置生效
mount -a

# 查看挂载目录
df -h
```

## 详细配置选项

- 输出目录：
  - 输出目录是指NFS系统中需要共享给客户机使用的目录

- 客户端：
  - 客户端是指网络中可以访问这个NFS输出目录的计算机
  - 客户端常用的指定方式
  - 指定ip地址的主机：192.168.0.200
  - 指定子网中的所有主机：192.168.0.0/24 192.168.0.0/255.255.255.0
  - 指定域名的主机：nfs.choerodon.io
  - 指定域中的所有主机：*.choerodon.io
  - 所有主机：*

- NFS主要有2类选项：
    - 访问权限选项

        |可选项|描述|
        |---|---|
        |设置输出目录只读|ro|
        |设置输出目录读写|rw|

    - 用户映射选项

        |可选项|描述|
        |---|---|
        |all_squash|将远程访问的所有普通用户及所属组都映射为匿名用户或用户组（nfsnobody）|
        |no_all_squash|与all_squash取反（默认设置）|
        |root_squash|将root用户及所属组都映射为匿名用户或用户组（默认设置）|
        |no_root_squash|与rootsquash取反|
        |anonuid=xxx|将远程访问的所有用户都映射为匿名用户，并指定该用户为本地用户（UID=xxx）|
        |anongid=xxx|将远程访问的所有用户组都映射为匿名用户组账户，并指定该匿名用户组账户为本地用户组账户（GID=xxx）|
        |secure|限制客户端只能从小于1024的tcp/ip端口连接nfs服务器（默认设置）|
        |insecure|允许客户端从大于1024的tcp/ip端口连接服务器|
        |sync|将数据同步写入内存缓冲区与磁盘中，效率低，但可以保证数据的一致性|
        |async|将数据先保存在内存缓冲区中，必要时才写入磁盘|
        |wdelay|检查是否有相关的写操作，如果有则将这些写操作一起执行，这样可以提高效率（默认设置）|
        |no_wdelay|若有写操作则立即执行，应与sync配合使用|
        |subtree|若输出目录是一个子目录，则nfs服务器将检查其父目录的权限(默认设置)|
        |no_subtree|即使输出目录是一个子目录，nfs服务器也不检查其父目录的权限，这样可以提高效率|