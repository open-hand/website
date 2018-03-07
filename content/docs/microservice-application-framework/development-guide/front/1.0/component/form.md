+++
title = "ANTD Form"
date = "2017-10-26"
draft = false
weight= 2
+++

ANTD Form
=========

导入组件
--------

``` {.sourceCode .js}
import { Form, Icon, Input, Button, Checkbox, Switch, Select,Row,Col } from 'antd';

为了避免重复导入，可以把与表单相关的组件一次性导入
```

将form 属性添加到组件属性中去
-----------------------------

``` {.sourceCode .js}
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
class CreatLDAP extends Component {
……
……
}
module.exports = Form.create({})(CreatLDAP)
```

经过`Form.create`包装的组件将会自带`this.props.form`属性，这样就可以在组件中使用
Form 组件的方法和属性了。

主要属性
--------

-   getFieldDecorator 属性，进行表单的双向绑定

``` {.sourceCode .js}
<Form onSubmit={this.handleSubmit}>
<FormItem
{...formItemLayout}
label={HAP.languageChange("名称")}
hasFeedback
>
{getFieldDecorator('name',{
rules:[{
validator:this.checkName.bind(this)
}]
})(
<Input size="default" />
)}
</FormItem>
</Form>
```

-   getFieldDecorator(id,options)

一般用于form 表单的验证和取表单的初始值。

    <FormItem
    {...formItemLayout}
    label={HAP.languageChange("用户名")}
    hasFeedback
    >
    {getFieldDecorator('username', {
    rules: [
    {
    required: true, message: HAP.languageStringChange("该字段是必输的", "The field is required")
    }, {
    validator: this.checkUsername,
    }],
    initialValue: this.state ? this.state.username : ""
    })(
    <Input size="default" />
    )}
    </FormItem>

rules用于定义表单验证规则，目前 form
已经支持的验证有非空，类型……多种验证，如果不满足条件，可以自定义validator
验证函数

``` {.sourceCode .js}
checkUsername = (rule, value, callback) => {
const form = this.props.form;
const username = value;
const data = this.state.userData;
let flag;
if (username && data) {
for (var i = 0; i < data.length; i++) {
var uname = data[i].username;
if (username == uname) {
flag = 1;
break;
}
}
if (flag) {
callback(HAP.languageStringChange("该用户已经存在，请更换用户名", "username already exist"))
} else {
callback();
}
} else {
callback()
}

}
```

-   rule 定义的规则
-   value 当前表单组件的值
-   callback 返回提示信息

提示 最好不要在validator
自定义函数中做fetch操作，因为表单中的自定义函数会在每一次输入完成时执行，这样会导致服务端的负载特别大.

-   initialValue 用于表单的初始值赋值

``` {.sourceCode .js}
<FormItem
{...formItemLayout}
label={HAP.languageChange("状态")}

>
{getFieldDecorator('status', {
valuePropName: 'checked',
initialValue: status
})(
<Switch size="default" />)
}
</FormItem>
```

注意 switch 表单读取初始值

主要的方法
----------

使用 form 表单最主要的一个的一个方法就 onSubmit

``` {.sourceCode .js}
<Form onSubmit={this.handleSubmit}>
……
<Form>
```

``` {.sourceCode .js}
handleSubmit = (e) => {
e.preventDefault();
const roles = this.state.roles;
this.props.form.validateFieldsAndScroll((err, values) => {
if (!err) {
……
……
}
})
}
```

-   values
    表单中的所有的数据。submit函数会在表单的验证全部通过之后再执行。

更多的详细功能 <https://ant.design/components/form-cn/>
