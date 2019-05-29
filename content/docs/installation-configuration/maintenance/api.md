+++
title = "监控及日志维护"
date = "2019-05-27T13:47:28+08:00"
draft = false
weight = 12
+++

#### 如何清理历史日志

默认安装的日志组件不会自动清理历史日志，清理历史日志可以用[Timing](https://github.com/vinkdong/timing),安装之后使用如下配置删除历史日志，`now-720h`即删除720小时前的日志。

```bash
# ---
url: http://your-elasticsearch-host:9200/*/_delete_by_query
method: POST
header:
  "Content-Type": application/json
body:
  bodyone: |
    {
      "query": {
        "range": {
          "@timestamp": {
            "lte": "{{ .RenderRelativeTime "now-720h" "2006-01-02" }}T13:06:03.894Z"
          }
        }
      }
    }
run_every:
  hours: 1
log_response: true
```

#### Prometheus监控及告警配置

请参考[官方文档](https://prometheus.io/docs/introduction/overview/)

#### 如何绘制Grafana图标

请参考[官方文档](https://grafana.com/docs/)

#### 如何启用Skywalking

使用最新的微服务模板创建并打包的应用在启动前添加环境变量`SKYWALKING_OPTS: -javaagent:/agent/skywalking-agent.jar -Dskywalking.agent.service_name=state-machine-service`即可启用Skywalking。更多配置细节可以参考Skywalking[官方文档](https://github.com/apache/skywalking)
