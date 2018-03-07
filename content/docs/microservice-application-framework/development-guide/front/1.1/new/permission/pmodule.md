+++
title = "权限组件"
data = "2017-10-20"
draft = false
weight= 1
+++

# 权限组件

通过引入权限组件，可以动态判断用户是否具有此操作权限，并控制页面是否展示功能。

## 引用
通过组件头部引入权限组件
```
...
import Permission from 'PerComponent';
...
```

## 调用
调用权限组件需要额外当前组织或项目类型和id参数

在组件头部引入inject组件,导入Appstate
```
...
import { inject } from 'mobx-react'
...
@inject('AppState')
```
在组件适当位置获取当前组织或项目类型type和id

如果当前组件在组织层
```
...
const { AppState } = this.props;
const menuType = AppState.currentMenuType;
const organizationId = menuType.id;
let type;
if (AppState.getType) {
  type = AppState.getType;
} else if (sessionStorage.type) {
  type = sessionStorage.type;
} else {
  type = menuType.type;
}
...
```

如果当前组件在项目层
```
...
const { AppState } = this.props;
const menuType = AppState.currentMenuType;
const organizationId = menuType.organizationId;
const projectId = menuType.id;
let type;
if (AppState.getType) {
  type = AppState.getType;
} else if (sessionStorage.type) {
  type = sessionStorage.type;
} else {
  type = menuType.type;
}
...
```


在需要调用权限的地方用Permission包裹住要展示的组件，如果有权限则展示，没有则隐藏
```
...
<Permission
  service={'hap-user-service.client.update'}
  type={type}
  organizationId={organizationId}
  projectId={projectId} //如果在项目层加上这一条参数
>
  <Tooltip
    title={HAP.languageChange('edit')}
    placement="bottom"
    getTooltipContainer={that => that}
  >
    <a
      role="none"
      className="operateIcon small-tooltip"
      onClick={this.handleChange.bind(this, record.id)}
    >
      <Icon type="edit" />
    </a>
  </Tooltip>
</Permission>
...
```

Permission组件的service参数是后台存储的权限code，可以通过不同服务的api接口获取。