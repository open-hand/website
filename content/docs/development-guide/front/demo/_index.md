+++
title = "开发Demo程序"
description = "述了如何创建一个简单的项目，实现基础页面编写"
weight = 2
+++

## 前置条件

在开发之前，要保证环境已经安装正确，详见 [开发环境搭建](../develop-env/)

## Choerodon前端规范（初版）

### 目的

出于加快开发流程，提高代码质量，减少不必要的沟通和方便修改他们的代码等目的，制定用于Choerodon猪齿鱼平台前端的开发规范。

正如React约定Hooks函数必须以“use”命名开头，来减少一些问题，可能来自于某种灵感，“不如通过增加一些约定，彻底解决状态共享问题吧！”

我们就以约定来解决部分我们遇到的问题。

*注：下文所列的规则可能部分在今后的开发中被验证为是不正确或不合理的，请与我们联系并修订它。*

### 项目结构

现阶段目录结构由于遗留问题（gulp监听复制触发编译）导致层级很深，其实已经不必要了。

现目录结构遵循`一切从简，该分才分`的思想，以`low-code-service`为例，大体如下：

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_0e5ca23550be4ae396f2d75c43a16188_blob.png)

1.package.json中的main字段表示当前项目的入口，统一命名为`./lib/index.js`（即开发时的`./react/index.js`），当@choerodon/boot版本高于0.19.0后，在启动时会自动将lib路径改为react路径，所以不需要手动修改

2.1中提到的`./lib/index.js`（开始时的`./react/index.js`)为路由路口文件，按菜单来进行分治，指向routes（原则上一个菜单一个文件夹）中的子路由文件或页面本身

```js
// ./react/index.js

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { inject } from 'mobx-react';
import { asyncLocaleProvider, asyncRouter, nomatch } from '@choerodon/boot';
import { ModalContainer } from 'choerodon-ui/pro';

const Model = asyncRouter(() => import('./routes/model'));
const BaseTable = asyncRouter(() => import('./routes/base-table'));
const Database = asyncRouter(() => import('./routes/database'));
const Manager = asyncRouter(() => import('./routes/manager'));
const App = asyncRouter(() => import('./routes/app'));

function LowCodeIndex({ match, AppState: { currentLanguage: language } }) {
  const IntlProviderAsync = asyncLocaleProvider(language, () => import(`./locale/${language}`));
  return (
    <IntlProviderAsync>
      <div>
        <Switch>
          <Route path={`${match.url}/model`} component={Model} />
          <Route path={`${match.url}/base-table`} component={BaseTable} />
          <Route path={`${match.url}/database`} component={Database} />
          <Route path={`${match.url}/manager`} component={Manager} />
          <Route path={`${match.url}/org-model`} component={Model} />
          <Route path={`${match.url}/app`} component={App} />
          <Route path="*" component={nomatch} />
        </Switch>
        <ModalContainer />
      </div>
    </IntlProviderAsync>
  );
}

export default inject('AppState')(LowCodeIndex);
```

3.如果一个功能下有若干个子页面，则再细分子目录，以low-code-service/react/routes/model为例，其index.js为二级路由：

```jsx
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { asyncRouter, nomatch } from '@choerodon/boot';

const List = asyncRouter(() => import('./list'));
const Design = asyncRouter(() => import('./design'));
const Preview = asyncRouter(() => import('./preview'));
const Publish = asyncRouter(() => import('./publish'));

export default function Index({ match }) {
  return (
    <Switch>
      <Route exact path={match.url} component={List} />
      <Route path={`${match.url}/design/:code`} component={Design} />
      <Route path={`${match.url}/preview/:code`} component={Preview} />
      <Route path={`${match.url}/publish/:code`} component={Publish} />
      <Route path="*" component={nomatch} />
    </Switch>
  );
}

```

4.跨层级的页面（拥有相同菜单名，在不同层级下表现差距很大需要分成两个页面对待开发的），在目录下设立类似orginiazation和project类似的层级目录，然后各自进行开发

5.除非跨页面使用的stores，否则不单独设立顶层stores目录，各个页面的stores由各自进行管理

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_57eba70814264221937fc0d264557bde_blob.png)

6.页面组件，工具函数都放在本页面目录下，除了一些跨页面使用组件或公用组件，尽量达到“一个目录一个页面，可迁移可删除”的目的

7.文件夹命名一律小写，使用-来连接（不用驼峰），常用的包括（routes：表示按菜单或路由划分的模块，locale：多语言处理，components：跨页面使用的组件，utils：公用工具函数等），组件命名大写开头，使用驼峰，工具类命名小写开头，使用驼峰

8.一个页面原则上只能使用一个Store, 以low-code-service/react/routes/model/list/stores/index.js为例定义Store：

```jsx
import React, { createContext, useMemo, useContext, useEffect } from 'react';
import { DataSet } from 'choerodon-ui/pro';
import { inject } from 'mobx-react';
import { injectIntl } from 'react-intl';
import ModelListDataSet from './ModelListDataSet';
import XxxStore from './XxxStore';
import useXXXStore from './useXXXStore';

const Store = createContext();

export default Store;

// 也可以提供hook的方式
export function useStore() {
    return useContext(Store);
}

export const StoreProvider = injectIntl(inject('AppState')(
  (props) => {
    const { AppState: { currentMenuType: { type, id } }, intl, children } = props;
    // 使用缓存钩子，以便将来做路由缓存
    const xxxDataSet = useMemo(() => new DataSet(ModelListDataSet({ type, id, intl })), [type, id]);
    const xxxStore = useMemo(() => new XxxStore(), []);
    const xxxStore2 = useXXXStore();
    useEffect(() => {
        localStore.fetch()
    }, []);
    const value = {
      prefixCls: 'lc-model-list',
      intlPrefix: type === 'organization' ? 'organization.model.list' : 'global.model.list',
      permissions: [
        'low-code-service.model.pagedSearch',
        'low-code-service.model.createModel',
        'low-code-service.model.createBaseOnTable',
        'low-code-service.model.check',
        'low-code-service.model.update',
        'low-code-service.model.delete',
      ],
      xxxStore, //原先的store暂时可以先这样过渡，最后逐步过渡到DataSet或useLocalStore
      xxxStore2,
      xxxDataSet,
    };
    return (
      <Store.Provider value={value}>
        {props.children}
      </Store.Provider>
    );
  }
));

// low-code-service/react/routes/model/list/stores/useXXXStore.js

import { axios } from '@choerodon/boot';
import { useLocalStore } from 'mobx-react-lite';
export default function useXXXStore() {
    return useLocalStore(() =>({
        result: null,
        title: 'Click to toggle',
        done: false,
        toggle() {
          localStore.done = !localStore.done
        },
        get emoji() {
          return localStore.done ? '😜' : '🏃'
        },
        async fetch() {
           localStore.result = await axios.get('.....');
        }
    }));
}
```
然后在入口页面传递Store，以low-code-service/react/routes/model/list/index.js为例：

```jsx
import React from 'react';
import { StoreProvider } from './stores';
import ListView from './ListView';

export default function Index(props) {
  // 如StoreProvider需要使用路由属性，将props传递给StoreProvider, 如果为更深的组件需要使用路由属性，请使用withRouter
  return (
    <StoreProvider {...props}>
      <ListView />
    </StoreProvider>
  );
}

```

### 开发方式

1.对复杂页面上，根据逻辑或位置块进行组件划分，不仅方便后期改造，定位bug，还能优化性能，不要把过多的代码全部写在一个文件里，或者写在一个方法里

2.定义intlPrefix和prefixCls作为命名前缀，便于今后可能出现的改造：

```js
const intlPrefix = 'global.model.design';
const prefixCls = 'model-design';

<div className={`${prefixCls}-pull-right`}>
<FormattedMessage id={`${intlPrefix}.${designType}.header.title`} />
```

3.渲染类函数使用render开头，比如renderTable，renderItems，renderHeader

4.事件处理类函数（由页面直接调用的函数）使用handle开头，比如handleClick

5.工具函数使用get，set等开头

**说明**

- 处理事件，handle起头
  - 如处理用户输入, handleChangeInput()
  - 处理点击按钮事件, handleClickBtn()
  - handleFilter()
  - handleSelect()

- get方法，用于获取部分参数,渲染体或者dom节点
  - getMaxNumber()
  - getDefaultSelection()
  - getRecordKey()
  - getOption()
  - getData()
  - getFooterContent()
  - getPopuoContainer()

- render方法，把较为独立的部分拆分出来，方便定位和修改逻辑
  - renderList()
  - renderHeader()
  - renderList()

- 自定义事件名要求带有强烈的语义性,如
  - isSorted()
  - isFilterChanged()
  - hasPagination() 
  - resetData()
  - focus()
  - blur()
  - saveData()

- 对于函数名看不出具体含义，或者逻辑比较复杂的，写上注释，并且列举可能情况方便修改

6.使用async/await处理异步处理，如果要处理一些可能会出现的错误，使用try-catch进行包裹

```js
try {
  const res = await axios.get();
  // resolve
} catch (err) {
   // reject
}
```

7.注意多个异步情况下Promise.all的使用来避免请求阻塞，比如页面加载时要同时发多个请求，如果使用多个await，会导致后面的请求等待前面的请求完成才执行


8.使用[classnames](https://github.com/JedWatson/classnames)库来处理条件判断生成classname的情况，如果比较简单使用三元表达式

```js
import classNames from 'classnames';

// simple
<li className={active ? 'active' : null} />

// complex
const classString = classNames(`${prefixCls}-form-editor`, {
  dragging,
});
<li className={classString} />
```

9.使用[query-string](https://github.com/sindresorhus/query-string)库来处理url请求中的数据获取情况

10.引用其他文件时，不写以`jsx`等结尾的后缀，因为编译后jsx文件不存在（被编译为js）会导致找不到文件而报错，如果只有单文件，直接在index.js中开发

11.根据提供的lint处理代码

12.必须配置husky进行检查，以在commit前触发代码检查，不通过的代码将无法提交

```json
"scripts": {
  "lint-staged": "lint-staged",
  "lint-staged:es": "eslint",
},
"lint-staged": {
  "react/**/*.{js,jsx}": [
    "npm run lint-staged:es"
  ],
  "react/**/*.{scss, less}": "stylelint"
},
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
}
```

13.URL参数命名注意不要与层级参数`organizationId`，`id`，`type`，`name`等同名

### React & Hooks & Mobx相关

1.一律使用函数组件

2.mobx观察者模式使用[mobx-react-lite](https://www.npmjs.com/package/mobx-react-lite)库的observer。

3.引用类型变量，如果是要作为**自定义**组件（排除html元素组件）的props来传递，必须使用useState,useMemo或useCallback，其中useState要用钩子的方式缓存值。

```js
export default () => {
    const style = useMemo(() => ({ color: 'red' }), []);
    // 或者  const [style] = useState(() => ({ color: 'red' }));
    const handleClick = useCallback(() => console.log('click'), []);
    return (
        <Button style={style} onClick={handleClick}>demo</Button>
    )
};
```

4.对于一组**自定义**组件（排除html元素组件）需要绑定事件钩子时，禁止使用匿名箭头函数或者bind的方式来绑定值，应该自定义一个组件然后将钩子和值传给组件，在组件内部调用钩子和值。目的是为了避免diff造成重复渲染。

#### 错误的案例：
```js
function List({ list }) {
    function handleItemClick(id) {
        // TODO
    }
    return list.map(({ id, text }) => <Card  key={id} onClick={() => handleItemClick(id) }>{text}</Card>);
    // return list.map(({ id, text }) => <Card  key={id} onClick={handleItemClick.bind(window, id)}>{text}</Card>);
}
```
#### 正确的案例：
```js
// in Item.js

export default function Item({ text, id, onClick }) {
   const handleClick = useCallback(() => onClick(id), [id]);
   return <Card onClick={handleClick}>{text}</Card>
}

// in List.js

export default function List({ list }) {
    const handleItemClick = useCallback((id) => {
        // TODO
    },[])
    return list.map(({ id, text }) => <Item key={id} onClick={handleItemClick} id={id} text={text} />)
}
```

### Context Store相关

1. 原则上一个页面（包括子页面）对应一个Context。
2. DataSet必须放在Context中进行管理。
3. 有多层嵌套组件使用某个状态值时，该值不要用props来传递，而应该放在Context中。
4. Context的值包括dataSet和不会变化的变量；需要变动的值，应当用mobx-react-lite提供的useLocalStore来存放，详见`项目结构#8`。


### DataSet相关

1.dataset在组件内部实例化，stores文件夹中的文件是dataset的配置文件，暴露一个plain object或者返回值为plain object的函数，参数接收部分通过调用时传进去的值，比如intlPrefix

2.如果只是简单的增删查改操作，使用transport完成api的管理，下面代码只是个例子，如果返回的结果不是带rows（猪齿鱼默认是list）的对象，需要将dataKey设为其他对应数据集的字段，如果返回的结果本身就是数组或者只是代表数据集中第一条数据的对象时，需要将dataKey设为null，更多请访问[choerodon-ui/pro DataSet](https://choerodon.github.io/choerodon-ui/components-pro/data-set/)

```js
{
    dataKey: null,
    transport: {
      read: {
        url: `/lc/v1/organizations/${orgId}/view/${code}`,
        method: 'get',
      },
    },
}
```

3.原先的零散状态管理，如分页排序、loading与否等，可以用一个dataset来进行管理

#### 加载状态：
```js
import { Spin } from 'choerodon-ui/pro'

<Spin dataSet={dataSet}>
{...}
</Spin>
```

### CSS/LESS相关

1.样式文件统一使用less， 原来使用sass（scss）、css的一律改为less

2.当样式文件很多时，设立style目录，由index.less去import其他文件，一个页面一个样式文件

![image](https://minio.choerodon.com.cn/knowledgebase-service/file_d424fe50ffee4649b23c3efc9f1d5724_blob.png)

3.所有颜色值使用变量，尤其是主题色或主题色相关的，必须使用@primary-color方便后期进行主题替换

```css
@import '~choerodon-ui/lib/style/themes/default';

& &-add-button {
  position: absolute;
  top: 0;
  right: .08rem;
  opacity: 0;
  color: @primary-color;
  margin-right: 0;
  transition: opacity .3s @ease-in-out;
  z-index: 1;
}
```

4.所有px单位改为rem，计算方式为px/100

5.css禁止使用html元素选择器，允许子选择器使用html选择器

6.覆盖ui库的样式时，需要引入@c7n-prefix或@c7n-pro-prefix变量：

```css
// in css
@import '~choerodon-ui/lib/style/themes/default';

.@{c7n-prefix}-menu {
  border-right: none;
  &-item {
    padding: 0 .08rem 0 .1rem !important;
    &-group-title {
      padding-left: .1rem;
    }
  }
}
```

### 参考

- [AlloyTeam前端规范](http://alloyteam.github.io/CodeGuide/)
- [eslint](https://cn.eslint.org/docs/rules/)
- [stylelint](https://stylelint.io/)
- [可参考的css指南](https://github.com/cssdream/css-creating#)
- [classnames](https://github.com/JedWatson/classnames)
- [query-string](https://github.com/sindresorhus/query-string)
- [choerodon/pro dataset](https://choerodon.github.io/choerodon-ui/components-pro/data-set-cn/)
