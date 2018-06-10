+++
title = "集成与测试"
date = "2018-04-27T15:58:28+08:00"
draft = false
weight = 4
+++

## 前提

在开发之前，请确保

* Demo程序已经开发完毕，详见 [开发Demo程序](../../demo/)
* 数据库创建成功，详见 [初始化数据库](../init/)
* Choerodon 的其他服务已经启动，详见[模块运行](../run/)

## Eureka服务发现

##### 如需添加Eureka服务发现，需在xxx.infra.util包下创建拓展数据配置类，并继承ExtraDataManager，以用于自动初始化路由。示例如下：
```java
@ChoerodonExtraData
public class CustomExtraDataManager implements ExtraDataManager {
    @Override
    public ExtraData getData() {
        ChoerodonRouteData choerodonRouteData = new ChoerodonRouteData();
        choerodonRouteData.setName("todo");
        choerodonRouteData.setPath("/todo/**");
        choerodonRouteData.setServiceId("choerodon-todo-service");
        extraData.put(ExtraData.ZUUL_ROUTE_DATA, choerodonRouteData);
        return extraData;
    }
}
```
* 在`bootstrap.yml`中添加关于Eureka的配置

```yaml
eureka:
  instance:
    preferIpAddress: true
    leaseRenewalIntervalInSeconds: 1
    leaseExpirationDurationInSeconds: 3
  client:
    serviceUrl:
      defaultZone: ${EUREKA_DEFAULT_ZONE:http://localhost:8000/eureka/}
```
##### 重启Todo服务
##### 如果上述步骤执行无误，可在本地的 `http://localhost:8000/` 查看注册成功的服务:

*  OAUTH-SERVER
*  API-GATEWAY-TEST
*  CHOERODON-TODO-SERVICE
*  REGISTER-SERVER
*  GATEWAY-HELPER

## swagger Api服务
* 使用swagger测试需启动manager-service模块，在docker-compose.yaml中加入此容器并重启所有模块

```yaml
manager-service:
    container_name: manager-service
    image: registry.cn-shanghai.aliyuncs.com/choerodon/manager-service:0.1.0
    ports:
    - "8963:8963"
```

**Note. 启动顺序：基础软件mysql、kafka等 ，eureka-server服务，manager-service，api-gateway，其余模块。**

- 打开 `http://localhost:8963/swagger-ui.html` 该地址端口号为Eurake上对应端口号

![](/docs/development-guide/backend/intergration/images/swaggerTest1.png)

* 打开任意一个api，点击右边红色的叹号对调用该api进行授权（勾选default scope）
* 在弹出界面输入用户名密码，本地默认为admin/admin
* 在这里便可以对controller中声明的api进行测试，这一步需启动gateway-helper

![](/docs/development-guide/backend/intergration/images/swaggerTest4.png)