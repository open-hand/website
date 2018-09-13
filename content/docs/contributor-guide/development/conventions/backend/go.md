+++
title = "Go 开发"
description = "Go 开发过程中的项目目录及命名规范"
weight = 2
+++

## 项目目录结构

GOPATH是Go的工作目录，在windows上是`C:\user\username\go`。模板示例：

```
GOPATH
    |--bin
    |--pkg
    |--src
        |-----github.com
            |---c7n 项目名称
                |---.git git相关的内容
                |---cmd 项目的主要应用程序
                    |---app
                    |---kube
                    ...
                |---internal 私有应用程序和库代码，不希望其他人在他们的应用程序或库导入
                |---pkg 可以被其他应用引用的库
                |---vendor 依赖的go程序包
                        |---github.com/xxx 第三方库
                |---api OpenAPI/Swagger规格, JSON格式文件, protocol定义文件等等
                |---web Web应用程序组件:静态资源,服务器端模板等
                |---configs 配置文件模板或默认配置
                |---init 系统初始化配置
                |---scripts 执行各种构建、安装、分析的脚本
                |---build 打包和持续集成
                |---deployments IaaS,PaaS,系统和集装箱编配部署配置和模板
                |---test 外部测试程序和测试数据
                |---docs 用户文档，包括godoc生成的文档
                |---tools 支持此项目的工具(比如脚本文件等)
                |---examples 例子
                |---third_party 第三方工具
                |---githooks 
                |---assets 其他资源
                ... 
    |-- google.golang.org ...
    ...
```

## 命名规范

所有的标识符按照Go规定的标志符命名，即数字，字母下划线，应该以字母开头。

### 文件名命名规范

用**小写**，尽量见名思义，看见文件名就可以知道这个文件下的大概内容，对于源代码里的文件，文件名要很好的代表了一个模块实现的功能。

### 包名

包名用**小写**，使用短命名，尽量和标准库不要冲突。

### 接口名

单个函数的接口名以"er"作为后缀，其函数去掉"er"如Reader,Writer。

```
type Reader interface {
        Read(p []byte) (n int, err error)
}
```

两个函数的接口名综合两个函数的名字，比如：

```
type WriteFlusher interface {
    Write([]byte) (int, error)
    Flush() error
}
```

三个函数及以上的接口名类似于结构体名，比如：

```
type Car interface {
    Start([]byte) 
    Stop() error
    Recover()
}
```

### 变量名

- 全局变量：采用驼峰命名法 

- 局部变量：驼峰式，小写字母开头

### 常量名

常量：大写，采用下划线

### 函数名

采用驼峰命名法，尽量不要使用下划线，首字母小写为包内可见，首字母大写则可以被包外引用。 函数的返回结果可以给定一个名字，该名字会被初始化，如果函数执行了没有参数的 return 语句，则结果参数的当前值便被作为要返回的值。比如：

```
func ReadFull(r Reader, buf []byte) (n int, err error) {
    for len(buf) > 0 && err == nil {
        var nr int
        nr, err = r.Read(buf)
        n += nr
        buf = buf[nr:]
    }
    return
}
```

### Geter/Seter方法

Go不提供对Get方法和Set方法的自动支持，需要自己编写。
{{< note >}}Geter方法名上不允许加上Get，比如：有一个结构体owner（小写，包内可见），则Get方法应该叫做 Owner()（大写，可被包外引用），而不是GetOwner()。而Seter方法可以加上Set前缀，比如：SetOwner()方法。{{</ note >}}

## import规范

import在多行的情况下，Goimports会自动帮您格式化，在一个文件里面引入了一个package，建议采用如下格式：

```
import (
    "fmt"
)
```

如果本包引入了三种类型的包：标准库包，程序内部包，第三方包，建议采用如下方式进行组织：

```
import (
    "encoding/json"            //标准库包
    "strings"

    "myproject/models"         //程序内部包
    "myproject/controller"
    
    "git.obc.im/obc/utils"     //第三方包
    "git.obc.im/dep/beego"
    "git.obc.im/dep/mysql"
)
```

导包时，应尽量使用绝对路径：

```
import "xxxx.com/proj/net"  // 正确
import "../net"             // 错误
```

## 代码规范

### 格式

**缩进**： 代码对齐应该使用table对齐。

**行长度**： Go没有行长度限制。如果感觉一行太长，可以折成几行，并额外使用一个tab进行缩进。

**括号**： 控制结构（if/for/switch）的语法不需要括号。

**go fmt** ：可以使用go fmt工具来处理格式问题，比如： 不需要花费时间对结构体中每个域的注释进行排列

```
type T struct {
    name string // name of the object
    value int// its value
}
```

go fmt会做如下改动：

```
type T struct {
    name string // name of the object
    value int   // its value
}
```

go fmt默认只对本目录下的.go文件进行格式化，使用`go fmt ./...`可以递归地对该目录下子文件都进行格式化。

### 注释

Go有两种注释方式，块注释 /*  */ 和 行注释 // 。 Godoc用来处理Go源文件，抽取有关程序包内容的文档。在顶层声明之前出现，若中间没有换行的注释，会随着声明一起被抽取，作为该项的解释性文本。 每个程序包都应该有一个包注释，位于包声明之前，比如：

```
/*
Package regexp implements a simple library for regular expressions.
The syntax of the regular expressions accepted is:
    regexp:
        concatenation { '|' concatenation }
    concatenation:
        { closure }
    closure:
        term [ '*' | '+' | '?' ]
    term:
        '^'
        '$'
        '.'
        character
        '[' [ '^' ] character-ranges ']'
        '(' regexp ')'
*/
package regexp
```

如果程序包很简单，则包注释可以非常简短：

```
// Package path implements utility routines for
// manipulating slash-separated filename paths.
```

函数的注释，第一条语句应该为一条概括语句，并且使用被声明的名字作为开头。比如：

```
// Compile parses a regular expression and returns, if successful, a Regexp
// object that can be used to match against text.
func Compile(str string) (regexp *Regexp, err error) {}
```

变量的注释，可以对声明进行组合，比如：

```
// Error codes returned by failures to parse an expression.
var (
    ErrInternal = errors.New("regexp: internal error")
    ErrUnmatchedLpar = errors.New("regexp: unmatched '('")
    ErrUnmatchedRpar = errors.New("regexp: unmatched ')'")
    ...
)
```

### 分号

在Go中，应该尽量只在for/if语句中使用分号，比如：

```
for i := 0; i < 3 ; i++ {
}
if n, ok = info(); ok {
}
```

### 控制结构

Go的控制结构包括if/for/switch/select，控制条件可以不用加圆括号()，而且左大括号不能放在下一行，Go不使用分号作为语句终结符，其原因是在编译初期，词法分析器会在它认为是语句结束标志（即换行符）后添加分号，比如：

```
if i < f()          // 错误     词法分析器解析为-->  if i < i f();{}  从而报错
{
}

if i < f() {        // 正确     词法分析器解析为-->  if i < i f(){;}  立面的分号是合法的
}
```

Go的if语句应该避免使用else语句，比如：

```
f, err := os.Open(name)
if err != nil {
    return err             // 出错则不会往下走
}
d, err := f.Stat()         // 这里的err不是重新声明，而是重新赋值
if err != nil {
    f.Close()
    return err
}
codeUsing(f, d)
```

Go的for语句块统一了c的for和while语句：

```
// Like a C for
for init; condition; post { }
// Like a C while
for condition { }
// Like a C for(;;)
for { }
```

{{< note >}}Go的自增/自减操作是语句而不是表达式，因此，当i++是正确的，而++i则会编译不通过。{{</ note >}}

Go的switch比c更加通用，表达式不需要为常量，甚至不需要为整数，case是按照从上到下的顺序进行求值，直到找到匹配的。如果 switch 没有表达式，则对true进行匹配。可以将大量的if-else-if-else串改写成一个switch，比如：

```
func unhex(c byte) byte {
    switch {
        case '0' <= c && c <= '9':       // 每个case会自动break
            return c - '0'
        case 'a' <= c && c <= 'f':
            return c - 'a' + 10
        case 'A' <= c && c <= 'F':
            return c - 'A' + 10
    }
    return 0
}
```

### 空白标识符

Go中以_下划线标识来接收空白的内容，相当于Unix系统的一个设备占用符null。当某个函数或者range返回多个值时，若只需要其中一个值，则可以用下划线占位，比如：

```
if _, err := os.Stat(path); os.IsNotExist(err) {
    fmt.Printf("%s does not exist\n", path)
}
```

禁止编译器对未使用导入包的错误报告，可以用空白标识符来引用一个被导入包中的符号。同样的，将未使用的变量fd赋值给一个空白标识符也可以禁止编译错误，但是一定要有注释：

```
package main
import (
        "fmt"
        "io"
        "log"
        "os"
    )
var _ = fmt.Printf  // For debugging; delete when done.
var _ io.Reader     // For debugging; delete when done.
func main() {
    fd, err := os.Open("test.go")
    if err != nil {
        log.Fatal(err)
    }
    // TODO: use fd.
    _ = fd
}
```

若不需要使用这些API，为了实现仅为副作用而导入包的操作，可以在导入语句中，将包用空白标识符进行重命名：

```
import _ "net/http/pprof"
```

## 错误处理

**error**：error作为函数的值返回，必须尽快对error进行处理，采用独立的错误流进行处理，不要采用下面这种方式：

```
if err != nil {
        // error handling
    } else {
        // normal code
}
```

而是采用这种方式：

```
if err != nil {
        // error handling
        return // or continue, etc.
    }
    // normal code
```

如果返回值需要初始化，则采用下面的方式：

```
x , err := f()
 if err != nil {
        // error handling
        return // or continue, etc.
    }
    // use x
```

**Panic**：用来创建一个 RuntimeException 并结束当前程序。该函数接受一个任意类型的参数，并在程序挂掉之前打印该参数内容，通常选择一个字符串作为参数。比如：

```
func init() {
    if user == "" {
        panic("no value for $USER")
    }
}
```

应该在逻辑处理中禁用panic。在main包中只有当实在不可运行的情况采用panic，例如文件无法打开，数据库无法连接导致程序无法正常运行，但是对于其他的package对外的接口不能有panic，只能在包内采用。建议在main包中使用log.Fatal来记录错误，这样就可以由log来结束程序。

**Recover**：recover用于捕获runtime的异常，禁止滥用recover，在开发测试阶段尽量不要用recover，recover一般放在你认为会有不可预期的异常的地方。比如：

```
func server(workChan <-chan *Work) {
    for work := range workChan {
        go safelyDo(work)
    }
}

func safelyDo(work *Work) {
    defer func() {
        if err := recover(); err != nil {
            log.Println("work failed:", err)
        }
    }()
    // do 函数可能会有不可预期的异常
    do(work)
}
```

**Defer**：该函数会在return前执行，对于一些资源的回收用defer是好的，但也禁止滥用defer，defer是需要消耗性能的，所以频繁调用的函数尽量不要使用defer。

```
// Contents returns the file's contents as a string.
func Contents(filename string) (string, error) {
    f, err := os.Open(filename)
    if err != nil {
        return "", err
    }
    defer f.Close()  // f.Close will run when we're finished.

    var result []byte
    buf := make([]byte, 100)
    for {
        n, err := f.Read(buf[0:])
        result = append(result, buf[0:n]...) // append is discussed later.
        if err != nil {
            if err == io.EOF {
                break
            }
            return "", err  // f will be closed if we return here.
        }
    }
    return string(result), nil // f will be closed if we return here.
}
```
