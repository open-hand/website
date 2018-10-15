# NFS服务端

## 前置要求

- 系统要求：CentOS

## NFS服务端安装及配置

### 部署NFS服务端

- `sudo yum install -y nfs-utils portmap`

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
        - `192.168.0.0/16`为要连接到这台文件服务器的客户端的ip地址，这里使用的是掩码的方式。
        - 其他配置请看本文[详细配置选项](./#详细配置选项)，这里不再累述。

### 开启NFS服务

- 设置开机自启：`systemctl enable nfs-server`
- 启动服务：`systemctl start nfs-server`

### 验证NFS服务端部署

- 假设本NFS服务主机内网IP为`192.168.12.114`

    ```console
    $ showmount -e 192.168.12.114
    Export list for 192.168.12.114:
    /u01 192.168.0.0/16
    ```