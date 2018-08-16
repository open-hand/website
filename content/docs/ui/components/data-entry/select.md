+++
title = "Select 选择器"
weight = 11
+++

# Select 选择器

下拉选择器。

## 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
- 当选项少时（少于 5 项），建议直接将选项平铺，使用 [Radio](../radio/) 是更好的选择。


## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="select-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本使用</a></div>
                <div>
                    <p>基本使用。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="select-demo-search"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>带搜索框</a></div>
                <div>
                    <p>展开后可对选项进行搜索。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="select-demo-tag"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>标签</a></div>
                <div>
                    <p>tags select，随意输入的内容（scroll the menu）</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="select-demo-group"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>分组</a></div>
                <div>
                    <p>用 <code>OptGroup</code> 进行选项分组。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="select-demo-searchBox"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>搜索框</a></div>
                <div>
                    <p>自动补全和远程数据结合。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="select-demo-word"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自动分词</a></div>
                <div>
                    <p>试下复制 <code>露西,杰克</code> 到输入框里。只在 tags 和 multiple 模式下可用。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="select-demo-size"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>三种大小</a></div>
                <div>
                    <p>三种大小的选择框，当 size 分别为 <code>large</code> 和 <code>small</code> 时，输入框高度为 <code>40px</code> 和 <code>24px</code> ，默认高度为 <code>32px</code>。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="select-demo-multiple"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>多选</a></div>
                <div>
                    <p>多选，从已有条目中选择（scroll the menu）</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="select-demo-combobox"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>智能提示</a></div>
                <div>
                    <p>输入框自动完成功能，下面是一个账号注册表单的例子。</p>
                    <p>推荐使用 <a href="../autoComplete/">AutoComplete</a> 组件。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="select-demo-coordinate"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>联动</a></div>
                <div>
                    <p>省市联动是典型的例子。</p>
                    <p>推荐使用 <a href="../cascader/">Cascader</a> 组件。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="select-demo-text"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>获得选项的文本</a></div>
                <div>
                    <p>默认情况下 <code>onChange</code> 里只能拿到 value，如果需要拿到选中的节点文本 label，可以使用 <code>labelInValue</code> 属性。</p>
                    <p>选中项的 label 会被包装到 value 中传递给 <code>onChange</code> 等函数，此时 value 是一个对象。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="select-demo-icon"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>图标下拉框</a></div>
                <div>
                    <p>图标下拉框。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-select >}}

## API

```html
<Select>
  <Option value="lucy">lucy</Option>
</Select>
```

### Select props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 支持清除 | boolean | false |
| autoFocus | 默认获取焦点 | boolean | false |
| combobox | 输入框自动提示模式（2.9 之后废弃，请使用 `mode`） | boolean | false |
| defaultActiveFirstOption | 是否默认高亮第一个选项。 | boolean | true |
| defaultValue | 指定默认选中的条目 | string\|string\[]\|number\|number\[] | - |
| disabled | 是否禁用 | boolean | false |
| dropdownClassName | 下拉菜单的 className 属性 | string | - |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | boolean | true |
| dropdownStyle | 下拉菜单的 style 属性 | object | - |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。 | boolean or function(inputValue, option) | true |
| firstActiveValue | 默认高亮的选项 | string\|string\[] | - |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codesandbox.io/s/4j168r7jw0) | Function(triggerNode) | () => document.body |
| labelInValue | 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 `string` 变为 `{key: string, label: ReactNode}` 的格式 | boolean | false |
| maxTagCount | 最多显示多少个 tag | number | - |
| maxTagPlaceholder | 隐藏 tag 时显示的内容 | ReactNode/function(omittedValues) | - |
| mode | 设置 Select 的模式（2.9 之后支持） | 'multiple' \| 'tags' \| 'combobox' | - |
| multiple | 支持多选（2.9 之后废弃，请使用 `mode`） | boolean | false |
| notFoundContent | 当下拉列表为空时显示的内容 | string | 'Not Found' |
| optionFilterProp | 搜索时过滤对应的 option 属性，如设置为 children 表示对内嵌内容进行搜索 | string | value |
| optionLabelProp | 回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 `value`。 | string | `children` （combobox 模式下为 `value`） |
| placeholder | 选择框默认文字 | string | - |
| showArrow | 是否显示下拉小箭头 | boolean |  true |
| size | 选择框大小，可选 `large` `small` | string | default |
| tags | 可以把随意输入的条目作为 tag，输入项不需要与下拉选项匹配（2.9 之后废弃，请使用 `mode`） | boolean | false |
| tokenSeparators | 在 tags 和 multiple 模式下自动分词的分隔符 | string\[] |  |
| value | 指定当前选中的条目 | string\|string\[]\|number\|number\[] | - |
| onBlur | 失去焦点的时回调 | function | - |
| onChange | 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数 | function(value, option:Option/Array<Option\>) | - |
| onDeselect | 取消选中时调用，参数为选中项的 value (或 key) 值，仅在 multiple 或 tags 模式下生效 | function(value，option:Option) | - |
| onFocus | 获得焦点时回调 | function | - |
| onMouseEnter | 鼠标移入时回调 | function | - |
| onMouseLeave | 鼠标移出时回调 | function | - |
| onPopupScroll | 下拉列表滚动时的回调 | function | - |
| onSearch | 文本框值变化时回调 | function(value: string) |  |
| onSelect | 被选中时调用，参数为选中项的 value (或 key) 值 | function(value, option:Option) | - |
| showCheckAll | 是否显示下拉菜单的全选按钮 | boolean |  true |
| footer | 下拉菜单底部内容 | string\| ReactNode | - |
| choiceRender | 仅适用于`tags` 函数返回值为 `Select` value展示内容 | function(liDom, value) | - |
| filter | 下拉框顶部查询框 | boolean | false |
| filterValue | 下拉框顶部查询框值 | string | - |
| onFilterChange | 下拉框顶部查询框值改变回调 | function(value) | - |
| loading | 数据是否加载中 | boolean\|[object](https://ant.design/components/spin-cn/#API) ([更多]
| choiceRemove | 仅适用于`tags` `multiple` 是否可以直接删除value | boolean \| function(value) | true \| (value) => true |
| onChoiceRemove | 仅适用于`tags` `multiple` 删除每一个值的回调 | function(value) | - |

> 注意，如果发现下拉菜单跟随页面滚动，或者需要在其他弹层中触发 Select，请尝试使用 `getPopupContainer={triggerNode => triggerNode.parentNode}` 将下拉弹层渲染节点固定在触发器的父元素中。

### Select Methods

| 名称 | 说明 |
| --- | --- |
| blur() | 取消焦点 |
| focus() | 获取焦点 |

### Option props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 是否禁用 | boolean | false |
| key | 和 value 含义一致。如果 React 需要你设置此项，此项值与 value 的值相同，然后可以省略 value 设置 | string |  |
| title | 选中该 Option 后，Select 的 title | string | - |
| value | 默认根据此属性值进行筛选 | string\|number | - |

### OptGroup props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key |  | string | - |
| label | 组名 | string\|React.Element | 无 |
