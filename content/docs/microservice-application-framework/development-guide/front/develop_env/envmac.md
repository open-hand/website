+++
title = "软件安装(MacOs)"
date = "2017-02-01"
draft = false
weight= 3
+++

# 软件安装

## 安装工具

- NVM
- VScode或其他代码编辑器安装
- Git

## NVM 安装

- 打开终端 输入 `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash`
- 如果没有curl命令，可以通过wget命令:
- `wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash`
- 在~/.nvm, ~/.bash_profile, ~/.zshrc, ~/.profile, ~/.bashrc 其中任意一个文件中加入
`export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm`
- 这里修改~/.profile, `vim ~/.profile`, 如果没有vim, `apt-get install vim`或者直接编辑文件
- 然后输入`source ~/.profile`,通过`nvm -v`便可以看到nvm版本和相关操作
- 通过`nvm install 6.11.4`安装node的6.11.4版本,其他版本相似
---
详细NVM安装使用和系统权限等问题可看文档（通过其他方式进行安装）
* [NVM的github](https://github.com/creationix/nvm)
## git 安装
- 安装brew`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"` 
- 打开终端 输入 `brew install git` 安装git命令
## VScode或其他代码编辑器安装

1. 在 [VScode官网](https://code.visualstudio.com/Download) 下载安装
2. 在 [WebStorm官网](http://www.jetbrains.com/webstorm/) 下载安装

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
大家可以从[https://www.python.org/download](https://www.python.org/download)下载安装最新版的python,安装比较无脑,一路按下去就OK,缺点是以后升级,卸载都得自己维护.

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
wget https://bootstrap.pypa.io/get-pip.py
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
git clone release-1.2.0 https://xxxx@rdc.hand-china.com/gitlab/HAPCloud/HAPCloudFront.git --recursive
```

其中 `xxxx` 是你的工号。

(确保克隆之前设置了 `git config --global user.name git config --global user.email` )

- [git submodule 子模块操作](https://git-scm.com/book/zh/v1/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)
- [git config 配置操作](https://git-scm.com/book/zh/v1/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-%E9%85%8D%E7%BD%AE-Git)

## 运行代码

进入到项目根目录，打开终端，键入`bash boot\structure\npm.sh boot iam`。

安装依赖完成后，执行`node_modules/.bin/gulp`,如果已全局安装gulp,则可直接执行gulp

不要关闭该终端(在iam等其他模块项目中源文件发生修改时，gulp会自动检测修改并同步)，新开一个`git bash`同样在该目录下执行 `npm start` 启动项目，看到如图所示效果说明启动成功

![](./images/mac2.jpg)

![](./images/mac3.jpg)

提示: (可以通过 `gulp clean` 删除所有自动生成的文件,再通过 `gulp` 来重新生成，再重新启动 `npm start` ，这样可以解决有时页面未更新的状态)

## 查看效果

在浏览器中键入 `localhost:9090/`