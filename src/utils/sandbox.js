const { Safeify } = require('safeify');

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
     * @returns {any} return value depends on the execution result of the code that passes the code
     */
    run: (code) => {
      return safeify.run(code, context);
    },
    /**
     * destroy sandbox example
     */
    destory: () => {
      if (!safeify) throw Error('the sandbox has been destroyed, please create again')
      safeify.destory();
      safeify = null;
    }
  }
};
