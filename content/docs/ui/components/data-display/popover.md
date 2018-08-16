+++
title = "Popover 气泡卡片"
weight = 8
+++

# Popover 气泡卡片

点击/鼠标移入元素，弹出气泡式的卡片浮层。

## 何时使用

当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。

和 `Tooltip` 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="popover-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本</a></div>
                <div>
                    <p>最简单的用法，浮层的大小由内容区域决定。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="popover-demo-location"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>位置</a></div>
                <div>
                    <p>位置有十二个方向。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="popover-demo-arrow"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>箭头指向</a></div>
                <div>
                    <p>设置了 <code>arrowPointAtCenter</code> 后，箭头将指向目标元素的中心。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="popover-demo-trigger"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>三种触发方式</a></div>
                <div>
                    <p>鼠标移入、聚集、点击。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="popover-demo-close"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>从浮层内关闭</a></div>
                <div>
                    <p>使用 <code>visible</code> 属性控制浮层显示。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-popover >}}

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 卡片内容 | string\|ReactNode | 无 |
| title | 卡片标题 | string\|ReactNode | 无 |

更多属性请参考 [Tooltip](../tooltip/#API)。

## 注意

请确保 `Popover` 的子元素能接受 `onMouseEnter`、`onMouseLeave`、`onFocus`、`onClick` 事件。