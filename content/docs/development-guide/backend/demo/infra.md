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

此`demo`需涉及到`infra`层的 `dataobject` 类以及 `mapper` 类。

## 编写`dataobject`类

* `DO` 类不需要提供任何实现，所以属于供应方的服务接口层。创建在项目模块的 `xxx.infra.dataobject` 包下。
* 每一个`DO` 类即为一个实体类，对应数据库中的一个具体表。
* 名称=`表具体名称+DO`，表名中 `_` 替换为驼峰命名法，首字母大写。如：`TaskDO` 对应表为`todo_task`。

### 指定对应表

* `@Table(name = "table_name")` 指定 DO 对应数据库中表的名称。
* 每一个 `DO` 对应数据库中的一个具体表，一般都需要继承 `AuditDomain` 类。

### 属性规范
    
* 所有属性均为`private`属性。
* 每一个属性需要生成对应的 `getter` 和 `setter` 方法。
* 字段名称应根据驼峰命名规则从数据库列名转换过来。例如：数据库列名为 `USER_NAME` ，则字段名为 `UserName`，特殊字段名称，可以在字段在添加 `@Column(name = "xxx")`注解，指定数据库列名。

### 属性的的类型与字段的 `type` 对应

* 不使用基本类型，全部使用基本类型的包装类，如 `Long` 对应数据库中的 `INTEGER`，而不是使用 `long`。
* 数字类型主键统一采用 `Long`。
* 金额、数量 等精度严格浮点类型采用 `BigDecimal`

> 注意：BigDecimal 在计算、比较方面的特殊性

### 所有的主键字段都需要用`@Id`标注

*　对于自增张、序列（SEQUENCE）类型的主键，需要添加注解`@GeneratedValue`。
*　序列命名规范：`表名_S`。例如：表`SYS_USER`对应的序列为 `SYS_USER_S`。

### 非数据库字段

* 需要用` @Transient`标注 `javax.persistence.Transient`

### `UserDO.java` 代码
```java
package io.choerodon.todo.infra.dataobject;

// 省略 import

@ModifyAudit //在类上使用，启用审计字段支持，实体类加上该注解后，插入和更新会启动对creationDate、createdBy、lastUpdateDate、lastUpdatedBy自维护字段支持
@VersionAudit //在类上使用，启用objectVersionNumber自维护支持，插入一条数据objectVersionNumber默认为1，每次update后objectVersionNumber自增1
@Table(name = "todo_user")
public class UserDO extends AuditDomain { //AuditDomain包含5个自维护字段，使用@ModifyAudit和@VersionAudit的实体类要继承该类
    @Id
    @GeneratedValue //对于自增张、序列（SEQUENCE）类型的主键，需要添加该注解
    private Long id;
    private String employeeName;
    private String employeeNumber;
    private String email;

    // 省略get和set方法
}

```

### `TaskDO.java` 代码
```java
package io.choerodon.todo.infra.dataobject;

// 省略 import

@ModifyAudit
@VersionAudit
@Table(name = "todo_task")
public class TaskDO extends AuditDomain { 
    @Id
    @GeneratedValue
    private Long id;
    private Long employeeId;
    private String state;
    private String taskNumber;
    private String taskDescription;

    // 省略get和set方法
}
```

## Mapper
### `mapper`接口类

* `mapper` 接口类即为传统意义上的 `DAO`，但与 `interface` 不同，`mapper` 本身就是对数据访问的具体实现，所以属于供应方的服务实现层。创建在 项目模块 的 `xxx.infra.mapper` 包下。
*  每一个 `mapper` 接口类封装了对数据库表的操作，每一个 `mapper` 对应一个 `DO` 类，所以命名为 `DO` 类名尾缀替换为 `Mapper` 。如：`TaskMapper` 对应`DO`为 `TaskDO` 类。
* 基础的 `CRUD` 操作不需要再次实现，通过继承 `BaseMapper<T>` 类实现。其中 `T` 为 对应 `DO` 的泛型。
* 复杂的数据库操作需要定义具体的接口方法。

### `mapper.xml`

* `Mapper`的`xml`文件 是数据库的的具体映射，与 `Mapper` 接口同级，创建在 项目模块 `resources` 目录的 `xxx.mapper` 包下。
* `Mapper`的`xml`文件，与 `Mapper` 接口对应。所以命名 `Mapper` 接口类相同。
* `Mapper`的`xml`文件非必须，由于继承BaseMapper类后基本的 `CRUD` 不需要进行配置，所以只有`CRUD`操作时不需要创建对应的 `xml` 文件。
* 对于自定义的数据库方法，需要创建对应的 `mapper.xml` 文件。
* `Mapper`的`xml` 中的操作 `id` 对应 `Mapper` 接口类的方法名。

### `UserMapper.java` 代码
``` java
package io.choerodon.todo.infra.mapper;

// 省略 import

public interface UserMapper extends BaseMapper<UserDO> {
}
```

### `TaskMapper.java` 代码
``` java
package io.choerodon.todo.infra.mapper;

// 省略 import

public interface TaskMapper extends BaseMapper<TaskDO> {
    TaskDO queryByTaskNumber(@Param("taskNumber") String taskNumber);
}

```
### `UserMapper.xml` 文件
``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="io.choerodon.todo.infra.mapper.UserMapper">

</mapper>
```

### `TaskMapper.xml` 文件
``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="io.choerodon.todo.infra.mapper.TaskMapper">

    <select id="queryByTaskNumber" resultType="io.choerodon.todo.infra.dataobject.TaskDO">
        SELECT * FROM todo_task 
        WHERE
        task_number=#{taskNumber} limit 1
    </select>
</mapper>
```