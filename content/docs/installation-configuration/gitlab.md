+++
title = "Gitlab安装"
description = "Gitlab安装"
date = 2018-03-30T13:06:38+08:00
draft = false
weight = 1
+++

# Gitlab安装

### 添加远程仓库

```
helm repo add paas http://helm-charts.staging.saas.hand-china.com/paas/base/
```

### 更新仓库信息

```
helm repo update 
```

### 安装Gitlab

**注意：**启用持久化存储请执行提前创建PV和PVC

1. 新建`values.yaml`文件，粘贴以下内容并修改相关配置。

  ```yaml
  # 启动副本数量
  replicaCount: 1
  # 设置备份周期
  env:
    open: 
      GITLAB_BACKUP_SCHEDULE: daily
  # 滚动更新策略
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 0
  # 健康相关检查设置
  livenessProbe:
    failureThreshold: 10
    initialDelaySeconds: 600
    periodSeconds: 10
    successThreshold: 1
    timeoutSeconds: 15
  readinessProbe:
    failureThreshold: 3
    initialDelaySeconds: 120
    periodSeconds: 10
    successThreshold: 1
    timeoutSeconds: 15
  # 资源请求及限制
  resources: 
    # We usually recommend not to specify default resources and to leave this as a conscious
    # choice for the user. This also increases chances charts run on environments with little
    # resources, such as Minikube. If you do want to specify resources, uncomment the following
    # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
    limits:
    #  cpu: 100m
    memory: 4Gi
    requests:
    #  cpu: 100m
    memory: 3Gi
  # 节点选择
  nodeSelector: {}
  # 持久化存储设置，启用则提供pvc名称
  persistence:
    enabled: false
    ## A manually managed Persistent Volume and Claim
    ## Requires persistence.enabled: true
    ## If defined, PVC must be created manually before volume will be bound
    # existingClaim: gitlab

  # service相关设置
  service:
    type: ClusterIP
    port: 80

  # 域名相关设置
  ingress:
    enabled: false
    annotations: {}
      # kubernetes.io/ingress.class: nginx
      # kubernetes.io/tls-acme: "true"
    path: /
    hosts:
      - gitlab.alpha.saas.hand-china.com
    tls: []
    #  - secretName: chart-example-tls
    #    hosts:
    #      - chart-example.local

  # gitlab应用相关配置
  config: |
    # 访问地址
    external_url 'http://git.alpha.saas.hand-china.com'
    gitlab_rails['time_zone'] = 'Beijing'
    # 配置gitlab邮箱
    gitlab_rails['gitlab_email_enabled'] = true
    gitlab_rails['gitlab_email_from'] = 'gitlab@hand-china.com'
    gitlab_rails['gitlab_email_display_name'] = 'Gitlab'
    gitlab_rails['gitlab_email_reply_to'] = 'noreply@hand-china.com'
    gitlab_rails['gitlab_default_can_create_group'] = true
    gitlab_rails['gitlab_username_changing_enabled'] = true
    gitlab_rails['gitlab_default_theme'] = 1
    # 启用oauth授权
    gitlab_rails['omniauth_enabled'] = true
    gitlab_rails['omniauth_allow_single_sign_on'] = ['oauth2_generic']
    # 设置默认授权方式
    # gitlab_rails['omniauth_auto_sign_in_with_provider'] = 'oauth2_generic'
    gitlab_rails['omniauth_block_auto_created_users'] = false
    # 配置oauth授权
    gitlab_rails['omniauth_providers'] = [
        {
          'name' => 'oauth2_generic',
          'app_id' => 'gitlab',
          'app_secret' => 'secret',
          'args' => {
            client_options: {
              'site' => 'http://gateway.alpha.saas.hand-china.com',
              'user_info_url' => '/oauth/api/user',
              'authorize_url'=> '/oauth/oauth/authorize',
              'token_url'=> '/oauth/oauth/token'
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
            strategy_class: "OmniAuth::Strategies::HandOAuth2Generic",
            redirect_url: "http://git.alpha.saas.hand-china.com/users/auth/oauth2_generic/callback"
          }
        }
      ]
    # 配置备份文件保存时长
    gitlab_rails['backup_keep_time'] = 604800
    # 配置外部数据库信息
    gitlab_rails['db_adapter'] = "mysql2"
    gitlab_rails['db_encoding'] = "utf8mb4"
    gitlab_rails['db_collation'] = "utf8mb4_unicode_ci"
    gitlab_rails['db_database'] = "gitlabhq_production"
    gitlab_rails['db_pool'] = 20
    gitlab_rails['db_username'] = "root"
    gitlab_rails['db_password'] = "handhand"
    gitlab_rails['db_host'] = "gitlab-mysql.db.svc"
    gitlab_rails['db_port'] = 3306
    # 配置外部Readis信息
    gitlab_rails['redis_host'] = "gitlab-redis"
    gitlab_rails['redis_port'] = 6379
    # 配置smtp相关信息
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
    # 禁用内置postgresql数据库
    postgresql['enable'] = false
    # 禁用内置redis
    redis['enable'] = false
    # 禁用内置prometheus
    prometheus['enable'] = false
    # 禁用内置node_exporter
    node_exporter['enable'] = false
  ```

1. 执行以下命名进行安装。

  > 安装前请提前创建好,可在安装命令中添加`--debug --dry-run`参数，进行渲染预览不进行安装。

  ```
  helm install paas/gitlab --name=gitlab --namespace=gitlab -f values.yaml
  ```