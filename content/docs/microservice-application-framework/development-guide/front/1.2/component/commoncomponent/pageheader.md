+++
title = "Pageheader"
date = "2017-02-01"
draft = false
weight= 3
+++

# Pageheader

框架目前界面的头部都是统一使用 PageHeader 渲染。

## 查询展示界面

```
import PageHeader, { PageHeadStyle, UnderPageHeadStyle } from 'PageHeader'
...
<PageHeader title={HAP.languageChange("角色管理")}>
  <Button
    className="header-btn"
    ghost={true} 
    onClick={this.openNewPage} 
    style={PageHeadStyle.leftBtn} 
  >
    <span className="icon-playlist_add" />
    <span className="icon-space">{HAP.getMessage('创建', 'create')}</span>
  </Button>
  <Button
    className="header-btn" 
    ghost={true} 
    onClick={() => { this.loadRoles(this.state.page) }} 
    style={PageHeadStyle.leftBtn2} 
  >
    <span className="icon-autorenew" />
    <span className="icon-space">{HAP.getMessage('刷新', 'flush')}</span>
  </Button>
</PageHeader>
<div style={UnderPageHeadStyle}>
...
</div>
```

![](../images/import.png)

## 编辑新增界面

```
<PageHeader title={HAP.languageChange("创建角色")} backPath="/home/role" />
```

![](../images/pageHeader2.png)

## API

参数 | 说明 | 类型 | 默认值
---|---|---|---
title | 页面的title（必须） | Object | 无
backPath | 返回的页面的路径 | String | 无