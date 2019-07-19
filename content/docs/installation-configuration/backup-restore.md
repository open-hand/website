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

       ```yaml
       ports:
       - name: http
       port: 12480
       ```

2. 备份配置

    ```bash
    helm get values chartmuseum > chartmuseum-helm-values.yaml
    ```

3. 备份数据

    将挂载的所有目录数据备份，默认使用 NFS 存储，chartmuseum-pvc 挂载的目录是 `/nfs/mount/path/<namespace>-<pvc name>-<pvc value>`

    ```bash
    tar -cvzf chartmuseum.tar.gz /nfs/mount/path/<namespace>-<chartmuseum pvc name>-<chartmuseum pvc value>
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

        ```yaml
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

        ```yaml
        ports:
        - name: http
            port: 12480
        ```

2. 备份配置

    ```bash
    helm get values minio > minio-helm-values.yaml
    ```

3. 备份数据

    将挂载的所有目录数据备份，默认使用 NFS 存储，minio-pvc 挂载的目录是 `/nfs/mount/path/<namespace>-<pvc name>-<pvc value>`

    ```bash
    tar -cvzf minio.tar.gz /nfs/mount/path/<namespace>-<minio pvc name>-<minio pvc value>
    ```

    之后将打包的备份文件保存即可。

4. 恢复外部访问

     - 修改Service

        ```bash
        kubectl edit svc <service name> -n <namespace>
        ```

     - 将`ports.port`字段修改为9000

        ```yaml
        ports:
        - name: http
            port: 9000
        ```

## 备份Harbor

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
    helm get values harbor > harbor-helm-values.yaml
    ```

3. 备份数据

    将挂载的所有目录数据备份，默认使用 NFS 存储，会挂载 4 个 PVC，分别是 data-harbor-harbor-redis-0，database-data-harbor-harbor-database-0，harbor-harbor-jobservice，harbor-harbor-registry, 挂载目录的格式是 `/nfs/mount/path/<namespace>-<pvc name>-<pvc value>`。我们需要将除了 redis 之外的所有 PVC 文件夹备份。

    ```bash
    tar -cvzf harbor-database.tar.gz /nfs/mount/path/<namespace>-<harbor-database pvc name>-<harbor-database pvc value>

    tar -cvzf harbor-registry.tar.gz /nfs/mount/path/<namespace>-<harbor-registry pvc name>-<harbor-registry pvc value>

    tar -cvzf harbor-jobservice.tar.gz /nfs/mount/path/<namespace>-<harbor-jobservice pvc name>-<harbor-jobservice pvc value>
    ```

    [参考文档](https://github.com/goharbor/harbor/blob/master/docs/migration_guide.md)

    [安装文档](https://github.com/goharbor/harbor-helm)

4. 恢复访问

    ```bash
    kubectl apply -f harbor-ingress.yaml -n <namespace>
    ```

## 备份Gitlab

1. 中断外部访问

     - 修改Gitlab Service

        ```bash
        kubectl edit svc <gitlab svc name> -n <namespace>
        ```

     - 将`ports.port`字段修改为其他非80、22任意端口后并保存

        ```yaml
            ports:
            - name: http
              port: 12480
        ```

2. 创建备份

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

    <blockquote class="note">
    备份完成后，备份的文件在Gitlab容器中存放路径为 /var/opt/gitlab/backups，请从容器对应挂载的目录中复制备份文件。
    </blockquote>

    - 从容器中复制出备份文件

    ```bash
    kubectl cp <gitlab pod name>:/var/opt/gitlab/backups/* ./
    ```

    [参考文档](https://docs.gitlab.com/ce/raketasks/backup_restore.html#restore-for-omnibus-installations)

3. 备份配置

    ```bash
    helm get values chartmuseum > chartmuseum-helm-values.yaml
    ```

4. 恢复访问

    - 修改Gitlab Service

        ```bash
        kubectl edit svc <gitlab svc name> -n <namespace>
        ```

    - 将`ports.port`字段修改为80

        ```yaml
        ports:
        - name: http
            port: 80
        ```

## 备份Choerodon

### 备份配置

1. 猪齿鱼开发框架组件和服务配置备份

    - register server 配置备份

        ```bash
        helm get values register-server > register-server-helm-values.yaml
        ```

    - asgard service 配置备份

        ```bash
        helm get values asgard-service > asgard-service-helm-values.yaml
        ```

    - manager service 配置备份

       ```bash
       helm get values manager-server > manager-server-helm-values.yaml
       ```

    - notify service 配置备份

        ```bash
        helm get values notify-service > notify-service-helm-values.yaml
        ```

    - iam servcie 配置备份

      ```bash
      helm get values iam-service > iam-server-helm-values.yaml
      ```

    - api gateway 配置备份

        ```bash
        helm get values api-gateway > api-gateway-helm-values.yaml
        ```

    - oauth server 配置备份

        ```bash
        helm get values oauth-server > oauth-server.yaml
        ```

    - file service 配置备份

        ```bash
        helm get values file-service > file-service-helm-values.yaml
        ```

2. 持续交付组件与服务配置备份

    - devops-service 配置备份

        ```bash
        helm get values devops-servcie > devops-service-helm-value.yaml
        ```

    - gitlab servcie 配置备份

        ```bash
        helm get values gitlab-servcie > gitlab-servcie-helm-values.yaml
        ```

    - workflow servcie 配置备份

        ```bash
        helm get values workflow-service > workflow-servcie-helm-values.yaml
        ```

3. 敏捷管理组件与服务配置备份

    - agile service 配置备份

        ```bash
        helm get values agile-service > agile-service-helm-values.yaml
        ```

    - state machine service 配置备份

        ```bash
        helm get values state-machine-service > state-machine-service-helm-values.yaml
        ```

    - issue service 配置备份

        ```bash
        helm get values issue-service > issue-service-helm-values.yaml
        ```

    - foundation service 配置备份

        ```bash
        helm get values foundation-service  > foundation-service-helm-values.yaml
        ```

4. 测试管理组件与服务配置备份

    - test manager service 配置备份

        ```bash
        helm get values test-manager-service > test-manager-service-helm-values.yaml
        ```

5. 知识管理组件与服务配置备份

    - knowledgebase service 配置备份

        ```bash
        helm get values knowledgebase-service > knowledgebase-service-helm-values.yaml
        ```

6. 总前端配置备份
    - choerodon front 配置备份

        ```bash
        helm get values choerodon-front > choerodon-front-helm-values.yaml
        ```

### 备份数据库

#### 一次性备份所有数据库

默认所有数据库都一个 mysql 中，我们使用下面的命令备份所有数据库。根据实际情况更改下面的 username、passwod、host。

```bash
mysqldump -u<username> -p<your_password> -h<host> --all-databases | gzip > choerdon-all-databases.sql.gz
```

#### 分步备份数据库

1. 微服务开发框架数据备份

    ```bash
    # manager servcie
    mysqldump -u<username> -p<password> -h<host> --databases manager_service | gzip >$(date "+manager_service-%s.sql.gz")

    # iam servcie
    mysqldump -u<username> -p<password> -h<host> --databases iam_service | gzip >$(date "+iam_service-%s.sql.gz")

    # asgard service
    mysqldump -u<username> -p<password> -h<host> --databases asgard_service | gzip >$(date "+asgard_service-%s.sql.gz")

    #notify servcie
    mysqldump -u<username> -p<password> -h<host> --databases  notify_service | gzip >$(date "+notify_service-%s.sql.gz")
    ```

2. 持续交付数据库备份

    ```bash
    # devops servcie
    mysqldump -u<username> -p<password> -h<host> --databases  devops_service | gzip >$(date "+devops_service-%s.sql.gz")

    # gitlab service
    mysqldump -u<username> -p<password> -h<host> --databases  gitlab_service | gzip >$(date "+gitlab_service-%s.sql.gz")

    # workflow_service
    mysqldump -u<username> -p<password> -h<host> --databases  workflow_service | gzip >$(date "+workflow_service-%s.sql.gz")
    ```

3. 敏捷管理数据库备份

    ```bash
    # agile service
    mysqldump -u<username> -p<password> -h<host> --databases  agile_service | gzip >$(date "+agile_service-%s.sql.gz")

    # state machine service
    mysqldump -u<username> -p<password> -h<host> --databases  state_machine_service | gzip >$(date "+state_machine_service-%s.sql.gz")

    # issue service
    mysqldump -u<username> -p<password> -h<host> --databases  issue_service | gzip >$(date "+issue_service-%s.sql.gz")

    # foundation service
    mysqldump -u<username> -p<password> -h<host> --databases  foundation_service | gzip >$(date "+foundation_service-%s.sql.gz")
    ```

4. 测试管理数据库备份

    ```bash
    # test manager service
    mysqldump -u<username> -p<password> -h<host> --databases  test_manager_service | gzip >$(date "+test_manager_service-%s.sql.gz")
    ```

5. 知识管理数据备份

    ```bash
    # knowledgebase service
    mysqldump -u<username> -p<password> -h<host> --databases  knowledgebase-service | gzip >$(date "+knowledgebase-service-%s.sql.gz")
    ```

# 恢复基础组件及服务

## 恢复Chartmuseum

1. 恢复前确认 chartmuseum-pvc 已经创建。若没有创建，请先创建 chartmuseum-pvc。之后复制备份文件到挂载目录

    ```bash
    tar -xzvf chartmuseum.tar.gz -C /nfs/mount/path/<namespace>-<chartmuseum pvc name>-<chartmuseum pvc value>
    ```

2. 恢复配置

    ```bash
    helm upgrade --install chartmuseum c7n/chartmuseum -f chartmuseum-helm-values.yaml
    ```

## 恢复minio

1. 恢复前确认 minic-pvc 已经创建。若没有创建，请先创建 minic-pvc。之后复制备份文件到挂载目录

    ```bash
    tar -xzvf minio.tar.gz -C /nfs/mount/path/<namespace>-<minic pvc name>-<chartmuseum pvc value>
    ```

2. 恢复配置

    ```bash
    helm upgrade --install minio c7n/minio -f minio-helm-values.yaml
    ```

## 恢复Harbor

1. 将备份的三个文件解压到挂载的对应 PVC 目录下。

    ```bash
    tar -xvzf harbor-database.tar.gz -C /nfs/mount/path/<namespace>-<harbor-database pvc name>-<harbor-database pvc value>

    tar -xvzf harbor-registry.tar.gz -C /nfs/mount/path/<namespace>-<harbor-registry pvc name>-<harbor-registry pvc value>

    tar -xvzf harbor-jobservice.tar.gz -C /nfs/mount/path/<namespace>-<harbor-jobservice pvc name>-<harbor-jobservice pvc value>
    ```

2. 恢复配置

    ```bash
    helm upgrade --install harbor c7n/harbor -f harbor-helm-values.yaml
    ```

## 恢复Gitlab

1. 使用 Helm chart 安装的Gitlab

    - 确保 gitlab 实例存在
  
        ```bash
        kubectl get pods -n <namespaces> | grep gitlab
        ```

    - 运行命令恢复 gitlab

        ```bash
        kubectl exec <task-runner pod name> -it -- backup-utility --restore -t <timestamp>_<version>

        ```

        *这里的 &lt;timestamp&gt;_&lt;version&gt;是保存在 gitlab 备份文件夹下的文件名称*
        你也可以提供一个 URL，如下所示:

        ```bash
        kubectl exec <task-runner pod name> -it -- backup-utility --restore -f <URL>
        ```

        *你如果想提供本地文件，可以使用这个格式： file://&lt;path&gt;*

    - 恢复 CI 私钥文件

        进入Gitlab容器

        ```bash
        kubectl exec -it <gitlab pod name> -n <namespace> bash
        ```

        将你备份的私钥文件复制到 Gitlab 容器中

        ```bash
        cp /var/opt/gitlab/backups/gitlab-secrets.json /etc/gitlab/gitlab-secrets.json
        ```

      - 重启Gitlab

      ```bash
      kubectl delete po <gitlab pod name> -n <namespace>
      ```

    [参考文档](https://gitlab.com/charts/gitlab/blob/master/doc/backup-restore/restore.md)

2. 恢复Omnibus 安装的 GitLab
3. 恢复源码安装的 Gitlab

    [参考文档](https://docs.gitlab.com/ee/raketasks/backup_restore.html#restore)

## 恢复Choerodon

### 配置恢复

1. 猪齿鱼开发框架组件和服务配置

    - register server 配置恢复

        ```bash
        helm upgrade --install register-server c7n/register-server -f register-server-helm-values.yaml
        ```

    - asgard service 配置恢复

        ```bash
        helm upgrade --install asgard-service c7n/asgard-service -f asgard-service-helm-values.yaml
        ```

    - manager service 配置恢复

        ```bash
        helm upgrade --install manager-server c7n/manager-server -f manager-server-helm-values.yaml
        ```

    - notify service 配置恢复

        ```bash
        helm upgrade --install notify-service c7n/notify-service -f notify-service-helm-values.yaml
        ```

    - iam servcie 配置恢复

      ```bash
      helm upgrade --install iam-service c7n/iam-service -f iam-service-helm-values.yaml
      ```

    - api gateway 配置恢复

        ```bash
        helm upgrade --install api-gateway c7n/api-gateway -f api-gateway-helm-values.yaml
        ```

    - oauth server 配置恢复

        ```bash
        helm upgrade --install oauth-server c7n/oauth-server -f oauth-server-helm-values.yaml
        ```

    - file service 配置恢复

        ```bash
        helm upgrade --install file-service c7n/file-service -f file-service-helm-values.yaml
        ```

2. 持续交付组件与服务配置恢复

    - devops-service 配置恢复

        ```bash
        helm upgrade --install devops-servcie c7n/devops-servcie -f devops-servcie-helm-values.yaml
        ```

    - gitlab servcie 配置恢复

        ```bash
        helm upgrade --install gitlab-servcie c7n/gitlab-servcie -f gitlab-servcie-helm-values.yaml
        ```

    - workflow servcie 配置恢复

        ```bash
        helm upgrade --install workflow-servcie c7n/workflow-servcie -f workflow-servcie-helm-values.yaml
        ```

3. 敏捷管理组件与服务配置恢复

    - agile service 配置恢复

        ```bash
        helm upgrade --install agile-service c7n/agile-service -f agile-service-helm-values.yaml
        ```

    - state machine service 配置恢复

        ```bash
        helm upgrade --install state-machine-service c7n/state-machine-service -f state-machine-service-helm-values.yaml
        ```

    - issue service 配置恢复

        ```bash
        helm upgrade --install issue-service c7n/issue-service -f issue-service-helm-values.yaml
        ```

    - foundation service 配置恢复

        ```bash
        helm upgrade --install foundation-service c7n/foundation-service -f foundation-service-helm-values.yaml
        ```

4. 测试管理组件与服务配置恢复

    - test manager service 配置恢复

        ```bash
        helm upgrade --install test-manager-service c7n/test-manager-service -f test-manager-service-helm-values.yaml
        ```

5. 知识管理组件与服务配置恢复

    - knowledgebase service 配置恢复

        ```bash
        helm upgrade --install knowledgebase-service c7n/knowledgebase-service -f knowledgebase-service-helm-values.yaml
        ```

6. 总前端配置恢复
    - choerodon front 配置恢复

        ```bash
        helm upgrade --install choerodon-front c7n/choerodon-front -f choerodon-front-helm-values.yaml
        ```

### 恢复数据库

#### 一次性恢复所有数据库

默认所有数据库都一个 mysql 中，我们使用下面的命令恢复所有数据库。根据实际情况更改下面的 username、passwod、host。

```bash
gunzip choerond-all-databases.sql.gz | mysql -u<username> -p<password> --all-databases

```

#### 分步恢复数据库

1. 微服务开发框架数据恢复

    ```bash
    # manager servcie
    gunzip manager_service-<date>.sql.gz | mysql -u<username> -p<password> --databases manager_service

    # iam servcie
    gunzip iam_service-<date>.sql.gz | mysql -u<username> -p<password> --databases iam_service

    # asgard service
    gunzip asgard_service-<date>.sql.gz | mysql -u<username> -p<password> --databases asgard_service

    #notify servcie
    gunzip notify_service-<date>.sql.gz | mysql -u<username> -p<password> --databases notify_service
    ```

2. 持续交付数据库恢复

    ```bash
    # devops servcie
    gunzip devops_service-<date>.sql.gz | mysql -u<username> -p<password> --databases devops_service

    # gitlab service
    gunzip gitlab_service-<date>.sql.gz | mysql -u<username> -p<password> --databases gitlab_service

    # workflow_service
    gunzip workflow_service-<date>.sql.gz | mysql -u<username> -p<password> --databases workflow_service
    ```

3. 敏捷管理数据库恢复

    ```bash
    # agile service
    gunzip agile_service-<date>.sql.gz | mysql -u<username> -p<password> --databases agile_service

    # state machine service
    gunzip state_machine_service-<date>.sql.gz | mysql -u<username> -p<password> --databases state_machine_service

    # issue service
    gunzip issue_service-<date>.sql.gz | mysql -u<username> -p<password> --databases issue_service

    # foundation service
    gunzip foundation_service-<date>.sql.gz | mysql -u<username> -p<password> --databases foundation_service
    ```

4. 测试管理数据库恢复

    ```bash
    # test manager service
    gunzip test_manager_service-<date>.sql.gz | mysql -u<username> -p<password> --databases test_manager_service
    ```

5. 知识管理数据恢复

    ```bash
    # knowledgebase service
    gunzip knowledgebase-service-<date>.sql.gz | mysql -u<username> -p<password> --databases knowledgebase-service
    ```
