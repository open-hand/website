+++
title = "Carousel 走马灯"
weight = 5
+++

# Carousel 走马灯

旋转木马，一组轮播的区域。

## 何时使用

- 当有一组平级的内容。
- 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。
- 常用于一组图片或卡片轮播。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="carousel-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本</a></div>
                <div>
                    <p>最简单的用法。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="carousel-demo-fade"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>渐显</a></div>
                <div>
                    <p>切换效果为渐显。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="carousel-demo-vertical"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>垂直</a></div>
                <div>
                    <p>垂直显示。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="carousel-demo-switch"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自动切换</a></div>
                <div>
                    <p>定时切换下一张。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-carousel >}}
## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| afterChange | 切换面板的回调 | function(current) | 无 |
| autoplay | 是否自动切换 | boolean | false |
| beforeChange | 切换面板的回调 | function(from, to) | 无 |
| dots | 是否显示面板指示点 | boolean | true |
| easing | 动画效果 | string | linear |
| effect | 动画效果函数，可取 scrollx, fade | string | scrollx |
| vertical | 垂直显示 | boolean | false |

## 方法

| 名称 | 描述 |
| --- | --- |
| goTo(slideNumber) | 切换到指定面板 |
| next() | 切换到下一面板 |
| prev() | 切换到上一面板 |

更多参数可参考：<https://github.com/akiran/react-slick>