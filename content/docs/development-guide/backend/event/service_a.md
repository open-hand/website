+++
title = "event-helper"
date = "2017-11-17"
draft = false
+++

### 添加hap-event-helper依赖
```xml
<dependency>
    <groupId>com.hand.hap.cloud</groupId>
    <artifactId>hap-event-helper</artifactId>
    <version>1.0.0-Release</version>
</dependency>
```

### 提供事件系统回查接口
当业务A服务A宕机等，长时间未向事件系统(hap-event-store-service)发送请求,事件系统会向次接口发送请求，以确定取消事件还是确认事件。
```java
@GetMapping("/v1/api/eventRecords/{id}/{type}")
    public ResponseEntity<EventRecord> queryEventStatus(@PathVariable String id,
                                                        @PathVariable String type){
        return new ResponseEntity<>(service.queryEventStatus(id, type), HttpStatus.OK);
    }
```

### 向事件系统发送请求demo
```java
@Override
    public boolean createTrade(TradeDto tradeDto) throws Exception {
        //1. 生成全局uuid
        String uuid = EventTools.generateUuid();
        //2. 创建event
        Event event = new Event();
        event.setUuid(uuid);
        //3. 设置本服务的服务名(用于事件系统回查)
        event.setPublisherServiceId("hap-event-demo-trade-service");
        
        //4. 要发送到消息队列的消息，该消息必须含有uuid字段！！！
        TradeAmqp payload = new TradeAmqp(uuid, tradeDto.getAmount(), tradeDto.getBuyerId(), tradeDto.getSellerId());
        //5. 传入要写入消息队列的topic和消息体
        Event.Message message = new Event.Message("trade", mapper.writeValueAsString(payload));
        event.setMessages(Collections.singletonList(message));
        event.setType(EVENT_TYPE_TRADE);

        boolean result =  eventTemplate.execute(() -> {
            //6. 业务员A的执行逻辑。。。
        },event);
        //7. 通过result判断是否创建事件成功
        if (!result){
            throw new HapException("error.trade.create");
        }
        return true;
    }
```
---

## demo
- [hap-event-demo-trade-service](https://rdc.hand-china.com/gitlab/HAPCloud/hap-event-demo-parent/tree/master/hap-event-demo-trade-service)
