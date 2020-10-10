
+++
title = "仓库"
description = ""
weight = 6
+++

# 仓库

## 1. 概述

仓库设置支持用户在项目下配置使用自定义的Docker仓库与Helm仓库，配置成功后，该项目下使用默认仓库的应用服务，之后生成的镜像均会被存放于目前的Docker仓库内；同理，更改Helm仓库后，之后生成的charts包也将存放在新的Helm仓库之中。

## 2. 修改仓库
![image](/docs/user-guide/settings/image/proj-repo.png)

点击`设置-仓库`进入详情页，便可在主页修改仓库的相关配置。


1. Docker仓库       

    ![image](/docs/user-guide/settings/image/harbor-setting.png)  

    * 从Choerodon V0.23.0起，Docker仓库配置功能已迁移至【项目层-制品库管理】页面，可点击页面中的按钮跳转至目标界面修改。  
    

2. 修改默认Helm仓库为自定义Helm仓库。
    * 将默认Helm仓库切换为自定义Helm仓库。
    * 输入仓库地址。
    * 点击测试连接，若连接成功，则代表自定义仓库有效；若连接失败，则无法使用。