+++
title = "第五步：Gitlab Runner部署"
description = "第五步：Gitlab Runner部署"
weight = 25
+++

# Gitlab Runner部署

Gitlab Runner，用于代码提交后自动进行代码测试、构建服务的镜像及生成helm chart并将结果发回给Choerodon。它与GitLab CI一起使用，Gitlab CI是Gitlab中包含的开源持续集成服务，用于协调作业。

## 获取Runner注册Token

<blockquote class="note">
此教程注册的Runner属性为共享，若需注册私有Runner或者无法进入Gitlab管理界面，注册Token请在Git项目仓库 Settings > CI/CD > Runners settings 菜单中获取。
</blockquote>

### 进入Gitlab管理界面

![WX20180120-200145@2x.png](https://i.loli.net/2018/05/28/5b0ba4f33e5d4.png)

## 注册Runner

### 方式1

- 运行Runner，进入容器

    ```bash
    docker run -it --rm --entrypoint=bash gitlab/gitlab-runner:alpine-v10.7.2
    ```

- 进行注册

    ```bash
    gitlab-runner register
    ```

- 注册成功后查看生成的token

    ```bash
    cat /etc/gitlab-runner/config.toml
    ```

![WX20180120-201422@2x.png](https://i.loli.net/2018/06/03/5b138f368904d.png)

### 方式2

- 运行Runner并注册

    ```bash
    docker run -it --rm gitlab/gitlab-runner:alpine-v10.7.2 register
    ```

<blockquote class="note">
注册完成后在Gitlab管理界面获取Runner的token、name和url
</blockquote>

![WX20180120-203636@2x.png](https://i.loli.net/2018/01/20/5a6337e86bb92.png)

## 仓库设置

1. 本地添加远程仓库

    ```bash
    helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
    ```
1. 更新本地仓库信息

    ```bash
    helm repo update 
    ```

## 部署Runner
<blockquote class="note">
启用持久化存储请执行提前创建所对应的物理目录，PV和PVC可使用以下语句进行创建；可在部署命令中添加--debug --dry-run参数，进行渲染预览不进行部署。
</blockquote>

- 创建缓存所需PV和PVC

    ```bash
    helm install c7n/create-pv \
        --set type=nfs \
        --set pv.name=runner-maven-pv \
        --set nfs.path=/u01/io-choerodon/runner/maven \
        --set nfs.server=nfs.example.choerodon.io \
        --set pvc.name=runner-maven-pvc \
        --set size=5Gi \
        --set "accessModes[0]=ReadWriteMany" \
        --name runner-maven-pv --namespace=choerodon-devops-prod

    helm install c7n/create-pv \
        --set type=nfs \
        --set pv.name=runner-cache-pv \
        --set nfs.path=/u01/io-choerodon/runner/cache \
        --set nfs.server=nfs.example.choerodon.io \
        --set pvc.name=runner-cache-pvc \
        --set size=5Gi \
        --set "accessModes[0]=ReadWriteMany" \
        --name runner-cache-pv --namespace=choerodon-devops-prod
    ```

- 部署Runner

    <blockquote class="note">
    请确认你所搭建的K8S集群是否已开启RBAC授权（按照本站Kubernetes部署教程部署的集群默认是开启RBAC授权的），若未开启，请删除下面执行命令中的--set rbac.create=true设置后执行。
    </blockquote>

    ```bash
    helm install c7n/gitlab-runner \
        --set rbac.create=true \
        --set env.concurrent=3 \
        --set env.url=http://gitlab.example.choerodon.io \
        --set env.token=token_token \
        --set env.environment.DOCKER_REGISTRY=registry.example.choerodon.io \
        --set env.environment.DOCKER_USER=username \
        --set env.environment.DOCKER_PWD=password \
        --set env.environment.CHOERODON_URL=http://api.example.choerodon.io \
        --set env.persistence.runner-maven-pvc="/root/.m2" \
        --set env.persistence.runner-cache-pvc="/cache" \
        --name=runner --namespace=choerodon-devops-prod 
    ```

- 参数：
    1. `env.environment.*`为CI时Pod的环境变量键值对，`*`就是环境变量名，等号后面的为该变量的值，这里例子中添加这几个环境变量建议配置，使用Choerodon管理的项目进行CI时会用到它们，若还需其他环境变量请自定义。
    1. `env.persistence.*`为CI时Pod的挂载PVC与Pod内目录的键值对，`*`就是PVC的名称，等号后面的值为要挂载到Pod的哪个目录，这里注意一点用引号引起来。本例中我们新建了两个PVC即`runner-maven-pvc`、`runner-cache-pvc`分别挂载到`/root/.m2`和`/cache`目录中。

    参数 | 含义 
    --- |  --- 
    rbac.create|创建sa及授权
    env.concurrent|可以同时进行的CI数量
    env.url|Gitlab地址
    env.token|注册Runner后得到的token
    env.environment.DOCKER_REGISTRY|Docker镜像仓库地址
    env.environment.DOCKER_USER|Docker镜像仓库用户名
    env.environment.DOCKER_PWD|Docker镜像仓库用户密码
    env.environment.CHOERODON_URL|Choerodon API地址
    env.persistence.runner-maven-pvc|持久化数据，此处`runner-maven-pvc`为PVC名称，值为要挂载到Pod的`/root/.m2`目录
    env.persistence.runner-cache-pvc|持久化数据，此处`runner-cache-pvc`为PVC名称，值为要挂载到Pod的`/cache`目录

- 更多Runner设置请参考[官方文档](https://docs.gitlab.com/runner/)