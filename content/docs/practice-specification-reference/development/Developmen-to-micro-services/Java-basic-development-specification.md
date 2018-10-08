+++
title = "Java基础开发规范"
description = ""
weight = 1
home = true
+++

# Java基础开发规范
---
## 规范检查

本地开发开启两种规范检查，一种为sonarQube的规范检查，一种为基于sun和google的checkStyle规范检查。

同时在CI的SonarQube代码检查中也生效了这两种规范检查，控制代码质量。

 1. 本地开启sonarQube规范检查：

    在Idea中安装sonarLint插件：

    ![](/docs/practice-specification-reference/development/Developmen-to-micro-services/image/pluginInstall1.png)

    ![](/docs/practice-specification-reference/development/Developmen-to-micro-services/image/pluginInstall2.png)

    指定本地修改的文件或者全项目检查：

    ![](/docs/practice-specification-reference/development/Developmen-to-micro-services/image/sonarSetting.png)

    查看不符合检查的地方：

    ![](/docs/practice-specification-reference/development/Developmen-to-micro-services/image/sonarResult.png)

 1. 本地开启checkStyle规范检查,注意更新插件，否则部分规则不适用于旧版本会报错：

    在Idea中安装CheckStyle-IDEA插件，步骤与上面安装插件一样

    生效checkStyle中checkStyle的规范config：[choerodon_checks.xml](https://rdc.hand-china.com/gitlab/io.choerodon/coding_guidelines/raw/master/checkConfigure/choerodon_checks.xml)
    ![](/docs/practice-specification-reference/development/Developmen-to-micro-services/image/sonarResult.png)

附:

sonarQube规范检查规则链接：[SonarRules](https://rules.sonarsource.com/java/RSPEC-3281)

googleCheck规范检查规则链接：[googleCheck](http://checkstyle.sourceforge.net/google_style.html)

alibaba p3c代码规范：[aliP3c](https://github.com/alibaba/p3c)

## idea设置
 1. 修改import分组、排序规则

    ![](/docs/practice-specification-reference/development/Developmen-to-micro-services/image/java_import.png)

 1. 换行设置

    ![](/docs/practice-specification-reference/development/Developmen-to-micro-services/image/warp_setting.png)

 1. tab设置
  
    ![](/docs/practice-specification-reference/development/Developmen-to-micro-services/image/tab_setting.png)




