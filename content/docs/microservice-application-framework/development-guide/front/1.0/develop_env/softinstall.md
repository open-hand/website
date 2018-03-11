+++
title = "软件安装"
date = "2017-10-26"
draft = false
weight= 1
+++

软件安装
========

安装工具
--------

1.  Node.js 6.3及以上版本
2.  Webstorm 或其他代码编辑器
3.  Git

node 安装
---------

1.  在 [Node.js官网](http://nodejs.org//)下载用于Windows平台的安装包
2.  Window 上安装Node.js，你可以采用以下两种方式来安装

Windows 安装包(.msi)

本文实例以v0.10.26版本为例，其他版本类似，安装步骤：

步骤1 :双击下载后的安装包\**v0.10.26*\*，如下所示：

![image](./images/import.png)

步骤2 :点击以上的Run(运行)，将出现如下界面：

![image](./images/2.png)

步骤3 :勾选接受协议选项，点击next（下一步）按钮:

![image](./images/3.png)

步骤4 : Node.js默认安装目录为“C:\\Program Files\\nodejs"
,你可以修改目录，并点击next（下一步）：

![image](./images/4.png)

步骤5 :点击树形图标来选择你需要的安装模式,然后点击下一步next（下一步）

![image](./images/5.png)

步骤6
:点击Install（安装）开始安装Node.js。你也可以点击Back（返回）来修改先前的配置。然后并点击next（下一步）：

![image](./images/6.png)

安装过程：

![image](./images/install.png)

点击Finish（完成）按钮退出安装向导。

![image](./images/finish.png)

检测PATH环境变量是否配置了Node.js，点击开始=》运行=》输入“cmd”
=\>输入命令“path”，输出如下结果： :

    PATH=C:\oraclexe\app\oracle\product\10.2.0\server\bin;C:\Windows\system32;

    C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0\;

    c:\python32\python;C:\MinGW\bin;C:\ProgramFiles\GTK2-Runtime\lib;

    C:\ProgramFiles\MySQL\MySQLServer5.5\bin;C:\ProgramFiles\nodejs\;

    C:\Users\rg\AppData\Roaming\npm

我们可以看到环境变量中已经包含了C:\\Program Files\\nodejs\\

检查Node.js版本

![image](./images/check.png)

2.2 Windows 二进制文件 (.exe)安装

步骤1 :双击下载的安装包Node.exe，将出现如下界面:

![image](./images/exe.png)

点击Run（运行）按钮将出现命令行窗口：

![image](./images/run.png)

版本测试

进入node.exe所在的目录，如下所示：

![image](./images/node.png)

如果你获得以上输出结果，说明你已经成功安装了Node.js。

git 安装
--------

1.  在[Git 官网](https://git-scm.com/download/)下载对应平台的 Git。
2.  本地执行安装文件， 安装 Git 环境。
3.  Win 在环境变量中系统变量的 path 配置 Git 的环境变量指向
    Git安装目录下的/bin。
4.  配置完成后打开 cmd 执行git，有提示则说明环境安装成功。

对于 Windows，安装 Git 以后，你可以在任意目录 右键，Git Bash Here

打开的 MINGW 命令窗口可以执行兼容 linux 系统的命令，如rm，ls等

WebStorm或其他代码编辑器安装
----------------------------

1.  在[WebStorm官网](http://www.jetbrains.com/webstorm/)下载安装
2.  本地执行.exe文件，自行安装

开发准备
--------

npm是Node.js的包管理工具（package
manager）。npm可以根据依赖关系，把所有依赖的包都下载下来并管理起来。

npm已经在Node.js安装的时候顺带装好了。我们在命令提示符或者终端输入`npm -v`，应该看到类似的输出：

    C:\>npm -v
    4.1.2

如果直接输入`npm`，你会看到类似下面的输出：

`C:\>npm Usage: npm <command> where <command> is one of:`

提示`npm`需要跟上命令。这样确保npm正确安装了，能运行就行。

全局安装 Webpack
----------------

我们希望能够在系统的任何文件夹中使用 Webpack，使用的方式是通过 Webpack
命令来完成的，这需要我们全局安装
Webpack。这也只需要安装一次，以后每个项目就不需要重新全局安装了。

```
$ npm install webpack -g
```

成功安装之后，你应该能够在任何目录中执行 webpack
命令，如果你还没有项目的配置文件的话，应该会看到当前的 Webpack
版本和一个命令的帮助列表。

全局安装 Gulp
-------------

在项目中，gulp 用于监视各模块文件的变化和同步相应的文件到boot目录中。

```
$ npm install gulp -g
```

安装成功后，在终端里运行 `gulp -v` 应该可以看到gulp的版本信息。

全局安装 yeoman
---------------

在项目中，yeoman 用于自动生成与boot同级的模块目录和文件。

```
$ npm install yeoman -g
```

若windows系统中安装失败.

![image](./images/yeoman.png)

可尝试运行。

```
$ npm -g install yo
```

安装成功后，在终端里运行 `yo --version` 应该可以看到yeoman的相关信息。
