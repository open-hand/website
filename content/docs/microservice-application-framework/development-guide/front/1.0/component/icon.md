+++
title = "ANTD Icon"
date = "2017-10-26"
draft = false
weight= 5
+++

ANTD Icon
=========

语义化的矢量图形。

图标的命名规范
--------------

我们为每个图标赋予了语义化的命名，命名规则如下:

-   实心和描线图标保持同名，用`-o`来区分，比如`question-circle`（实心）
    和`question-circle-o`（描线）；
-   命名顺序：`[图标名]-[形状?]-[描线?]-[方向?]`。
-   `?`为可选。

完整的图标设计规范请访问[图标规范](https://ant.design/docs/spec/icon-cn)。

如何使用
--------

使用`<Icon />`标签声明组件，指定图标对应的 type 属性，示例代码如下:

    <Icon type="link"/>

本地部署 {\#本地部署}
---------------------

图标默认托管在[iconfont.cn](http://iconfont.cn/)，默认公网可访问。如需本地部署，可参考[示例](https://github.com/ant-design/antd-init/tree/master/examples/local-iconfont)。

系统图标列表请访问：<https://ant.design/components/icon-cn/>
