+++
title = "Git简明教程"
date = "2017-02-01"
draft = false
weight= 1
+++

# Git简明教程

# git 基本操作

<!-- @import "[TOC]" {cmd:"toc", depthFrom:1, depthTo:6, orderedList:false} -->
<!-- code_chunk_output -->

* [git 基本操作](#git-基本操作)
	* [开发流程](#开发流程)
	* [获取仓库](#获取仓库)
	* [添加至暂存区](#添加至暂存区)
	* [代码commit](#代码commit)
	* [回撤到某个版本](#回撤到某个版本)
	* [分支操作](#分支操作)
	* [分支合并](#分支合并)
	* [远程分支](#远程分支)

<!-- /code_chunk_output -->
## 开发流程

**Note. git commit 信息需注意分类**

- [FIX] 修复了功能
- [MOD] 修改或重构
- [ADD] 添加了功能
- [DEL] 删除了功能
- [IMP] 修改相关配置

## 获取仓库
```bash
git clone url --recursive
```

```bash
git clone -b dev url
```

**Note: git clone -b 分支名 远程仓库地址**
指定远程分支进行克隆

## 添加至暂存区

```bash
git add 文件名
```
将某文件从工作目录加入暂存区

```bash
git add .
```

添加工作区所有文件到暂存区

```bash
git reset HEAD 文件名
```

撤销某文件提交到暂存区的操作

**Note: git reset 若加上`--hard`参数，将会把工作区的文件也进行改变**

## 代码commit

```bash
git commit -m "commit信息"
```

此命令将暂存区的文件载入至本地仓库

若commit后发现有文件未加入暂存区，故而没有commit，而不想生成两条commit信息，在没有对工作区修改的情况下可使用:

```bash
git add 文件名
git commit --amend
```
这样便可以覆盖提交

## 回撤到某个版本

```bash
git checkout hash码
```

指定历史版本进行回撤，其效用等同于:

```bash
git reset --hard hash码
```
s
若想在确保新文件不消失的情况下回撤到指定版本，则:
```bash
git reset --soft hash码
```

## 分支操作

```bash
git branch
```
列出本地仓库的所有分支

```bash
git branch 分支名
```
新建分支

```bash
git checkout 分支名
```
切换到指定分支
 
```bash
git checkout -b 分支名
```
等价于
```bash
git branch 分支名 
git checkout 分支名
```

## 分支合并

```bash
git merge 分支名
```
以当前分支合并其它分支,此操作建议在vscode或jetbrain的ide操作，以便于当代码冲突时直接在图形化界面中进行处理。若在命令行操作，则需手工查找冲突文件进行合并。

## 远程分支

```bash
git remote add 远程仓库别名 远程仓库url
```
添加远程仓库

```bash
git push -u origin [本地分支:]远程分支
```
推送本地分支到远程仓库的某分支

```bash
git pull
```
拉取远程仓库
git pull 等价于git fetch 紧跟 git merge

**Note. `git pull 远程仓库别名 远程仓库分支`**
**Note. `git fetch 远程仓库别名 远程分支[:本地分支]`** 

<a href="http://eco.hand-china.com/doc/hap/latest/dev_guide/01.getting_start/01_git.html" target="_blank">Git简明教程</a>