+++
title = "BackTop 回到顶部"
weight = 2
+++

# BackTop 回到顶部

返回页面顶部的操作按钮。

## 何时使用

- 当页面内容区域比较长时；
- 当用户需要频繁返回顶部查看相关内容时。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="backTop-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本</a></div>
                <div>
                    <p>最简单的用法。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="backTop-demo-custom"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自定义样式</a></div>
                <div>
                    <p>可以自定义回到顶部按钮的样式，限制宽高：<code>40px * 40px</code>。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-backTop >}}

## API

> 有默认样式，距离底部 `50px`，可覆盖。
>
> 自定义样式宽高不大于 40px \* 40px。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| target | 设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | Function | () => window |
| visibilityHeight | 滚动高度达到此参数值才出现 `BackTop` | number | 400 |
| onClick | 点击按钮的回调函数 | Function | - |
