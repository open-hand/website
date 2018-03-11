+++
title = "pact使用优化"
date = "2017-11-29"
draft = false
weight = 5
+++

## 动态配置pact broker

- pact验证时的broker配置

```java
@PactBroker(host = "${pactbroker.hostname}", port = "${pactbroker.port}",
        authentication = @PactBrokerAuth(username = "${pactbroker.auth.username}",
                password = "${pactbroker.auth.password}"))
```

- maven的pom配置

```xml
<properties>
  <pact.hostname>localhost</pact.hostname>
  <pact.port>80</pact.port>
  <pact.auth.username>pact</pact.auth.username>
  <pact.auth.password>pact</pact.auth.password>
</properties>

<plugin>
  <groupId>au.com.dius</groupId>
  <artifactId>pact-jvm-provider-maven_2.12</artifactId>
  <version>3.5.10</version>
  <configuration>
    <pactBrokerUrl>http://${pact.hostname}:${pact.port}</pactBrokerUrl>
    <pactBrokerPassword>${pact.auth.username}</pactBrokerPassword>
    <pactBrokerUsername>${pact.auth.password}</pactBrokerUsername>
   </configuration>
</plugin>

<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-surefire-plugin</artifactId>
  <version>2.16</version>
  <configuration>
    <systemPropertyVariables>
      <pactbroker.hostname>${pact.hostname}</pactbroker.hostname>
      <pactbroker.port>${pact.port}</pactbroker.port>
      <pactbroker.auth.username>${pact.auth.username}</pactbroker.auth.username>
      <pactbroker.auth.password>${pact.auth.password}</pactbroker.auth.password>
    </systemPropertyVariables>
    <testFailureIgnore>false</testFailureIgnore>
 </configuration>
</plugin>
```

- 在ci中替换变量

```
mvn clean package -DskipTests=false -Dpact.hostname=192.165.18.4
```
