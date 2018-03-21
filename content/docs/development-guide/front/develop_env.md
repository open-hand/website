+++
title = "开发环境配置"
description = ""
weight = 1
+++

# Mac下软件安装

## 安装工具

- NVM
- VScode或其他代码编辑器安装
- Git

## NVM 安装

- 打开终端 输入 `curl -o- https:/raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash`
- 如果没有curl命令，可以通过wget命令:
- `wget -qO- https:/raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash`
- 在~/.nvm, ~/.bash_profile, ~/.zshrc, ~/.profile, ~/.bashrc 其中任意一个文件中加入
`export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm`
- 这里修改~/.profile, `vim ~/.profile`, 如果没有vim, `apt-get install vim`或者直接编辑文件
- 然后输入`source ~/.profile`,通过`nvm -v`便可以看到nvm版本和相关操作
- 通过`nvm install 6.11.4`安装node的6.11.4版本,其他版本相似
---
详细NVM安装使用和系统权限等问题可看文档（通过其他方式进行安装）
* [NVM的github](https:/github.com/creationix/nvm)
## git 安装
- 安装brew`/usr/bin/ruby -e "$(curl -fsSL https:/raw.githubusercontent.com/Homebrew/install/master/install)"` 
- 打开终端 输入 `brew install git` 安装git命令
## VScode或其他代码编辑器安装

1. 在 [VScode官网](https:/code.visualstudio.com/Download) 下载安装
2. 在 [WebStorm官网](http:/www.jetbrains.com/webstorm/) 下载安装

## 全局安装 Webpack

我们希望能够在系统的任何文件夹中使用 Webpack，使用的方式是通过 Webpack 命令来完成的，这需要我们全局安装 Webpack。这也只需要安装一次，以后每个项目就不需要重新全局安装了。

```
$ npm install webpack -g
```

成功安装之后，你应该能够在任何目录中执行 webpack 命令，如果你还没有项目的配置文件的话，应该会看到当前的 Webpack 版本和一个命令的帮助列表。

## 全局安装 Gulp

在项目中，gulp 用于监视各模块文件的变化和同步相应的文件到boot目录中。

```
$ npm install gulp -g
```

安装成功后，在终端里运行 `gulp -v` 应该可以看到gulp的版本信息。

## 全局安装 yeoman

在项目中，yeoman 用于自动生成与boot同级的模块目录和文件。

```
$ npm -g install yo
```

安装成功后，在终端里运行 `yo --version` 应该可以看到yeoman的相关信息。

## 全局安装python
### 安装python
mac系统其实自带了一个python的执行执行环境，用来运行python还行，但是开发可能就不够了，因此我们需要重新安装python。这里有两种方案安装：
#### homebrew
```
brew install python
```
这个方案比较简单,如果出错的话可以给前面加`sudo`试试,这个安装的python可能不是最新版.

#### 官网下载安装
大家可以从[https:/www.python.org/download](https:/www.python.org/download)下载安装最新版的python,安装比较无脑,一路按下去就OK,缺点是以后升级,卸载都得自己维护.

这两个方法安装的python的位置是不一样的,大家可以用:
```
which python
```
来查看安装位置.安装完成后在终端中键入`python`来验证安装是否成功

### 安装pip
```
brew install pip
```
#### 源代码安装pip
```
wget https:/bootstrap.pypa.io/get-pip.py
sudo python get-pip.py
```
用python执行刚才获取的脚本,这里sudo可以选择使用,若遇到类似这个报错则必须加sudo:
```
Exception:

Traceback (most recent call last):

...

OSError: [Errno 13] Permission denied: 'XXX/pip-0.7.2-py2.7.egg/EGG-INFO/dependency_links.txt'

Storing debug log for failure in /Users/bilt/.pip/pip.log
```
安装成功后可以在终端中键入pip来检测,如果不行重启终端后尝试.

## 克隆代码

可以新建一个 `hap-cloud-front` 的目录，进入到该目录下，在终端执行

```
git clone release-1.2.0 https:/xxxx@rdc.hand-china.com/gitlab/HAPCloud/HAPCloudFront.git --recursive
```

其中 `xxxx` 是你的工号。

(确保克隆之前设置了 `git config --global user.name git config --global user.email` )

- [git submodule 子模块操作](https:/git-scm.com/book/zh/v1/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)
- [git config 配置操作](https:/git-scm.com/book/zh/v1/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-%E9%85%8D%E7%BD%AE-Git)

## 运行代码

进入到项目根目录，打开终端，键入`bash boot\structure\npm.sh boot iam`。

安装依赖完成后，执行`node_modules/.bin/gulp`,如果已全局安装gulp,则可直接执行gulp

不要关闭该终端(在iam等其他模块项目中源文件发生修改时，gulp会自动检测修改并同步)，新开一个`git bash`同样在该目录下执行 `npm start` 启动项目，看到如图所示效果说明启动成功

![](../images/develop_env/mac2.jpg)

![](../images/develop_env/mac3.jpg)

提示: (可以通过 `gulp clean` 删除所有自动生成的文件,再通过 `gulp` 来重新生成，再重新启动 `npm start` ，这样可以解决有时页面未更新的状态)

## 查看效果

在浏览器中键入 `localhost:9090/`


# Windows下软件安装

## 安装工具

- Node.js 6.3及以上版本
- Webstorm 或其他代码编辑器
- Git

## node 安装

- 在 Node.js官网下载用于Windows平台的安装包
- Window 上安装Node.js，你可以采用以下两种方式来安装

### Windows 安装包(.msi)

本文实例以v0.10.26版本为例，其他版本类似，安装步骤：

步骤1 :双击下载后的安装包 **v0.10.26**，如下所示：

![](../images/develop_env/import1.png)

步骤2 :点击以上的Run(运行)，将出现如下界面：

![](../images/develop_env/2.png)

步骤3 :勾选接受协议选项，点击next（下一步）按钮:

![](../images/develop_env/3.png)

步骤4 : Node.js默认安装目录为“C:\Program Files\nodejs” ,你可以修改目录，并点击next（下一步）：

![](../images/develop_env/4.png)

步骤5 :点击树形图标来选择你需要的安装模式,然后点击下一步next（下一步）

![](../images/develop_env/5.png)

步骤6 :点击Install（安装）开始安装Node.js。你也可以点击Back（返回）来修改先前的配置。然后并点击next（下一步）：

![](../images/develop_env/6.png)

安装过程：

![](../images/develop_env/install.png)

点击Finish（完成）按钮退出安装向导。

![](../images/develop_env/finish.png)

检测PATH环境变量是否配置了Node.js，点击开始=》运行=》输入“cmd” =>输入命令“path”，输出如下结果：

```
PATH=C:\oraclexe\app\oracle\product\10.2.0\server\bin;C:\Windows\system32;

C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0\;

c:\python32\python;C:\MinGW\bin;C:\ProgramFiles\GTK2-Runtime\lib;

C:\ProgramFiles\MySQL\MySQLServer5.5\bin;C:\ProgramFiles\nodejs\;

C:\Users\rg\AppData\Roaming\npm
```

我们可以看到环境变量中已经包含了C:\Program Files\nodejs\

检查Node.js版本

![](../images/develop_env/check.png)

### Windows 二进制文件 (.exe)安装

步骤1 :双击下载的安装包Node.exe，将出现如下界面:

![](../images/develop_env/exe.png)

点击Run（运行）按钮将出现命令行窗口：

![](../images/develop_env/run.png)

版本测试

进入node.exe所在的目录，如下所示：

![](../images/develop_env/node.png)

如果你获得以上输出结果，说明你已经成功安装了Node.js。

## git 安装

1. 在Git 官网下载对应平台的 Git。
2. 本地执行安装文件， 安装 Git 环境。
3. Win 在环境变量中系统变量的 path 配置 Git 的环境变量指向 Git安装目录下的/bin。
4. 配置完成后打开 cmd 执行git，有提示则说明环境安装成功。

对于 Windows，安装 Git 以后，你可以在任意目录 右键，Git Bash Here

打开的 MINGW 命令窗口可以执行兼容 linux 系统的命令，如rm，ls等

## WebStorm或其他代码编辑器安装

1. 在 [WebStorm官网](http:/www.jetbrains.com/webstorm/) 下载安装
2. 本地执行.exe文件，自行安装

## 开发准备

npm是Node.js的包管理工具（package manager）。npm可以根据依赖关系，把所有依赖的包都下载下来并管理起来。

npm已经在Node.js安装的时候顺带装好了。我们在命令提示符或者终端输入 `npm -v`，应该看到类似的输出：

```
C:\>npm -v
4.1.2
```

如果直接输入 `npm` ，你会看到类似下面的输出：

`C:\>npm Usage: npm <command> where <command> is one of:`

提示 `npm` 需要跟上命令。这样确保npm正确安装了，能运行就行。

## 全局安装 Webpack

我们希望能够在系统的任何文件夹中使用 Webpack，使用的方式是通过 Webpack 命令来完成的，这需要我们全局安装 Webpack。这也只需要安装一次，以后每个项目就不需要重新全局安装了。

```
$ npm install webpack -g
```

成功安装之后，你应该能够在任何目录中执行 webpack 命令，如果你还没有项目的配置文件的话，应该会看到当前的 Webpack 版本和一个命令的帮助列表。

## 全局安装 Gulp

在项目中，gulp 用于监视各模块文件的变化和同步相应的文件到boot目录中。

```
$ npm install gulp -g
```

安装成功后，在终端里运行 `gulp -v` 应该可以看到gulp的版本信息。

## 全局安装 yeoman

在项目中，yeoman 用于自动生成与boot同级的模块目录和文件。

```
$ npm install yeoman -g
```

若windows系统中安装失败.

![](../images/develop_env/yeoman.png)

可尝试运行。

```
$ npm -g install yo
```

安装成功后，在终端里运行 `yo --version` 应该可以看到yeoman的相关信息。

## 全局安装 python

在项目中，python用于执行功能性脚本。

### 在Windows上安装python

首先, 从python的官方网站[python.org](http:/www.python.org/)下载最新的[2.7版本](https:/www.python.org/downloads/release/python-2712/),网速慢的请移步[国内镜像](https:/pan.baidu.com/s/1kU5OCOB#list/path=%2Fpub%2Fpython)。
然后，运行下载的MSI安装包，在选择安装组件的一步时，勾上所有的组件:

![](../images/develop_env/python1.png)

特别要注意选上`pip`和`Add python.exe to Path`, 然后一路点"Next"即可完成安装。
默认会安装到`C:\Python27`目录下，然后打开命令提示符窗口，敲入python后，会出现两种情况:
情况一：

![](../images/develop_env/python2.jpg)

看到上面的画面，就说明python安装成功！

情况二： 得到一个错误:
```
‘python’不是内部或外部命令，也不是可运行的程序或批处理文件。
```
这是因为windows会根据一个`path`的环境变量设定的路径去查找`python.org`，如果没找到，就会报错。如果在安装时漏掉了勾选`Add python.exe to Path`, 那就要手动把`python.exe`所在的路径添加到Path中。


## 克隆代码

可以新建一个 `hap-cloud-front` 的目录，进入到该目录下，在终端执行

```
git clone -b release-1.2.0 https:/xxxx@rdc.hand-china.com/gitlab/HAPCloud/HAPCloudFront.git --recursive
```

其中 `xxxx` 是你的工号。

(确保克隆之前设置了 `git config --global user.name git config --global user.email` )

- [git submodule 子模块操作](https:/git-scm.com/book/zh/v1/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)
- [git config 配置操作](https:/git-scm.com/book/zh/v1/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-%E9%85%8D%E7%BD%AE-Git)

## 运行代码

进入到项目根目录，打开终端，键入`bash boot\structure\npm.sh boot iam`。

安装依赖完成后，执行`node_modules/.bin/gulp`,如果已全局安装gulp,则可直接执行gulp

不要关闭该终端(在iam等其他模块项目中源文件发生修改时，gulp会自动检测修改并同步)，新开一个`git bash`同样在该目录下执行 `npm run dev` 启动项目，看到如图所示效果说明启动成功

![](../images/develop_env/gulp.jpg)

![](../images/develop_env/success.jpg)

提示: (可以通过 `gulp clean` 删除所有自动生成的文件,再通过 `gulp` 来重新生成，再重新启动 `npm start` ，这样可以解决有时页面未更新的状态)

## 查看效果

在浏览器中键入 `localhost:9090/`

# Lunix下软件安装

## 安装工具

- NVM
- VScode或其他代码编辑器安装
- Git

## NVM 安装

- 打开终端 输入
- `curl -o- https:/raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash`
- 如果没有curl命令，可以通过wget命令:
- `wget -qO- https:/raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash`
- 在~/.nvm, ~/.bash_profile, ~/.zshrc, ~/.profile, ~/.bashrc 其中任意一个文件中加入
- `export NVM_DIR="$HOME/.nvm"`
- `[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm`
- 这里修改~/.profile, `vim ~/.profile`, 如果没有vim, `apt-get install vim`或者直接编辑文件
![git submodule 子模块操作](../images/develop_env/unvm.jpg)
- 然后输入`source ~/.profile`,通过`nvm -v`便可以看到nvm版本和相关操作
![git submodule 子模块操作](../images/develop_env/unvm1.jpg)
- 通过`nvm install 6.11.4`安装node的6.11.4版本,其他版本相似
![git submodule 子模块操作](../images/develop_env/nvm2.jpg)
---
详细NVM安装使用和系统权限等问题可看文档（通过其他方式进行安装）
* [NVM的github](https:/github.com/creationix/nvm)
## git 安装

- 打开终端 输入 `apt-get install git` 安装git命令
## VScode或其他代码编辑器安装

1. 在 [VScode官网](https:/code.visualstudio.com/Download) 下载安装
2. 在 [WebStorm官网](http:/www.jetbrains.com/webstorm/) 下载安装

## 全局安装 Webpack

我们希望能够在系统的任何文件夹中使用 Webpack，使用的方式是通过 Webpack 命令来完成的，这需要我们全局安装 Webpack。这也只需要安装一次，以后每个项目就不需要重新全局安装了。

```
$ npm install webpack -g
```

成功安装之后，你应该能够在任何目录中执行 webpack 命令，如果你还没有项目的配置文件的话，应该会看到当前的 Webpack 版本和一个命令的帮助列表。

## 全局安装 Gulp

在项目中，gulp 用于监视各模块文件的变化和同步相应的文件到boot目录中。

```
$ npm install gulp -g
```

安装成功后，在终端里运行 `gulp -v` 应该可以看到gulp的版本信息。

## 全局安装 yeoman

在项目中，yeoman 用于自动生成与boot同级的模块目录和文件。

```
$ npm -g install yo
```

安装成功后，在终端里运行 `yo --version` 应该可以看到yeoman的相关信息。

## 在linux上安装python
### 直接使用apt-get进行安装
```
apt-get install python && python-pip
```
### 源代码进行安装,准备编译环境
```
yum groupinstall 'Development Tools'
yum install zlib-devel bzip2-devel openssl-devel ncurses-devel
```
### 下载python2.7代码包
```
wget https:/www.python.org/ftp/python/2.7.14/Python-2.7.14.tar.xz
```
在安装包中有一个README的文件，里面有写如何安装
```
tar Jxvf Python-2.7.14.tar.xz
cd Python-2.7.14
./configure --prefix=/usr/local/python
make && make install
```
做软链接
```
ln -s /usr/local/python3/bin/python2.7 /usr/local/bin/python
```
安装成功后，如果提示：`Ignoring ensurepip failure:pip 7.1.2 requires SSL/TLS`
这是由于没有安装或升级oenssl
```
yum install openssl-devel
```
再次重复编译方案python2.7

![](../images/develop_env/linuxpython.png)

提示同时成功安装pip-7.12与setuptools

做软链接
```
ln -s /usr/local/python3/bin/pip /usr/local/bin/pip
```

升级pip到最新版本
```
pip install --upgrade pip
```

## 克隆代码

可以新建一个 `hap-cloud-front` 的目录，进入到该目录下，在终端执行

```
git clone -b release-1.2.0 https:/xxxx@rdc.hand-china.com/gitlab/HAPCloud/HAPCloudFront.git --recursive
```

其中 `xxxx` 是你的工号。

(确保克隆之前设置了 `git config --global user.name git config --global user.email` )

- [git submodule 子模块操作](https:/git-scm.com/book/zh/v1/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)
- [git config 配置操作](https:/git-scm.com/book/zh/v1/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-%E9%85%8D%E7%BD%AE-Git)

## 运行代码

进入到项目根目录，打开终端，键入`bash boot\structure\npm.sh boot iam`。

安装依赖完成后，执行`node_modules/.bin/gulp`,如果已全局安装gulp,则可直接执行gulp

不要关闭该终端(在iam等其他模块项目中源文件发生修改时，gulp会自动检测修改并同步)，新开一个`git bash`同样在该目录下执行 `npm start` 启动项目，看到如图所示效果说明启动成功

![](../images/develop_env/gulp.jpg)

![](../images/develop_env/success.jpg)

提示: (可以通过 `gulp clean` 删除所有自动生成的文件,再通过 `gulp` 来重新生成，再重新启动 `npm start` ，这样可以解决有时页面未更新的状态)

## 查看效果

在浏览器中键入 `localhost:9090/`

# 前端开发手册

## 目录划分

开发仿照iam项目结构（推荐通过yo命令自动生成目录结构，节省自动建立目录时间），源文件目录在 `iam/src/app/iam` ，主要目录结构如下：

```
.
├── package-lock.json
├── package.json
├── src
│   └── app
│       └── iam
│           ├── assets
│           │   ├── css
│           │   │   ├── Codemirror.less
│           │   │   ├── logView.less
│           │   │   └── search.less
│           │   └── images
│           │       ├── gulp.png
│           │       ├── react.png
│           │       └── webpack.png
│           ├── common
│           │   ├── IconAntd.js
│           │   ├── IconMaterial.js
│           │   ├── Icons.js
│           │   ├── Permission.js
│           │   └── RouteMap.js
│           ├── components
│           │   ├── ClientSearch.js
│           │   ├── Codemirror.js
│           │   ├── FullButton.js
│           │   ├── MasterHeaderCopys.js
│           │   ├── SearchField.js
│           │   ├── memberRole
│           │   │   ├── PoReRoleCas.js
│           │   │   ├── ReRoleCas.js
│           │   │   ├── RoleCas.js
│           │   │   ├── RoleCasPro.js
│           │   │   ├── RoleList.js
│           │   │   ├── RolePanels.js
│           │   │   └── globalRoleCas.js
│           │   ├── menuOld
│           │   │   ├── CommonMenu.js
│           │   │   ├── LeftIconButton.js
│           │   │   ├── MainMenuOne.js
│           │   │   ├── MainMenuold.js
│           │   │   ├── MenuTitle.js
│           │   │   ├── MenuType.js
│           │   │   ├── MutilMenu.js
│           │   │   ├── ResourceMenu.js
│           │   │   ├── RightIconButton.js
│           │   │   ├── headerOrg.js
│           │   │   └── menu.css
│           │   ├── menuType
│           │   │   ├── menuType.js
│           │   │   └── menuType.less
│           │   ├── organization
│           │   │   ├── DeploymentTable.js
│           │   │   ├── Label.js
│           │   │   ├── LabelList.js
│           │   │   ├── LabelTable.js
│           │   │   ├── OrganizationList.js
│           │   │   ├── ServiceDeployment.js
│           │   │   ├── ServiceTable.js
│           │   │   ├── labelOrganizationList.js
│           │   │   ├── reLabel.js
│           │   │   └── reLabelTable.js
│           │   └── rightTabs
│           │       ├── RightTab.js
│           │       └── rightTab.less
│           ├── config
│           │   ├── Menu.yml
│           │   └── language
│           │       ├── en.yml
│           │       └── zh.yml
│           ├── containers
│           │   ├── Home.js
│           │   ├── IAMIndex.js
│           │   ├── MasterOld2.js
│           │   ├── Masters.js
│           │   ├── MastersNew.js
│           │   ├── MatersOld.js
│           │   ├── global
│           │   │   ├── MemberRole
│           │   │   │   ├── GlobalIndex.js
│           │   │   │   ├── GlobalMemberRole.css
│           │   │   │   └── GlobalMemberRole.js
│           │   │   ├── Menu
│           │   │   │   ├── GlobalMenuPermission.js
│           │   │   │   └── MenuIndex.js
│           │   │   ├── MenuPermission
│           │   │   │   ├── EditRole.js
│           │   │   │   ├── MenuPermission.js
│           │   │   │   ├── MenuPermissionIndex.js
│           │   │   │   └── role.css
│           │   │   ├── MenuTree
│           │   │   │   ├── InputIcon.js
│           │   │   │   ├── MenuDetail.js
│           │   │   │   ├── MenuTree.js
│           │   │   │   ├── MenuTreeIndex.js
│           │   │   │   ├── MenuTreeOld.js
│           │   │   │   ├── node.js
│           │   │   │   ├── react-ui-tree.js
│           │   │   │   ├── theme.less
│           │   │   │   └── tree.js
│           │   │   ├── adminOrganization
│           │   │   │   ├── AdminOrganization.js
│           │   │   │   ├── AdminOrganizationIndex.js
│           │   │   │   ├── AdminOrganizationLabel.js
│           │   │   │   ├── CreateAdminOrganization.js
│           │   │   │   ├── EditAdminOrganization.js
│           │   │   │   └── LabelOrganization.js
│           │   │   ├── excel
│           │   │   │   ├── Excel.js
│           │   │   │   └── ExcelIndex.js
│           │   │   ├── permission
│           │   │   │   ├── permission.js
│           │   │   │   └── permissionIndex.js
│           │   │   ├── role
│           │   │   │   ├── CreateRole.js
│           │   │   │   ├── EditRole.js
│           │   │   │   ├── Role.js
│           │   │   │   ├── RoleIndex.js
│           │   │   │   └── role.css
│           │   │   ├── service
│           │   │   │   ├── Service.js
│           │   │   │   └── ServiceIndex.js
│           │   │   └── token
│           │   │       ├── CreateSaasToken.js
│           │   │       ├── SaasToken.js
│           │   │       └── TokenIndex.js
│           │   ├── master.css
│           │   ├── organization
│           │   │   ├── adminClient
│           │   │   │   ├── Client.js
│           │   │   │   ├── ClientIndex.js
│           │   │   │   ├── CreateClient.js
│           │   │   │   └── EditClient.js
│           │   │   ├── adminDeploymentLabel
│           │   │   │   ├── AdminLabel.js
│           │   │   │   ├── AdminLabelIndex.js
│           │   │   │   └── AdminLabels.js
│           │   │   ├── client
│           │   │   │   ├── ClientDetail.js
│           │   │   │   ├── ClientIndex.js
│           │   │   │   ├── Clients.js
│           │   │   │   ├── CreateClient.js
│           │   │   │   └── EditClient.js
│           │   │   ├── language
│           │   │   │   ├── EditLanguage.js
│           │   │   │   ├── Language.js
│           │   │   │   └── LanguageIndex.js
│           │   │   ├── ldap
│           │   │   │   ├── EditLDAP.js
│           │   │   │   └── LDAPIndex.js
│           │   │   ├── lookup
│           │   │   │   ├── CreateLookup.js
│           │   │   │   ├── EditLookup.js
│           │   │   │   ├── Lookup.js
│           │   │   │   └── LookupIndex.js
│           │   │   ├── memberRole
│           │   │   │   ├── MemberRole.js
│           │   │   │   ├── MemberRoleIndex.js
│           │   │   │   ├── ReMemberRole.css
│           │   │   │   ├── ReMemberRole.js
│           │   │   │   └── all.css
│           │   │   ├── organization
│           │   │   │   ├── Organization.js
│           │   │   │   └── OrganizationIndex.js
│           │   │   ├── passwordPolicy
│           │   │   │   ├── PasswordPolicy.js
│           │   │   │   ├── PasswordPolicyIndex.js
│           │   │   │   └── UpdatePasswordPolicy.js
│           │   │   ├── project
│           │   │   │   ├── CreateProject.js
│           │   │   │   ├── EditProject.js
│           │   │   │   ├── Project.js
│           │   │   │   └── ProjectIndex.js
│           │   │   ├── reProject
│           │   │   │   ├── Project.js
│           │   │   │   └── project.less
│           │   │   ├── user
│           │   │   │   ├── CreateUser.js
│           │   │   │   ├── EditUser.js
│           │   │   │   ├── ModifyPassword.js
│           │   │   │   ├── User.js
│           │   │   │   ├── UserDetail.js
│           │   │   │   ├── UserIndex.js
│           │   │   │   └── UserInfo.js
│           │   │   └── userGroup
│           │   │       ├── CreateUserGroup.js
│           │   │       ├── UserGroup.js
│           │   │       ├── UserGroupIndex.js
│           │   │       └── userGroup.css
│           │   └── project
│           │       ├── language
│           │       │   ├── EditLanguage.js
│           │       │   ├── Language.js
│           │       │   └── LanguageIndex.js
│           │       └── memberRole
│           │           ├── MemberRole.js
│           │           ├── MemberRoleIndex.js
│           │           ├── ReMemberRole.css
│           │           ├── ReMemberRole.js
│           │           └── all.css
│           ├── locale
│           │   ├── en.js
│           │   └── zh.js
│           ├── stores
│           │   ├── globalStores
│           │   │   ├── GlobalMenuStore.js
│           │   │   ├── MemberRoleStore.js
│           │   │   ├── MenuTreeStore.js
│           │   │   ├── role
│           │   │   │   └── RoleStore.js
│           │   │   ├── service
│           │   │   │   └── ServiceStore.js
│           │   │   └── token
│           │   │       └── SaasTokenStore.js
│           │   ├── organization
│           │   │   ├── adminClient
│           │   │   │   └── AdminClientStore.js
│           │   │   ├── adminOrganization
│           │   │   │   ├── AdminOrganizationStore.js
│           │   │   │   └── LabelStore.js
│           │   │   ├── client
│           │   │   │   └── ClientStore.js
│           │   │   ├── excel
│           │   │   │   └── ExcelStore.js
│           │   │   ├── language
│           │   │   │   └── LanguageStore.js
│           │   │   ├── ldap
│           │   │   │   └── LDAPStore.js
│           │   │   ├── lookup
│           │   │   │   └── LookupStore.js
│           │   │   ├── memberRole
│           │   │   │   └── MemberRoleStore.js
│           │   │   ├── organization
│           │   │   │   └── OrganizationStore.js
│           │   │   ├── passwordPolicy
│           │   │   │   └── PasswordPolicyStore.js
│           │   │   ├── project
│           │   │   │   └── ProjectStore.js
│           │   │   ├── reProject
│           │   │   │   └── ProjectStore.js
│           │   │   ├── user
│           │   │   │   ├── CreateUserStore.js
│           │   │   │   └── UserStore.js
│           │   │   └── userGroup
│           │   │       └── UserGroupStore.js
│           │   └── project
│           │       └── memberRole
│           │           └── MemberRoleStore.js
│           └── test
│               └── index.test.js
├── tsconfig.json
└── yarn.lock
```

- containers 存放前端的页面
- stores 存放前端页面所需的数据
- assets 存放样式表和图片资源
- common 存放公共的配置文件
- components 存放的是公共的组件
- local 存放多语言文件
- config 存放yml配置文件
- test 存放测试文件
## 文件命名方式

- 文件夹命名

统一小写，比如模块 user。同一个模块的组件都放在同一个目录下，比如与 user 相关的 UserIndex, EditUser 等文件。

- 组件命名

采用帕斯卡命名规范，单个单词首字母大写，比如 User,多个单词仅首字母大写，比如 CreatUser