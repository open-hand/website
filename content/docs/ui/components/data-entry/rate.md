+++
title = "Rate 评分"
weight = 9
+++

# Rate 评分

评分组件。

## 何时使用

- 对评价进行展示。
- 对事物进行快速的评级操作。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="rate-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本</a></div>
                <div>
                    <p>最简单的用法。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="rate-demo-text"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>文案展现</a></div>
                <div>
                    <p>给评分组件加上文案展示。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="rate-demo-delete"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>清除</a></div>
                <div>
                    <p>支持允许或者禁用清除。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="rate-demo-half"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>半星</a></div>
                <div>
                    <p>支持选中半星。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="rate-demo-readonly"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>只读</a></div>
                <div>
                    <p>只读，无法进行鼠标交互。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="rate-demo-other"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>其他字符</a></div>
                <div>
                    <p>可以将星星替换为其他字符，比如字母，数字，字体图标甚至中文。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-rate >}}

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 是否允许再次点击后清除 | boolean | true |
| allowHalf | 是否允许半选 | boolean | false |
| autoFocus | 自动获取焦点 | boolean | false |
| character | 自定义字符 | ReactNode | `<Icon type="star" />` |
| className | 自定义样式类名 | string | - |
| count | star 总数 | number | 5 |
| defaultValue | 默认值 | number | 0 |
| disabled | 只读，无法进行交互 | boolean | false |
| style | 自定义样式对象 | object | - |
| value | 当前数，受控值 | number | - |
| onBlur | 失去焦点时的回调 | Function() | - |
| onChange | 选择时的回调 | Function(value: number) | - |
| onFocus | 获取焦点时的回调 | Function() | - |
| onHoverChange | 鼠标经过时数值变化的回调 | Function(value: number) | - |
| onKeyDown | 按键回调 | Function(event) | - |

## 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |
