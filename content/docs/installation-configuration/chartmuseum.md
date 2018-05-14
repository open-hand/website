+++
title = "Chartmuseum安装"
description = "Chartmuseum安装组件监控"
date = 2018-03-30T13:06:38+08:00
draft = false
weight = 1
+++

# Chartmuseum

### 添加远程仓库

```
helm repo add paas http://helm-charts.staging.saas.hand-china.com/paas/base/
```

### 更新仓库信息

```
helm repo update 
```

### 安装Chartmuseum（Chartmuseum）

**注意：**启用持久化存储请执行提前创建PV和PVC

1. 创建`values.yaml`配置文件，修改以下必要信息。

  ```yaml
  env:
    open:
      # 设置多租户层级
      DEPTH: 2
      # 开启API
      DISABLE_API: false
      CHART_POST_FORM_FIELD_NAME: chart
      LOG_JSON: "true"
      PROV_POST_FORM_FIELD_NAME: prov
      STORAGE: local
  persistence:
    # 启用持久化存储
    enabled: true
    # 提供pvc名称
    existingClaim: chartmuseum
  ingress:
    # 启用域名访问
    enabled: true
    host: helm.alpha.saas.hand-china.com
  ```
1. 执行以下命名进行安装。

  > 可在安装命令中添加`--debug --dry-run`参数，进行渲染预览不进行安装。

  ```
  helm install paas/chartmuseum --name=chartmuseum --namespace=tools -f values.yaml
  ```