+++
title = "DatePicker 日期选择框"
weight = 4
+++

# DatePicker 日期选择框

输入或选择日期的控件。

## 何时使用

当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="date-demo-basic"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>基本</a></div>
                <div>
                    <p>最简单的用法，在浮层中可以选择或者输入日期。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="date-demo-size"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>三种大小</a></div>
                <div>
                    <p>三种大小的输入框，若不设置，则为 <code>default</code>。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="date-demo-disabled"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>禁用</a></div>
                <div>
                    <p>选择框的不可用状态。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="date-demo-range"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>自定义日期范围选择</a></div>
                <div>
                    <p>当 <code>RangePicker</code> 无法满足业务需求时，可以使用两个 <code>DatePicker</code> 实现类似的功能。</p>
                    <blockquote><ul><li><p>通过设置 <code>disabledDate</code> 方法，来约束开始和结束日期。</p></li><li><p>通过 <code>open</code> <code>onOpenChange</code> 来优化交互。</p></li></ul></blockquote>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="date-demo-page"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>额外的页脚</a></div>
                <div>
                    <p>在浮层中加入额外的页脚，以满足某些定制信息的需求。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="date-demo-cell"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>定制日期单元格</a></div>
                <div>
                    <p><p>使用 <code>dateRender</code> 可以自定义日期单元格的内容和样式。</p></p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="date-demo-style"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>日期格式</a></div>
                <div>
                    <p><p>使用 <code>format</code> 属性，可以自定义日期显示格式。</p></p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="date-demo-change"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>日期时间选择</a></div>
                <div>
                    <p>增加选择时间功能，当 <code>showTime</code> 为一个对象时，其属性会传递给内建的 <code>TimePicker</code>。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="date-demo-unselected"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>不可选择日期和时间</a></div>
                <div>
                    <p>可用 <code>disabledDate</code> 和 <code>disabledTime</code> 分别禁止选择部分日期和时间，其中 <code>disabledTime</code> 需要和 <code>showTime</code> 一起使用。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="date-demo-pre"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>预设范围</a></div>
                <div>
                    <p>RangePicker 可以设置常用的 预设范围 提高用户体验。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="date-demo-board"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>受控面板</a></div>
                <div>
                    <p>通过组合 <code>mode</code> 与 <code>onPanelChange</code> 控制要展示的面板。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-date >}}

## API

日期类组件包括以下四种形式。

- DatePicker
- MonthPicker
- RangePicker
- WeekPicker

**注意：**DatePicker、MonthPicker、RangePicker、WeekPicker 部分 locale 是从 value 中读取，所以请先正确设置 moment 的 locale。

```jsx
// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
// import moment from 'moment';
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');

<DatePicker defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} />
```

### 共同的 API

以下 API 为 DatePicker、MonthPicker、RangePicker, WeekPicker 共享的 API。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 是否显示清除按钮 | boolean | true |
| autoFocus | 自动获取焦点 | boolean | false |
| className | 选择器 className | string | '' |
| dateRender | 自定义日期单元格的内容 | function(currentDate: moment, today: moment) => React.ReactNode | - |
| disabled | 禁用 | boolean | false |
| disabledDate | 不可选择的日期 | (currentDate: moment) => boolean | 无 |
| getCalendarContainer | 定义浮层的容器，默认为 body 上新建 div | function(trigger) | 无 |
| locale | 国际化配置 | object | [默认配置](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) |
| open | 控制弹层是否展开 | boolean | - |
| placeholder | 输入框提示文字 | string\|RangePicker\[] | - |
| popupStyle | 额外的弹出日历样式 | object | {} |
| dropdownClassName | 额外的弹出日历 className | string | - |
| size | 输入框大小，`large` 高度为 40px，`small` 为 24px，默认是 32px | string | 无 |
| style | 自定义输入框样式 | object | {} |
| onOpenChange | 弹出日历和关闭日历的回调 | function(status) | 无 |

### 共同的方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |

### DatePicker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认日期 | [moment](http://momentjs.com/) | 无 |
| disabledTime | 不可选择的时间 | function(date) | 无 |
| format | 展示的日期格式，配置参考 [moment.js](http://momentjs.com/) | string | "YYYY-MM-DD" |
| renderExtraFooter | 在面板中添加额外的页脚 | () => React.ReactNode | - |
| showTime | 增加时间选择功能 | Object\|boolean | [TimePicker Options](../time-picker/#API) |
| showTime.defaultValue | 设置用户选择日期时默认的时分秒，[例子](https://ant.design/components/date-picker/#components-date-picker-demo-disabled-date) | [moment](http://momentjs.com/) | moment() |
| showToday | 是否展示“今天”按钮 | boolean | true |
| value | 日期 | [moment](http://momentjs.com/) | 无 |
| onChange | 时间发生变化的回调 | function(date: moment, dateString: string) | 无 |
| onOk | 点击确定按钮的回调 | function() | - |

### MonthPicker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认日期 | [moment](http://momentjs.com/) | 无 |
| format | 展示的日期格式，配置参考 [moment.js](http://momentjs.com/) | string | "YYYY-MM" |
| monthCellContentRender | 自定义的月份内容渲染方法 | function(date, locale): ReactNode | - |
| renderExtraFooter | 在面板中添加额外的页脚 | () => React.ReactNode | - |
| value | 日期 | [moment](http://momentjs.com/) | 无 |
| onChange | 时间发生变化的回调，发生在用户选择时间时 | function(date: moment, dateString: string) | - |

### WeekPicker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认日期 | [moment](http://momentjs.com/) | - |
| format | 展示的日期格式，配置参考 [moment.js](http://momentjs.com/) | string | "YYYY-wo" |
| value | 日期 | [moment](http://momentjs.com/) | - |
| onChange | 时间发生变化的回调，发生在用户选择时间时 | function(date: moment, dateString: string) | - |

### RangePicker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认日期 | [moment](http://momentjs.com/)\[] | 无 |
| disabledTime | 不可选择的时间 | function(dates: [moment, moment], partial: `'start'|'end'`) | 无 |
| format | 展示的日期格式 | string | "YYYY-MM-DD HH:mm:ss" |
| ranges       | 预设时间范围快捷选择 | { \[range: string\]&#x3A; [moment](http://momentjs.com/)\[] } \| () => { \[range: string\]&#x3A; [moment](http://momentjs.com/)\[] } | 无 |
| renderExtraFooter | 在面板中添加额外的页脚 | () => React.ReactNode | - |
| showTime | 增加时间选择功能 | Object\|boolean | [TimePicker Options](../time-picker/#API) |
| showTime.defaultValue | 设置用户选择日期时默认的时分秒，[例子](https://ant.design/components/date-picker/#components-date-picker-demo-disabled-date) | [moment](http://momentjs.com/)\[] | [moment(), moment()] |
| value | 日期 | [moment](http://momentjs.com/)\[] | 无 |
| onCalendarChange | 待选日期发生变化的回调 | function(dates: [moment, moment], dateStrings: [string, string]) | 无 |
| onChange | 日期范围发生变化的回调 | function(dates: [moment, moment], dateStrings: [string, string]) | 无 |
| onOk | 点击确定按钮的回调 | function() | - |

<style>
.code-box-demo .ant-calendar-picker {
  margin: 0 8px 12px 0;
}
</style>
