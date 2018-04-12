+++
title = "Redis 连接失败"
date = "2017-02-01"
draft = false
weight = 1
+++

# Redis 连接失败

- 确定redis是否正常启动于本机6379端口，运行 `telnet localhost 6379` 没有出错说明成功启动，否则检查redis安装
- 确定对应服务的 `spring.redis.host` 属性和 `spring.redis.port` 属性为 `localhost` 和 `6379`

# client设置重定向地址

在oauth2.0中一个client对应一个redirect_url，在hapcloud后端client表中有如下关键字段，name字段是客户端的名字，前端项目会设置客户端的name。所以当client表中web_server_redirct_url字段非空时必须与前端项目的地址相匹配。
![](../images/client.png)