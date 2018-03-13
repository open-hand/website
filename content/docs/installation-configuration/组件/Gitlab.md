+++
title = "Gitlab"
description = ""
weight = 3
banner = "img/banners/banner-1.jpg"
+++

## 搭建所需镜像及文件
 - 镜像列表 

     ```
     registry.saas.hand-china.com/tools/gitlab-ce:10.2.0-hand
     ```
 - 克隆安装脚本 

     ```
     git clone https://rdc.hand-china.com/gitlab/rdc_hip/devops-install-docs.git
     ```

## 前置准备
### 构建镜像

  > 在使用mysql作为gitlab的数据库时,需要自行安装mysql的依赖和驱动包，使用postgresql则无需构建镜像。进入`devops-install-docs/devops/gitlab-ce`目录，下文我们将以此目录进行讲解。
  
  ```
  # 在镜像仓库中已有也可直接pull
  docker build -t registry.saas.hand-china.com/tools/gitlab-ce:10.2.0-hand -f .
  ```

  - 镜像构建完成后可以使用以下环境变量配置自动备份
  
     参数 | 描述
     ---|---
     GITLAB_BACKUP_SCHEDULE | 设置自动备份。选项有：`disable`, `daily`, `weekly`,`monthly`或者 `advanced`。 默认是`disable`即禁用；`daily`为 每天进行备份；`weekly`为每周星期天备份； `monthly`为每月1号进行备份；`advanced`为全自定义，备份时间格式与cron相同。
     GITLAB_BACKUP_TIME | 若选择备份策略为`daily`, `weekly`,`monthly`，自动备份的时间格式为 HH:MM，默认是01:00；若选择备份策略为`advanced`，自 动备份的时间格式为* * * * *，默认是00 01  * * *,即每天1点进行备份。
     GITLAB_BACKUP_SKIP | 选项有：`db`, `uploads` (attachments), `repositories`, `builds` (CI build output logs), `artifacts` (CI  build artifacts), `lfs` (LFS objects)，默认为 `repositories`
     GITLAB_BACKUP_EXPIRY | 备份的数据多久（单位：秒）后进行删除。不进行自动删除则设置为0, 开启自动备 份功能，默认是7天后进行删除，即604800秒。
  
  - 使用ConfigMap挂载gitlab.rb配置文件
 
    通过ConfigMap将gitlab.rb文件挂载到`/opt/hand/devops/etc/gitlab.rb`，运行镜像时就会加载此配置 文件。

### 创建数据库

  - 登录到数据库创建gitlab用户及数据库:
  
  ```
  # 创建用户
  CREATE USER 'gitlab'@'%' IDENTIFIED BY '******';
  
  # 创建数据库并给gitlab用户授权:
  CREATE DATABASE gitlabhq_production DEFAULT CHARACTER SET utf8;
  GRANT ALL PRIVILEGES ON gitlabhq_production.* TO gitlab@'%';
  FLUSH PRIVILEGES;
  ```

### 资源调整（若集群各节点资源充足可跳过此步）

  > 由于gitlab运行需要大量的资源并且要保证其稳定性,不受到其他pod的影响,这里专们调整一台节点部署,这里我们选择了node5(4c16g)
  
  - 节点准备
  
  ```
  # 首先给node5节点打上标签
  kubectl label nodes node5 gitlab="true"
  # 对选好的节点上的pod进行驱赶
  kubectl taint nodes node5 gitlab="true":NoSchedule
  ```
  
  - 修改`kube-flannel`和`kube-proxy`的配置文件让其可以忍受所有的taint使其能够在node5上运行
  
  ```
  # 查看kube-flannel和kube-proxy部署是否在此命名空间下
  kubectl get daemonset -n kube-system
  # 进行修改kube-flannel配置
  kubectl edit daemonset kube-flannel -n kube-system
  # 以下配置请配置在containers属性中，与containers的image属性平级
        tolerations:
        - effect: NoSchedule
          key: node-role.kubernetes.io/master
          operator: Exists
        - effect: NoSchedule
          operator: Exists
  
  # 进行修改kube-flannel配置
  kubectl edit daemonset kube-proxy -n kube-system
  # 以下配置请配置在containers属性中，与containers的image属性平级
        tolerations:
        - effect: NoSchedule
          key: node-role.kubernetes.io/master
          operator: Exists
        - effect: NoSchedule
          operator: Exists
  ```
  
  - 修改`gitlab/deploy.yml`文件
  
  ```
  # 以下配置请配置在containers属性中，与containers的image属性平级
        nodeSelector:
          gitlab: "true"
        tolerations:
        - effect: NoSchedule
          key: gitlab
          operator: Exists
  ```
  
  - 修改`gitlab/redis.yml`文件
  
  ```
  # 以下配置请配置在containers属性中，与containers的image属性平级
        nodeSelector:
          gitlab: "true"
        tolerations:
        - effect: NoSchedule
          key: gitlab
          operator: Exists
  ```

## 部署
### Redis
  - 部署Redis
  ```
  # 首先创建namespaces gitlab:
  kubectl create ns gitlab
  kubectl apply -f redis/ -n gitlab
  ```

### gitlab

  - 修改`gitlab/ingress.yml`文件中的host地址，ip地址访问请忽略：

    ```
    apiVersion: extensions/v1beta1
    kind: Ingress
    metadata:
        name: gitlab-ingress
    spec:
        rules:
        - host: git.*****************.com
        http:
            paths:
            - backend:
                serviceName: gitlab
                servicePort: 80
    ```

  - 修改`gitlab/pv.yml`文件中的nfs的地址和路径。
  
    ```
    ...
        capacity:
        storage: 50Gi
        nfs:
        path: /gitlab/gitlab-data
        server: 36b864afe1-phv23.cn-shanghai.nas.aliyuncs.com
    ...
    ```
  
  - 将部署gilab
  
    ```
    kubectl apply -f gitlab/ -n gitlab
    ```

  > **重要：** 当容器通过健康检查后，就可以通过域名进行访问了，第一次访问须设置root用户初始密码。若配合Devops平台使用，请进入管理界面创建用户名为SonarQube和Gitlab的两个用户并将其设置为admin用户，并生成私钥保存下来，后面的其他服务搭建会用到它。

## 配置Gitlab
 
 > **重要：** 此步须等待gitlab容器已运行成功健康检查通过且Hapcloud框架服务也可使用了才进行后续操作
 
 - 进入容器编辑`/etc/gitlab/gitlab.rb`文件：

    ```
    # 执行命令进入容器
    kubectl get po -n gitlab
    kubectl exec -it [gilab pod name] -n gitlab bash

    # 备份原配置文件
    mv /etc/gitlab/gitlab.rb /etc/gitlab/gitlab.rb.bak 
    # 编辑配置文件
    vi /etc/gitlab/gitlab.rb
    ```
 
 > **重要：** 请认真阅读以下配置，修改参数后粘贴进`/etc/gitlab/gitlab.rb`文件中，若须其他配置请参考`gitlab/gitlab.rb`

 - gitlab配置文件事例：

    ```
    # `external_url`的值为gitlab的域名地址
    external_url 'http://git.digital.saas.carllhw.com'

    # 设置gitlab的时区为北京时间
    gitlab_rails['time_zone'] = 'Beijing'

    # 设置gitlab邮件启用,和回复的邮箱
    gitlab_rails['gitlab_email_enabled'] = true
    gitlab_rails['gitlab_email_from'] = 'gitlab@hand-china.com'
    gitlab_rails['gitlab_email_display_name'] = 'Gitlab'
    gitlab_rails['gitlab_email_reply_to'] = 'noreply@hand-china.com'

    # 设置用户可以创建组和修改密码
    gitlab_rails['gitlab_default_can_create_group'] = true
    gitlab_rails['gitlab_username_changing_enabled'] = true

    # 设置默认主题
    gitlab_rails['gitlab_default_theme'] = 1

    # 启用oauth授权单点登录
    gitlab_rails['omniauth_enabled'] = true
    gitlab_rails['omniauth_allow_single_sign_on'] = ['oauth2_generic']
    gitlab_rails['omniauth_auto_sign_in_with_provider'] = 'oauth2_generic'
    gitlab_rails['omniauth_block_auto_created_users'] = false

    # oauth2配置,这里配置的是hapcloud的oauth授权，注意修改gateway的地址，回调地址和授权客户端的id(app_id)、secret、和字段映射关系

        gitlab_rails['omniauth_providers'] = [
            {
            'name' => 'oauth2_generic',
            'app_id' => 'digital_gitlab',
            'app_secret' => 'secret',
            'args' => {
                client_options: {
                'site' => 'http://gateway.devops.digital.saas.carllhw.com/',
                'user_info_url' => '/oauth/api/user',
                'authorize_url'=> '/oauth/oauth/authorize',
                'token_url'=> '/oauth/public/gitlab/token'
                },
                user_response_structure: {
                root_path: ['userAuthentication','principal'],
                id_path: ['userAuthentication','principal','userId'],
                attributes: { 
                    nickname: 'username',
                    name: 'username',
                    email: 'email'
                }
                },
                name: 'oauth2_generic',
                strategy_class: "OmniAuth::Strategies::OAuth2Generic",
                redirect_url: "http://git.digital.saas.carllhw.com/users/auth/oauth2_generic/callback"
            }
            }
        ]

    # 关闭自带的postgresql
    postgresql['enable'] = false

    # 配置mysql连接
    gitlab_rails['db_adapter'] = "mysql2"
    gitlab_rails['db_encoding'] = "utf8mb4"
    gitlab_rails['db_collation'] = "utf8mb4_unicode_ci"
    gitlab_rails['db_database'] = "gitlabhq_production"
    gitlab_rails['db_pool'] = 20
    gitlab_rails['db_username'] = "gitlab"
    gitlab_rails['db_password'] = "handhand"
    gitlab_rails['db_host'] = "rds.aliyuncs.com"
    gitlab_rails['db_port'] = 3306

    # 关闭自带的redis
    redis['enable'] = false

    # 配置redis连接
    gitlab_rails['redis_host'] = "gitlab-redis-svc"
    gitlab_rails['redis_port'] = 6379

    # gitlab邮箱服务器设置
    gitlab_rails['smtp_enable'] = true
    gitlab_rails['smtp_address'] = "smtp.mxhichina.com"
    gitlab_rails['smtp_port'] = 465
    gitlab_rails['smtp_user_name'] = "git.sys@carllhw.com"
    gitlab_rails['smtp_password'] = "Rdchandhand123"
    gitlab_rails['smtp_domain'] = "smtp.mxhichina.com"
    gitlab_rails['smtp_authentication'] = "login"
    gitlab_rails['gitlab_email_from'] = "git.sys@carllhw.com"
    gitlab_rails['smtp_enable_starttls_auto'] = true
    gitlab_rails['smtp_tls'] = true

    # 关闭监控相关功能
    prometheus['enable'] = false
    node_exporter['enable'] = false

    # 解密您的加密CI变量的秘钥
    gitlab_rails['otp_key_base'] = "long-and-random-alphanumeric-string"
    gitlab_rails['db_key_base'] = "long-and-random-alphanumeric-string"
    gitlab_rails['secret_key_base'] = "long-and-random-alphanumeric-string"
    ```
 
 - 使配置生效
 
    ```
    # 停止启动的服务
    gitlab-ctl stop
    # 生效配置
    gitlab-ctl reconfigure
    # 启动服务
    gitlab-ctl start
    ```

## 创建oauth客户端

 - 通过gateway的swagger界面，选择用户服务client的API创建:
 
  ```
  # 回调地址为gitlab将要访问的地址
  {
      "name": "digital_gitlab",
      "resourceIds": "default",
      "secret": "secret",
      "scope": "default",
      "authorizedGrantTypes": "password,implicit,client_credentials,authorization_code,refresh_token",
      "webServerRedirectUri": "http://git.************.com",
      "autoApprove": "default"
  }
  ```

## 优化

 如果在gitlab中需要使用`emoji`图标(比如在issue、comment、merge request区域),那么需要做以下配置:
 
 首先，需要对数据库表编码和行类型进行转换,如果一开始创建表时就使用`utf8mb4`格式，会造成初始化时列的长度超出限制的错误(767/4)。所以先使用utf8初始化完成后，再用sql进行转换。
 
 - 修改数据库参数
 
    ```
    # Aliyun RDS通过界面控制台修改:
    innodb_large_prefix = ON

    # 自建Mysql执行以下sql
    set global innodb_file_format = `BARRACUDA`;
    set global innodb_large_prefix = `ON`;
    ```
 
 - 执行下边sql,并复制返回结果执行，然后就会将表的行格式设置为动态类型:
 
    ```
    SELECT
        CONCAT( 'ALTER TABLE `', TABLE_NAME, '` ROW_FORMAT=DYNAMIC;' ) AS 'Copy & run these SQL statements:' 
    FROM
        INFORMATION_SCHEMA.TABLES 
    WHERE
        TABLE_SCHEMA = "gitlabhq_production" 
        AND TABLE_TYPE = "BASE TABLE" 
        AND ROW_FORMAT != "Dynamic";
    ```
 
 - 继续执行sql，并复制返回结果执行,把表的编码进行转换:
 
    ```
    SELECT
        CONCAT( 'ALTER TABLE `', TABLE_NAME, '` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;' ) AS 'Copy & run these SQL statements:' 
    FROM
        INFORMATION_SCHEMA.TABLES 
    WHERE
        TABLE_SCHEMA = "gitlabhq_production" 
        AND TABLE_COLLATION != "utf8mb4_general_ci" 
        AND TABLE_TYPE = "BASE TABLE";
    ```
 
 这样在gitlab里就可以使用`emoji`图标了。对于`postgresql`是可以直接使用`utf8mb4`编码的。而在`mysql5.7`中可以将`ROW_FORMAT = "Dynamic"`这一值设置为默认属性,因此可能不会遇到这个问题。