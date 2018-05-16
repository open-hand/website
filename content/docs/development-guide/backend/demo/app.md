+++
title = "编写app-应用层"
date = "2018-04-27T11:40:28+08:00"
draft = false
weight = 7
+++

# 前置条件

在开发之前，请确保

* 本地项目已经创建成功，详见 [新建项目](../create_project/)
* 数据库创建成功，详见 [初始化数据库](../init_db/)

## 介绍

此demo需涉及到app层的service接口类与其实现类（根据需要补充api层的dto类 以及 domain 层的 convertor 类）

## Service 接口类

- Service 接口类定义了业务操作的一系列接口，并不提供实现，具体实现需要通过服务实现层提供，所以属于供应方的服务接口层。创建在 项目模块 的 xxx.app.service 包下。

## Service 接口类代码（以TaskService为例）
```java
package io.choerodon.todo.app.service;

import io.choerodon.todo.api.dto.TaskDTO;
import org.springframework.stereotype.Service;

public interface TaskService {
    TaskDTO queryById(Long id);

    TaskDTO create(TaskDTO taskDTO);

    void deleteById(Long id);

    void deleteByTaskNumber(String taskNumber);

    TaskDTO updateStateById(Long id);
}

```

## Service 实现类

- Service 接口的具体实现通过服务实现层提供，所以属于供应方的服务实现层。创建在 项目模块 的 xxx.app.service.impl 包下。
- 实现类，需要用 @Component 标注

## Service 实现类代码（以TaskServiceImpl为例）
```java
package io.choerodon.todo.app.service.impl;

import io.choerodon.todo.api.dto.TaskDTO;
import io.choerodon.todo.app.service.TaskService;
import io.choerodon.todo.domain.repository.TaskRepository;
import io.choerodon.todo.domain.service.ITaskService;
import io.choerodon.todo.domain.todo.convertor.TaskConvertor;
import org.springframework.stereotype.Component;

@Component
public class TaskServiceImpl implements TaskService {
    private TaskRepository taskRepository;
    private ITaskService iTaskService;

    public TaskServiceImpl(TaskRepository taskRepository, ITaskService iTaskService) {
        this.taskRepository = taskRepository;
        this.iTaskService = iTaskService;
    }

    @Override
    public TaskDTO queryById(Long id) {
        return new TaskConvertor().entityToDto(taskRepository.queryById(id));
    }

    @Override
    public TaskDTO create(TaskDTO taskDTO) {
        return new TaskConvertor().entityToDto(taskRepository.create(new TaskConvertor().dtoToEntity(taskDTO)));
    }

    @Override
    public void deleteById(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public void deleteByTaskNumber(String taskNumber) {
        taskRepository.deleteByTaskNumber(taskNumber);
    }

    @Override
    public TaskDTO updateStateById(Long id) {
        return new TaskConvertor().entityToDto(iTaskService.updateTaskStateById(id));
    }
}

```