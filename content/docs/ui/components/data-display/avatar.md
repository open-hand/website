+++
title = "Avatar 头像"
weight = 1
+++

# Avatar 头像

用来代表用户或事物，支持图片、图标或字符展示。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box" id ="components-avatar-demo-basic">
            <section class="code-box-demo"><div id="avatar-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本</a></div>
                <div>
                    <p>头像有三种尺寸，两种形状可选。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="avatar-demo-size"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自动调整字符大小</a></div>
                <div>
                    <p>对于字符型的头像，当字符串较长时，字体大小可以根据头像宽度自动调整。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box" id = "components-avatar-demo-type">
            <section class="code-box-demo"><div id="avatar-demo-type"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>类型</a></div>
                <div>
                    <p>支持三种类型：图片、Icon 以及字符，其中 Icon 和字符型可以自定义图标颜色及背景色。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="avatar-demo-badge"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>待徽章的头像</a></div>
                <div>
                    <p>通常用于消息提示。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-avatar >}}

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 设置头像的图标类型，参考 `Icon` 组件 | string | - |
| shape | 指定头像的形状 | Enum{ 'circle', 'square' } | `circle` |
| size | 设置头像的大小 | Enum{ 'large', 'small', 'default' } | `default` |
| src | 图片类头像的资源地址 | string | - |


