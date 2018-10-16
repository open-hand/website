+++
title = "使用站内信"
description = ""
weight = 3
+++

## 前置条件

在开始使用定时任务之前，要确保服务的choerodon-starters依赖在0.6.4.RELEASE 版本及之上。

## 介绍

站内信系统是用于通知用户站内消息的一个小模块, 在用户登录之后, 个人中心旁边有个铃铛按钮, 点击即可进入站内信即可查看站内通知。基于websocket长连接和redis的pub/sub实现站内信功能。

## 站内信功能开发

### 添加依赖

```xml
<dependency>
    <groupId>io.choerodon</groupId>
    <artifactId>choerodon-starter-swagger</artifactId>
    <version>${choerodon.starters.version}</version>
</dependency>
```

### 定义模版

所在服务启用后定义的模版会被`notify-service`自动扫扫描到

```java
//继承PmTemplate，确保该bean被spring托管
@Component
public class TestPmTemplate implements PmTemplate {
    //业务类型
    @Override
    public String businessTypeCode() {
        return "test";
    }
    //模版code，需要唯一
    @Override
    public String code() {
        return "test";
    }
    //模版名称
    @Override
    public String name() {
        return "test";
    }
    //站内信标题
    @Override
    public String title() {
        return "测试";
    }
    //站内信内容。可以直接写内容字符串，或者指定内容文件
    //模版占位符为${变量名}，比如${userName}
    @Override
    public String content() {
        return "classpath://template/test.html";
    }
}
```

### 添加发送站内信代码，通过feign调用notify的发送站内信接口

curl调用发送站内信接口：
```
curl -X POST --header 'Content-Type: application/json' -d '{"code":"site-msg","id":233,"templateCode":"forgetPassword-preset","params":{"userName":"aaa"}}' 'http://api.staging.saas.hand-china.com/notify/v1/notices/ws'
```

调用发送站内信接口的feign定义：

```java
@FeignClient(name = "${choerodon.notify.service:notify-service}")
public interface NotifyClient {

    @PostMapping("/v1/notices/ws")
    void sendSitMsg(@RequestBody NotifySendDTO dto);

    class NotifySendDTO {
        private Long id;
        
        private String code;

        private String templateCode;

        private Map<String, Object> params;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }

        public String getTemplateCode() {
            return templateCode;
        }

        public void setTemplateCode(String templateCode) {
            this.templateCode = templateCode;
        }

        public Map<String, Object> getParams() {
            return params;
        }

        public void setParams(Map<String, Object> params) {
            this.params = params;
        }
    }
}
```

调用参数：

- code: 业务类型。站内信的业务类型为`site-msg`
- id: 业务id。站内信的业务id即为用户id。
- templateCode: 站内信模版code。
- params: 站内信模版渲染参数。



