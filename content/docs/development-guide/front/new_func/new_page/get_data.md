+++
title = "获取后台数据"
weight = 3
+++

## 获取后台数据

文件可以被访问后，接下来就是完善界面信息，从后台获取数据。获取数据的方法都写在和文件对应的store文件中。

### axios()函数

axios()可以设置全局的配置，例如请求头信息，拦截器等，这样的好处是可以避免重复配置。
```
// store/organization/demo/DemoStore.js文件

import { observable, action, computed } from 'mobx';
// 该axios是封装过的，设置了请求头信息和响应拦截器
import axios from 'Axios';
import store from 'Store';

// store注解符令组件可以通过DemoStore来找到该store
@store('DemoStore')
class DemoStore {
  @observable roles = [];

  @computed get getRoles() {
    return this.roles.slice();
  }

  @action setRoles(data) {
    this.roles = data;
  }

  loadRole() {
    axios.get('uaa/v1/roles?page=0&size=100').then((data) => {
      if (data) {
        this.setRoles(data.content);
      }
    });
  }
}

const demoStore = new DemoStore();

export default demoStore;
```

更多关于axios()的相关信息可以参考：[https://www.npmjs.com/package/axios](https://www.npmjs.com/package/axios)