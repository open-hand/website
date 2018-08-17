+++
title = "Badge 徽标数"
weight = 2
+++

# Badge 徽标数

图标右上角的圆形徽标数字。

## 何时使用

一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="badge-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本</a></div>
                <div>
                    <p>简单的徽章展示，当 <code>count</code> 为 <code>0</code> 时，默认不显示，但是可以使用 <code>showZero</code> 修改为显示。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="badge-demo-max"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>封顶数字</a></div>
                <div>
                    <p>超过 <code>overflowCount</code> 的会显示为 <code>${overflowCount}+</code>，默认的 <code>overflowCount</code> 为 <code>99</code>。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="badge-demo-click"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>可点击</a></div>
                <div>
                    <p>用 a 标签进行包裹即可。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="badge-demo-status"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>状态点</a></div>
                <div>
                    <p>用于表示状态的小圆点。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="badge-demo-single"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>独立使用</a></div>
                <div>
                    <p>不包裹任何元素即是独立使用，可自定样式展现。</p>
                    <blockquote><p>在右上角的 badge 则限定为红色。</p></blockquote>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="badge-demo-red"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>讨嫌的小红带</a></div>
                <div>
                    <p>没有具体的数字。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="badge-demo-dynamic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>动态</a></div>
                <div>
                    <p>展示动态变化的效果。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-badge >}}

## API

```jsx
<Badge count={5}>
  <a href="#" className="head-example" />
</Badge>
```

```jsx
<Badge count={5} />
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| count | 展示的数字，大于 overflowCount 时显示为 `${overflowCount}+`，为 0 时隐藏 | number\|ReactNode  |  |
| dot | 不展示数字，只有一个小红点 | boolean | false |
| offset | 设置状态点的位置偏移，格式为 `[x, y]` | `[number, number]` | - |
| overflowCount | 展示封顶的数字值 | number | 99 |
| showZero | 当数值为 0 时，是否展示 Badge | boolean | false |
| status | 设置 Badge 为状态点 | Enum{ 'success', 'processing, 'default', 'error', 'warning' } | '' |
| text | 在设置了 `status` 的前提下有效，设置状态点的文本 | string | '' |
