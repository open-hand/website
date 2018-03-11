+++
title = "项目配置项"
data = "2017-10-20"
draft = false
weight= 3
+++

# 项目配置项

## 配置项详解
为了应对不同开发环境和不同项目需求，可以对`hap cloud`框架多个配置进行个性化。

配置项文件在项目根目录的`config.js`文件中。看起来是这样的
```
  const config = {
  clientId: 'local', // 必须填入响应的客户端（本地开发）
  titlename: 'HAPCloud', //项目页面的title名称
  favicon: 'a.png', //项目页面的icon图片名称
  theme: true, //是否开启主题色设定
  headerOrganzation: true, //在单个项目时候，是否显示项目名称
  menuCollapse: false, //菜单开始状态是否收缩
  mainCss: JSON.stringify('iam'), //master选择哪个项目的主题
  Masters: JSON.stringify('devops'), //master选择哪个项目模块
  themeSetting: {
    antdTheme: {
      'primary-color': '#3b78e7', //antd的主题颜色设定
    },
    header: '#3F51B5', //头部主题颜色设定
    // 折叠主菜单按钮颜色
    toggleButtonColor: '#4a5064',
    // 左侧菜单背景
    leftMenuBackground: '#333744',
    // 左侧子菜单背景
    menuBackground: '#42485b',
    // 左侧菜单字体颜色
    leftMenuColor: '#e9e9e9',
    // 左侧菜单字体选中时的颜色
    leftMenuSelectColor: '#6a98ed',
    // 右侧菜单背景
    childMenuBackground: '#eaedf1',
    backgroundColor: 'white', //背景色主题颜色设定
  },
  server: 'http://gateway.hapcloud.test.code.saas.hand-china.com', //后端api的地址
};

module.exports = config;


```

参数 | 说明
--- | ---
clientId | 该参数为认证服务回调本地开发地址字段
proclientId | 该参数为认证服务回调线上地址字段
titlename | 该参数为网站标签页title字段内容
favicon | 该参数为网站标签页icon图标
theme | 是否开启antd主题色自设定
headerOrganzation | 如果该服务只存在一个项目时，是否只显示项目名称
menuCollapse | 侧边菜单栏进入时是否默认收缩
mainCss | 项目入口默认选择哪个模块的主题样式
Masters | 项目进入哪个模块的入口master文件
themeSetting | 主题配置
antdTheme | antd主题颜色
header | 头部导航栏颜色
toggleButtonColor | 折叠主菜单按钮颜色
leftMenuBackground | 左侧菜单背景
menuBackground | 左侧子菜单背景
leftMenuColor | 左侧菜单字体颜色
leftMenuSelectColor | 左侧菜单字体选中时的颜色
childMenuBackground | 右侧菜单背景
backgroundColor | 背景色
server | 后端服务host地址

## 新建或覆盖全局配置

在项目根目录右键`git bash here`,输入`yo hap:option`
根据提示 键入各个配置项参数
完成后将会覆盖原有config文件

![](./images/yoption.jpg)