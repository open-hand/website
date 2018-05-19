+++
title = "Kubernetes集群部署"
description = "Kubernetes集群部署"
weight = 10
+++

## 简化模式

### linux/osx

#### 环境准备
- 安装[Virtualbox 5.1.34](https://www.virtualbox.org/wiki/Download_Old_Builds_5_1)
- 安装[Vagrant 2.0.1](https://releases.hashicorp.com/vagrant/2.0.1/)

#### 搭建Kubernetes集群
- 克隆搭建脚本,并进入项目中

    ```
    git clone https://choerodon.io/gitlab/rdc_hip/kubeadm-ansible.git && cd kubeadm-ansible
    ```

> 默认启动3个虚拟机，若PC内存不足，请降低`Vagrantfile`中第6行循环次数。

- 启动虚拟机

    ```
    vagrant up
    ```

- 进入虚拟机node1

    ```
    vagrant ssh node1
    ```

- 在node1中安装ansible环境

    ```
    sudo yum install -y epel-release && \
    sudo yum install -y \
        ansible \
        git \
        httpd-tools \
        pyOpenSSL \
        python-cryptography \
        python-lxml \
        python-netaddr \
        python-passlib \
        python-pip

    # 查看ansible版本（version>=2.4.0.0）
    ansible --version
    ```

> 若修改了`Vagrantfile`中启动的虚拟机数量，请删除`kubeadm-ansible/inventory/hosts`文件中未启动的虚拟机信息。

- 在node1中部署集群  

    ```
    cd /vagrant
    ansible-playbook -i inventory/hosts -e @inventory/vars cluster.yml
    ```

### windows

#### 使用Virtualbox启动
- 使用Virtualbox启动请参照linux/osx启动方式运行。

## 测试环境模式

#### 环境准备

- 在要执行ansible脚本的机器上安装ansible运行需要的环境：

    ```
    sudo yum install -y epel-release && \
    sudo yum install -y \
        ansible \
        git \
        httpd-tools \
        pyOpenSSL \
        python-cryptography \
        python-lxml \
        python-netaddr \
        python-passlib \
        python-pip

    # 查看ansible版本（version>=2.4.0.0）
    ansible --version
    ```

- 克隆项目：

    ```
    git clone https://choerodon.io/gitlab/rdc_hip/kubeadm-ansible.git
    ```

#### 修改hosts文件

- 编辑项目下的`kubeadm-ansible/inventory/hosts`文件,修改各机器的访问地址、用户名、密码，并维护好各节点与角色的关系,前面的名称为机器的hostname。该用户必须是具有root权限的用户。

> 注意：etcd节点和master节点需要在相同的机器。

- 比如,想要部署单节点集群,只需要这样配置(参考)：

    ```
    [all]
    node1 ansible_host=192.168.56.11 ansible_user=root ansible_ssh_pass=change_it ansible_become=true

    [kube-master]
    node1

    [etcd]
    node1

    [kube-node]
    node1
    ```

#### 修改变量

- 编辑项目下的`kubeadm-ansible/inventory/vars`文件,修改变量`k8s_interface`的值为要部署机器的ipv4的网卡名称(centos默认是eth0),如果不确定可使用`ifconfig`命令查看。

    ```
    k8s_interface: "eth0"
    ```

- **注意**:如果各个机器之间网卡名称不一致,请将`k8s_interface`变量从`kubeadm-ansible/inventory/vars`文件删掉，并在`inventory/host`文件中给每个机器加上ip地址，比如:

    ```
    [all]
    node1 ansible_host=192.168.56.11 ip=192.168.56.11 ansible_user=root ansible_ssh_pass=change_it ansible_become=true
    ```

- 如果所有机器以`代理的方式`访问外网,请配置以下几个变量,否则请不要配置:

    ```
    http_proxy: http://1.2.3.4:3128
    https_proxy: http://1.2.3.4:3128
    no_proxy: localhost,127.0.0.0/8
    docker_proxy_enable: true
    ```

#### 部署

- 执行:

    ```
    ansible-playbook -i inventory/hosts -e @inventory/vars cluster.yml
    ```

- 查看等待pod的状态为runnning:

    ```
    kubectl get po -n kube-system
    ```

- 如果部署失败，想要重置集群(所有数据),执行：

    ```
    ansible-playbook -i inventory/hosts reset.yml
    ```

## 正式环境模式

> 注意：以下已以阿里云ECS为例进行讲解，目前只支持centos 7.2+

- 在要执行ansible脚本的机器上安装ansible运行需要的环境：

    ```
    sudo yum install -y epel-release && \
    sudo yum install -y \
        ansible \
        git \
        httpd-tools \
        pyOpenSSL \
        python-cryptography \
        python-lxml \
        python-netaddr \
        python-passlib \
        python-pip

    # 查看ansible版本（version>=2.4.0.0）
    ansible --version
    ```

- 克隆项目：

    ```
    git clone https://choerodon.io/gitlab/rdc_hip/kubeadm-ansible.git
    ```

#### 修改hosts文件

> 在阿里云的ECS的控制面板上修改ECS实例的hostname,名称最好只包含小写字母、数字和中划线。并保持与`inventory/hosts`中的名称与ECS控制台上的名称保持一致,重启生效。**注意**：etcd节点和master节点需要在相同的机器。

#### 网段选择

- 如果ECS服务器用的是专有网络,pod和service的网段不能与vpc网段重叠，示例参考：

    ```
    # 如果vpc网段为`172.*`
    kube_pods_subnet: 192.168.0.0/20
    kube_service_addresses: 192.168.255.0/20

    # 如果vpc网段为`10.*`
    kube_pods_subnet: 172.16.0.0/16
    kube_service_addresses: 172.19.0.0/20

    # 如果vpc网段为`192.168.*`
    kube_pods_subnet: 172.16.0.0/16
    kube_service_addresses: 172.19.0.0/20
    ```

#### flannel类型

- 在使用VPC网络的ECS上部署k8s时，flannel网络的Backend类型需要是`ali-vpc`。在本脚本中默认使用的是`vxlan`类型，虽然在vpc环境下网络能通,但是不稳定波动较大。所以推荐使用`ali-vpc`的类型。

- 因此,首先需要设置默认的flannel网络不安装，通过在`inventory/vars`文件中添加变量：

    ```
    flannel_enable: false
    ```

- 跑完ansible脚本后手动安装flannel网络插件,在其中一个master节点创建配置文件`kube-flannel-aliyun.yml`:

```
    kind: ClusterRole
    apiVersion: rbac.authorization.k8s.io/v1beta1
    metadata:
    name: flannel
    rules:
    - apiGroups:
        - ""
        resources:
        - pods
        verbs:
        - get
    - apiGroups:
        - ""
        resources:
        - nodes
        verbs:
        - list
        - watch
    - apiGroups:
        - ""
        resources:
        - nodes/status
        verbs:
        - patch
    ---
    kind: ClusterRoleBinding
    apiVersion: rbac.authorization.k8s.io/v1beta1
    metadata:
    name: flannel
    roleRef:
    apiGroup: rbac.authorization.k8s.io
    kind: ClusterRole
    name: flannel
    subjects:
    - kind: ServiceAccount
    name: flannel
    namespace: kube-system
    ---
    apiVersion: v1
    kind: ServiceAccount
    metadata:
    name: flannel
    namespace: kube-system
    ---
    kind: ConfigMap
    apiVersion: v1
    metadata:
    name: kube-flannel-cfg
    namespace: kube-system
    labels:
        tier: node
        app: flannel
    data:
    cni-conf.json: |
        {
        "name": "cbr0",
        "type": "flannel",
        "delegate": {
            "isDefaultGateway": true
        }
        }
    net-conf.json: |
        {
        "Network": "[PodsSubnet]",
        "Backend": {
            "Type": "ali-vpc"
        }
        }
    ---
    apiVersion: extensions/v1beta1
    kind: DaemonSet
    metadata:
    name: kube-flannel-ds
    namespace: kube-system
    labels:
        tier: node
        app: flannel
    spec:
    template:
        metadata:
        labels:
            tier: node
            app: flannel
        spec:
        hostNetwork: true
        nodeSelector:
            beta.kubernetes.io/arch: amd64
        tolerations:
        - key: node-role.kubernetes.io/master
            operator: Exists
            effect: NoSchedule
        serviceAccountName: flannel
        initContainers:
        - name: install-cni
            image: registry.cn-hangzhou.aliyuncs.com/google-containers/flannel:v0.9.0
            command:
            - cp
            args:
            - -f
            - /etc/kube-flannel/cni-conf.json
            - /etc/cni/net.d/10-flannel.conf
            volumeMounts:
            - name: cni
            mountPath: /etc/cni/net.d
            - name: flannel-cfg
            mountPath: /etc/kube-flannel/
        containers:
        - name: kube-flannel
            image: registry.cn-hangzhou.aliyuncs.com/google-containers/flannel:v0.9.0
            command: [ "/opt/bin/flanneld", "--ip-masq", "--kube-subnet-mgr" ]
            securityContext:
            privileged: true
            env:
            - name: POD_NAME
            valueFrom:
                fieldRef:
                fieldPath: metadata.name
            - name: POD_NAMESPACE
            valueFrom:
                fieldRef:
                fieldPath: metadata.namespace
            - name: ACCESS_KEY_ID
            value: [YOUR_ACCESS_KEY_ID]
            - name: ACCESS_KEY_SECRET
            value: [YOUR_ACCESS_KEY_SECRET]
            volumeMounts:
            - name: run
            mountPath: /run
            - name: flannel-cfg
            mountPath: /etc/kube-flannel/
        volumes:
            - name: run
            hostPath:
                path: /run
            - name: cni
            hostPath:
                path: /etc/cni/net.d
            - name: flannel-cfg
            configMap:
                name: kube-flannel-cfg
```

- 请注意修改配置中的参数值：
    - `Network`：为pod网段。
    - `ACCESS_KEY_ID`:必填
    - `ACCESS_KEY_SECRET`:必填

- 该ACCESS_KEY的用户需要拥有以下权限：

    - 只读访问云服务器(ECS)的权限
    - 管理专有网络(VPC)的权限

- 然后使用kubectl命令部署,部署成功后在vpc的路由表中会添加多条路由条目,下一跳分别为每个节点的pod ip段：

    ```
    kubectl apply -f kube-flannel-aliyun.yml
    ```

- 接下来需要在ECS安全组，在入方向规则中加上pod网段的地址。否则在pod容器中无法访问别的节点的pod的端口,比如:

    授权策略 | 协议类型 | 端口范围 | 授权类型 | 授权对象 | ...
    ---|---|---|---|---|---
    允许 | 全部 | -1/-1 | 地址段访问 | 192.168.0.0/20 | ...


#### 修改变量

- 编辑项目下的`kubeadm-ansible/inventory/vars`文件,修改变量`k8s_interface`的值为要部署机器的ipv4的网卡名称(centos默认是eth0),如果不确定可使用`ifconfig`命令查看。

    ```
    k8s_interface: "eth0"
    ```

- 注意:如果各个机器之间网卡名称不一致,请将`k8s_interface`变量从`kubeadm-ansible/inventory/vars`文件删掉，并在`inventory/host`文件中给每个机器加上ip地址，比如:

    ```
    [all]
    node1 ansible_host=192.168.56.11 ip=192.168.56.11 ansible_user=root ansible_ssh_pass=change_it ansible_become=true
    ```

- 如果所有机器以`代理的方式`访问外网,请配置以下几个变量,否则请不要配置:

    ```
    http_proxy: http://1.2.3.4:3128
    https_proxy: http://1.2.3.4:3128
    no_proxy: localhost,127.0.0.0/8
    docker_proxy_enable: true
    ```

#### 部署

- 执行:

    ```
    ansible-playbook -i inventory/hosts -e @inventory/vars cluster.yml
    ```

- 查看等待pod的状态为runnning:

    ```
    kubectl get po -n kube-system
    ```

- 如果部署失败，想要重置集群(所有数据),执行：

    ```
    ansible-playbook -i inventory/hosts reset.yml
    ```