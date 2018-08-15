+++
title = "InputNumber 数字输入框"
weight = 6
+++

# InputNumber 数字输入框

通过鼠标或键盘，输入范围内的数值。

## 何时使用

当需要获取标准数值时。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="inputNumber-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基础</a></div>
                <div>
                    <p>数字输入框。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="inputNumber-demo-disabled"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>不可用</a></div>
                <div>
                    <p>点击按钮切换可用状态。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="inputNumber-demo-point"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>小数</a></div>
                <div>
                    <p>和原生的数字输入框一样，value 的精度由 step 的小数位数决定。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="inputNumber-demo-format"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>格式化展现</a></div>
                <div>
                    <p>通过 <code>formatter</code> 格式化数字，以展示具有具体含义的数据，往往需要配合 <code>parser</code> 一起使用。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-inputNumber >}}

## API

属性如下

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoFocus | 自动获取焦点 | boolean | false |
| defaultValue | 初始值 | number |  |
| disabled | 禁用 | boolean | false |
| formatter | 指定输入框展示值的格式 | function(value: number \| string): string | - |
| max | 最大值 | number | Infinity |
| min | 最小值 | number | -Infinity |
| parser | 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用 | function( string): number | - |
| precision | 数值精度 | number | - |
| step | 每次改变步数，可以为小数 | number\|string | 1 |
| value | 当前值 | number |  |
| onChange | 变化回调 | Function(value: number \| string) |  |


## 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |