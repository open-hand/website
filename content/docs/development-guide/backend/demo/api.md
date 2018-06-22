+++
title = "编写api-展现层"
date = "2018-04-27T13:47:28+08:00"
draft = false
weight = 8
+++

# 前置条件

在开发之前，请确保

* 本地项目已经创建成功，详见 [新建项目](../create_project/)
* 数据库创建成功，详见 [初始化数据库](../init_db/)

## 介绍

此`demo`需涉及`api`层的 `dto` 以及 `controller` 。

## 编写`DTO`
* `DTO` 类用来封装用户请求的数据信息，这里指的用户可以是另一个计算机系统，不一定是使用用户界面的人。
* 创建在 项目模块 的 `xxx.api.dto` 包下。
* 根据需要补充 `domain` 层对应的 `convertor` 类。
* 具体参考[创建对应的DTO 类](../domain/#创建对应的-dto-类)

## 编写`Controller`

* `Controller` 负责对 `Model` 和 `View` 的处理，创建在项目模块的 `xxx.api.controller.v1` 包下。如 `xxx.api.controller.v1`。
* 每一个 `Controller` 是对一个具体的 `DTO` 资源进行处理的，所以命名为 `dto` 类名尾缀替换为 `Controler` 。如： `TaskController` 对应 `TaskDTO` 类。
* 需要通过 `@Controller` 指定该类为一个 `Controller` 类。

## `Controller` 类相关标签

* `@Permission` ，设置API访问权限，有四种属性
*    1. permissionLogin ：设置是否需要登陆访问
*    2. level ：设置访问资源层级，包括site，organization，project，user四种层级
*    3. roles ：设置可访问用户角色，此为数组
*    4. permissionPublic ：设置任意访问。
* `@ApiOperation` ，显示在swagger ui上的接口注释，同时与该接口对应的权限表中的描述字段对应(iam_permission.description)
* `@GetMapping` ，是一个组合注解，是`@RequestMapping(mathod = RequestMethod.GET) `的缩写,`@PostMapping`等同理。建议使用组合注解。
* `@CustomPageRequest` ，自定义swagger界面page、size、sort三个字段的格式。

### `UserController.java`代码

```java
package io.choerodon.todo.api.controller.v1;

// 省略 import

@RestController("/v1/users")
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping()
    @Permission(level = ResourceLevel.SITE)
    @ApiOperation(value = "创建todo 用户")
    private ResponseEntity<UserDTO> create(@RequestBody UserDTO userDTO) {
        return new ResponseEntity<>(userService.create(userDTO), HttpStatus.OK);
    }
}

```

### `TaskController.java`代码

```java
package io.choerodon.todo.api.controller.v1;

// 省略 import

@RestController("/v1/tasks")
public class TaskController {
    private TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping()
    @Permission(level = ResourceLevel.SITE)
    @ApiOperation(value = "创建task")
    public ResponseEntity<TaskDTO> create(@RequestBody TaskDTO taskDTO) {
        return new ResponseEntity<>(taskService.create(taskDTO), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Permission(level = ResourceLevel.SITE)
    @ApiOperation(value = "根据id删除task")
    public void delete(@PathVariable Long id) {
        taskService.deleteById(id);
    }

    @DeleteMapping("/taskNumber/{taskNumber}")
    @Permission(level = ResourceLevel.SITE)
    @ApiOperation(value = "根据TaskNumber删除task")
    public void deleteByTaskNumber(@PathVariable String taskNumber) {
        taskService.deleteByTaskNumber(taskNumber);
    }

    @PutMapping("/{id}")
    @Permission(level = ResourceLevel.SITE)
    @ApiOperation(value = "更新task")
    public ResponseEntity<TaskDTO> update(@PathVariable Long id, @RequestBody TaskDTO taskDTO) {
        taskDTO.setId(id);
        return new ResponseEntity<>(taskService.update(taskDTO), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Permission(level = ResourceLevel.SITE)
    @ApiOperation(value = "查询task")
    public ResponseEntity<TaskDTO> query(@PathVariable Long id) {
        return new ResponseEntity<>(taskService.queryById(id), HttpStatus.OK);
    }

}

```