+++
title = "基础组件维护"
description = "基础组件常见的维护介绍及一些对应的注意事项"
weight = 9

+++

# 基础组件维护

Choerodon平台基于依赖于组件正常运行。运营Choerodon需要对Kubernetes有深入的理解，同时了解各个组件的运行方式，文档仅提供最基本的安装方式，性能调优。

#### 如何查看日志

- 进入任意Master主机中
- 执行如下命令获取服务POD名称(第一列)
  
  ```bash
  kubectl get po -n c7n-system | grep your-application
  ```

- 查看日志

  ```bash
  kubectl logs -f  [PODNAME]  -n c7n-system
  ```

#### 如何停止服务

- 进入任意Master主机中

- 执行如下命令获取服务信息

    ```bash
    kubectl get deployment -n c7n-system
    kubectl get statefulset -n c7n-system
    ```

- 如需要获取your-application信息

    ```bash
    kubectl get deployment -n c7n-system | grep your-application 
    ```

    可以看到一条关于your-application的记录，如果没有，则换成如下命令再试一次

    ```bash
    kubectl get statefulset -n c7n-system | grep your-application
    ```

- 如何停止服务

   简单的把实例降为0即停止了服务：

   ```bash
   kubectl scale deployment your-application -n c7n-system --replicas=0 
   ```

#### 如何重新启动服务

将上节中的 `--replicas`值改为1即可。

#### 故障修复

不同的组件在不同的运行环境可能出现不一样的问题，一般情况下某个组件出现问题，请先确定该组件在Kubernetes中的状态。比如使用如下命令获取状态:

```bash
kubectl get po -n c7n-system | grep your-application
```

不同的状态有不同的处理方式

- Pendding:

  一般为集群资源不足导致服务无法启动，通过 `kubectl describe pod [POD-NAME] -n c7n-system` 查看具体描述

- CrashLoopBackOff: 

  服务内部程序异常退出，查看日志后确定问题所在，修复问题。

- ContainerCreating:
  
  一般为正在拉取镜像，通过 `kubectl describe pod [POD-NAME] -n c7n-system` 查看具体描述


#### 各个组件的官方地址

|名称     |地址|
|:-:     |:-:|
|Gitlab   |https://docs.gitlab.com/ce/|
|Harbor   |https://github.com/goharbor/harbor|
|Chartmeseum|https://chartmuseum.com|
|Sonarqube|https://www.sonarqube.org|
|Minio|https://min.io|

