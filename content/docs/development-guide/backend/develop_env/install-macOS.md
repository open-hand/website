+++
title = "软件安装(macOS)"
date = "2017-02-01"
draft = false
weight = 3
+++

# 软件安装(以macOS High Sierra为例)

## 开发工具

- brew
- Git
- JDK 1.8.0 及以上
- maven 3.3 及以上
- Docker for Mac
- IntelliJ IDEA 2017.2
- Mysql
- Rabbit MQ
- Redis
- Phpmyadmin (可选)
- Visual Studio Code (可选)

## 安装brew软件包管理工具

1. 在命令行里输入以下命令，回车。

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## Git 安装

> macOS中已预装Git，可跳过此步骤也可执行以下命令进行Git版本升级。

1. 在命令行输入`brew install git`，回车安装Git。
1. 安装完成后在命令行执行 `git version`命令 ，输出Git版本信息则安装成功。

### 配置

```bash
curl -o ~/.gitconfig -SL https://raw.githubusercontent.com/carllhw/dotfiles/master/.gitconfig-others
# 请将下面命令按实际情况进行执行
git config --global user.name "Your Name"
git config --global user.email "Your Email"
```

## Java 安装

1. 在命令行中输入`brew cask install java`，回车安装Jdk。
1. 安装完成后在命令行执行 `java -version`命令 ，输出Java版本信息则安装成功。

## Maven 安装

1. 在命令行输入`brew install maven`，回车安装Maven。
1. 安装完成后在命令行执行 `mvn -v`命令 ，输出Maven版本信息则安装成功。

## Docker安装

1. 在命令行输入`brew cask install docker`，回车安装Docker。
1. Docker安装完成后，请点击Docker应用图标运行Docker。
1. 运行后在命令行执行 `docker version`命令 ，输出Docker版本信息则安装成功。
1. 安装docker-compose
```bash
sudo curl -L https://github.com/docker/compose/releases/download/1.16.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose 
sudo chmod +x /usr/local/bin/docker-compose
# 验证安装时否成功
docker-compose --version
```

## IntelliJ IDEA 安装配置

1. 在命令行输入`brew cask install intellij-idea`，回车安装IntelliJ IDEA。

### Idea配置

1. 安装Docker插件。在IntelliJ IDEA > Preferences > Plugins中，搜索Docker integration，点击Install安装，并重启软件加载插件。

    ![](../images/ideaDockerPluginsMac.png)

    **因网络原因，可能导致下载失败，若一直不能下载成功，可跳过Idea关于Docker的相关配置步骤，在下方关于Docker容器启动方式选择第二种——Docker-Compose**

1. IDEA中配置Docker，在IntelliJ IDEA > Preferences > Build,Execution,Deployment > Docker中，点击加号新建，会自动读取docker信息，直接保存即可。

    ![](../images/ideaAddDockerMac.png)

## 克隆代码

### 克隆代码到本地

1. 在命令行输入 `git clone https://rdc.hand-china.com/gitlab/HAPCloud/HAPCloudBackend.git` 将项目 clone 到本地
1. 进入项目中执行`git submodule update --init --recursive`命令将所有后端子模块初始化。

### 导入项目到IDEA开发工具中

打开已安装好的IDEA开发工具，将clone到本地的项目导入到开发工具IDEA中，会自动下载依赖包。

因为各模块分离，故而可通过IDEA的菜单File > Project Structure添加module

![](../images/ideaAddModuleMac.png)

![](../images/ideaProjectStructureMac.png)

## 服务环境准备

### 准备

在~/Docker/mysql下新建mysql_data文件夹，同时新建一个mysql_db.cnf文件，内容如下

```
[mysqld]
lower_case_table_names=1
character_set_server=utf8
max_connections=500
```

也可在其他位置创建，但需注意与下方使用该配置文件时的路径相对应。

### 安装

> 以下是开发中会用到的镜像，执行以下命令进行镜像拉取；也可跳过此步，因为IDEA启动Docker容器和使用docker-compose来启动Docker容器都会自动拉取镜像。
```bash
docker pull registry.saas.hand-china.com/tools/mysql:5.7.17
docker pull registry.saas.hand-china.com/tools/rabbitmq:3.6.1-management
docker pull registry.saas.hand-china.com/tools/redis
docker pull registry.saas.hand-china.com/tools/phpmyadmin
```

### 启动Docker容器

以下两种方式任选一种进行

#### 1. Idea启动Docker

##### MySQL配置

- Name: mysql
- Docker Deployment

  ```
  Server: Docker
  Deployment: Docker Image
  Image ID: registry.saas.hand-china.com/tools/mysql:5.7.17
  Container name: mysql
  ```

- Docker Container

  - Port bindings

    Container Port | Protocol | Host IP | Host Port
    ---|---|---|---
    3306 | tcp |  | 3306

  - Volume bindings

    Container Path | Host path | Read only
    ---|---|---
    /var/lib/mysql | /Users/用户名/Docker/mysql/mysql_data |
    /etc/mysql/conf.d/mysql_db.cnf | /Users/用户名/Docker/mysql/mysql_db.cnf |

    用户名请以当前用户名替代。

    Host path 可以根据自己需求自己选择映射位置，第一项为mysql的数据存放文件夹，第二项为mysql的配置文件，请确保确映射类型对应且必须存在。

  - Environment variables

    Name | value
    ---|---
    MYSQL_ROOT_PASSWORD | root

    ![](../images/dockerMysql1Mac.png)

    ![](../images/dockerMysql2Mac.png)

##### Rabbit MQ配置

- Name: rabbitmq
- Docker Deployment

  ```
  Server: Docker
  Deployment: Docker Image
  Image ID: registry.saas.hand-china.com/tools/rabbitmq:3.6.1-management
  Container name: rabbitmq
  ```

- Docker Container

  - Port bindings

    Container Port | Protocol | Host IP | Host Port
    ---|---|---|---
    15672 | tcp |  | 15672
    5672 | tcp |  | 5672

    ![](../images/dockerRabbitmq1Mac.png)

    ![](../images/dockerRabbitmq2Mac.png)

##### Redis配置

- Name: redis
- Docker Deployment

  ```
  Server: Docker
  Deployment: Docker Image
  Image ID: registry.saas.hand-china.com/tools/redis
  Container name: redis
  ```

- Docker Container

  - Port bindings

    Container Port | Protocol | Host IP | Host Port
    ---|---|---|---
    6379 | tcp |  | 6379

    ![](../images/dockerRedis1Mac.png)

    ![](../images/dockerRedis2Mac.png)

###### phpadmin

- Name: phpadmin
- Docker Deployment

  ```
  Server: Docker
  Deployment: Docker Image
  Image ID: registry.saas.hand-china.com/tools/phpmyadmin
  Container name: phpadmin
  ```

- Docker Container

  - Port bindings

    Container Port | Protocol | Host IP | Host Port
    ---|---|---|---
    80 | tcp |  | 80

  - Environment variables

    Name | value
    ---|---
    PMA_ARBITRARY | 1

    ![](../images/dockerPhpmyadmin1Mac.png)

    ![](../images/dockerPhpmyadmin2Mac.png)

#### 2. 通过docker-compose来启动docker

在~/Docker目录下新建docker-compose.yml文件内容如下:

```yaml
version: "3"
services:
  mysql:
    container_name: mysql  # 容器名
    image: registry.saas.hand-china.com/tools/mysql:5.7.17 # 容器所使用的镜像，镜像形式为[username 或 url]/repository:tag，该镜像为公司搭设的docker仓库内的镜像
    ports:
      - "3306:3306" # [本机端口:容器内端口] 将本机端口与docker容器内部应用的端口映射，以提供外部对容器内应用的访问能力
    environment:
      MYSQL_ROOT_PASSWORD: root # 设置mysql密码
    volumes:
      - ./mysql/mysql_data:/var/lib/mysql # 将mysql中的数据文件映射到本机文件夹，":"前的为本机地址，后的为容器内地址
      - ./mysql/mysql_db.cnf:/etc/mysql/conf.d/mysql_db.cnf # 将mysql的配置文件映射到本机文件
  rabbitmq:
    container_name: rabbitmq
    image: registry.saas.hand-china.com/tools/rabbitmq:3.6.1-management
    ports:
      - "15672:15672"
      - "5672:5672"
  redis:
    container_name: redis
    image: registry.saas.hand-china.com/tools/redis
    ports:
      - "6379:6379"
  phpadmin:
    container_name: phpadmin
    image: registry.saas.hand-china.com/tools/phpmyadmin
    ports:
      - "80:80" # 80端口方便浏览器直接访问
    environment:
      PMA_ARBITRARY: 1 # 用于开启phpadmin关于可否输入host的设置
```

通过命令行进入~/Docker目录下，执行`docker-compose up -d`启动docker服务，通过`docker ps`查看容器是否启动。若需要停止，同样在该目录下执行`docker-compose down`

![](../images/dockerComposeMac.png)

有关Docker的更多信息请见[此处](https://docs.docker.com/)

有关Docker-Compose的更多信息请见[此处](https://docs.docker.com/compose/overview/)

## Visual Studio Code (可选)

1.在 [vscode](https://code.visualstudio.com/) 官网 下载对应平台的安装包,也可以执行`brew cask install visual-studio-code`命令进行安装。

### VSCode配置

Code > 首选项 > 设置

```json
// Place your settings in this file to overwrite the default settings
{
    "files.eol": "\n",
    "editor.formatOnSave": true
}
```
