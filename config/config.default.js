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
  config.middleware = [ 'report','params','jwt'];
  //jwt's middleware config seeting
  config.jwt = {
    enable: true,
    secret: "eggjs", //自己设置的值
    ignore:[`/public`]
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/test',
      options: {
        autoIndex: false,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
        poolSize: 10,
        bufferMaxEntries: 0,
      },
    },
  };

  //add the redis setting to the world
  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: "127.0.0.1",   // Redis host
      password: null,
      db: 1,
    },
  };

  //default security setting
  config.security= {
    csrf: {
      enable: false,
      //ignoreJson:true
    },
    //domainWhiteList: [ 'http://192.168.102.180:8000' ]
  };

  //allow Cors
  config.cors = {
    //origin:'http://192.168.102.180:8000',
    origin:()=>'*',
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
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
