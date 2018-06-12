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

此`demo`需涉及到`app`层的`service`接口类与其实现类。

`service` 调用领域对象或服务来解决问题，应用层Service主要有以下特性：

1. 负责事务处理，所以事务的注解可以在这一层的`service`中使用。
2. 只处理非业务逻辑，重点是调度业务处理流程。业务逻辑处理一定要放在领域层处理。
3. 不做单元测试，只做验收测试。
4. 可能会有比较多的依赖组件(领域服务)，使用`field`注入依赖的组件。
5. 方法要求无状态，只接受`dto`和`元数据类型`作为参数。

## `Service` 接口类

- `Service` 接口类定义了业务操作的一系列接口，并不提供实现，具体实现需要通过服务实现层提供，所以属于供应方的服务接口层。创建在项目模块的 `xxx.app.service` 包下。

### `UserService.java` 代码 
```java
package io.choerodon.todo.app.service;

import io.choerodon.todo.api.dto.UserDTO;

public interface UserService {
    UserDTO create(UserDTO userDTO);
}
```

### `TaskService.java` 代码 
```java
package io.choerodon.todo.app.service;

import io.choerodon.todo.api.dto.TaskDTO;

public interface TaskService {

    TaskDTO create(TaskDTO taskDTO);

    void deleteById(Long id);

    void deleteByTaskNumber(String taskNumber);

    TaskDTO update(TaskDTO taskDTO);

    TaskDTO queryById(Long id);
}

```

## `Service` 实现类

* `Service` 接口的具体实现通过服务实现层提供，所以属于供应方的服务实现层。创建在项目模块的 `xxx.app.service.impl` 包下。
* 实现类，需要用 `@Service` 标注

### `UserServiceImpl.java` 代码 
```java
package io.choerodon.todo.app.service.impl;

// 省略 import

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private UserConvertor userConvertor;

    public UserServiceImpl(UserRepository userRepository, UserConvertor userConvertor) {
        this.userRepository = userRepository;
        this.userConvertor = userConvertor;
    }

    @Override
    public UserDTO create(UserDTO userDTO) {
        return userConvertor.entityToDto(
                userRepository.create(userConvertor.dtoToEntity(userDTO))
        );
    }
}
```

### `UserServiceImpl.java` 代码 
```java
package io.choerodon.todo.app.service.impl;

// 省略 import

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private UserConvertor userConvertor;

    public UserServiceImpl(UserRepository userRepository, UserConvertor userConvertor) {
        this.userRepository = userRepository;
        this.userConvertor = userConvertor;
    }

    @Override
    public UserDTO create(UserDTO userDTO) {
        return userConvertor.entityToDto(
                userRepository.create(userConvertor.dtoToEntity(userDTO))
        );
    }
}
```

### `TaskServiceImpl.java` 代码 
```java
package io.choerodon.todo.app.service.impl;

// 省略 import

@Service
public class TaskServiceImpl implements TaskService {
    private TaskRepository taskRepository;
    private TaskConvertor taskConvertor;

    public TaskServiceImpl(TaskRepository taskRepository, TaskConvertor taskConvertor) {
        this.taskRepository = taskRepository;
        this.taskConvertor = taskConvertor;
    }

    @Override
    public TaskDTO create(TaskDTO taskDTO) {
        return taskConvertor.entityToDto(
                taskRepository.create(taskConvertor.dtoToEntity(taskDTO)));
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
    public TaskDTO update(TaskDTO taskDTO) {
        return taskConvertor.entityToDto(
                taskRepository.update(taskConvertor.dtoToEntity(taskDTO)));
    }

    @Override
    public TaskDTO queryById(Long id) {
        return taskConvertor.entityToDto(taskRepository.queryById(id));
    }
}

```