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

应用层Service主要有以下特性：

1. 负责事务处理，所以事务的注解可以在这一层的`service`中使用。
2. 不做单元测试，只做验收测试。
3. 可能会有比较多的依赖组件(领域服务)，使用`field`注入依赖的组件。
4. 方法要求无状态，只接受`dto`和`元数据类型`作为参数。

## `Service` 接口类

- `Service` 接口类定义了业务操作的一系列接口，并不提供实现，具体实现需要通过`Service`实现层提供，所以属于供应方的服务接口层。创建在项目模块的 `xxx.app.service` 包下。

### `UserService.java` 代码 
```java
package io.choerodon.todo.app.service;

import io.choerodon.todo.infra.dto.UserDTO;

public interface UserService {
    UserDTO createOne(UserDTO userDTO);
}
```

### `TaskService.java` 代码 
```java
package io.choerodon.todo.app.service;

import io.choerodon.todo.infra.dto.TaskDTO;

public interface TaskService {

    TaskDTO createOne(TaskDTO taskDTO);

    TaskDTO queryById(Long id);

    TaskDTO queryByTaskNumber(String taskNumber);

    TaskDTO update(TaskDTO taskDTO);

    void deleteById(Long id);
}
```

## `Service` 实现类

* `Service` 接口的具体实现通过服务实现层提供，所以属于供应方的服务实现层。创建在项目模块的 `xxx.app.service.impl` 包下。
* 实现类，需要用 `@Service` 标注

### `UserServiceImpl.java` 代码 
```java
package io.choerodon.todo.app.service.impl;

// 省略import

@Service
public class UserServiceImpl implements UserService {

    private UserMapper userMapper;

    public UserServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public UserDTO createOne(UserDTO userDTO) {
        if (userMapper.insert(userDTO) != 1) {
            throw new CommonException("error.user.insert");
        }
        return userDTO;
    }
}

```

### `TaskServiceImpl.java` 代码 
```java
package io.choerodon.todo.app.service.impl;

// 省略import

@Service
public class TaskServiceImpl implements TaskService {

    private TaskMapper taskMapper;

    public TaskServiceImpl(TaskMapper taskMapper) {
        this.taskMapper = taskMapper;
    }

    @Override
    public TaskDTO createOne(TaskDTO taskDTO) {
        if (taskMapper.insert(taskDTO) != 1) {
            throw new CommonException("error.task.insert");
        }
        return taskDTO;
    }

    @Override
    public TaskDTO queryById(Long id) {
        return taskMapper.selectByPrimaryKey(id);
    }

    @Override
    public TaskDTO queryByTaskNumber(String taskNumber) {
        return taskMapper.queryByTaskNumber(taskNumber);
    }

    @Override
    public TaskDTO update(TaskDTO taskDTO) {
        if (taskMapper.updateByPrimaryKeySelective(taskDTO) != 1) {
            throw new CommonException("error.task.update");
        }
        return queryById(taskDTO.getId());
    }

    @Override
    public void deleteById(Long id) {
        taskMapper.deleteByPrimaryKey(id);
    }
}

```