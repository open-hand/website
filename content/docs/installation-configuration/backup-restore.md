+++
title = "备份与恢复"
description = "备份与恢复"
weight = 10

+++

# 备份基础组件及服务
## 备份Chartmuseum
1. 中断外部访问
  - 修改Service

        ```
        kubectl edit svc <service name> -n <namespace>
        ```
  - 将`ports.port`字段修改为其他非8080任意端口后并保持 

            ports:
            - name: http
              port: 12480

1. 备份配置

    ```
    helm get values chartmuseum > chartmuseum-helm-values.yaml
    ```
1. 备份数据
    - 将挂载的所有目录数据备份即可

1. 恢复外部访问
  - 修改Service

        ```
        kubectl edit svc <service name> -n <namespace>
        ```
  - 将`ports.port`字段修改为8080

            ports:
            - name: http
              port: 8080

## 备份minio
1. 中断外部访问
  - 修改Service

        ```
        kubectl edit svc <service name> -n <namespace>
        ```
  - 将`ports.port`字段修改为其他非9000任意端口后并保持 

            ports:
            - name: http
              port: 12480
1. 备份配置

    ```
    helm get values minio > minio-helm-values.yaml
    ```
1. 备份数据
    - 将挂载的所有目录数据备份即可
1. 恢复外部访问
  - 修改Service

        ```
        kubectl edit svc <service name> -n <namespace>
        ```
  - 将`ports.port`字段修改为9000

            ports:
            - name: http
              port: 9000

## 备份Harbor

1. 中断外部访问
    - 备份Harbor Ingress

            kubectl get ing <ingress name> -n <namespace> -o yaml --export > harbor-ingress.yaml
    - 临时删除Harbor Ingress

            kubectl delete ing <ingress name> -n <namespace>

1. 备份配置

    ```
    helm get values harbor > harbor-helm-values.yaml
    ```
1. 备份数据
    - 将挂载的所有目录数据备份即可

1. 恢复访问

    ```
    kubectl apply -f harbor-ingress.yaml -n <namespace>
    ```

## 备份Gitlab

1. 中断外部访问
  - 修改Gitlab Service

        ```
        kubectl edit svc <gitlab svc name> -n <namespace>
        ```
  - 将`ports.port`字段修改为其他非80、22任意端口后并保持 

            ports:
            - name: http
              port: 12480

1. 创建备份

  - 进入Gitlab容器
    ```
    kubectl exec -it <gitlab pod name> -n <namespace> bash
    ```

  - 完整备份命令
      ```
      gitlab-rake gitlab:backup:create RAILS_ENV=production
      ```

  - 备份CI私钥文件
      ```
      cp /etc/gitlab/gitlab-secrets.json /var/opt/gitlab/backups/
      ```

    <blockquote class="note">
备份完成后，备份的文件在Gitlab容器中存放路径为 /var/opt/gitlab/backups，请从容器对应挂载的目录中复制备份文件。
</blockquote>

1. 备份配置

    ```
    helm get values chartmuseum > chartmuseum-helm-values.yaml
    ```

1. 恢复访问

  - 修改Gitlab Service

        ```
        kubectl edit svc <gitlab svc name> -n <namespace>
        ```

  - 将`ports.port`字段修改为80

            ports:
            - name: http
              port: 80

## 备份Choerodon

### 备份register server
1. 备份配置

    ```
    helm get values register-server > register-server-helm-values.yaml
    ```

### 备份config server
1. 备份配置

    ```
    helm get values config-server > config-server-helm-values.yaml
    ```

### 备份manager server
1. 备份配置

    ```
    helm get values manager-server > manager-server-helm-values.yaml
    ```
1. 备份数据库

    ```
    mysqldump -u<username> -p<password> -h<host> --databases manager_service | gzip >$(date "+manager_service-%s.sql.gz")
    ```

### 备份iam server
1. 备份配置

    ```
    helm get values iam-server > iam-server-helm-values.yaml
    ```
1. 备份数据库

    ```
    mysqldump -u<username> -p<password> -h<host> --databases iam_service | gzip >$(date "+iam_service-%s.sql.gz")
    ```

### 备份api gateway
1. 备份配置

    ```
    helm get values api-gateway > api-gateway-helm-values.yaml
    ```

### 备份gateway helper
1. 备份配置

    ```
    helm get values gateway-helper > gateway-helper-helm-values.yaml
    ```

### 备份oauth server
1. 备份配置

    ```
    helm get values oauth-server > oauth-server-helm-values.yaml
    ```

### 备份event store service
1. 备份配置

    ```
    helm get values event-store-service > event-store-service-helm-values.yaml
    ```
1. 备份数据库

    ```
    mysqldump -u<username> -p<password> -h<host> --databases event_store_service | gzip >$(date "+event_store_service-%s.sql.gz")
    ```

### 备份file service
1. 备份配置

    ```
    helm get values file-service > file-service-helm-values.yaml
    ```

### 备份devops service
1. 备份配置

    ```
    helm get values devops-service > devops-service-helm-values.yaml
    ```
1. 备份数据库

    ```
    mysqldump -u<username> -p<password> -h<host> --databases devops_service | gzip >$(date "+devops_service-%s.sql.gz")
    ```

### 备份gitlab service
1. 备份配置

    ```
    helm get values gitlab-service > gitlab-service-helm-values.yaml
    ```
1. 备份数据库

    ```
    mysqldump -u<username> -p<password> -h<host> --databases gitlab_service | gzip >$(date "+gitlab_service-%s.sql.gz")
    ```

### 备份agile service
1. 备份配置

    ```
    helm get values agile-service > agile-service-helm-values.yaml
    ```
1. 备份数据库

    ```
    mysqldump -u<username> -p<password> -h<host> --databases agile_service | gzip >$(date "+agile_service-%s.sql.gz")
    ```

### 备份test manager service
1. 备份配置

    ```
    helm get values test-manager-service > test-manager-service-helm-values.yaml
    ```
1. 备份数据库

    ```
    mysqldump -u<username> -p<password> -h<host> --databases test_manager_service | gzip >$(date "+test_manager_service-%s.sql.gz")
    ```

### 备份xwiki
1. 备份配置

    ```
    helm get values xwiki > xwiki-helm-values.yaml
    ```
1. 备份数据库

    ```
    mysqldump -u<username> -p<password> -h<host> --databases xwiki | gzip >$(date "+xwiki-%s.sql.gz")
    ```
1. 备份数据
    - 将挂载的所有目录数据备份即可

### 备份wiki service
1. 备份配置

    ```
    helm get values wiki-service > wiki-service-helm-values.yaml
    ```
1. 备份数据库

    ```
    mysqldump -u<username> -p<password> -h<host> --databases wiki_service | gzip >$(date "+wiki_service-%s.sql.gz")
    ```

### 备份choerodon front
1. 备份配置

    ```
    helm get values choerodon-front > choerodon-front-helm-values.yaml
    ```

# 恢复基础组件及服务

## 恢复Chartmuseum
1. 复制备份文件至挂载目录
1. 恢复配置
    ```
    helm upgrade --install chartmuseum c7n/chartmuseum -f chartmuseum-helm-values.yaml
    ```

## 恢复minio
1. 复制备份文件至挂载目录
1. 恢复配置
    ```
    helm upgrade --install minio c7n/minio -f minio-helm-values.yaml
    ```

## 恢复Harbor
1. 复制备份文件至挂载目录
1. 恢复配置
    ```
    helm upgrade --install harbor c7n/harbor -f harbor-helm-values.yaml
    ```

## 恢复Gitlab

1. 将备份文件放于容器对应挂载的目录中

1. 恢复Gitlab配置文件

    ```
    kubectl apply -f gitlab-cm.yaml -n <namespace>
    ```

1. 启动容器后进入Gitlab容器

    ```
    kubectl exec -it <gitlab pod name> -n <namespace> bash
    ```

1. 恢复数据库、仓库文件等

    ```
    gitlab-rake gitlab:backup:restore RAILS_ENV=production
    ```

1. 恢复CI私钥文件

    ```
    cp /var/opt/gitlab/backups/gitlab-secrets.json /etc/gitlab/gitlab-secrets.json
    ```

1. 重启Gitlab

    ```
    kubectl delete po <gitlab pod name> -n <namespace>
    ```

## 恢复Choerodon
### 恢复register server
1. 恢复配置

    ```
    helm upgrade --install register-server c7n/go-register-server -f register-server-helm-values.yaml
    ```

### 恢复config server
1. 恢复配置

    ```
    helm upgrade --install config-server c7n/config-server -f config-server-helm-values.yaml
    ```

### 恢复manager server
1. 恢复配置

    ```
    helm upgrade --install manager-server c7n/manager-server -f manager-server-helm-values.yaml
    ```
1. 恢复数据库

    ```
    gunzip manager_service-<date>.sql.gz | mysql -u<username> -p<password> --databases manager_service 
    ```

### 恢复iam server
1. 恢复配置

    ```
    helm upgrade --install iam-server c7n/iam-server -f iam-server-helm-values.yaml
    ```
1. 恢复数据库

    ```
    gunzip iam_service-<date>.sql.gz | mysql -u<username> -p<password> --databases iam_service 
    ```

### 恢复api gateway
1. 恢复配置

    ```
    helm upgrade --install api-gateway c7n/api-gateway -f api-gateway-helm-values.yaml
    ```

### 恢复gateway helper
1. 恢复配置

    ```
    helm upgrade --install gateway-helper c7n/gateway-helper -f gateway-helper-helm-values.yaml
    ```

### 恢复oauth server
1. 恢复配置

    ```
    helm upgrade --install oauth-server c7n/oauth-server -f oauth-server-helm-values.yaml
    ```

### 恢复event store service
1. 恢复配置

    ```
    helm upgrade --install event-store-service c7n/event-store-service -f event-store-service-helm-values.yaml
    ```
1. 恢复数据库

    ```
    gunzip event_store_service-<date>.sql.gz | mysql -u<username> -p<password> --databases event_store_service 
    ```

### 恢复file service
1. 恢复配置

    ```
    helm upgrade --install file-service c7n/file-service -f file-service-helm-values.yaml
    ```

### 恢复devops service
1. 恢复配置

    ```
    helm upgrade --install devops-service c7n/devops-service -f devops-service-helm-values.yaml
    ```
1. 恢复数据库

    ```
    gunzip devops_service-<date>.sql.gz | mysql -u<username> -p<password> --databases devops_service 
    ```

### 恢复gitlab service
1. 恢复配置

    ```
    helm upgrade --install gitlab-service c7n/gitlab-service -f gitlab-service-helm-values.yaml
    ```
1. 恢复数据库

    ```
    gunzip gitlab_service-<date>.sql.gz | mysql -u<username> -p<password> --databases gitlab_service 
    ```

### 恢复agile service
1. 恢复配置

    ```
    helm upgrade --install agile-server c7n/agile-server -f agile-server-helm-values.yaml
    ```
1. 恢复数据库

    ```
    gunzip agile_service-<date>.sql.gz | mysql -u<username> -p<password> --databases agile_service 
    ```

### 恢复test manager service
1. 恢复配置

    ```
    helm upgrade --install test-manager-server c7n/test-manager-server -f test-manager-server-helm-values.yaml
    ```
1. 恢复数据库

    ```
    gunzip test_manager_service-<date>.sql.gz | mysql -u<username> -p<password> --databases test_manager_service 
    ```

### 恢复xwiki
1. 恢复配置

    ```
    helm upgrade --install xwiki c7n/xwiki -f xwiki-helm-values.yaml
    ```
1. 恢复数据库

    ```
    gunzip xwiki-<date>.sql.gz | mysql -u<username> -p<password> --databases xwiki 
    ```
1. 恢复数据
    - 将挂载的所有目录数据恢复即可

### 恢复wiki service
1. 恢复配置

    ```
    helm upgrade --install wiki-service c7n/wiki-service -f wiki-service-helm-values.yaml
    ```
1. 恢复数据库

    ```
    gunzip wiki_service-<date>.sql.gz | mysql -u<username> -p<password> --databases wiki_service 
    ```

### 恢复choerodon front
1. 恢复配置

    ```
    helm upgrade --install choerodon-front c7n/choerodon-front -f choerodon-front-helm-values.yaml
    ```