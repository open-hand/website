+++
title = "swagger测试"
date = "2017-02-01"
draft = false
weight = 10
+++

# swagger测试

## Eureka服务发现

如果上述步骤执行无误，可在本地的 `http://localhost:8000/` 查看注册成功的服务:HAP-OAUTH-SERVER,HAP-API-GATEWAY-TEST,HAP-DEMO-SERVICE-TODO;

![](../images/eurekaService.png)

## swagger Api服务

- 打开 `http://localhost:8080/swagger-ui.html`

![](../images/swaggerTest1.png)

- 打开任意一个api，点击右边红色的叹号对调用该api进行授权

![](../images/swaggerTest2.png)

- 在弹出界面输入用户名密码，本地默认为admin/admin

![](../images/swaggerTest3.png)

- 在这里便可以对controller中声明的api进行测试

![](../images/swaggerTest4.png)