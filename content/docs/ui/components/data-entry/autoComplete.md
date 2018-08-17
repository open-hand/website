+++
title = "AutoComplete 自动完成"
weight = 1
+++

# AutoComplete 自动完成

输入框自动完成功能。

## 何时使用

需要自动完成时。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="autoComplete-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本使用</a></div>
                <div>
                    <p>基本使用。通过 dataSource 设置自动完成的数据源</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="autoComplete-input"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自定义输入组件</a></div>
                <div>
                    <p>自定义输入组件。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="autoComplete-certain"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>查询模式-确定类目</a></div>
                <div>
                    <p>查询模式: 确定类目示例。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="autoComplete-custom"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自定义选项</a></div>
                <div>
                    <p>也可以直接传 <code>AutoComplete.Option</code> 作为 <code>AutoComplete</code> 的 <code>children</code>，而非使用 <code>dataSource</code>。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="autoComplete-non-sensitive"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>不区分大小写</a></div>
                <div>
                    <p>不区分大小写的 AutoComplete</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="autoComplete-uncertain"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>查询模式: 不确定类目</a></div>
                <div>
                    <p>查询模式: 不确定类目示例。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-autoComplete >}}

## API

```jsx
const dataSource = ['12345', '23456', '34567'];
<AutoComplete dataSource={dataSource} />
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 支持清除, 单选模式有效 | boolean | false |
| autoFocus | 自动获取焦点 | boolean | false |
| backfill | 使用键盘选择选项的时候把选中项回填到输入框中 | boolean | false |
| children (自动完成的数据源) | 自动完成的数据源 | React.ReactElement<OptionProps> / Array&lt;React.ReactElement<OptionProps>> | - |
| children (自定义输入框) | 自定义输入框 | HTMLInputElement / HTMLTextAreaElement / React.ReactElement<InputProps> | `<Input />` |
| dataSource | 自动完成的数据源 | [DataSourceItemType](https://git.io/vMMKF)\[] |  |
| defaultActiveFirstOption | 是否默认高亮第一个选项。 | boolean | true |
| defaultValue | 指定默认选中的条目 | string\|string\[]\|{ key: string, label: string\|ReactNode }\|Array&lt;{ key: string, label: string\|ReactNode}> | 无 |
| disabled | 是否禁用 | boolean | false |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。 | boolean or function(inputValue, option) | true |
| optionLabelProp | 回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 `value`。 | string | `children` |
| placeholder | 输入框提示 | string | - |
| value | 指定当前选中的条目 | string\|string\[]\|{ key: string, label: string\|ReactNode }\|Array&lt;{ key: string, label: string\|ReactNode }> | 无 |
| onChange | 选中 option，或 input 的 value 变化时，调用此函数 | function(value) | 无 |
| onSearch | 搜索补全项的时候调用 | function(value) | 无 |
| onSelect | 被选中时调用，参数为选中项的 value 值 | function(value, option) | 无 |

## 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |
