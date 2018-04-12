+++
title = "编写Application类"
date = "2017-02-01"
draft = false
weight = 4
+++

# 编写Application类

## 编写TodoServiceApplication类
  
```java
package com.hand.hap.cloud.todo.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

/**
* Created by ziling.zhong on 2017/7/5.
*/

@EnableEurekaClient
@SpringBootApplication
public class TodoServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(TodoServiceApplication.class, args);
    }
}
```

## 结构图

![](../images/TodoServiceApplication.png)