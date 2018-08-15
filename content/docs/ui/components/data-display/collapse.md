+++
title = "Collapse 折叠面板"
weight = 6
+++

# Collapse 折叠面板

可以折叠/展开的内容区域。

## 何时使用

- 对复杂区域进行分组和隐藏，保持页面的整洁。
- `手风琴` 是一种特殊的折叠面板，只允许单个内容区域展开。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-12">
        <section class="code-box">
            <section class="code-box-demo"><div id="collapse-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>折叠面板</a></div>
                <div>
                    <p>可以同时展开多个面板，这个例子默认展开了第一个。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="collapse-demo-accordion"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>手风琴</a></div>
                <div>
                    <p>手风琴，每次只打开一个tab。默认打开第一个。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="collapse-demo-mix"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>面板嵌套</a></div>
                <div>
                    <p>嵌套折叠面板。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="collapse-demo-simple"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>简洁风格</a></div>
                <div>
                    <p>一套没有边框的简洁样式。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="collapse-demo-custom"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自定义面板</a></div>
                <div>
                    <p>自定义各个面板的背景色、圆角和边距。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="collapse-demo-arrow"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>隐藏箭头</a></div>
                <div>
                    <p>你可以通过 <code>showArrow={false}</code> 隐藏 <code>CollapsePanel</code> 组件的箭头图标。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-collapse >}}

## API

### Collapse

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeKey | 当前激活 tab 面板的 key | string\[]\|string | 默认无，accordion模式下默认第一个元素 |
| defaultActiveKey | 初始化选中面板的 key | string | 无 |
| onChange | 切换面板的回调 | Function | 无 |

### Collapse.Panel

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 禁用后的面板展开与否将无法通过用户交互改变 | boolean | false |
| header | 面板头内容 | string\|ReactNode | 无 |
| key | 对应 activeKey | string | 无 |
| forceRender | 被隐藏时是否渲染 DOM 结构 | boolean | false |