+++
title = "制品库部署"
description = "制品库部署"
weight = 70
+++


# 制品库部署

<blockquote class="warning">
在此之前，应该准备好Mysql、Harbor、Gitlab、Minio，Chartmuseum、Nexus这些组件的信息。按以下搭建顺序进行搭建，请不要随意调整搭建顺序。
</blockquote>

## 添加choerodon chart仓库

```
helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
helm repo update
```


## 创建数据库

- 编写参数配置文件 `create-c7nrepo-db.yaml`

    ```
    env:
      MYSQL_HOST: c7n-mysql.c7n-system.svc
      MYSQL_PORT: "3306"
      MYSQL_USER: root
      MYSQL_PASS: password
      SQL_SCRIPT: |
        CREATE USER IF NOT EXISTS 'choerodon'@'%' IDENTIFIED BY 'password';
        CREATE DATABASE IF NOT EXISTS hrds_code_repo DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        CREATE DATABASE IF NOT EXISTS hrds_prod_repo DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        GRANT ALL PRIVILEGES ON hrds_code_repo.* TO choerodon@'%';
        GRANT ALL PRIVILEGES ON hrds_prod_repo.* TO choerodon@'%';
        FLUSH PRIVILEGES;
    ```

- 执行安装
  
    ```
    helm upgrade --install create-c7nrepo-db c7n/mysql-client \
      -f create-c7nrepo-db.yaml \
      --create-namespace \
      --version 0.1.0 \
      --namespace c7n-system
    ```

## 部署 code repo service
- 若需了解项目详情及各项参数含义，请移步 [open-hand/code-repo-service](https://github.com/open-hand/code-repo-service)。
- 如何获取 `GITLAB_PRIVATETOKEN` 请查看[这里](http://openforum.hand-china.com/t/topic/1155/2)
- 编写参数配置文件 `code-repo-service.yaml`

    ```yaml
    preJob:
      preInitDB:
        datasource:
          driver: com.mysql.jdbc.Driver
          password: password
          url: jdbc:mysql://c7n-mysql.c7n-system:3306/?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
          username: choerodon
        datasources:
          # 初始化菜单数据
          platform:
            url: jdbc:mysql://c7n-mysql.c7n-system:3306/?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
            username: choerodon
            password: password
            driver: com.mysql.jdbc.Driver
    env:
      open:
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://choerodon-register.c7n-system:8000/eureka/
        GITLAB_PRIVATETOKEN: xxxxxxxxxxxxxx
        GITLAB_URL: http://gitlab.example.choerodon.io
        SPRING_DATASOURCE_PASSWORD: password
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system:3306/hrds_code_repo?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_REDIS_DATABASE: 0
        SPRING_REDIS_HOST: c7n-redis.c7n-system
        SPRING_REDIS_PORT: 6379
    ```

- 部署服务

    ```
    helm upgrade --install code-repo-service c7n/code-repo-service \
        -f code-repo-service.yaml \
        --create-namespace \
        --version 0.23.2 \
        --namespace c7n-system
    ```

- 验证部署
  
  - 验证命令
  
    ```
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=code-repo-service -o jsonpath="{.items[0].status.podIP}"):8081/actuator/health | jq -r .status
    ```

  - 出现以下类似信息即为成功部署
  
    ```
    UP
    ```

## 部署 prod-repo-service
- 若需了解项目详情及各项参数含义，请移步 [open-hand/prod-repo-service](https://github.com/open-hand/prod-repo-service)。
- 编写参数配置文件 `prod-repo-service.yaml`

    ```yaml
    preJob:
      preInitDB:
        datasource:
          driver: com.mysql.jdbc.Driver
          password: password
          url: jdbc:mysql://c7n-mysql.c7n-system:3306/?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
          username: choerodon
        datasources:
          # 多数据源初始化
          platform:
            url: jdbc:mysql://c7n-mysql.c7n-system:3306/?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
            username: choerodon
            password: password
            driver: com.mysql.jdbc.Driver
    env:
      open:
        EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://choerodon-register.c7n-system:8000/eureka/
        # devops的数据库 迁移数据使用 只会在0.23版本使用
        HARBOR_INIT_CUSTOM_REPO_PASSWORD: password
        HARBOR_INIT_CUSTOM_REPO_URL: jdbc:mysql://c7n-mysql.c7n-system:3306/devops_service?useUnicode=true&characterEncoding=utf-8&useSSL=false
        HARBOR_INIT_CUSTOM_REPO_USERNAME: choerodon
        # platform的数据库 迁移数据使用 只会在0.23版本使用
        HARBOR_INIT_DEFAULT_REPO_PASSWORD: Uc9Cw6gDyJPL
        HARBOR_INIT_DEFAULT_REPO_URL: jdbc:mysql://c7n-mysql.c7n-system:3306/hzero_platform?useUnicode=true&characterEncoding=utf-8&useSSL=false
        HARBOR_INIT_DEFAULT_REPO_USERNAME: choerodon
        HARBOR_BASE_URL: https://registry.example.choerodon.io
        HARBOR_PASSWORD: Harbor12345
        HARBOR_USER_NAME: admin
        SPRING_DATASOURCE_PASSWORD: password
        SPRING_DATASOURCE_URL: jdbc:mysql://c7n-mysql.c7n-system:3306/hrds_prod_repo?useUnicode=true&characterEncoding=utf-8&useSSL=false&useInformationSchema=true&remarks=true&serverTimezone=Asia/Shanghai
        SPRING_DATASOURCE_USERNAME: choerodon
        SPRING_REDIS_DATABASE: 0
        SPRING_REDIS_HOST: c7n-redis.c7n-system
        SPRING_REDIS_PORT: 6379
        ##系统默认nexus服务地址
        NEXUS_DEFAULT_BASE_URL: http://nexus.example.choerodon.io
        #系统默认nexus服务，超级管理员用户
        NEXUS_DEFAULT_USER_NAME: admin
        #系统默认nexus服务，超级管理员用户密码
        NEXUS_DEFAULT_PASSWORD: admin
        #系统默认nexus服务，是否启用仓库级的匿名访问控制。 1:启用  0:不启用
        NEXUS_DEFAULT_ENABLE_ANONYMOUS_FLAG: 0
        #系统默认nexus服务，启用仓库级的匿名访问控制时需要配置该值(即enableAnonymousFlag==1时)。 nexus服务开启全局匿名访问时，配置的用户
        NEXUS_DEFAULT_ANONYMOUS_USER: test-anonymous-user
        #系统默认nexus服务，启用仓库级的匿名访问控制时需要配置该值(即enableAnonymousFlag==1时)。 nexus服务开启全局匿名访问时，配置的用户对应的角色
        NEXUS_DEFAULT_ANONYMOUS_ROLE: test-anonymous

    ```
- 其它配置 <br/>
    上述变量配置中：NEXUS_DEFAULT_ENABLE_ANONYMOUS_FLAG(是否启用仓库级的匿名访问控制)、NEXUS_DEFAULT_ANONYMOUS_USER、NEXUS_DEFAULT_ANONYMOUS_ROLE这几个变量的配置。
  当NEXUS_DEFAULT_ENABLE_ANONYMOUS_FLAG配置为1（启用时），还需要做以下配置，若配置为0（不启用），可以不做以下配置
  - 说明<br/>
  nexus服务上开启匿名访问，是全局生效的。nexus3版本及其以上，如果服务上允许匿名访问，默认有一个匿名访问用户，但这个用户拥有所有仓库的访问权限，故需要更改此处设置

    ![image](/docs/installation-configuration/steps/install/parts/image/anonymous.jpg)

  - 配置 <br/>
    - 创建一个用户匿名访问的角色，如：test-anonymous。将允许匿名访问仓库的read、browse权限给到这个用户
    ![image](/docs/installation-configuration/steps/install/parts/image/role.jpg)
    - 创建一个用户，将上述角色赋予这个用户,如 test-anonymous-user。并将匿名访问的用户设置为该新建的用户
    ![image](/docs/installation-configuration/steps/install/parts/image/user.jpg) <br/>
    <br/>
    ![image](/docs/installation-configuration/steps/install/parts/image/anonymous.png)
    
    - 如上在nexus服务配置后，上述变量配置值配置为：
      ```
      #系统默认nexus服务，是否启用仓库级的匿名访问控制。 1:启用  0:不启用
      NEXUS_DEFAULT_ENABLE_ANONYMOUS_FLAG: 1
      #系统默认nexus服务，启用仓库级的匿名访问控制时需要配置该值(即enableAnonymousFlag==1时)。 nexus服务开启全局匿名访问时，配置的用户
      NEXUS_DEFAULT_ANONYMOUS_USER: test-anonymous-user
      #系统默认nexus服务，启用仓库级的匿名访问控制时需要配置该值(即enableAnonymousFlag==1时)。 nexus服务开启全局匿名访问时，配置的用户对应的角色
      NEXUS_DEFAULT_ANONYMOUS_ROLE: test-anonymous
      ```
- 部署服务

    ```
    helm upgrade --install prod-repo-service c7n/prod-repo-service \
        -f prod-repo-service.yaml \
        --create-namespace \
        --version 0.23.3 \
        --namespace c7n-system
    ```

- 验证部署

  - 验证命令
  
    ```
    curl -s $(kubectl get po -n c7n-system -l choerodon.io/release=prod-repo-service -o jsonpath="{.items[0].status.podIP}"):7145/actuator/health | jq -r .status
    ```

  - 出现以下类似信息即为成功部署
  
    ```
    UP
    ```
