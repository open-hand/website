<!-- +++
title = "第五步：一键部署Choerodon"
description = "第五步：一键部署Choerodon"
weight = 18
+++ -->

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

- 新建`values.sh`文件，粘贴以下内容后按注释进行修改后保存。注意正式搭建时请替换以下值为真实值。

    ```bash
    #########################  全局配置  ############################
    # Helm release 前缀，解决release冲突问题（必须是小写字母，不能以数字开头，不能有特殊字符）
    #RELEASE_PREFIX="prefix"
    # 设置部署的namespace，请按："组织Code-项目Code-环境Code" 格式进行设置，以方便后期将应用自动扫描到数据库中。
    # 比如：组织Code为choerodon，项目Code为demo，环境Code为prod，那么最终定义的namespace为：c7n-system
    NAMESPACE="c7n-system"
    # 提供NFS服务的主机内网IP
    NFS_SERVER_HOST="192.168.1.1"
    #######################  choerodon配置  ##########################
    # 搭建服务时镜像仓库前缀，默认"registry.cn-shanghai.aliyuncs.com/choerodon"
    #IMAGE_REPO_PRE="registry.cn-shanghai.aliyuncs.com/choerodon"
    # Choerodon api地址（仅为域名地址，不能为IP地址）
    CHOERODON_API_EXTERNAL_URL="api.example.choerodon.io"
    # Choerodon devops service地址（仅为域名地址，不能为IP地址）
    CHOERODON_DEVOPS_EXTERNAL_URL="devops.example.choerodon.io"
    # Choerodon前端访问地址（仅为域名地址，不能为IP地址）
    CHOERODON_FRONT_EXTERNAL_URL="example.choerodon.io"
    ########################### Kafka 配置  ############################
    # 是否使用外部Kafka，若使用请设置为true
    EXTERNAL_KAFKA="false"
    # 定义多少个ZOOKEEPER目录，就创建多少个ZOOKEEPER副本，最好为单数，防止脑裂;若使用外部kafka，请忽略
    ZOOKEEPER_DIR[0]="/u01/io-choerodon/zookeeper/00"
    ZOOKEEPER_DIR[1]="/u01/io-choerodon/zookeeper/01"
    ZOOKEEPER_DIR[2]="/u01/io-choerodon/zookeeper/02"
    # 定义多少个KAFKA目录，就创建多少个KAFKA副本，最好为单数;若使用外部kafka，请忽略
    KAFKA_DIR[0]="/u01/io-choerodon/kafka/00"
    KAFKA_DIR[1]="/u01/io-choerodon/kafka/01"
    KAFKA_DIR[2]="/u01/io-choerodon/kafka/02"
    # 启用外部Kafka后，定义以下链接信息，使用内部kafka请忽略。多URL逗号前请加"\"
    #KAFKA_URL="kafka-0:9092\,kafka-1:9092"
    #ZOOKEEPER_URL="zookeeper-0:2181\,zookeeper-1:2181"
    ############################  数据库配置  ############################
    # 是否使用外部mysql，若使用请设置为true
    EXTERNAL_MYSQL="false"
    # mysql参数定义，若使用外部mysql，请忽略
    MYSQL_ROOT_PASSWORD="password"
    MYSQL_USER="choerodon"
    MYSQL_PASSWORD="password"
    # mysql数据存储目录，若使用外部mysql，请忽略
    MYSQL_DIR="/u01/io-choerodon/mysql"
    # 启用外部mysql后，定义以下数据库信息，使用内部mysql请忽略。值格式为： host prot database_name username password。
    #IAM_SERVICE_DB=("mysql" "3306" "iam_service" "username" "password")
    #MANAGER_SERVICE_DB=("mysql" "3306" "manager_service" "username" "password")
    #NOTIFY_SERVICE_DB=("mysql" "3306" "notify_service" "username" "password")
    #ASGARD_SERVICE_DB=("mysql" "3306" "asgard_service" "username" "password")
    #DEVOPS_SERVICE_DB=("mysql" "3306" "devops_service" "username" "password")
    #GITLAB_SERVICE_DB=("mysql" "3306" "gitlab_service" "username" "password")
    #AGILE_SERVICE_DB=("mysql" "3306" "agile_service" "username" "password")
    #TEST_MANAGER_SERVICE_DB=("mysql" "3306" "test_manager_service" "username" "password")
    #GITLAB_DB=("mysql" "3306" "gitlabhq_production" "username" "password")
    ########################### Gitlab配置 ############################
    # 是否使用外部Gitlab，若使用请设置为true
    EXTERNAL_GITLAB="false"
    # gitlab域名（仅为域名地址，不能为IP地址）
    GITLAB_EXTERNAL_URL="gitlab.example.choerodon.io"
    # gitlab 所需目录，使用外部gitlab请忽略。
    GITLAB_DIR="/u01/io-choerodon/gitlab"
    # gitlab root用户密码，使用外部gitlab请忽略。（不能少于8位）
    GITLAB_ROOT_PASSWORD="password"
    # 通过choerodon平台创建的用户，gitlab初始密码（不能少于8位）
    GITLAB_USER_PASSWORD="password"
    # 通过choerodon平台创建的用户，最多可以创建的git仓库数量
    GITLAB_PROJECTLIMIT=100
    # 一个admin角色用户的的impersonation token（有以下权限 api、read_use、sudo）;使用内部gitlab请忽略。
    #GITLAB_TOKEN="sdfjaTnlnlWNCsdfvd"
    ########################### chartmuseum配置 ########################
    # chartmuseum数据存储目录
    CHARTMUSEUM_DIR="/u01/io-choerodon/chartmuseum"
    # 访问地址（仅为域名地址，不能为IP地址）
    CHARTMUSEUM_EXTERNAL_URL="charts.example.choerodon.io"
    ########################### Minio 配置  ############################
    # 是否使用外部Minio，若使用请设置为true
    EXTERNAL_MINIO="false"
    # minio数据存储目录，使用外部minio请忽略
    MINIO_DIR="/u01/io-choerodon/minio"
    # minio访问地址（仅为域名地址，不能为IP地址）
    MINIO_EXTERNAL_URL="minio.example.choerodon.io"
    # minio access key
    MINIO_ACCESS_KEY="admin"
    # minio secret key(不能低于8位)
    MINIO_SECRET_KEY="password"
    ########################### Harbar 配置  ############################
    # 是否使用外部Harbor，若使用请设置为true
    EXTERNAL_HARBOR="false"
    # Harbar 所需目录，若使用外部Harbor，请忽略。
    HARBOR_ADMINSERVER_DIR="/u01/io-choerodon/harbor/adminserver"
    HARBOR_DB_DIR="/u01/io-choerodon/harbor/db"
    HARBOR_REGISTRY_DIR="/u01/io-choerodon/harbor/registry"
    # Harbar访问地址（仅为域名地址，不能为IP地址）
    HARBOR_EXTERNAL_URL="registry.example.choerodon.io"
    # Harbar管理员密码（长度8-20位，必须包含至少1个大写字母，至少1个小写字母，至少1个数字）
    HARBOR_ADMIN_PASSWORD="Password123"
    ```

- 执行以下命令进行部署

    ```
    curl -o choerodon-install.sh \
        https://file.choerodon.com.cn/choerodon-install/install-0.9.sh && \
    sh choerodon-install.sh values.sh
    ```

    - 部署完成后你将看到如下类似信息，请注意保存。

        ```shell
                                        Welcome to use Choerodon

        Note: The following information is displayed only once, please make a backup.

        =======================================================================================
        Choerodon URL: http://example.choerodon.io
        Choerodon API URL: http://api.example.choerodon.io/manager/swagger-ui.html
        Choerodon Devops Service WebSocket URL(only for choerodon-agent):
        ws://devops.example.choerodon.io
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
- [克隆模板仓库到自己的Gitlab中](../parts/base/gitlab/#克隆模板仓库)

## 部署失败操作

1. 部署失败后重新执行脚本根据脚本提示信息执行删除命令。
1. 请删除`values.sh`文件中定义的所有物理目录中的数据。