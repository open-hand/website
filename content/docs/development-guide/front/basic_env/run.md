+++
title = "代码运行"
description = "代码运行"
weight = 2
+++

# 代码运行

## 克隆代码

可以新建一个 `choerodon-cloud-front` 的目录，进入到该目录下，在终端执行

```
git clone https://xxxx@rdc.hand-china.com/gitlab/HAPCloud/HAPCloudFront.git --recursive

```

其中 `xxxx` 是你的github账号。

## 运行代码

进入到项目根目录，打开终端，键入`sh boot/structure/moduleCi.sh boot iam`。

在终端中执行命令

```
npm run gulp
[15:35:03] Starting 'watch'...
[15:35:03] Finished 'watch' after 91 ms
```

不要关闭该终端(在iam等其他模块项目中源文件发生修改时，gulp会自动检测修改并同步)，新开一个`git bash`同样在该目录下执行 `npm run dev` 启动项目，看到如图所示效果说明启动成功

```
npm run dev

运行成功如下显示:
Hash: cfe31cfb37f523377d0c
Version: webpack 2.7.0
Time: 54546ms
Entrypoint main = app/vendor_cfe31cfb.js app/main_cfe31cfb.js
webpack: Compiled successfully.
```

提示: (可以通过 `npm run gulp:clean` 删除所有自动生成的文件,再通过 `npm run gulp` 来重新生成，再重新启动 `npm start`，这样可以解决有时页面未更新的状态)

## 查看效果

在浏览器中键入 `localhost:9090`，查看页面效果。