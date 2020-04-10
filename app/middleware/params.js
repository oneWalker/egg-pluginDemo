/**
 * get,post and restful get as the same interface;
 */
'use strict';
module.exports = () => {
    return async function params(ctx, next) {
      ctx.params = {
        ...ctx.param,
        ...ctx.query,
        ...ctx.request.body
      }
      await next();
    };
  };