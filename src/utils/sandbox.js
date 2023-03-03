/*
 * @Author: yuanyxh 15766118362@139.com
 * @Date: 2023-03-02 00:34:43
 * @LastEditors: yuanyxh 15766118362@139.com
 * @LastEditTime: 2023-03-02 22:41:24
 * @FilePath: \picgo-plugin-free-uploader\src\utils\sandbox.js
 * @Description: sandbox file, manage the sandbox tool
 */

const { Safeify } = require('safeify');
const { isExist } = require('./index');

/**
 *
 * @param {Object} context provide data from the internal access to the sandbox
 * @param {{
 *   timeout: Number,
 *   asyncTimeout: Number,
 *   quantity: Number,
 *   memoryQuota: Number,
 *   cpuQuota: Number
 * }} config provide the configuration of the operation of the sandbox
 * @returns {{
 *  run: (code: string) => {any},
 *  destory: () => void
 * }}
 */
module.exports = (context, config) => {
  let safeify = new Safeify(config);

  return {
    /**
     *
     * @param {string} code javaScript code that can be executed
     * @returns {Promise<string>} return value depends on the execution result of the code that passes the code
     */
    run: (code) => {
      if (!isExist(safeify)) return;
      return safeify.run(code, context);
    },
    /**
     * destroy sandbox example
     */
    destory: () => {
      if (!safeify)
        throw Error('the sandbox has been destroyed, please create again');
      safeify.destory();
      safeify = null;
    },
    /**
     * @description: reset safeify object
     * @return {void}
     */
    reset: () => {
      safeify = new Safeify(config);
    }
  };
};
