+++
title = "备份与恢复"
description = "备份与恢复"
weight = 10

+++

# 备份基础组件及服务

## 备份Chartmuseum

1. 中断外部访问

   - 修改Service

        ```bash
        kubectl edit svc <service name> -n <namespace>
        ```

   - 将`ports.port`字段修改为其他非8080任意端口后并保存

        ```
            ports:
            - name: http
              port: 12480
        ```

2. 备份配置

    ```bash
    helm get values -n c7n-system chartmuseum > chartmuseum.yaml
    ```

3. 备份数据

    将挂载的所有目录数据备份，默认使用 NFS 存储，chartmuseum-pvc 挂载的目录是 `/nfs/mount/path/<namespace>-<pvc name>-<pvc volume>`

    ```bash
    tar -cvzf chartmuseum.tar.gz -C /path/to/chartmuseum-pvc .
    ```

    之后将打包的备份文件保存即可，这里使用 scp 命令下载备份文件的到本地。

    ```bash
    scp root@remote_ip:/backup/path/chartmuseum.tar.gz chartmuseum.tar.gz
    ```

4. 恢复外部访问

    - 修改Service

        ```bash
        kubectl edit svc <service name> -n <namespace>
        ```

    - 将`ports.port`字段修改为8080

        ```
        ports:
        - name: http
            port: 8080
        ```

## 备份minio

1. 中断外部访问

     - 修改Service

        ```bash
        kubectl edit svc <service name> -n <namespace>
        ```

     - 将`ports.port`字段修改为其他非9000任意端口后并保存

        ```
            ports:
            - name: http
              port: 12480
        ```

2. 备份配置

    ```bash
    helm get values -n c7n-system minio > minio.yaml
    ```

3. 备份数据

    将挂载的所有目录数据备份，默认使用 NFS 存储，minio-pvc 挂载的目录是 `/nfs/mount/path/<namespace>-<pvc name>-[0-3]-<pvc volume>`

    ```bash
    tar -cvzf minio-[0-3].tar.gz -C /path/to/minio-pvc .
    ```

    之后将打包的备份文件保存即可。

4. 恢复外部访问

     - 修改Service

        ```bash
        kubectl edit svc <service name> -n <namespace>
        ```

     - 将`ports.port`字段修改为9000

        ```
            ports:
            - name: http
              port: 9000
        ```

## 备份Harbor

<blockquote class="warning">
该组件备份不完善，请谨慎操作。
</blockquote>

1. 中断外部访问
    - 备份Harbor Ingress

        ```bash
        kubectl get ing <ingress name> -n <namespace> -o yaml --export > harbor-ingress.yaml
        ```

    - 临时删除Harbor Ingress

        ```bash
        kubectl delete ing <ingress name> -n <namespace>
        ```

2. 备份配置

    ```bash
    helm get values -n c7n-system harbor > harbor.yaml
    ```

3. 备份数据库

    默认安装的 PostgreSQL 数据库是 ClusterIP模式，你可以修改成 NodePort 模式直接访问备份。

    - 修改 harbor-harbor-database

        ```bash
        kubectl edit svc <mysql svc name> -n <namespace>
        ```

    - 修改 `spec.type` ,添加 `type.ports.nodePort`

        ```bash
            spec:
              type: NodePort
              ports:
              - nodePort: 30306
        ```

    使用其他工具备份数据库 registry，notarysigner，notaryserver。

4. 备份镜像

    使用 harbor 的镜像负责管理功能迁移镜像。[Harbor 镜像复制功能](https://blog.csdn.net/kozazyh/article/details/79829463)

    也可以参照下一步直接打包备份 harbor-registry-pvc 目录

5. 冗余数据备份

    将挂载的所有目录数据备份，默认使用 NFS 存储，会挂载 4 个 PVC，分别是 database-data-harbor-harbor-database-0、harbor-harbor-jobservice、harbor-harbor-registry，挂载目录的格式是 `/nfs/mount/path/<namespace>-<pvc name>-<pvc value>`。我们需要将除了 redis 之外的所有 PVC 文件夹备份。

    ```bash
    tar -cvzf harbor-database.tar.gz -C /path/to/harbor-database-pvc .

    tar -cvzf harbor-registry.tar.gz -C /path/to/harbo-registry-pvc .

    tar -cvzf harbor-jobservice.tar.gz -C  /path/to/harbor-jobservice-pvc .

    tar -cvzf harbor-redis.tar.gz -C /path/to/harbor-redis-pvc .
    ```

6. 备份密钥

    - 获取存储证书的 secret 的名字

        ```bash
        kubectl get secret -n <namespace>
        ```

    - 导出 secret

        ```bash
        kubectl get secret <secret-name-from-step-1> -n <namespace> -o yaml > secret.yaml
        ```

7. 恢复访问

    ```bash
    kubectl apply -f harbor-ingress.yaml -n <namespace>
    ```

[参考文档](https://github.com/goharbor/harbor/blob/master/docs/migration_guide.md)

[安装文档](https://github.com/goharbor/harbor-helm)

## 备份Gitlab

1. 中断外部访问

     - 修改Gitlab Service

        ```bash
        kubectl edit svc <gitlab svc name> -n <namespace>
        ```

     - 将`ports.port`字段修改为其他非80、22任意端口后并保存

        ```
            ports:
            - name: http
              port: 12480
        ```

2. 备份配置

    ```bash
    helm get values -n c7n-system gitlab  > gitlab.yaml
    ```

3. 创建备份

    - 进入Gitlab容器

        ```bash
        kubectl exec -it <gitlab pod name> -n <namespace> bash
        ```

    - 完整备份命令

        ```bash
        gitlab-rake gitlab:backup:create RAILS_ENV=production
        ```

    - 备份CI私钥文件

        ```bash
        cp /etc/gitlab/gitlab-secrets.json /var/opt/gitlab/backups/
        ```

    - 备份 SSH 密钥

        ```shell
        # 查看需要备份的文件
        cat sshd_config | grep HostKey
        # 移动到 backup 目录
        cp /etc/ssh/ssh_host_rsa_key /var/opt/gitlab/backups/
        cp /etc/ssh/ssh_host_dsa_key /var/opt/gitlab/backups/
        cp /etc/ssh/ssh_host_ecdsa_key /var/opt/gitlab/backups/
        cp /etc/ssh/ssh_host_ed25519_key /var/opt/gitlab/backups/
        ```

    - 从容器中复制出备份文件

    ```bash
    kubectl cp <namespaces>/<gitlab pod name>:/var/opt/gitlab/backups/ ./gitlab_backup
    ```

    [gitlab 备份与恢复](https://docs.gitlab.com/ee/raketasks/backup_restore.html)

    [ssh 备份](https://superuser.com/questions/532040/copy-ssh-keys-from-one-server-to-another-server/532079#532079)

4. 恢复访问

    - 修改Gitlab Service

        ```bash
        kubectl edit svc <gitlab svc name> -n <namespace>
        ```

    - 将`ports.port`字段修改为80

        ```
            ports:
            - name: http
              port: 80
        ```

## 备份Choerodon

备份前请按照 [启动文档](http://choerodon.io/zh/docs/installation-configuration/stop/) 停止需要备份的应用，备份完成之后启动应用。

### 备份数据库

默认安装的 MySQL 数据库是 ClusterIP模式，你可以修改成 NodePort 模式直接访问备份。

- 修改 MySQL Service

    ```bash
    kubectl edit svc <mysql svc name> -n <namespace>
    ```

- 修改 `spec.type` ,添加 `type.ports.nodePort`

    ```bash
        spec:
          type: NodePort
          ports:
          - nodePort: 30306
    ```

1. 微服务开发框架数据备份

    ```bash
    # asgard_service
    mysqldump -u<username> -p<password> -h<host> --databases asgard_service | gzip >$(date "+asgard_service-%s.sql.gz")

    # hzero_platform
    mysqldump -u<username> -p<password> -h<host> --databases hzero_platform | gzip >$(date "+hzero_platform-%s.sql.gz")

    # hzero_message
    mysqldump -u<username> -p<password> -h<host> --databases hzero_message | gzip >$(date "+hzero_message-%s.sql.gz")

    # hzero_file
    mysqldump -u<username> -p<password> -h<host> --databases  hzero_file | gzip >$(date "+hzero_file-%s.sql.gz")

    # hzero_admin
    mysqldump -u<username> -p<password> -h<host> --databases  hzero_admin | gzip >$(date "+hzero_admin-%s.sql.gz")

    # hzero_monitor
    mysqldump -u<username> -p<password> -h<host> --databases  hzero_monitor | gzip >$(date "+hzero_monitor-%s.sql.gz")
    ```

2. 持续交付数据库备份

    ```bash
    # devops servcie
    mysqldump -u<username> -p<password> -h<host> --databases  devops_service | gzip >$(date "+devops_service-%s.sql.gz")

    # workflow_service
    mysqldump -u<username> -p<password> -h<host> --databases  workflow_service | gzip >$(date "+workflow_service-%s.sql.gz")
    ```

3. 敏捷管理数据库备份

    ```bash
    # agile service
    mysqldump -u<username> -p<password> -h<host> --databases  agile_service | gzip >$(date "+agile_service-%s.sql.gz")

    # test manager service
    mysqldump -u<username> -p<password> -h<host> --databases  test_manager_service | gzip >$(date "+test_manager_service-%s.sql.gz")

    # knowledgebase service
    mysqldump -u<username> -p<password> -h<host> --databases  knowledgebase_service | gzip >$(date "+knowledgebase_service-%s.sql.gz")
    ```

4. 制品库数据库备份

    ```bash
    # hrds_code_repo
    mysqldump -u<username> -p<password> -h<host> --databases  hrds_code_repo | gzip >$(date "+hrds_code_repo-%s.sql.gz")

    # hrds_prod_repo
    mysqldump -u<username> -p<password> -h<host> --databases  hrds_prod_repo | gzip >$(date "+hrds_prod_repo-%s.sql.gz")
    ```

### 备份配置

1. 猪齿鱼开发框架组件和服务配置备份

    - choerodon-register 配置备份

        ```bash
        helm get values -n c7n-system choerodon-register > choerodon-register.yaml
        ```

    - choerodon-admin 配置备份

        ```bash
        helm get values -n c7n-system choerodon-admin > choerodon-admin.yaml
        ```

    - choerodon-asgard 配置备份

        ```bash
        helm get values -n c7n-system choerodon-asgard > choerodon-asgard.yaml
        ```

    - choerodon-file 配置备份

        ```bash
        helm get values -n c7n-system choerodon-file > choerodon-file.yaml
        ```

    - choerodon-gateway 配置备份

        ```bash
        helm get values choerodon-gateway > choerodon-gateway.yaml
        ```

    - choerodon-iam 配置备份

        ```bash
        helm get values -n c7n-system > choerodon-iam.yaml
        ```

    - choerodon-message 配置备份

        ```bash
        helm get values -n c7n-system choerodon-message > choerodon-message.yaml
        ```

    - choerodon-monitor 配置备份

        ```bash
        helm get values -n c7n-system choerodon-monitor > choerodon-monitor.yaml
        ```
    - choerodon-platform 配置备份

        ```bash
        helm get values -n c7n-system choerodon-platform > choerodon-platform.yaml
        ```

    - choerodon-swagger 配置备份

        ```bash
        helm get values -n c7n-system choerodon-swagger > choerodon-swagger.yaml
        ```

2. 持续交付组件与服务配置备份

    - devops-service 配置备份

        ```bash
        helm get values -n c7n-system devops-service > devops-service.yaml
        ```

    - gitlab servcie 配置备份

        ```bash
        helm get values -n c7n-system  gitlab-service > gitlab-servcie.yaml
        ```

    - workflow servcie 配置备份

        ```bash
        helm get values -n c7n-system workflow-service > workflow-servcie.yaml
        ```

3. 敏捷管理组件与服务配置备份

    - agile service 配置备份

        ```bash
        helm get values -n c7n-system agile-service > agile-service.yaml
        ```

    - test manager service 配置备份

        ```bash
        helm get values -n c7n-system test-manager-service > test-manager-service.yaml
        ```

    - knowledgebase service 配置备份

        ```bash
        helm get values -n c7n-system knowledgebase-service > knowledgebase-service.yaml
        ```

4. 制品库配置备份
    - code-repo-servcie 配置备份


        ```bash
        helm get values -n c7n-system code-repo-servcie > code-repo-servcie.yaml
        ```

    - prod-repo-service 配置备份

        ```bash
        helm get values -n c7n-system prod-repo-service > prod-repo-service.yaml
        ```

4. 总前端配置备份

    - choerodon front 配置备份

        ```bash
        helm get values -n c7n-system  choerodon-front > choerodon-front.yaml
        ```

    - choerodon front hzero配置备份

        ```bash
        helm get values -n c7n-system  choerodon-front-hzero > choerodon-front-hzero.yaml
        ```

# 恢复基础组件及服务

## 恢复Chartmuseum

1. 恢复前确认 chartmuseum-pvc 已经创建。若没有创建，请先创建 chartmuseum-pvc。之后复制备份文件到挂载目录

    ```bash
    tar -xzvf chartmuseum.tar.gz -C /path/to/chartmuseum-pvc
    ```

2. 恢复配置

    ```bash
    helm upgrade --install chartmuseum c7n/chartmuseum -f chartmuseum.yaml --version  2.6.0 --namespace c7n-system
    ```

## 恢复minio

1. 恢复前确认 minic-pvc 已经创建。若没有创建，请先创建 minic-pvc。之后复制备份文件到挂载目录

    ```bash
    tar -xzvf minio.tar.gz -C /path/to/minio-pvc
    ```

2. 恢复配置

    ```bash
    helm upgrade --install minio c7n/minio -f minio.yaml --version  5.0.5 --namespace c7n-system
    ```

## 恢复Harbor

1. 将备份的数据库导入

2. 证书配置参考 [harbor 证书配置](http://choerodon.io/zh/docs/installation-configuration/steps/install/parts/base/harbor/)，恢复证书。

3. 迁移回同步的镜像 [Harbor 镜像复制功能](https://blog.csdn.net/kozazyh/article/details/79829463)，也可将备份的 harbor-registry.tar.gz 解压到 /path/to/harbor-registry-pvc 下。

4. 恢复配置

    ```bash
    helm upgrade --install harbor c7n/harbor -f harbor.yaml --version 1.2.3 --namespace c7n-system
    ```

## 恢复Gitlab

1. 使用 Helm chart 安装的Gitlab

    - 确保 gitlab 实例存在
  
        ```bash
        kubectl get pods -n <namespaces> | grep gitlab
        ```

    - 复制备份文件到容器中

        ```bash
        kubectl cp gitlab_backup/ <namespaces>/<pod name>:/var/opt/gitlab/backups/
        ```

    - 恢复

        进入Gitlab容器

        ```bash
        kubectl exec -it <gitlab pod name> -n <namespace> bash
        ```

        移动备份文件到 backups 目录

        ```bash
        cp /var/opt/gitlab/backups/gitlab_backup/*gitlab_backup.tar /var/opt/gitlab/backups/
        ```

        将你备份的ssh文件恢复到配置目录

        ```bash
        cp /var/opt/gitlab/backups/gitlab_backup/ssh_host* /etc/ssh/
        ```

        将你备份的私钥文件复制到配置目录

        ```bash
        cp /var/opt/gitlab/backups/gitlab_backup/gitlab-secrets.json /etc/gitlab/gitlab-secrets.json
        ```

        恢复gitlab

        ```bash
        # 备份的所有者必须是 git
        chown git.git /var/opt/gitlab/backups/1563811217_2019_07_23_11.6.11_gitlab_backup.tar

        # 还原指定时间戳的备份
        gitlab-rake gitlab:backup:restore BACKUP=1563811217_2019_07_23_11.6.11
        ```

      - 重启Gitlab

      ```bash
      kubectl delete po <gitlab pod name> -n <namespace>
      ```

    [参考文档](https://gitlab.com/charts/gitlab/blob/master/doc/backup-restore/restore.md)

## 恢复Choerodon

### 恢复数据库

1. 微服务开发框架数据恢复

    ```bash
    # asgard_service
    gunzip asgard_service-<date>.sql.gz | mysql -u<username> -p<password> --databases asgard_service

    # hzero_platform
    gunzip hzero_platform-<date>.sql.gz | mysql -u<username> -p<password> --databases hzero_platform

    # hzero_message
    gunzip hzero_message-<date>.sql.gz | mysql -u<username> -p<password> --databases hzero_message

    # hzero_file
    gunzip hzero_file-<date>.sql.gz | mysql -u<username> -p<password> --databases hzero_file

    # hzero_admin
    gunzip hzero_admin-<date>.sql.gz | mysql -u<username> -p<password> --databases hzero_admin

    # hzero_monitor
    gunzip hzero_monitor-<date>.sql.gz | mysql -u<username> -p<password> --databases hzero_monitor
    ```

2. 持续交付数据库恢复

    ```bash
    # devops servcie
    gunzip devops_service-<date>.sql.gz | mysql -u<username> -p<password> --databases devops_service

    # workflow_service
    gunzip workflow_service-<date>.sql.gz | mysql -u<username> -p<password> --databases workflow_service
    ```

3. 敏捷管理数据库恢复

    ```bash
    # agile service
    gunzip agile_service-<date>.sql.gz | mysql -u<username> -p<password> --databases agile_service

    # test manager service
    gunzip test_manager_service-<date>.sql.gz | mysql -u<username> -p<password> --databases test_manager_service

    # knowledgebase service
    gunzip knowledgebase_service-<date>.sql.gz | mysql -u<username> -p<password> --databases knowledgebase_service
    ```

4. 制品库数据库恢复

    ```bash
    # hrds_code_repo
    gunzip hrds_code_repo-<date>.sql.gz | mysql -u<username> -p<password> --databases hrds_code_repo

    # hrds_prod_repo
    gunzip hrds_prod_repo-<date>.sql.gz | mysql -u<username> -p<password> --databases hrds_prod_repo
    ```

### 配置恢复

1. 猪齿鱼开发框架组件和服务配置

   - choerodon-register 配置恢复

        ```bash
        helm upgrade --install choerodon-register c7n/choerodon-register -f choerodon-register.yaml --namespace c7n-system --version 0.23.1
        ```

    - choerodon-admin 配置恢复

        ```bash
        helm upgrade --install choerodon-admin c7n/choerodon-admin -f choerodon-admin.yaml --namespace c7n-system --version 0.23.1
        ```

    - choerodon-asgard 配置恢复

        ```bash
        helm upgrade --install choerodon-asgard c7n/choerodon-asgard -f choerodon-asgard.yaml --namespace c7n-system --version 0.23.7
        ```

    - choerodon-file 配置恢复

        ```bash
        helm upgrade --install choerodon-file c7n/choerodon-file -f choerodon-file.yaml --namespace c7n-system --version 0.23.1
        ```

    - choerodon-gateway 配置恢复

        ```bash
        helm upgrade --install choerodon-gateway c7n/choerodon-gateway -f choerodon-gateway.yaml --namespace c7n-system --version 0.23.2
        ```

    - choerodon-iam 配置恢复

        ```bash
        helm upgrade --install choerodon-iam c7n/choerodon-iam -f choerodon-iam.yaml --namespace c7n-system --version 0.23.14
        ```

    - choerodon-message 配置恢复

        ```bash
        helm upgrade --install choerodon-message c7n/choerodon-message -f choerodon-message.yaml --namespace c7n-system --version 0.23.8
        ```

    - choerodon-monitor 配置恢复

        ```bash
        helm upgrade --install choerodon-monitor c7n/choerodon-monitor -f choerodon-monitor.yaml --namespace c7n-system --version 0.23.2
        ```
    - choerodon-platform 配置恢复

        ```bash
        helm upgrade --install choerodon-platform c7n/choerodon-platform -f choerodon-platform.yaml --namespace c7n-system --version 0.23.5
        ```

    - choerodon-swagger 配置恢复

        ```bash
        helm upgrade --install hoerodon-swagger c7n/hoerodon-swagger -f hoerodon-swagger.yaml --namespace c7n-system --version 0.23.1
        ```

2. 持续交付组件与服务配置恢复

    - devops-service 配置恢复

        ```bash
        helm upgrade --install devops-servcie c7n/devops-servcie -f devops-servcie.yaml --namespace c7n-system --version 0.23.8
        ```

    - gitlab servcie 配置恢复

        ```bash
        helm upgrade --install gitlab-servcie c7n/gitlab-servcie -f gitlab-servcie.yaml --namespace c7n-system --version 0.23.1
        ```

    - workflow servcie 配置恢复

        ```bash
        helm upgrade --install workflow-servcie c7n/workflow-servcie -f workflow-servcie.yaml --namespace c7n-system --version 0.23.3
        ```

3. 敏捷管理组件与服务配置恢复

    - agile service 配置恢复

        ```bash
        helm upgrade --install agile-service c7n/agile-service -f agile-service.yaml --namespace c7n-system --version 0.23.7
        ```

    - test manager service 配置恢复

        ```bash
        helm upgrade --install test-manager-service c7n/test-manager-service -f test-manager-service.yaml --namespace c7n-system --version 0.23.3
        ```

    - knowledgebase service 配置恢复

        ```bash
        helm upgrade --install knowledgebase-service c7n/knowledgebase-service -f knowledgebase-service.yaml --namespace c7n-system --version 0.23.1
        ```

4. 制品库配置恢复

    - code-repo-servcie 配置恢复


        ```bash
        helm upgrade --install code-repo-servcie c7n/code-repo-servcie -f code-repo-servcie.yaml --namespace c7n-system --version 0.23.2
        ```

    - prod-repo-service 配置恢复

        ```bash
        helm upgrade --install prod-repo-service c7n/prod-repo-service -f prod-repo-service.yaml --namespace c7n-system --version 0.23.6
        ```

5. 总前端配置恢复

    - choerodon front 配置恢复

        ```bash
        helm upgrade --install choerodon-front c7n/choerodon-front -f choerodon-front.yaml --namespace c7n-system --version 0.23.1
        ```

    - choerodon front hzero配置恢复

        ```bash
        helm get values -n c7n-system  choerodon-front-hzero > choerodon-front-hzero.yaml --namespace c7n-system --version 0.23.1
        ```