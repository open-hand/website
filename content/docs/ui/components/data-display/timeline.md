+++
title = "Timeline 时间轴"
weight = 13
+++

# Timeline 时间轴

垂直展示的时间流信息。

## 何时使用

- 当有一系列信息需按时间排列时，可正序和倒序。
- 需要有一条时间轴进行视觉上的串联时。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="timeline-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本用法</a></div>
                <div>
                    <p>基本的时间轴。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="timeline-demo-last"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>最后一个</a></div>
                <div>
                    <p>当任务状态正在发生，还在记录过程中，可用幽灵节点来表示当前的时间节点（用于时间正序排列）。当 pending 值为 false ，可用定制元件替换默认时间图点。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="timeline-demo-color"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>圆圈颜色</a></div>
                <div>
                    <p>圆圈颜色，绿色用于已完成、成功状态，红色表示告警或错误状态，蓝色可表示正在进行或其他默认状态。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="timeline-demo-time"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自定义时间轴点</a></div>
                <div>
                    <p>可以设置为图标或其他自定义元素。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-timeline >}}

## API

```jsx
<Timeline>
  <Timeline.Item>创建服务现场 2015-09-01</Timeline.Item>
  <Timeline.Item>初步排除网络异常 2015-09-01</Timeline.Item>
  <Timeline.Item>技术测试异常 2015-09-01</Timeline.Item>
  <Timeline.Item>网络异常正在修复 2015-09-01</Timeline.Item>
</Timeline>
```

### Timeline

时间轴。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| pending | 指定最后一个幽灵节点是否存在或内容 | boolean\|string\|ReactNode | false |
| pendingDot | 当最后一个幽灵节点存在時，指定其时间图点 | \|string\|ReactNode | `<Icon type="loading" />` |

### Timeline.Item

时间轴的每一个节点。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 指定圆圈颜色 `blue, red, green`，或自定义的色值 | string | blue |
| dot | 自定义时间轴点 | string\|ReactNode | - |