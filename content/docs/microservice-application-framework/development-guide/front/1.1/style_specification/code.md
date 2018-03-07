+++
title = "代码规范"
data = "2017-10-20"
draft = false
weight= 2
+++

# 代码规范

## 代码规范

采用Alibnb规范 [https://github.com/airbnb/javascript](https://github.com/airbnb/javascript)

1. 代码注释

- 新建文件，头部进行注释。

```
/*
author: xxx@hand-china.com
time: 2017-2-17
feature: 模块功能
*/
class User extends Component{
……
……
}
```

- 函数功能注释

```
//feature:输出变量的值
function
inputDome(demo)
{
console.log(demo);
};
```

## eslint规范
项目eslint配置为
```
{
  "root": true,
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
    // "worker": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": [
    "react"
  ],
  "extends": "airbnb",
  "rules": {
    "react/jsx-no-bind": [
      "error",
      {
        "ignoreRefs": true,
        "allowArrowFunctions": true,
        "allowBind": true
      }
    ],
    "react/prefer-stateless-function": ["off",
      {
        "ignorePureComponents": true
      }
    ],
    "jsx-a11y/interactive-supports-focus": "off",
    "no-trailing-spaces": "off",
    "class-methods-use-this": "off",
    "import/no-extraneous-dependencies": "off",
    "no-else-return": "off",
    "linebreak-style": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "react/prop-types": "off",
    "react/jsx-filename-extension": "off",
    "jsx-a11y/href-no-hash": "off",
    "react/require-default-props": "off",
    "no-console": "warn",
    "no-debugger": "off",
    "jsx-a11y/anchor-is-valid": [
      "warn",
      {
        "aspects": [
          "invalidHref"
        ]
      }
    ]
  },
  "globals": {
    "HAP": true
  }
}

```