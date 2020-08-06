'use strict';

module.exports = options => {
  return async function(ctx, next) {
    ctx.socket.emit('test', 'test received');
    await next();
  };
};
