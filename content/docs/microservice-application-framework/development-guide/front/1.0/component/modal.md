+++
title = "ANTD Modal"
date = "2017-10-26"
draft = false
weight= 3
+++

ANTD Modal
==========

为了良好的用户体验，界面中需要经常用到 Modal 组件，下面主要介绍ant
design 中 Modal 组件的基本用法。

Modal
-----

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用`Modal`在当前页面正中打开一个浮层，承载相应的操作。

另外当需要一个简洁的确认框询问用户时，可以使用精心封装好的`ant.Modal.confirm()`等方法。

Modal 的详细用法可以参考ant design 官网的 API，本例中展示如何自定义
Modal 中的footer 按钮：

``` {.sourceCode .js}
import { Modal, Button } from 'antd';

class App extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Open a modal dialog</Button>
        <Modal title="Basic Modal" visible={this.state.visible}
        //自定义 footer
         footer={<div>
                   <Button onClick={this.handleCancel}>{HAP.languageStringChange("取消","cancel")}</Button>
                   <Button type="primary" onClick={this.handleOk}>{HAP.languageStringChange("删除","Delete")}</Button>
                 </div>}

        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
