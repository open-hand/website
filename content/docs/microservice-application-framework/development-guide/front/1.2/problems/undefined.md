+++
title = "项目运行出现打包文件未找到"
data = "2017-10-20"
draft = false
weight= 2
+++

# 项目运行出现打包文件未找到

## 情景
由于webpack打包运用`HardSourceWebpackPlugin`缓存打包机制，在优化打包速度的过程中，同时带来一些不可比避免的问题

如果在拉取新代码，本地编译后，项目控制台显示无法找到打包文件时，

停止编译控制台，在boot目录下执行`npm run dev`，多数情况会解决这种问题