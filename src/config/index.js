/*
 * @Author: yuanyxh 15766118362@139.com
 * @Date: 2023-03-02 15:26:49
 * @LastEditors: yuanyxh 15766118362@139.com
 * @LastEditTime: 2023-03-03 00:01:42
 * @FilePath: \picgo-plugin-custom-uploader\src\config\index.js
 * @Description: config file, set plugin global configuration
 */

const crypto = require('crypto');
const { base64 } = require('../utils/index');

// sandbox config, restrict sandbox operations
const SANDBOX_CONFIG = { timeout: 1500, asyncTimeout: 1500, cpuQuota: 0.3 };
// the context in which the sandbox runs
const CONTEXT = {
  base64,
  crypto
};
const REQUEST_HEADER = {
  contentType: 'multipart/form-data',
  'User-Agent': 'PicGo'
};

module.exports = {
  SANDBOX_CONFIG,
  CONTEXT,
  REQUEST_HEADER
};
