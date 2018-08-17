+++
title = "Grid 栅格"
weight = 1
+++

# Grid 栅格

24 栅格系统。

## 设计理念

<div class="grid-demo">
<div class="ant-row demo-row">
  <div class="ant-col-24 demo-col demo-col-1">
    100%
  </div>
</div>
<div class="ant-row demo-row">
  <div class="ant-col-6 demo-col demo-col-2">
    25%
  </div>
  <div class="ant-col-6 demo-col demo-col-3">
    25%
  </div>
  <div class="ant-col-6 demo-col demo-col-2">
    25%
  </div>
  <div class="ant-col-6 demo-col demo-col-3">
    25%
  </div>
</div>
<div class="ant-row demo-row">
  <div class="ant-col-8 demo-col demo-col-4">
    33.33%
  </div>
  <div class="ant-col-8 demo-col demo-col-5">
    33.33%
  </div>
  <div class="ant-col-8 demo-col demo-col-4">
    33.33%
  </div>
</div>
<div class="ant-row demo-row">
  <div class="ant-col-12 demo-col demo-col-1">
    50%
  </div>
  <div class="ant-col-12 demo-col demo-col-3">
    50%
  </div>
</div>
<div class="ant-row demo-row">
  <div class="ant-col-16 demo-col demo-col-4">
    66.66%
  </div>
  <div class="ant-col-8 demo-col demo-col-5">
    33.33%
  </div>
</div>
</div>

在多数业务情况下，Ant Design需要在设计区域内解决大量信息收纳的问题，因此在 12 栅格系统的基础上，我们将整个设计建议区域按照 24 等分的原则进行划分。

划分之后的信息区块我们称之为『盒子』。建议横向排列的盒子数量最多四个，最少一个。『盒子』在整个屏幕上占比见上图。设计部分基于盒子的单位定制盒子内部的排版规则，以保证视觉层面的舒适感。

## 概述

布局的栅格化系统，我们是基于行（row）和列（col）来定义信息区块的外部框架，以保证页面的每个区域能够稳健地排布起来。下面简单介绍一下它的工作原理：

- 通过`row`在水平方向建立一组`column`（简写col）
- 你的内容应当放置于`col`内，并且，只有`col`可以作为`row`的直接元素
- 栅格系统中的列是指1到24的值来表示其跨越的范围。例如，三个等宽的列可以使用`.col-8`来创建
- 如果一个`row`中的`col`总和超过 24，那么多余的`col`会作为一个整体另起一行排列

## Flex 布局

我们的栅格化系统支持 Flex 布局，允许子元素在父节点内的水平对齐方式 - 居左、居中、居右、等宽排列、分散排列。子元素与子元素之间，支持顶部对齐、垂直居中对齐、底部对齐的方式。同时，支持使用 order 来定义元素的排列顺序。

Flex 布局是基于 24 栅格来定义每一个『盒子』的宽度，但排版则不拘泥于栅格。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-12">
        <section class="code-box" id="grid-components-demo-basic">
            <section class="code-box-demo"><div id="grid-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基础栅格</a></div>
                <div>
                    <p>从堆叠到水平排列。</p>
                    <p>使用单一的一组 <code>Row</code> 和 <code>Col</code> 栅格组件，就可以创建一个基本的栅格系统，所有列（Col）必须放在 <code>Row</code> 内。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="grid-gutter"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>区块间隔</a></div>
                <div>
                    <p>栅格常常需要和间隔进行配合，你可以使用 <code>Row</code> 的 <code>gutter</code> 属性，我们推荐使用 <code>(16+8n)px</code> 作为栅格间隔。(n 是自然数)</p><p>如果要支持响应式，可以写成 <code>{ xs: 8, sm: 16, md: 24, lg: 32 }</code>。</p>
                </div>
            </section>
        </section>
        <section class="code-box" id="grid-components-demo-offset">
            <section class="code-box-demo"><div id="grid-offset"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>左右偏移</a></div>
                <div>
                    <p>列偏移。</p>
                    <p>使用 <code>offset</code> 可以将列向右侧偏。例如，<code>offset={4}</code> 将元素向右侧偏移了 4 个列（column）的宽度。</p>
                </div>
            </section>
        </section>
        <section class="code-box" id="grid-components-demo-sort">
            <section class="code-box-demo"><div id="grid-sort"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>栅格排序</a></div>
                <div>
                    <p>列排序。</p>
                    <p>通过使用 <code>push</code> 和 <code>pull</code> 类就可以很容易的改变列（column）的顺序。</p>
                </div>
            </section>
        </section>
        <section class="code-box" id="grid-components-demo-flex">
            <section class="code-box-demo"><div id="grid-flex"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>Flex 布局</a></div>
                <div>
                    <p>Flex 布局基础。</p>
                    <p>使用 <code>row-flex</code> 定义 <code>flex</code> 布局，其子元素根据不同的值 <code>start</code>,<code>center</code>,<code>end</code>,<code>space-between</code>,<code>space-around</code>，分别定义其在父节点里面的排版方式。</p>
                </div>
            </section>
        </section>
        <section class="code-box" id="grid-components-demo-align">
            <section class="code-box-demo"><div id="grid-align"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>Flex 对齐</a></div>
                <div>
                    <p>Flex 子元素垂直对齐。</p>
                </div>
            </section>
        </section>
        <section class="code-box" id="grid-components-demo-order">
            <section class="code-box-demo"><div id="grid-flex-order"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>Flex 排序</a></div>
                <div>
                    <p>通过 Flex 布局的 Order 来改变元素的排序。</p>
                </div>
            </section>
        </section>
        <section class="code-box" id="grid-components-demo-responsive">
            <section class="code-box-demo"><div id="grid-responsive"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>响应式布局</a></div>
                <div>
                    <p>参照 Bootstrap 的 <a href="http://getbootstrap.com/css/#grid-media-queries">响应式设计</a>，预设五个响应尺寸：<code>xs</code> <code>sm</code> <code>md</code> <code>lg</code> <code>xl</code>  <code>xxl</code>。</p>
                </div>
            </section>
        </section>
        <section class="code-box" id="grid-components-demo-responsive-more">
            <section class="code-box-demo"><div id="grid-responsive-more"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>其他属性的响应式</a></div>
                <div>
                    <p><code>span</code> <code>pull</code> <code>push</code> <code>offset</code> <code>order</code> 属性可以通过内嵌到 <code>xs</code> <code>sm</code> <code>md</code> <code>lg</code> <code>xl</code> <code>xxl</code> 属性中来使用。</p><p>其中 <code>xs={6}</code> 相当于 <code>xs={{ span: 6 }}</code>。</p>
                </div>
            </section>
        </section>
        <section class="code-box" id="grid-components-demo-playground">
            <section class="code-box-demo"><div id="grid-playground"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>栅格配置器</a></div>
                <div>
                    <p>可以简单配置几种等分栅格和间距。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-grid >}}

## API

Ant Design 的布局组件若不能满足你的需求，你也可以直接使用社区的优秀布局组件：

- [react-flexbox-grid](http://roylee0704.github.io/react-flexbox-grid/)
- [react-blocks](https://github.com/whoisandy/react-blocks/)

### Row

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | flex 布局下的垂直对齐方式：`top` `middle` `bottom` | string | `top` |
| gutter | 栅格间隔，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | number/object | 0 |
| justify | flex 布局下的水平排列方式：`start` `end` `center` `space-around` `space-between` | string | `start` |
| type | 布局模式，可选 `flex`，[现代浏览器](http://caniuse.com/#search=flex) 下有效 | string |  |

### Col

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offset | 栅格左侧的间隔格数，间隔内不可以有栅格 | number | 0 |
| order | 栅格顺序，`flex` 布局模式下有效 | number | 0 |
| pull | 栅格向左移动格数 | number | 0 |
| push | 栅格向右移动格数 | number | 0 |
| span | 栅格占位格数，为 0 时相当于 `display: none` | number | - |
| xs | `<576px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number\|object | - |
| sm | `≥576px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number\|object | - |
| md | `≥768px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number\|object | - |
| lg | `≥992px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number\|object | - |
| xl | `≥1200px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number\|object | - |
| xxl | `≥1600px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number\|object | - |

响应式栅格的断点扩展自 [BootStrap 4 的规则](https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints)（不包含链接里 `occasionally` 的部分)。