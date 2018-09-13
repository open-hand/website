+++
title = "日志输出"
description = "规范统一的日志输出会是必不可少的一部分"
weight = 7
+++

## 日志类型


### debug    
非常具体的信息，只能用于开发调试使用。部署到生产环境后，这个级别的信息只能保持很短的时间。这些信息只能临时存在，并将最终被关闭。要区分DEBUG和TRACE会比较困难，对一个在开发及测试完成后将被删除的LOG输出，可能会比较适合定义为TRACE级别。    
### info    
重要的业务处理已经结束。在实际环境中，系统管理员或者高级用户要能理解INFO输出的信息并能很快的了解应用正在做什么。比如，一个和处理机票预订的系统，对每一张票要有且只有一条INFO信息描述 “[Who] booked ticket from [Where] to [Where]”。另外一种对INFO信息的定义是：记录显著改变应用状态的每一个action，比如：数据库更新、外部系统请求。    
### warn    
这个问题又可以细分成两种情况：一种是存在严重的问题但有应急措施（比如数据库不可用，使用Cache）；第二种是潜在问题及建议（ATTENTION），比如生产环境的应用运行在Development模式下、管理控制台没有密码保护等。系统可以允许这种错误的存在，但必须及时做跟踪检查用户参数错误。可以使用warn日志级别来`记录用户输入参数错误`的情况，避免用户投诉时，无所适从。  
{{< note >}}发生这个级别问题时，处理过程可以继续，但必须对这个问题给予额外关注。{{</ note >}}
### error    
没有系统可以忍受这个级别的问题的存在。比如：NPEs（空指针异常），数据库不可用，关键业务流程中断等等。
{{< warning >}}系统中发生了非常严重的问题，必须马上有人进行处理。{{</ warning >}}

## 异常日志

1. 返回给前端接口统一抛出**io.choerodon.core.exception.CommonException**异常，这样返回给前端的状态码为200，前端通过**failed**是否为true判断成功与否。
1. 内部接口(用于被其他服务通过feign或ribbon调用的)，统一抛出**io.choerodon.core.exception.FeignException**异常，抛出异常时状态码为500，方便接口调用端“感知”异常。
1. 手动抛异常时应该把exception一块抛出，可以保留异常堆栈。

    ```
    try {
        String input = mapper.writeValueAsString(projectEventMsg);
        sagaClient.startSaga(PROJECT_UPDATE, new StartInstanceDTO(input, "project", "" + projectDO.getId()));
    } catch (Exception e) {
        throw new CommonException("error.projectService.update.event", e);
    }
    ```
1. 不允许记录日志后又抛出异常，因为这样会多次记录日志，只允许记录一次日志，应**尽量抛出异常，顶层打印一次日志**。  
1. 使用**SLF4J**中的API进行日志打印, 在一个对象中通常只使用一个Logger对象，Logger应该是static final的.  
 private static final Logger LOGGER= LoggerFactory.getLogger(Abc.class);  
1. 对trace/debug/info级别的日志输出，必须使用**占位符**的方式。  
    ```
    logger.debug("Processing trade with id: " + id + " symbol: " + symbol);
    ```
 如果日志级别是 warn，上述日志不会打印，但是会执行字符串拼接操作，如果 symbol是对象，会执行 toString()方法，浪费了系统资源，执行了上述操作，最终日志却没有打印。所以应该使用：
    ```
    logger.debug("Processing trade with id:{} and symbol : {} ", id, symbol);  
    ```
1. 输出的**POJO类必须重写toString**方法，否则只输出此对象的 hashCode值（地址值），没啥参考意义。  
1. 输出Exceptions的全部Throwable信息。  

    - LOGGER.error(e.getMessage());  错误,失掉StackTrace信息  
    - LOGGER.error("Bad things : {}",e.getMessage());  错误,失掉StackTrace信息  
    - **LOGGER.error("Bad things : {}",e);**  正确  

1. 不允许出现**System print**(包括System.out.println和System.error.println)语句。  
1. 不允许出现**printStackTrace**。堆栈打印应该
    ```
    LOGGER.error("Bad things : {}",e);
    ```


## 日志格式

1. 将[logback-spring.xml](../logback-spring.xml)放入 **src/main/resources/** 中。
2. **系统抛出的异常**不会附带traceid，如果需要输出traceid应该使用如下方式输出异常信息**logger.error("internal server error", e);**

