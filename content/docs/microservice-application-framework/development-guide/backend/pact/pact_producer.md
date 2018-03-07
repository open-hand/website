+++
title = "服务提供端"
date = "2017-11-29"
draft = false
weight = 4
+++

## 添加依赖
```xml
<dependency>
  <groupId>au.com.dius</groupId>
  <artifactId>pact-jvm-consumer-junit_2.11</artifactId>
  <version>3.5.10</version>
</dependency>
<dependency>
  <groupId>au.com.dius</groupId>
  <artifactId>pact-jvm-provider-spring_2.12</artifactId>
  <version>3.5.10</version>
</dependency>
```

## 验证pact契约
> 因为pact已经验证了controller和service，此部分的单元测试可以不用写，但是如下的UserMapper因为使用了mock，并没有测试是否可用，此部分的单元测试要写。

```java
@RunWith(SpringRestPactRunner.class)
@Provider("user_provider")
@PactBroker(host = "localhost", port = "80",
        authentication = @PactBrokerAuth(username = "pact", password = "pact"))
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT, properties = {
        "server.port=10001"
})
public class UserLoginControllerProviderTest {

    @MockBean
    private UserMapper userMapper;

    @InjectMocks
    private UserService userService = new UserServiceImpl(userMapper);

    @InjectMocks
    private UserLoginController userLoginController = new UserLoginController(userService);

    @TestTarget
    public final Target target = new HttpTarget(10001);

    /**
    * 测试时，会从pact broker下载契约，验证state为user login state的契约
    * 验证时，conrtoller调用service再调用mapper
    * 此时数据库不一定有此数据，可使用mock，如下：
    */
    @State("user login state")
    public void toCreateCheckOauthState() {
        when(userMapper.select(any(User.class)))
                .thenReturn(Collections.singletonList(new User(10L,"alice","alice")));
    }
}
```