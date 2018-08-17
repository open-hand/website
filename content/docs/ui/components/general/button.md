+++
title = "Button 按钮"
weight = 1
+++

# Button 按钮

按钮用于开始一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="button-type"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>按钮类型</a></div>
                <div>
                    <p>按钮有四种类型：主按钮、次按钮、虚线按钮、危险按钮。主按钮在同一个操作区域最多出现一次。</p>
                    <blockquote>
                        <p><code>danger</code> 在 <code>antd@2.7</code> 后支持。</p>
                    </blockquote>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="button-size"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>按钮尺寸</a></div>
                <div>
                    <p>按钮有大、中、小三种尺寸。</p>
                    <p>通过设置 <code>size</code> 为 <code>large</code> <code>small</code> 分别把按钮设为大、小尺寸。若不设置 <code>size</code>，则尺寸为中。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="button-loadding"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>加载中状态</a></div>
                <div>
                    <p>添加 <code>loading</code> 属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="button-group"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>按钮组合</a></div>
                <div>
                    <p>可以将多个 <code>Button</code> 放入 <code>Button.Group</code> 的容器中。</p>
                    <p>通过设置 <code>size</code> 为 <code>large</code> <code>small</code> 分别把按钮组合设为大、小尺寸。若不设置 <code>size</code>，则尺寸为中。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="button-icon"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>图标按钮</a></div>
                <div>
                    <p>当需要在 <code>Button</code> 内嵌入 <code>Icon</code> 时，可以设置 <code>icon</code> 属性，或者直接在 <code>Button</code> 内使用 <code>Icon</code> 组件。</p>
                    <p>如果想控制 <code>Icon</code> 具体的位置，只能直接使用 <code>Icon</code> 组件，而非 <code>icon</code> 属性。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="button-disabled"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>不可用状态</a></div>
                <div>
                    <p>添加 <code>disabled</code> 属性即可让按钮处于不可用状态，同时按钮样式也会改变。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="button-multiple"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>多个按钮组合</a></div>
                <div>
                    <p>按钮组合使用时，推荐使用1个主操作 + n 个次操作，3个以上操作时把更多操作放到 <code>Dropdown.Button</code> 中组合使用。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="button-ghost"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>幽灵按钮</a></div>
                <div>
                    <p>幽灵按钮将其他按钮的内容反色，背景变为透明，常用在有色背景上。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-button >}}

## API

通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：`type` -> `shape` -> `size` -> `loading` -> `disabled`

按钮的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ghost | 幽灵属性，使按钮背景透明，版本 2.7 中增加 | boolean | false |
| href | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 | string | - |
| htmlType | 设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) | string | `button` |
| icon | 设置按钮的图标类型 | string | - |
| loading | 设置按钮载入状态 | boolean \| { delay: number } | `false` |
| funcType | 设置按钮功能，可选值为 `raised` `flat` | string | `flat` |
| shape | 设置按钮形状，可选值为 `circle` 或者不设 | string | - |
| size | 设置按钮大小，可选值为 `small` `large` 或者不设 | string | `default` |
| target | 相当于 a 链接的 target 属性，href 存在时生效 | string | - |
| type | 设置按钮类型，可选值为 `primary` `dashed` `danger`(版本 2.7 中增加) 或者不设 | string | - |
| onClick | `click` 事件的 handler | function | - |

`<Button>Hello world!</Button>` 最终会被渲染为 `<button><span>Hello world!</span></button>`，并且除了上表中的属性，其它属性都会直接传到 `<button></button>`。

`<Button href="http://example.com">Hello world!</Button>` 则会渲染为 `<a href="http://example.com"><span>Hello world!</span></a>`。

<style>
[id^="components-button-demo-"] .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
[id^="components-button-demo-"] .ant-btn-group > .ant-btn {
  margin-right: 0;
}
</style>
