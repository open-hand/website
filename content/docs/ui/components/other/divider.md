+++
title = "Divider 分割线"
weight = 3
+++

# Divider 分割线

区隔内容的分割线。

## 何时使用

- 对不同章节的文本段落进行分割。
- 对行内文字/链接进行分割，例如表格的操作列。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="divider-demo-horizontal"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>水平分割线</a></div>
                <div>
                    <p>默认为水平分割线，可在中间加入文字。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="divider-demo-vertical"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>垂直分割线</a></div>
                <div>
                   <p>使用 <code>type="vertical"</code> 设置为行内的垂直分割线。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-divider >}}

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dashed | 是否虚线 | Boolean | false |
| type | 水平还是垂直类型 | enum: `horizontal` `vertical` | `horizontal` |
