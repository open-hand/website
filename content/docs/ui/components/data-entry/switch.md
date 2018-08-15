+++
title = "Switch 开关"
weight = 13
+++

# Switch 开关

开关选择器。

## 何时使用

- 需要表示开关状态/两种状态之间的切换时；
- 和 `checkbox`的区别是，切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="switch-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本</a></div>
                <div>
                    <p>最简单的用法。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="switch-demo-icon"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>文字和图标</a></div>
                <div>
                    <p>带有文字和图标。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="switch-demo-load"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>加载中</a></div>
                <div>
                    <p>标识开关操作仍在执行中。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="switch-demo-disabled"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>不可用</a></div>
                <div>
                    <p>Switch 失效状态。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="switch-demo-size"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>两种大小</a></div>
                <div>
                    <p><code>size="small"</code> 表示小号开关。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-switch >}}

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoFocus | 组件自动获取焦点 | boolean | false |
| checked | 指定当前是否选中 | boolean | false |
| checkedChildren | 选中时的内容 | string\|ReactNode |  |
| defaultChecked | 初始是否选中 | boolean | false |
| disabled | 是否禁用 | boolean | false |
| loading | 加载中的开关 | boolean | false |
| size | 开关大小，可选值：`default` `small` | string | default |
| unCheckedChildren | 非选中时的内容 | string\|ReactNode |  |
| onChange | 变化时回调函数 | Function(checked:Boolean) |  |

## 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |
