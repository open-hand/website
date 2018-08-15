+++
title = "Transfer 穿梭框"
weight = 16
+++

# Transfer 穿梭框

双栏穿梭选择框。

## 何时使用

用直观的方式在两栏中移动元素，完成选择行为。

选择一个或以上的选项后，点击对应的方向键，可以把选中的选项移动到另一栏。
其中，左边一栏为 `source`，右边一栏为 `target`，API 的设计也反映了这两个概念。

## 代码演示
<div class="c7n-row">
    <div class="c7n-row-12">
        <section class="code-box">
            <section class="code-box-demo"><div id="transfer-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本用法</a></div>
                <div>
                    <p>最基本的用法，展示了 <code>dataSource</code>、<code>targetKeys</code>、每行的渲染函数 <code>render</code> 以及回调函数 <code>onChange</code> <code>onSelectChange</code> <code>onScroll</code> 的用法。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="transfer-demo-search"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>带搜索框</a></div>
                <div>
                    <p>带搜索框的穿梭框，可以自定义搜索函数。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="transfer-demo-high"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>高级用法</a></div>
                <div>
                    <p>穿梭框高级用法，可配置操作文案，可定制宽高，可对底部进行自定义渲染。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="transfer-demo-custom"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自定义渲染行目标</a></div>
                <div>
                    <p>自定义渲染每一个 Transfer Item，可用于渲染复杂数据。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-transfer >}}

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 自定义类 | string |  |
| dataSource | 数据源，其中的数据将会被渲染到左边一栏中，`targetKeys` 中指定的除外。 | [TransferItem](https://git.io/vMM64)\[] | \[] |
| filterOption | 接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。 | (inputValue, option): boolean |  |
| footer | 底部渲染函数 | (props): ReactNode |  |
| lazy | Transfer 使用了 [react-lazy-load](https://github.com/loktar00/react-lazy-load) 优化性能，这里可以设置相关参数。设为 `false` 可以关闭懒加载。 | object\|boolean | `{ height: 32, offset: 32 }` |
| listStyle | 两个穿梭框的自定义样式 | object |  |
| notFoundContent | 当列表为空时显示的内容 | string\|ReactNode | '列表为空' |
| operations | 操作文案集合，顺序从下至上 | string\[] | ['>', '<'] |
| render | 每行数据渲染函数，该函数的入参为 `dataSource` 中的项，返回值为 ReactElement。或者返回一个普通对象，其中 `label` 字段为 ReactElement，`value` 字段为 title | Function(record) |  |
| searchPlaceholder | 搜索框的默认值 | string | '请输入搜索内容' |
| selectedKeys | 设置哪些项应该被选中 | string\[] | \[] |
| showSearch | 是否显示搜索框 | boolean | false |
| targetKeys | 显示在右侧框数据的key集合 | string\[] | \[] |
| titles | 标题集合，顺序从左至右 | string\[] | ['', ''] |
| onChange | 选项在两栏之间转移时的回调函数 | (targetKeys, direction, moveKeys): void |  |
| onScroll | 选项列表滚动时的回调函数 | (direction, event): void |  |
| onSearchChange | 搜索框内容时改变时的回调函数 | (direction: 'left'\|'right', event: Event): void | - |
| onSelectChange | 选中项发生改变时的回调函数 | (sourceSelectedKeys, targetSelectedKeys): void |  |

## 注意

按照 React 的[规范](http://facebook.github.io/react/docs/lists-and-keys.html#keys)，所有的组件数组必须绑定 key。在 Transfer 中，`dataSource`里的数据值需要指定 `key` 值。对于 `dataSource` 默认将每列数据的 `key` 属性作为唯一的标识。

如果你的数据没有这个属性，务必使用 `rowKey` 来指定数据列的主键。

```jsx
// 比如你的数据主键是 uid
return <Transfer rowKey={record => record.uid} />;
```
