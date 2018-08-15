+++
title = "Progress 进度条"
weight = 5
+++

# Progress 进度条

展示操作的当前进度。

## 何时使用

在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。

- 当一个操作会打断当前界面，或者需要在后台运行，且耗时可能超过2秒时；
- 当需要显示一个操作完成的百分比时。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="progress-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>进度条</a></div>
                <div>
                    <p>标准的进度条。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="progress-demo-small"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>小型进度条</a></div>
                <div>
                    <p>适合放在较狭窄的区域内。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="progress-demo-cycle"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>进度圈动态展示</a></div>
                <div>
                    <p>会动的进度条才是好进度条。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="progress-demo-text"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自定义文字格式</a></div>
                <div>
                    <p><code>format</code> 属性指定格式。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="progress-demo-segment"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>分段进度条</a></div>
                <div>
                    <p>标准的进度条。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="progress-demo-cycle2"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>进度圈</a></div>
                <div>
                    <p>圈形的进度。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="progress-demo-cycleSmall"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>小型进度圈</a></div>
                <div>
                    <p>小一号的圈形进度。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="progress-demo-dynamic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>动态展示</a></div>
                <div>
                    <p>会动的进度条才是好进度条。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="progress-demo-dashboard"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>仪表盘</a></div>
                <div>
                    <p>通过设置 <code>type=dashboard</code>，可以很方便地实现仪表盘样式的进度条。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-progress >}}

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| format | 内容的模板函数 | function(percent) | `percent => percent + '%'` |
| gapDegree `(type=circle)` | 圆形进度条缺口角度，可取值 0 ~ 360 | number | 0 |
| gapPosition `(type=circle)` | 圆形进度条缺口位置 | Enum{ 'top', 'bottom', 'left', 'right' } | `top` |
| percent | 百分比 | number | 0 |
| showInfo | 是否显示进度数值或状态图标 | boolean | true |
| status | 状态，可选：`success` `exception` `active` | string | - |
| strokeWidth `(type=line)` | 进度条线的宽度，单位 px | number | 10 |
| strokeWidth `(type=circle)` | 圆形进度条线的宽度，单位是进度条画布宽度的百分比 | number | 6 |
| type | 类型，可选 `line` `circle` `dashboard` `loading` | string | line |
| width `(type=circle)` | 圆形进度条画布宽度，单位 px | number | 132 |
| successPercent | 已完成的分段百分比，`type="line"` 时有效 | number | 0 |