+++
title = "编写api-展现层"
date = "2018-04-27T13:47:28+08:00"
draft = false
weight = 8
+++

# api层编写
- 此demo需涉及api层的 dto 以及 controller 。

## 编写DTO
- DTO 类用来封装用户请求的数据信息，这里指的用户可以是另一个计算机系统，不一定是使用用户界面的人。
- 创建在 项目模块 的 xxx.api.dto 包下。
- 根据需要补充 domain 层对应的 convertor 类。

### DTO代码（以taskDTO为例）
```java
package io.choerodon.todo.api.dto;

public class TaskDTO {
    private Long id;
    private Long employeeId;
    private String state;
    private String taskNumber;
    private String taskDescription;
    private Long objectVersionNumber;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getTaskNumber() {
        return taskNumber;
    }

    public void setTaskNumber(String taskNumber) {
        this.taskNumber = taskNumber;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public Long getObjectVersionNumber() {
        return objectVersionNumber;
    }

    public void setObjectVersionNumber(Long objectVersionNumber) {
        this.objectVersionNumber = objectVersionNumber;
    }
}

```


## 编写Controller

- Controller 负责对 Model 和 View 的处理，创建在 项目模块 的 xxx.api.controller.v_ 包下。如 xxx.api.controller.v1。
- 每一个 Controller 是对一个具体的 DTO 资源进行处理的，所以命名为 dto 类名尾缀替换为 Controler 。如： TaskController 对应 TaskDTO 类。
- 需要通过 @Controller 指定该类为一个 Controller 类。

## Controller 类相关标签

- ```@Permission``` ，设置API访问权限，有四种属性
     1. permissionLogin ：设置是否需要登陆访问
     2. level ：设置访问资源层级，包括site,organization,project，user四种层级
     3. roles ：设置可访问用户角色，此为数组
     4. permissionPublic ：设置任意访问。
- ```@ApiOperation``` ，显示在swagger ui上的接口注释，同时与该接口对应的权限表中的描述字段对应(iam_permission.description)
- ```@GetMapping``` ，是一个组合注解，是``` @RequestMapping(mathod = RequestMethod.GET) ```的缩写,```@PostMapping```等同理。建议使用组合注解。
- ```@CustomPageRequest``` ，用于分页。

## Controller代码（以TaskController为例）

- Controller中的path以v1开头，需在bootstrap.yml中配置 ignored: /v2/api-docs。
- Controller中的path不以v1开头，比如以app开头，则需配置 
```
@Value("${choerodon.resource.pattern:/app/*}")
private String pattern
```

```java
package io.choerodon.todo.api.controller.v1;

import io.choerodon.core.exception.CommonException;
import io.choerodon.todo.api.dto.TaskDTO;
import io.choerodon.todo.app.service.TaskService;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping(value = "/v1/task")
public class TaskController {
    private TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @ApiOperation(value = "创建任务")
    @PostMapping(value = "/create")
    public ResponseEntity<TaskDTO> create(@RequestBody @Valid TaskDTO task) throws CommonException {
        return Optional.ofNullable(taskService.create(task))
                .map(result -> new ResponseEntity<>(result, HttpStatus.OK))
                .orElseThrow(() -> new CommonException("error.Task.create"));
    }

    @ApiOperation(value = "根据任务Id获取任务")
    @GetMapping(value = "/findTaskById/{id}")
    public ResponseEntity<TaskDTO> findByNumber(@PathVariable @Valid Long id) throws CommonException {
        return Optional.ofNullable(taskService.queryById(id))
                .map(result -> new ResponseEntity<>(result, HttpStatus.OK))
                .orElseThrow(() -> new CommonException("error.Task.notFound"));
    }

    /**
     * 根据任务ID更新任务信息
     * <p>
     * 注意：更新task时需在json数据中添加objectVersionNumber属性及值才能更新成功。
     *
     * @param id   任务ID
     * @param task 任务信息
     * @return 更新后的任务信息
     * @throws CommonException 更新失败
     */
    @ApiOperation(value = "根据任务ID更新任务状态")
    @PutMapping(value = "/update/{id}")
    public ResponseEntity<TaskDTO> updateUser(@PathVariable Long id) throws CommonException {
        return Optional.ofNullable(taskService.updateStateById(id))
                .map(result -> new ResponseEntity<>(result, HttpStatus.OK))
                .orElseThrow(() -> new CommonException("error.Task.update"));
    }

    @ApiOperation(value = "根据任务ID删除任务")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<TaskDTO> deleteByEmployeeId(@PathVariable Long id) throws CommonException {
        taskService.deleteById(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }


    @ApiOperation(value = "根据任务编号删除任务")
    @DeleteMapping(value = "/taskNumber/{taskNumber}")
    public ResponseEntity<TaskDTO> deleteByTaskNumber(@PathVariable String taskNumber) throws CommonException {
        taskService.deleteByTaskNumber(taskNumber);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}

```