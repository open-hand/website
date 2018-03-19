+++
title = "Mobx"
date = "2017-11-03"
draft = false
weight= 3
+++

# Mobx
mobx是一个react的状态管理库，相对于redux，它使用更加简便，可扩展性更强。

- mobx 的核心理念是 简单、可扩展的状态管理库。
- react 关注的状态(state)到视图(view)的问题。而 mobx 关注的是状态仓库（store）到的状态(state)的问题。


![mobx工作流程图](./images/mobx.png)
mobx有两个核心的概念,@observable 和 @observer ，它们分别对应的是被观察者和观察者。被观察者和一些操作函数共同组成了store，而观察者时刻观察着这些store的变化，当store内数据变化之后，观察者便会自动更新。

# 定义一个store
```
class Store {
  // 被观察者
  @observable todos = [{
    title: "完成 Mobx 翻译",
    done: false,
  }];
}

```
# 定义一个观察者

```
// 观察者
@observer
class TodoBox extends Component  {
  render() {
    return (
      <ul>
        {this.props.store.todos.map(todo => <li>{todo.title}</li>)}
      </ul>
    )
  }
```
# 获取以及更新值

通常使用@computed get来获取值

使用@action对store内的数据进行修改
```
class Store {
  @observable todos = [{
    title: "todo标题",
    done: false,
  },{
    title: "标题",
    done: true,
  }];

  @action changeTodoTitle({index,title}){
    this.todos[index].title = title
  }

  @computed get finishedTodos () {
    return  this.todos.filter((todo) => todo.done)
  }
}
```

Mobx相关资料:[http://eyehere.net/2016/mobx-getting-started/]