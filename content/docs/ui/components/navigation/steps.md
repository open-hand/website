+++
title = "Steps 步骤条"
weight = 6
+++

# Steps 步骤条

引导用户按照流程完成任务的导航条。

## 何时使用

当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。

## 代码演示
<div class="c7n-row">
    <div class="c7n-row-12">
        <section class="code-box">
            <section class="code-box-demo"><div id="steps-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基础用法</a></div>
                <div>
                    <p>简单的步骤条。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="steps-small"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>迷你版</a></div>
                <div>
                    <p>迷你版的步骤条，通过设置 <code>&lt;Steps size="small"&gt;</code> 启用.</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="steps-icon"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>带图标的步骤</a></div>
                <div>
                    <p>通过设置 <code>Steps.Step</code> 的 <code>icon</code> 属性，可以启用自定义图标。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="steps-switch"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>步骤切换</a></div>
                <div>
                    <p>通常配合内容及按钮使用，表示一个流程的处理进度。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="steps-vertical"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>竖直方向的步骤条</a></div>
                <div>
                    <p>简单的竖直方向的步骤条。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="steps-vertical-tiny"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>竖直方向的小型步骤条</a></div>
                <div>
                    <p>简单的竖直方向的小型步骤条。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="steps-error"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>步骤运行错误</a></div>
                <div>
                    <p>使用 Steps 的 <code>status</code> 属性来指定当前步骤的状态。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="steps-dot"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>点状步骤条</a></div>
                <div>
                    <p>包含步骤点的进度条。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="steps-custom-dot"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自定义点状步骤条</a></div>
                <div>
                    <p>为点状步骤条增加自定义展示。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-steps >}}

## API

```jsx
<Steps>
  <Step title="第一步" />
  <Step title="第二步" />
  <Step title="第三步" />
</Steps>
```

### Steps

整体步骤条。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 `status` 属性覆盖状态 | number | 0 |
| direction | 指定步骤条方向。目前支持水平（`horizontal`）和竖直（`vertical`）两种方向 | string | horizontal |
| progressDot | 点状步骤条，可以设置为一个 function | Boolean or (iconDot, {index, status, title, description}) => ReactNode | false |
| size | 指定大小，目前支持普通（`default`）和迷你（`small`） | string | default |
| status | 指定当前步骤的状态，可选 `wait` `process` `finish` `error` | string | process |

### Steps.Step

步骤条内的每一个步骤。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| description | 步骤的详情描述，可选 | string\|ReactNode | - |
| icon | 步骤图标的类型，可选 | string\|ReactNode | - |
| status | 指定状态。当不配置该属性时，会使用 Steps 的 `current` 来自动指定状态。可选：`wait` `process` `finish` `error` | string | wait |
| title | 标题 | string\|ReactNode | - |