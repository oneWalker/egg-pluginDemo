'use strict';

module.exports = () => {
  return async function(ctx, next) {

    ctx.socket.emit('test', 'test received');
    await next();
  };
};
