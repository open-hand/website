+++
title = "第一步：Kubernetes集群部署"
description = "第一步：Kubernetes集群部署"
weight = 5
+++

# Kubernetes集群部署

## 预备知识

如果你不知道以下是做什么的，那么请参考下面链接（包括但不限于）进行学习：

- [Ansible](https://github.com/ansible/ansible#ansible)
- [Kubernetes](http://docs.kubernetes.org.cn/)

## 前置要求与约定

1. 集群会使用到的[端口号](../../pre-install/#会使用到的端口号)。

2. 各服务器时间与时区需一致，集群内服务器间时间差值不能大于1秒。

3. 文档以 4 个 CentOS 7.4 系统服务器安装高可用 Kubernetes 集群进行讲解。

4. 按照本文档安装 Kubernetes 集群时，Ansible 脚本会将服务器上防火墙关闭，请使用安全组进行网络权限控制。

5. Master(s) 服务器为 Kubernetes 控制服务器；Worker(s) 服务器为 Kubernetes 运算服务器；Etcd 服务器为组建Etcd 集群的服务器，Etcd 官方建议 Etcd 集群服务器个数为奇数个（比如1、3、5）以防止脑裂。

6. 为安全考虑按本教程安装的 Kubernetes 集群只会在 Master(s) 服务器上配置 kubectl 命令所需 kubeconfig，故 Worker(s) 服务器默认是无法使用 kubectl 命令的。

## 集群安装示例

### 环境准备

```
# 安装 git 命令行
sudo yum install git -y
# 克隆本项目代码
git clone https://github.com/choerodon/kubeadm-ha.git
# 进入项目目录
cd kubeadm-ha
# 安装 ansible 环境
sudo ./install-ansible.sh
```

### 配置 ansible inventory 文件

- 项目 `example` 文件夹下提供了 6 个 ansible inventory 示例文件，请按需求进行选择并修改。
- 拷贝项目下的 `example/hosts.m-master.ip.ini` 文件至项目根目录下，命名为 `inventory.ini`，修改各服务器的 IP 地址、用户名、密码，并维护好各服务器与角色的关系。
    <blockquote class="warning">
    </br>请使用服务器内网 IP 作为 ansible 目标服务器 IP，请勿使用服务器公网 IP。
    </br>该用户必须是具有 root 权限的用户，但并非要求一定是 root 用户，其他具有 root 权限的用户也可以。
    </blockquote>
    <blockquote class="warning">
    </br>克隆下来的本项目文件与 inventory.ini 文件很重要，涉及到后期的集群运维工作，请一定妥善保管。
    </blockquote>
    ```ini
    ; 将所有节点的信息在这里填写
    ;    第一个字段                  为节点内网IP，部署完成后为 kubernetes 节点 nodeName
    ;    第二个字段 ansible_port     为节点 sshd 监听端口
    ;    第三个字段 ansible_user     为节点远程登录用户名
    ;    第四个字段 ansible_ssh_pass 为节点远程登录用户密码
    [all]
    192.168.56.11 ansible_port=22 ansible_user="vagrant" ansible_ssh_pass="vagrant"
    192.168.56.12 ansible_port=22 ansible_user="vagrant" ansible_ssh_pass="vagrant"
    192.168.56.13 ansible_port=22 ansible_user="vagrant" ansible_ssh_pass="vagrant"
    192.168.56.14 ansible_port=22 ansible_user="vagrant" ansible_ssh_pass="vagrant"

    ; 私有云：
    ;    VIP 负载模式：
    ;       也就是负载均衡器 + keepalived 模式，比如常用的 haproxy + keepalived。
    ;       本脚本中负载均衡器有 nginx、haproxy、envoy 可供选择，设置 lb_mode 即可进行任意切换。
    ;       设置 lb_kube_apiserver_ip 即表示启用 keepalived，请先与服务器提供部门协商保留一个IP作为 lb_kube_apiserver_ip，
    ;       一般 lb 节点组中有两个节点就够了，lb节点组中第一个节点为 keepalived 的 master 节点，剩下的都为 backed 节点。
    ;
    ;    节点本地负载模式：
    ;       只启动负载均衡器，不启用 keepalived（即不设置 lb_kube_apiserver_ip），
    ;       此时 kubelet 链接 apiserver 地址为 127.0.0.1:lb_kube_apiserver_port。
    ;       使用此模式时请将 lb 节点组置空。
    ;
    ; 公有云：
    ;    不推荐使用 slb 模式，建议直接使用节点本地负载模式。
    ;    若使用 slb 模式，请先使用节点本地负载模式进行部署，
    ;    部署成功后再切换至 slb 模式：
    ;       将 lb_mode 修改为 slb，将 lb_kube_apiserver_ip 设置为购买到的 slb 内网ip，
    ;       修改 lb_kube_apiserver_port 为 slb 监听端口。
    ;    再次运行初始化集群脚本即可切换至 slb 模式。
    [lb]

    ; 注意etcd集群必须是1,3,5,7...奇数个节点
    [etcd]
    192.168.56.11
    192.168.56.12
    192.168.56.13

    [kube-master]
    192.168.56.11
    192.168.56.12
    192.168.56.13

    [kube-worker]
    192.168.56.11
    192.168.56.12
    192.168.56.13
    192.168.56.14

    ; 预留组，后续添加master节点使用
    [new-master]

    ; 预留组，后续添加worker节点使用
    [new-worker]

    ; 预留组，后续添加etcd节点使用
    [new-etcd]

    ;-------------------------------------- 以下为基础信息配置 ------------------------------------;
    [all:vars]
    ; 是否跳过节点物理资源校验，Master节点要求2c2g以上，Worker节点要求2c4g以上
    skip_verify_node=false
    ; kubernetes版本
    kube_version="1.16.8"
    ; 负载均衡器
    ;   有 nginx、haproxy、envoy 和 slb 四个选项，默认使用 nginx；
    lb_mode="nginx"
    ; 使用负载均衡后集群 apiserver ip，设置 lb_kube_apiserver_ip 变量，则启用负载均衡器 + keepalived
    ; lb_kube_apiserver_ip="192.168.56.15"
    ; 使用负载均衡后集群 apiserver port
    lb_kube_apiserver_port="8443"

    ; 网段选择：pod 和 service 的网段不能与服务器网段重叠，
    ; 若有重叠请配置 `kube_pod_subnet` 和 `kube_service_subnet` 变量设置 pod 和 service 的网段，示例参考：
    ;    如果服务器网段为：10.0.0.1/8
    ;       pod 网段可设置为：192.168.0.0/18
    ;       service 网段可设置为 192.168.64.0/18
    ;    如果服务器网段为：172.16.0.1/12
    ;       pod 网段可设置为：10.244.0.0/18
    ;       service 网段可设置为 10.244.64.0/18
    ;    如果服务器网段为：192.168.0.1/16
    ;       pod 网段可设置为：10.244.0.0/18
    ;       service 网段可设置为 10.244.64.0/18
    ; 集群pod ip段
    kube_pod_subnet="10.244.0.0/18"
    ; 集群service ip段
    kube_service_subnet="10.244.64.0/18"

    ; 集群网络插件，目前支持flannel,calico,kube-ovn
    network_plugin="flannel"

    ; 若服务器磁盘分为系统盘与数据盘，请修改以下路径至数据盘自定义的目录。
    ; Kubelet 根目录
    kubelet_root_dir="/var/lib/kubelet"
    ; docker容器存储目录
    docker_storage_dir="/var/lib/docker"
    ; Etcd 数据根目录
    etcd_data_dir="/var/lib/etcd"
    ```

### 集群部署

- 若有安全组则需要加上以下安全组策略，规则示例：

| 授权策略 | 协议类型 | 端口范围    | 授权类型   | 授权对象      | 描述                    |
| -------- | -------- | ----------- | ---------- | ------------- | ----------------------- |
| 允许     | TCP      | 80/80       | 地址段访问 | 0.0.0.0/0     | http 协议访问集群       |
| 允许     | TCP      | 443/443     | 地址段访问 | 0.0.0.0/0     | https 协议访问集群      |
| 允许     | TCP      | 30000/32767 | 地址段访问 | 0.0.0.0/0     | NodePort 访问集群       |
| 允许     | 全部     | -1/-1       | 地址段访问 | 10.244.0.0/18 | 跨节点 Pod 之间互相访问 |

- 升级内核：

    ```
    # 在项目根目录下执行
    ansible-playbook -i inventory.ini 00-kernel.yml
    # 重启服务器
    reboot -f
    ```
- 部署集群：

    ```
    # 在项目根目录下执行
    ansible-playbook -i inventory.ini 90-init-cluster.yml
    ```

- 查看等待 pod 的状态为 runnning：

    ```
    # 任意master节点下执行
    kubectl get po --all-namespaces -w
    ```

- 如果部署失败，想要重置集群，执行：

    ```
    # 在项目根目录下执行
    ansible-playbook -i inventory.ini 99-reset-cluster.yml
    ```

- 其他集群运维操作请查阅项目[使用指南](https://github.com/choerodon/kubeadm-ha#使用指南)

## 集群网络测试

### 集群访问公网测试

**测试说明**

- 镜像中将以下核心代码进行封装成为 `curls` 命令，使用方式 `curls url [times]` ，例如 `curls choerodon.io 20` 则为访问 `choerodon.io` 20次并打印测试出的时间指标，命令默认访问 10 次。

  ```
  curl -o /dev/null -s -w '%{time_connect} %{time_starttransfer} %{time_total}' "choerodon.io"
  ```

- 时间指标说明
  - 单位：秒
  - time_connect：建立到服务器的 TCP 连接所用的时间
  - time_starttransfer：在发出请求之后，Web 服务器返回数据的第一个字节所用的时间
  - time_total：完成请求所用的时间

#### 场景一、 Kubernetes集群node服务器访问公网

- 测试命令

    ```
    docker run -it --rm --net=host \
        registry.cn-hangzhou.aliyuncs.com/choerodon-tools/network-and-cluster-perfermance-test:0.1.0 \
        curls choerodon.io
    ```

- 测试结果

    ```
    No	time_connect	time_starttransfer	time_total
    1	0.015071	0.027448		0.027570
    2	0.010049	0.024527		0.024612
    3	0.010025	0.022209		0.022311
    4	0.012600	0.025269		0.025369
    5	0.012847	0.025849		0.025932
    6	0.009973	0.023102		0.023220
    7	0.013074	0.029310		0.029411
    8	0.015137	0.029992		0.030103
    9	0.010994	0.029040		0.029173
    10	0.010554	0.022011		0.022130
    ```

- 平均响应时间：26ms

#### 场景二、Kubernetes集群Pod访问公网

- 测试命令

    ```
    kubectl run curl-test \
        -it --quiet --rm --restart=Never \
        --image='registry.cn-hangzhou.aliyuncs.com/choerodon-tools/network-and-cluster-perfermance-test:0.1.0' \
        -- bash -c "sleep 3; curls choerodon.io"
    ```

- 测试结果

    ```
    No	time_connect	time_starttransfer	time_total
    1	0.014916	0.027232		0.027418
    2	0.020213	0.034626		0.034762
    3	0.014945	0.028014		0.028165
    4	0.016916	0.030483		0.032091
    5	0.020519	0.033075		0.033281
    6	0.015398	0.027727		0.028003
    7	0.015260	0.027099		0.027247
    8	0.019549	0.033506		0.033597
    9	0.020941	0.032935		0.035226
    10	0.014298	0.026570		0.026983
    ```

- 平均响应时间：29ms

### 集群内部网络延迟测试

**测试说明**

- 测试数据

    Service Name: ingress-nginx.ingress-controller.svc

    Service Cluster IP: 10.244.64.8 (可通过 `kubectl get svc ingress-nginx -n ingress-controller` 进行查看)

    Service Port: 80

- 通过向 `ingress-nginx` 的 `healthz` api执行curl命令进行网络延迟测试

    ```bash
    curl "http://10.244.64.8/healthz"
    ```

#### 场景一、 Kubernetes集群node服务器上通过Service Cluster IP访问

- 测试命令

    ```
    docker run -it --rm --net=host \
        registry.cn-hangzhou.aliyuncs.com/choerodon-tools/network-and-cluster-perfermance-test:0.1.0 \
        curls http://10.244.64.8/healthz
    ```

- 测试结果

    ```
    No	time_connect	time_starttransfer	time_total
    1	0.000491	0.000983		0.001038
    2	0.000347	0.002051		0.002122
    3	0.000298	0.000894		0.000975
    4	0.000263	0.082559		0.082665
    5	0.000351	0.000732		0.000785
    6	0.000234	0.084351		0.084445
    7	0.000245	0.000550		0.000592
    8	0.000436	0.086836		0.086947
    9	0.000215	0.000536		0.000573
    10	0.000369	0.089528		0.089635
    ```

- 平均响应时间：34ms

#### 场景二、Kubernetes集群内部通过service访问

- 测试命令

    ```
    kubectl run curl-test \
        -it --quiet --rm --restart=Never \
        --image='registry.cn-hangzhou.aliyuncs.com/choerodon-tools/network-and-cluster-perfermance-test:0.1.0' \
        -- bash -c "sleep 3; curls http://ingress-nginx.ingress-controller.svc/healthz"
    ```

- 测试结果

    ```
    No	time_connect	time_starttransfer	time_total
    1	0.040173	0.080107		0.080205
    2	0.047826	0.065836		0.065932
    3	0.064808	0.091835		0.091938
    4	0.075448	0.087315		0.087410
    5	0.112765	0.195511		0.195640
    6	0.104970	0.199655		0.199777
    7	0.127144	0.139747		0.139834
    8	0.056066	0.063325		0.063456
    9	0.021773	0.028471		0.028578
    10	0.017777	0.023236		0.023330
    ```

- 平均响应时间：112ms

### 集群内部网络性能测试

**测试说明**

- 使用 [iperf](https://docs.azure.cn/zh-cn/articles/azure-operations-guide/virtual-network/aog-virtual-network-iperf-bandwidth-test) 进行测试.

#### 场景一、主机之间

- 服务端命令：

    ```
    docker run -it --rm --net=host \
        registry.cn-hangzhou.aliyuncs.com/choerodon-tools/network-and-cluster-perfermance-test:0.1.0 \
        iperf -s -p 12345 -i 1 -M
    ```

**注意：** 此时该服务端命令会前台运行，一直等待客户端请求，请另起一个终端窗口进行执行客户端命令。

- 客户端命令：

    ```
    docker run -it --rm --net=host \
        registry.cn-hangzhou.aliyuncs.com/choerodon-tools/network-and-cluster-perfermance-test:0.1.0 \
        iperf -c 服务端节点IP -p 12345 -i 1 -t 10 -w 20K
    ```

- 测试结果
    ```
    [ ID] Interval       Transfer     Bandwidth
    [  3]  0.0- 1.0 sec   225 MBytes  1.89 Gbits/sec
    [  3]  1.0- 2.0 sec   223 MBytes  1.87 Gbits/sec
    [  3]  2.0- 3.0 sec   237 MBytes  1.98 Gbits/sec
    [  3]  3.0- 4.0 sec   223 MBytes  1.87 Gbits/sec
    [  3]  4.0- 5.0 sec   273 MBytes  2.29 Gbits/sec
    [  3]  5.0- 6.0 sec   259 MBytes  2.17 Gbits/sec
    [  3]  6.0- 7.0 sec   308 MBytes  2.59 Gbits/sec
    [  3]  7.0- 8.0 sec   257 MBytes  2.16 Gbits/sec
    [  3]  8.0- 9.0 sec   261 MBytes  2.19 Gbits/sec
    [  3]  9.0-10.0 sec   234 MBytes  1.96 Gbits/sec
    [  3]  0.0-10.0 sec  2.44 GBytes  2.10 Gbits/sec
    ```

#### 场景二、不同主机的Pod之间

- 服务端命令：

    ```
    kubectl run iperf-server \
        -it --quiet --rm --restart=Never \
        --overrides='{"spec":{"nodeName":"指定服务端运行的节点"}}' \
        --image='registry.cn-hangzhou.aliyuncs.com/choerodon-tools/network-and-cluster-perfermance-test:0.1.0' \
        -- bash -c "sleep 3; ifconfig eth0; iperf -s -p 12345 -i 1 -M"
    ```

**注意：** 此时该服务端命令会前台运行，一直等待客户端请求，请另起一个终端窗口进行执行客户端命令。查看输出的日志，替换下面客户端命令中Pod的IP

- 客户端命令：

    ```
    kubectl run iperf-client \
        -it --quiet --rm --restart=Never \
        --overrides='{"spec":{"nodeName":"指定客户端运行的节点"}}' \
        --image='registry.cn-hangzhou.aliyuncs.com/choerodon-tools/network-and-cluster-perfermance-test:0.1.0' \
        -- iperf -c 服务端POD的IP -p 12345 -i 1 -t 10 -w 20K
    ```

- 测试结果
    ```
    [ ID] Interval       Transfer     Bandwidth
    [  3]  0.0- 1.0 sec  1.42 GBytes  12.2 Gbits/sec
    [  3]  1.0- 2.0 sec  1.39 GBytes  11.9 Gbits/sec
    [  3]  2.0- 3.0 sec  1.22 GBytes  10.5 Gbits/sec
    [  3]  3.0- 4.0 sec  1.27 GBytes  10.9 Gbits/sec
    [  3]  4.0- 5.0 sec  1.04 GBytes  8.91 Gbits/sec
    [  3]  5.0- 6.0 sec  1.36 GBytes  11.7 Gbits/sec
    [  3]  6.0- 7.0 sec  1.42 GBytes  12.2 Gbits/sec
    [  3]  7.0- 8.0 sec  1.57 GBytes  13.5 Gbits/sec
    [  3]  8.0- 9.0 sec  1.25 GBytes  10.8 Gbits/sec
    [  3]  9.0-10.0 sec  1.56 GBytes  13.4 Gbits/sec
    [  3]  0.0-10.0 sec  13.5 GBytes  11.6 Gbits/sec
    ```

#### 场景三、节点与其他点的 Pod 之间


- 服务端命令：

    ```
    docker run -it --rm --net=host \
        registry.cn-hangzhou.aliyuncs.com/choerodon-tools/network-and-cluster-perfermance-test:0.1.0 \
        iperf -s -p 12345 -i 1 -M
    ```

**注意：** 此时该服务端命令会前台运行，一直等待客户端请求，请另起一个终端窗口进行执行客户端命令。

- 客户端命令：

    ```
    kubectl run iperf-client \
        -it --quiet --rm --restart=Never \
        --overrides='{"spec":{"nodeName":"指定客户端运行的节点"}}' \
        --image='registry.cn-hangzhou.aliyuncs.com/choerodon-tools/network-and-cluster-perfermance-test:0.1.0' \
        -- iperf -c 服务端节点IP -p 12345 -i 1 -t 10 -w 20K
    ```

- 测试结果
    ```
    [ ID] Interval       Transfer     Bandwidth
    [  3]  0.0- 1.0 sec   289 MBytes  2.43 Gbits/sec
    [  3]  1.0- 2.0 sec   290 MBytes  2.43 Gbits/sec
    [  3]  2.0- 3.0 sec   226 MBytes  1.89 Gbits/sec
    [  3]  3.0- 4.0 sec   209 MBytes  1.75 Gbits/sec
    [  3]  4.0- 5.0 sec   254 MBytes  2.13 Gbits/sec
    [  3]  5.0- 6.0 sec   257 MBytes  2.15 Gbits/sec
    [  3]  6.0- 7.0 sec   265 MBytes  2.23 Gbits/sec
    [  3]  7.0- 8.0 sec   184 MBytes  1.55 Gbits/sec
    [  3]  8.0- 9.0 sec   217 MBytes  1.82 Gbits/sec
    [  3]  9.0-10.0 sec   236 MBytes  1.98 Gbits/sec
    [  3]  0.0-10.0 sec  2.37 GBytes  2.04 Gbits/sec
    ```