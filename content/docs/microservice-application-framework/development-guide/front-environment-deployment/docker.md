+++
title = "docker镜像打包发布"
date = "2017-10-30"
draft = false
weight = 3
+++

# docker镜像打包发布

### docker镜像仓库登录
在终端键入
```
docker login -u $REGISTRY_USER -p $REGISTRY_PWD $registry
```

* $REGISTRY_USER 为镜像仓库的登录用户名
* $REGISTRY_PWD 为镜像仓库的登录密码
* $registry 为镜像仓库地址

### 镜像构建
在上一步构建dist文件夹的目录下,新建一个Dockerfile文件
```
### nginx镜像根据实际项目替换
FROM registry.saas.hand-china.com/tools/nginx:stable
### 后端api地址 根据实际项目替换
ENV PRO_API_HOST gateway.hapcloud.test.code.saas.hand-china.com
ENV PRO_CLIENT_ID hapcloudfront
### 将dist文件夹添加到nginx镜像html目录下
ADD dist /usr/share/nginx/html
### 将boot/structure/enterpoint.sh 文件放入nginx/html目录下
COPY ./boot/structure/enterpoint.sh /usr/share/nginx/html
### 运行该enterpoint脚本文件
RUN chmod 777 /usr/share/nginx/html/enterpoint.sh
ENTRYPOINT ["/usr/share/nginx/html/enterpoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
### 暴露80端口
EXPOSE 80
```

`boot/structure/enterpoint.sh`文件看起来是这样的
```
#!/bin/bash
set -e
### 替换PRO_API_HOST和PRO_CLIENT_ID环境变量
find /usr/share/nginx/html -name '*.js' | xargs sed -i "s/localhost:8080/$PRO_API_HOST/g"
find /usr/share/nginx/html -name '*.js' | xargs sed -i "s/localhost:clientId/$PRO_CLIENT_ID/g"

exec "$@"

```

在此目录终端下，运行
```
### $docker_Name为镜像名称 根据实际需求更改
docker build -t $docker_Name .
```
生成$docker_Name命名的镜像

### 镜像发布
```
### $registry为远程镜像地址 根据实际项目更改
docker push $registry
```