+++
title = "工作日历"
description =" 用于设置组织内的工作日期"
weight = 8
+++

# 工作日历

工作日历是对组织工作日期的管理，同组织下的项目默认工作日期为组织层工作日历的日期。工作日历中包含时区选择、地区选择、更新选择、周末设置和手动点选，用户可以根据组织工作时间、地点来设置工作日历。

- **菜单层次**：组织层
- **菜单路径**：组织设置 > 工作日历
- **默认角色**：组织管理员

<img src="/docs/user-guide/system-configuration/tenant/image/working_calendar.png"  height="623.5" width="500">

## 操作步骤
* 编辑工作日历
    1. 点击`地区`下拉列表选择组织所在地区；
      <blockquote class="note">
        地区默认为亚洲
      </blockquote>
    2. 点击`时区`下拉列表选择时区；
      <blockquote class="note">
        时区默认为（GMT+08:00）Shanghai
      </blockquote>
    3. 多条件选择，条件包括`自动更新每年的法定节假日`(默认选中)、`选定周六为工作日`、`选定周日为工作日`
      <blockquote class="note">
        选中`选定周六为工作日`（`选定周日为工作日`）时，日历中的所有周六（周日）变为工作日
      </blockquote>
    4. 以上的设置会反应在日历表中，如有其他特殊时间需求，可对日历具体日期点选，日历中蓝色边框日期为当日，字体颜色黑色为工作日，红色为休息日，带![](/docs/user-guide/system-configuration/tenant/image/working_calendar_blackIco.png)图标为法定节假日补班，带![](/docs/user-guide/system-configuration/tenant/image/working_calendar_redIco.png)图标为法定节假日;


## 更多操作
- [项目管理](../project)
- [用户管理](../user)
- [密码策略](../secret_policy)
