+++
title = "Alert 警告提示"
weight = 1
+++

# Alert 警告提示

警告提示，展现需要关注的信息。

## 何时使用

- 当某个页面需要向用户显示警告的信息时。
- 非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="alert-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本</a></div>
                <div>
                    <p>最简单的用法，适用于简短的警告提示。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="alert-demo-close"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>可关闭的警告提示</a></div>
                <div>
                    <p>显示关闭按钮，点击可关闭警告提示。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="alert-demo-icon"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>图标</a></div>
                <div>
                    <p>可口的图标让信息类型更加醒目。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="alert-demo-type"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>四种样式</a></div>
                <div>
                    <p>共有四种样式 <code>success</code>、<code>info</code>、<code>warning</code>、<code>error</code>。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="alert-demo-text"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>含辅助性文字介绍</a></div>
                <div>
                    <p>含有辅助性文字介绍的警告提示。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="alert-demo-custom"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自定义关闭</a></div>
                <div>
                    <p>可以自定义关闭，自定义的文字会替换原先的关闭 <code>Icon</code>。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="alert-demo-uninstall"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>平滑的卸载</a></div>
                <div>
                    <p>平滑、自然的卸载提示</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-alert >}}

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| afterClose | 关闭动画结束后的回掉 | () => void | - |
| banner | 是否用作顶部公告 | boolean | false |
| closable | 默认不显示关闭按钮 | boolean | 无 |
| closeText | 自定义关闭按钮 | string\|ReactNode | 无 |
| description | 警告提示的辅助性文字介绍 | string\|ReactNode | 无 |
| message | 警告提示内容 | string\|ReactNode | 无 |
| showIcon | 是否显示辅助图标 | boolean | false，`banner` 模式下默认值为 true |
| iconType | 自定义图标类型，`showIcon` 为 `true` 时有效 | string | - |
| type | 指定警告提示的样式，有四种选择 `success`、`info`、`warning`、`error` | string | `info`，`banner` 模式下默认值为 `warning` |
| onClose | 关闭时触发的回调函数 | (e: MouseEvent) => void | 无 |
