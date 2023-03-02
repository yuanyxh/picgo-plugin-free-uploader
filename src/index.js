/*
 * @Author: yuanyxh 15766118362@139.com
 * @Date: 2023-03-01 21:42:43
 * @LastEditors: yuanyxh 15766118362@139.com
 * @LastEditTime: 2023-03-03 00:42:00
 * @FilePath: \custom-uploader\src\index.js
 * @Description: plugin entry, init uploader config
 */

const { SANDBOX_CONFIG, CONTEXT } = require('./config');
const { createUploader, config, guiMenu } = require('./uploader');
const { createLog } = require('./utils');

module.exports = function custom_uploader(ctx) {
  const register = () => {
    ctx.on('fail', (err) => {
      ctx.emit('notification', {
        title: '上传失败',
        body: err
      })
    });

    ctx.helper.uploader.register('custom-uploader', {
      name: '自定义图片上传',
      handle: createUploader(
        { ...CONTEXT, log: createLog(ctx) },
        SANDBOX_CONFIG
      ),
      config
    });
  };

  return { uploader: 'custom-uploader', register, guiMenu };
};
