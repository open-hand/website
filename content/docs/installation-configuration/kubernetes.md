+++
title = "Kubernetes集群部署"
description = "Kubernetes集群部署"
weight = 1
+++

# Kubernetes集群部署

## 前置要求与约定

- 约定：Master(s)节点为Kubernetes主节点、Worker(s)节点为Kubernetes普通节点、Etcd节点为将部署Etcd的节点，按本教程安装Master(s)节点与Etcd节点必须一致。

- 按本教程安装Kubernetes集群只会在Master(s)节点上安装kubectl命令。

- 需开放的端口号
    - Master(s)节点

        协议|方向|端口范围|目的
        ---|---|---|---
        TCP	|入方向|6443*|Kubernetes API server
        TCP	|入方向|2379-2380|etcd server client API
        TCP	|入方向|10250|Kubelet API
        TCP	|入方向|10251|kube-scheduler
        TCP	|入方向|10252|kube-controller-manager
        TCP	|入方向|10255|Read-only Kubelet API
        
    - Worker(s)节点

        协议|方向|端口范围|目的
        ---|---|---|---
        TCP|入方向|10250	|Kubelet API
        TCP|入方向|10255	|Read-only Kubelet API
        TCP|入方向|30000-32767|	NodePort Services**

## 同步服务器时区

时区和时间的同步性对于服务器很重要（例如您在更新数据库时，时间的准确性对业务的影响会非常大），为避免实例上运行的业务逻辑混乱和避免网络请求错误，您需要将一台或多台服务器设置在同一时区下，比如 Asia/Shanghai 或 America/Los Angeles。您可以根据自己的业务需求并参照本文为服务器设置或者修改时区。此外，NTP（Network Time Protocol）服务能保证您的服务器的时间与标准时间同步，您可以根据本文配置 NTP 服务。

### 方法 1. 通过命令tzselect修改时区

1. 远程连接 Linux 服务器。
1. 执行命令 tzselect。

    ```
    $ tzselect
    Please identify a location so that time zone rules can be set correctly.
    Please select a continent or ocean.
    1) Africa
    2) Americas
    3) Antarctica
    4) Arctic Ocean
    5) Asia
    6) Atlantic Ocean
    7) Australia
    8) Europe
    9) Indian Ocean
    10) Pacific Ocean
    11) none - I want to specify the time zone using the Posix TZ format.
    ```
1. 输入上述洲际列表中的数字，如本示例中的 5。

    ```
    #? 5  # 输入 5，选择亚洲。
    Please select a country.
    1) Afghanistan      18) Israel           35) Palestine
    2) Armenia          19) Japan            36) Philippines
    3) Azerbaijan       20) Jordan           37) Qatar
    4) Bahrain          21) Kazakhstan       38) Russia
    5) Bangladesh       22) Korea (North)    39) Saudi Arabia
    6) Bhutan           23) Korea (South)    40) Singapore
    7) Brunei           24) Kuwait           41) Sri Lanka
    8) Cambodia         25) Kyrgyzstan       42) Syria
    9) China            26) Laos             43) Taiwan
    10) Cyprus           27) Lebanon          44) Tajikistan
    11) East Timor       28) Macau            45) Thailand
    12) Georgia          29) Malaysia         46) Turkmenistan
    13) Hong Kong        30) Mongolia         47) United Arab Emirates
    14) India            31) Myanmar (Burma)  48) Uzbekistan
    15) Indonesia        32) Nepal            49) Vietnam
    16) Iran             33) Oman             50) Yemen
    17) Iraq             34) Pakistan
    ```
1. 输入上述国家列表中的数字，如本示例中的 9。

    ```
    #? 9  # 输入 9，选择中国。
    Please select one of the following time zone regions.
    1) east China - Beijing, Guangdong, Shanghai, etc.
    2) Heilongjiang (except Mohe), Jilin
    3) central China - Sichuan, Yunnan, Guangxi, Shaanxi, Guizhou, etc.
    4) most of Tibet & Xinjiang
    5) west Tibet & Xinjiang
    ```

1. 输入上述城市列表中的数字，如本示例中的 1。并输入确认信息 Yes/No，如本示例中的 1。

    ```
    #? 1  # 输入 1，选择北京时间。
    The following information has been given:
        China
        east China - Beijing, Guangdong, Shanghai, etc.
    Therefore TZ='Asia/Shanghai' will be used.
    Local time is now:    Mon Nov  9 13:40:51 CST 2015.
    Universal Time is now:    Mon Nov  9 05:40:51 UTC 2015.
    Is the above information OK?
    1) Yes
    2) No
    #? 1  # 输入 1 确认。
    You can make this change permanent for yourself by appending the line
        TZ='Asia/Shanghai'; export TZ
    to the file '.profile' in your home directory; then log out and log in again.
    Here is that TZ value again, this time on standard output so that you
    can use the /usr/bin/tzselect command in shell scripts:
    Asia/Shanghai
    ```
1. 执行命令 hwclock -w 更新硬件时钟（RTC）。

### 方法 2. 通过修改配置文件修改时区

<blockquote class="note">
时区配置文件需要以 root 身份打开并编辑，所以此处使用 sudo 命令。
</blockquote>

1. 远程连接 Linux 服务器。
1. 执行命令 `sudo rm /etc/localtime` 删除系统里的当地时间链接。
1. 执行命令 `sudo vi /etc/sysconfig/clock` 用 vim 打开并编辑配置文件 `/etc/sysconfig/clock`。
1. 输入 i 添加时区城市，例如添加 `Zone=Asia/Shanghai`，按下 Esc 键退出编辑并输入 `:wq` 保存并退出。（可执行命令 `ls /usr/share/zoneinfo` 查询时区列表，Shanghai 为列表条目之一。）
1. 执行命令 `sudo ln -sf /usr/share/zoneinfo/Asia/Shanghai/etc/localtime` 更新时区修改内容。
1. 执行命令 `hwclock -w` 更新硬件时钟（RTC）。
1. 执行命令 `sudo reboot` 重启实例。
1. 执行命令 `date -R` 查看时区信息是否生效，未生效可重走一遍步骤。

## 同步服务器时间

1. 安装ntp服务`sudo yum install ntp`。
1. 修改成国内时区并同步。

    ```
    timedatectl set-timezone Asia/Shanghai
    timedatectl set-ntp yes
    ```
1. 查看时间确保同步`timedatectl`。

## 简化模式

<blockquote class="note">
简化模式指的是在本地模拟安装，并非在服务器上进行部署。在服务器上部署请查阅测试环境模式或正式环境模式。
</blockquote>

### linux/osx

##### 环境准备
- 部署[Virtualbox 5.1.34](https://www.virtualbox.org/wiki/Download_Old_Builds_5_1)
- 部署[Vagrant 2.0.1](https://releases.hashicorp.com/vagrant/2.0.1/)

#### 搭建Kubernetes集群
- 克隆搭建脚本，并进入项目中

    ```
    git clone https://github.com/choerodon/kubeadm-ansible.git && cd kubeadm-ansible
    ```
<blockquote class="note">
默认启动3个虚拟机，若PC内存不足，请降低Vagrantfile中第6行循环次数。
</blockquote>

- 启动虚拟机

    ```
    vagrant up
    ```

- 进入虚拟机node1

    ```
    vagrant ssh node1
    ```

- 在node1中部署ansible环境

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
<blockquote class="note">
若修改了Vagrantfile中启动的虚拟机数量，请删除kubeadm-ansible/inventory/hosts文件中未启动的虚拟机信息。
</blockquote>

- 在node1中部署集群  

    ```
    cd /vagrant
    ansible-playbook -i inventory/hosts -e @inventory/vars cluster.yml
    ```

### windows

#### 使用Virtualbox启动
- 使用Virtualbox启动请参照linux/osx启动方式运行。

## 测试环境模式

### 环境准备

- 在要执行ansible脚本的机器上部署ansible运行需要的环境：

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
    git clone https://github.com/choerodon/kubeadm-ansible.git
    ```

### 修改hosts文件

<blockquote class="warning">
Etcd节点和Master节点需要在相同的机器。
</blockquote>

- 编辑项目下的`kubeadm-ansible/inventory/hosts`文件，修改各机器的访问地址、用户名、密码，并维护好各节点与角色的关系，前面的名称为机器的hostname。该用户必须是具有root权限的用户。比如，想要部署单节点集群，只需要这样配置(参考)：

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

### 修改变量

- 编辑项目下的`kubeadm-ansible/inventory/vars`文件，修改变量`k8s_interface`的值为要部署机器的ipv4的网卡名称(centos默认是eth0)，如果不确定可使用`ifconfig`命令查看。

    ```
    k8s_interface: "eth0"
    ```

- **注意**：如果各个机器之间网卡名称不一致，请将`k8s_interface`变量从`kubeadm-ansible/inventory/vars`文件删掉，并在`inventory/host`文件中给每个机器加上ip地址，比如：

    ```
    [all]
    node1 ansible_host=192.168.56.11 ip=192.168.56.11 ansible_user=root ansible_ssh_pass=change_it ansible_become=true
    ```

- 如果所有机器以`代理的方式`访问外网，请配置以下几个变量，否则请不要配置：

    ```
    http_proxy: http://1.2.3.4:3128
    https_proxy: http://1.2.3.4:3128
    no_proxy: localhost,127.0.0.0/8
    docker_proxy_enable: true
    ```

### 部署

- 执行：

    ```
    ansible-playbook -i inventory/hosts -e @inventory/vars cluster.yml
    ```

- 查看等待pod的状态为runnning：

    ```
    kubectl get po -n kube-system
    ```

- 如果部署失败，想要重置集群(所有数据)，执行：

    ```
    ansible-playbook -i inventory/hosts reset.yml
    ```

## 正式环境模式

<blockquote class="note">
下面以阿里云ECS为例进行讲解，目前只支持Centos 7.2及以上版本
</blockquote>

- 在要执行ansible脚本的机器上部署ansible运行需要的环境：

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
    git clone https://github.com/choerodon/kubeadm-ansible.git
    ```

### 修改hosts文件
<blockquote class="note">
在阿里云的ECS的控制面板上修改ECS实例的hostname，名称最好只包含小写字母、数字和中划线。并保持与inventory/hosts中的名称与ECS控制台上的名称保持一致，重启生效。
</blockquote>

<blockquote class="warning">
Etcd节点和Master节点必须一致。
</blockquote>

- 编辑项目下的`kubeadm-ansible/inventory/hosts`文件，修改各机器的访问地址、用户名、密码，并维护好各节点与角色的关系，前面的名称为机器的hostname。该用户必须是具有root权限的用户。比如，想要部署单节点集群，只需要这样配置(参考)：

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

### 修改变量

- 网段选择，如果ECS服务器用的是专有网络，pod和service的网段不能与vpc网段重叠，示例参考：

    ```
    # 如果vpc网段为`172.*`
    kube_pods_subnet: 192.168.0.0/20
    kube_service_addresses: 192.168.16.0/20

    # 如果vpc网段为`10.*`
    kube_pods_subnet: 172.16.0.0/20
    kube_service_addresses: 172.16.16.0/20

    # 如果vpc网段为`192.168.*`
    kube_pods_subnet: 172.16.0.0/20
    kube_service_addresses: 172.16.16.0/20
    ```

- 编辑项目下的`kubeadm-ansible/inventory/vars`文件，修改变量`k8s_interface`的值为要部署机器的ipv4的网卡名称(Centos默认是eth0)，如果不确定可使用`ifconfig`命令查看。

    ```
    k8s_interface: "eth0"
    ```

- **注意：** 如果各个机器之间网卡名称不一致，请将`k8s_interface`变量从`kubeadm-ansible/inventory/vars`文件删掉，并在`kubeadm-ansible/inventory/host`文件中给每个机器加上ip地址，比如：

    ```
    [all]
    node1 ansible_host=192.168.56.11 ip=192.168.56.11 ansible_user=root ansible_ssh_pass=change_it ansible_become=true
    ```

- 如果所有机器以`代理的方式`访问外网，配置以下几个变量，否则请不要配置：

    ```
    http_proxy: http://1.2.3.4:3128
    https_proxy: http://1.2.3.4:3128
    no_proxy: localhost,127.0.0.0/8
    docker_proxy_enable: true
    ```

### 网络部署

<blockquote class="note">
本文档部署的网络类型为flannel类型
</blockquote>

- 在使用VPC网络的ECS上部署k8s时，flannel网络的Backend类型需要是`ali-vpc`。在本脚本中默认使用的是`vxlan`类型，虽然在vpc环境下网络能通，但是不稳定波动较大。所以推荐使用`ali-vpc`的类型。

- 因此，首先需要设置默认的flannel网络不部署，通过在`kubeadm-ansible/inventory/vars`文件中添加变量：

    ```
    flannel_enable: false
    ```

- 接下来就可以[使用Ansible进行部署集群](../kubernetes/#部署-1)了，部署完成后再继续本节操作。

- 集群部署成功后手动部署flannel网络插件，在任意一个Master节点创建配置文件`kube-flannel-aliyun.yml`：

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

- 请注意修改配置中的参数值：
    - `Network`：为pod网段。
    - `ACCESS_KEY_ID`：必填
    - `ACCESS_KEY_SECRET`：必填

- 该ACCESS_KEY的用户需要拥有以下权限：
    - 只读访问云服务器(ECS)的权限
    - 管理专有网络(VPC)的权限

- 然后使用kubectl命令部署，部署成功后在vpc的路由表中会添加多条路由条目，下一跳分别为每个节点的pod ip段：

    ```
    kubectl apply -f kube-flannel-aliyun.yml
    ```

- 接下来需要在ECS安全组，在入方向规则中加上pod网段的地址。否则在pod容器中无法访问别的节点的pod的端口，比如：

    授权策略 | 协议类型 | 端口范围 | 授权类型 | 授权对象
    ---|---|---|---|---
    允许 | 全部 | -1/-1 | 地址段访问 | 192.168.0.0/20

### 部署

- 执行：

    ```
    ansible-playbook -i inventory/hosts -e @inventory/vars cluster.yml
    ```

- 查看等待pod的状态为runnning：

    ```
    kubectl get po -n kube-system
    ```

- 如果部署失败，想要重置集群(所有数据)，执行：

    ```
    ansible-playbook -i inventory/hosts reset.yml
    ```