+++
title = "编写实体类和Mapper类"
date = "2017-02-01"
draft = false
weight = 5
+++

# 编写实体类和Mapper类

## 实体类

### 创建domain类

1. domain 类不需要提供任何实现，所以属于供应方的服务接口层。创建在 项目模块 的 xxx..domain 包下。
2. 每一个 domain 类即为一个实体类，对应数据库中的一个具体表。
3. 名称与表名称相同，表名中 _ 替换为驼峰命名法，首字母大写。如：UserRole 对应表为 user_role。

### 指定对应表

1. @Table(name = “table_name”) 指定 domain 对应数据库中表的名称。
2. 每一个 domain 对应数据库中的一个具体表，一般都需要继承 AuditDomain 类。

### 属性规范
    
1. 所有属性均为private属性。
2. 每一个属性需要生成对应的 getter 和 setter 方法。
3. 字段名称应根据驼峰命名规则从数据库列名转换过来。例如：数据库列名为 USER_NAME ，则字段名为 UserName，特殊字段名称，可以在字段在添加 @Column(name = “xxx”) 注解，指定数据库列名。

### 非数据库字段

需要用 @Transient 标注 javax.persistence.Transient

### 属性的的类型与字段的 type 对应

1. 不使用基本类型，全部使用基本类型的包装类，如 Long 对应数据库中的 INTEGER，而不是使用 long
2. 数字类型主键统一采用 Long
3. 金额、数量 等精度严格浮点类型采用 BigDecimal

> 注意：BigDecimal 在计算、比较方面的特殊性

### 所有的主键字段都需要用@Id标注

1. 对于自增张、序列（SEQUENCE）类型的主键，需要添加注解@GeneratedValue
2. 序列命名规范：表名_S。例如：表 SYS_USER 对应的序列为 SYS_USER_S

## TodoTask.java 代码

```java
package com.hand.hap.cloud.todo.demo.domain;

import com.hand.hap.cloud.mybatis.annotation.ModifyAudit;
import com.hand.hap.cloud.mybatis.annotation.VersionAudit;
import com.hand.hap.cloud.mybatis.domain.AuditDomain;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
* Created by chang on 2017/5/27.
*/
@ModifyAudit
@VersionAudit
@Table(name = "todo_task")
public class TodoTask extends AuditDomain {
        @Id
        @GeneratedValue
        private Long id;

        @NotNull(message = "error.todoTask.employeeNotNull")
        private Long employeeId;

        @NotNull(message = "error.todoTask.taskNumberNotNull")
        private String taskNumber;

        private String taskDescription;

        @NotNull(message = "error.todoTask.stateNotNull")
        private String state;

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

        public String getState() {
            return state;
        }

        public void setState(String state) {
            this.state = state;
        }
}
```

## Mapper

![](./images/mapperStructure.png)

### mapper接口类

1. Mapper 接口类即为传统意义上的 DAO，但与 interface 不同，Mapper 本身就是对数据访问的具体实现，所以属于供应方的服务实现层。创建在 项目模块 的 xxx..mapper 包下。
2. 每一个 Mapper 接口类封装了对数据库表的操作，每一个 Mapper 对应一个 domian 类，所以命名为 domian 类名 + Mapper。如：UserRoleMapper 对应表为 UserRole 类。
3. 基础的 CRUD 操作不需要再次实现，通过继承 BaseMapper 类实现。其中 T 为 对应 domian 的泛型。
4. 复杂的数据库操作需要定义具体的接口方法。

### mapper.xml

1. Mapper.xml 是数据库的的具体映射，与 Mapper 接口同级，创建在 项目模块 resources 目录的 xxx..mapper 包下。
2. Mapper.xml，与 Mapper 接口对应。所以命名 Mapper 接口类相同。
3. 对于基本的 CRUD 不需要进行配置，所以也就不需要创建对应的 Mapper.xml 文件。
4. 对于自定义的数据库方法，需要创建对应的 Mapper.xml 文件。
5. Mapper.xml 中的操作 id 对应 Mapper 接口类的方法名。

### 以下为一个示例，不在本项目中使用:

```java
# mapper接口类定义sql接口，以及参数
public interface MenuMapper {
List<Menu> selectMenuByLevelAndOrganization(@Param("menuLevel") String menuLevel,
                                            @Param("organizationId") Long organizationId);
}
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.hand.hap.cloud.user.mapper.MenuMapper">

    <select id="selectMenuByLevelAndOrganization" resultType="com.hand.hap.cloud.user.domain.Menu">
        SELECT
            resource.id AS resource_id,
            resource.code AS resource_code,
            resource.name AS resource_name,
            resource.entry AS resource_entry,
            service.id AS service_id,
            service.code AS service_code,
            service.name AS service_name,
            product.id AS product_id,
            product.code AS product_code,
            product.name AS product_name
        FROM
            resource
        LEFT JOIN service ON resource.service_id = service.id
        LEFT JOIN product ON service.product_id = product.id
        WHERE
            resource.menu_level = #{menuLevel} AND service.id IN(
            SELECT
                service.id
            FROM
                service
            WHERE
                service.id NOT IN(
                SELECT
                    label.resource_id
                FROM
                    label
                WHERE
                    label.resource_type = 'service'
            )
        UNION
        SELECT
            s.resource_id
        FROM
            label s,
            label o
        WHERE
            s.label_key = o.label_key AND s.label_value = s.label_value AND s.resource_type = 'service' AND o.resource_type = 'organization' AND o.resource_id = #{organizationId}
        )
    </select>
</mapper>
```

### 以下为本项目中使用的mappper接口 TodoTaskMapper.java ，未定义额外的sql：

```java
package com.hand.hap.cloud.todo.demo.mapper;

import com.hand.hap.cloud.mybatis.common.BaseMapper;
import com.hand.todo.demo.domain.TodoTask;

/**
* Created by chang on 2017/5/30.
*/
public interface TodoTaskMapper extends BaseMapper<TodoTask> {
}
```