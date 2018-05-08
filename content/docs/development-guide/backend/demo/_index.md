+++
title = "开发Demo程序"
description = ""
weight = 2
+++

# 概述

## 开发环境

在开发之前，要保证环境已经安装正确，详见 [软件安装(Windows)](../develop_env/install_windows/)

## 业务需求

创建一个简单的项目，实现记录待办事项的功能.

具体功能包括：创建任务、根据任务Id获取任务、根据ID删除任务、根据任务编号删除任务、根据任务ID更新任务信息。

## 表结构

`todo_task` 表：id, employee_id, task_number, task_description, state

`todo_user` 表：id, employee_name, employee_number, email

`todo_swimlane` 表：id, state, next_state