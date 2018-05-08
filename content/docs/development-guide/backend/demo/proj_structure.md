+++
title = "项目结构"
date = "2018-04-25T13:42:28+08:00"
draft = false
weight = 9
+++

## 项目结构
```bash
choerodon-todo-service-parent
└─choerodon-todo-service
   └─src
      ├─main
      │  ├─java
      │  │  └─io
      │  │      └─choerodon
      │  │          └─todo
      │  │              ├─api
      │  │              │  ├─controller
      │  │              │  │  └─v1
      │  │              │  └─dto
      │  │              ├─app
      │  │              │  └─service
      │  │              │      └─impl
      │  │              ├─domain
      │  │              │  ├─repository
      │  │              │  ├─service
      │  │              │  │  └─impl
      │  │              │  └─todo
      │  │              │      ├─convertor
      │  │              │      └─entity
      │  │              └─infra
      │  │                  ├─dataobject
      │  │                  ├─mapper
      │  │                  └─repository
      │  │                      └─impl
      │  └─resources
      │      ├─mapper
      │      └─script
      │          └─db
      └─test
          └─java
```


