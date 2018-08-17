+++
title = "Breadcrumb 面包屑"
weight = 2
+++

# Breadcrumb 面包屑

显示当前页面在系统层级结构中的位置，并能向上返回。

## 何时使用

- 当系统拥有超过两级以上的层级结构时；
- 当需要告知用户『你在哪里』时；
- 当需要向上导航的功能时。

## 代码演示
<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box" id="">
            <section class="code-box-demo"><div id="breadcrumb-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本</a></div>
                <div>
                    <p>最简单的用法。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="breadcrumb-seprator"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>分隔符</a></div>
                <div>
                    <p>使用 <code>separator="&gt;"</code> 可以自定义分隔符。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="breadcrumb-icon"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>带有图标的</a></div>
                <div>
                    <p>图标放在文字前面。</p>
                </div>
            </section>
        </section>
    </div>
</div>


{{< components-breadcrumb >}}

## API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| itemRender | 自定义链接函数，和 react-router 配置使用 | (route, params, routes, paths) => ReactNode |  | - |
| params | 路由的参数 | object |  | - |
| routes | router 的路由栈信息 | object\[] |  | - |
| separator | 分隔符自定义 | string\|ReactNode |  | '/' |

> 2.0 之后，`linkRender` 和 `nameRender` 被移除，请使用 `itemRender` 来代替。

### 和 browserHistory 配合

和 react-router 一起使用时，默认生成的 url 路径是带有 `#` 的，如果和 browserHistory 一起使用的话，你可以使用 `itemRender` 属性定义面包屑链接。

```jsx
import { Link } from 'react-router';

const routes = [{
  path: 'index',
  breadcrumbName: '首页'
}, {
  path: 'first',
  breadcrumbName: '一级面包屑'
}, {
  path: 'second',
  breadcrumbName: '当前页面'
}];
function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
}

return <Breadcrumb itemRender={itemRender} routes={routes}/>;
```
