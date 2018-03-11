+++
title = "Webpack"
date = "2017-10-26"
draft = false
weight= 3
+++

Webpack
=======

* * * * *

-   本项目选择Webpack作为脚手架

<!-- -->

    // webpack 配置文件

    |-- webpack.config.js
    |-- webpack.development.js
    |-- webpack.production.js

    // npm相关命令
    "scripts": {
        //npm start 运行开发环境
        "start": "webpack-dev-server --config webpack.development.js",
        //npm run build  清除dist生成文件，并运行生产环境
        "build": "npm run clean && webpack --config webpack.production.js",
        //npm run clean 清除dist生成文件
        "clean": "rimraf dist",
        //npm run test 运行测试文件
        "test": "mocha --compilers js:babel-core/register"
      }

-   webpack的基础配置

<!-- -->

    entry: {
      // 公共文件
      vendor: ["react", "react-dom", "react-router", "react-motion", "antd"],
      //入口文件
      app: [
        path.resolve(__dirname, 'src/app/app.js')
      ]
    },
    //出口文件设置
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'app/[name]_[hash:8].js',
      chunkFilename: 'app/chunks/[name].[chunkhash:5].chunk.js',
    },
    resolve: {
      //模块寻找路径
      modules: [path.resolve(__dirname, 'src'), 'src/lib', 'node_modules'],
      //模块省略相关扩展名
      extensions: ['.js', '.json', '.jsx', '.ts', '.less'],
    },
    //解析的相关文件配置
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader'
        }],
        exclude: /node_modules/,
      }, {
        test: /\.(tsx?$)/,
        use: [{
          loader: 'ts-loader'
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader'
        }],
        exclude: /node_modules/,
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
    // devserver的配置
    devServer: {
      historyApiFallback: true,
      hot: true,
      // inline: true,
      stats: 'minimal',
      port: 3000,
      contentBase: "src/www"
    }

-   Webpack的相关手册：<https://webpack.js.org/>

