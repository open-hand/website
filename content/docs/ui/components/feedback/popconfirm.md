+++
title = "Popconfirm 气泡确认框"
weight = 6
+++

# Popconfirm 气泡确认框

点击元素，弹出气泡式的确认框。

## 何时使用

目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。

和 `confirm` 弹出的全屏居中模态对话框相比，交互形式更轻量。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="popconfirm-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本</a></div>
                <div>
                    <p>最简单的用法。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="popconfirm-demo-location"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>位置</a></div>
                <div>
                    <p>位置有十二个方向。如需箭头指向目标元素中心，可以设置 <code>arrowPointAtCenter</code>。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="popconfirm-demo-i18n"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>国际化</a></div>
                <div>
                    <p>使用 <code>okText</code> 和 <code>cancelText</code> 自定义按钮文字。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="popconfirm-demo-trigger"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>条件触发</a></div>
                <div>
                    <p>可以判断是否需要弹出。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-popconfirm >}}

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cancelText | 取消按钮文字 | string | 取消 |
| okText | 确认按钮文字 | string | 确定 |
| okType | 确认按钮类型 | string | primary |
| title | 确认框的描述 | string\|ReactNode | 无 |
| onCancel | 点击取消的回调 | function(e) | 无 |
| onConfirm | 点击确认的回调 | function(e) | 无 |

更多属性请参考 [Tooltip](/components/tooltip/#API)。

## 注意

请确保 `Popconfirm` 的子元素能接受 `onMouseEnter`、`onMouseLeave`、`onFocus`、`onClick` 事件。