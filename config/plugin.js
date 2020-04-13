'use strict';
const path = require('path')
/** @type Egg.EggPlugin */
module.exports = {
    // had enabled by egg
    // static: {
    //   enable: true,
    // }
    validate: {
        enable: true,
        package: 'egg-validate',
    },
    mongoose: {
        enable: true,
        package: 'egg-mongoose',
    },
    cors: {
        enable: true,
        package: 'egg-cors',
    },
    redis: {
        enable: true,
        package: 'egg-redis',
    },
    routerPlus: {
        enable:true,
        package:'egg-router-plus'
    },  
};
