+++
title = "Affix 固钉"
weight = 1
+++

# Affix 固钉

将页面元素钉在可视范围。

## 何时使用

当内容区域比较长，需要滚动页面时，这部分内容对应的操作或者导航需要在滚动范围内始终展现。常用于侧边菜单和按钮组合。

页面可视范围过小时，慎用此功能以免遮挡页面内容。

## 代码演示
<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box" id="components-affix-demo-target">
            <section class="code-box-demo"><div id="affix-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本</a></div>
                <div>
                    <p>最简单的用法。</p>
                </div>
            </section>
        </section>
        <section class="code-box" id = "components-affix-demo-target">
            <section class="code-box-demo"><div id="affix-demo-target"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>滚动容器</a></div>
                <div>
                    <p>用 <code>target</code> 设置 <code>Affix</code> 需要监听其滚动事件的元素，默认为 <code>window</code>。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="affix-change"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>固定状态改变的回调</a></div>
                <div>
                    <p>可以获得是否固定的状态。</p>
                </div>
            </section>
        </section>
    </div>
</div>


{{< components-affix >}}

## API

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offsetBottom | 距离窗口底部达到指定偏移量后触发 | number |  |
| offsetTop | 距离窗口顶部达到指定偏移量后触发 | number |  |
| target | 设置 `Affix` 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | () => HTMLElement | () => window |
| onChange | 固定状态改变时触发的回调函数 | Function(affixed) | 无 |

**注意：**`Affix` 内的元素不要使用绝对定位，如需要绝对定位的效果，可以直接设置 `Affix` 为绝对定位：

```jsx
<Affix style={{ position: 'absolute', top: y, left: x}}>
  ...
</Affix>
```