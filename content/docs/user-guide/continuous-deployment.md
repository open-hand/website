# 持续部署

## 资源管理

  - **菜单层次**：组织层
  - **菜单路径**：部署服务 > 资源管理

  > 定义部署时需要使用的资源。
  目前支持五种：mysql、redis、rebbitmq、kafka、url。

### 新建资源

1. 点击 `创建`  ，输入 “名称” 、 “描述” 以及选择资源类型，例如mysql。

    ![](\./assets/continuous-deployment/新建资源.png)

1. 输入资源相关信息，点击 `创建` 。

    ![](\./assets/continuous-deployment/创建资源.png)

1. 新建资源 “hap-devops-test” 已在资源管理列表中。

    ![](\./assets/continuous-deployment/创建资源示意.png)

### 资源编辑

1. 点击 `编辑` ，修改资源信息，点击 `保存` 。

    ![](\./assets/continuous-deployment/资源编辑.png)

1. 点击 “资源名称” ，查看资源详情。

    ![](\./assets/continuous-deployment/查看资源详情.png)

### 资源删除

1. 点击 `删除` 。

    ![](\./assets/continuous-deployment/资源删除.png)

1. 再次确认，点击 `删除` 。

    ![](\./assets/continuous-deployment/确认资源删除.png)

## 网关管理

  - **菜单层次**：组织层
  - **菜单路径**：部署服务 > 资源管理

  > 为所选的微服务将网关信息注册至微服务管理服务，支持删除其对应网关。
  注：服务可以访问的两个必要条件：网关注册、服务部署。

### 新建网关

1. 点击 `创建` ，选择需要配置网关的服务，如 “webservice0131” ，点击 `创建` 。

    ![](\./assets/continuous-deployment/新建网关.png)

1. 服务 “webservice0131” 的网关已在网关管理列表中。

    ![](\./assets/continuous-deployment/新建网关示意.png)

### 网关删除

1. 点击 `删除` 。

    ![](\./assets/continuous-deployment/网关删除.png)

1. 再次确认，点击 `删除` 。

    ![](\./assets/continuous-deployment/网关删除确认.png)


## 域名管理

  - **菜单层次**：组织层
  - **菜单路径**：部署服务 > 资源管理

  > 为相应的服务创建可访问域名并可对其进行修改，域名后缀为运行区域名后缀，如运行区域名  
  注：目前**Web前端**及**普通应用**需配置域名，若不配置域名，不能进行外网访问该前端，只能查看系统提供的pod ip。

### 新建域名

1. 点击 `创建` ，选择需要配置域名的服务，并输入 “域名” ，点击 `创建` 。

    ![](\./assets/continuous-deployment/新建域名.png)

1. 服务 “webfront0131” 的域名已在域名管理列表中。

    ![](\./assets/continuous-deployment/新建域名示意.png)


### 编辑域名信息

1. 点击 `编辑` 。

    ![](\./assets/continuous-deployment/编辑域名信息.png)

1. 修改域名信息，点击`保存` ，域名修改完成。

    ![](\./assets/continuous-deployment/域名修改完成.png)

### 删除域名

1. 点击`删除`。

    ![](\./assets/continuous-deployment/删除域名.png)

1. 再次确认，点击`删除`。

    ![](\./assets/continuous-deployment/删除域名确认.png)

## 服务部署

  - **菜单层次**：组织层
  - **菜单路径**：部署管理 > 服务

  > 提供可视化、一键式部署服务，支持并行部署和流水线无缝集成，实现部署环境标准化和部署过程自动化。

### 查看服务列表

点击 `部署管理`  ，点击 `服务` ，查看服务列表。

  ![](\./assets/continuous-deployment/查看服务列表.png)

### 查看服务版本列表

1. 点击`详情`。

    ![](\./assets/continuous-deployment/查看服务版本列表.png)

1. 查看该服务历史版本信息。

    ![](\./assets/continuous-deployment/服务历史版本信息.png)

### 查看部署文件

点击`查看部署文件`，查看部署文件信息。

  ![](\./assets/continuous-deployment/查看部署文件.png)

  ![](\./assets/continuous-deployment/查看部署文件信息.png)

### 服务部署

1. 在服务列表中找到要部署的服务，点击`详情`，例如webservice0131。

    ![](\./assets/continuous-deployment/服务详情.png)

1. 选择要发布的版本，点击`部署服务`。

    ![](\./assets/continuous-deployment/部署服务.png)

1. 进行资源选择和变量填写，点击`部署`。

    ![](\./assets/continuous-deployment/服务部署.png)

### 查看运行中的服务

1. 点击`详情`。

    ![](\./assets/continuous-deployment/点击服务详情.png)

1. 可在运行中查看正在部署/运行的版本，以及对容器数量进行调整。

    ![](\./assets/continuous-deployment/查看运行中.png)

1. 点击`详情`，查看服务部署阶段和详情信息。

    ![](\./assets/continuous-deployment/点击运行中详情.png)

    ![](\./assets/continuous-deployment/查看服务部署阶段.png)

    注：不同服务类型，部署阶段不同。

    ![](\./assets/continuous-deployment/服务部署阶段详情.png)

### 查看容器组列表

点击`容器组`页签，查看容器组列表。

  ![](\./assets/continuous-deployment/查看容器组列表.png)

### 查看容器组日志

点击`容器组日志`进行相关日志查看。

  ![](\./assets/continuous-deployment/点击容器组日志.png)

  ![](\./assets/continuous-deployment/容器组日志.png)

### 灰度部署

  用于保障系统稳定，验证某服务版本是否正常使用，验证正常后再转为正式部署。

  > 支持Web前端、普通应用类型的服务使用自动生成域名的方式进行灰度部署；支持微服务类型的服务使用选择不同用户组的方式进行灰度部署。

  1. 在服务列表中找到要部署的服务，点击 `详情` ，例如webservice0131。

      ![](\./assets/continuous-deployment/灰度部署服务详情.png)

  1. 选择要灰度部署的版本，点击 `部署服务` 。

      ![](\./assets/continuous-deployment/部署服务灰度.png)

  1. 进行资源选择和变量填写，勾选灰度发布，选择用户组，如devops，点击 `部署` 。

      ![](\./assets/continuous-deployment/勾选灰度发布.png)

  1. 可在运行中查看该版本正在进行灰度部署。

      ![](\./assets/continuous-deployment/正在进行灰度部署.png)

### 自动部署

1. **部署管理员**可以设置“自动部署”。

    ![](\./assets/continuous-deployment/设置自动部署.png)

1. 版本发布到运行区将会自动部署。

    ![](\./assets/continuous-deployment/自动部署.png)

    注：自动部署仅针对于正式部署。

### 查看服务运行历史

点击 `运行历史` ，查看部署失败或部署停止的服务版本。

  ![](\./assets/continuous-deployment/运行历史.png)

