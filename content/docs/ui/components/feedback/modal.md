+++
title = "Modal 对话框"
weight = 2
+++

# Modal 对话框

模态对话框。

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `Modal` 在当前页面正中打开一个浮层，承载相应的操作。

另外当需要一个简洁的确认框询问用户时，可以使用精心封装好的 `antd.Modal.confirm()` 等方法。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="modal-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本</a></div>
                <div>
                    <p>第一个对话框。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="modal-demo-pagefooter"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自定义页脚</a></div>
                <div>
                    <p>更复杂的例子，自定义了页脚的按钮，点击提交后进入 loading 状态，完成后关闭。</p>
                    <p>不需要默认确定取消按钮时，你可以把 <code>footer</code> 设为 <code>null</code>。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="modal-demo-confirm"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>确认对话框</a></div>
                <div>
                    <p>使用 <code>confirm()</code> 可以快捷地弹出确认框。onCancel/onOk 返回 promise 可以延迟关闭</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="modal-demo-i18n"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>国际化</a></div>
                <div>
                    <p>设置 <code>okText</code> 与 <code>cancelText</code> 以自定义按钮文字。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="modal-demo-location"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自定义位置</a></div>
                <div>
                    <p><code>1.0</code> 之后，Modal 的 <code>align</code> 属性被移除，您可以直接使用 <code>style.top</code> 或配合其他样式来设置对话框位置。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="modal-demo-close"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>异步关闭</a></div>
                <div>
                    <p>点击确定后异步关闭对话框，例如提交表单。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="modal-demo-confirm2"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>确认对话框</a></div>
                <div>
                    <p>使用 <code>confirm()</code> 可以快捷地弹出确认框。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="modal-demo-tip"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>信息提示</a></div>
                <div>
                    <p>各种类型的信息提示，只提供一个按钮用于关闭。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="modal-demo-remove"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>手动移除</a></div>
                <div>
                    <p>手动关闭modal。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="modal-demo-sidebar"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>侧边弹出</a></div>
                <div>
                    <p>侧边弹出。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-modal >}}

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| afterClose | Modal 完全关闭后的回调 | function | 无 |
| bodyStyle | Modal body 样式 | object | {} |
| cancelText | 取消按钮文字 | string | 取消 |
| closable | 是否显示右上角的关闭按钮 | boolean | true |
| confirmLoading | 确定按钮 loading | boolean | 无 |
| destroyOnClose | 关闭时销毁 Modal 里的子元素 | boolean | false |
| footer | 底部内容，当不需要默认底部按钮时，可以设为 `footer={null}` | string\|ReactNode | 确定取消按钮 |
| getContainer | 指定 Modal 挂载的 HTML 节点 | (instance): HTMLElement | () => document.body |
| mask | 是否展示遮罩 | Boolean | true |
| maskClosable | 点击蒙层是否允许关闭 | boolean | true |
| maskStyle | 遮罩样式 | object | {} |
| okText | 确认按钮文字 | string | 确定 |
| okType | 确认按钮类型 | string | primary |
| style | 可用于设置浮层的样式，调整浮层位置等 | object | - |
| title | 标题 | string\|ReactNode | 无 |
| visible | 对话框是否可见 | boolean | 无 |
| width | 宽度 | string\|number | 520 |
| wrapClassName | 对话框外层容器的类名 | string | - |
| zIndex | 设置 Modal 的 `z-index` | Number | 1000 |
| onCancel | 点击遮罩层或右上角叉或取消按钮的回调 | function(e) | 无 |
| onOk | 点击确定回调 | function(e) | 无 |
| funcType | 按钮功能 | string | 无 |

#### 注意

> `<Modal />` 默认关闭后状态不会自动清空, 如果希望每次打开都是新内容，请设置 `destroyOnClose`。

### Modal.SideBar

侧边栏弹出窗，API同Modal

### Modal.method()

包括：

- `Modal.info`
- `Modal.success`
- `Modal.error`
- `Modal.warning`
- `Modal.confirm`

以上均为一个函数，参数为 object，具体属性如下：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cancelText | 取消按钮文字 | string | 取消 |
| className | 容器类名 | string | - |
| content | 内容 | string\|ReactNode | 无 |
| iconType | 图标 Icon 类型 | string | question-circle |
| maskClosable | 点击蒙层是否允许关闭 | Boolean | `false` |
| okText | 确认按钮文字 | string | 确定 |
| okType | 确认按钮类型 | string | primary |
| title | 标题 | string\|ReactNode | 无 |
| width | 宽度 | string\|number | 416 |
| zIndex | 设置 Modal 的 `z-index` | Number | 1000 |
| onCancel | 取消回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭 | function | 无 |
| onOk | 点击确定回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭 | function | 无 |

以上函数调用后，会返回一个引用，可以通过该引用关闭弹窗。

```jsx
const ref = Modal.info();
ref.destroy();
```

<style>
.code-box-demo .ant-btn {
  margin-right: 8px;
}
</style>