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

此demo需涉及到demain层的entity、convertor、多entity的service、repository接口类以及infra层的repository实现类

## 编写entity

- entity 类需提供属性及简单行为
- 创建在 项目模块 的 xxx.domain.[模块名称] 包下。如：xxx.domain.todo
- 每一个 entity 类对应一个 DO 类，所以命名为 DO 类名尾缀替换为 E。如：TaskE 对应 DO 为TaskDO。 

### 属性规范
    
1. 所有属性均为private属性。
2. 每一个属性需要生成对应的 getter 方法，不允许生成 setter 方法。
3. 需添加Long类型属性 objectVersionNumber ，用以更新数据时的版本控制。

### entity代码（以 TaskE 为例）

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

    public Long getId() {
        return id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public String getState() {
        return state;
    }

    public String getTaskNumber() {
        return taskNumber;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public Long getObjectVersionNumber() {
        return objectVersionNumber;
    }

    public TaskE updateState(TaskE taskE,String state){
        return new TaskE(taskE.getId(),taskE.getEmployeeId(),state,taskE.getTaskNumber(),taskE.getTaskDescription(),taskE.getObjectVersionNumber());
    }
}

```

## 编写convertor

- convertor用于Entity、DO、DTO三者之间的转换，需继承ConvertorI<E, D, T>接口，E、D、T对应具体的Entity、DO、DTO
- 每一个 convertor 类对应一组E、D、T，所以命名为同组类名尾缀替换为 Convertor。如：TaskConvertor。
- 需要通过@Component纳入spring管理
 
### 重写方法
- 重写doToEntity、entityToDo两个方法

### convertor代码（以TaskConvertor为例）

```java
package io.choerodon.todo.domain.todo.convertor;


import io.choerodon.core.convertor.ConvertorI;
import io.choerodon.todo.infra.dataobject.TaskDO;
import io.choerodon.todo.domain.todo.entity.TaskE;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class TaskConvertor implements ConvertorI<TaskE,TaskDO,Object> {
    @Override
    public TaskE doToEntity(TaskDO dataObject) {
        return new TaskE(dataObject.getId(),dataObject.getEmployeeId(),dataObject.getState(),dataObject.getTaskNumber(),
                dataObject.getTaskDescription(),dataObject.getObjectVersionNumber());
    }

    @Override
    public TaskDO entityToDo(TaskE entity) {
        TaskDO taskDO = new TaskDO();
        BeanUtils.copyProperties(entity, taskDO);
        return taskDO;
    }
}
```
## 编写Repository

### Repository 接口类
- Repository 接口类定义了数据操作的一系列接口，并不提供实现，具体实现需要通过Repository实现层提供。创建在项目模块的 xxx.domain.repository 包下。
- 每一个 Repository 对应一个 entity ，所以命名为 entity 类名尾缀替换为 Repository。如：TaskRepository 对应 TaskE 。

#### Repository 接口类代码（以TaskRepository为例）

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

### Repository 实现类
- Repository 接口的集体实现。创建在项目模块的 xxx.infra.repository.impl 包下。
- 每一个 Repository 实现类对应一个 Repository 接口类，所以命名为 Repository 接口类名 + Impl。如：TaskRepositoryImpl 对应 TaskRepository 。
- 需要通过@Component纳入spring管理


#### Repository 实现类代码（以TaskRepositoryImpl为例）
```java
package io.choerodon.todo.infra.repository.impl;

import io.choerodon.core.exception.CommonException;
import io.choerodon.todo.domain.repository.TaskRepository;
import io.choerodon.todo.domain.todo.convertor.TaskConvertor;
import io.choerodon.todo.domain.todo.entity.TaskE;
import io.choerodon.todo.infra.dataobject.TaskDO;
import io.choerodon.todo.infra.mapper.TaskMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TaskRepositoryImpl implements TaskRepository {
    private TaskMapper taskMapper;

    public TaskRepositoryImpl(TaskMapper taskMapper) {
        this.taskMapper = taskMapper;
    }

    @Override
    public TaskE create(TaskE taskE) {
        TaskDO taskDO = new TaskConvertor().entityToDo(taskE);
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
        return new TaskConvertor().doToEntity(taskMapper.selectByPrimaryKey(id));
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
        if (taskMapper.queryByTaskNumber(taskNumber) == null) {
            throw new CommonException("error.task.not.exist");
        }
        if (taskMapper.deleteByPrimaryKey(taskMapper.queryByTaskNumber(taskNumber).getId()) != 1) {
            throw new CommonException("error.task.delete");
        }
    }

    @Override
    public TaskE update(TaskE taskE) {
        TaskDO taskDO = new TaskConvertor().entityToDo(taskE);
        if (taskMapper.updateByPrimaryKeySelective(taskDO) != 1) {
            throw new CommonException("error.task.update");
        }
        return new TaskConvertor().doToEntity(
                taskMapper.selectByPrimaryKey(taskDO.getId()));
    }
}

```

## 编写Service
### Service 接口类

- Service 接口类定义了业务操作的一系列接口，并不提供实现，具体实现需要通过服务实现层提供，所以属于供应方的服务接口层。创建在 项目模块 的 xxx.domain.service 包下。
- 每一个 Service 对应一个或多个 entity 类，因需要与app层service区分，所以规定命名为 I + 涉及主要entity类名 + Service。如：ITaskService。
#### 代码（以 ITaskService 为例）

```java
package io.choerodon.todo.domain.service;

import io.choerodon.todo.domain.todo.entity.TaskE;

public interface ITaskService {

    TaskE updateTaskStateById(Long id);
}

```

### Service 实现类

- Service 接口的具体实现通过服务实现层提供，所以属于供应方的服务实现层。创建在 项目模块 的 xxx.domian.service.impl 包下。
- 实现类，如无特殊情况，需要用 @Service 标注，以自动扫描注册

### 代码(以 ITaskServiceImpl 为例)
```java
package io.choerodon.todo.domain.service.impl;


import io.choerodon.todo.domain.repository.SwimlaneRepository;
import io.choerodon.todo.domain.repository.TaskRepository;
import io.choerodon.todo.domain.service.ITaskService;
import io.choerodon.todo.domain.todo.entity.SwimlaneE;
import io.choerodon.todo.domain.todo.entity.TaskE;
import org.springframework.stereotype.Service;

@Service
public class ITaskServiceImpl implements ITaskService {
    private TaskRepository taskRepository;
    private SwimlaneRepository swimlaneRepository;

    public ITaskServiceImpl(TaskRepository taskRepository, SwimlaneRepository swimlaneRepository) {
        this.taskRepository = taskRepository;
        this.swimlaneRepository = swimlaneRepository;
    }

    @Override
    public TaskE updateTaskStateById(Long id) {
        TaskE taskE = taskRepository.queryById(id);
        SwimlaneE swimlaneE = swimlaneRepository.selectByState(taskE.getState());
        return taskRepository.update(taskE.updateState(taskE, swimlaneE.getNextState()));
    }
}

```