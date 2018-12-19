+++
title = "状态"
weight = 6
description = "项目中问题在某时段所处的状态"
+++

# 问题状态

状态是项目中的问题在某时段所处的状态，在当前版本中，问题状态可在项目层敏捷管理的[看板配置](../../../../agile/sprint/manage-kanban)中设置，也可以在组织层设置。在组织层中设置的状态需要添加到状态机,状态机应用到项目才能再项目中使用此状态。

- **菜单层次**：组织层
- **菜单路径**：问题设置 > 问题属性 > 状态
- **默认角色**：组织管理员

## 状态列表
状态页面中，可以对状态进行添加，编辑和删除操作:
![enter description here](/docs/user-guide/system-configuration/issue-configuration/image/issue-state-list.png "issue-state-list")

1. 点击`添加状态`按钮，链接到`添加状态`页面输入状态名称,选择状态阶段后可完成添加。
        <blockquote class="note">
                创建的状态都必须处于待处理、处理中、完成三个阶段中
        </blockquote>

2. 状态机：状态关联的状态机，点击状态列表中的状态机列可以看到一个状态关联的所有状态机
3. 编辑状态：点击`编辑`图标，可以编辑状态的名称和阶段
4. 删除状态： 点击此图标可删除列表中的状态
        <blockquote class="note">
               删除按钮只有未和状态机关联的状态行才显示
        </blockquote>