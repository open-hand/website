+++
title = "微服务维护"
description = "微服务的维护及一些对应的注意事项"
weight = 10

+++

## 常见问题

#### 如何查看日志
同上一节一致

#### 前端界面无响应

1. 查看choerodon-front的pod是否正常运行运行中
2. 检查域名dns是否有修改
3. 进入集群中检查choerodon-front的svc能否访问，检查防火墙

#### 权限异常

1. 权限初始化异常，尝试重启manager-service
2. 未执行初始化任务，执行helm upgrade命令并启动初始化任务

#### gitlab-service长时间处于非健康状态

1. 检查Gitlab Token是否正确或者在有效期内

