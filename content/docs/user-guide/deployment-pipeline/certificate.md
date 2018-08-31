+++
title = "证书管理"
description = "便于您查看和管理系统中的证书，可以申请或是上传证书内容。"
weight = 9
+++


# 证书管理

**证书管理**便于您查看和管理系统中的证书，可以申请或是上传证书内容。

  - **菜单层次**：项目层
  - **菜单路径**：部署流水线 > 证书
  - **默认角色**：项目所有者、项目成员、部署管理员
  
## 注意事项
   
- 每个域名 每周最多 50 个证书  `a.example.com` / `a.b.example.com` / `b.example.com` 都视为一个域名
- 每个证书最多包含 100 个域名 
- 同样的证书（域名集合相同）每周最多申请 5 次 
- renew 没有限制
- 每个账户每小时最多多可以申请失败 5 次
- /directory 接口每秒最多访问 40 次
- 每个 ip 每三小时最多创建 10 个账户

## 查看证书列表

1. 进入证书界面，通过列表信息查看证书；

1. 点击`证书`查看证书列表。

![certificate](/docs/user-guide/deployment-pipeline/image/certificate.png) 

- 证书名称：证书的名称；
- 域名地址：证书的主域名地址；
- 环境名称：证书所在的环境名称；
- 证书状态：证书的状态，包括`申请中`，`已生效`，`已过期`，`失败`；
- 证书详情：证书相关的域名信息等。
 
## 创建证书

- 点击`创建证书`，右侧弹出创建页面

- 选择环境，输入证书名称以及证书需要绑定的域名

- 参数类型分为`申请证书`和`上传证书`，具体示例如下图
    
    - 申请证书
    
        ![create certificate](/docs/user-guide/deployment-pipeline/image/create_certificate.png) 
        
    - 上传证书
    
        ![upload certificate](/docs/user-guide/deployment-pipeline/image/upload_certificate.png) 
        
## 删除证书

点击列表目标证书列最后的删除按钮，可以删除证书。

![delete certificate](/docs/user-guide/deployment-pipeline/image/delete_certificate.png) 

## 更多操作
- [环境总览](../environments-overview)
- [环境流水线](../environment-pipeline)
- [应用部署](../application-deployment)
- [实例管理](../instance)
- [容器管理](../container)