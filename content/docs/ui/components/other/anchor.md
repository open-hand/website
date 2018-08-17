+++
title = "Anchor 锚点"
weight = 1
+++

# Anchor 锚点

用于跳转到页面指定位置。

## 何时使用

需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="anchor-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本</a></div>
                <div>
                    <p>最简单的用法。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="anchor-demo-location"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>静态位置</a></div>
                <div>
                    <p>不浮动，状态不随页面滚动变化。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-anchor >}}

## API

### Anchor Props

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| affix | 固定模式 | boolean | true |
| bounds | 锚点区域边界 | number | 5(px) |
| getContainer | 指定滚动的容器 | () => HTMLElement | () => window |
| offsetBottom | 距离窗口底部达到指定偏移量后触发 | number |  |
| offsetTop | 距离窗口顶部达到指定偏移量后触发 | number |  |
| showInkInFixed | 固定模式是否显示小圆点 | boolean | false |

### Link Props

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| href | 锚点链接 | string |  |
| title | 文字内容 | string\|ReactNode |  |
