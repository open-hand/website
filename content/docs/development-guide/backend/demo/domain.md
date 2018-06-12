+++
title = "编写domain-领域模型层"
date = "2018-04-27T11:40:28+08:00"
draft = false
weight = 6
+++

# 前置条件

在开发之前，请确保

* 本地项目已经创建成功，详见 [新建项目](../create_project/)
* 数据库创建成功，详见 [初始化数据库](../init_db/)

## 介绍

此`demo`需涉及到`demain`层的`entity`、`convertor`、多`entity`的`service`、`repository`接口类以及`infra`层的`repository`实现类

## 编写`entity`

* `entity` 类需提供属性及简单行为
* 创建在 项目模块 的 `xxx.domain.[模块名称]` 包下。如：`xxx.domain.todo`
* 每一个 `entity` 类对应一个 `DO` 类，所以命名为 `DO` 类名尾缀替换为 `E`。如：`TaskE` 对应 `DO` 为`TaskDO`。 

### 属性规范
    
* 所有属性均为`private`属性。
* 每一个属性需要生成对应的 `getter` 方法，不允许生成 `setter` 方法。
* 需添加`Long`类型属性 `objectVersionNumber` ，用以更新数据时的版本控制。

### `TaskE.java` 代码

```java
package io.choerodon.todo.domain.todo.entity;

public class TaskE {
    private Long id;
    private Long employeeId;
    private String state;
    private String taskNumber;
    private String taskDescription;
    private Long objectVersionNumber;

    public TaskE(Long id, Long employeeId, String state, String taskNumber, String taskDescription, Long objectVersionNumber) {
        this.id = id;
        this.employeeId = employeeId;
        this.state = state;
        this.taskNumber = taskNumber;
        this.taskDescription = taskDescription;
        this.objectVersionNumber = objectVersionNumber;
    }

    // 更新状态
    public void updateState(String state) {
        this.state = state;
    }

    // 省略get方法
}
```

### `UserE.java` 代码
``` java
package io.choerodon.todo.domain.todo.entity;

public class UserE {
    private Long id;
    private String employeeName;
    private String employeeNumber;
    private String email;
    private Long objectVersionNumber;

    public UserE(Long id, String employeeName, String employeeNumber, String email, Long objectVersionNumber) {
        this.id = id;
        this.employeeName = employeeName;
        this.employeeNumber = employeeNumber;
        this.email = email;
        this.objectVersionNumber = objectVersionNumber;
    }

    // 省略get方法
}
```

## 编写`Convertor` 类

* `convertor`用于`Entity`、`DO`、`DTO`三者之间的转换，需继承`ConvertorI<E, D, T>`接口，`E`、`D`、`T`对应具体的`Entity`、`DO`、`DTO`。
* 每一个 `convertor` 类对应一组`E`、`D`、`T`，所以命名为同组类名尾缀替换为 `Convertor`。如：`TaskConvertor`。
* 需要通过`@Component`纳入`spring`管理。
 
### 创建对应的`DTO` 类。

在`io.choerodon.todo.api.dto`包下创建`DTO`类。
``` java
// UserDTO
package io.choerodon.todo.api.dto;

public class UserDTO {
    private Long id;
    private String employeeName;
    private String employeeNumber;
    private String email;
    private Long objectVersionNumber;

    // 省略get和set方法
}
```

``` java
// TaskDTO
package io.choerodon.todo.api.dto;

public class TaskDTO {
    private Long id;
    private Long employeeId;
    private String state;
    private String taskNumber;
    private String taskDescription;
    private Long objectVersionNumber;

    // 省略get和set方法
}
```

### `UserConvertor.java` 代码

```java
package io.choerodon.todo.domain.todo.convertor;

// 省略 import
@Component
public class UserConvertor implements ConvertorI<UserE, UserDO, UserDTO> {
    @Override
    public UserE dtoToEntity(UserDTO dto) {
        return new UserE(
                dto.getId(),
                dto.getEmployeeName(),
                dto.getEmployeeNumber(),
                dto.getEmail(),
                dto.getObjectVersionNumber()
        );
    }

    @Override
    public UserDTO entityToDto(UserE entity) {
        UserDTO UserDTO = new UserDTO();
        BeanUtils.copyProperties(entity, UserDTO);
        return UserDTO;
    }

    @Override
    public UserE doToEntity(UserDO dataObject) {
        return new UserE(
                dataObject.getId(),
                dataObject.getEmployeeName(),
                dataObject.getEmployeeNumber(),
                dataObject.getEmail(),
                dataObject.getObjectVersionNumber()
        );
    }

    @Override
    public UserDO entityToDo(UserE entity) {
        UserDO UserDO = new UserDO();
        BeanUtils.copyProperties(entity, UserDO);
        return UserDO;
    }

    @Override
    public UserDTO doToDto(UserDO dataObject) {
        UserDTO UserDTO = new UserDTO();
        BeanUtils.copyProperties(dataObject, UserDTO);
        return UserDTO;
    }

    public UserDO dtoToDo(UserDTO dto) {
        UserDO UserDO = new UserDO();
        BeanUtils.copyProperties(dto, UserDO);
        return UserDO;
    }
}
```

### `TaskConvertor.java` 代码

```java
package io.choerodon.todo.domain.todo.convertor;

// 省略 import

@Component
public class TaskConvertor implements ConvertorI<TaskE, TaskDO, TaskDTO> {
    @Override
    public TaskE dtoToEntity(TaskDTO dto) {
        return new TaskE(
                dto.getId(),
                dto.getEmployeeId(),
                dto.getState(),
                dto.getTaskNumber(),
                dto.getTaskDescription(),
                dto.getObjectVersionNumber()
        );
    }

    @Override
    public TaskDTO entityToDto(TaskE entity) {
        TaskDTO taskDTO = new TaskDTO();
        BeanUtils.copyProperties(entity, taskDTO);
        return taskDTO;
    }

    @Override
    public TaskE doToEntity(TaskDO dataObject) {
        return new TaskE(
                dataObject.getId(),
                dataObject.getEmployeeId(),
                dataObject.getState(),
                dataObject.getTaskNumber(),
                dataObject.getTaskDescription(),
                dataObject.getObjectVersionNumber()
        );
    }

    @Override
    public TaskDO entityToDo(TaskE entity) {
        TaskDO taskDO = new TaskDO();
        BeanUtils.copyProperties(entity, taskDO);
        return taskDO;
    }

    @Override
    public TaskDTO doToDto(TaskDO dataObject) {
        TaskDTO taskDTO = new TaskDTO();
        BeanUtils.copyProperties(dataObject, taskDTO);
        return taskDTO;
    }

    public TaskDO dtoToDo(TaskDTO dto) {
        TaskDO taskDO = new TaskDO();
        BeanUtils.copyProperties(dto, taskDO);
        return taskDO;
    }
}
```

## 编写Repository

### `Repository` 接口类
* `Repository` 接口类定义了数据操作的一系列接口，并不提供实现，具体实现需要通过 `Repository`实现层提供。创建在项目模块的 `xxx.domain.repository` 包下。
* 每一个 `Repository` 对应一个 `entity` ，所以命名为 `entity` 类名尾缀替换为 `Repository`。如：`TaskRepository` 对应 `TaskE` 。

### `UserRepository.java` 代码
```java
package io.choerodon.todo.domain.repository;

import io.choerodon.todo.domain.todo.entity.UserE;

public interface UserRepository {
    UserE create(UserE userE);
}
```

### `TaskRepository.java` 代码
```java
package io.choerodon.todo.domain.repository;

import io.choerodon.todo.domain.todo.entity.TaskE;

public interface TaskRepository {
    TaskE create(TaskE taskE);

    void deleteById(Long id);

    void deleteByTaskNumber(String taskNumber);

    TaskE update(TaskE taskE);

    TaskE queryById(Long id);
}
```

### `Repository` 实现类

* `Repository` 接口的集体实现。创建在项目模块的 `xxx.infra.repository.impl` 包下。
* 每一个 `Repository` 实现类对应一个 `Repository` 接口类，所以命名为 `Repository 接口类名 + Impl`。如：`TaskRepositoryImpl` 对应 `TaskRepository` 。
* 需要通过`@Component`纳入`spring`管理。

### `UserRepositoryImpl.java` 代码
```java
package io.choerodon.todo.infra.repository.impl;

// 省略 import

@Component
public class UserRepositoryImpl implements UserRepository {
    private UserMapper userMapper;
    private UserConvertor userConvertor;

    public UserRepositoryImpl(UserMapper userMapper, UserConvertor userConvertor) {
        this.userMapper = userMapper;
        this.userConvertor = userConvertor;
    }

    @Override
    public UserE create(UserE userE) {
        UserDO userDO = userConvertor.entityToDo(userE);
        List<UserDO> userDOList = userMapper.select(userDO);
        if (!userDOList.isEmpty()) {
            throw new CommonException("error.repo.create.user.exist");
        }
        if (userMapper.insertSelective(userDO) != 1) {
            throw new CommonException("error.repo.create.user.failed");
        }
        return userConvertor.doToEntity(userMapper.selectByPrimaryKey(userDO.getId()));
    }
}
```

### `TaskRepositoryImpl.java` 代码
``` java
package io.choerodon.todo.infra.repository.impl;

// 省略 import

@Component
public class TaskRepositoryImpl implements TaskRepository {
    private TaskMapper taskMapper;

    private TaskConvertor taskConvertor;

    public TaskRepositoryImpl(TaskMapper taskMapper, TaskConvertor taskConvertor) {
        this.taskMapper = taskMapper;
        this.taskConvertor = taskConvertor;
    }

    @Override
    public TaskE create(TaskE taskE) {
        TaskDO taskDO = taskConvertor.entityToDo(taskE);
        List<TaskDO> taskDOList = taskMapper.select(taskDO);
        if (!taskDOList.isEmpty()) {
            throw new CommonException("error.repo.create.task.exist");
        }
        if (taskMapper.insertSelective(taskDO) != 1) {
            throw new CommonException("error.repo.create.task.failed");
        }
        return new TaskConvertor().doToEntity(taskMapper.selectByPrimaryKey(taskDO.getId()));
    }

    @Override
    public TaskE queryById(Long id) {
        return taskConvertor.doToEntity(taskMapper.selectByPrimaryKey(id));
    }

    @Override
    public void deleteById(Long id) {
        if (taskMapper.selectByPrimaryKey(id) == null) {
            throw new CommonException("error.task.not.exist");
        }
        if (taskMapper.deleteByPrimaryKey(id) != 1) {
            throw new CommonException("error.task.delete");
        }
    }

    @Override
    public void deleteByTaskNumber(String taskNumber) {
        TaskDO taskDO = taskMapper.queryByTaskNumber(taskNumber);
        if (taskDO == null) {
            throw new CommonException("error.task.not.exist");
        }
        if (taskMapper.deleteByPrimaryKey(taskDO.getId()) != 1) {
            throw new CommonException("error.task.delete");
        }
    }

    @Override
    public TaskE update(TaskE taskE) {
        TaskDO taskDO = taskConvertor.entityToDo(taskE);
        if (taskMapper.updateByPrimaryKeySelective(taskDO) != 1) {
            throw new CommonException("error.task.update");
        }
        return taskConvertor.doToEntity(taskMapper.selectByPrimaryKey(taskDO.getId()));
    }
}

```

## 编写Service
### `Domain Service` 接口类

* 领域层的`Service` 是业务软件的核心，是反应多个领域模型的业务情况的具体实现，是领域模型对外提供的实际服务。
* `Service` 接口类定义了业务操作的一系列接口，并不提供实现，具体实现需要通过服务实现层提供，所以属于供应方的服务接口层。创建在项目模块 的 `xxx.domain.service` 包下。
* 每一个 `Service` 对应多个 `entity` 类，因需要与`app`层`service`区分，所以规定命名为 `I + 涉及主要entity类名 + Service`。如：`ITaskService`。

### Service 实现类

* `Service` 接口的具体实现通过服务实现层提供，所以属于供应方的服务实现层。创建在项目模块的 `xxx.domian.service.impl` 包下。
* 实现类，如无特殊情况，需要用 `@Service` 标注，以自动扫描注册