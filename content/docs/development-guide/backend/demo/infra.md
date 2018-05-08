+++
title = "编写infra-基础设施层"
date = "2018-04-27T11:01:28+08:00"
draft = false
weight = 5
+++

# infra层编写
- 此demo需涉及到infra层的 dataobject 类以及 mapper 类。
- 关于此章节具体工具包介绍见[Mybatis mapper工具包](http://c7n.saas.hand-china.com/docs/framework/library/choerodon-starter-mybatis-mapper/)

## 编写dataobject类
- DO 类不需要提供任何实现，所以属于供应方的服务接口层。创建在 项目模块 的 xxx.infra.dataobject 包下。
- 每一个 DO 类即为一个实体类，对应数据库中的一个具体表。
- 名称=表具体名称+DO，表名中 _ 替换为驼峰命名法，首字母大写。如：TaskDO 对应表为 todo_task。

### 指定对应表

1. @Table(name = “table_name”) 指定 DO 对应数据库中表的名称。
2. 每一个 DO 对应数据库中的一个具体表，一般都需要继承 AuditDomain 类。

### 属性规范
    
1. 所有属性均为private属性。
2. 每一个属性需要生成对应的 getter 和 setter 方法。
3. 字段名称应根据驼峰命名规则从数据库列名转换过来。例如：数据库列名为 USER_NAME ，则字段名为 UserName，特殊字段名称，可以在字段在添加 @Column(name = “xxx”) 注解，指定数据库列名。

### 属性的的类型与字段的 type 对应

1. 不使用基本类型，全部使用基本类型的包装类，如 Long 对应数据库中的 INTEGER，而不是使用 long
2. 数字类型主键统一采用 Long
3. 金额、数量 等精度严格浮点类型采用 BigDecimal

> 注意：BigDecimal 在计算、比较方面的特殊性

### 所有的主键字段都需要用@Id标注

1. 对于自增张、序列（SEQUENCE）类型的主键，需要添加注解@GeneratedValue
2. 序列命名规范：表名_S。例如：表 SYS_USER 对应的序列为 SYS_USER_S

### 非数据库字段

1. 需要用 @Transient 标注 javax.persistence.Transient

## TaskDO.java 代码

```java
package io.choerodon.todo.infra.dataobject;

import io.choerodon.mybatis.annotation.ModifyAudit;
import io.choerodon.mybatis.annotation.VersionAudit;
import io.choerodon.mybatis.domain.AuditDomain;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@ModifyAudit //在类上使用，启用审计字段支持，实体类加上该注解后，插入和更新会启动对creationDate、createdBy、lastUpdateDate、lastUpdatedBy自维护字段支持
@VersionAudit //在类上使用，启用objectVersionNumber自维护支持，插入一条数据objectVersionNumber默认为1，每次update后objectVersionNumber自增1
@Table(name = "todo_task")
public class TaskDO extends AuditDomain { //AuditDomain包含5个自维护字段，使用@ModifyAudit和@VersionAudit的实体类要继承该类
    @Id
    @GeneratedValue //对于自增张、序列（SEQUENCE）类型的主键，需要添加该注解
    private Long id;
    private Long employeeId;
    private String state;
    private String taskNumber;
    private String taskDescription;

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
}
```

## Mapper
### mapper接口类

1. Mapper 接口类即为传统意义上的 DAO，但与 interface 不同，Mapper 本身就是对数据访问的具体实现，所以属于供应方的服务实现层。创建在 项目模块 的 xxx.infra.mapper 包下。
02. 每一个 Mapper 接口类封装了对数据库表的操作，每一个 Mapper 对应一个 DO 类，所以命名为 DO 类名尾缀替换为 Mapper 。如：TaskMapper 对应DO为 TaskDO 类。
3. 基础的 CRUD 操作不需要再次实现，通过继承 BaseMapper 类实现。其中 T 为 对应 DO 的泛型。
4. 复杂的数据库操作需要定义具体的接口方法。

### mapper.xml

1. Mapper的xml文件 是数据库的的具体映射，与 Mapper 接口同级，创建在 项目模块 ```resources``` 目录的 xxx..mapper 包下。
2. Mapper的xml文件，与 Mapper 接口对应。所以命名 Mapper 接口类相同。
3. Mapper的xml文件非必须，由于继承BaseMapper类后基本的 CRUD 不需要进行配置，所以只有CRUD操作时不需要创建对应的 xml 文件。
4. 对于自定义的数据库方法，需要创建对应的 Mapper.xml 文件。
5. Mapper的xml 中的操作 id 对应 Mapper 接口类的方法名。

### 以下为一个示例，不在本项目中使用:
```java
package io.choerodon.iam.infra.mapper;

import java.util.List;

import io.choerodon.iam.infra.dataobject.MenuDO;
import io.choerodon.mybatis.common.BaseMapper;

public interface MenuMapper extends BaseMapper<MenuDO> {
    List<MenuDO> queryIncludeTl();

    List<MenuDO> queryMenusWithPermissions();
}

```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="io.choerodon.iam.infra.mapper.MenuMapper">
    <resultMap id="menusWithPermissions" type="io.choerodon.iam.infra.dataobject.MenuDO">
        <id column="id" property="id"></id>
        <result column="code" property="code" jdbcType="VARCHAR"/>
        <result column="name" property="name" jdbcType="VARCHAR"/>
        <result column="level" property="level" jdbcType="VARCHAR"/>
        <result column="parent_id" property="parentId" jdbcType="DECIMAL"/>
        <result column="type" property="type" jdbcType="VARCHAR"/>
        <result column="icon" property="icon" jdbcType="VARCHAR"/>
        <result column="is_default" property="isDefault" jdbcType="BOOLEAN"/>
        <collection property="permissions" ofType="io.choerodon.iam.infra.dataobject.PermissionDO">
            <id column="permission_id" property="id"></id>
            <result column="permission_code" property="code" jdbcType="VARCHAR"/>
            <result column="path" property="path" jdbcType="VARCHAR"/>
            <result column="method" property="method" jdbcType="VARCHAR"/>
            <result column="permission_level" property="level" jdbcType="VARCHAR"/>
            <result column="action" property="action" jdbcType="VARCHAR"/>
            <result column="resource" property="resource" jdbcType="VARCHAR"/>
            <result column="public_access" property="publicAccess" jdbcType="BOOLEAN"/>
            <result column="login_access" property="loginAccess" jdbcType="BOOLEAN"/>
            <result column="service_name" property="serviceName" jdbcType="VARCHAR"/>
        </collection>
    </resultMap>


    <select id="queryIncludeTl" resultType="io.choerodon.iam.infra.dataobject.MenuDO">
        <bind name="lang" value="@io.choerodon.mybatis.helper.LanguageHelper@language()"/>
        SELECT
        *,
        tl1.name as zh_name,
        tl2.name as en_name
        FROM iam_menu m
        LEFT JOIN iam_menu_tl tl1 ON m.id = tl1.id AND tl1.lang = 'zh_CN'
        LEFT JOIN iam_menu_tl tl2 ON m.id = tl2.id AND tl2.lang = 'en_US'
    </select>

    <select id="queryMenusWithPermissions" resultMap="menusWithPermissions">
        <bind name="lang" value="@io.choerodon.mybatis.helper.LanguageHelper@language()"/>
        SELECT
        im.*,
        ip.id permission_id,
        ip.code permission_code,
        ip.path,
        ip.method,
        ip.level permission_level,
        ip.action,
        ip.resource,
        ip.public_access,
        ip.login_access,
        ip.service_name
        FROM iam_menu im
        LEFT JOIN iam_menu_permission imp on im.id = imp.menu_id
        LEFT JOIN iam_permission ip on imp.permission_id = ip.id
        WHERE im.type = "menu"
    </select>
</mapper>

```

### 以下为本项目中使用的mappper接口 UserMapper.java ，未定义额外的sql所以无需创建对应xml：

```java
package io.choerodon.todo.infra.mapper;

import io.choerodon.mybatis.common.BaseMapper;
import io.choerodon.todo.infra.dataobject.UserDO;

public interface UserMapper extends BaseMapper<UserDO> {
}

```