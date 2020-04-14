'use strict';

module.exports = app => {
    const { router, controller } = app;

    // version
    //使用egg-router-plus优化后的写法
    const apiRouter = router.namespace('/v1/public/foo/');
    apiRouter.get('access',controller.foo.access);

    //原始写法仍然保留
    //router.get('/public/foo/plugin', controller.foo.pluginDemo);
};
