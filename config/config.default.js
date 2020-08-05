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

  //定义sequelize的配置文件
  config.sequelize = {
    dialect:'mysql',//支持多个sql类的
    database:"how2java",
    host:"localhost",
    port:3306,
    username:"root",
    password:'root',
    delegate:'sqlModel',//定义挂载到框架上为app.sqlModel
    baseDir:'sqlModel',//定义model文件目录 app/`${sqlModel}`
    define:{ //定义表时的相关的设置，也可在表中单独定义 
      //timestamps:false,  //是否支持自动生产created_at，updated_at.,deleted_at,自动生成的时间为标准时间
      underscored: true, //是否支持驼峰转为表的下划线
      freezeTableName:true, //不自动将表名转换为复数形式
      //paranoid:false, //删除是否自动插入时间
    }
  }

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

  config.io = {
    init: {},
    namespace: {
        '/': {
            connectionMiddleware: [],
            packetMiddleware: []
        }
    },
    redis: {
        host: "127.0.0.1", //redis host
        port: 6379,
        auth_pass: null,
        db: 2
    },
};

config.bus = {
  debug: true,
  concurrency: 1,             //Bull队列处理的并发数
  listener: {
      ignore: null,           //忽略目录中的文件
      baseDir: 'listener',
      options: {              //Bull Job 配置
          attempts: 5,
          backoff: {
              delay: 3000,
              type: 'fixed'
          }
      }
  },
  job: {
      ignore: null,           //忽略目录中的文件
      baseDir: 'job',
      options: {              //Bull Job 配置
          attempts: 5,
          backoff: {
              delay: 3000,
              type: 'fixed'
          }
      }
  },
  bull: {
      redis: {
          host: 'localhost', //redis的host
          port: 6379,
          db: 0
      }
  },
  queue: {
      default: 'default',     //默认队列名称
      prefix: 'bus'           //队列前缀
  },
  queues: {}
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
  
  //全局挂载自定义目录
  config.customLoader = {
    // 定义在 app 上的属性名 app.utility
    utility: {
      // 相对于 app.config.baseDir
      directory: 'app/utility',
      // 如果是 ctx 则使用 loadToContext
      inject: 'app',
      // 是否加载框架和插件的目录
      loadunit: false,
      // 还可以定义其他 LoaderOptions
    }
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
