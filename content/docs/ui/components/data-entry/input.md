+++
title = "Input 输入框"
weight = 7
+++

# Input 输入框

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 何时使用

- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框，还可以进行大小选择。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="input-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本使用</a></div>
                <div>
                    <p>基本使用。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="input-demo-label"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>前置/后置标签</a></div>
                <div>
                    <p>用于配置一些固定组合。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="input-demo-search"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>搜索框</a></div>
                <div>
                    <p>带有搜索按钮的输入框。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="input-demo-autoHeight"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>使用文本高度的文本域</a></div>
                <div>
                    <p><code>autosize</code> 属性适用于 <code>textarea</code> 节点，并且只有高度会自动变化。另外 <code>autosize</code> 可以设定为一个对象，指定最小行数和最大行数。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="input-demo-presuffix"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>前缀和后缀</a></div>
                <div>
                    <p>在输入框上添加前缀或后缀图标。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="input-demo-size"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>三种大小</a></div>
                <div>
                    <p>我们为 <code>&lt;Input /&gt;</code> 输入框定义了三种尺寸（大、默认、小），高度分别为 <code>40px</code>、<code>32px</code> 和 <code>24px</code>。
                    </p><p>注意： 在表单里面，我们只使用大尺寸的输入框。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="input-demo-group"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>输入框组合</a></div>
                <div>
                    <p>输入框的组合展现。</p>
                    <p>注意：使用 <code>compact</code> 模式时，不需要通过 <code>Col</code> 来控制宽度。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="input-demo-field"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>文本域</a></div>
                <div>
                    <p>用于多行输入。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="input-demo-format"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>输入时格式化展现</a></div>
                <div>
                    <p>结合 <a href="../../data-display/tooltip/">Tooltip</a> 组件，实现一个数值输入框，方便内容超长时的全量展现。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-input >}}

## API

### Input

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| addonAfter | 带标签的 input，设置后置标签 | string\|ReactNode |  |
| addonBefore | 带标签的 input，设置前置标签 | string\|ReactNode |  |
| defaultValue | 输入框默认内容 | string |  |
| disabled | 是否禁用状态，默认为 false | boolean | false |
| id | 输入框的 id | string |  |
| prefix | 带有前缀图标的 input | string\|ReactNode |  |
| size | 控件大小。注：标准表单内的输入框大小限制为 `large`。可选 `large` `default` `small` | string | `default` |
| suffix | 带有后缀图标的 input | string\|ReactNode |  |
| type | 声明 input 类型，同原生 input 标签的 type 属性，见：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#属性)(请直接使用 `Input.TextArea` 代替 `type="textarea"`)。 | string | `text` |
| value | 输入框内容 | string |  |
| onPressEnter | 按下回车的回调 | function(e) |  |
| copy | 显示复制按钮 | boolean | false |
| onCopy | 点击复制按钮的回调 | function(copyValue) |  |
| underline | input 下划线 | boolean | true |

> 如果 `Input` 在 `Form.Item` 内，并且 `Form.Item` 设置了 `id` 和 `options` 属性，则 `value` `defaultValue` 和 `id` 属性会被自动设置。

Input 的其他属性和 React 自带的 [input](https://facebook.github.io/react/docs/events.html#supported-events) 一致。

### Input.TextArea

> `2.12` 后新增的组件，旧版请使用 `Input[type=textarea]`。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autosize | 自适应内容高度，可设置为 `true|false` 或对象：`{ minRows: 2, maxRows: 6 }` | boolean\|object | false |
| defaultValue | 输入框默认内容 | string |  |
| value | 输入框内容 | string |  |
| onPressEnter | 按下回车的回调 | function(e) |  |

`Input.TextArea` 的其他属性和浏览器自带的 [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) 一致。

#### Input.Search

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| enterButton | 是否有确认按钮，可设为按钮文字 | boolean\|ReactNode | false |
| onSearch | 点击搜索或按下回车键时的回调 | function(value) |  |

其余属性和 Input 一致。

#### Input.Group

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| compact | 是否用紧凑模式 | boolean | false |
| size | `Input.Group` 中所有的 `Input` 的大小，可选 `large` `default` `small` | string | `default` |

```html
<Input.Group>
  <Input />
  <Input />
</Input.Group>
```
