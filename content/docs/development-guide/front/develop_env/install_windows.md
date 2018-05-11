+++
title = "软件安装(Windows)"
description = "软件安装(Windows)"
weight = 1
+++

# Windows下软件安装

## 开发工具

- Git
- Node.js 8.11.1及以上版本
- python

## Git 安装

1. 在 [Git 官网](https://git-scm.com/download/) 下载对应平台的 Git。
2. 本地执行安装文件，安装 Git 环境。
3. 配置完成后打开 git bash 执行 `git --version` ，有提示则说明环境安装成功。

> - 对于 Windows，安装 Git 以后，你可以在任意目录右键，选择`Git Bash Here`。
> - 打开的 MINGW 命令窗口可以执行兼容 linux 系统的命令。

## node 安装

1. 在 [Node.js官网](https://nodejs.org/en/download/) 下载用于Windows平台的安装包。
2. 本地执行安装文件。
3. 配置完成后打开 git bash 执行 `node --version`，有提示则说明环境安装成功。

## 在Windows上安装python

Python是一种解释型、面向对象、动态数据类型的高级程序设计语言。

在项目中，python用于执行功能性脚本。

1. 在[python 官网](https:/www.python.org/downloads/release/python-2712/) 下载2.7版本的python 安装包。
2. 本地执行安装文件。
3. 配置完成后打开 git bash 执行 `python`，有提示则说明环境安装成功。


## 克隆代码

可以新建一个 `choerodon-cloud-front` 的目录，进入到该目录下，在终端执行

```
git clone -b release-1.2.0 https://xxxx@rdc.hand-china.com/gitlab/HAPCloud/HAPCloudFront.git --recursive
```

其中 `xxxx` 是你的工号。

(确保克隆之前设置了 `git config --global user.name git config --global user.email` )

- [git submodule 子模块操作](https:/git-scm.com/book/zh/v1/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)
- [git config 配置操作](https:/git-scm.com/book/zh/v1/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-%E9%85%8D%E7%BD%AE-Git)

## 运行代码

进入到项目根目录，打开终端，键入`bash boot/structure/npm.sh boot iam`。

安装依赖完成后，执行`node_modules/.bin/gulp`,如果已全局安装gulp,则可直接执行gulp
```
D:\choerodon-cloud-front\HAPCloudFront\boot>gulp run
[15:35:03] Using gulpfile D:\choerodon-cloud-front\HAPCloudFront\boot\gulpfile.js
[15:35:03] Starting 'run'...
[15:35:03] Starting 'sync'...
[15:35:03] Finished 'run' after 13 ms
[15:35:03] copy file: 0 items
[15:35:03] Finished 'sync' after 191 ms
[15:35:03] Starting 'watchForGenerateFile'...
[15:35:03] Finished 'watchForGenerateFile' after 12 ms
[15:35:03] Starting 'generateFile'...
[15:35:03] Starting 'generateStoresFile'...
[15:35:03] Finished 'generateStoresFile' after 8.59 ms
[15:35:03] Starting 'generateAutoRouterFile'...
[15:35:03] Finished 'generateAutoRouterFile' after 999 μs
[15:35:03] Starting 'generateRouteMap'...
[15:35:03] Finished 'generateRouteMap' after 2.31 ms
[15:35:03] Starting 'generateIcons'...
[15:35:03] Finished 'generateIcons' after 1.13 ms
[15:35:03] Starting 'generatePermission'...
[15:35:03] Finished 'generatePermission' after 1.63 ms
[15:35:03] Finished 'generateFile' after 17 ms
[15:35:03] Starting 'watch'...
[15:35:03] Finished 'watch' after 91 ms
```

不要关闭该终端(在iam等其他模块项目中源文件发生修改时，gulp会自动检测修改并同步)，新开一个`git bash`同样在该目录下执行 `npm run dev` 启动项目，看到如图所示效果说明启动成功

```
D:\choerodon-cloud-front\HAPCloudFront\boot>npm run dev

> test@1.0.0 dev D:\choerodon-cloud-front\HAPCloudFront\boot
> rimraf .cache && npm start


> test@1.0.0 start D:\choerodon-cloud-front\HAPCloudFront\boot
> node bin/server

Happy[eslint]: Version: 4.0.1. Threads: 1
Happy[eslint]: All set; signaling webpack to proceed.
Happy[babel]: Version: 4.0.1. Threads: 3
Happy[babel]: All set; signaling webpack to proceed.
Happy[mocha]: Version: 4.0.1. Threads: 1
Happy[mocha]: All set; signaling webpack to proceed.
Happy[css]: Version: 4.0.1. Threads: 1
Happy[css]: All set; signaling webpack to proceed.
[hard-source:core] HardSourceWebpackPlugin is writing to a new confighash path for the first time: D:\choerodon-cloud-front\HAPCloudFront\boot\.cache\hard-source\9eb584da0ac288468b676d967f3ebf534c066711a9c1338d552391f5b1d65a3d
(node:11548) DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic, see https://github.com/webpack/loader-utils/issues/56
parseQuery() will be replaced with getOptions() in the next major version of loader-utils.
Hash: cfe31cfb37f523377d0c
Version: webpack 2.7.0
Time: 54546ms
Entrypoint main = app/vendor_cfe31cfb.js app/main_cfe31cfb.js
webpack: Compiled successfully.
```

提示: (可以通过 `gulp clean` 删除所有自动生成的文件,再通过 `gulp` 来重新生成，再重新启动 `npm start`，这样可以解决有时页面未更新的状态)

## 查看效果

在浏览器中键入 `localhost:9090/`