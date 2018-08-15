+++
title = "Checkbox 多选框"
weight = 3
+++

# Checkbox 多选框

多选框。

## 何时使用

- 在一组可选项中进行多项选择时；
- 单独使用可以表示两种状态之间的切换，和 `switch` 类似。区别在于切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="checkbox-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本用法</a></div>
                <div>
                    <p>简单的 checkbox。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="checkbox-controller"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>受控的 Checkbox</a></div>
                <div>
                    <p>联动 checkbox。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="checkbox-all"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>全选</a></div>
                <div>
                    <p>在实现全选效果时，你可能会用到 <code>indeterminate</code> 属性。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="checkbox-disabled"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>不可用</a></div>
                <div>
                    <p>checkbox 不可用。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="checkbox-group"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>Checkbox 组</a></div>
                <div>
                    <p>方便的从数组生成 Checkbox 组。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="checkbox-layout"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>布局</a></div>
                <div>
                    <p>Checkbox.Group 内嵌 Checkbox 并与 Grid 组件一起使用，可以实现灵活的布局。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-checkbox >}}

## API

### Checkbox

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoFocus | 自动获取焦点 | boolean | false |
| checked | 指定当前是否选中 | boolean | false |
| defaultChecked | 初始是否选中 | boolean | false |
| indeterminate | 设置 indeterminate 状态，只负责样式控制 | boolean | false |
| onChange | 变化时回调函数 | Function(e:Event) | - |

### Checkbox Group

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认选中的选项 | string\[] | \[] |
| options | 指定可选项 | string\[] | \[] |
| value | 指定选中的选项 | string\[] | \[] |
| onChange | 变化时回调函数 | Function(checkedValue) | - |

## 方法

### Checkbox

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |
