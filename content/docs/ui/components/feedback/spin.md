+++
title = "Spin 加载中"
weight = 7
+++

# Spin 加载中

用于页面和区块的加载中状态。

## 何时使用

页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="spin-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本用法</a></div>
                <div>
                    <p>一个简单的 loading 状态。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="spin-demo-container"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>容器</a></div>
                <div>
                    <p>放入一个容器中。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="spin-demo-text"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自定义描述文案</a></div>
                <div>
                    <p>自定义描述文案。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="spin-demo-sign"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自定义指示符</a></div>
                <div>
                    <p>使用自定义指示符。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="spin-demo-size"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>各种大小</a></div>
                <div>
                    <p>小的用于文本加载，默认用于卡片容器级加载，大的用于页面级加载。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="spin-demo-loading"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>卡片加载中</a></div>
                <div>
                    <p>可以直接把内容内嵌到 <code>Spin</code> 中，将现有容器变为加载状态。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="spin-demo-delay"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>延迟</a></div>
                <div>
                    <p>延迟显示 loading 效果。当 spinning 状态在 delay 时间内结束，则不显示 loading 状态。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-spin >}}

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| delay | 延迟显示加载效果的时间（防止闪烁） | number (毫秒) | - |
| indicator | 加载指示符 | ReactElement | - |
| size | 组件大小，可选值为 `small` `default` `large` | string | 'default' |
| spinning | 是否旋转 | boolean | true |
| tip | 当作为包裹元素时，可以自定义描述文案 | string | - |
| wrapperClassName | 包装器的类属性 | string | - |