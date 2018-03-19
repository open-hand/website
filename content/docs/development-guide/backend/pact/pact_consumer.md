+++
title = "服务消费端"
date = "2017-11-29"
draft = false
weight = 3
+++

## 添加依赖
```xml
<dependency>
  <groupId>au.com.dius</groupId>
  <artifactId>pact-jvm-consumer-junit_2.11</artifactId>
  <version>3.5.10</version>
</dependency>
```

## 契约和测试的编写
- Step1. feign部分定义pact契约, 同样调用feign的service也在这里测试

```java
@RunWith(SpringRunner.class)
@SpringBootTest(properties = {
        "user-service.ribbon.listOfServers: localhost:10001"
})
public class UserLoginConsumerPactTest {
    /**
     * 此处起了一个server,用于模拟feign调用的服务
     */
    @Rule
    public PactProviderRuleMk2 stubProvider = new PactProviderRuleMk2("user_provider",
            "127.0.0.1", 10001, this);

    @Autowired
    private UserLoginFeignClient userLoginFeignClient;


    @Autowired
    private OauthService oauthService;

    /**
    * 定义pact契约
    */
    @Pact(state = "user login state", provider = "user_provider", consumer = "userLoginFeignClient")
    public RequestResponsePact loginPact(PactDslWithProvider pactDslWithProvider) {
        return pactDslWithProvider
                .given("user login state")
                .uponReceiving("user login by name and pass")
                    .path("/login")
                    .matchQuery("name", "alice")
                    .matchQuery("pass", "alice")
                    .method("GET")
                .willRespondWith()
                    .status(200)
                    .body("{\"code\":1,\"message\":\"name pass valid\",\"data\":\"success\"}",
                            "application/json; charset=UTF-8")
                .toPact();
    }

   /**
    * 验证一下定义pact契约的接口
    */
    @Test
    @PactVerification(fragment = "loginPact")
    public void verifyLoginPact() {
        Result<String> result = userLoginFeignClient.login("alice","alice");
        System.out.println(result);
        Assert.assertEquals(1, result.getCode());
    }

    /**
    * 调用feign的service也在这里测试
    */
    @Test
    @PactVerification(fragment = "loginPact")
    public void checkOauthTest() {
        ResponseEntity<Result<String>> responseEntity = oauthService.checkOauth("alice","alice");
        System.out.println(responseEntity.getBody());
        Assert.assertEquals(1, responseEntity.getBody().getCode());
    }

    /**
    * 调用feign的service也在这里测试
    */
    @Test
    @PactVerification(fragment = "loginPact")
    public void getOauthJwtTest() {
        ResponseEntity<Result<String>> responseEntity = oauthService.getOauthJwt("alice","alice");
        System.out.println(responseEntity.getBody());
        Assert.assertEquals(1, responseEntity.getBody().getCode());
    }
}
```

- Step2. 其他部分的测试可使用mock方式进行单元测试。

- Step3. 运行测试类，会在target/pacts中生成契约json文件。

- Step4. 上传契约文件到pact broker.
    1. maven添加插件

        ```xml
        <plugin>
        <groupId>au.com.dius</groupId>
        <artifactId>pact-jvm-provider-maven_2.12</artifactId>
        <version>3.5.10</version>
        <configuration>
            <pactBrokerUrl>http://localhost:80</pactBrokerUrl>
            <pactBrokerPassword>pact</pactBrokerPassword>
            <pactBrokerUsername>pact</pactBrokerUsername>
        </configuration>
        </plugin>
    ```
    2. 上传契约

        ```
        mvn pact:publish
        ```
