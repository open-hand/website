+++
title = "Notification 通知提醒框"
weight = 4
+++

# Notification 通知提醒框

全局展示通知提醒信息。

## 何时使用

在系统四个角显示通知提醒信息。经常用于以下情况：

- 较为复杂的通知内容。
- 带有交互的通知，给出用户下一步的行动点。
- 系统主动推送。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="notification-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本</a></div>
                <div>
                    <p>最简单的用法，4.5 秒后自动关闭。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="notification-demo-icon"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>带有图标的通知提醒框</a></div>
                <div>
                    <p>通知提醒框左侧有图标。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="notification-demo-custom"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自定义图标</a></div>
                <div>
                    <p>图标可以被自定义。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="notification-demo-style"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自定义样式</a></div>
                <div>
                    <p>使用 style 和 className 来定义样式。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="notification-demo-delay"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自定义关闭的延时</a></div>
                <div>
                    <p>自定义通知框自动关闭的延时，默认<code>4.5s</code>，取消自动关闭只要将该值设为 <code>0</code> 即可。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="notification-demo-button"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自定义按钮</a></div>
                <div>
                    <p>自定义关闭按钮的样式和文字。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="notification-demo-location"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>位置</a></div>
                <div>
                    <p>可以设置通知从右上角、右下角、左下角、左上角弹出。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-notification >}}

## API

- `notification.success(config)`
- `notification.error(config)`
- `notification.info(config)`
- `notification.warning(config)`
- `notification.warn(config)`
- `notification.close(key: String)`
- `notification.destroy()`

config 参数如下：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| btn | 自定义关闭按钮 | ReactNode | - |
| className | 自定义 CSS class | string | - |
| description | 通知提醒内容，必选 | string\|ReactNode | - |
| duration | 默认 4.5 秒后自动关闭，配置为 null 则不自动关闭 | number | 4.5 |
| icon | 自定义图标 | ReactNode | - |
| key | 当前通知唯一标志 | string | - |
| message | 通知提醒标题，必选 | string\|ReactNode | - |
| placement | 弹出位置，可选 `topLeft` `topRight` `bottomLeft` `bottomRight` | string | topRight |
| style | 自定义内联样式 | [React.CSSProperties](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/e434515761b36830c3e58a970abf5186f005adac/types/react/index.d.ts#L794) | - |
| onClose | 点击默认关闭按钮时触发的回调函数 | Function | - |

还提供了一个全局配置方法，在调用前提前配置，全局一次生效。

- `notification.config(options)`

```js
notification.config({
  placement: 'bottomRight',
  bottom: 50,
  duration: 3,
});
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| bottom | 消息从底部弹出时，距离底部的位置，单位像素。 | number | 24 |
| duration | 默认自动关闭延时，单位秒 | number | 4.5 |
| getContainer | 配置渲染节点的输出位置 | () => HTMLNode | () => document.body |
| placement | 弹出位置，可选 `topLeft` `topRight` `bottomLeft` `bottomRight` | string | topRight |
| top | 消息从顶部弹出时，距离顶部的位置，单位像素。 | number | 24 |
