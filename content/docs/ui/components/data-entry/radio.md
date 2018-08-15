+++
title = "Radio 单选框"
weight = 10
+++

# Radio 单选框

单选框。

## 何时使用

- 用于在多个备选项中选中单个状态。
- 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="radio-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本</a></div>
                <div>
                    <p>最简单的用法。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="radio-demo-group"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>单选组合</a></div>
                <div>
                    <p>一组互斥的 Radio 配合使用。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="radio-demo-config"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>RadioGroup 组合 - 配置方式</a></div>
                <div>
                    <p>通过配置 <code>options</code> 参数来渲染单选框。</p><blockquote><p><code>2.9.0</code> 之后支持。</p></blockquote>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="radio-demo-name"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>单选组合 - 配置 name 使用</a></div>
                <div>
                    <p>可以为 RadioGroup 配置 <code>name</code> 参数，为组合内的 input 元素赋予相同的 <code>name</code> 属性，使浏览器把 RadioGroup 下的 Radio 真正看作是一组（例如可以通过方向键始终<strong>在同一组内</strong>更改选项）。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="radio-demo-disabled"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>不可用</a></div>
                <div>
                    <p>Radio 不可用。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="radio-demo-more"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>RadioGroup 垂直</a></div>
                <div>
                    <p>垂直的 RadioGroup，配合更多输入框选项。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="radio-demo-button"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>按钮样式</a></div>
                <div>
                    <p>按钮样式的单选组合。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="radio-demo-size"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>大小</a></div>
                <div>
                    <p>大中小三种组合，可以和表单输入框进行对应配合。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-radio >}}

## API

### Radio

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoFocus | 自动获取焦点 | boolean | false |
| checked | 指定当前是否选中 | boolean | false |
| defaultChecked | 初始是否选中 | boolean | false |
| value | 根据 value 进行比较，判断是否选中 | any | 无 |

### RadioGroup

单选框组合，用于包裹一组 `Radio`。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认选中的值 | any | 无 |
| name | RadioGroup 下所有 `input[type="radio"]` 的 `name` 属性 | string | 无 |
| options | 以配置形式设置子元素 | string\[] \| Array&lt;{ label: string value: string disabled?: boolean }> | 无 |
| size | 大小，只对按钮样式生效 | `large` \| `default` \| `small` | `default` |
| value | 用于设置当前选中的值 | any | 无 |
| onChange | 选项变化时的回调函数 | Function(e:Event) | 无 |

## 方法

### Radio

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |
