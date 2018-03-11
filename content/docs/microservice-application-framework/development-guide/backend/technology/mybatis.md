+++
title = "hap-mybatis-mapper-stater 开发文档"
date = "2017-02-01"
draft = false
weight = 1
+++

# hap-mybatis-mapper-stater 开发文档

## 功能特点

- 通用mapper功能
- 数据多语言支持
- 多种数据源物理分页
- 自动审计功能
- 选择性插入和更新

## 使用方法

### 集成

在spring boot项目依赖中添加如下依赖

```xml
<dependency>
    <groupId>com.hand.hap.cloud</groupId>
    <artifactId>hap-mybatis-mapper-starter</artifactId>
    <version>1.1-SNAPSHOT</version>
</dependency>
```

### 通用mapper使用方法

使实体类T的mapper接口继承于BaseMapper,如下所示：

继承于BaseMapper的接口不能再用@Mapper注解标注

```java
public interface UserRoleMapper extends BaseMapper<UserRole> {
}
```

BaseMapper已包含基本的增删改查,如不需要自定义新的查询,则不需建立Mapper.xml文件。service集成之后将可以通过service直接调用基本增删该查方法,继承方式如下:

```java
//接口
public interface RoleService extends BaseService<Role> {
}

//实现类
@Service
public class RoleServiceImpl extends BaseServiceImpl<Role> implements RoleService {
}
```

### 多语言使用

- 使用多语言功能是,首先应在数据库添加对应多语言表,多语言表的命名为原表明再加上后缀_tl即可.
- 在原表的实体类加上@MultiLanguage注解 ,如people姓名为多语言字段拥有中文名和英文名,配置如下:

```java
@MultiLanguage
public class People {
    @MultiLanguageField
    private string name；
}
```

- 当语言改变时,多语言字段查询到的将是对应的语言.
- 当对有多语言字段的表进行单个记录的删除时,会级联删除多语言表的相应记录.

### 分页使用

#### 对单个表的全部记录进行分页

BaseService中已带有分页方法,使用方式及其简单.

```java
//service层接口
public interface RoleService extends BaseService<Role> {
}

//service层实现类
@Service
public class RoleServiceImpl extends BaseServiceImpl<Role> implements RoleService {
}

//controller
@Controller
public class RoleController{
    ...
    @Autowired
    private RoleService service;

    @RequestMapping("/v1/roles")
    @RequestMapping(method = RequestMethod.GET)
    public Page<Role> select(@RequestParam Integer page,@RequestParam Integer size){
        return service.pageAll(page, size));
    }
}
```

#### 对单个表中特定记录分页查询

```java
//service接口
public interface ClientService extends BaseService<Client> {

    //在service接口中建立方法,参数中带上查询限制,
    //如对特定组织的所有的客户端进行分页查询.
    Page<Client> selectClientAll(Long organizationId,Integer  page, Integer size);

}

...

//service实现类
@Service
public class ClientServiceImpl extends BaseServiceImpl<Client> implements ClientService {

    //根据传入的组织id构建查询对象
    @Override
    public Page<Client> selectClientAll(Long organizationId, Integer page, Integer size) {
        Client client = new Client();
        client.setOrganizationId(organizationId);
        return this.page(client, page, size);
    }
}
```

#### 对多个表集联查询时分页

- 新建集联查询结果的pojo类，在mapper接口中新建自定义查询接口,并在mapper.xml中编写对应的查询语句。

```java
//接口形式如下
List<SelectResult> CustomSelect(T var1 ,T var2);
```

- 在service接口中，建立对应分页查询方法。接口的参数对应查询集联查询的参数和分页参数。

```java
Page<SelectResult> CustomPage(T var1, T var2, int start, int size);
```

- 在service实现类中override此方法.具体如下:

```java
public Page<SelectResult> CustomPage(T var1, T var2, int start, int size){
    return PageHelper.doPage(page, size, () -> {
            return mapper.CustomSelect(var1, var2);
        });
}
```

### 审计功能使用

实体类继承AuditDomain类之后便拥有各个审计字段,其中还有对继承了AuditDomain类用@ModifyAudit注解后增删改查操作会自动对”creationDate”,”createdBy”,”lastUpdateDate”,”lastUpdatedBy”这四个字段进行维护.用@VersionAudit注解后会自动对”objectVersionNumber”进行维护,但更新时必须传回原版本号,否则抛出异常。

使用了@VersionAudit注解后更新是必须返回原版本号

### 选择行插入更新

BaseService中有两个方法 `int insertOptional(T record, String... optionals);` 和 `int updateOptional(T record, String... optionals);`.以满足用户的特定需求.

- insertOptional方法使用场景 当用户插入时只需要插入指定的字段,且对于不指定字段初始为null而不是数据库中的指定的默认值.当然当数据库中未设置默认值时,不用此方法也可初始化为null.
- updateOptional方法使用场景 当用户对记录进行更新时如果只想更新指定的几个字段,对未指定的其余字段则保持原值则可使用此方法.