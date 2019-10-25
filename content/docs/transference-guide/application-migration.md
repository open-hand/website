+++
title = "应用迁移"
description = ""
weight = 3
+++

# 应用迁移

应用迁移主要是将应用系统的代码迁移到Choerodon猪齿鱼中，并通过Choerodon猪齿鱼的开发流水线、部署流水线等进行应用系统的开发和部署等工作。应用迁移主要包括Choerodon猪齿鱼系统的 **创建项目、创建应用、改造原代码库、将原代码库迁移到Choerodon、生成新的应用版本、创建应用系统环境、部署版本、创建网络、创建域名和测试访问**等步骤。请用户按照此步骤顺序进行。

<blockquote class="note">
如果是SaaS版本的用户需要先申请开通组织。
</blockquote>


## 创建项目

项目是最小粒度的管理层次。在组织下创建项目，则创建的项目属于这个组织。

> 关于Choerodon猪齿鱼中项目的详细信息，以及相关操作等可以参考[**创建项目**](../../user-guide/createapp/)。

1.使用“组织管理员”角色登录系统

2.点击组织，例如“汉得研发”，进入到组织层的管理菜单。

![enter description here](/docs/transference-guide/image/managepage.png)

3.在组织层的管理菜单中，点击：“汉得研发” -> 左上角的菜单 -> “组织设置” -> “项目管理”。进入到项目管理与创建功能界面

![enter description here](/docs/transference-guide/image/managepage-projectmanage.png)

4.在“项目管理”界面，单击“创建项目”，在弹出的窗口中填写项目编码、项目名称。

例如，

  - 项目编码：**hand-rdc-halm**
  - 项目名称：**汉得资产云平台**

![enter description here](/docs/transference-guide/image/managepage-createproject.png)

5.点击“创建”，即可创建完成。项目创建完成之后，用户就可以使用Choerodon猪齿鱼的系统功能，例如知识管理、敏捷管理、开发流水线、测试管理、部署流水线等。

![enter description here](/docs/transference-guide/image/managepage-createend.png)

## 创建应用

应用是满足用户某些需求的程序代码的集合，一个应用可以是一个单体应用，也可以是微服务系统的一个服务。服务端相关应用，例如Java、Python、C/C++/C#、Go、.NET等应用，以及前端相关应用，例如ReactJs、VueJs、AngularJs等等，理论上讲没有什么限制。

> 关于如何创建应用，以及相关操作和信息等，可以参考Choerodon官网的[**应用管理**](../../user-guide/development/application-service/)。

1.切换到项目层，例如“**汉得资产云平台**”。

![enter description here](/docs/transference-guide/image/managepage-createapplication.png)

2.在组织层的管理菜单中，点击：“汉得资产云平台” -> 左上角的菜单 -> “应用管理” -> “应用”，进入到应用创建功能界面。

![enter description here](/docs/transference-guide/image/managepage-create.png)

3.在创建应用的弹框中填写应用编码、应用名称和选择“应用模板”。

例如，

  - 编码：**halm-dev**
  - 名称：**资产云应用**
  - 选择应用模板：**MicroService**

> 关于Choerodon的应用模板，可以参考应用模板。如果是迁移原库的代码，则随便选择一个即可。

![enter description here](/docs/transference-guide/image/managepage-createpage.png)

4.创建完成应用之后，Choerodon会在Gitlab中创建先关的代码库。
例如：[https://code.choerodon.com.cn/hand-rdc-halm/halm-dev](https://code.choerodon.com.cn/hand-rdc-halm/halm-dev)

![enter description here](/docs/transference-guide/image/managepage-code.png)

<blockquote class="note">
强烈建议不要直接在Gitlab中操作代码库，Choerodon已经封装了对Gitlab库的增删改查等操作，例如创建库、创建分支、删除分支、合并代码等，所以这些操作尽量在Choerodon上进行操作。
</blockquote>

## 应用容器化配置

Choerodon猪齿鱼秉承云原生的理念，基于平台的应用需要进行容器化改造才能够使用Choerodon进行开发和部署。在本节中将给大家介绍Choerodon容器化的一些概念、如何构建应用的基础镜像，以及为原代码库增加相关的配置使其满足Choerodon容器化要求。

<blockquote class="note">
应用的容器化配置是整个迁移过程中最难的部分，在此需要熟悉、掌握Kubernetes、Helm等。
</blockquote>

### Choerodon猪齿鱼应用容器化概念

在Choerodon猪齿鱼中，使用Helm管理Kubernetes包等，Helm之于Kubernetes好比yum之于RHEL，或者apt-get之于Ubuntu。Helm使用Charts管理应用，Charts就好像RPM一样，里面描述了应用及其依赖关系。

所以，<font color=#f96e57 > 在Choerodon的标准应用代码结构中一定要包含charts文件夹</font>，如下截图，这是一个后端项目的标准结构。

![enter description here](/docs/transference-guide/image/structure.png)

- templates为模板文件，将模板文件渲染成实际文件，然后发送给Kubernetes。
- values.yaml为模板的预定义变量。
- Chart.yaml包含 chart 的版本信息说明，您可以从模板中访问它。
- deployment.yaml：创建 Kubernetes 部署的基本清单。
- service.yaml：为您的部署创建服务端点的基本清单。
- _helpers.tpl：放置模板助手的地方，您可以在整个 chart 中重复使用

### 构建应用基础镜像

什么是应用基础镜像？先来看一张图，一般在应用基础镜像中预先安装了工具类、依赖包、系统基础一致性设置等应用程序构建、测试、运行等相关的基础依赖工具和系统配置。

![enter description here](/docs/transference-guide/image/application-mirroring.png)

资产云应用为PHP项目，那么应用基础镜像中就应该为PHP运行环境，首先去DockerHub上搜索是否有官方提供的公共镜像，可以对官方提供的公共镜像做进一步定制，生成需要的镜像，也可以从一个基础的只有系统的镜像进行定制。

具体的步骤如下：

1.编写Dockerfile定制基础镜像时，尽量将镜像大小往小的做，镜像层数往少的写，仅添加应用运行时必须的相关组件，不要添加不必要的东西进入。在项目根目录下新建名为Dockerfile.base文件，在文件中写入Dockerfile定义的信息，例如：

```
# 以ubuntu作为系统
FROM ubuntu:16.04
# 设置环境变量
ENV NODE_HOME=/usr/local/node8
ENV PATH=$NODE_HOME/bin:$PATH
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV COMPOSER_HOME=/composer
ENV USER=root
ENV SASS_BINARY_PATH=/opt/linux-x64-57_binding.node

# 添加源并安装所需要的软件
RUN echo "deb-src http://archive.ubuntu.com/ubuntu xenial main restricted #Added by software-properties" > /etc/apt/sources.list \
    && echo "deb http://mirrors.aliyun.com/ubuntu/ xenial main restricted" >> /etc/apt/sources.list \
    && echo "deb-src http://mirrors.aliyun.com/ubuntu/ xenial main restricted multiverse universe #Added by software-properties" >> /etc/apt/sources.list \
    && echo "deb http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted" >> /etc/apt/sources.list \
    && echo "deb-src http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted multiverse universe #Added by software-properties" >> /etc/apt/sources.list \
    && echo "deb http://mirrors.aliyun.com/ubuntu/ xenial universe" >> /etc/apt/sources.list \
    && echo "deb http://mirrors.aliyun.com/ubuntu/ xenial-updates universe" >> /etc/apt/sources.list \
    && echo "deb http://mirrors.aliyun.com/ubuntu/ xenial multiverse" >> /etc/apt/sources.list \
    && echo "deb http://mirrors.aliyun.com/ubuntu/ xenial-updates multiverse" >> /etc/apt/sources.list \
    && echo "deb http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse" >> /etc/apt/sources.list \
    && echo "deb-src http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse #Added by software-properties" >> /etc/apt/sources.list \
    && echo "deb http://archive.canonical.com/ubuntu xenial partner" >> /etc/apt/sources.list \
    && echo "deb-src http://archive.canonical.com/ubuntu xenial partner" >> /etc/apt/sources.list \
    && echo "deb http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted" >> /etc/apt/sources.list \
    && echo "deb-src http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted multiverse universe #Added by software-properties" >> /etc/apt/sources.list \
    && echo "deb http://mirrors.aliyun.com/ubuntu/ xenial-security universe" >> /etc/apt/sources.list \
    && echo "deb http://mirrors.aliyun.com/ubuntu/ xenial-security multiverse" >> /etc/apt/sources.list \

    && apt-get update \
    && apt-get install -y gcc g++ make xz-utils axel libsass-dev libmcrypt-dev curl supervisor rpm libaio1 libaio-dev \
    && apt-get install -y nginx \
    && apt-get install -y php-fpm php-pdo-mysql php-pdo-sqlite php-curl php-redis php-mongodb \
                          php-gd php-mcrypt php-mbstring php-xml php-ldap php-imap php-zip php-dom php-soap php-dev phpunit \

    && apt-get autoclean \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && echo "daemon off;" >> /etc/nginx/nginx.conf \
    && sed -i "s/^user\swww-data;/user root;/g" /etc/nginx/nginx.conf \
    && sed -i "s/^user\s=\swww-data/user = root/g" /etc/php/7.0/fpm/pool.d/www.conf \
    && sed -i "s/^group\s=\swww-data/group = root/g" /etc/php/7.0/fpm/pool.d/www.conf \
    && sed -i "s/^;daemonize\s*=\s*yes/daemonize = no/g" /etc/php/7.0/fpm/php-fpm.conf \
    && sed -i "s/^;mbstring\.internal_encoding\s*=.*$/mbstring\.internal_encoding = UTF-8/g" /etc/php/7.0/fpm/php.ini \
    && sed -i "s/^;mbstring\.internal_encoding\s*=.*$/mbstring\.internal_encoding = UTF-8/g" /etc/php/7.0/cli/php.ini \
    && echo "[program:nginx]\ncommand=/usr/sbin/nginx" >> /etc/supervisor/conf.d/nginx.conf \
    && echo "[program:php-fpm7.0]\ncommand=/usr/sbin/php-fpm7.0 --nodaemonize --fpm-config /etc/php/7.0/fpm/php-fpm.conf -R" >> /etc/supervisor/conf.d/php.conf \
    && mkdir /run/php \

    && sed -i "s/\[supervisord\]/[supervisord]\nnodaemon=true\nuser=root\n/g" /etc/supervisor/supervisord.conf \

    && axel -n 20 https://getcomposer.org/download/1.4.2/composer.phar \
    && mv composer.phar /usr/local/bin/composer \
    && chmod +x /usr/local/bin/composer \
    && composer config -g repo.packagist composer https://packagist.phpcomposer.com \

    && cd /usr/local \
    && axel -n 10 https://nodejs.org/dist/v8.2.1/node-v8.2.1-linux-x64.tar.xz \
    && xz -d node-v8.2.1-linux-x64.tar.xz \
    && tar xvf node-v8.2.1-linux-x64.tar \
    && unlink /usr/local/node-v8.2.1-linux-x64.tar \
    && mv node* node8 \
    && chown -R root:root node8 \
    && npm install cnpm -g --registry=https://registry.npm.taobao.org \
    && npm install nrm -g -registry=https://registry.npm.taobao.org \
    && nrm use taobao
# 暴露端口
EXPOSE 80 443
# 设置默认启动命令
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
```

2.在 **项目根目录下**执行命令进行应用基础镜像构建，构建好之后推送镜像到镜像仓库，例如registry.choerodon.com.cn/hand-rdc-halm仓库下（**注意：用户也可以根据自身具体的需求，选择镜像库地址，例如DockerHub等**），这个仓库在Choerodon创建项目时会自动创建：

```
docker build -t registry.choerodon.com.cn/hand-rdc-halm/php:ubuntu-16.04 -f Dockerfile.base .
```

3.将构建好的镜像推送到镜像仓库中：
```
docker login registry.choerodon.com.cn
docker push -t registry.choerodon.com.cn/hand-rdc-halm/php:ubuntu-16.04
```

### 在原来代码库中增加Dockerfile、和Helm Chart

#### **1.Dockerfile**

在有应用基础镜像的基础上编写应用的Dockerfile那就很容易了，只需要将程序放入基础镜像特定的目录，设置好镜像运行前置处理和启动命令即可。

本事例中，应用运行时需链接数据库，但数据库相关信息是运行时才会知道的，那么解决方式是将这些信息配置为环境变量，镜像运行时从环境变量中获取这些信息并替换到对应的配置文件中去。

**第一步：修改配置文件并编写启动脚本**

在项目根目录下新建auto_devops文件夹，将配置文件拷贝至该文件夹下，下面为配置文件中数据库配置片段，将会改变的值全部使用大写的字母进行替换，替换时需保证在此文件中唯一。

```
'dbconfig' =>
    array(
        'db_host_name' => 'DB_HOST_NAME',
        'db_host_instance' => 'SQLEXPRESS',
        'db_user_name' => 'DB_USER_NAME',
        'db_password' => 'DB_PASSWORD',
        'db_name' => 'DB_NAME',
        'db_type' => 'mysql',
        'db_port' => 'DB_PORT',
        'db_manager' => 'MysqliManager'
    ),
```
然后在auto_devops文件夹新建docker-entrypoint.sh文件编写启动脚本，这个脚本将替换配置文件中大写的那些变量名。

```
#!/bin/bash

sed -i "s DB_HOST_NAME $DB_HOST_NAME g"  /var/www/config.php 
sed -i "s DB_USER_NAME $DB_USER_NAME g"  /var/www/config.php 
sed -i "s DB_PASSWORD $DB_PASSWORD g"  /var/www/config.php 
sed -i "s DB_NAME $DB_NAME g"  /var/www/config.php 
sed -i "s DB_PORT $DB_PORT g"  /var/www/config.php 

exec "$@"
```

**第二步：编写应用Dockerfile**
在项目根目录下新建名为Dockerfile的文件
```
# 应用基础镜像
FROM registry.choerodon.com.cn/hand-rdc-halm/php:ubuntu-16.04
# 将程序复制到/var/www/目录中
COPY . /var/www/
# 将配置文件复制到对应目录中
COPY ./auto_devops/config.php    /var/www/config.php
# 将替换环境变量的脚本复制到镜像中
COPY ./auto_devops/docker-entrypoint.sh      /docker-entrypoint.sh
# 默认运行镜像时执行的命令
ENTRYPOINT ["/bin/sh", "/docker-entrypoint.sh"]
# 启动服务
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
```

#### **2.Helm Chart**

在编写Helm Chart之前你需要了解Kubernetes中的对象及其概念，本事例中运行应用只需定义一个deployment对象即可。

**第一步：创建目录**

在项目根目录下创建如下目录结构，首先创建一个名为chart的文件夹，再创建一个与应用名相同的文件夹，本事例为 **Helm Chart**，在halm-dev文件夹中再创建一个templates目录。
```
chart
└── halm-dev
    ├── Chart.yaml
    ├── templates
    │   ├── _helpers.tpl
    │   └── deployment.yaml
    └── values.yaml
```

**第二步：编写_helpers.tpl文件**
在 **templates**文件夹下将一些公共的lable或值定义到 _helpers.tpl文件中：
```
{{/* vim: set filetype=mustache: */}}
{{- /*
service.labels.standard prints the standard service Helm labels.
The standard labels are frequently used in metadata.
*/ -}}
{{- define "service.labels.standard" -}}
choerodon.io/release: {{ .Release.Name | quote }}
{{- end -}}
```

**第三步：编写deployment.yml文件**
在 **templates**文件夹下创建一个名为 **deployment.yml**的文件，内容如下：
```
apiVersion: apps/v1beta2
kind: Deployment
metadata:
  name: {{ .Release.Name }}
  labels:
{{ include "service.labels.standard" . | indent 4 }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
{{ include "service.labels.standard" . | indent 6 }}
  template:
    metadata:
      labels:
{{ include "service.labels.standard" . | indent 8 }}
    spec:
      containers:
        - name: {{ .Release.Name }}
          image: "{{ .Values.image.repository }}:{{ .Chart.Version }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          env:
{{- range $name, $value := .Values.env }}
{{- if not (empty $value) }}
          - name: {{ $name | quote }}
            value: {{ $value | quote }}
{{- end }}
{{- end }}
          ports:
            - name: http
              containerPort: {{ .Values.service.port }}
              protocol: TCP
          resources:
{{ toYaml .Values.resources | indent 12 }}
```

**第四步：编写Chart.yaml文件**
在halm-dev文件夹中编写 **Chart.yaml**文件，这个文件中写明应用的的相关信息。
```
# api版本
apiVersion: v1
# 应用版本
appVersion: "1.0"
# 应用描述
description: A Helm chart for Kubernetes
# 应用名称
name: halm-dev
# 应用chart版本
version: 0.1.0
```

**第五步：编写文件**
在halm-dev文件夹中编写 **values.yaml**文件，这个文件中编写 **templates**文件夹中 **deployment.yml**文件会用到的变量及默认值。
```
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: registry.choerodon.com.cn/hand-rdc-halm/halm-dev
  pullPolicy: Always

env:
  SITE_URL: http://localhost:8081/
  DB_HOST_NAME: 
  DB_USER_NAME: 
  DB_PASSWORD: 
  DB_NAME: 
  DB_PORT: "3306"

logs:
  parser: nginx

resources: 
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources,such as Minikube. If you do want to specify resources,uncomment the following
  # lines,adjust them as necessary,and remove the curly braces after 'resources:'.
  limits:
    # cpu: 100m
    # memory: 2Gi
  requests:
    # cpu: 100m
    # memory: 1Gi
```

更多如何charts中详细的讲解，可以参考Choerodon官网文档 [从yaml到helm。](../../development-guide/basic/helm-chart/)

## CI持续集成配置

在上节“应用容器化配置”中，有提到Choerodon标准的应用源代码结构中必须包含charts文件件。同样，Choerodon使用Gitlab-CI作为CI工具，所以需要在应用源代码中加上.gitlab-ci.yml文件。

![enter description here](/docs/transference-guide/image/ci.png)

在CI中主要的工作就是进行镜像构建并且生成Chart包，最后将Chart包上传至Choerodon，与Choerodon进行集成。

在项目根目录下新建.gitlab-ci.yml文件，粘贴以下内容：
```
# 设置CI运行时的环境镜像
image: registry.cn-hangzhou.aliyuncs.com/choerodon-tools/cibase:0.6.0

# 设置阶段，这里只进行镜像构建和生成Chart包，所以定义为一个阶段即可
stages:
- docker-build

docker-build:
  stage: docker-build
  # 阶段中需要执行的命令
  script:
  - docker_build
  - chart_build

# 这里是最为关键的，定义了一个全局脚本，在每一个阶段运行前都将执行下面代码从Choerodon平台中获取相应变量及封装的shell函数。
.auto_devops: &auto_devops |
    http_status_code=`curl -o .auto_devops.sh -s -m 10 --connect-timeout 10 -w %{http_code} "${CHOERODON_URL}/devops/ci?token=${Token}"`
    if [ "$http_status_code" != "200" ]; then
      cat .auto_devops.sh
      exit 1
    fi
    source .auto_devops.sh
    # 重写docker_build函数
    function docker_build(){
        docker build --pull -t ${DOCKER_REGISTRY}/${GROUP_NAME}/${PROJECT_NAME}:${CI_COMMIT_TAG} .
        docker push ${DOCKER_REGISTRY}/${GROUP_NAME}/${PROJECT_NAME}:${CI_COMMIT_TAG}
    }

before_script:
  - *auto_devops
```

> 更多如何配置符合Choerodon标准和要求的.gitlab-ci.yml文件，请参考Choerodon官网[**持续集成**](../../development-guide/basic/gitlab-ci/)。

## 将原来代码库替换到Choerodon代码库

经过了“应用容器化配置”和“CI持续集成配置”两步之后，将得到一个包含了charts和.gitlab-ci.yml文件的新的代码库（<font color=#f96e57 >charts文件夹和.gitlab-ci.yml文件一定是放在代码库的根目录</font>），现在就将代码库同步到Choerodon对应的代码库，替换生成的标准代码库。

Git相关的命令如下：
```
git commit -m "Change repo." # 先把所有为保存的修改打包为一个commit
git remote remove origin # 删掉原来git源
git remote add origin [YOUR NEW .GIT URL] # 将新源地址写入本地版本库配置文件
git push -u origin master # 提交所有代码
```

## 生成新的版本

当在上一步“将原来代码库替换到Choerodon代码库”中提交代码到Choerodon的远程新库的时候，Choerodon会自动生成一个master分支上的开发版本，即“**2018.8.27-234043-master**”，**这个版本是可以部署运行的**，当然，往往生成的第一个版本会由于各种BUG等，需要经过反复地调试才可以。

可以进入到Choerodon系统中查看生成的版本，系统路径：“**汉得研发”(组织)->“<你的项目>”->应用管理->应用版本**。如下图所示。

![enter description here](/docs/transference-guide/image/newversion.png)

## 创建一个环境

有了可部署的版本之后，就可以把此版本部署到环境中去了。在步骤“**应用系统环境搭建**”中已经安装好了应用系统运行的Kubernetes集群环境，并且在“**数据库迁移**”步骤中已经安装部署好数据库。

1.进入到的Choerodon猪齿鱼创建环境页面，系统路径：“**汉得研发”(组织)->“<你的项目>”->部署流水线->环境流水线**。

![enter description here](/docs/transference-guide/image/env-pipeline.png)

2.单击“创建环境”按钮，在弹出框中输入环境编码、环境名称和环境描述。

例如，

  - 环境编码：**halm-dev**
  - 环境名称：**开发环境**
  - 环境描述：**开发环境**

![enter description here](/docs/transference-guide/image/create-environment.png)

3.保存时，系统会跳出来另一个对话框，如下图，需要将这段命令在步骤“应用系统环境搭建”中创建的Kubernetes环境中运行，以安装Choerodon Agent。这一步是必须要执行的，关于Choerodon Agent可以参考官网 [Choerodon Agent](../../concept/choerodon-agent/)。

![enter description here](/docs/transference-guide/image/copy-instruction.png)

4.命令是具体应用、具体环境而不同的，所以，以下是笔者的环境生产的命令，请不要复制执行。

```
helm install --repo=http://chart.choerodon.com.cn/choerodon/c7ncd/ \
    --namespace=halm-dev \
    --name=halm-dev \
    --version=0.9.7 \
    --set config.connect=ws://devops.service.choerodon.com.cn/agent/ \
    --set config.token=a932598f-8945-449a-9dc7-7a2db489eff6 \
    --set config.envId=162 \
    --set rbac.create=true \
    choerodon-agent
```

5.如果在Kubernetes中执行成功，则可以看到“开发环境”显示“**运行中**”，否则就是不成功。

![enter description here](/docs/transference-guide/image/running.png)

## 部署新生成的版本

可部署版本就绪，环境就绪，现在就还要把可部署的版本部署到环境中。

1.进入到的Choerodon猪齿鱼应用部署页面，系统路径：“**汉得研发”(组织)->“<你的项目>”->部署流水线->应用部署**。

![enter description here](/docs/transference-guide/image/deployment-app.png)

2.选择应用及版本。

例如，

  - 选择应用：**资产云应用(halm-dev)**
  - 选择版本：**2018.8.27-234043-master**

![enter description here](/docs/transference-guide/image/chose-app.png)

3.选择环境及修改配置信息。

例如，

  - 选择环境：**开发环境**
  - 还有，下面的配置信息可以根据自身需求修改。

![enter description here](/docs/transference-guide/image/chose-env.png)

4.选择部署模式。

例如，

  - 选择部署模式：**新建实例**
  - 对于第一次部署，需要选择“新建实例”。

![enter description here](/docs/transference-guide/image/add-case.png)

5.确认信息及部署。

![enter description here](/docs/transference-guide/image/deploy-confirm.png)

6.最后，确认检查好信息之后，部署即可。可以在“实例”界面查看部署的情况。最终部署的实例名称为：“**halm-dev-9fc8**”。

![enter description here](/docs/transference-guide/image/check-case.png)

## 创建网络

部署完成应用之后，还不能够被外部访问，需要创建网络和域名。现在先创建网络。

1.进入到Choerodon猪齿鱼网络页面，系统路径：“**汉得研发”(组织)->“<你的项目>”->部署流水线->网络**。

![enter description here](/docs/transference-guide/image/create-web.png)

2.单击“创建网络”，弹出创建网络界面。填写相关的字段信息。

例如，

  - 环境：选择“**开发环境**”。
  - 目标对象：选择“**选择实例**”。
  - 应用名称：选择“**资产云应用**”
  - 选择实例：选择“**halm-dev-9fc8**”，就是上一步部署生成的实例。
  - 网络配置：选择“ClusterIP”
  - 外部IP：NULL
  - 端口：**80** ，镜像内部应用的端口
  - 目标端口：**80** ，K8s中已经部署的应用对外提供服务的端口
  - 网络名称：**halm-dev-3491**

![enter description here](/docs/transference-guide/image/input-imf.png)

## 创建域名

有了网络还要有域名才可以。

1.进入到Choerodon猪齿鱼域名页面，系统路径：“**汉得研发”(组织)->“<你的项目>”->部署流水线->域名**。

![enter description here](/docs/transference-guide/image/create-domain.png)

2.单击“创建域名”，在弹出页面中填写相关信息。

![enter description here](/docs/transference-guide/image/input-imformation.png)

## 测试访问

创建好域名之后，使用URL：handalm.hand-china.com 访问。

![enter description here](/docs/transference-guide/image/test-visit.png)


## 更多资料

[**介绍与学习资源汇集**](../../concept/use-choerodon)