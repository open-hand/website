
+++
title = "证书管理"
description = "域名证书是受法律认可的证书文件，确定了域名注册者对域名的拥有权与拥有时限。您在每个环境中添加的所有域名都需要有域名证书。"
weight = 8
+++

# 证书管理

域名证书是受法律认可的证书文件，用电子文书的形式，确定了域名注册者对域名的拥有权以及拥有时限，对于确立域名的归属有决定性的作用。您在每个环境中添加的所有域名都需要有域名证书。
    
  - **菜单层次**：项目层
  - **菜单路径**：部署流水线 > 证书管理
  - **默认角色**：项目所有者、项目成员、部署管理员
<blockquote class="note">
项目所有者和项目成员对域名证书只有查看界面的权限，不可进行创建和删除操作。
</blockquote>

## 创建证书  
![创建证书](/docs/user-guide/deployment-pipeline/image/c-create.png)
 
 1. 点击 `创建证书` ；

 2. 选择`环境`，只可选择运行中的环境，故障中的环境不可选；

 3. 填写`证书名称`，为该证书填写一个名称；  
 <blockquote class="warning">  证书名称：由小写字母、数字或‘-’组成，并且必须以字母或数字开始和结束！环境下唯一。</blockquote>

 
 4. 选择`参数配置`，选择类型为 `申请证书` 或是 `上传证书` ；
 
    - 申请证书:  
    ![申请证书](/docs/user-guide/deployment-pipeline/image/c-apply.png)
    
        - 选择了申请证书之后，只需输入域名。
    
            <blockquote class="warning">
              域名由小写字母，数字，'-'或'.'组成，以字母、数字开始和结束
            </blockquote>

        
    - 上传证书:  
    ![上传证书](/docs/user-guide/deployment-pipeline/image/c-upload.png)
    
        - 若选择上传证书，需要输入域名，并且上传与该域名关联的证书文件：包括一个key文件和一个cert文件。
              
            <blockquote class="warning">
              此处输入的域名必须与上传的证书文件相匹配
            </blockquote>


    
 5. 点击 `创建`完成证书的创建。


## 查看证书详情
 1. 进`部署流水线`后，点击`证书管理`，进入证书界面。通过列表，可以查看到证书名称、域名地址、所处的环境的名称、证书的有效期；
 2. 点击查看证书详情→ ![证书详情按钮](/docs/user-guide/deployment-pipeline/image/del_net_button.png)，可以查看证书的CommonName与DNS names。

  ![certificate](/docs/user-guide/deployment-pipeline/image/c-more.png)     
  
  - 证书名称：所创建的证书的名称。
  - 域名地址：所创证书的CommonName。  
  - 环境名称：该证书所处的环境的名称。
  - 有效期：该证书的有效期限。



## 删除证书

点击`删除证书` → ![删除证书按钮](/docs/user-guide/deployment-pipeline/image/del_net_button.png) 对该证书进行删除。

<blockquote class="note">
  环境状态为未连接时或网络状态是处理中时不可操作
</blockquote>

<blockquote class="warning">
  删除证书，将导致与该证书关联的所有域名失效！
</blockquote>

## 更多操作
- [域名管理](../ingress)
- [环境总览](../environments-overview)
- [环境流水线](../environment-pipeline)
- [容器管理](../container)
- [实例管理](../instance)


