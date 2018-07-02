+++
title = "新建监控"
description = "grafana创建监控模块使用指南"
weight = 1
+++


## 功能
使用 grafana 作为可视化工具，创建编排数据监控模块。


**创建 dashboard**

1. 使用管理员账号登录。
2. 打开看板选择菜单，点击`New Dashboard`按钮以打开看板编辑页面。
3. 在控件列表中选择所需的控件类型，添加新的控件，点击`ADD ROW`按钮以新建一行。
4. 可以自由拖动控件以编排看板为所需的样式。
5. 点击 ![kafka_template](/docs/user-guide/operating-manage/newTemplate/images/save-dashboard.png) 并命名保存看板。

**编辑变量**

1. 点击 ![kafka_template](/docs/user-guide/operating-manage/newTemplate/images/setting_new.png) ->template打开变量编辑页面。
2. 点击`New`按钮新建变量，打开表单。
3. 完成表单内容
 
    **Variable**

- **Name** —— 变量名
- **Type** —— 变量类型

　不同类型下的表单内容不同，这里以 Query 类型为例

   **Query Options**

- **Data source** —— 数据源，变量值范围的数据来源
- **Refresh** —— 刷新频率
- **Query** —— 对应数据源的查询，其返回的值集合即为变量值范围

**创建新控件**

1. 点击 ![kafka_template](/docs/user-guide/operating-manage/newTemplate/images/edit-panel.png) -> `add panel` 图标，打开控件选择列表，选择以添加控件。
2. 点击控件->`edit`打开编辑页面，
   
 　　　  **General**
  
  - **Title** —— 控件标题

 　　　  **Metrics** 

  - **Data source** —— 数据源选择
  编辑Query栏以编辑查询语句，点击`Add Query`新建查询。

  其余还有一些改变尺寸，增加报警的选项。  