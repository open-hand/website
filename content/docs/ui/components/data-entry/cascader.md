+++
title = "Cascader 级联选择"
weight = 2
+++

# Cascader 级联选择

级联选择框。

## 何时使用

- 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。
- 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。
- 比起 Select 组件，可以在同一个浮层中完成选择，有较好的体验。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="cascader-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本</a></div>
                <div>
                    <p>省市区级联。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="cascader-custom"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>可以自定义显示</a></div>
                <div>
                    <p>切换按钮和结果分开。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="cascader-disabled"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>禁用选项</a></div>
                <div>
                    <p>通过指定 options 里的 <code>disabled</code> 字段。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="cascader-size"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>大小</a></div>
                <div>
                    <p>不同大小的级联选择器。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="cascader-search"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>搜索</a></div>
                <div>
                    <p>可以直接搜索选项并选择。</p><blockquote><p><code>Cascader[showSearch]</code> 暂不支持服务端搜索</p></blockquote>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="cascader-default"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>默认值</a></div>
                <div>
                    <p>默认值通过数组的方式指定。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="cascader-hover"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>移入展开</a></div>
                <div>
                    <p>通过移入展开下级菜单，点击完成选择。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="cascader-change"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>选择即改变</a></div>
                <div>
                    <p>这种交互允许只选中父级选项。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="cascader-selected"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自定义已选项</a></div>
                <div>
                    <p>例如给最后一项加上邮编链接。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="cascader-load"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>动态加载选项</a></div>
                <div>
                    <p>使用 <code>loadData</code> 实现动态加载选项。</p><blockquote><p>注意：<code>loadData</code> 与 <code>showSearch</code> 无法一起使用。</p></blockquote>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-cascader >}}

## API

```html
<Cascader options={options} onChange={onChange} />
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 是否支持清除 | boolean | true |
| autoFocus | 自动获取焦点 | boolean | false |
| changeOnSelect | 当此项为 true 时，点选每级菜单选项值都会发生变化，具体见上面的演示 | boolean | false |
| className | 自定义类名 | string | - |
| defaultValue | 默认的选中项 | string\[] | \[] |
| disabled | 禁用 | boolean | false |
| displayRender | 选择后展示的渲染函数 | `(label, selectedOptions) => ReactNode` | `label => label.join(' / ')` |
| expandTrigger | 次级菜单的展开方式，可选 'click' 和 'hover' | string | 'click' |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codepen.io/afc163/pen/zEjNOy?editors=0010) | Function(triggerNode) | () => document.body |
| loadData | 用于动态加载选项，无法与 `showSearch` 一起使用 | `(selectedOptions) => void` | - |
| notFoundContent | 当下拉列表为空时显示的内容 | string | 'Not Found' |
| options | 可选项数据源 | object | - |
| placeholder | 输入框占位文本 | string | '请选择' |
| popupClassName | 自定义浮层类名 | string | - |
| popupPlacement | 浮层预设位置：`bottomLeft` `bottomRight` `topLeft` `topRight` | Enum | `bottomLeft` |
| popupVisible | 控制浮层显隐 | boolean | - |
| showSearch | 在选择框中显示搜索框 | boolean | false |
| size | 输入框大小，可选 `large` `default` `small` | string | `default` |
| style | 自定义样式 | string | - |
| value | 指定选中项 | string\[] | - |
| onChange | 选择完成后的回调 | `(value, selectedOptions) => void` | - |
| onPopupVisibleChange | 显示/隐藏浮层的回调 | `(value) => void` | - |

`showSearch` 为对象时，其中的字段：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| filter | 接收 `inputValue` `path` 两个参数，当 `path` 符合筛选条件时，应返回 true，反之则返回 false。 | `function(inputValue, path): boolean` |  |
| matchInputWidth | 搜索结果列表是否与输入框同宽 | boolean |  |
| render | 用于渲染 filter 后的选项 | `function(inputValue, path): ReactNode` |  |
| sort | 用于排序 filter 后的选项 | `function(a, b, inputValue)` |  |

## 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |

<style>
.ant-cascader-picker {
  width: 300px;
}
</style>

> 注意，如果需要获得中国省市区数据，可以参考 [china-division](https://gist.github.com/afc163/7582f35654fd03d5be7009444345ea17)。

