+++
title = "Upload 上传"
weight = 17
+++

# Upload 上传

文件选择上传和拖拽上传控件。

## 何时使用

上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。

- 当需要上传一个或一些文件时。
- 当需要展现上传的进度时。
- 当需要使用拖拽交互时。

## 代码演示

<div class="c7n-row">
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="upload-demo-click"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>点击上传</a></div>
                <div>
                    <p>经典款式，用户点击按钮弹出文件选择框。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="upload-demo-list"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>已上传的文件列表</a></div>
                <div>
                    <p>使用 <code>defaultFileList</code> 设置已上传的内容。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="upload-demo-controller"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>完全控制的上传列表</a></div>
                <div>
                    <p>使用 <code>fileList</code> 对列表进行完全控制，可以实现各种自定义功能，以下演示三种情况：</p>
                    <p>1) 上传列表数量的限制。</p>
                    <p>2) 读取远程路径并显示链接。</p>
                    <p>3) 按照服务器返回信息筛选成功上传的文件。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="upload-demo-picture"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>图片列表样式</a></div>
                <div>
                    <p>上传文件为图片，可展示本地缩略图。<code>IE8/9</code> 不支持浏览器本地缩略图展示（<a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL">Ref</a>），可以写 <code>thumbUrl</code> 属性来代替。</p>
                </div>
            </section>
        </section>
    </div>
    <div class="c7n-row-6">
        <section class="code-box">
            <section class="code-box-demo"><div id="upload-demo-avatar"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>用户头像</a></div>
                <div>
                    <p>点击上传用户头像，并使用 <code>beforeUpload</code> 限制用户上传的图片格式和大小。</p>
                    <blockquote><p><code>beforeUpload</code> 的返回值可以是一个 Promise 以支持也支持异步检查：<a href="http://react-component.github.io/upload/examples/beforeUpload.html">示例</a>。</p></blockquote>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="upload-demo-wall"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>照片墙</a></div>
                <div>
                    <p>用户可以上传图片并在列表中显示缩略图。当上传照片数到达限制后，上传按钮消失。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="upload-demo-drag"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>拖拽上传</a></div>
                <div>
                    <p>把文件拖入指定区域，完成上传，同样支持点击上传。</p>
                    <p>设置 <code>multiple</code> 后，在 <code>IE10+</code> 可以一次上传多个文件。</p>
                </div>
            </section>
        </section>
        <section class="code-box">
            <section class="code-box-demo"><div id="upload-demo-hand"></div></section>
            <section class="code-box-meta">
                <div class="code-box-title"><a>手动上传</a></div>
                <div>
                    <p><code>beforeUpload</code> 返回 <code>false</code> 后，手动上传文件。</p>
                </div>
            </section>
        </section>
    </div>
</div>

{{< components-upload >}}

## API

> 服务端上传接口实现可以参考 [jQuery-File-Upload](https://github.com/blueimp/jQuery-File-Upload/wiki)。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| accept | 接受上传的文件类型, 详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept) | string | 无 |
| action | 必选参数, 上传的地址 | string | 无 |
| beforeUpload | 上传文件之前的钩子，参数为上传的文件，若返回 `false` 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传。**注意：IE9 不支持该方法**。 | (file, fileList) => `boolean | Promise` | 无 |
| customRequest | 通过覆盖默认的上传行为，可以自定义自己的上传实现 | Function | 无 |
| data | 上传所需参数或返回上传参数的方法 | object\|function(file) | 无 |
| defaultFileList | 默认已经上传的文件列表 | object\[] | 无 |
| disabled | 是否禁用 | boolean | false |
| fileList | 已经上传的文件列表（受控），使用此参数时，如果遇到 `onChange` 只调用一次的问题，请参考 [#2423](https://github.com/ant-design/ant-design/issues/2423) | object\[] | 无 |
| headers | 设置上传的请求头部，IE10 以上有效 | object | 无 |
| listType | 上传列表的内建样式，支持三种基本样式 `text`, `picture` 和 `picture-card` | string | 'text' |
| multiple | 是否支持多选文件，`ie10+` 支持。开启后按住 ctrl 可选择多个文件。 | boolean | false |
| name | 发到后台的文件参数名 | string | 'file' |
| showUploadList | 是否展示 uploadList, 可设为一个对象，用于单独设定 showPreviewIcon 和 showRemoveIcon | Boolean or { showPreviewIcon?: boolean, showRemoveIcon?: boolean } | true |
| supportServerRender | 服务端渲染时需要打开这个 | boolean | false |
| withCredentials | 上传请求时是否携带 cookie | boolean | false |
| onChange | 上传文件改变时的状态，详见 [onChange](#onChange) | Function | 无 |
| onPreview | 点击文件链接或预览图标时的回调 | Function(file) | 无 |
| onRemove   | 点击移除文件时的回调，返回值为 false 时不移除。支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除。               | Function(file): `boolean | Promise` | 无   |

### onChange

> 上传中、完成、失败都会调用这个函数。

文件状态改变的回调，返回为：

```js
{
  file: { /* ... */ },
  fileList: [ /* ... */ ],
  event: { /* ... */ },
}
```

1. `file` 当前操作的文件对象。

   ```js
   {
      uid: 'uid',      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
      name: 'xx.png'   // 文件名
      status: 'done', // 状态有：uploading done error removed
      response: '{"status": "success"}', // 服务端响应内容
      linkProps: '{"download": "image"}', // 下载链接额外的 HTML 属性
   }
   ```

   > `antd@1.9.0` 之前，multiple 模式下，此参数为一个对象数组 `[file, ...]`，`antd@1.9.0` 开始无论是否多选，均为一个对象。

2. `fileList` 当前的文件列表。
3. `event` 上传中的服务端响应内容，包含了上传进度等信息，高级浏览器支持。

## 显示下载链接

请使用 fileList 属性设置数组项的 url 属性进行展示控制。

## customRequest

- <https://github.com/react-component/upload#customrequest>

## IE note

- <https://github.com/react-component/upload#ie89-note>
