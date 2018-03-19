+++
title = "开放master之IsAuthSpin组件"
data = "2017-09-29"
draft = false
weight= 4
+++

# 开放master之IsAuthSpin组件

## 自定义master

HAP Cloud 默认首页进入iam模块container目录下的master.js文件

如需自定义master，可在根目录config.js中配置
```
const config = {
    ...
    "master": JSON.stringify('devops'),
    ...
  }
  module.exports = config;
  ```
  此处配置将页面根路由配置于'devops'模块 /src/containers/Master.js

## IsAuthSpin 组件
IsAuthSpin组件用于判断用户是否登录，登录成功会显示IsAuthSpin包裹的内部组件，没有登录不会展示内容。

使用方法：
在Master.js头部引入IsAuthSpin
```
import IsAuthSpin from 'IsAuthSpin';
```

在组件return根标签中引入组件，并在组件内部包裹首页内容
```
...
 return (
      <IsAuthSpin>
        <div style={styles.main}>
          <MasterHeader
            menuChild={[{
              component: <LeftIconButton />,
              style: '',
            }, {
              component: <MenuTitle />,
              style: '',
            }, {
              component: <MenuType
                projectFlag={this.state.projectFlag}
                organizationFlag={this.state.organizationFlag}
              />,
              style: '',
            }, {
              component: <UserPreferences />,
              style: {
                float: 'right',
                paddingTop: '6px',
                paddingRight: '0px',
              },
            }]}
          />
          <div style={styles.body}>
            <div style={styles.container}>
              <div style={styles.content}>
                <AutoRouter />
              </div>
              <ResourceMenu id="menuItem" />
              <div style={paperStyle} id="menu">
                <MainMenu />
              </div>
            </div>
          </div>
        </div>
      </IsAuthSpin>
    );
...
```