+++
title = "Remove 删除弹窗"
date = "2017-02-01"
draft = false
weight= 2
+++

# Remove 删除弹窗

界面中会大量用到 table 的删除操作 ，此时可以使用 框架中的 Remove 组件。

```
import Remove from '../../components/Remove';

class App extends React.Component {
 handleOpen = (id) => {
    this.setState({ open: true, id: id });
  };
  handleClose = (event) => {
    this.setState({ open: false });
  };
  handleDelete = (event) => {
    this.setState({
      open: false
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.handleOpen.bind(this, record.roleId)}>Open a modal dialog</Button>
        <Remove open={this.state.open} handleCancel={this.handleClose} handleConfirm={this.handleDelete.bind(this)} />

      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```

![](../images/remove.png)

## API

参数 | 说明 | 类型 | 默认值
---|---|---|---
open | 对话框是否可见 | boolean | 无
handleCancel | 点击取消按钮的回调 | function | 无
handleConfirm | 点击确定按钮的回调 | function | 无

