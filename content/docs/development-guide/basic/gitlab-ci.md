+++
title = "持续集成"
description = "讲述了Choerodon平台中gitlab ci文件详解"
weight = 2
+++

## 前置条件

此篇文档是以已经安装并配置好Choerodon、Gitlab，Gitlab-Runner的基础上进行讲解。

如需进行学习Gitlab CI文件如何编写请参考[**官方文档**](https://docs.gitlab.com/ee/ci/yaml/README.html)

## Choerodon中CI文件详解

### 与Choerodon集成

- 通过Choerodon创建应用后，在Gitlab中将自动会对应创建一个Git仓库，并且会在该仓库的CI Secret中添加一个`Token`，它是Choerodon给该Git仓库的唯一标识，请勿更改。
- 下面curl语句最主要是进行获取环境变量以及一些固定的函数。
- `CHOERODON_URL`为Choerodon的API地址，此项建议环境变量配置在Runner中。
- `type`的值有`microservice`、`front`、`lib`，分别对应java后端应用，前端，java库。

```yaml
.auto_devops: &auto_devops |
  http_status_code=`curl -o .auto_devops.sh -s -m 10 --connect-timeout 10 -w %{http_code} "${CHOERODON_URL}/devops/ci?token=${Token}"`
  if [ "$http_status_code" != "200" ]; then
    cat .auto_devops.sh
    exit 1
  fi
  source .auto_devops.sh

before_script:
  - *auto_devops
```

### .auto_devops.sh详解
- 上述语句就是在CI的每个JOB运行后立即请求`.auto_devops.sh`脚本，脚本中有该项目的相关变量和一些封装的函数。

    ```bash
    C7N_COMMIT_TIMESTAMP=$(git log -1 --pretty=format:"%ci"| awk '{print $1$2}' | sed 's/[-:]//g')
    C7N_COMMIT_YEAR=${C7N_COMMIT_TIMESTAMP:0:4}
    C7N_COMMIT_MONTH=$(echo ${C7N_COMMIT_TIMESTAMP:4:2} | sed s'/^0//')
    C7N_COMMIT_DAY=$(echo ${C7N_COMMIT_TIMESTAMP:6:2} | sed s'/^0//')
    C7N_COMMIT_HOURS=${C7N_COMMIT_TIMESTAMP:8:2}
    C7N_COMMIT_MINUTES=${C7N_COMMIT_TIMESTAMP:10:2}
    C7N_COMMIT_SECONDS=${C7N_COMMIT_TIMESTAMP:12:2}
    export C7N_COMMIT_TIME=$C7N_COMMIT_YEAR.$C7N_COMMIT_MONTH.$C7N_COMMIT_DAY-$C7N_COMMIT_HOURS$C7N_COMMIT_MINUTES$C7N_COMMIT_SECONDS
    
    # 8位sha值
    export C7N_COMMIT_SHA=$(git log -1 --pretty=format:"%H" | awk '{print substr($1,1,8)}')
    # 获取的项目名称
    export GROUP_NAME={{ GROUP_NAME }}
    # 获取的应用名称
    export PROJECT_NAME={{ PROJECT_NAME }}
    
    # 分支名
    if [ $CIRCLECI ]; then
      export C7N_BRANCH=$(echo $CIRCLE_BRANCH | tr '[A-Z]' '[a-z]' | tr '[:punct:]' '-')
    elif [ $GITLAB_CI ]; then
      export C7N_BRANCH=$CI_COMMIT_REF_SLUG
    fi
    
    # 默认Version
    if [ $CI_COMMIT_TAG ]; then
        export C7N_VERSION=$CI_COMMIT_TAG
    elif [ $CIRCLE_TAG ]; then
        export C7N_VERSION=$CIRCLE_TAG
    else
        export C7N_VERSION=$C7N_COMMIT_TIME-$C7N_BRANCH
    fi
    export CI_COMMIT_TAG=$C7N_VERSION
    
    # 更新maven项目本版本号
    function update_pom_version(){
        mvn versions:set -DnewVersion=${CI_COMMIT_TAG} || \
        find . -name pom.xml | xargs xml ed -L \
            -N x=http://maven.apache.org/POM/4.0.0 \
            -u '/x:project/x:version' -v "${CI_COMMIT_TAG}"
        mvn versions:commit
    }
    # 测试分支合并到指定分支，比如合并到master：git_merge master，默认合并到develop
    function git_merge(){
        git config user.name ${GITLAB_USER_NAME}
        git config user.email ${GITLAB_USER_EMAIL}
        git checkout origin/${1:-"develop"}
        git merge ${CI_COMMIT_SHA} --no-commit --no-ff
    }
    # 此项为上传构建并上传chart包到Choerodon中，只有通过此函数Choerodon才会有相应版本记录。
    function chart_build(){
        # 查找Chart.yaml文件
        CHART_PATH=`find . -maxdepth 3 -name Chart.yaml`
        # 重置values.yaml文件中image.repository属性
        sed -i "s,repository:.*$,repository: ${DOCKER_REGISTRY}/${GROUP_NAME}/${PROJECT_NAME},g" ${CHART_PATH%/*}/values.yaml
        # 构建chart包，重写version与app-version为当前版本
        helm package ${CHART_PATH%/*} --version ${CI_COMMIT_TAG} --app-version ${CI_COMMIT_TAG}
        TEMP=${CHART_PATH%/*}
        FILE_NAME=${TEMP##*/}
        # 通过Choerodon API上传chart包
        curl --fail -X POST \
            -F "token=${Token}" \
            -F "version=${CI_COMMIT_TAG}" \
            -F "file=@${FILE_NAME}-${CI_COMMIT_TAG}.tgz" \
            -F "commit=${CI_COMMIT_SHA}" \
            -F "image=${DOCKER_REGISTRY}/${GROUP_NAME}/${PROJECT_NAME}:${CI_COMMIT_TAG}" \
            "${CHOERODON_URL}/devops/ci"
    }
    ```