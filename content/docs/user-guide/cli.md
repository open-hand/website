+++
title = "Choerodon CLI工具"
description = "CLI工具主要面向开发人员，支持使用命令行的方式来执行平台中的页面操作。"
weight = 13
+++

# Choerodon CLI工具

Choerodon CLI工具主要面向开发人员，支持使用命令行的方式来执行平台中的页面操作。在使用Choerodon的CLI工具前，需要做以下准备。

## 准备操作
#### 1、下载CLI工具  
- 首先需要下载CLI安装包，请下载0.17.0版本或者更高版本,下载地址如下：https://file.choerodon.com.cn/choerodon-install/c7nctl
- 下载至本地后，将其解压至可执行文件bin目录下即可。
  

##### 2、创建client

由于cli工具在访问choerodon平台的时候需要授权，所以采用password类型的oauth2方式去获取  token

需要去choerodon平台的组织下创建客户端，具体设置如下
![image](https://minio.choerodon.com.cn/knowledgebase-service/file_c0a606d4656d40ea8192bb5f9ae74401_blob.png)

## .c7n.yaml 配置文件

```
Contexts:
- Name: staging
  Server: http://exapmle.hand-china.com
  User:
    OrganizationCode: ""
    OrganizationId: 0
    ProjectCode: ""
    ProjectId: 0
    Token: ""
    UserName: ""
- Name: uat
  Server: http://exapmle2.hand-china.com
  User:
    OrganizationCode: ""
    OrganizationId: 0
    ProjectCode: ""
    ProjectId: 0
    Token: ""
    UserName: ""
CurrentContext: staging
```

| 配置 | 说明 | 是否可选 |
| --- | --- | ---- |
| Contexts [] | 上下文 |  |
| Contexts [].Name | 上下文名称 | 必须配置 |
| Contexts [].Server | 猪齿鱼平台地址 | 必须配置 |
| Contexts [].User | 操作用户 |  |
| Contexts [].User.OrganizationCode | 组织code | 可选，用户可在命令行中操作回写 |
| Contexts [].User.OrganizationId | 组织ID | 可选，用户可在命令行中操作回写 |
| Contexts [].User.ProjectCode | 项目code | 可选，用户可在命令行中操作回写 |
| Contexts [].User.ProjectId | 项目ID | 可选，用户可在命令行中操作回写 |
| Contexts [].User.Token | aouth验证token | 不用配置，用户登录后自动回写 |
| Contexts [].User.UserName | 用户名 | 不用配置，用户登录后自动回写 |
| CurrentContext | 当前命令行所处上下文 | 必须配置，与Contexts[].Name对应 |

## 登录

使用c7nctl登录之前，必须在用户根目录下创建.c7n.yaml配置文件

```
    ./c7nctl login
```

-U  用户名  -P 密码  --url  平台gateway地址

登陆完之后，会在用户根目录的回写部分信息，该文件为当前用户的信息，用于后续操作的授权，如果没有登陆然后去操作命令，会提示需要登陆，文件内容为：

```
    OrganizationCode: choerodon-01
    OrganizationId: 507
    ProjectCode: devops-19-b2
    ProjectId: 999
    Token: d4d92f34-57bd-4ce0-a7f5-2de31ef92750
    UserName: "25147"
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_852a006ccf1c40fea8180d5f58a7e4de_blob.png)

## 登出

```
    ./c7nctl logout
```

登出之后，会清空.c7n.yaml文件，登出之后进行命令操作会提示需要 登陆
![image](https://minio.choerodon.com.cn/knowledgebase-service/file_33f63e0a3c4643d2b95d8c99d70855a8_blob.png)

## 查询用户有权限的组织

```
    ./c7nctl get org
```

结果如下:

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_1324dd29e9dc4e819ac689a96b97b351_blob.png)

## 修改上下文中用户默认的组织，默认的组织用于后续命令的默认组织

```
    ./c7nctl use org -o xxx
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_2ebe2a7bb3c9400681ac94d46236e69c_blob.png)

## 查询用户有权限的项目

```
    ./c7nctl get proj
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_a34765aebf7d4abebad457996e824c08_blob.png)

## 修改上下文中用户默认的项目，默认的项目用于后续命令的默认项目

```
    ./c7nctl use proj -p xxx
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_94a3ee4a3b024a079433b0da4677bb0a_blob.png)

## 查询运维项目集群

```
    ./c7nctl get cluster -p xxx(-p 非必输)
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_4237bb9303ec4d428453c7999f749683_blob.png)

## 创建运维项目集群

```
    ./c7nctl create cluster --name xxx --code xxx --description xxx  -p xxx(-p 非必输)
```
![image](https://minio.choerodon.com.cn/knowledgebase-service/file_fd243dffbd474b2383de80384564b386_blob.png)

## 查询集群节点

```
   ./c7nctl get node -c xxx -p xxx(-p 非必输)
   
   -c: 集群code
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_377f01f49371415987c8dfe71ef9c0f0_blob.png)

## 查询项目应用服务

```
   ./c7nctl get app -p xxx(-p 非必输)
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_dfcf90c3ef404b1eade695735af279b0_blob.png)

## 查询应用服务版本

```
   ./c7nctl get app-version -c xxx -p xxx(-p 非必输)
   
   -c: 应用code
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_eff2c4f57a674eaeb4e50e78a45ab460_blob.png)

## 创建项目应用服务

```
    ./c7nctl create app --name xxx --code xxx --type xxx --templateAppServiceId xxx  --templateAppServiceVersionId xxx(--templateAppServiceId --templateAppServiceVersionId 非必须)
```

如果要从其他已经存在的应用进行引用，那么需要指定templateAppServiceId和templateAppServiceVersionId


| 参数 | 解释 |
| --- | --- |
| env | 环境code |
| type | 应用类型 normal或者test |
| templateAppServiceId | 应用id |
| templateAppServiceVersionId | 应用发布的版本id |
![image](https://minio.choerodon.com.cn/knowledgebase-service/file_1f51b92fac134ebd87f3afd3f87a0b68_blob.png)

## 查询环境列表

```
    ./c7nctl get env -p xxx(-p 非必输)
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_248b353268ae437e80b9471208c1f7ec_blob.png)

## 创建环境

```
    ./c7nctl create env --name xxx --code xxx --cluster xxx --description(非必须) -p xxx(-p 非必输)
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_7444efbd18f84d2b8453d0b104f72913_blob.png)

## 查询实例列表

```
    ./c7nctl get instance -e xxx -p xxx(-p 非必输)
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_67b2cd45267d40f182fb8c072f351fa7_blob.png)

## 查询实例部署的value列表，并下载到本地

```
    ./c7nctl get value -e xxx -p xxx(-p 非必输)
    
    保存路径是用户目录下的 c7nctl/value/
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_11f267afdf554f6a86a78d116657a41e_blob.png)
![image](https://minio.choerodon.com.cn/knowledgebase-service/file_515f5ff547c8466cb11e37de4ff7b78d_blob.png)

## 创建实例

```
    ./c7nctl create instance --env xxx --appServiceId xxx --appServiceVersionId xxx --instanceName xxx --valueFile xxx -p xxx(-p 非必输)
```

| 参数 | 解释 |
| --- | --- |
| env | 环境code |
| instanceName | 实例名称 |
| appServiceId | 应用ID |
| appServiceVersionId | 应用实例版本ID |
| valueFile | 部署配置文件，填写绝对路径 |

## 查询网络

```
    ./c7nctl get service --env xxx -p xxx(-p 非必输)
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_9f2453b5d69d4dd5be88afe9d21b480c_blob.png)

## 创建网络

```
    ./c7nctl create service --env xxx --file xxx -p xxx (-p 非必输, file是绝对路径)
```

```
---
apiVersion: v1
kind: Service
metadata:
  annotations:
    choerodon.io/network-service-instances: spring-test-15ae5+spring-test-d43f5+spring-test-97935+spring-test-1234
    choerodon.io/network-service-app: gogo
  labels:
    choerodon.io/network: service
  name: spring-aklfjasdklfjssss
spec:
  externalIPs:
  - 172.18.2.11
  ports:
  - name: http1
    port: 9999
    protocol: TCP
    targetPort: 9999
  sessionAffinity: None
  type: ClusterIP
  selector:
    app: test
    test: app
```

> 注意，创建Service的配置文件中需要两个注解，分别是choerodon.io/network-service-instances和choerodon.io/network-service-app，分别表示实例名称和应用名称

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_22ea407784fa4a128fc9342f8b50d8bb_blob.png)

## 查询域名

```
   ./c7nctl get ingress --env xxxx
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_35239cb9508341cebc12339328b012c2_blob.png)

## 创建域名

```
    ./c7nctl create ingress --env xxx --file xxx -p xxx (-p 非必输, file是绝对路径)
```

```
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  annotations: {}
  labels:
    choerodon.io/network: ingress
  name: c7ncli-test
spec:
  rules:
  - host: 2223.c7nctl-test.com
    http:
      paths:
      - backend:
          serviceName: test-test
          servicePort: 4321
        path: /
  tls:
  - hosts:
    - 2223.c7nctl-test.com
    secretName: asdf
```

> 创建域名的前提是有成功创建的Service，并且serviceName指定为成功创建的service的name

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_9853edc35ab6457e8050284a067ce14a_blob.png)

## 查询证书

```
    ./c7nctl get cert  --env xxxx -p xxx(-p 非必输)
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_efdfd87f70044a22a057d86547ef4f29_blob.png)

## 创建证书

```
    ./c7nctl create cert --env xxx --file xxx -p xxx (-p 非必输, file是绝对路径)
```

```
---
apiVersion: certmanager.k8s.io/v1alpha1
kind: Certificate
metadata:
  name: c7nctl-cli-test
  namespace: staging-test
spec:
  commonName: 1.c7nctl-test.com
  dnsNames:
  - 2.c7nctl-test.com
  - 3.c7nctl-test.com
  - 4.c7nctl-test.com
  existCert:
    cert: |
      -----BEGIN CERTIFICATE-----
      MIICYTCCAcoCCQCs45mePIbzRTANBgkqhkiG9w0BAQUFADB1MQswCQYDVQQGEwJV
      UzENMAsGA1UECAwETWFyczETMBEGA1UEBwwKaVRyYW5zd2FycDETMBEGA1UECgwK
      aVRyYW5zd2FycDETMBEGA1UECwwKaVRyYW5zd2FycDEYMBYGA1UEAwwPd3d3LjU5
      MXdpZmkuY29tMB4XDTE4MTAxNzAyMTA0OFoXDTI4MTAxNDAyMTA0OFowdTELMAkG
      A1UEBhMCVVMxDTALBgNVBAgMBE1hcnMxEzARBgNVBAcMCmlUcmFuc3dhcnAxEzAR
      BgNVBAoMCmlUcmFuc3dhcnAxEzARBgNVBAsMCmlUcmFuc3dhcnAxGDAWBgNVBAMM
      D3d3dy41OTF3aWZpLmNvbTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAtxtP
      cxgppTHrbzWloh26fXfIyLZI+YpNMCnJ+4wcv3jnZZ6OZsvnoo0z/yl/A9kDY9r5
      Rft9fwE4WKMSPNKlGd4psPLw1XNHAXhi8RAy1cHgkBMuwor6ZJhFgnsqKk4Xp68D
      jaCI2oxu2SYIBU67Fxy+h7G5BsWKwARtj5kP8NECAwEAATANBgkqhkiG9w0BAQUF
      AAOBgQC2Pko8q1NicJ0oPuhFTPm7n03LtPhCaV/aDf3mqtGxraYifg8iFTxVyZ1c
      ol0eEJFsibrQrPEwdSuSVqzwif5Tab9dV92PPFm+Sq0D1Uc0xI4ziXQ+a55K9wrV
      TKXxS48TOpnTA8fVFNkUkFNB54Lhh9AwKsx123kJmyaWccbt9Q==
      -----END CERTIFICATE-----
    key: |
      -----BEGIN RSA PRIVATE KEY-----
      MIICXgIBAAKBgQC3G09zGCmlMetvNaWiHbp9d8jItkj5ik0wKcn7jBy/eOdlno5m
      y+eijTP/KX8D2QNj2vlF+31/AThYoxI80qUZ3imw8vDVc0cBeGLxEDLVweCQEy7C
      ivpkmEWCeyoqThenrwONoIjajG7ZJggFTrsXHL6HsbkGxYrABG2PmQ/w0QIDAQAB
      AoGBAIxvTcggSBCC8OciZh6oXlfMfxoxdFavU/QUmO1s0L+pow+1Q9JjoQxy7+ZL
      lTcGQitbzsN11xKJhQW2TE6J4EVimJZQSAE4DDmYpMOrkjnBQhkUlaZkkukvDSRS
      JqwBI/04G7se+RouHyXjRS9U76HnPM8+/IS2h+T6CbXLOpYBAkEA2j0JmyGVs+WV
      I9sG5glamJqTBa4CfTORrdFW4EULoGkUc24ZFFqn9W4e5yfl/pCkPptCenvIrAWp
      /ymnHeLn6QJBANbKGO9uBizAt4+o+kHYdANcbU/Cs3PLj8yOOtjkuMbH4tPNQmB6
      /u3npiVk7/Txfkg0BjRzDDZib109eKbvGKkCQBgMneBghRS7+gFng40Z/sfOUOFR
      WajeY/FZnk88jJlyuvQ1b8IUc2nSZslmViwFWHQlu9+vgF+kiCU8O9RJSvECQQCl
      Vkx7giYerPqgC2MY7JXhQHSkwSuCJ2A6BgImk2npGlTw1UATJJq4Z2jtwBU2Z+7d
      ha6BEU6FTqCLFZaaadKBAkEAxko4hrgBsX9BKpFJE3aUIUcMTJfJQdiAhq0k4DV8
      5GVrcp8zl6mUTPZDaOmDhuAjGdAQJqj0Xo0PZ0fOZPtR+w==
      -----END RSA PRIVATE KEY-----
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_e6a173c52eb34735855a284660ba7dfc_blob.png)

## 查找配置映射

```
    ./c7nctl get cm  --env xxx -p xxx(-p 非必输)
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_e8be6b74a79b40c094d32495ff647af7_blob.png)

## 创建配置映射

```
    ./c7nctl create cm --env xxx --file xxx -p xxx (-p 非必输, file是绝对路径)
```

```
apiVersion: v1
data:
  key: value
kind: ConfigMap
metadata:
  name: c7nctl-cli-test2
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_dff77774145c4ad0951084b9744083be_blob.png)

## 查询密文

```
    ./c7nctl get secret  --env xxxx -p xxx(-p 非必输)
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_fd3d7c067e3d486ebb9f49e5395ea835_blob.png)

## 创建密文

```
    ./c7nctl create secret --env xxx --file xxx -p xxx (-p 非必输, file是绝对路径)
```

apiVersion: v1
kind: Secret
metadata:
name: secret-c7n-ctl
stringData:
key1: value1
key2: value2

```
apiVersion: v1
kind: Secret
metadata:
  name: secret-c7n-ctl
stringData:
  key1: value1
  key2: value2
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_daf4c7626c51415eb66db349a1d62077_blob.png)

## 查询自定义资源

```
    ./c7nctl get custom --env xxxx -p xxx(-p 非必输)
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_8ac6677e64064f1e91c052b833e56a54_blob.png)

## 创建自定义资源

```
    ./c7nctl create custom --env xxx --file xxx -p xxx (-p 非必输, file是绝对路径)
```

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-12-18-023
spec:
  accessModes:
  - ReadWriteMany
  capacity:
    storage: 1Gi
  nfs:
    path: /u01/staging
    server: 192.168.16.215
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_a938b5886fb441768eec48e9947eb9cd_blob.png)

## 查询PV

```
    ./c7nctl get pv
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_9472a91f28754b6c801e4eaf6c000577_blob.png)

## 创建PV

```
    ./c7nctl ceate pv --clusterCode xxx --file xxx
```

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-12-18-023
spec:
  accessModes:
  - ReadWriteMany
  capacity:
    storage: 1Gi
  nfs:
    path: /u01/staging
    server: 192.168.16.215
```

## 查询PVC

```
    ./c7nctl get pvc --env xxx
```

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_99603353f34b4797ad6991cd69b89fc2_blob.png)

## 创建PVC

```
    ./c7nctl create pvc --clusterCode xxx -envCode xxx --file xxx (file是绝对路径)
```

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-12-18-111
spec:
  accessModes:
      - ReadWriteMany
  volumeName: pv-12-18-05
  resources:
    requests:
       storage: 1Gi
```