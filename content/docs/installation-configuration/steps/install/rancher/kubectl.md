+++
title = "使用kubectl"
description = "使用kubectl"
weight = 3
+++

# 使用kubectl

kubectl是一个CLI命令行工具，用于运行Kubernetes集群的命令。


## 安装kubectl

1. 使用包管理器安装

    - Ubuntu, Debian or HypriotOS

        ```bash
        sudo apt-get update && sudo apt-get install -y apt-transport-https
        curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
        sudo touch /etc/apt/sources.list.d/kubernetes.list
        echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
        sudo apt-get update
        sudo apt-get install -y kubectl
        ```

    - CentOS, RHEL or Fedora

        ```bash
        cat <<EOF > /etc/yum.repos.d/kubernetes.repo
        [kubernetes]
        name=Kubernetes
        baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64
        enabled=1
        gpgcheck=1
        repo_gpgcheck=1
        gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
        EOF
        yum install -y kubectl
        ```

1. Ubuntu通过snap安装

    如果您使用的是Ubuntu或其他支持[snap](https://snapcraft.io/docs/core/install)包管理器的Linux发行版，则可通过`snap`安装kubectl。


    - 切换到snap用户并运行安装命令:

        ```bash
        sudo snap install kubectl --classic
        ```

    - 测试以确保您安装的是最新的版本：

        ```bash
        kubectl version
        ```


1. macOS通过Homebrew安装

    如果您使用的是macOS并使用[Homebrew](https://brew.sh/)包管理器，则可以使用`Homebrew`安装kubectl。

    - 运行安装命令:

        ```bash
        brew install kubernetes-cli
        ```

    - 测试以确保您安装的是最新的版本：

        ```bash
        kubectl version
        ```


1. macOS通过Macports安装

    如果您使用的是macOS并使用[Macports](https://macports.org/)包管理器，则可以使用`Macports`安装kubectl。

    - 运行安装命令:

        ```bash
        port install kubectl
        ```

    - 测试以确保您安装的是最新的版本：

        ```bash
        kubectl version
        ```

1. Install with Powershell from PSGallery

    如果您使用的是Windows并使用[Powershell Gallery](https://www.powershellgallery.com/)包管理器，则可以使用`Powershell`安装和更新kubectl。

    - 运行安装命令(确保指定DownloadLocation):

        ```bash
        Install-Script -Name install-kubectl -Scope CurrentUser -Force
        install-kubectl.ps1 [-DownloadLocation <path>]
        ```
    
    - 运行更新命令:

        ```bash
        re-run Install-Script to update the installer
        re-run install-kubectl.ps1 to install latest binaries
        ```

1. 通过二进制文件安装

    - MacOS

        - 文件下载，通过[文件下载](https://www.cnrancher.com/download/kubectl/kubectl_amd64-darwin)下载最新文档版本。

        - 确保`kubectl`二进制文件是可执行文件。
        
        ```bash
        chmod +x ./kubectl
        ```

        - 将`kubectl`二进制文件移动到PATH路径下。

        ```bash
        sudo mv ./kubectl /usr/local/bin/kubectl
        ```


    - Linux

        - 文件下载，通过[文件下载](https://www.cnrancher.com/download/kubectl/kubectl_amd64-linux)下载最新文档版本。

        - 确保`kubectl`二进制文件是可执行文件。
        
        ```bash
        chmod +x ./kubectl
        ```

        - 将`kubectl`二进制文件移动到PATH路径下。

        ```bash
        sudo mv ./kubectl /usr/local/bin/kubectl
        ```

    - Windows

        - 文件下载，通过[文件下载](https://www.cnrancher.com/download/kubectl/kubectl_amd64-windows.exe)下载最新文档版本。

        - 确保`kubectl`二进制文件是可执行文件。
        
        - 将`kubectl`二进制文件移动到PATH路径下。

## 配置kubectl

使用RKE创建Kubernetes集群时，RKE会在本地目录中创建一个包含认证信息的配置文件`kube_config_rancher-cluster.yml`，以使用`kubectl`或`helm`等工具连接到新集群。

您可以将此文件复制到`$HOME/.kube/config`或者如果您正在使用多个Kubernetes集群，请将`KUBECONFIG`环境变量设置为路径`kube_config_rancher-cluster.yml`。

```bash
export KUBECONFIG=$(pwd)/kube_config_rancher-cluster.yml
```

Rancher2.0 可以在`集群` `Kubeconfig文件` 获取配置文件

![](/docs/installation-configuration/image/rancher-clusters-config.png) 
![](/docs/installation-configuration/image/rancher-clusters-config1.png) 


在本地电脑执行`kubectl get nodes`测试您的连接，看看是否可以返回节点列表。

```bash
kubectl get nodes
 NAME                          STATUS    ROLES                      AGE       VERSION
165.227.114.63                Ready     controlplane,etcd,worker   11m       v1.10.1
165.227.116.167               Ready     controlplane,etcd,worker   11m       v1.10.1
165.227.127.226               Ready     controlplane,etcd,worker   11m       v1.10.1
```

## 检查kubectl

通过获取集群状态来检查kubectl是否已正确配置：

```bash
kubectl cluster-info
```

如果您看到URL响应，则kubectl已正确配置。

如果您看到类似于以下内容的消息，则kubectl配置不正确或无法连接到Kubernetes集群。

```bash
The connection to the server <server-name:port> was refused - did you specify the right host or port?
```

例如，如果您打算在笔记本电脑上（本地）运行Kubernetes集群，则需要首先安装minikube等工具，然后重新运行上述命令。

如果kubectl cluster-info返回url响应但您无法访问集群，要检查它是否配置正确，请使用：

```bash
kubectl cluster-info dump
```
