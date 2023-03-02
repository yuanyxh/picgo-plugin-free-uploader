/*
 * @Author: yuanyxh 15766118362@139.com
 * @Date: 2023-03-02 12:59:59
 * @LastEditors: yuanyxh 15766118362@139.com
 * @LastEditTime: 2023-03-03 01:50:33
 * @FilePath: \picgo-plugin-custom-uploader-master\src\utils\index.js
 * @Description: utils files, you can use these functions and add new util
 */

/**
 * @description: check the param has value
 * @param {any} val
 * @return {Boolean} result
 */
function isExist(val) {
  return val != null;
}

/**
 *
 * @param {object} ctx global picgo object
 */
function createLog(ctx) {
  return (...args) => ctx.log.info(...args);
}

/**
 * @description: create a function to get the data
 * @param {Object} target
 * @return {(path: string) => any} selector
 */
function createSelector(target) {
  return (path) => {
    const keys = path.split('.');
    let temp = target,
      i = 0;

    try {
      for (; i < keys.length; i++) {
        temp = temp[keys[i]];
      }
    } catch (err) {
      return false;
    }

    return temp;
  };
}

/**
 * @description: charts base64 crypto object
 */
const base64 = {
  /**
   * @description: base64 decode, can only handle string type
   * @param {string} ciphertext
   * @return {string}
   */
  decode: (ciphertext) => {
    const buff = Buffer.from(ciphertext, 'base64');
    return buff.toString('utf-8');
  },
  /**
   * @description: base64 encode, can only handle string type
   * @param {string} cleartext
   * @return {string}
   */
  encode: (cleartext) => {
    const buff = Buffer.from(cleartext, 'utf-8');
    return buff.toString('base64');
  }
};

/**
 * @description: create a actuator code for the operation of the sandbox environment
 * @param {string} code
 * @return {string}
 * FIXME: 拼接用户脚本，用于在沙箱中运行，实现存在不足，待优化
 */
function createExecutor(code) {
  return (
    code +
    `
    try {
      return handle();
    } catch(err) {
      log(err);
    }
  `
  );
}

/**
 * @description: merge object
 * @param {array} args
 * @return {Object}
 */
function merge(...args) {
  return Object.assign({}, ...args);
}

/**
 * @description: parse json to object
 * @param {string} arg json string
 * @return {Object}
 */
function parse(arg) {
  if (!arg) return {};
  return JSON.parse(arg);
}

module.exports = {
  isExist,
  base64,
  createLog,
  createSelector,
  createExecutor,
  merge,
  parse
};
