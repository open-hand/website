+++
title = "Markdown 编写规范"
description = ""
weight = 2
+++

# 在App Engine灵活环境中快速启动Go

本快速入门介绍如何创建一个显示简短消息的小型App Engine应用程序。

## 在你开始之前

在运行和部署此示例之前，请执行以下步骤：

1. 使用GCP控制台创建新的GCP项目，创建App Engine应用程序并启用计费：

    提示时，选择的区域 ，你希望你的App Engine应用程序所在，然后启用计费。

2. 在本地安装以下先决条件：

    a. 下载并安装git。  
    b. 下载并安装Google Cloud SDK，然后初始化该 gcloud工具： 

3. 或者：您可以使用 已安装git和Cloud SDK的Google Cloud Shell以及 许多其他功能，如语言支持和代码编辑器。
    在Google云端Shell启动后，您可以继续本教程的其余部分，并在云端Shell中执行您的命令。

本快速入门假设您熟悉Go编程语言，并且已安装Go。

## 下载Hello World应用程序 

我们为Go创建了一个简单的Hello World应用程序，因此您可以快速了解将应用程序部署到App Engine灵活环境的感受。从命令行执行这些步骤以将Hello World下载到本地计算机。

下载示例应用程序并导航到应用程序目录：

1. 获取Hello World示例应用程序及其依赖项：

    ```
    go get -u -d github.com/GoogleCloudPlatform/golang-samples/appengine_flexible/helloworld
    ```

2. 切换到包含示例代码的目录：

    ```
    cd $GOPATH/src/github.com/GoogleCloudPlatform/golang-samples/appengine_flexible/helloworld
    ```

## 在本地机器上运行Hello World

在本地计算机上运行Hello World应用程序：

1. 启动本地Web服务器：

    ```
    go run *.go
    ```

2. 在您的网络浏览器中，输入以下地址：
    
    ```
    http://localhost:8080
    ```

> 注意：如果您正在使用云端Shell，请在工具栏中单击 Web预览，然后选择端口8080上的预览。

<blockquote class="note">
    如果您正在使用云端Shell，请在工具栏中单击 Web预览，然后选择端口8080上的预览。
</blockquote>
<blockquote class="warning">
    如果您正在使用云端Shell，请在工具栏中单击 Web预览，然后选择端口8080上的预览。
<ul>
    <li>如果您使用的是现有项目，则还会删除您在项目中完成的其他任何工作。</li>
    <li>您不能重复使用已删除项目的项目ID。如果您创建了您计划在将来使用的自定义项目ID，则应该删除项目内部的资源。这可确保使用项目ID的appspot.comURL（例如URL）保持可用。</li>
</ul>
</blockquote>

## 在App Engine上部署并运行 Hello World

要将您的应用部署到App Engine灵活环境：

1. 通过从helloworld目录运行以下命令部署Hello World应用程序：

    ```
    gcloud应用程序部署
    ```

    [了解](#)可选标志。

2. 通过运行以下命令 启动浏览器并查看应用程序 ：`http://YOUR_PROJECT_ID.appspot.com`

    ```
    gcloud应用程序浏览
    ```

这一次，显示Hello World消息的页面由运行在App Engine实例上的Web服务器提供。

**恭喜！**您已将第一个Go应用程序部署到App Engine灵活环境！

请参阅以下各节以获取有关清理的信息以及可以采取的下一步可能的链接。

## 清理

为避免收费，您可以删除您的GCP项目，以停止对该项目中使用的所有资源进行结算。

> 警告：删除项目会导致以下后果：如果您使用的是现有项目，则还会删除您在项目中完成的其他任何工作。
您不能重复使用已删除项目的项目ID。如果您创建了您计划在将来使用的自定义项目ID，则应该删除项目内部的资源。这可确保使用项目ID的appspot.comURL（例如URL）保持可用。

1. 在云平台控制台中，转到“项目”页面。

2. 在项目列表中，选择要**删除的项目**并单击**删除**项目。

    ![](../images/markdown/delete-project-screenshot.png)

3. 在对话框中输入项目ID，然后单击**关闭**以删除该项目。

    ![](../images/markdown/delete-project-screenshot.png)

## 下一步是什么

现在您已经完成了Hello World，您可以开始探索您的下一个示例应用程序：Bookshelf应用程序。Bookshelf应用程序是一个更完整但仍然基本的Go Web应用程序，它使用多个Cloud Platform功能，如数据存储，身份验证，日志记录，发布/订阅等等。

有关App Engine灵活环境的更多信息，请参阅[App Engine概述](#)。

## Hello World代码审查

Hello World是最简单的App Engine应用程序，因为它只包含一个服务，只有一个版本，所有代码都位于应用程序的根目录中。本节详细介绍每个应用程序文件。

**helloworld.go**

该`helloworld.go`文件注册一个侦听请求的处理程序`/`，并用'Hello world！'进行响应。信息。

```go
package main

import (
        "fmt"
        "log"
        "net/http"
)

func main() {
        http.HandleFunc("/", handle)
        http.HandleFunc("/_ah/health", healthCheckHandler)
        log.Print("Listening on port 8080")
        log.Fatal(http.ListenAndServe(":8080", nil))
}

func handle(w http.ResponseWriter, r *http.Request) {
        if r.URL.Path != "/" {
                http.NotFound(w, r)
                return
        }
        fmt.Fprint(w, "Hello world!")
}

func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
        fmt.Fprint(w, "ok")
}
```

**app.yaml**

    ```
    runtime: go
    env: flex

    # This sample incurs costs to run on the App Engine flexible environment. 
    # The settings below are to reduce costs during testing and are not appropriate
    # for production use. For more information, see:
    # https://cloud.google.com/appengine/docs/flexible/python/configuring-your-app-with-app-yaml
    manual_scaling:
    instances: 1
    resources:
    cpu: 1
    memory_gb: 0.5
    disk_size_gb: 10
    ```

在这里， `app.yaml`指定应用程序使用的运行时和设置`env: flex`，指定应用程序使用[灵活的环境](#)。

- 有关Go运行时如何工作的更多信息，请参阅 [Go运行时](#)。

- 有关如何设计应用以利用版本和服务的更多详细信息，请参阅 [App Engine概述](#)。

- 有关App Engine配置设置的更多详细信息，请参阅 [使用app.yaml配置您的应用程序](#)。

