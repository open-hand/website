+++
title = "HAP封装函数"
data = "2017-10-20"
draft = false
weight= 1
+++

# HAP封装函数

HAP文件为框架全局注入的封装函数类，项目内部可以直接调用HAP函数算法进行计算操作

```
function getAccessToken(hash) {
  if (hash) {
    const ai = hash.indexOf(ACCESS_TOKEN);
    if (ai !== -1) {
      const accessToken = hash.split('&')[0].split('=')[1];
      return accessToken;
    }
  }
  return null;
}

function setAccessToken(token, expiresion) {
  const expires = expiresion * 1000;
  const expirationDate = new Date(Date.now() + expires);
  setCookie(ACCESS_TOKEN, token, {
    path: '/',
    expires: expirationDate,
  });
}

function removeAccessToken() {
  removeCookie(ACCESS_TOKEN, {
    path: '/',
  });
}


function languageChange(id) {
  return <FormattedMessage id={`${id}`} />;
}

function logout() {
  removeAccessToken();
  AppState.setAuthenticated(false);
  window.location = `${process.env.AUTH_HOST}/logout`;
}

function getMessage(zh, en) {
  const language = AppState.currentLanguage;
  if (language === 'zh') {
    return zh;
  } else if (language === 'en') {
    return en;
  }
  return false;
}

function prompt(type, content) {
  switch (type) {
    case 'success':
      message.success(content);
      break;
    case 'error':
      message.error(content);
      break;
    default:
      break;
  }
}

function handleResponseError(error) {
  const response = error.response;
  if (response) {
    const status = response.status;
    switch (status) {
      case 400: {
        const mess = response.data.message;
        message.error(mess);
        break;
      }
      default:
        break;
    }
  }
}

function unauthorized() {
  HAP.removeAccessToken();
  AppState.setAuthenticated(false);
  window.location = `${HAP.AUTH_URL}`;
}

// 生成指定长度的随机字符串
function randomString(len = 32) {
  let code = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const maxPos = chars.length;
  for (let i = 0; i < len; i += 1) {
    code += chars.charAt(Math.floor(Math.random() * (maxPos + 1)));
  }
  return code;
}

function setTheme(site, color) {
  if (theme) {
    if (theme[site]) {
      return theme[site];
    } else {
      return color;
    }
  }
}
function getConfig(site) {
  if (config) {
    return config[site];
  }
}
function getMenuCode(data, type, permission, organid, proid) {
  permission.map(value => {
    if (type === 'organization') {
      permission = {
        "name": `${data}.${value}`,
        "resourceId": organid,
        "resourceType": type,
        "organizationId": organid
      };
    } else if (type === 'project') {
      permission = {
        "name": `${data}.${value}`,
        "resourceId": proid,
        "resourceType": type,
        "organizationId": organid
      };
    }
    MenuCode.push(permission);
  })
  const uniqMenuCode = _.uniqBy(MenuCode, 'name');
  return uniqMenuCode;
}
function getPermission(data, type) {
  let approve;
  data[0] && data[0].map(value => {
    if(value.name) {
      if (value.name === type) {
        approve = value.approve;
      }
    }
  })
  return approve;
}
```

函数名 | 说明
--- | ---
getAccessToken | 获取url token值
setAccessToken | 前端存储cookie token值
removeAccessToken | 移除token值
languageChange | 多语言
logout | 登出系统
getMessage | 返回多语言字符串
prompt | 提示错误信息
handleResponseError | 处理错误响应
unauthorized | 没有权限 页面跳转
randomString | 生成制定长度的随机字符串
setTheme | 获取主题配置
getConfig | 获取主配置

# 使用方法
在页面直接调用`HAP.函数名`