+++
title = "资源视图"
description = ""
weight = 2
+++

# 资源视图

## 1. 概述

资源视图支持部署运维人员从环境资源的维度来查看与管理与其相关的所有资源。资源视图以树结构为基础，分为：环境层、资源列表层和资源详情层三个层级。在这三个层级中，用户能分别看到每个层级对应的功能与详情。

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-31.jpg)

## 2. 环境层

在资源视图的环境层中，主要展示了当前环境中所有资源的数量以及该环境对应的GitOps库的提交同步情况。以便运维人员能实时掌控各种资源的状态。

<blockquote class="note"> 
仅项目所有者和被分配环境权限的项目成员能在此处查看到该环境的资源信息。
</blockquote>

### 2.1 查看资源数量

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-32.png)

资源视图的环境层中展示了当前环境中实例、网络、域名、证书、配置映射、密文的数量。同时此处也显示了该环境下所有实例的状态。

### 2.2 查看提交同步情况
![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-33.jpg)

用户可在此查看当前环境对应的GitOps库的提交同步情况。

## 3. 资源列表层

### 3.1 资源操作

#### 3.1.1 创建操作


##### 3.1.1.1 手动部署

![image](/docs/user-guide/deploy/app-deploy/resource/images/deploy.png)  

1. 在树结构中点击进入实例列表页面，再点击顶部的`手动部署`按钮。

2. 选择服务来源；  
   - 项目应用服务：本项目下已有的应用服务；
   - 共享应用：组织内其他项目共享出来的应用服务；
  
3. 选择服务；
4. 选择需要部署的服务版本；
   - 选择应用服务版本时，只会在下拉框中显示近40条版本以供选择。若想部署其他版本，请直接在下拉框中精确搜索对应的版本选中即可。

5. 修改实例名称； 
   - 选择应用服务后，会默认生成对应的实例名称，且该名称支持自定义。   

6. 选择部署配置；（此处可以直接从已有的部署配置中进行选择并使用，或者直接在默认values的基础上进行修改）
    - 若项目中暂时没有所选应用和环境的部署配置，此时编辑器中会出现默认的初始values文件，用户可在此基础上进行修改。
    - 若选中一个部署配置，编辑器中会出现该部署配置中的配置信息，用户可直接使用，或者在此基础上进行修改。
    - 部署values目前有四种显示格式：
      - 新增：新增的参数行，显示绿色
      - 修改：修改values值后，显示为黄色块
      - 红色x: yaml格式错误的行，显示红色x
      - 未改变：默认色
      
    <blockquote class="note"> 
    在该编辑器模式中，yaml格式的校验是实时的，每次只会返回一个yaml格式错误，即使文件有多行报错。只有将上一个错误修改正确。 每修改一次部署values的值都会校验一次yaml格式，有错就会界面上用红色x提示，鼠标移到红色x上会显示具体的报错信息。yaml格式不正确不能点击下一步。但是当版本里面的values文件有yaml格式错误时，无法通过界面修改yaml格式错误，只能修改代码内的values文件并且生成新的版本，重新部署新的版本。
    </blockquote>  

7. 资源配置

完成上述步骤后，此时点击部署，便能在目标环境中成功部署所选的应用服务。若要为此次部署生成的实例配置网络和域名，以便能通过外部网络访问到该实例，只需在同一页面中点击 `资源配置`展开详情页面直接配置即可。

##### 3.1.1.2 创建网络

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-34.png)
 
 1. 在树结构中点击进入网络列表页面，再点击顶部的`创建网络`按钮。

 2. 填写 `网络名称`。
    网络名称只能由小写字母、数字、"-"组成，并且以小写字母开头，不能以"-"结尾，网络名称是环境下唯一。

 3. 选择`目标对象`，选择类型为`选择实例`、`填写标签`或是 `Endpoints`

    - 选择实例：选择该应用服务下相关的实例来关联网络；且只能选择单个实例或该应用服务相关的所有实例。
    
    - 填写标签：填写标签以应用到 `service.spec.selector` ，供 k8s 关联本集群的实例。  

    - Endpoints：填写目标IP以及目标端口，供k8s关联外部的实例。
 
 4. 选择`网络配置`，选择类型为 `ClusterIP`、`NodePort`或`LoadBalancer` 。
 
    - ClusterIP:
    
        - 外部IP为选填项，需要外部网络访问时填写。
    
            <blockquote class="warning">
              外部IP的值不能随意填写，必须是service所在集群节点的IP！
            </blockquote>

        - 端口号为实例service端口号，目标端口号为实例Pod端口号，用以配置网络的端口映射转发。
    
            <blockquote class="warning">
              端口号必须是数字且大小在0-65535之间
            </blockquote>
    - NodePort:
    
        - 节点端口为节点对外提供的端口，端口号为实例service端口号，目标端口号为实例Pod端口号，用以配置网络的端口映射转发。最后，可选择网络协议为TCP或UDP。
              
            <blockquote class="warning">
              节点端口号必须在30000-32767之间，端口号必须是数字且大小在0-65535之间
            </blockquote>
    - LoadBalancer:
    
        - 端口号为service端口号，目标端口号为实例Pod端口号，用以配置网络的端口映射转发。
              
            <blockquote class="warning">
              端口号必须是数字且大小在0-65535之间
            </blockquote>
 5. 点击 `创建`完成网络创建。
 
##### 3.1.1.3 创建域名

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-35.png)

1. 在树结构中点击进入域名列表页面，再点击顶部的 `创建域名`按钮。
2. 在创建页面，输入`域名名称`。
   域名名称由小写字母、数字、'-'组成，并且必须以字母、数字开始和结束。
3. 选择网络协议。
   目前支持选择 `普通协议`与 `加密协议`。若选择为 `普通协议`，则表示创建出的域名将不会使用特殊加密的安全方式，而选择为 `加密协议`后，则需要选择该项目下可用的域名证书，以此来作为域名加密的载体。
4. 填写域名地址。
   域名地址不能随意填写，必须指向集群的泛域名。

5. 填写路径、选择网络与端口。
    
   - 路径: 即子路径，同时每条路径与域名地址会组成唯一性校验。
   - 网络：资源视图中创建域名时，可选择该环境中所有的网络。
   - 端口：此处的端口指的是网络端口，只能从所选网络对应的端口中进行选择。

6. 域名创建成功后，将会出现在域名列表中，同时根据此域名就可以访问相应的服务。

##### 3.1.1.4 创建证书

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-36.png)

1. 在树结构中点击进入证书列表页面，再点击顶部的 `创建证书` ；

2. 填写`证书名称`，为该证书填写一个名称；

    证书名称由小写字母、数字或‘-’组成，必须以字母或数字开始和结束；且在环境下唯一。

3. 选择`参数配置`，选择类型为 `申请证书`、`上传证书`或是`选择证书` ；
 
    - 申请证书:  

    ![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-37.png)

    选择了申请证书之后，只需输入域名。但若是所选环境对应的集群并未安装CrtManager，则不能进行申请证书的操作。

    <blockquote class="note">
    此处的CrtManager为二开版本，并非官方版本；但自0.12.0版本后，CertManager的安装被集成到了agent里，agent会根据设置自行安装对应版本的CertManager。
            </blockquote>

        
    - 上传证书:  

    ![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-38.png)
    
    若选择上传证书，需要输入域名，并且粘贴上传与该域名关联的证书文件内容：包括一个key文件和一个cert文件。

     <blockquote class="note">        
    此处输入的域名必须与上传的证书文件相匹配
    </blockquote>

    - 选择证书:  

    ![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-39.png)

    勾选选择证书的选项后，首先需要在中已被组织授权的证书中选择一个证书，再在此证书的基础上添加域名。
              
4. 点击 `创建`完成证书的创建。

##### 3.1.1.5 创建配置映射

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-40.png)

1. 在配置映射列表中，点击 `创建配置映射` ；

2. 填写`配置映射名称`与 `配置映射描述`，为该配置映射填写一个名称并添加描述；

    - 配置映射名称由小写字母、数字或‘-’组成，必须以字母或数字开始和结束；且在环境下唯一。

3. 填写`键值对`，或是直接粘贴多行“键=值”格式的字段至任何键框中，来批量输入键值对 ；或者直接点击`编辑YAML`，便可以YAML格式进行编辑； 

    - 键：可以是任意的大小写字母，不能输入除"."、"-"和"_"以外的字符！且在同一个配置映射下键不能相同。  
    - YAML格式：YAML格式与键值对格式仅可在正确格式的情况下进行切换。
 
4. 点击 `创建`完成配置映射的创建。  

    - 高级功能：您可粘贴多行“键=值”格式的字段至任何键框中，以便于批量输入键值对。

##### 3.1.1.6 创建密文

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-41.png)
 
1. 在密文列表界面，点击顶部的 `创建密文` 按钮。
2. 填写`密文名称`与 `密文描述`。

    - 密文名称由小写字母、数字或‘-’组成，并且必须以字母或数字开始和结束。且在环境下唯一。

3. 填写`键值对`，或是直接粘贴多行“键=值”格式的字段至任何键框中，来批量输入键值对 ； 

    - 键可以是任意的大小写字母，不能输入除"."、"-"和"_"以外的字符，且在同一个配置映射下键不能相同。  
 
4. 点击 `创建`完成密文的创建。  

    - 高级功能：您可粘贴多行“键=值”格式的字段至任何键框中，以便于批量输入键值对。

##### 3.1.1.7 创建自定义资源

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-42.png)
 
1. 在自定义资源的列表界面，点击顶部的 `创建自定义资源` 按钮。

2. 选择 `添加模式`
     - 粘贴文件内容添加：直接将YAML文件中的内容粘贴在此处的输入框即可。
     - 直接上传文件添加：支持直接上传本地的YAML文件进行添加。

3. 点击 `创建`，完成对自定义资源的添加。


##### 3.1.1.8 创建PVC
1. 在PVC的列表界面，点击顶部的 `创建PVC` 按钮。右侧会弹出创建页面。

    ![image](/docs/user-guide/deploy/app-deploy/resource/images/create-pvc.jpg)

2. 输入PVC名称。
    - PVC名称：限制为30字符，由小写字母开头，只能包含小写字母、数字、“.”和“-”；且在集群和项目下唯一。

3. 选择访问模式。
    - ReadWriteOnce：该卷能够以读写模式被加载到一个节点上。  

    - ReadOnlyMany：该卷能够以只读模式加载到多个节点上。  
    - ReadWriteMany：该卷能够以读写模式被多个节点同时加载。 

4. 定义总量。  
   - 此处存储容量得数值仅支持填写整数，且单位可选：Mi、Gi与Ti。

5. 选择绑定的PV类型，目前支持选择NFS和HostPath类型的PV。  

6. 选择绑定PV。此处可选的为满足上述要求的PV，即：访问模式相符、PV存储容量大于等于总量、PV类型相符。  
 
   <blockquote class="note"> 
    注意：此处仅能选择已为该项目分配权限的PV，且一个PVC只能选择一个PV进行绑定。
   </blockquote>

 
#### 3.1.2 修改操作

##### 3.1.2.1 修改实例Values与变更实例

- 在实例的详情界面，点击顶部的 `修改Values`按钮，右侧会弹出配置信息的修改界面，修改后，点击下方的`部署`按钮，即可完成对该实例配置信息的修改。

- 在实例的详情界面，点击顶部的 `变更实例`按钮，右侧会弹出变更实例的界面，您可在此升级或回滚实例对应的应用服务版本。

##### 3.1.2.2 修改网络

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-43.png)

- 在网络列表中，选择一个网络，点击该网络的名称，右侧会弹出网络的修改界面；此处支持修改网络的目标对象以及网络配置。

- 或者在左侧的树结构中，点击某个网络名称后面的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_4db3cb6300ca47369bbf2512d2eabf3d_blob.png)图标，选择 `修改`，同样可以对网络进行修改。

<blockquote class="note"> 
若某个网络的目标对象不可用或是被删除后，需要在此手动修改其目标对象。
</blockquote>

##### 3.1.2.3 修改域名

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-44.png)

- 在域名列表中，选择一个域名并点击其名称，右侧会弹出域名的修改界面，此处支持修改域名的网络协议、路径、网络及端口。

- 或者在左侧的树结构中，点击某个域名名称后面的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标，选择 `修改`，同样可以对域名进行修改。


##### 3.1.2.4 修改配置映射

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-45.png)

- 在配置映射列表中，选择一个配置映射并点击其名称，右侧会弹出配置映射的修改界面，此处支持修改配置映射中的键值对或YAML文件。  
- 或者在左侧的树结构中，点击某个配置映射名称后面的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标，选择 `修改`，同样可以对配置映射进行修改。

##### 3.1.2.5 修改密文

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-46.png)

- 在密文列表中，选择一个密文并点击其名称，右侧会弹出密文的修改界面，此处支持修改密文中的键值对。  

- 或者在左侧的树结构中，点击某个密文名称后面的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标，选择 `修改`，同样可以对密文进行修改。

##### 3.1.2.6 修改自定义资源

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-47.png)

- 在自定义资源的列表中，选择一个自定义资源并点击其名称，右侧会弹出自定义资源的修改界面，此处支持修改自定义资源YAML文件中的内容。 

- 或者在左侧的树结构中，点击某个自定义资源名称后面的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标，选择 `修改`，同样可以对自定义资源进行修改。

#### 3.1.3 删除操作

##### 3.1.2.1 删除实例

在左侧树结构中选择一个启用或停用状态的实例，点击该实例后面的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标 ，选择 `删除实例`，操作成功后，该实例会从树结构中移除。

<blockquote class="warning"> 
删除实例会导致为该实例创建的service 和ingress 不可用，请谨慎操作！
</blockquote>

##### 3.1.2.2 删除网络

- 在列表中选择一个网络，点击网络后的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_4db3cb6300ca47369bbf2512d2eabf3d_blob.png)图标，选择 `删除`，即可删除对应的网络。

-  或者在左侧的树结构中，点击某个网络名称后面的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标，选择 `删除`，同样可以对网络进行删除。

<blockquote class="warning"> 
删除网络后，将导致与其关联的域名不可用！
</blockquote>

##### 3.1.2.3 删除域名

- 在列表中选择一个域名，点击域名后的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_4db3cb6300ca47369bbf2512d2eabf3d_blob.png)图标，选择 `删除`，即可删除对应的域名。

-  或者在左侧的树结构中，点击某个域名名称后面的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标，选择 `删除`，同样可以对域名进行删除。

##### 3.1.2.4 删除配置映射

- 在列表中选择一个配置映射，点击配置映射名称后的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_4db3cb6300ca47369bbf2512d2eabf3d_blob.png)图标，选择 `删除`，即可删除对应的配置映射。

-  或者在左侧的树结构中，点击某个配置映射名称后面的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标，选择 `删除`，同样可以对配置映射进行删除。

##### 3.1.2.5 删除密文

- 在列表中选择一个密文，点击密文后的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_4db3cb6300ca47369bbf2512d2eabf3d_blob.png)图标，选择 `删除`，即可删除对应的密文。

-  或者在左侧的树结构中，点击某个密文名称后面的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标，选择 `删除`，同样可以对密文进行删除。

##### 3.1.2.6 删除自定义资源

- 在列表中选择一个自定义资源，点击自定义资源后的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_4db3cb6300ca47369bbf2512d2eabf3d_blob.png)图标，选择 `删除`，即可删除对应的自定义资源。

-  或者在左侧的树结构中，点击某个自定义资源名称后面的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标，选择 `删除`，同样可以对自定义资源进行删除。

##### 3.1.2.6 删除PVC

- 在列表中选择一个非处理中状态的PVC，点击后的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_4db3cb6300ca47369bbf2512d2eabf3d_blob.png)图标，选择 `删除`，即可删除对应的PVC。

### 3.2 资源列表查看

#### 3.2.1 实例列表

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-48.png)

- 实例名称：即实例的名称。
- 版本：实例中正在运行的应用服务版本。
- 应用服务：实例对应的应用服务。
- Pods状态：实例中Pods当前的数量数量与状态。

#### 3.2.2 网络列表

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-49.png)

- 网络名称：即网络的名称。
- 目标对象类型：网络中配置的目标对象的类型，有 `实例`、`标签`和 `Endpoints`三种类型。
- 目标对象：即具体目标对象的名称。
- 配置类型：即网络的配置类型以及其中参数的具体信息。

#### 3.2.3 域名列表

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-50.png)

- 域名名称：即域名的名称。
- 地址：即域名的地址。
- 路径：即域名中包含的所有路径。
- 网络：域名关联的所有网络。

#### 3.2.4 证书列表

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-51.png)

- 证书名称：证书的名称。
- 域名地址：证书中对应的域名地址。
- 有效期：即该证书的有效期限。

#### 3.2.6 配置映射列表

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-52.png)

- 配置映射：配置映射的名称与状态。
- 键：配置映射中所有的键。
- 更新时间：该配置映射最近的更新时间。

#### 3.2.7 密文列表

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-53.png)

- 密文：密文的名称与状态。
- 键：密文中所有的键。
- 更新时间：该密文最近的更新时间。

#### 3.2.8 自定义资源列表

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-54.png)

- 名称：自定义资源的名称。
- 资源类型：自定义资源的类型。
- 更新时间：自定义资源最近的更新时间。

#### 3.2.9 PVC列表

![image](/docs/user-guide/deploy/app-deploy/resource/images/pvc-index.jpg)  


PersistentVolumeClaim（PVC）是用户存储的请求。 它类似于pod。Pod消耗节点资源，PVC消耗存储资源。

- PVC名称：包括了PVC的名称与状态
    - 目前PVC存在以下4种状态：
	  Pending：PVC未绑定PV时的状态，该状态的PVC不支持任何操作。  
      Operating：指DevOps向Agent发消息过程中的状态。该状态的PVC不支持任何操作。
	  Bound：表示该PVC已经与某个PV绑定。该状态的PVC支持删除操作。   
      Terminating：指Agent解析后发消息回来时的状态。该状态的PVC不支持任何操作。  

- 绑定PV：当前PVC绑定的PV。
- 访问模式：即PVC支持的访问模式。  
- 总量：即创建PVC时设置的总量。

## 4. 资源详情层

### 4.1 实例

资源视图的实例详情层中，支持用户在此查看某个实例的所有详情，其中包括实例的运行详情、实例事件、操作记录以及Pod的详情。此外，还能在此页面对实例进行变更、停用、启用以及删除的操作。

#### 4.1.1 运行详情

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-55.png)

运行详情页面展示了Chart 里定义的资源对象的参数信息，其中主要包括：Deployment、StatefulSet、DaemonSet、PVC、Ingress 与Service。

运行详情中支持显示以上资源对象的具体参数，但只会展示Chart包中已定义好的资源。

1. Deployment：包括Deployment的名称与创建时间，标签、端口号、ReplicaSet的上限数、当前实际数以及可用数。同时，还显示了其中Pods的数量与状态，并能在此页面直接完成Pod的增减。此外，点击下方的`查看更多详情`，会从右侧展开显示更多关于deployment详情。如：数据卷、健康检查、主机设置、环境变量。  
2. StatefulSet：包括StatefulSet的名称、更新时间、状态和Pod的数量与状态。
3. DaemonSet：包括DaemonSet的名称、更新时间、状态和Pod的数量与状态。
4. PVC：包括PVC的名称、状态、资源请求大小、访问模式和更新时间。
5. Ingress：包括name（Ingress的名称）、hosts（Ingress主机host）、address（地址）、ports（端口）。  
6. Service：name（Service的名称），type（service的类型）、cluster-ip（节点ip）、external-ip（外部ip）、ports（端口）、age（创建时间）。

#### 4.1.2 实例事件

![image](/docs/user-guide/deploy/app-deploy/resource/images/instance-command.jpg)

实例事件标签页中包括了该实例所有的操作记录，同时还支持查看当前实例最近四个版本的job与deployments的事件及其对应的日志；主要用于开发或部署人员查看应用服务部署的进度、状态以及记录。
         
> - 鼠标移动到某个job模块时，在右上角会hover出该job的日志详情按钮，点击即可进入查看job日志。
> - 在“生效”的操作后面，会有一个特殊的标签。

#### 4.1.3 Pod详情

Pod详情页面主要用于查看和管理系统中的容器化实例，用户可在此实时查看相关 Pod 的状态以确定应用服务是否正常运行，同时可以查看对应的 Pod 日志进行错误定位和状态监控。

##### 4.1.3.1 查看容器详情

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-57.png)

1. 点击 `Pod详情`进入Pod与容器的管理界面，可以通过列表信息观察Pod与容器的状态、Pod IP、可用情况以及创建时间；
    - Pod：此处包含了Pod的可用状态与名称；
    - 容器：即Pod中所含的Container；
    - Pod IP：Pod的地址；
    - 创建时间：容器创建的时间；  

2. 点击Pod名称后的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标，选择 `容器日志`，即可查看对应Pod中所有容器的日志。  
 
    ![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-58.png)
 
3. 点击Pod名称后的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标，选择 `运行命令`， 即可使用shell命令操作该容器。

    ![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-59.png)  


4. 点击Pod名称后的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标，选择 `删除Pod`， 即可关闭删除当前Pod，并且会在此基础上重启一个新的Pod。

#### 4.1.3.2 Pod 状态

Pod的状态分为以下五种，分别为 Pending、Running、Succeeded、Failed 和 Unknown。

1. Pending：Kubernetes 已经开始创建容器，但是容器中的一个或多个容器还没有被启动。比如容器正处在应该被分配到哪个节点上这个调度过程中，或者 Kubernetes 还在从镜像仓库中下载容器中容器镜像这个下载过程中。

2. Running：Kubernetes 已经将容器分配到节点上，并且容器中的所有容器都启动了。还包括容器中至少有一个容器仍然在运行状态，或者正在重新启动状态。

3. Succeeded：容器中的所有容器都处在终止状态，并且这些容器是自主正常退出到终止状态的，也就是退出代码为0，而且 Kubernetes 也没有重启任何容器。

4. Failed：容器中的所有容器都处在终止状态，并且至少有一个容器不是正常终止的，也就是退出代码不为0，或者是由于系统强行终止的。

5. Unknown：由于一些特殊情况无法获取容器状态，比如由于网络原因无法同容器所在的主机通讯等。

> Pod与Container名称前的状态标志表示了各自的可用状态，只有当Pod内所有Container均可用时，Pod才为可用状态；而Pod的运行中状态与可用状态无特别联系。

#### 4.1.4 实例操作

在实例层，除了能查看以上的信息之外，还能在此处对实例进行各种操作，其中包括：修改Values、变更实例、重新部署、停用/启用实例以及删除实例。

##### 4.1.4.1 修改Values

点击顶部的 `修改Values`按钮，右侧会弹出配置信息的修改界面，修改后，点击下方的`部署`按钮，即可完成对该实例配置信息的修改。

##### 4.1.4.2 变更实例

点击顶部的 `变更实例`按钮，右侧会弹出变更实例的界面，您可在此升级或回滚实例对应的应用服务版本。

##### 4.1.4.3 重新部署

点击顶部的 `重新部署`按钮，会弹出确认弹框，点击确定后，便能重新按照当前的配置参数重新部署该实例，适用于因为网络等原因部署失败的情况。

#### 4.1.4.4 停用/启用实例

1. 在左侧树结构中选择某个处于运行状态的实例，点击该实例后面的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标 ，选择`停用实例`，操作成功后，该实例即为停用状态，且容器状态停止。

2. 在左侧树结构中选择某个处于停用状态的实例，点击该实例后面的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标 ，选择`启用实例`，操作成功后，该实例即为启用状态。

#### 4.1.4.5 删除实例

在左侧树结构中选择一个启用或停用状态的实例，点击该实例后面的![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7671a4afc2b040c2b315cadbfa688727_blob.png)图标 ，选择`删除实例`，操作成功后，该实例会从树结构中移除。

> 删除实例会导致为该实例创建的service 和ingress 不可用，请谨慎操作！

#### 4.1.4.6 实例操作状态

实例操作状态指的是该实例最近一次操作的状态，而不同的操作状态可以执行不同的操作。具体细节如下所示：

操作状态|修改Values|重新部署|启用实例|停用实例|删除实例
----|----|----|----|----|----
创建中|✔|
创建成功|✔|✔|✔| |✔|✔
创建失败|✔|✔|✔| | |✔
更新中|✔|
更新完成|✔|✔|✔| |✔|✔
更新失败|✔|✔|✔| |✔|✔
停用中|✔| | | | |
停用完成|✔|✔||✔| |✔
停用失败|✔|✔|✔||✔|✔
启用中|✔| | | |
启用完成|✔|✔|✔| |✔|✔
启用失败|✔|✔||✔| |✔
删除中|✔|  

### 4.2 网络

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-60.png)

网络是一种管理内部服务连通方式的策略，用于实现容器内部资源的负载均衡以及流量转发。配置后，平台会将网络流量定向转发到指定的单个或者多个实例容器组，完成服务的连通与流转。  

#### 4.2.1 端口

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-61.png)

- 端口：指的是实例Service 端口号。
- 协议：即网络通信协议，分为TCP与UDP两种。
- 目标端口：指的是实例Pod的端口号。

#### 4.2.2 负载

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-62.png)

网络层的负载模块主要展示了与此网络相关的实例的状态与信息。

> 只有目标对象为 `实例`的网络才会显示负载模块；即目标对象为 `标签`或 `Endpoints`的网络，将不可见此模块。

#### 4.2.3 Pods

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-63.png)

网络层的Pods模块主要展示了与该网络相关的所有Pod的详细信息，其中包括：Pod名称、Pod IP、节点、容器（Container）、镜像以及该Pod对于CPU和内存的使用量。

> 只有目标对象为 `实例`和 `标签`类型的网络才会显示Pods模块，`Endpoints`类型的网络不含此模块。

### 4.3 域名

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-64.png)

域名是用户通过浏览器可以从外部访问系统内部应用程序的地址。用户可以在此配置已
经预定义好的域名，使外部能够通过指定的域名访问到系统内部的实例。

域名层中展示了该域名的域名地址、路径、关联的网络、端口以及注解（Annotations）。

### 4.4 证书

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-65.png)

证书是遵守某种网络安全协议，具有服务器身份验证和数据传输加密功能的数字证书。此处的证书可用于在平台中创建加密类型的域名。

证书层中展示了该证书中的域名地址以及当前与之关联的所有域名。

### 4.5 配置映射

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-66.png)

配置映射是用来存储配置文件的Kubernetes资源对象，其中存储的键值对可以在pods中使用。

配置映射的详情界面展示了其中键值对的内容。 

### 4.6 密文

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-67.png)

密文是用来保存小片敏感数据的Kubernetes资源对象，例如密码，token，或者密钥。 
 
密文的详情界面以密文的形式展示了其中键值对的内容。

### 4.7 自定义资源

![image](/docs/user-guide/deploy/app-deploy/resource/images/resource-68.png)

自定义资源是指通过除c7n-release类型的YAML文件在平台中部署后生成的实体。

自定义资源的详情界面展示了其中的Description。

## 5. 阅读更多

- [部署](../../deploy)
- [流水线](../../pipline)
- [环境配置](../../../env-config)
