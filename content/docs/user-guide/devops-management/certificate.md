
+++
title = "组织证书"
description = "域名证书是受法律认可的证书文件，确定了域名注册者对域名的拥有权与拥有时限。"
weight = 8
+++

# 证书管理

域名证书是受法律认可的证书文件，用电子文书的形式，确定了域名注册者对域名的拥有权以及拥有时限，对于确立域名的归属有决定性的作用。在组织层创建的证书可用于在项目层创建证书时使用。
    
  - **菜单层次**：组织层
  - **菜单路径**：DevOps管理 > 证书管理
  - **默认角色**：组织管理员
<blockquote class="note">
只有组织管理员有权限对组织证书管理页面进行编辑。
</blockquote>

## 创建证书  
![创建证书](/docs/user-guide/devops-management/image/c-create.jpg)
 
 1. 点击 `创建证书` ；
 
 2. 填写`证书名称`，为该证书填写一个名称；  
 <blockquote class="warning">  证书名称：由小写字母、数字或‘-’组成，并且必须以字母或数字开始和结束！组织下唯一。</blockquote>  

 3. 上传证书，需要输入域名，并且粘贴上传与该域名关联的证书文件内容：包括一个key文件和一个cert文件。

 ![上传证书](/docs/user-guide/devops-management/image/c-upload.jpg)  
 <blockquote class="warning"> 此处输入的域名必须与上传的证书文件相匹配，此处只能输入一个泛域名。</blockquote>  
 4. 证书权限分配：可选择证书公开范围，包括组织下所有项目与组织下特定项目。若选择组织下所有项目，那么表示在该组织所有项目中的环境下创建证书时都能选择此证书；若选择项目下特定项目，就表示只有在已勾选项目下的环境中创建证书时才能选择此证书。目前平台默认选择公开范围为：组织下所有项目。  

 ![证书权限分配](/docs/user-guide/devops-management/image/c-auth.jpg)  
 5. 点击 `创建`完成证书的创建。


## 查看证书详情
 进入`DevOps管理`后，点击`证书管理`，进入证书界面。通过列表，可以查看到证书名称、域名地址；

  ![certificate](/docs/user-guide/devops-management/image/c-create.jpg)     
  
  - 证书名称：所创建的证书的名称。
  - 域名地址：所创证书的CommonName。  


## 编辑证书
点击编辑证书→ ![证书编辑按钮](/docs/user-guide/devops-management/image/c-edit-button.jpg)，可以对证书的公开范围进行修改。  
![编辑证书](/docs/user-guide/devops-management/image/c-edit.jpg)

## 删除证书

点击`删除证书` → ![删除证书按钮](/docs/user-guide/deployment-pipeline/image/del_net_button.png) 对该证书进行删除。

<blockquote class="note">
 在项目下存在关联证书时，组织中的证书不可删除！
</blockquote>






