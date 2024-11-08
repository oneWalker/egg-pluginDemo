/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1585626894600_7869';

  // add your middleware config here
  config.middleware = [];

  config.mongoose = {
    client: {
      url: 'mongodb://huaxi:541R4evB@mongodb:27017/huaxi',
    },
  };

  //add the redis setting to the world
  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: 'redis',   // Redis host
      password: null,
      db: 1,
    },
  };
  
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  /**
   * 自定义错误码
   * error code define files
   */
  config.code = require('./errorcode');

  return {
    ...config,
    ...userConfig,
  };
};
