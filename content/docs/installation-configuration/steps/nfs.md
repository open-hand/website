+++
title = "第一步：NFS部署"
description = "第一步：NFS部署"
weight = 5
+++

# NFS部署

## 前置要求

- 系统要求：CentOS

## NFS服务端安装及配置

### 部署NFS服务端

- `sudo yum upgrade -y && sudo yum install -y nfs-utils portmap`

### 配置NFS服务端

NFS服务的配置文件为：`/etc/exports`，这个文件是NFS的主要配置文件，不过系统并没有默认值，所以这个文件不一定会存在，可能要使用`vim`手动建立，然后在文件里面写入配置内容：

- `/etc/exports`文件内容格式：

    ```bash
    <输出目录> [客户端1 选项（访问权限,用户映射,其他）] [客户端2 选项（访问权限,用户映射,其他）]
    ```

- 例子：
    - 创建共享目录：`mkdir /u01`
    - 执行命令将配置写入到`/etc/exports`文件中：`echo '/u01 192.168.0.0/16(rw,sync,no_root_squash,no_all_squash)' >> /etc/exports`
        - `/u01` 为上面创建的共享目录。
        - `192.168.0.0/16`为要连接到这台文件服务器的客户端的内网ip地址，这里使用的是掩码的方式。
        - 其他配置请看本文[详细配置选项](./#详细配置选项)，这里不再累述。

### 开启NFS服务

- 设置开机自启：`systemctl enable nfs-server`
- 启动服务：`systemctl start nfs-server`

## 客户端挂载NFS服务器共享目录(验证NFS服务端部署)

### 安装客户端工具包

更新系统所有包并安装NFS工具包：

- `sudo yum upgrade -y && sudo yum install -y nfs-utils`

<blockquote class="note">
创建NFS类型的PV只需执行上述nfs-utils安装命令，以下挂载共享目录到客户端主机命令请忽略。
</blockquote>

### 创建挂目录

这里我们创建一个与服务端同名的目录`/u01`，安装文档其他地方都会以这个目录作为根目录进行讲述。

- `mkdir /u01`

### 配置挂载文件

- 执行命令将配置写入到`/etc/fstab`文件中：`echo '192.168.1.1:/u01 /u01 nfs auto,nofail,noatime,nolock,intr,tcp,actimeo=1800 0 0' >> /etc/fstab`
    - 其中`192.168.1.1:/u01`为NFS服务端内网IP地址和服务端共享目录。
    - 第二个`/u01`为上面客户端创建的目录，即要挂载到的目录。

### 挂载生效

- `mount -a`

### 验证挂载

- `df -h`，记录中有`/u01`的挂载记录则表示已成功。

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