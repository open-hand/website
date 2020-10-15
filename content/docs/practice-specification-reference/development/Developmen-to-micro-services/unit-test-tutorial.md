+++
title = "单元测试教程 "
description = ""
weight = 4
home = true
+++

# 单元测试教程 
---
##  一、SpringBootTest和Spock基础知识
## 1.1 SpringBootTest注解说明
### @SpringBootTest
用于构建测试环境上下文，默认情况下，SpringBootTest不会构建一个web环境，可以使用webEnvironment参数指定想要构建的测试环境。可选值如下：

- MOCK(默认)：构建一个虚拟的web环境

- RANDOM_PORT：使用随机的端口号构建一个真实的web环境

- DEFINED_PORT：根据配置文件指定的端口号构建一个web环境

- NONE：构建一个非web环境

我们测试的时候希望模拟一个真实的web环境，选择了RANDOM_PORT

### @Import

用于导入配置类

### @TestConfiguration

标注是用于单元测试的配置类
> spring test会缓存上下文，如果不同的测试类使用的是相同的上下文，那么上下文只会加载一次。所以，如果使用了@Import注解导入配置类，那么每个测试类都应该导入了相同的配置类，保证使用同一个上下文。

更多内容，请学习[spring boot test](https://docs.spring.io/spring-boot/docs/2.0.6.RELEASE/reference/html/boot-features-testing.html)

## 1.2 spock基础知识

Spock框架是基于Groovy语言的测试框架，Groovy与Java具备良好的互操作性，因此可以在Spring Boot项目中使用该框架写优雅、高效以及DSL化的测试用例。因为基于Groovy, 使得Spock 可以更容易地写出表达能力更强的测试用例。又因为它内置了Junit Runner, 所以Spock兼容大部分的IDE，测试工具，和持续集成服务器。

### Specification

Specification类包含了很多编写用于单元测试的方法。编写测试代码时，我们先创建一个测试类，继承自Specification。

```
class CiControllerSpec extends Specification {
  // fields
  // fixture methods
  // feature methods
  // helper methods
}
```

###  定义变量
```
def obj = new ClassUnderSpecification()
```
有时需要在测试方法之间共享一个对象。例如，创建对象的成本可能非常高，或者您可能希望测试方法相互交互。此时，可以使用`@Shared`标注变量，并且建议在创建的同时赋值。
```
@Shared organizationId = 1
```
### 测试方法
```
def "pushing an element on the stack"() {
  // blocks go here
}
```
### 模板方法：
- def setup() {} ：每个测试方法运行前的启动方法
- def cleanup() {} : 每个测试方法运行后的清理方法
- def setupSpec() {} : 第一个测试方法运行前的启动方法,设置每个测试类的环境
- def cleanupSpec() {} : 最后一个测试方法运行后的清理方法,清理每个测试类的环境

### 代码块
- given: 构造测试需要的数据
- when: 触发行为，比如调用指定方法或函数
- then: 做出断言表达式
- expect: 期望的行为，when-then的精简版
- cleanup: 测试结束时清除构造的数据
- where: 以表格的形式提供测试数据集合
### 相关注解
- @Shared：多个测试方法中共享数据
- @Stepwise: 让测试方法按照声明的顺序执行，当前面的测试方法失败后，将不会执行后面的测试方法
- @Ignore: 忽略测试方法
- @IgnoreRest：只测试这个方法，而忽略所有其他方法
- @Timeout： 设置测试方法的超时时间，默认单位为秒
- @Requires：根据条件执行
- @Retry：测试方法执行失败后重试
- @Unroll：展开数据管道的测试用例,分别显示每个测试用例的测试情况。即将输入的一组测试数据拆分为单独的测试用例来执行。
- @Subject：标记当前测试的目标类

更多内容，请学习[spock-docs](http://spockframework.org/spock/docs/1.3/index.html)

##  二、H2DataBase
H2 是一款使用Java语言编写的嵌入式数据库，具有速度块、占用内存小、支持标准的SQL语法, JDBC API等特点。非常适合用在单元测试等数据不需要保存的场景。

## 2.1. 运行方式
####  内存模式
数据库只在内存中运行，关闭连接后数据库将被清空，适合测试环境。

连接语法：
```
jdbc:h2:mem:DBName;DB_CLOSE_DELAY=-1
```
如果不指定DBName，则以私有方式启动，只允许一个连接
####  内嵌式
数据库持久化存储为单个文件

连接语法：
```
jdbc:h2:[file:][<path>]<databaseName>
```
#### 服务式
H2支持三种服务模式
- web server：此种运行方式支持使用浏览器访问H2 Console
- TCP server：支持客户端/服务器端的连接方式
- PG server：支持PostgreSQL客户端

TCP/IP模式连接语法：
```
jdbc:h2:tcp://<server>[:<port>]/[<path>]<databaseName>
```
更多内容，请参考[database_url](https://h2database.com/html/features.html#database_url)
## 2.2 连接参数说明

- DB_CLOSE_DELAY：要求最后一个正在连接的连接断开后，不要关闭数据库
- MODE=MySQL：兼容模式，H2兼容多种数据库，该值可以为：DB2、Derby、HSQLDB、MSSQLServer、MySQL、Oracle、PostgreSQL
- AUTO_RECONNECT=TRUE：连接丢失后自动重新连接
- AUTO_SERVER=TRUE：启动自动混合模式，允许开启多个连接，该参数不支持在内存中运行模式
- TRACE_LEVEL_SYSTEM_OUT、TRACE_LEVEL_FILE：输出跟踪日志到控制台或文件， 取值0为OFF，1为ERROR（默认值），2为INFO，3为DEBUG
- SET TRACE_MAX_FILE_SIZE mb：设置跟踪日志文件的大小，默认为16M

##  2.3 语法参考
- [数据类型](https://h2database.com/html/datatypes.html)
- [SQL语法](https://h2database.com/html/grammar.html)
- [函数](https://h2database.com/html/functions.html)


##  2.4 应用程序配置
spring-boot项目中可以使用如下配置，启动h2内存数据库。
```
spring:
  datasource:
    password: sa
    url: jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1;MODE=Mysql;TRACE_LEVEL_SYSTEM_OUT=1;
    username: sa
```
url相关参数说明：

- jdbc:h2:mem:testdb: 创建一个名为testdb的内存数据库
- DB_CLOSE_DELAY=-1： 程序结束后销毁数据库
- MODE=Mysql： 使用mysql兼容模式
- TRACE_LEVEL_SYSTEM_OUT=1： 过多的日志信息会降低运行速度，所以这里设置日志级别为error
## 2.5 数据初始化

因为项目中使用liquibase + groovy来初始化数据。 在测试中也可以使用同样的方式初始化数据，只需要在测试代码中进行如下配置即可：

application.yaml文件中添加初始化数据路径

```
# liquibase初始化配置
data:
  # 选择初始化资源目录
  dir: src/main/resources
```
初始化脚本目录结构：

![](/docs/practice-specification-reference/development/Developmen-to-micro-services/image/init-data-folder.png)

- groovy: groovy目录下存放`表结构定义`
- init-data：init-data目录下存放`表数据`。这里主要初始化一些全局需要的基础数据，对于特定测试任务的初始化数据应该在测试代码中初始化，并且在测试任务执行完成后清理。

在测试程序中添加以下代码即可使用liquibase工具初始化数据库。

```
@Import(LiquibaseConfig)
class IntegrationTestConfiguration {

    @Autowired
    LiquibaseExecutor liquibaseExecutor

 
    @PostConstruct
    void init() {
        // 初始化数据库
        liquibaseExecutor.execute()
    }

}
```
因为测试使用的是内存数据库h2和mysql、oracle等数据库语法不是完全相同，所以数据初始化可能会失败。如果初始化失败，需要把groovy文件拷贝到test资源目录中，并且修改对应的groovy文件，用以匹配h2语法。

修改后的groovy目录：

![](/docs/practice-specification-reference/development/Developmen-to-micro-services/image/init-data-groovy.png)

对应的application.yaml需要同步调整
```
# liquibase初始化配置
data:
  # 选择初始化资源目录(使用test资源目录)
  dir: src/test/resources
```
比如, 以下情况会导致初始化失败：
1. mysql中使用VARCHAR BINARY来表示区分大小写字符串，但是在h2中VARCHAR区分大小写，不区分大小使用VARCHAR_IGNORECASE
2. h2中索引名数据库唯一，如果在mysql中A表和B表都使用了'index-1'这个索引，对应groovy在初始化h2数据库时会失败。

##  三、单元测试

## 3.1 什么是单元测试

单元测试概念定义如下：

```
单元测试（unit testing），是指对软件中的最小可测试单元进行检查和验证。对于单元测试中单元的含义，一般来说，要根据实际情况去判定其具体含义，如C语言中单元指一个函数，Java里单元指一个类，图形化的软件中可以指一个窗口或一个菜单等。总的来说，单元就是人为规定的最小的被测功能模块。单元测试是在软件开发过程中要进行的最低级别的测试活动，软件的独立单元将在与程序的其他部分相隔离的情况下进行测试。
```

测试范围：

- 单元测试：针对单个函数的测试，关注其内部逻辑，mock所有需要的服务。单元测试带来优秀的代码质量、良好的异常处理、优雅的错误报告

- 服务测试：验证两个或多个模块之间的交互

- 端到端测试：端到端测试会覆盖整个系统，这类测试通常需要打开一个浏览器来操作图形用户界面，这种类型的测试会覆盖大范围的产品代码

## 3.2 为什么要编写单元测试

编写单元测试会占用我们编码中很大一部分时间，导致延长软件的开发周期。那我们为什么要编写单元测试呢，单元测试的优点是什么？

单元测试的优点：

- 单元测试对我们的产品质量是非常重要的。
- 单元测试是所有测试中最底层的一类测试，是第一个环节，也是最重要的一个环节，是唯一一次有保证能够代码覆盖率达到100%的测试，是整个软件测试过程的基础和前提，单元测试防止了开发的后期因bug过多而失控，单元测试的性价比是最好的。
- 据统计，大约有80%的错误是在软件设计阶段引入的，并且修正一个软件错误所需的费用将随着软件生命期的进展而上升。错误发现的越晚，修复它的费用就越高，而且呈指数增长的趋势。作为编码人员，也是单元测试的主要执行者，是唯一能够做到生产出无缺陷程序这一点的人，其他任何人都无法做到这一点
- 代码规范、优化，可测试性的代码
- 作为重构的基础，验证重构是否可靠
- 应用于自动化构建或持续集成流程，对每次代码修改做回归测试

##  四、编写单元测试

## 测试目标

编写单元测试时，我们遵循分层测试的原则，为controller、service、infra层单独编写测试用例，即我们只关注被测方法的业务逻辑，mock使用到的外部服务。这样优点是可以降低测试代码的复杂度、提高代码质量。

- controller: controller层主要测试参数合法性校验逻辑是否正确
- servrice： service层则主要测试方法的内部逻辑，对于使用到的其他服务以及Mapper可以使用mock对象。
- infra: infra层主要测试核心的sql语句以及工具类


## 4.1 添加pom依赖和插件

- 引入maven依赖：

| 依赖                                              | 作用                    |
| ------------------------------------------------- | ----------------------- |
| org.springframework.boot:spring-boot-starter-test | spring-boot-test启动包  |
| org.spockframework:spock-core                     | spcok核心依赖包         |
| org.spockframework:spock-spring                   | spring整合spock依赖包   |
| org.codehaus.groovy:groovy                        | spock需要的groovy依赖包 |
| com.h2database:h2                                 | 测试使用的内存数据库    |
| io.choerodon:choerodon-liquibase                  | 数据初始化工具          |

- 添加插件：
1. gmavenplus-plugin：groovy编译插件
2. maven-surefire-plugins：maven测试插件

```
<dependencies>
    [...]
    <!--单元测试-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>

    <dependency>
        <groupId>org.spockframework</groupId>
        <artifactId>spock-core</artifactId>
        <version>1.1-groovy-2.4-rc-2</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.spockframework</groupId>
        <artifactId>spock-spring</artifactId>
        <version>1.1-groovy-2.4-rc-3</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.codehaus.groovy</groupId>
        <artifactId>groovy</artifactId>
    </dependency>
    <!--测试数据库-->
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <version>1.4.197</version>
        <scope>test</scope>
    </dependency>
    <!--初始化数据库表-->
    <dependency>
        <groupId>io.choerodon</groupId>
        <artifactId>choerodon-liquibase</artifactId>
        <version>0.16.1-SNAPSHOT</version>
        <scope>test</scope>
    </dependency>
    [...]
</dependencies>
...
<build>
    <plugins>
        [...]
        <!--使用spock测试框架需要添加groovy编译插件-->
        <plugin>
            <groupId>org.codehaus.gmavenplus</groupId>
            <artifactId>gmavenplus-plugin</artifactId>
            <version>1.9.0</version>
            <executions>
                <execution>
                    <goals>
                        <goal>compileTests</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
        <!--maven测试插件-->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <configuration>
                <!-- 自定义测试匹配规则，测试有Test和Spec后缀的类-->
                <includes>
                    <include>**/*Test.java</include>
                    <include>**/*Spec.java</include>
                </includes>
            </configuration>
        </plugin>
        [...]
    </plugins>
</build>
...
```
## 4.2 项目准备
- 单元测试目录结构

![](/docs/practice-specification-reference/development/Developmen-to-micro-services/image/unit-test-folder.png)

- application.yaml

```
spring:
  datasource:
    password: sa
    url: jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1;MODE=Mysql;TRACE_LEVEL_SYSTEM_OUT=1;
    username: sa
  autoconfigure:
    exclude:
      - org.springframework.boot.autoconfigure.liquibase.LiquibaseAutoConfiguration # 关闭LiquibaseAutoConfiguration
      - org.springframework.boot.autoconfigure.kafka.KafkaAutoConfiguration # 关闭KafkaAutoConfiguration的自动化配置
  h2:
    console:
      enabled: true
  cloud:
    service-registry:
      auto-registration:
        enabled: false   # 关闭自动注册
eureka:
  client:
    enabled: false # 关闭eureka
mybatis:
  mapperLocations: classpath*:/mapper/*.xml
  configuration:
    mapUnderscoreToCamelCase: true
# liquibase初始化配置
data:
  # 选择初始化资源目录
  dir: src/main/resources
# 日志级别设置
logging:
  level:
    root: error

```

上面的是基础的应用配置，针对不同的项目环境，可以进行相应调整。
## 4.3 编写测试代码
测试controller时，我们需要对服务器进行REST调用测试。
添加@SpringBootTest(webEnvironment = RANDOM_PORT)注解后，Spring上下文中会配置一个可用的TestRestTemplate实例，它会解析到正在运行的服务器的相对链接，所以我们只需要使用@Autowired注入一个TestRestTemplate即可，在使用对应api的时候，url地址填Endpoint的相对地址即可。

下面我们以例子的形式来讲解如何编写单元测试。

### 示例1：第一个单元测试demo

源码：
UserController

```
@RestController
@RequestMapping(value = "/v1/users")
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    @Permission(level = ResourceLevel.SITE, permissionLogin = true)
    @ApiOperation(value = "创建todo用户")
    private ResponseEntity<UserDTO> create(@RequestBody UserDTO userDTO) {
        return new ResponseEntity<>(userService.createOne(userDTO), HttpStatus.OK);
    }
}
```
测试代码：

```
@SpringBootTest(webEnvironment = RANDOM_PORT)
@Import(IntegrationTestConfiguration)
@Subject(UserController)
class UserControllerSpec extends Specification {

    def BASE_URL = "/v1/users"
    @Autowired
    TestRestTemplate testRestTemplate;

    @Autowired
    UserController userController

    UserService userService = Mock()

    def setup() {
        ReflectionTestUtils.setField(userController, "userService", userService)
    }

    def "create"() {
        given: "构造参数"
        def userDto = new UserDTO()
        userDto.setEmail("test@hand.com")
        userDto.setEmployeeName("lisi")
        userDto.setEmployeeNumber("001")

        when: "新建用户"
        def entity = testRestTemplate.postForEntity(BASE_URL, userDto, UserDTO.class)

        then: "校验参数"
        entity.statusCode.is2xxSuccessful()
        1 * userService.createOne(_)
    }
}

```
因为TestRestTemplate会解析服务器的相对地址，所以调用接口时，url我们直接填相对地址"/v1/users"即可

- @Import(IntegrationTestConfiguration)

我们在构建上下文的时候，我们希望自定义bean,进行一些初始化操作（比如，初始化数据库，为请求头添加jwt_token）。可以通过@import注解，导入一个标注@TestConfiguration注解的测试配置类实现。
```
@TestConfiguration
@Import(LiquibaseConfig)
class IntegrationTestConfiguration {

    // spock提供的可以在外部配置类中mock对象的工厂类
    private final detachedMockFactory = new DetachedMockFactory()

    @Value('${choerodon.oauth.jwt.key:hzero}')
    String key

    @Autowired
    LiquibaseExecutor liquibaseExecutor

    @Autowired
    TestRestTemplate testRestTemplate

    ObjectMapper objectMapper = new ObjectMapper()

    @PostConstruct
    void init() {
        // 初始化数据库
        liquibaseExecutor.execute()
        // 给请求头添加jwt_token
        setTestRestTemplateJWT()
    }

    /**
     * 请求头添加jwt_token
     */
    private void setTestRestTemplateJWT() {
        testRestTemplate.getRestTemplate().setRequestFactory(new HttpComponentsClientHttpRequestFactory())
        testRestTemplate.getRestTemplate().setInterceptors([new ClientHttpRequestInterceptor() {
            @Override
            ClientHttpResponse intercept(HttpRequest httpRequest, byte[] bytes, ClientHttpRequestExecution clientHttpRequestExecution) throws IOException {
                httpRequest.getHeaders()
                        .add('Jwt_token', createJWT(key, objectMapper))
                return clientHttpRequestExecution.execute(httpRequest, bytes)
            }
        }])
    }

    String createJWT(final String key, final ObjectMapper objectMapper) {
        Signer signer = new MacSigner(key)
        CustomUserDetails details = new CustomUserDetails('default', 'unknown', Collections.emptyList())
        details.setUserId(1L);
        details.setLanguage("zh_CN");
        details.setTimeZone("GMT+8");
        details.setEmail("hand@hand-china.com");
        details.setOrganizationId(1L);
        try {
            return 'Bearer ' + JwtHelper.encode(objectMapper.writeValueAsString(details), signer).getEncoded()
        } catch (IOException e) {
            throw new CommonException(e)
        }
    }
}

```

## 4.4 Mock
在测试过程中，对于一些不容易构造、测试的对象，通过创建一个mock对象来模拟对象的行为。比如，A服务需要调用B服务，但是在单元测试中，我们并没有部署B服务。那么就可以构造一个mock对象，并且返回期望的结果。

关于Stub和Mock: 

- Stub: Stub可以模拟一个方法，阻断对原有方法的调用。

- Mock:   Mock包含了Stub的功能，不仅可以模拟方法，阻断对原有方法的调用。它还期望你必须调用这个方法多少次。可以把Stub理解为Mock的子集。

#### 示例1：Stub - 测试方法返回值
在spock中使用Stub可以构造一个虚拟对象，并且模拟对象的返回值
```
subscriber.receive(_) >> "ok"
|          |       |     |
|          |       |     返回值
|          |       参数
|          目标方法
目标对象
```
源码：

UserServiceImpl
```
@Service
public class UserServiceImpl implements UserService {
    private UserMapper userMapper;

    private DevopsFeignClient devopsFeignClient;

    public UserServiceImpl(UserMapper userMapper, DevopsFeignClient devopsFeignClient) {
        this.userMapper = userMapper;
    }

    @Override
    public Boolean checkEmailExist(String email) {
        // 校验email在gitlab中是否已经使用
        ResponseEntity<Boolean> responseEntity = devopsFeignClient.checkGitlabEmail(email);
        return responseEntity.getBody();
    }
}
```
测试类：

```
@SpringBootTest(webEnvironment = RANDOM_PORT)
@Import(IntegrationTestConfiguration)
@Subject(UserServiceImpl)
class UserServiceImplSpec extends Specification {

    @Autowired
    UserService userService
    DevopsFeignClient devopsFeignClient = Stub()

    void setup() {
        ReflectionTestUtils.setField(userService, "devopsFeignClient", devopsFeignClient)
    }
    /**
     * 测试方法返回值
     * @return
     */
    def "checkEmailExistInGitlab"() {
        given: "构造参数"
        def email = "test@hand.com"
        ResponseEntity<Boolean> responseEntity = new ResponseEntity<>(true, HttpStatus.OK)
        devopsFeignClient.checkGitlabEmail(_ as String) >> responseEntity

        when: "校验邮箱是否被使用"
        def result = userService.checkEmailExistInGitlab(email)
        then: "校验结果 - 邮箱已使用"
        result == true
    }
}

```
我们首先创建DevopsFeignClient的虚拟对象,然后在setup()方法中将虚拟对象通过反射的方式设置到待测试类中。

在given代码块中，我们通过`devopsFeignClient.checkGitlabEmail(_ as String) >> responseEntity`给虚拟对象的方法模拟返回值。

在when代码块中，我们通过testRestTemplate调用要测试的接口。

在then代码块中，我们校验接口的返回值是否符合我们的预期。

#### 示例2： Stub - 测试连续调用时返回不同的值
我有有时希望在连续调用中，返回不同的值可以使用下面的语法
```
subscriber.receive(_) >>> ["ok", "error", "error", "ok"]
```
测试类：
```
@SpringBootTest(webEnvironment = RANDOM_PORT)
@Import(IntegrationTestConfiguration)
@Subject(UserServiceImpl)
class UserServiceImplSpec extends Specification {

    @Autowired
    UserService userService

    DevopsFeignClient devopsFeignClient = Stub()

    void setup() {
        ReflectionTestUtils.setField(userService, "devopsFeignClient", devopsFeignClient)
    }
    /**
     *  测试连续调用时返回不同的值
     * @return
     */
    def "checkEmailExistInGitlab2"() {
        given: "构造参数"
        def email = "test@hand.com"
        ResponseEntity<Boolean> responseEntity1 = new ResponseEntity<>(true, HttpStatus.OK)
        ResponseEntity<Boolean> responseEntity2 = new ResponseEntity<>(false, HttpStatus.OK)
        devopsFeignClient.checkGitlabEmail(_ as String) >>> [responseEntity1, responseEntity2]

        when: "校验邮箱是否被使用"
        def result1 = userService.checkEmailExistInGitlab(email)
        then: "校验结果 - 邮箱已使用"
        result1 == true

        when: "校验邮箱是否被使用"
        def result2 = userService.checkEmailExistInGitlab(email)
        then: "校验结果 - 邮箱未使用"
        result2 == false
    }
}

```

上面的测试中，我们使用`devopsFeignClient.checkGitlabEmail(_ as String) >>> [responseEntity1, responseEntity2]`模拟返回值，第一次调用时返回responseEntity1，第二次调用时返回responseEntity2。然后我们分别在两个when-then代码块中对不同的返回结果进行校验。

#### 示例3： Mock - 测试方法调用次数
使用Mock构建的虚拟对象，我们可以判断方法在测试中执行的次数，这可以帮助我们判断代码逻辑是否按照预期执行。

```
1 * userMapper.selectByPrimaryKey(_)
|   |          |                  |
|   |          |                  输入参数，“_”匹配任意
|   |          方法
|   目标对象
调用次数
```
源码：

UserServiceImpl
```
@Service
public class UserServiceImpl implements UserService {
    private UserMapper userMapper;

    private DevopsFeignClient devopsFeignClient;

    public UserServiceImpl(UserMapper userMapper, DevopsFeignClient devopsFeignClient) {
        this.userMapper = userMapper;
    }

    @Override
    public UserDTO queryById(Long id) {
        return userMapper.selectByPrimaryKey(id);
    }
}
```
测试类；

```
@SpringBootTest(webEnvironment = RANDOM_PORT)
@Import(IntegrationTestConfiguration)
@Subject(UserServiceImpl)
class UserServiceImplSpec extends Specification {

    @Autowired
    UserService userService

    UserMapper userMapper = Mock()

    void setup() {
        ReflectionTestUtils.setField(userService, "userMapper", userMapper)
    }

    def "queryById"() {
        given: "构造参数"
        def userId = 1L
        when: "根据id查询用户"
        userService.queryById(userId)
        then: "校验结果"
        1 * userMapper.selectByPrimaryKey(_)
    }
}

```
根据源码，我们知道调用queryById接口的时候，userMapper.selectByPrimaryKey(id)方法一定会执行一次。
在then代码块中，我们使用`1 * userMapper.selectByPrimaryKey(_)`校验该方法会执行一次
#### 示例4：Mock - 测试方法调用次数以及返回值
使用Mock构建的虚拟对象，我们不仅可以判断方法在测试中执行的次数，还可以模拟方法的返回值。
```
@SpringBootTest(webEnvironment = RANDOM_PORT)
@Import(IntegrationTestConfiguration)
@Subject(UserServiceImpl)
class UserServiceImplSpec extends Specification {

    @Autowired
    UserService userService

    UserMapper userMapper = Mock()

    void setup() {
        ReflectionTestUtils.setField(userService, "userMapper", userMapper)
    }
    
    /**
     * 测试返回值以及调用次数
     * @return
     */
    def "queryById2"() {
        given: "构造参数"
        def userId = 1L
        def user = new UserDTO()
        user.setEmail("test@hand.com")
        user.setEmployeeName("lisi")
        user.setEmployeeNumber("001")
        user.setId(1)

        when: "根据id查询用户"
        def userDTO = userService.queryById(userId)
        then: "校验结果"
        1 * userMapper.selectByPrimaryKey(_) >> user
        userDTO == user
    }
}

```
当同时需要校验调用次数和模拟返回值时，需要将声明放在then块中才能生效。

上面的例子中， `userMapper.selectByPrimaryKey(_)`执行一次，同时返回given中构造的user对象。
## 4.5  其他示例

#### 示例1：where代码块的使用

where代码块可以用来准备多组测试数据

源码：

```
public final class HumpToUnderlineUtil {
    private static final String UNDERLINE = "_";
    /**
     * 驼峰转下划线格式
     *
     * @param camelCase 驼峰格式字符串
     * @return 下划线格式字符串
     */
    public static String toUnderLine(String camelCase) {
        if (StringUtils.isEmpty(camelCase)) {
            return camelCase;
        }
        StringBuilder builder = new StringBuilder(camelCase);
        int upperCaseCharNumber = 0;
        for (int i = 0; i < camelCase.length(); i++) {
            if (Character.isUpperCase(camelCase.charAt(i))) {
                builder.insert(i + upperCaseCharNumber, UNDERLINE);
                // 删除大写字母
                builder.deleteCharAt(i + upperCaseCharNumber + 1);
                // 插入小写字母
                builder.insert(i + upperCaseCharNumber + 1, Character.toLowerCase(camelCase.charAt(i)));
                upperCaseCharNumber += 1;
            }
        }
        return builder.toString();
    }
}
```

测试类1：Data Tables

Data Tables以表格的形式方便的构造多组测试数据
```
@SpringBootTest(webEnvironment = RANDOM_PORT)
@Import(IntegrationTestConfiguration)
class HumpToUnderlineUtilSpec extends Specification {

    def "ToUnderLine1"() {
        expect: "测试驼峰转下划线"
        HumpToUnderlineUtil.toUnderLine(camelCase) == underline

        where: ""
        camelCase | underline
            ""    |     ""
        "ciPipeline" | "ci_pipeline"
        "cdPipeline" | "cd_pipeline"

    }
}
```

测试类2：Data Pipes

与Data Tables功能一致，Data Pipes以管道的形式构造多组测试数据
```
@SpringBootTest(webEnvironment = RANDOM_PORT)
@Import(IntegrationTestConfiguration)
class HumpToUnderlineUtilSpec extends Specification {
    @Unroll
    def "ToUnderLine"() {
        expect: "测试驼峰转下划线"
        HumpToUnderlineUtil.toUnderLine(camelCase) == underline

        where: 
        camelCase << ["", null, "ciPipeline", "cdPipeline"]
        underline << ["", null, "ci_pipeline", "cd_pipeline"]
    }
}
```

#### 示例2：thrown()与notThrown()的使用

-  thrown: 在测试中，对于测试中一定会出现的异常我们可以通过thrown(Exception)来捕获，并且校验异常实例。
- notThrown: 与thrown相反,如果我们明确知道某个方法不应该抛出某种异常，可以使用notThrown()来校验。

源码：
```
@Service
public class UserServiceImpl implements UserService {
    private UserMapper userMapper;

    private DevopsFeignClient devopsFeignClient;

    public UserServiceImpl(UserMapper userMapper, DevopsFeignClient devopsFeignClient) {
        this.userMapper = userMapper;
    }

    @Override
    public UserDTO createOne(UserDTO userDTO) {
        if (userMapper.insert(userDTO) != 1) {
            throw new CommonException("error.user.insert");
        }
        return userDTO;
    }
}
```
测试类: 

```
@SpringBootTest(webEnvironment = RANDOM_PORT)
@Import(IntegrationTestConfiguration)
@Subject(UserServiceImpl)
class UserServiceImplSpec extends Specification {

    @Autowired
    UserService userService

    UserMapper userMapper = Mock()
    void setup() {
        ReflectionTestUtils.setField(userService, "userMapper", userMapper)
    }


    def "createOne"() {
        given: "构造参数"
        def userDto = new UserDTO()
        userDto.setEmail("test@hand.com")
        userDto.setEmployeeName("lisi")
        userDto.setEmployeeNumber("001")

        when: "新建用户 - 创建成功"
        userService.createOne(userDto)
        then: "校验结果"
        1 * userMapper.insert(_) >> 1
        // 使用notThrown校验，是否没有出现异常
        notThrown(CommonException)

        when: "新建用户 - 创建失败"
        userService.createOne(userDto)
        then: "校验结果"
        1 * userMapper.insert(_) >> 0
        // 使用thrown校验，是否出现指定异常
        def e = thrown(Exception)
        e instanceof CommonException
        e.getMessage() == "error.user.insert"
    }
}

```
根据源码可以看出，userMapper.insert(_)返回值为1时，程序不会抛出CommonException,如果为0,则相反。我们分别验证两种情况，如果测试用例执行时，与预期结果不同则测试用例执行失败。

##  五、获取代码覆盖率

代码覆盖率通过 sonar + jacoco获取。只需要在持续集成工具中添加对应配置即可。比如使用gitlab-ci，在gitlab-ci.yaml中定义sonar任务，执行下面的命令，即可扫描代码质量以及单元测试覆盖率。
```
mvn --batch-mode clean org.jacoco:jacoco-maven-plugin:prepare-agent verify sonar:sonar -Dsonar.host.url=${SONAR_URL} -Dsonar.login=${SONAR_LOGIN} -Dsonar.gitlab.project_id=$CI_PROJECT_PATH -Dsonar.gitlab.commit_sha=$CI_COMMIT_REF_NAME -Dsonar.gitlab.ref_name=$CI_COMMIT_REF_NAME -Dsonar.analysis.serviceGroup=$GROUP_NAME -Dsonar.analysis.commitId=$CI_COMMIT_SHA -Dsonar.projectKey=${GROUP_NAME}:${PROJECT_NAME} -Dmaven.test.failure.ignore=true -DskipTests=false
```
此时在sonar代码质量页面能够看到覆盖率情况
![](/docs/practice-specification-reference/development/Developmen-to-micro-services/image/sonar-result.png)
