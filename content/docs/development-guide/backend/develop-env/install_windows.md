+++
title = "开发环境搭建(Windows)"
description = "讲述了如何在windows 环境下搭建本地开发环境"
weight = 1
+++

# 开发环境搭建

本章节讲述了使用Choerodon 微服务框架开发微服务的一些软件依赖，以及如何在Windows 环境下进行安装使用。

## 开发工具

- Git
- JDK 1.8.0 及以上
- maven 3.3 及以上
- Docker for Windows
- IDE
- Mysql
- Redis

## Git 安装

1. 在 [Git 官网](https://git-scm.com/download/) 下载对应平台的 Git。
2. 本地执行安装文件，安装 Git 环境。
3. 配置完成后打开 git bash 执行 `git` ，有提示则说明环境安装成功。
4. 配置本地git。

打开git bash 执行如下命令：

```bash
# 请将下面命令按实际情况进行执行
git config --global user.name "Your Name"
git config --global user.email "Your Email"
```

## Java 安装

1. 在 [Oracle 官网](https://www.oracle.com/technetwork/cn/java/javase/downloads/index.html) 下载对应平台的 JDK 1.8.0 以上的环境。
2. 本地执行安装文件，安装 JDK 环境。
3. Win 在环境变量系统变量中 配置环境变量 `JAVA_HOME` 指向JDK安装目录，并将 path 配置 JDK 的环境变量 指向 JDK 安装目录下 `JDK/bin`，
4. 配置完成后打开 git bash 执行 `java` ，有提示则说明环境安装成功。(git bash执行会有乱码，cmd则正常)

## Maven 安装

1. 在 [Maven 官网](http://mirror.bit.edu.cn/apache/maven/) 下载对应平台的合适的 maven 版本的压缩包。
2. 本地解压压缩包。
3. Win 在环境变量中系统变量的 path 配置 maven 的环境变量指向 maven 解压目录下的 `/bin` 。
4. 配置完成后打开 git bash 执行 `mvn -v` ，有提示则说明环境安装成功。

## Docker for Windows 安装

1. 在 [Docker for Windows](https://www.docker.com/docker-windows) 下载安装包
2. 本地执行安装文件，安装Docker
3. 启动Docker，然后会提示启用Hyper-V需要重启
4. 重启后Docker会自动启动
5. 打开 git bash 执行 `docker --version` ，有提示则说明环境安装成功。
6. 打开 docker for windows，并在General 中勾选 `Expose daemon on tcp://localhost:2375 without TLS`

> **注意要使用Docker for Windows，机器必须开启虚拟化支持，部分机型默认禁用，需进入bios进行设置，因各机型设置不相一致，在此不做详细说明**

## IDE 安装

这里以idea 为例

1. 在IDEA官网下载安装包
2. 本地执行安装文件，安装IDEA
1. 菜单栏File > Setting打开设置， Editor > Code Style > Line separator (for new lines): Unix and OS X (n)
2. 确保idea使用utf-8编码
3. 安装Docker插件。在File-Settings-Plugins中，搜索Docker integration，点击Install安装，并重启软件加载插件
4. IDEA中配置Docker，在File-Settings-Build，Execution，Deployment-Clouds中，点击加号新建，会自动读取docker信息，直接保存即可

## 其他软件安装

除了基本的软件之外，其他基础软件可以通过官网下载安装包，也可以通过docker 启动镜像。Choerodon 建议通过docker 启动。

1. 在本地创建docker-compose的运行路径
2. 编写docker-compose.yaml 文件
3. 打开git bash 执行`docker-compose up -d`
4. 执行`docker ps` 或`docker-compose ps` 查看容器是否启动

这里提供一份默认的mysql 配置和docker-compose.yaml 配置。

``` bash
# mysql_db.cnf
[mysqld]
lower_case_table_names=1
character_set_server=utf8
max_connections=500
```

``` sql
/** init_user.sql */
CREATE USER 'choerodon'@'%' IDENTIFIED BY "123456";
CREATE DATABASE IF NOT EXISTS iam_service DEFAULT CHARACTER SET utf8;
CREATE DATABASE IF NOT EXISTS manager_service DEFAULT CHARACTER SET utf8;
CREATE DATABASE IF NOT EXISTS asgard_service DEFAULT CHARACTER SET utf8;
CREATE DATABASE IF NOT EXISTS notify_service DEFAULT CHARACTER SET utf8;
GRANT ALL PRIVILEGES ON iam_service.* TO choerodon@'%';\
GRANT ALL PRIVILEGES ON manager_service.* TO choerodon@'%';\
GRANT ALL PRIVILEGES ON asgard_service.* TO choerodon@'%';\
GRANT ALL PRIVILEGES ON notify_service.* TO choerodon@'%';\
FLUSH PRIVILEGES;
```

``` yaml
# docker-compose.yaml
version: "3"
services:
  mysql:
    container_name: mysql
    hostname: mysql
    image: registry.cn-hangzhou.aliyuncs.com/choerodon-tools/mysql:5.7.17
    ports:
    - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: root
    volumes:
    - ./mysql/mysql_data:/var/lib/mysql
    - ./mysql/mysql_db.cnf:/etc/mysql/conf.d/mysql_db.cnf
    - ./mysql/init_user.sql:/docker-entrypoint-initdb.d/init_user.sql
    expose:
    - "3306"
    networks:
    - "c7nNetwork"
  redis:
    container_name: redis
    hostname: redis
    image: redis:4.0.11
    ports:
    - "6379:6379"
    expose:
    - "6379"
    networks:
    - "c7nNetwork"
networks:
  c7nNetwork:
    driver: bridge
```

停止容器通过命令`docker-compose down`。

> 有关Docker的更多信息请见[此处](https://docs.docker.com/)

> 有关Docker-Compose的更多信息请见[此处](https://docs.docker.com/compose/overview/)