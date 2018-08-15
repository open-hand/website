+++
title = "Tabs 标签页"
weight = 11
+++

# Tabs 标签页

选项卡切换组件。

## 何时使用

提供平级的区域将大块内容进行收纳和展现，保持界面整洁。

Ant Design 依次提供了三级选项卡，分别用于不同的场景。

- 卡片式的页签，提供可关闭的样式，常用于容器顶部。
- 标准线条式页签，用于容器内部的主功能切换，这是最常用的 Tabs。
- [RadioButton](/components/radio/#components-radio-demo-radiobutton) 可作为更次级的页签来使用。

<div class="c7n-row">
    <div class="c7n-row-12">
        <section class="code-box">
            <section class="code-box-demo"><div id="tabs-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本</a></div>
                <div>
                    <p>默认选中第一项。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="tabs-demo-disabled"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>禁用</a></div>
                <div>
                    <p>禁用某一项。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="tabs-demo-icon"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>图标</a></div>
                <div>
                    <p>有图标的标签。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="tabs-demo-slide"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>滑动</a></div>
                <div>
                    <p>可以左右、上下滑动，容纳更多标签。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="tabs-demo-extra"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>附加内容</a></div>
                <div>
                    <p>可以在页签右边添加附加操作。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="tabs-demo-size"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>大小</a></div>
                <div>
                    <p>大号页签用在页头区域，小号用在弹出框等较狭窄的容器内。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="tabs-demo-location"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>位置</a></div>
                <div>
                    <p>有四个位置，<code>tabPosition="left|right|top|bottom"</code>。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="tabs-demo-card"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>卡片式页签</a></div>
                <div>
                    <p>另一种样式的页签，不提供对应的垂直样式。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="tabs-demo-add"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>新增和关闭页签</a></div>
                <div>
                    <p>只有卡片样式的页签支持新增和关闭选项。使用 <code>closable={false}</code> 禁止关闭。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="tabs-demo-card-top"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>卡片式页签容器</a></div>
                <div>
                    <p>用于容器顶部，需要一点额外的样式覆盖。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="tabs-demo-trigger"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自定义新增页签触发器</a></div>
                <div>
                    <p>隐藏默认的页签增加图标，给自定义触发器绑定事件。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-tabs >}}

## API

### Tabs

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeKey | 当前激活 tab 面板的 key | string | 无 |
| animated | 是否使用动画切换 Tabs，在 `tabPosition=top|bottom` 时有效 | boolean \| {inkBar:boolean, tabPane:boolean} | true, 当 type="card" 时为 false |
| defaultActiveKey | 初始化选中面板的 key，如果没有设置 activeKey | string | 第一个面板 |
| hideAdd | 是否隐藏加号图标，在 `type="editable-card"` 时有效 | boolean | false |
| size | 大小，提供 `large` `default` 和 `small` 三种大小 | string | 'default' |
| tabBarExtraContent | tab bar 上额外的元素 | React.ReactNode | 无 |
| tabBarStyle | tab bar 的样式对象 | object | - |
| tabPosition | 页签位置，可选值有 `top` `right` `bottom` `left` | string | 'top' |
| type | 页签的基本样式，可选 `line`、`card` `editable-card` 类型 | string | 'line' |
| onChange | 切换面板的回调 | Function(activeKey) {} | 无 |
| onEdit | 新增和删除页签的回调，在 `type="editable-card"` 时有效 | (targetKey, action): void | 无 |
| onNextClick | next 按钮被点击的回调 | Function | 无 |
| onPrevClick | prev 按钮被点击的回调 | Function | 无 |
| onTabClick | tab 被点击的回调 | Function | 无 |
| tabBarGutter | tabs 之间的间隙 | number | 无 |

### Tabs.TabPane

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| forceRender | 被隐藏时是否渲染 DOM 结构 | boolean | false |
| key | 对应 activeKey | string | 无 |
| tab | 选项卡头显示文字 | string\|ReactNode | 无 |
