+++
title = "权限及相关数据初始化及菜单添加"
date = "2017-02-01"
draft = false
weight = 8
+++
# 权限及相关数据初始化及菜单添加
gateway在拉取各个资源服务的api接口文档时会初始化相关权限数据。拉取方式分为自动和手动。

当我们直接访问gateway的swagger页面时，会访问到资源服务的/api/doc接口，此时gateway会根据该服务的api文档初始化权限相关数据。

资源服务在注册中心注册时，会发出一个消息，gateway会监听这个消息会在后台自动拉取该资源服务的api接口文档。

代码初始化时只会初始化表中一些关键字段，其余字段完善需要人工完善
## service表与service_tl表
当hap-demo-service初始化后，会在service表中插入一条数据，但是name字段等需要手动添加。
![](../images/service_init.png)

同样在service_tl多语言表中完善相应数据，其中id字段对应service表的id。

![](../images/service_tl.png)
## role表
role表需完善decription字段，否则前段界面显示不出该角色中文描述
![](../images/role.png)
## 添加菜单
如要在界面上添加新的菜单，需要新建初始化数据的excel，通过初始化数据库工具初始化数据。格式如同hap-user-service的数据库初始化excel。其中表中service_id表示该菜单所挂载的服务。menu_level表示该菜单挂载在组织层还是项目层.如果直接在数据库表中操作则需要注意同时修改menu表和menu_tl表。

