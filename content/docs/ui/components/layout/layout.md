+++
title = "Layout 布局"
weight = 2
+++

# Layout 布局

协助进行页面级整体布局。

## 设计规则

### 尺寸

一级导航项偏左靠近 logo 放置，辅助菜单偏右放置。

- 顶部导航（大部分系统）：一级导航高度 `64px`，二级导航 `48px`。
- 顶部导航（展示类页面）：一级导航高度 `80px`，二级导航 `56px`。
- 顶部导航高度的范围计算公式为：`48+8n`。
- 侧边导航宽度的范围计算公式：`200+8n`。

### 交互

- 一级导航和末级的导航需要在可视化的层面被强调出来；
- 当前项应该在呈现上优先级最高；
- 当导航收起的时候，当前项的样式自动赋予给它的上一个层级；
- 左侧导航栏的收放交互同时支持手风琴和全展开的样式，根据业务的要求进行适当的选择。

### 视觉

导航样式上需要根据信息层级合理的选择样式：

- **大色块强调**

  建议用于底色为深色系时，当前页面父级的导航项。

- **高亮火柴棍**

  当导航栏底色为浅色系时使用，可用于当前页面对应导航项，建议尽量在导航路径的最终项使用。

- **字体高亮变色**

  从可视化层面，字体高亮的视觉强化力度低于大色块，通常在当前项的上一级使用。

- **字体放大**

  `12px`、`14px` 是导航的标准字号，14 号字体用在一、二级导航中。字号可以考虑导航项的等级做相应选择。

## 组件概述

- `Layout`：布局容器，其下可嵌套 `Header` `Sider` `Content` `Footer` 或 `Layout` 本身，可以放在任何父容器中。
- `Header`：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Sider`：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Content`：内容部分，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Footer`：底部布局，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。

> 注意：采用 flex 布局实现，请注意[浏览器兼容性](http://caniuse.com/#search=flex)问题。

## 代码演示
<div class="c7n-row">
    <div class="c7n-row-12">
        <section class="code-box" id="components-layout-demo-basic">
            <section class="code-box-demo"><div id="layout-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本结构</a></div>
                <div>
                    <p>典型的页面布局。</p>
                </div>
            </section>
        </section>
        <section class="code-box" id="components-layout-demo-top">
            <section class="code-box-demo"><div id="layout-top"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>上中下布局</a></div>
                <div>
                    <p>最基本的『上-中-下』布局。</p>
                    <p>一般主导航放置于页面的顶端，从左自右依次为：logo、一级导航项、辅助菜单（用户、设置、通知等）。通常将内容放在固定尺寸（例如：1200px）内，整个页面排版稳定，不受用户终端显示器影响；上下级的结构符合用户上下浏览的习惯，也是较为经典的网站导航模式。页面上下切分的方式提高了主工作区域的信息展示效率，但在纵向空间上会有一些牺牲。此外，由于导航栏水平空间的限制，不适合那些一级导航项很多的信息结构。</p>
                </div>
            </section>
        </section>
        <section class="code-box" id="components-layout-demo-top-side-2">
            <section class="code-box-demo"><div id="layout-top-side-menu"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>顶部-侧边布局-通栏</a></div>
                <div>
                    <p>同样拥有顶部导航及侧边栏，区别是两边未留边距，多用于应用型的网站。</p>
                </div>
            </section>
        </section>
        <section class="code-box" id="components-layout-demo-side">
            <section class="code-box-demo"><div id="layout-top-side"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>顶部-侧边布局</a></div>
                <div>
                    <p>拥有顶部导航及侧边栏的页面，多用于展示类网站。</p>
                </div>
            </section>
        </section>
        <section class="code-box" id="components-layout-demo-custom-trigger">
            <section class="code-box-demo"><div id="layout-trigger"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自定义触发器</a></div>
                <div>
                    <p>要使用自定义触发器，可以设置 trigger={null} 来隐藏默认设定。</p>
                </div>
            </section>
        </section>
        <section class="code-box" id="components-layout-demo-responsive">
            <section class="code-box-demo"><div id="layout-responsive"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>响应式布局</a></div>
                <div>
                    <p>Layout.Sider 支持响应式布局。</p>
                    <blockquote><p>说明：配置 <code>breakpoint</code> 属性即生效，视窗宽度小于 <code>breakpoint</code> 时 Sider 缩小为 <code>collapsedWidth</code> 宽度，若将 <code>collapsedWidth</code> 设置为零，会出现特殊 trigger。</p></blockquote>
                </div>
            </section>
        </section>
        <section class="code-box" id="components-layout-demo-fixed">
            <section class="code-box-demo"><div id="layout-fixed"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>固定头部</a></div>
                <div>
                    <p>一般用于固定顶部导航，方便页面切换。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-layout >}}

## API

```jsx
<Layout>
  <Header>header</Header>
  <Layout>
    <Sider>left sidebar</Sider>
    <Content>main content</Content>
    <Sider>right sidebar</Sider>
  </Layout>
  <Footer>footer</Footer>
</Layout>
```

### Layout

布局容器。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 容器 className | string | - |
| style | 指定样式 | object | - |
| hasSider | 表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动 | boolean | - |

> `Layout.Header` `Layout.Footer` `Layout.Content` API 与 `Layout` 相同

### Layout.Sider

侧边栏。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| breakpoint | 触发响应式布局的[断点](/components/grid#api) | Enum { 'xs', 'sm', 'md', 'lg', 'xl', 'xxl' } | - |
| className | 容器 className | string | - |
| collapsed | 当前收起状态 | boolean | - |
| collapsedWidth | 收缩宽度，设置为 0 会出现特殊 trigger | number | 64 |
| collapsible | 是否可收起 | boolean | false |
| defaultCollapsed | 是否默认收起 | boolean | false |
| reverseArrow | 翻转折叠提示箭头的方向，当 Sider 在右边时可以使用 | boolean | false |
| style | 指定样式 | object | - |
| trigger | 自定义 trigger，设置为 null 时隐藏 trigger | string\|ReactNode | - |
| width | 宽度 | number\|string | 200 |
| onCollapse | 展开-收起时的回调函数，有点击 trigger 以及响应式反馈两种方式可以触发 | (collapsed, type) => {} | - |

#### breakpoint width

```js
{
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
}
```