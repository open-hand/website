+++
title = "Webpack"
date = "2017-02-01"
draft = false
weight= 4
+++

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