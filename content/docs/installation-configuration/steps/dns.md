+++
title = "第三步：域名解析"
description = "第三步：域名解析"
weight = 11
+++

# 域名解析

<div>
<div>Choerodon安装和配置<span style="color: #ff0000;"><strong>必须</strong></span>使用域名，只有正确配置了域名解析才能进行安装和使用。</div>
</div>

## 预备知识

**域名**（英语：Domain Name），简称域名、网域，是由一串用点分隔的名字组成的Internet上某一台计算机或计算机组的名称，用于在数据传输时标识计算机的电子方位（有时也指地理位置）。

**网域名称系统**（DNS，Domain Name System，有时也简称为域名）是因特网的一项核心服务，它作为可以将域名和IP地址相互映射的一个分布式数据库，能够使人更方便的访问互联网，而不用去记住能够被机器直接读取的IP地址数串。

**域名解析**是把域名指向网站空间IP，让人们通过注册的域名可以方便地访问到网站的一种服务。IP地址是网络上标识站点的数字地址，为了方便记忆，采用域名来代替IP地址标识站点地址。域名解析就是域名到IP地址的转换过程。域名的解析工作由DNS服务器完成。域名解析也叫域名指向、服务器设置、域名配置以及反向IP登记等等。说得简单点就是将好记的域名解析成IP，服务由DNS服务器完成，是把域名解析到一个IP地址，然后在此IP地址的主机上将一个子目录与域名绑定。互联网中的地址是数字的IP地址，域名解析的作用主要就是为了便于记忆。

例如，choerodon.io是一个域名，和IP地址35.187.150.118相对应。DNS就像是一个自动的电话号码簿，我们可以直接拨打choerodon的名字来代替电话号码（IP地址）。我们直接调用网站的名字以后，DNS就会将便于人类使用的名字（如choerodon.io）转化成便于机器识别的IP地址（如35.187.150.118）。

## 域名注册

如果您希望对外提供服务，必须注册一个域名并正确配置解析。如果仅用于测试或内部使用，可以使用[自主搭建DNS](#自主搭建dns)伪造一个域名暂时跳过域名注册环节。使用自建DNS服务需要所有用户设置自己电脑的DNS，强烈建议注册一个自己的域名。

### 域名注册流程

如果您没有域名，您需要购买一个域名。购买域名的方法，请参考[如何注册域名](https://help.aliyun.com/document_detail/54068.html?spm=a2c4g.11186623.2.3.IZnRtO)。

### 域名备案

根据中华人民共和国信息产业部第十二次部务会议审议通过的《非经营性互联网信息服务备案管理办法》精神，在中华人民共和国境内提供非经营性互联网信息服务，应当办理备案。未经备案，不得在中华人民共和国境内从事非经营性互联网信息服务。而对于没有备案的网站将予以罚款和关闭。备案操作请参考[阿里云备案服务](https://beian.aliyun.com/)。

### 设置域名解析

您需要将你的域名解析到你集群中任意一台master节点的IP。解析包括后边安装文档中<span style="color: #ff0000;"><strong>所有</strong></span>您定义的域名。设置域名解析的方法，请参考[如何设置域名解析](https://help.aliyun.com/document_detail/29716.html?spm=a2c4g.11186623.2.13.IZnRtO)。

如果你现在外网环境下使用域名访问系统，请解析到master节点对应的外网ip,并非所有主机都有外网ip。具体请咨询您的网络服务商。

## 自主搭建DNS

如果您不想注册域名，请参考本节，使用自己搭建的DNS服务器，需要<span style="color: #ff0000;"><strong>所有用户</strong></span>手动配置DNS解析以访问相关服务。

### 前置要求

- 已按本站Kubernetes部署文档部署好整个集群。

<blockquote class="warning">
在进行此之前，你应该先安装Helm，安装Helm的方式请参考<a href='../parts/base/helm/'>这里</a>
</blockquote>

### 仓库设置

1. 本地添加远程仓库

    ```shell
    helm repo add c7n https://openchart.choerodon.com.cn/choerodon/c7n/
    ```

1. 更新本地仓库信息

    ```shell
    helm repo update 
    ```

### 部署DNS(请勿直接复制命令执行)

假如您想在使用`example.choerodon.io`这个域名，则在参数中设置`config."example\.choerodon\.io"={集群ip}`，具体参数请参考下面的参数解释。
kubernetest service是一个面向微服务架构的设计，它从k8s本身解决了容器集群的负载均衡，并开放式地支持了用户所需要的各种负载均衡方案和使用场景。由于k8s中的pod在每次创建之后的ip都不一定相同，所以这里需要指定一个service并绑定一个主机ip，使得可以使用主机ip+端口访问dns服务器。


```shell
helm install c7n/dnsmasq \
    --set service.enable=true \
    --set service.externalIPs={192.168.1.1} \
    --set config."example\.choerodon\.io"=192.168.1.1 \
    --name dnsmasq --namespace=choerodon-devops-prod
```

- 参数解释：

    | 参数 | 含义
    | --- |  --- | 
    service.enable|是否开启service
    service.externalIPs|service外部IP，这里请填写任意一台master节点IP
    config."example\\.choerodon\\.io"|引号中间的字符为你要设置的域名后缀，这里请将“.”用“\”进行转义，等号后面的值可以为`service.externalIPs`的值，也可为另一master节点的IP

### 配置k8s集群中的kube-dns服务

- 新建名为`kube-dns.cm.yml`的文件，粘贴以下内容，<span style="color: #ff0000;"><strong>注意修改</strong></span>相应信息：

    - 这里的`192.168.1.1`替换为上一步填写`service.externalIPs`的值

    ```yaml
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: kube-dns
      namespace: kube-system
    data:
      stubDomains: |
        {"example.choerodon.io": ["192.168.1.1"]} 
    ```

- 应用kube-dns配置文件

    ```bash
    kubectl apply -f kube-dns.cm.yml
    ```

- 重启kube-dns服务

    ```bash
    kubectl scale deployment kube-dns -n kube-system --replicas=0
    kubectl scale deployment kube-dns -n kube-system --replicas=1
    ```

## 验证部署

- 执行以下命令出现以下结果即成功

    ```console
    $ kubectl exec -n choerodon-devops-prod $(kubectl get po -n choerodon-devops-prod -l choerodon.io/infra=dnsmasq -o jsonpath="{.items[0].metadata.name}") host example.choerodon.io

    example.choerodon.io has address 192.168.1.1
    ```

- 部署完成后您的DNS服务器即为您设置的`externalIP`

## 设置主机DNS

- [Mac设置DNS](https://jingyan.baidu.com/article/6525d4b1887abaac7d2e94ec.html)
- [Linux设置DNS](https://jingyan.baidu.com/article/d3b74d64e80e281f77e609f6.html)
- [Windows设置DNS](https://jingyan.baidu.com/article/b7001fe1a7a8c60e7282dd82.html)