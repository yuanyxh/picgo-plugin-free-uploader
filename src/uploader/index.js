/*
 * @Author: yuanyxh 15766118362@139.com
 * @Date: 2023-03-02 16:44:24
 * @LastEditors: yuanyxh 15766118362@139.com
 * @LastEditTime: 2023-03-03 11:07:47
 * @FilePath: \picgo-plugin-free-uploader\src\uploader\index.js
 * @Description: free-uploader, upload image related logic
 */

const fs = require('fs');
const sandbox = require('../utils/sandbox');
const {
  createSelector,
  createExecutor,
  merge,
  parse,
  isExist
} = require('../utils');
const { REQUEST_HEADER } = require('../config');

/**
 * @description: user-defined configuration
 * @param {object} ctx
 * @return {
 *  Array<{
 *    name: string,
 *    type: string,
 *    default: string,
 *    require: Boolean,
 *    message: string,
 *    alias: string
 *  }>
 * }
 */
const config = (ctx) => {
  let userConfig = ctx.getConfig('picBed.free-uploader');
  if (!userConfig) {
    userConfig = {};
  }
  return [
    {
      name: 'url',
      type: 'input',
      default: userConfig.url,
      required: true,
      message: '上传接口'
    },
    {
      name: 'param',
      type: 'input',
      default: userConfig.param,
      required: true,
      message: '提交参数'
    },
    {
      name: 'navigation',
      type: 'input',
      default: userConfig.navigation,
      required: false,
      message: '返回数据中图片 url 所在的路径'
    },
    {
      name: 'headers',
      type: 'input',
      default: userConfig.headers,
      required: false,
      message: '自定义请求头'
    },
    {
      name: 'body',
      type: 'input',
      default: userConfig.body,
      required: false,
      message: '自定义请求体'
    }
  ];
};

/**
 * @description: plugin options
 * @param {Object} ctx picgo context object
 * @return {
 *  Array<
 *    label: string,
 *    handle: (ctx: Object, guiApi: Object) => void
 *  >
 * }
 */
const guiMenu = (ctx) => [
  {
    label: '选择本地脚本',
    async handle(ctx, guiApi) {
      const files = await guiApi.showFileExplorer({
        properties: ['openFile'],
        filters: [{ name: 'JavaScript', extensions: ['js'] }]
      });
      fs.readFile(files[0], 'utf-8', (err, data) => {
        err &&
          ctx.emit('notification', {
            title: '错误',
            body: '读取失败，请检查文件是否合法，或前往插件官网查看文档'
          });

        try {
          data &&
            ctx.saveConfig({
              'picBed.free-uploader.code': data.toString()
            });
          ctx.emit('notification', {
            title: '完成',
            body: '已成功设置脚本'
          });
        } catch (err) {
          ctx.log.error(err);
          ctx.emit('notification', {
            title: '错误',
            body: '保存配置失败，请查看 picgo 日志，并向插件开发者反馈'
          });
        }
      });
    }
  }
];

/**
 * @description: moderate parameter data
 * @param {{
 *  url: string,
 *  param: string,
 *  navigation: string,
 *  headers: any,
 *  body: any,
 *  code: string
 * }} userConfig
 * @param {{
 *  buffer: Buffer,
 *  base64Image: string,
 *  fileName: string,
 *  width: number,
 *  height: number,
 *  extname: string
 * }} current
 * @return {Object}
 */
function normalizeParams(userConfig, current, data) {
  let { url, param, headers, body } = userConfig,
    { buffer, base64Image, fileName } = current;

  headers = merge(REQUEST_HEADER, parse(headers), data.headers || {});
  const formData = merge(parse(body), data.body || {});
  const image = buffer || (base64Image && Buffer.from(base64Image, 'base64'));
  formData[param] = { options: { filename: fileName }, value: image };

  return { url, method: 'POST', headers, formData };
}

/**
 * @description: create uploader
 * @param {Object} context
 * @param {Object} config
 * @return {(any) => void} return a uploader function, custom upload logic
 */
const createUploader = (context, config) => {
  const { run } = sandbox(context, config);
  return async (ctx) => {
    let config = ctx.getConfig(),
      userConfig = null;
    const selector = createSelector(config);

    userConfig = selector('picBed.free-uploader') || {};
    if (!userConfig.url || !userConfig.param)
      return ctx.emit('notification', {
        title: '上传失败',
        body: '请填写必填参数'
      });

    const list = ctx.output;
    const { navigation, code } = userConfig;
    for (let i = 0; i < list.length; i++) {
      let data = null;
      try {
        data = code && (await run(createExecutor(code)));
      } catch (err) {
        ctx.log.error(
          'the code is running abnormally, please check your script',
          err
        );
      }

      const current = list[i];
      const options = normalizeParams(userConfig, current, data);
      ctx.log.error('current', current);
      try {
        const results = await ctx.Request.request(options);
        navigation || (current['imgUrl'] = results);
        navigation &&
          (() => {
            current['imgUrl'] = createSelector(parse(results))(navigation);
          })();
      } catch (err) {
        ctx.log.error(err);
      }
    }
  };
};

module.exports = {
  createUploader,
  config,
  guiMenu
};
