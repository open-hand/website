+++
title = "Table 表格"
weight = 10
+++

# Table 表格

展示行列数据。

## 何时使用

- 当有大量结构化的数据需要展现时；
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。

## 如何使用

指定表格的数据源 `dataSource` 为一个数组。

```jsx
const dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}];

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
}];

<Table dataSource={dataSource} columns={columns} />
```

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-12">
        <section class="code-box">
            <section class="code-box-demo"><div id="table-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本用法</a></div>
                <div>
                    <p>简单的表格，最后一列是各种操作。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="table-demo-jsx"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>JSX 风格的 API</a></div>
                <div>
                    <p>使用 JSX 风格的 API（2.5.0 以后引入）</p>
                    <blockquote><p>这个只是一个描述 <code>columns</code> 的语法糖，所以你不能用其他组件去包裹 <code>Column</code> 和 <code>ColumnGroup</code>。</p></blockquote>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="table-demo-select"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>可选择</a></div>
                <div>
                    <p>第一列是联动的选择框。</p><blockquote><p>默认点击 checkbox 触发选择行为，需要点击行触发可以参考例子：<a href="https://codesandbox.io/s/000vqw38rl">https://codesandbox.io/s/000vqw38rl</a></p></blockquote>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="table-demo-operation"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>选择和操作</a></div>
                <div>
                    <p>选择后进行操作，完成后清空选择，通过 <code>rowSelection.selectedRowKeys</code> 来控制选中项。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="table-demo-custom"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自定义选择项</a></div>
                <div>
                    <p>通过 <code>rowSelection.selections</code> 自定义选择项，默认不显示下拉选项，设为 <code>true</code> 时显示默认选择项。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="table-demo-controller"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>可控的筛选和排序</a></div>
                <div>
                    <p>使用受控属性对筛选和排序状态进行控制。</p>
                    <blockquote><ol><li><p>columns 中定义了 filteredValue 和 sortOrder 属性即视为受控模式。</p></li><li><p>只支持同时对一列进行排序，请保证只有一列的 sortOrder 属性是生效的。</p></li><li><p>务必指定 <code>column.key</code>。</p></li></ol></blockquote>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="table-demo-sort"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>筛选和排序</a></div>
                <div>
                    <p>对某一列数据进行筛选，使用列的 <code>filters</code> 属性来指定需要筛选菜单的列，<code>onFilter</code> 用于筛选当前数据，<code>filterMultiple</code> 用于指定多选和单选。</p>
                    <p>对某一列数据进行排序，通过指定列的 <code>sorter</code> 函数即可启动排序按钮。<code>sorter: function(a, b) { ... }</code>， a、b 为比较的两个列数据。</p>
                    <p>使用 <code>defaultSortOrder</code> 属性，设置列的默认排序顺序。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="table-demo-dropdown"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>下拉菜单排序</a></div>
                <div>
                    <p>设置 <code>filterBar</code> 属性为false来显示下拉过滤菜单。</p><p>对某一列数据进行筛选，使用列的 <code>filters</code> 属性来指定需要筛选菜单的列，<code>onFilter</code> 用于筛选当前数据，<code>filterMultiple</code> 用于指定多选和单选。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="table-demo-custom-filter"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自定义筛选菜单</a></div>
                <div>
                    <p>通过 <code>filterDropdown</code>、<code>filterDropdownVisible</code> 和 <code>filterDropdownVisibleChange</code> 定义自定义的列筛选功能，并实现一个搜索列的示例。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
        <section class="code-box-demo"><div id="table-demo-remote"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>远程加载数据</a></div>
                <div>
                    <p>这个例子通过简单的 ajax 读取方式，演示了如何从服务端读取并展现数据，具有筛选、排序等功能以及页面 loading 效果。开发者可以自行接入其他数据处理方式。</p><p>另外，本例也展示了筛选排序功能如何交给服务端实现，列不需要指定具体的 <code>onFilter</code> 和 <code>sorter</code> 函数，而是在把筛选和排序的参数发到服务端来处理。</p><p><strong>注意，此示例使用 <a href="https://randomuser.me">模拟接口</a>，展示数据可能不准确，请打开网络面板查看请求。</strong></p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="table-demo-small"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>紧凑型</a></div>
                <div>
                    <p>两种紧凑型的列表，小型列表只用于对话框内。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="table-demo-border"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>带边框</a></div>
                <div>
                    <p>添加表格边框线，页头和页脚。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="table-demo-expend"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>可展开</a></div>
                <div>
                    <p>当表格内容较多不能一次性完全展示时。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="table-demo-merge"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>表格行/列合并</a></div>
                <div>
                    <p>表头只支持列合并，使用 column 里的 colSpan 进行设置。</p>
                    <p>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="table-demo-tree"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>树形数据展现</a></div>
                <div>
                    <p>表格支持树形数据的展示，可以通过设置 <code>indentSize</code> 以控制每一层的缩进宽度。</p><blockquote><p>注：暂不支持父子数据递归关联选择。</p></blockquote>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="table-demo-head"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>固定表头</a></div>
                <div>
                    <p>方便一页内展示大量数据。</p>
                    <p>需要指定 column 的 <code>width</code> 属性，否则列头和内容可能不对齐。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="table-demo-row"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>固定列</a></div>
                <div>
                    <p>对于列数很多的数据，可以固定前后的列，横向滚动查看其它数据，需要和 <code>scroll.x</code> 配合使用。</p>
                    <blockquote><p>若列头与内容不对齐或出现列重复，请指定列的宽度 <code>width</code>。</p><p>建议指定 <code>scroll.x</code> 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 <code>scroll.x</code>。</p></blockquote>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="table-demo-columns"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>固定行和列</a></div>
                <div>
                    <p>适合同时展示有大量数据和数据列。</p><blockquote><p>若列头与内容不对齐或出现列重复，请指定列的宽度 <code>width</code>。</p><p>建议指定 <code>scroll.x</code> 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 <code>scroll.x</code>。</p></blockquote>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="table-demo-group"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>表头分组</a></div>
                <div>
                    <p><code>columns[n]</code> 可以内嵌 <code>children</code>，以渲染分组表头。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="table-demo-edit"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>可编辑单元格</a></div>
                <div>
                    <p>带单元格编辑功能的表格。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="table-demo-edit-columns"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>可编辑行</a></div>
                <div>
                    <p>带行编辑功能的表格。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="table-demo-nested"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>嵌套子表格</a></div>
                <div>
                    <p>展示每行数据更详细的信息。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="table-demo-attribute"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>动态控制表格属性</a></div>
                <div>
                    <p>选择不同配置组合查看效果。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-table >}}

## API

### Table

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| bordered | 是否展示外边框和列边框 | boolean | false |
| columns | 表格列的配置描述，具体项见下表 | [ColumnProps](https://git.io/vMMXC)\[] | - |
| components | 覆盖默认的 table 元素 | object | - |
| dataSource | 数据数组 | any\[] |  |
| defaultExpandAllRows | 初始时，是否展开所有行 | boolean | false |
| defaultExpandedRowKeys | 默认展开的行 | string\[] | - |
| expandedRowKeys | 展开的行，控制属性 | string\[] | - |
| expandedRowRender | 额外的展开行 | Function(record):ReactNode | - |
| expandRowByClick | 通过点击行来展开子行 | boolean | `false` |
| footer | 表格尾部 | Function(currentPageData) |  |
| indentSize | 展示树形数据时，每层缩进的宽度，以 px 为单位 | number | 15 |
| loading | 页面是否加载中 | boolean\|[object](https://ant.design/components/spin-cn/#API) ([更多](https://github.com/ant-design/ant-design/issues/4544#issuecomment-271533135)) | false |
| locale | 默认文案设置，目前包括排序、过滤、空数据文案 | object | filterConfirm: '确定' <br> filterReset: '重置' <br> emptyText: '暂无数据' <br> [默认值](https://github.com/ant-design/ant-design/issues/575#issuecomment-159169511) |
| pagination | 分页器，参考[配置项](#pagination)或 [pagination](../../navigation/pagination/)，设为 false 时不展示和进行分页 | object |  |
| rowClassName | 表格行的类名 | Function(record, index):string | - |
| rowKey | 表格行 key 的取值，可以是字符串或一个函数 | string\|Function(record):string | 'key' |
| rowSelection | 列表项是否可选择，[配置项](#rowSelection) | object | null |
| scroll | 设置横向或纵向滚动，也可用于指定滚动区域的宽和高，建议为 `x` 设置一个数字，如果要设置为 `true`，需要配合样式 `.ant-table td { white-space: nowrap; }` | { x: number \| true, y: number } | - |
| showHeader | 是否显示表头 | boolean | true |
| size | 正常或迷你类型，`default` or `small` | string | default |
| title | 表格标题 | Function(currentPageData) |  |
| onChange | 分页、排序、筛选变化时触发 | Function(pagination, filters, sorter) |  |
| onExpand | 点击展开图标时触发 | Function(expanded, record) |  |
| onExpandedRowsChange | 展开的行变化时触发 | Function(expandedRows) |  |
| onHeaderRow | 设置头部行属性 | Function(column, index) | - |
| onRow | 设置行属性 | Function(record, index) | - |
| filterBar | 显示过滤条，设置为false时，在列头上会显示过滤菜单按钮 | boolean | true |
| filters | <受控>过滤条中的过滤条件，例：`[{ name: 'Jom' }, 'OR', { name: 'Jim' }]`，`name` 为列的 `key` 或 `dataIndex` | any\[] | - |
| filterBarPlaceholder | 过滤条的占位文本 | string |  |


#### onRow 用法

适用于 `onRow` `onHeaderRow` `onCell` `onHeaderCell`。

```jsx
<Table
  onRow={(record) => {
    return {
      onClick: () => {},       // 点击行
      onMouseEnter: () => {},  // 鼠标移入行
      onXxxx...
    };
  }}

  onHeaderRow={(column) => {
    return {
      onClick: () => {},        // 点击表头行
    };
  }}
/>
```

### Column

列描述数据对象，是 columns 中的一项，Column 使用相同的 API。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 列的 className | string | - |
| colSpan | 表头列合并,设置为 0 时，不渲染 | number |  |
| dataIndex | 列数据在数据项中对应的 key，支持 `a.b.c` 的嵌套写法 | string | - |
| filterDropdown | 可以自定义筛选菜单，此函数只负责渲染图层，需要自行编写各种交互 | ReactNode | - |
| filterDropdownVisible | 用于控制自定义筛选菜单是否可见 | boolean | - |
| filtered | 标识数据是否经过过滤，筛选图标会高亮 | boolean | false |
| filteredValue | 筛选的受控属性，外界可用此控制列的筛选状态，值为已筛选的 value 数组 | string\[] | - |
| filterIcon | 自定义 fiter 图标。 | ReactNode | false |
| filterMultiple | 是否多选 | boolean | false |
| filters | 表头的筛选菜单项 | object\[] | - |
| fixed | 列是否固定，可选 `true`(等效于 left) `'left'` `'right'` | boolean\|string | false |
| key | React 需要的 key，如果已经设置了唯一的 `dataIndex`，可以忽略这个属性 | string | - |
| render | 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return里面可以设置表格[行/列合并](#components-table-demo-colspan-rowspan) | Function(text, record, index) {} | - |
| align | 设置列内容的对齐方式 | 'left' \| 'right' \| 'center' | 'left' |
| sorter | 排序函数，本地排序使用一个函数(参考 [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 的 compareFunction)，需要服务端排序可设为 true | Function\|boolean | - |
| sortOrder | 排序的受控属性，外界可用此控制列的排序，可设置为 `'ascend'` `'descend'` `false` | boolean\|string | - |
| title | 列头显示文字 | string\|ReactNode | - |
| filterTitle | 过滤条可选则的列的名字，默认为属性`title`的值 | string\|ReactNode | - |
| width | 列宽度 | string\|number | - |
| onCell | 设置单元格属性 | Function(record) | - |
| onFilter | 本地模式下，确定筛选的运行函数 | Function | - |
| onFilterDropdownVisibleChange | 自定义筛选菜单可见变化时调用 | function(visible) {} | - |
| onHeaderCell | 设置头部单元格属性 | Function(column) | - |

### ColumnGroup

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 列头显示文字 | string\|ReactNode | - |

### pagination

分页的配置项。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| position | 指定分页显示的位置 | 'top' \| 'bottom' \| 'both' | 'bottom' |

更多配置项，请查看 [`Pagination`](../../navigation/pagination/)。

### rowSelection

选择功能的配置。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fixed | 把选择框列固定在左边 | boolean | - |
| getCheckboxProps | 选择框的默认属性配置 | Function(record) | - |
| hideDefaultSelections | 去掉『全选』『反选』两个默认选项 | boolean | false |
| selectedRowKeys | 指定选中项的 key 数组，需要和 onChange 进行配合 | string\[] | \[] |
| columnWidth | 自定义列表选择框宽度 | string\|number | - |
| selections | 自定义选择项 [配置项](#selection), 设为 `true` 时使用默认选择项 | object\[]\|boolean | true |
| type | 多选/单选，`checkbox` or `radio` | string | `checkbox` |
| onChange | 选中项发生变化的时的回调 | Function(selectedRowKeys, selectedRows) | - |
| onSelect | 用户手动选择/取消选择某列的回调 | Function(record, selected, selectedRows, nativeEvent) | - |
| onSelectAll | 用户手动选择/取消选择所有列的回调 | Function(selected, selectedRows, changeRows) | - |
| onSelectInvert | 用户手动选择反选的回调 | Function(selectedRows) | - |

### selection

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | React 需要的 key，建议设置 | string | - |
| text | 选择项显示的文字 | string\|React.ReactNode | - |
| onSelect | 选择项点击回调 | Function(changeableRowKeys) | - |

## 在 TypeScript 中使用

```jsx
import { Table } from 'choerodon-ui';
import { ColumnProps } from 'choerodon-ui/lib/table';

interface IUser {
  key: number;
  name: string;
}

const columns: ColumnProps<IUser>[] = [{
  key: 'name',
  title: 'Name',
  dataIndex: 'name',
}];

const data: IUser[] = [{
  key: 0,
  name: 'Jack',
}];

class UserTable extends Table<IUser> {}
<UserTable columns={columns} dataSource={data} />

// 使用 JSX 风格的 API
class NameColumn extends Table.Column<IUser> {}

<UserTable dataSource={data}>
  <NameColumn key="name" title="Name" dataIndex="name" />
</UserTable>
```

## 注意

按照 [React 的规范](https://facebook.github.io/react/docs/lists-and-keys.html#keys)，所有的组件数组必须绑定 key。在 Table 中，`dataSource` 和 `columns` 里的数据值都需要指定 `key` 值。对于 `dataSource` 默认将每列数据的 `key` 属性作为唯一的标识。

如果你的数据没有这个属性，务必使用 `rowKey` 来指定数据列的主键。若没有指定，控制台会出现以下的提示，表格组件也会出现各类奇怪的错误。

<img src="https://os.alipayobjects.com/rmsportal/luLdLvhPOiRpyss.png" style = "max-width:calc(100% - 32px);" />

```jsx
// 比如你的数据主键是 uid
return <Table rowKey="uid" />;
// 或
return <Table rowKey={record => record.uid} />;
```
