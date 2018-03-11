+++
title = "服务调度（可选）"
date = "2017-11-07"
draft = false
weight = 12
+++

# 服务调度

若开发者在实际开发过程中有如下需求，则需要阅读本节

    某种周期性（如每天某一时刻）的服务调用 
    指定时间后进行服务调用

## 准备

为了能够为开发者的服务提供一个定时调度的功能，请确保`hap-scheduler-service`服务处于启动状态

## 使用

因为调度服务只负责时间的轮询，故而任务的建立与执行依靠http请求。

任务发起方需向调度平台发起如下请求:

host: `hap-scheduler-service`
url: `/v1/job`
method: `POST`

```json
{
  "accessToken": "string",  // 请求所用的token，若不设置，则将发起申请请求时HEAD所携带的token作为执行请求时的token
  "triggerType": "string", // 所需要的触发器类型，必须设置，有SIMPLE与CRON两种
  "startTime": "string", // 任务开始时间，若不设置则请求成功立刻开始,单位毫秒
  "endTime": "string", // 结束时间，可不设置，单位毫秒
  "id": 0, // id不设置
  "jobDescription": "string", // 任务描述，必须设置
  "jobGroup": "string", // 任务所在组，推荐设置为发起请求的服务名，若不设置则为default
  "priority": 0, // 优先级，默认为5
  "repeatCount": 0, // 当TriggerType为SIMPLE时可设置，任务重复执行次数，不设置则不重复执行，即只执行一次
  "repeatInterval": 0, // 当TriggerType为SIMPLE时可设置，任务重复时间间隔，不设置则间隔时间设置为1s，单位毫秒
  "cronExpression": "string", // 周期定时任务表达式,当triggerType为CRON时必须设置
  "requestBody": "string", // 当需要请求报文实体时可设置
  "requestMethod": "string", // 请求的http方法，必须设置
  "requestService": "string", // 所要请求的服务，必须设置
  "requestUrl": "string", // 所请求api的url，必须设置(如/v1/job)
  "triggerState": "string" // 触发器状态，无需设置，由服务内部处理
}
```

## 解释

### 触发器类型

- SimpleTrigger: 它可以触发一个已经安排进调度程序（任务执行计划）的任务，并可以指定时间间隔重复执行该任务。
    - 特点
        - 开始时间
        - 结束时间
        - 重复次数
        - 重复执行的时间间隔。
    - 重复的次数可以是零，一个正整数。总执行次数为重复次数+1，即重复0次将执行1次，若重复次数为-1则永远执行。 
    - 重复执行的时间间隔为long类型的数值表示毫秒。 
    - 结束时间的属性会重写重复的次数，如果你想创建一个触发器，如每10秒触发一次，直到一个给定的时刻，而不是要计算的次数，它会在开始时间和结束时间重复执行。结束时间一到，就算你指定了重复次数很多次(比如执行10W次)，但是时间一到它将不再执行。
- CronTrigger: 主要基于日历的概念，而不是对具体间隔的行为。
    - 特点: 采用cron表达式(若需要此功能请自行了解)

## 示例

1. 确保应用的启动类上具有`@EnableFeignClients`注解(声明该应用为feign客户端)，若有该注解时依然产生bean无法获取的异常，则为该注解制定basePackages
1. 为应用的依赖添加以下项
    ```xml
    <dependency>
        <groupId>com.hand.hap.cloud</groupId>
        <artifactId>hap-scheduler-helper</artifactId>
        <version>1.0.0-Release</version>
    </dependency>
    ```
1. 编写示例代码

    ```java
    package com.hand.hap.cloud.todo.demo.controller;

    import com.hand.hap.cloud.resource.exception.HapException;
    import com.hand.hap.cloud.scheduler.helper.SchedulerTemplate;
    import com.hand.hap.cloud.scheduler.helper.domain.JobInfo;
    import com.hand.hap.cloud.scheduler.helper.util.JobGenerator;
    import com.hand.hap.cloud.swagger.annotation.Permission;
    import com.hand.hap.cloud.todo.demo.domain.TodoTask;
    import com.hand.hap.cloud.todo.demo.service.TaskService;
    import io.swagger.annotations.ApiOperation;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.Date;

    @RestController
    @RequestMapping(value = "/v1/scheduler")
    public class SchedulerController {

        @Autowired
        private TaskService taskService;

        @Autowired
        private SchedulerTemplate schedulerTemplate;


        @Permission(permissionLogin = true)
        @ApiOperation(value = "测试调度功能")
        @RequestMapping(value = "/test", method = RequestMethod.POST)
        public ResponseEntity<Object> test() throws HapException {
            TodoTask task = new TodoTask();
            task.setTaskNumber(String.valueOf(Math.random()));
            task = taskService.create(task);
            JobInfo jobInfo = JobGenerator.generateSimpleJob();
            jobInfo.setRequestService("hap-todo-service");
            jobInfo.setRequestUrl("/v1/todoTask/" + task.getId());
            jobInfo.setRequestMethod(RequestMethod.DELETE.name());
            jobInfo.setJobDescription("测试删除待办事项" + task.getId());
            jobInfo.setStartTime(new Date(System.currentTimeMillis()+10000));
            schedulerTemplate.createJob(jobInfo);
            return new ResponseEntity<Object>(task,HttpStatus.OK);
        }
    }
    ```

1. 访问接口进行测试，可以看到代办事项被新建，在10秒后被删除(可能因服务器压力导致时间误差)