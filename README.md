# picgo-plugin-free-uploader

## 介绍

- author: yuanyxh
- submit for the first time: 2023/3/1
- description: a plugin for [PicGo]

一个 [PicGo] 插件，用于自定义上传图片，灵感来源于 [web-uploader]，因为作者所使用图床上传接口需要动态参数，[web-uploader] 不支持，于是生出了自己开发一个自定义图片上传插件的想法。

## 安装

克隆本项目至本地

```cmd
git clone https://github.com/yuanyxh/picgo-plugin-free-uploader.git
```

进入项目根目录并安装插件所需依赖

```cmd
npm install
```

下载 [PicGo] 并导入本项目

![20230303124129](http://qkc148.bvimg.com/18470/fff80ff0a2a8ac3a.png)

## 基本配置

导入项目后可在 `插件设置` 或 `图床设置` 中配置基本参数。

### url

必填项，上传的接口 url

### param

必填项，请求参数的 key

![20230303125239](http://qkc148.bvimg.com/18470/03a5380376942b51.png)

### navigation

可选项，接口返回数据中图片所在的路径，比如上传成功后接口返回如下数据

```json
{
  "success": true,
  "data": {
    "filename": "wechat.png",
    "size": 32,
    "url": "https://no-address/wechat.png"
  }
}
```

那么对应的路径就是 `data.url`。

### headers

可选项，自定义请求头，标准 `JSON` 格式。

### body

可选项，自定义请求体，标准 `JSON` 格式。

## 高级配置

基本配置已经能够满足大部分场景，但依旧不够灵活，无法提供部分图床上传接口所需的参数，比如获取当前时间戳、参数加密等，为此我添加了高级配置，允许用户提供 **自定义脚本** 以获取所需参数。

### 定义

自定义脚本应为一个 `.js` 文件，其中应实现一个 `handle` 函数，该函数需要返回一个包含 `headers`、`body` 或两者兼备的对象，一个满足要求的自定义脚本如下：

```js
// test.js
function handle() {
  return {
    headers: {},
    body: {}
  }
}
```

### 导入脚本

通过 `插件设置 -> 选择本地脚本` 导入你的脚本文件

![20230303133643](http://qkc148.bvimg.com/18470/90da0ae6e17fd966.png)

### 安全

需要注意的时，脚本代码是运行在沙箱 (sandbox) 环境下的，这意味着你无法使用绝大部分已知的 Api，这是为了安全考虑，但同时，插件还提供了一些可能需要使用的 Api，比如

#### crypto

[crypto] 是一个 [node.js] 模块，提供了加密相关的 Api，使用它能完成一些基本的加密操作。

#### base64

这是一个简单封装的 `base64` 编解码对象，包含 `encode` 和 `decode` 方法，只支持字符串，使用

```js
base64.encode('123456');
base64.decode('MTIzNDU2');
```

#### log

这是一个简单封装的函数，用于调试输出，输出存放在 `picgo` 默认的日志文件中，使用

```js
log('test');
```

除了上述接口，还有一些没有被沙箱屏蔽的 Api 可供使用，如日期对象 `Date`。

未来也可能会逐步添加新的 Api 以及其他功能。

[PicGo]: https://picgo.github.io/PicGo-Doc/zh/guide/
[web-uploader]: https://github.com/yuki-xin/picgo-plugin-web-uploader
[crypto]: http://nodejs.cn/api/crypto.html
[node.js]: http://nodejs.cn/
