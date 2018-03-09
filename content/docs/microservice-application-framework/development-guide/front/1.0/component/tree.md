+++
title = "ANTD Tree"
date = "2017-10-26"
draft = false
weight= 7
+++

ANTD Tree
=========

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

Tree组件展示数据层级关系
------------------------

1.  使用fetch()获取tree需要的数据源data;
2.  对获取到的数据data进行处理，处理成树组件接受的字段：tittle、key和children;

### Tree组件受控操作示例

``` {.sourceCode .js}
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;
class Demo extends React.Component {
  state = {
    expandedKeys: ['0-0-0', '0-0-1'],
    autoExpandParent: true,
    checkedKeys: ['0-0-0'],
    selectedKeys: [],
  }
  onExpand = (expandedKeys) => {
    console.log('onExpand', arguments);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onCheck = (checkedKeys) => {
    this.setState({
      checkedKeys,
      selectedKeys: ['0-3', '0-4'],
    });
  }
  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }
  render() {
    const loop = data => data.map((item) => {
      if (item.children) {
        return (
          <TreeNode key={item.key} title={item.key} disableCheckbox={item.key === '0-0-0'}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={item.key} />;
    });
    return (
      <Tree
        checkable
        onExpand={this.onExpand} expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck} checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect} selectedKeys={this.state.selectedKeys}
      >
        {loop(gData)}
      </Tree>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);

提示：
```

使用Tree组件时需要首先在文件开始初使用import导入关于Tree组件的更多用法请参考ant
design官网的api：<https://ant.design/components/tree-cn/>
