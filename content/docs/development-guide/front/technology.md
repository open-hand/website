+++
title = "技术栈"
description = ""
weight = 3
+++

# Git简明教程

# git 基本操作

<!-- @import "[TOC]" {cmd:"toc", depthFrom:1, depthTo:6, orderedList:false} -->
<!-- code_chunk_output -->

* [git 基本操作](#git-基本操作)
	* [开发流程](#开发流程)
	* [获取仓库](#获取仓库)
	* [添加至暂存区](#添加至暂存区)
	* [代码commit](#代码commit)
	* [回撤到某个版本](#回撤到某个版本)
	* [分支操作](#分支操作)
	* [分支合并](#分支合并)
	* [远程分支](#远程分支)

<!-- /code_chunk_output -->
## 开发流程

**Note. git commit 信息需注意分类**

- [FIX] 修复了功能
- [MOD] 修改或重构
- [ADD] 添加了功能
- [DEL] 删除了功能
- [IMP] 修改相关配置

## 获取仓库
```bash
git clone url --recursive
```

```bash
git clone -b dev url
```

**Note: git clone -b 分支名 远程仓库地址**
指定远程分支进行克隆

## 添加至暂存区

```bash
git add 文件名
```
将某文件从工作目录加入暂存区

```bash
git add .
```

添加工作区所有文件到暂存区

```bash
git reset HEAD 文件名
```

撤销某文件提交到暂存区的操作

**Note: git reset 若加上`--hard`参数，将会把工作区的文件也进行改变**

## 代码commit

```bash
git commit -m "commit信息"
```

此命令将暂存区的文件载入至本地仓库

若commit后发现有文件未加入暂存区，故而没有commit，而不想生成两条commit信息，在没有对工作区修改的情况下可使用:

```bash
git add 文件名
git commit --amend
```
这样便可以覆盖提交

## 回撤到某个版本

```bash
git checkout hash码
```

指定历史版本进行回撤，其效用等同于:

```bash
git reset --hard hash码
```
s
若想在确保新文件不消失的情况下回撤到指定版本，则:
```bash
git reset --soft hash码
```

## 分支操作

```bash
git branch
```
列出本地仓库的所有分支

```bash
git branch 分支名
```
新建分支

```bash
git checkout 分支名
```
切换到指定分支
 
```bash
git checkout -b 分支名
```
等价于
```bash
git branch 分支名 
git checkout 分支名
```

## 分支合并

```bash
git merge 分支名
```
以当前分支合并其它分支,此操作建议在vscode或jetbrain的ide操作，以便于当代码冲突时直接在图形化界面中进行处理。若在命令行操作，则需手工查找冲突文件进行合并。

## 远程分支

```bash
git remote add 远程仓库别名 远程仓库url
```
添加远程仓库

```bash
git push -u origin [本地分支:]远程分支
```
推送本地分支到远程仓库的某分支

```bash
git pull
```
拉取远程仓库
git pull 等价于git fetch 紧跟 git merge

**Note. `git pull 远程仓库别名 远程仓库分支`**
**Note. `git fetch 远程仓库别名 远程分支[:本地分支]`** 

<a href="http://eco.hand-china.com/doc/hap/latest/dev_guide/01.getting_start/01_git.html" target="_blank">Git简明教程</a>


# React

- 本项目使用React与Mobx作为前端框架，React 的核心思想是：封装组件。各个组件维护自己的状态和 UI，当状态变更，自动重新渲染整个组件。我们不再需要查找某个 DOM 元素，然后操作 DOM 去更改 Mobx 是 JavaScript 状态容器，提供可预测化的状态管理。

```
import React, { Component, PropTypes } from 'react';
import { observer, injext } from 'mobx-react';

@inject('AppState')
@observer
class Dashboard extends Component {
  constructor(props) {
    super(props);
  };
  componentDidMount(){};
  static propTypes = {
  };
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  render() {
    return (
      <div style={{ backGroundColor: "red", width: "100px", height: "100px"}}>
      </div>
    )
  }
}
function mapStateProps(state) {
  return {
  };
}
module.exports = Dashboard;
```

- [React](#react)


# Mobx
mobx是一个react的状态管理库，相对于redux，它使用更加简便，可扩展性更强。

- mobx 的核心理念是 简单、可扩展的状态管理库。
- react 关注的状态(state)到视图(view)的问题。而 mobx 关注的是状态仓库（store）到的状态(state)的问题。


![mobx工作流程图](../images/technology/mobx.png)
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

# Webpack

- 本项目选择Webpack作为脚手架

```
// webpack 配置文件

|-- packjson.js
|-- webpack.config.js
|-- webpack.dev.js
|-- webpack.dev.production.js
|-- webpack.dll.config.js
|-- webpack.file.js
|-- webpack.pro.config.js
|-- webpack.production.js
```

```
// npm相关命令
"scripts": {
    // 整合各个模块package.json
    "adjustinstall": "node webpack/packjson.js",
    //npm start 运行开发环境
    "start": "node bin/server",
    //清除缓存 重新编译
    "dev": "rimraf .cache && npm start",
    //npm run build  清除dist生成文件，并运行生产环境
    "build": "npm run clean && webpack --config ./webpack/webpack.production.js",
    "devbuild": "npm run clean && webpack --config ./webpack/webpack.dev.production.js",
    //npm run clean 清除dist生成文件
    "clean": "rimraf dist",
    //npm run test 运行测试文件
    "test:mocha": "./node_modules/.bin/mocha ./src/app/*/test/",
    "eslint": "eslint --ext .js src",
    "pre-push": "npm run eslint"
  }
```

- webpack的基础配置

```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const config = require('./webpack.file');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
//处理 BashOnWindow 下的打包错误
try {
  require('os').networkInterfaces()
} catch (e) {
  require('os').networkInterfaces = () => ({})
}

module.exports = {
  entry: {
    // vendor: ["react", "react-dom", "react-router-dom", "antd", "babel-polyfill"],
    app: [
      "babel-polyfill",
      'react-hot-loader/patch',
      path.resolve(__dirname, '../src/index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'app/[name]_[hash:8].js',
    chunkFilename: 'app/chunks/[name].[chunkhash:5].chunk.js',
  },
  resolve: {
    modules: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../node_modules'), 'node_modules', ...config.pathModule],
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.less'],
    alias: {
      Axios: path.resolve(__dirname, '../src/containers/common/axios.js'),
      Store: path.resolve(__dirname, '../src/containers/common//store.js'),
      RouteMap: path.resolve(__dirname, '../src/app/generate/RouteMap.js'),
      Icons: path.resolve(__dirname, '../src/app/generate/Icons.js'),
      Permission: path.resolve(__dirname, '../src/app/generate/Permission.js'),
      PerComponent: path.resolve(__dirname, '../src/app/iam/components/permission.js'),
      MainCss: path.resolve(__dirname, `../src/app/${config.mainCss}/assets/css/main.less`),
      Masters: path.resolve(__dirname, `../src/app/${config.Masters}/containers/Masters.js`),
      AutoRouter: path.resolve(__dirname, '../src/app/generate/AutoRouter.js'),
      MenuType: path.resolve(__dirname, '../src/app/iam/components/menu/MenuType.js'),
      MainMenu: path.resolve(__dirname, '../src/app/iam/components/menu/MainMenu.js'),
      ResourceMenu: path.resolve(__dirname, '../src/app/iam/components/menu/ResourceMenu.js'),
      UserPreferences: path.resolve(__dirname, '../src/app/iam/containers/UserPreferences.js'),
      IsAuthSpin: path.resolve(__dirname, '../src/app/iam/components/IsAuthSpin.js'),
      MasterHeader: path.resolve(__dirname, '../src/app/iam/components/MasterHeader.js'),
      LeftIconButton: path.resolve(__dirname, '../src/app/iam/components/menu/LeftIconButton.js'),
      MenuTitle: path.resolve(__dirname, '../src/app/iam/components/menu/MenuTitle.js'),
      Config: path.resolve(__dirname, '../../config.js'),
    }
  },
  module: {
    loaders: [{
      loader: path.resolve(__dirname, '../node_modules/happypack/loader.js')
    }],
    rules: [{
      enforce: "pre",
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'Happypack/loader?id=eslint',
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'Happypack/loader?id=babel',
    }, {
      test: /\.(tsx?$)/,
      use: [{
        loader: 'Happypack/loader?id=ts'
      }],
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      use: [{
        loader: 'Happypack/loader?id=css',
      }],
    },
    {
      test: /\.less$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
      }, {
        loader: 'less-loader',
        options: {
          "sourceMap": true,
          "modifyVars": config.themeSetting.antdTheme
        },
      }]
    }, {
      test: /\.(jpe?g|png|gif|svg|ico)/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'img_[hash:8].[ext]'
        }
      }]
    }, {
      test: /\.(ttf|eot|svg|woff|woff2)/,
      use: [{
        loader: 'file-loader'
      }]
    }],
  },
  plugins: [
    new HappyPack({
      id: 'eslint',
      threads: 1,
      loaders: [{
        loader: 'cache-loader',
        options: {
          cacheDirectory: path.resolve('.cache')
        }
      }, {
        path: 'eslint-loader',
        options: {
          emitError: true,
          failOnWarning: true,
          failOnError: true,
        },
      }],
    }),
    new HappyPack({
      id: 'babel',
      threads: 3,
      loaders: [{
        loader: 'cache-loader',
        options: {
          cacheDirectory: path.resolve('.cache')
        }
      }, {
        path: 'babel-loader',
      }],
    }),
    new HappyPack({
      id: 'ts',
      threads: 1,
      loaders: [{
        loader: 'cache-loader',
        options: {
          cacheDirectory: path.resolve('.cache')
        }
      }, {
        path: 'ts-loader',
      }]
    }),
    new HappyPack({
      id: 'ts',
      threads: 1,
      loaders: [{
        loader: 'cache-loader',
        options: {
          cacheDirectory: path.resolve('.cache')
        }
      }, {
        path: 'ts-loader',
      }]
    }),
    new HappyPack({
      id: 'css',
      threads: 1,
      loaders: [{
        loader: 'cache-loader',
        options: {
          cacheDirectory: path.resolve('.cache')
        }
      }, {
        path: 'style-loader',
      }, {
        path: 'css-loader',
      }]
    }),
    // new HappyPack({
    //   id: 'less',
    //   threads: 1,
    //   loaders: [{
    //     path: 'style-loader',
    //   },{
    //     path: 'css-loader',
    //   },{
    //     path: 'less-loader',
    //     options: {
    //       "sourceMap": true,
    //       "modifyVars": config.theme.antdTheme
    //     }
    //   }]
    // }),
    // new webpack.DllReferencePlugin({
    //   context: path.join(__dirname, "webpack"),
    //   manifest: require("./dll/vendor-manifest.json")
    // }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.AUTH_HOST': JSON.stringify(`${process.env.SERVER}/oauth`),
      'process.env.CLIENT_ID': JSON.stringify(`${config.clientid}`),
      'process.env.API_HOST': JSON.stringify(`${process.env.SERVER}`),
      // 'process.env.API_HOST': JSON.stringify('http://gateway.hapcloud.stage.cloud.saas.hand-china.com'),
    }),
    new HardSourceWebpackPlugin({
      cacheDirectory: path.resolve('.cache', 'hard-source/[confighash]'),
      recordsPath: path.resolve('.cache', 'hard-source/[confighash]/records.json'),
      environmentHash: {
        root: process.cwd(),
        directories: ['node_modules'],
        files: ['package.json'],
      },
      environmentHash: function() {
        return new Promise(function(resolve, reject) {
          require('fs').readFile(path.resolve(__dirname, '../yarn.lock'), function(err, src) {
            if (err) {return reject(err);}
            resolve(
              require('crypto').createHash('md5').update(src).digest('hex')
            );
          });
        });
      },
    }),
    new HtmlWebpackPlugin({
      title: config.titlename,
      template: path.resolve(__dirname, '../src/index.template.html'),
      inject: true,
      favicon: path.resolve(__dirname, `../../${config.favicon}`),
      minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true,
        removeTagWhitespace: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
      }
    }),
    // new AddAssetHtmlPlugin({
    //   filepath: path.resolve(__dirname, 'dist/dll/dll.vendor.js'),
    // }),
  ]
};

```

- Webpack的相关手册：[https://webpack.js.org/](https://webpack.js.org/)