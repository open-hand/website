+++
title = "Rancher2.0搭建k8集群"
description = "Rancher2.0搭建k8集群"
weight = 2
+++

# 使用Rancher搭建k8集群

## 前置条件

1.  主机节点都已经安装好Docker环境，Rancher支持的Docker版本：`1.12.6` `1.13.1` `17.03.2`

1.  提前做好Docker镜像加速器，参考阿里云加速器地址：`https://2nvt3z9c.mirror.aliyuncs.com`

    <blockquote class="note"> 
        您可以通过修改daemon配置文件/etc/docker/daemon.json来使用加速器
    </blockquote>

    ```
    sudo mkdir -p /etc/docker
    sudo tee /etc/docker/daemon.json <<-'EOF'
    {
    "registry-mirrors": ["https://2nvt3z9c.mirror.aliyuncs.com"]
    }
    EOF
    sudo systemctl daemon-reload
    sudo systemctl restart docker
    ```
1.  网络端口都已经开通，或关闭防火墙

    Protocol|Port|Description
    ---|---|---		
    TCP|22|Node driver SSH provisioning
    TCP|2376|Node driver Docker daemon TLS port
    TCP|2379|etcd client requests
    TCP|2380|etcd peer communication
    UDP|8472|Canal/Flannel VXLAN overlay networking
    TCP|9099|Canal/Flannel livenessProbe/readinessProbe
    TCP|10250|kubelet API
    TCP|10254|Ingress controller livenessProbe/readinessProbe
    TCP/UDP|30000-32767|NodePort port range


## 搭建自定义集群
这种方式适合在内网物理主机或虚拟机上进行安装

1. 进入“集群” -> "添加集群"
 
    - `选择CUSTOM `
    - `填写集群名称`
    - `下一步`

    ![](/docs/installation-configuration/image/rancher-clusters.png) 

1. 集群配置信息

    - `主机选项` 勾选主机的角色
        - `etcd` Etcd官方建议Etcd集群节点个数为奇数个（比如1、3、5）以防止脑裂
        - `Control` 为Kubernetes主节点，Master节点
        - `Worker` 为Kubernetes普通节点，Worker节点
    - `复制命令`
    - `完成`

    ![](/docs/installation-configuration/image/rancher-clusters-setting.png) 

1. 集群配置信息

    - 分别在目标主机节点执行命令

    ```shell
    sudo docker run -d --privileged --restart=unless-stopped --net=host -v /etc/kubernetes:/etc/kubernetes -v /var/run:/var/run rancher/rancher-agent:v2.1.1 --server https://rancher.skyflyer.cn --token b9jmrcrpmhbclfxb4b6bkwxcxjv9q7x9pvd8zvsnqpcdxsdwqgp4b9 --etcd --controlplane --worker
    ```
    <blockquote class="note"> 
        请执行自己的环境生成的命令，不要使用示例中的命令
    </blockquote>     

    - 根据节点角色不同，相应调整`主机选项`生成不同的执行命令

    - 注意参数： `--etcd` `--controlplane` `--worker`

    <blockquote class="note"> 
        Rancher运行主机也可以是Kubernets的节点之一
    </blockquote> 

1. 点击完成

    等待Rancher自动构建好集群并显示为ok  

## 通过云主机创建集群

在Rancher界面选择相应的云主机，并配置模板信息后，点击完成；

1. Rancher会根据模板自动创建云主机，并初始化系统环境；

1. 自动配置网络环境、安全组；

1. 自动搭建Kubernets集群。

支持云主机：

- 阿里云ECS
- Amazon EC2
- Microsoft azure
- openstack
- vmwarevsphere
- 其他