+++
title = "Rancher2.0安装"
description = "Rancher2.0安装"
weight = 1
+++

# Rancher2.0安装

## 第1步：准备Linux主机
准备一台64位Linux主机(推荐Ubuntu 16.04)，至少4GB内存。在主机上安装支持的Docker版本，目前支持1.126、1.131或17.03.2三个版本。请按照Docker说明进行安装。

## 第2步：运行Rancher Server
若要安装和运行Rancher Server，请在主机上执行以下Docker命令:

```shell
sudo docker run -d --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher
```

Rancher Server启动需要不到一分钟的时间，可以通过 https://server_ip 访问Rancher用户界面。一旦成功运行Rancher Server后，用户界面将提示您配置管理员密码。

## 使用SSL证书安装Rancher

### 方案A：使用默认自签名证书

默认情况下，Rancher会自动生成一个用于加密的自签名证书。从你的Linux主机运行Docker命令来安装Rancher，而不需要任何其他参数:

```shell
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -v /root/var/log/auditlog:/var/log/auditlog \
  -e AUDIT_LEVEL=3 \
  rancher/rancher:latest
```

### 方案B：使用你自己的自签名证书

Rancher安装可以使用自己生成的自签名证书。

先决条件:

- 使用OpenSSL或其他方法创建自签名证书。

- 这里的证书不需要进行base64加密。

- 证书文件必须是PEM格式。

 

你的Rancher安装可以使用你提供的自签名证书来加密通信。创建证书后，运行docker命令时把证书文件映射到容器中。

```shell
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -v /var/log/rancher/auditlog:/var/log/auditlog \
  -e AUDIT_LEVEL=3 \
  -v /etc/<CERT_DIRECTORY>/<FULL_CHAIN.pem>:/etc/rancher/ssl/cert.pem \
  -v /etc/<CERT_DIRECTORY>/<PRIVATE_KEY.pem>:/etc/rancher/ssl/key.pem \
  -v /etc/<CERT_DIRECTORY>/<CA_CERTS.pem>:/etc/rancher/ssl/cacerts.pem \
  rancher/rancher:latest
```

### 方案C：使用权威CA机构颁发的证书

如果你公开发布你的应用，理想情况下应该使用由权威CA机构颁发的证书。

先决条件:

1. 证书必须是PEM格式,PEM只是一种证书类型，并不是说文件必须是PEM为后缀，具体可以查看证书类型。

1. 确保容器包含你的证书文件和密钥文件。由于你的证书是由认可的CA签署的，因此不需要安装额外的CA证书文件。

1. 给容器添加--no-cacerts参数禁止Rancher生成默认CA证书。

1. 这里的证书不需要进行base64加密。

获取证书后，运行Docker命令以部署Rancher，同时指向证书文件。

```shell
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -v /root/var/log/auditlog:/var/log/auditlog \
  -e AUDIT_LEVEL=3 \
  -v /etc/your_certificate_directory/fullchain.pem:/etc/rancher/ssl/cert.pem \
  -v /etc/your_certificate_directory/privkey.pem:/etc/rancher/ssl/key.pem \
  rancher/rancher:latest --no-cacerts
```