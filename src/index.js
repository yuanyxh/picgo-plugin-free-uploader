/*
 * @Author: yuanyxh 15766118362@139.com
 * @Date: 2023-03-01 21:42:43
 * @LastEditors: yuanyxh 15766118362@139.com
 * @LastEditTime: 2023-03-03 10:27:58
 * @FilePath: \free-uploader\src\index.js
 * @Description: plugin entry, init uploader config
 */

const { SANDBOX_CONFIG, CONTEXT } = require('./config');
const { createUploader, config, guiMenu } = require('./uploader');
const { createLog } = require('./utils');

module.exports = function custom_uploader(ctx) {
  const register = () => {
    /** FIXME: 待完善 */
    ctx.on('failed', (err) => {
      ctx.log.error('上传失败', err);
    });

    ctx.helper.uploader.register('free-uploader', {
      name: '自定义图片上传',
      handle: createUploader(
        { ...CONTEXT, log: createLog(ctx) },
        SANDBOX_CONFIG
      ),
      config
    });
  };

  return { uploader: 'free-uploader', register, guiMenu };
};
