+++
title = "Pagination 分页"
weight = 5
+++

# Pagination 分页

采用分页的形式分隔长列表，每次只加载一个页面。

## 何时使用

- 当加载/渲染所有数据将花费很多时间时；
- 可切换页码浏览数据。

## 代码演示
<div class="c7n-row">
    <div class="c7n-row-12">
        <section class="code-box">
            <section class="code-box-demo"><div id="pagination-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基础</a></div>
                <div>
                    <p>基础分页。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="pagination-more"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>更多</a></div>
                <div>
                    <p>更多分页。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="pagination-current"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>改变</a></div>
                <div>
                    <p>改变每页显示条目数。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="pagination-jump"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>跳转</a></div>
                <div>
                    <p>快速跳转到某一页。</p>
                </div>
            </section>
        </section>
        <section class="code-box" class="components-pagination-demo-mini">
            <section class="code-box-demo"><div id="pagination-size"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>尺寸</a></div>
                <div>
                    <p>尺寸。</p>
                </div>
            </section>
        </section>
        <section class="code-box" class="components-pagination-demo-mini">
            <section class="code-box-demo"><div id="pagination-tiny"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>微型</a></div>
                <div>
                    <p>微型版本。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="pagination-simple"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>简洁</a></div>
                <div>
                    <p>简单的翻页。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="pagination-controlled"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>受控</a></div>
                <div>
                    <p>受控制的页码。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="pagination-total"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>总数</a></div>
                <div>
                    <p>通过设置 <code>showTotal</code> 展示总共有多少数据。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="pagination-itemRender"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>上一部和下一步</a></div>
                <div>
                    <p>修改上一步和下一步为文字链接。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-pagination >}}

## API

```html
<Pagination onChange={onChange} total={50} />
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 当前页数 | number | - |
| defaultCurrent | 默认的当前页数 | number | 1 |
| defaultPageSize | 默认的每页条数 | number | 10 |
| hideOnSinglePage | 只有一页时是否隐藏分页器 | boolean | false |
| itemRender | 用于自定义页码的结构，可用于优化 SEO | (page, type: 'page' \| 'prev' \| 'next', originalElement) => React.ReactNode | - |
| pageSize | 每页条数 | number | - |
| pageSizeOptions | 指定每页可以显示多少条 | string\[] | ['10', '20', '30', '40'] |
| showQuickJumper | 是否可以快速跳转至某页 | boolean | false |
| showSizeChanger | 是否可以改变 pageSize | boolean | false |
| showTotal | 用于显示数据总量和当前数据顺序 | Function(total, range) | - |
| simple | 当添加该属性时，显示为简单分页 | boolean | - |
| tiny | 当添加该属性时，显示为简单分页 | boolean | true |
| size | 当为「small」时，是小尺寸分页 | string | "" |
| total | 数据总数 | number | 0 |
| onChange | 页码改变的回调，参数是改变后的页码及每页条数 | Function(page, pageSize) | noop |
| onShowSizeChange | pageSize 变化的回调 | Function(current, size) | noop |
