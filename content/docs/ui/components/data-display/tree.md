+++
title = "Tree 树形控件"
weight = 14
+++

# Tree 树形控件

## 何时使用

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用`树控件`可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="tree-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本用法</a></div>
                <div>
                    <p>最简单的用法，展示可勾选，可选中，禁用，默认展开等功能。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="tree-demo-drag"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>拖动示例</a></div>
                <div>
                    <p>将节点拖拽到其他节点内部或前后。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="tree-demo-search"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>可搜索树</a></div>
                <div>
                    <p>可搜索的树。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="tree-demo-controller"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>受控操作示例</a></div>
                <div>
                    <p>受控操作示例</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="tree-demo-load"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>异步数据加载</a></div>
                <div>
                    <p>点击展开节点，动态加载数据。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="tree-demo-line"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>连接线</a></div>
                <div>
                    <p>带连接线的树。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-tree >}}

## API

### Tree props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoExpandParent | 是否自动展开父节点 | boolean | true |
| checkable | 节点前添加 Checkbox 复选框 | boolean | false |
| checkedKeys | （受控）选中复选框的树节点（注意：父子节点有关联，如果传入父节点key，则子节点自动选中；相应当子节点key都传入，父节点也自动选中。当设置`checkable`和`checkStrictly`，它是一个有`checked`和`halfChecked`属性的对象，并且父子节点的选中与否不再关联 | string\[] \| {checked: string\[], halfChecked: string\[]} | \[] |
| checkStrictly | checkable状态下节点选择完全受控（父子节点选中状态不再关联） | boolean | false |
| defaultCheckedKeys | 默认选中复选框的树节点 | string\[] | \[] |
| defaultExpandAll | 默认展开所有树节点 | boolean | false |
| defaultExpandedKeys | 默认展开指定的树节点 | string\[] | \[] |
| defaultExpandParent | 默认展开父节点 | bool | true |
| defaultSelectedKeys | 默认选中的树节点 | string\[] | \[] |
| disabled | 将树禁用 | bool | false |
| draggable | 设置节点可拖拽（IE>8） | boolean | false |
| expandedKeys | （受控）展开指定的树节点 | string\[] | \[] |
| filterTreeNode | 按需筛选树节点（高亮），返回true | function(node) | - |
| loadData | 异步加载数据 | function(node) | - |
| multiple | 支持点选多个节点（节点本身） | boolean | false |
| selectedKeys | （受控）设置选中的树节点 | string\[] | - |
| showIcon | 是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式 | boolean | false |
| showLine | 是否展示连接线 | boolean | false |
| onCheck | 点击复选框触发 | function(checkedKeys, e:{checked: bool, checkedNodes, node, event}) | - |
| onDragEnd | dragend 触发时调用 | function({event, node}) | - |
| onDragEnter | dragenter 触发时调用 | function({event, node, expandedKeys}) | - |
| onDragLeave | dragleave 触发时调用 | function({event, node}) | - |
| onDragOver | dragover 触发时调用 | function({event, node}) | - |
| onDragStart | 开始拖拽时调用 | function({event, node}) | - |
| onDrop | drop 触发时调用 | function({event, node, dragNode, dragNodesKeys}) | - |
| onExpand | 展开/收起节点时触发 | function(expandedKeys, {expanded: bool, node}) | - |
| onRightClick | 响应右键点击 | function({event, node}) | - |
| onSelect | 点击树节点触发 | function(selectedKeys, e:{selected: bool, selectedNodes, node, event}) | - |

### TreeNode props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disableCheckbox | 禁掉 checkbox | boolean | false |
| disabled | 禁掉响应 | boolean | false |
| icon | 自定义图标。可接收组件，props 为当前节点 props | element/Function(props):ReactNode | - |
| isLeaf | 设置为叶子节点(设置了`loadData`时有效) | boolean | false |
| key | 被树的 (default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys 属性所用。注意：整个树范围内的所有节点的 key 值不能重复！ | string | 内部计算出的节点位置 |
| selectable | 设置节点是否可被选中 | boolean | true |
| title | 标题 | string\|ReactNode | '---' |

## 注意

树节点可以有很多，但在设置`checkable`时，将会花费更多的计算时间，因此我们缓存了一些计算结果（`this.treeNodesStates`）来复用，避免多次重复计算，以此提高性能。但这也带来了一些限制，当你异步加载树节点时，你需要这样渲染树：

```jsx
{this.state.treeData.length
  ? <Tree>{this.state.treeData.map(data => <TreeNode />)}</Tree>
  : 'loading tree'}
```