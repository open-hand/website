+++
title = "编写infra-基础设施层"
date = "2018-04-27T11:01:28+08:00"
draft = false
weight = 5
+++

# 前置条件

在开发之前，请确保

* 本地项目已经创建成功，详见 [新建项目](../create_project/)
* 数据库创建成功，详见 [初始化数据库](../init_db/)

## 介绍

此`demo`需涉及到`infra`层的 `Mapper` 类以及与数据库对应的`DTO`类。

## 编写与数据库表对应的`DTO`类
* `DTO` 类用来封装用户请求的数据信息，这里指的用户可以是另一个计算机系统，不一定是使用用户界面的人。
* `infra`层的`DTO`类同时也是与数据库表一一对应的实体类，创建在项目模块的 `xxx.infra.dto` 包下。
* 名称=`表具体名称+DTO`，表名中 `_` 替换为驼峰命名法，首字母大写。如：`TaskDTO` 对应表为`todo_task`。

### 指定对应表
* `@Table(name = "table_name")` 指定 DTO 对应数据库中表的名称。
* 每一个infra层的 `DTO` 对应数据库中的一个具体表，一般都需要继承 `BaseDTO` 类。

### 属性规范
    
* 所有属性均为`private`属性。
* 每一个属性需要生成对应的 `getter` 和 `setter` 方法。
* 字段名称应根据驼峰命名规则从数据库列名转换过来。例如：数据库列名为 `USER_NAME` ，则字段名为 `userName`，特殊字段名称，可以在字段在添加 `@Column(name = "xxx")`注解，指定数据库列名。

### 属性的的类型与字段的 `type` 对应

* 不使用基本类型，全部使用基本类型的包装类，如 `Long` 对应数据库中的 `INTEGER`，而不是使用 `long`。
* 数字类型主键统一采用 `Long`。
* 金额、数量 等精度严格浮点类型采用 `BigDecimal`

> 注意：BigDecimal 在计算、比较方面的特殊性

### 所有的主键字段都需要用`@Id`标注

* 对于自增长、序列（SEQUENCE）类型的主键，需要添加注解`@GeneratedValue(strategy = GenerationType.IDENTITY)`。
* 序列命名规范：`表名_S`。例如：表`SYS_USER`对应的序列为 `SYS_USER_S`。

### 非数据库字段

* 需要用`@Transient`标注 `javax.persistence.Transient`

### `UserDTO.java` 代码
```java
package io.choerodon.todo.infra.dto;

// 省略 import

@Table(name = "todo_user")
public class UserDTO extends BaseDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //对于自增张、序列（SEQUENCE）类型的主键，需要添加该注解
    private Long id;
    private String employeeName;
    private String employeeNumber;
    private String email;
    
    // 省略get和set方法
    
}
```

### `TaskDTO.java` 代码
```java
package io.choerodon.todo.infra.dto;

// 省略 import

@Table(name = "todo_task")
public class TaskDTO extends BaseDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long employeeId;
    private String state;
    private String taskNumber;
    private String taskDescription;
    
    // 省略get和set方法

}
```

## 编写Mapper
### `Mapper`接口类

* `mapper` 接口类即为传统意义上的 `DAO`，但与 `interface` 不同，`mapper` 本身就是对数据访问的具体实现，所以属于供应方的服务实现层。创建在 项目模块 的 `xxx.infra.mapper` 包下。
*  每一个 `mapper` 接口类封装了对数据库表的操作，每一个 `mapper` 对应一个infra层的 `DTO` 类，所以命名为infra层的 `DTO` 类名尾缀替换为 `Mapper` 。如：`TaskMapper` 对应`DTO`为 `TaskDTO` 类。
* 基础的 `CRUD` 操作不需要再次实现，通过继承 `Mapper<T>` 类实现。其中 `T` 为 对应的infra层的 `DTO` 的泛型。
* 复杂的数据库操作需要定义具体的接口方法。

### `Mapper.xml`

* `Mapper`的`xml`文件 是数据库的的具体映射，与 `Mapper` 接口同级，创建在 项目模块 `resources` 目录的 `xxx.mapper` 包下。
* `Mapper`的`xml`文件，与 `Mapper` 接口对应。所以命名与 `Mapper` 接口类相同。
* `Mapper`的`xml`文件非必须，由于继承Mapper类后基本的 `CRUD` 不需要进行配置，所以只有`CRUD`操作时不需要创建对应的 `xml` 文件。
* 对于自定义的数据库方法，需要创建对应的 `mapper.xml` 文件。
* `Mapper`的`xml` 中的操作 `id` 对应 `Mapper` 接口类的方法名。

### `UserMapper.java` 代码
``` java
package io.choerodon.todo.infra.mapper;

import io.choerodon.mybatis.common.Mapper;
import io.choerodon.todo.infra.dto.UserDTO;

public interface UserMapper extends Mapper<UserDTO> {
}
```

### `TaskMapper.java` 代码
``` java
package io.choerodon.todo.infra.mapper;

// 省略 import

public interface TaskMapper extends Mapper<TaskDTO> {
    TaskDTO queryByTaskNumber(@Param("taskNumber") String taskNumber);
}
```

### `TaskMapper.xml` 文件
``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="io.choerodon.todo.infra.mapper.TaskMapper">
    <select id="queryByTaskNumber" resultType="io.choerodon.todo.infra.dto.TaskDTO">
        SELECT 
        *
        FROM 
        todo_task
        WHERE
        task_number=#{taskNumber} limit 1
    </select>
</mapper>
```