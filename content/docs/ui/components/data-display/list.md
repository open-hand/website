+++
title = "List 列表"
weight = 7
+++

# List 列表

通用列表。

## 何时使用

最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。

<div class="c7n-row">
    <div class="c7n-row-12">
        <section class="code-box">
            <section class="code-box-demo"><div id="list-demo-simple"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>简单列表</a></div>
                <div>
                    <p>列表拥有大、中、小三种尺寸。</p>
                    <p>通过设置 <code>size</code> 为 <code>large</code> <code>small</code> 分别把按钮设为大、小尺寸。若不设置 <code>size</code>，则尺寸为中。</p>
                    <p>可通过设置 <code>header</code> 和 <code>footer</code>，来自定义列表头部和尾部。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="list-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基础列表</a></div>
                <div>
                    <p>基础列表。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="list-demo-more"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>加载更多</a></div>
                <div>
                    <p>可通过 <code>loadMore</code> 属性实现加载更多功能。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="list-demo-vertical"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>竖排列表样式</a></div>
                <div>
                    <p>通过设置 <code>itemLayout</code> 属性为 <code>vertical</code> 可实现竖排列表样式。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="list-demo-grid"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>栅格列表</a></div>
                <div>
                    <p>可以通过设置 <code>List</code> 的 <code>grid</code> 属性来实现栅格列表，<code>column</code> 可设置期望显示的列数。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="list-demo-response"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>响应式的栅格列表</a></div>
                <div>
                    <p>响应式的栅格列表。尺寸与 <a>Layout Grid</a> 保持一致。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="list-demo-load"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>滚动加载</a></div>
                <div>
                    <p>结合 <a href="https://github.com/CassetteRocks/react-infinite-scroller">react-infinite-scroller</a> 实现滚动自动加载列表。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-list >}}

## API

### List

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| bordered | 是否展示边框 | boolean | false |
| footer | 列表底部 | string\|ReactNode | - |
| grid | 列表栅格配置 | object | - |
| header | 列表头部 | string\|ReactNode | - |
| itemLayout | 设置 `List.Item` 布局, 设置成 `vertical` 则竖直样式显示, 默认横排 | string | - |
| loading | 当卡片内容还在加载中时，可以用 `loading` 展示一个占位 | boolean\|[object](https://ant.design/components/spin-cn/#API) ([更多](https://github.com/ant-design/ant-design/issues/8659)) | false |
| loadMore | 加载更多 | string\|ReactNode | - |
| pagination | 对应的 `pagination` 配置, 设置 `false` 不显示 | boolean\|object | false |
| size | list 的尺寸 | `default` \| `middle` \| `small` | `default` |
| split | 是否展示分割线 | boolean | true |

### List grid props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| column | 列数 | number | - |
| gutter | 栅格间隔 | number | 0 |
| xs | `<576px` 展示的列数 | number | - |
| sm | `≥576px` 展示的列数 | number | - |
| md | `≥768px` 展示的列数 | number | - |
| lg | `≥992px` 展示的列数 | number | - |
| xl | `≥1200px` 展示的列数 | number | - |
| xxl | `≥1600px` 展示的列数 | number | - |

### List.Item

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| actions | 列表操作组，根据 `itemLayout` 的不同, 位置在卡片底部或者最右侧 | Array&lt;ReactNode> | - |
| extra | 额外内容, 通常用在 `itemLayout` 为 `vertical` 的情况下, 展示右侧内容; `horizontal` 展示在列表元素最右侧 | string\|ReactNode | - |

### List.Item.Meta

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| avatar | 列表元素的图标 | ReactNode | - |
| description | 列表元素的描述内容 | string\|ReactNode | - |
| title | 列表元素的标题 | string\|ReactNode | - |
