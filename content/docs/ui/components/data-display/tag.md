+++
title = "Tag 标签"
weight = 12
+++

# Tag 标签

进行标记和分类的小标签。

## 何时使用

- 用于标记事物的属性和维度。
- 进行分类。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="tag-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本</a></div>
                <div>
                    <p>基本标签的用法，可以通过添加 <code>closable</code> 变为可关闭标签。可关闭标签具有 <code>onClose</code> <code>afterClose</code> 两个事件。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="tag-demo-add"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>动态添加和删除</a></div>
                <div>
                    <p>用数组生成一组标签，可以动态添加和删除，通过监听删除动画结束的事件 <code>afterClose</code> 实现。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="tag-demo-hot"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>热门标签</a></div>
                <div>
                    <p>选择你感兴趣的话题。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="tag-demo-color"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>多彩标签</a></div>
                <div>
                    <p>我们添加了多种预设色彩的标签样式，用作不同场景使用。如果预设值不能满足你的需求，可以设置为具体的色值。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="tag-demo-select"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>可选择</a></div>
                <div>
                    <p>可通过 <code>CheckableTag</code> 实现类似 Checkbox 的效果，点击切换选中效果。</p>
                    <blockquote><p>该组件为完全受控组件，不支持非受控用法。</p></blockquote>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-tag >}}

## API

### Tag

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| afterClose | 关闭动画完成后的回调 | () => void | - |
| closable | 标签是否可以关闭 | boolean | false |
| color | 标签色 | string | - |
| onClose | 关闭时的回调 | (e) => void | - |

### Tag.CheckableTag

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 设置标签的选中状态 | boolean | false |
| onChange | 点击标签时触发的回调 | (checked) => void | - |
