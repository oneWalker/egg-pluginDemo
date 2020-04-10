'use strict';

module.exports = (options, app) => {
    return async function (ctx, next) {
        const token = ctx.request.header.token;
        //远程调用相关，以redis为例
        const redisStr = await app.redis.get(token);
        if (!redisStr) {
            // token expired
            ctx.type = 'json';
            ctx.status = 401;
            ctx.body = {
                code: 401,
                data: token,
                msg: 'jwt验证失败',
            };
        } else {
            //以redis为例，延长token有效期
            await app.redis.expire(token, 24 * 3600);
            await next();
        }
    };
};
