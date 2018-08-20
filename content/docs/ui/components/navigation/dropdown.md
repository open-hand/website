+++
title = "Dropdown 下拉菜单"
weight = 3
+++

# Dropdown 下拉菜单

向下弹出的列表。

## 何时使用

当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box" id="">
            <section class="code-box-demo"><div id="dropdown-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本</a></div>
                <div>
                    <p>最简单的下拉菜单。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="dropdown-item"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>其他元素</a></div>
                <div>
                    <p>分割线和不可用菜单项。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="dropdown-event"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>触发事件</a></div>
                <div>
                    <p>点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="dropdown-sub-menu"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>多级菜单</a></div>
                <div>
                    <p>传入的菜单里有多个层级。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="dropdown-context-menu"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>右键菜单</a></div>
                <div>
                    <p>默认是移入触发菜单，可以点击触发。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="dropdown-placement"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>弹出位置</a></div>
                <div>
                    <p>支持 6 个弹出位置。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="dropdown-trigger"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>触发方式</a></div>
                <div>
                    <p>默认是移入触发菜单，可以点击触发。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="dropdown-button"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>带下拉框的按钮</a></div>
                <div>
                    <p>左边是按钮，右边是额外的相关功能菜单。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="breadcrumb-overlay-isible"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>菜单隐藏方式</a></div>
                <div>
                    <p>默认是点击关闭菜单，可以关闭此功能。</p>
                </div>
            </section>
        </section>
    </div>
</div>


{{< components-dropdown >}}

## API

属性如下

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 菜单是否禁用 | boolean | - |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codepen.io/afc163/pen/zEjNOy?editors=0010) | Function(triggerNode) | `() => document.body` |
| overlay | 菜单 | [Menu](../menu) | - |
| placement | 菜单弹出位置：`bottomLeft` `bottomCenter` `bottomRight` `topLeft` `topCenter` `topRight` | String | `bottomLeft` |
| trigger | 触发下拉的行为 | Array&lt;`click`\|`hover`\|`contextMenu`> | `['hover']` |
| visible | 菜单是否显示 | boolean | - |
| onVisibleChange | 菜单显示状态改变时调用，参数为 visible | Function(visible) | - |

`overlay` 菜单使用 [Menu](../menu/)，还包括菜单项 `Menu.Item`，分割线 `Menu.Divider`。

> 注意： Menu.Item 必须设置唯一的 key 属性。
>
> Dropdown 下的 Menu 默认不可选中。如果需要菜单可选中，可以指定 `<Menu selectable>`.

### Dropdown.Button

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 菜单是否禁用 | boolean | - |
| overlay | 菜单 | [Menu](../menu/) | - |
| placement | 菜单弹出位置：`bottomLeft` `bottomCenter` `bottomRight` `topLeft` `topCenter` `topRight` | String | `bottomLeft` |
| size | 按钮大小，和 [Button](../../general/button/) 一致 | string | 'default' |
| trigger | 触发下拉的行为 | Array&lt;`click`\|`hover`\|`contextMenu`> | `['hover']` |
| type | 按钮类型，和 [Button](../../general/button/) 一致 | string | 'default' |
| visible | 菜单是否显示 | boolean | - |
| onClick | 点击左侧按钮的回调，和 [Button](../../general/button/) 一致 | Function | - |
| onVisibleChange | 菜单显示状态改变时调用，参数为 visible | Function | - |
