+++
title = "第五步：一键部署Choerodon"
description = "第五步：一键部署Choerodon"
weight = 18
+++

# 部署Choerodon

<blockquote class="note">
执行一键部署Choerodon命令的主机能够管理该kubernetes集群建议在Master节点执行，且该集群每个节点都安装有NFS客户端程序。执行一键部署Choerodon请忽略分步部署Choerodon步骤。
</blockquote>

## 通过脚本部署

<blockquote class="warning">
  <ul>
  <li>部署时请逐个确认环境变量</li>
  <li>部署时请确认设置的域名是否已映射到将要部署的集群中</li>
  <li>安装命令基于NFS动态后端存储卷，若有其他StorageClass也可以进行使用</li>
  </ul>
</blockquote>

<blockquote class="note">
部署成功后Choerodon平台默认登录名为admin，默认密码为admin。
</blockquote>

- 下载所需安装文件

    ```
    curl -L -o choerodon-install-0.10.tar.gz https://file.choerodon.com.cn/choerodon-install/install-0.10.tar.gz
    ```

- 加压到当前目录并进入文件夹

    ```
    tar -zxvf choerodon-install-0.10.tar.gz && cd choerodon-install-0.10
    ```

- 编辑`choerodon.cfg`文件，搭建时请替换以下值为真实值。

    ```
    #########################  全局配置  ############################
    # 提供NFS服务的主机内网IP
    NFS_SERVER_HOST='192.168.12.114'
    # NFS服务共享的目录，需在NFS服务器上手动创建该目录
    NFS_SHARE_PATH='/u01/prod'
    #######################  choerodon配置  ##########################
    # 搭建服务时镜像仓库前缀，默认"registry.cn-shanghai.aliyuncs.com/choerodon"
    # IMAGE_REPO_PRE="registry.cn-shanghai.aliyuncs.com/choerodon"
    # Choerodon api地址（仅为域名地址，不能为IP地址）
    CHOERODON_API_EXTERNAL_URL="api.example.choerodon.io"
    # Choerodon devops service地址（仅为域名地址，不能为IP地址）
    CHOERODON_DEVOPS_EXTERNAL_URL="devops.example.choerodon.io"
    # Choerodon前端访问地址（仅为域名地址，不能为IP地址）
    CHOERODON_FRONT_EXTERNAL_URL="c7n.example.choerodon.io"
    # 知识管理前端
    CHOERODON_WIKI_EXTERNAL_URL="wiki.example.choerodon.io"
    ########################### Kafka 配置  ############################
    # Kafka节点数量，必须为奇数
    KAFKA_REPLICA_COUNT='3'
    ############################  数据库配置  ############################
    # mysql参数定义，若使用外部mysql，请忽略
    MYSQL_ROOT_PASSWORD="password"
    MYSQL_USER="choerodon"
    MYSQL_PASSWORD="password"
    ########################### Gitlab配置 ############################
    # gitlab域名（仅为域名地址，不能为IP地址）
    GITLAB_EXTERNAL_URL="gitlab.example.choerodon.io"
    # gitlab root用户密码，使用外部gitlab请忽略。（不能少于8位）
    GITLAB_ROOT_PASSWORD="password"
    # 通过choerodon平台创建的用户，gitlab初始密码（不能少于8位）
    GITLAB_USER_PASSWORD="password"
    # 通过choerodon平台创建的用户，最多可以创建的git仓库数量
    GITLAB_PROJECTLIMIT=100
    ########################### chartmuseum配置 ########################
    # 访问地址（仅为域名地址，不能为IP地址）
    CHARTMUSEUM_EXTERNAL_URL="charts.example.choerodon.io"
    ########################### Minio 配置  ############################
    # minio访问地址（仅为域名地址，不能为IP地址）
    MINIO_EXTERNAL_URL="minio.example.choerodon.io"
    # minio access key
    MINIO_ACCESS_KEY="admin"
    # minio secret key(不能低于8位)
    MINIO_SECRET_KEY="password"
    ########################### Harbar 配置  ############################
    # 是否使用外部Harbor，若使用请设置为true
    EXTERNAL_HARBOR="false"
    # Harbar访问地址（仅为域名地址，不能为IP地址）
    HARBOR_EXTERNAL_URL="registry.example.choerodon.io"
    # Harbar管理员密码（长度8-20位，必须包含至少1个大写字母，至少1个小写字母，至少1个数字）
    HARBOR_ADMIN_PASSWORD="Password123"
    ```

- 执行以下命令进行部署

    ```
    bash install.sh choerodon.cfg
    ```

    - 部署完成后你将看到如下类似信息，请注意保存。

        ```shell
                                        Welcome to use Choerodon

        Note: The following information is displayed only once, please make a backup.

        =======================================================================================
        Choerodon URL: http://c7n.example.choerodon.io
        Choerodon API URL: http://api.example.choerodon.io/manager/swagger-ui.html
        Choerodon Devops Service WebSocket URL(only for choerodon-agent):
        ws://devops.example.choerodon.io
        Choerodon Wiki URL: http://wiki.example.choerodon.io
        =======================================================================================
        ------------------------------------ Gitlab Information -------------------------------
        Gitlab URL: http://gitlab.example.choerodon.io
        username: root       password: password
        root private token: zyRFg8xW6V-_3q9oocQs
        ------------------------------------ Harbor Information -------------------------------
        Harbor URL: http://registry.example.choerodon.io
        username: admin      password: Password123
        ------------------------------------ Minio Information  -------------------------------
        Minio URL: http://minio.example.choerodon.io
        minio access key: admin      minio secret key: password
        ---------------------------------- Chartmuseum Information ----------------------------
        Chartmuseum URL: http://charts.example.choerodon.io
        =======================================================================================
        ```

- [设置Gitlab启用SSH协议(必须开启)](../parts/base/gitlab/#启用ssh协议)
- [设置Harbor启用HTTPS](../parts/base/harbor/#启用https)

## 部署失败操作

1. 部署失败后重新执行脚本根据脚本提示信息执行删除命令。