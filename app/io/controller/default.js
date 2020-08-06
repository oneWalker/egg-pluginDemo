'use strict';

const Controller = require('egg').Controller;
class FooController extends Controller {

  // socket.io.demo
  async ping() {
    const message = this.ctx.args[0];
    await this.ctx.socket.emit('res', `Hi! I've got your message: ${message}`);
  }
}

module.exports = FooController;

// or async functions

// exports.ping = async function() {
//     const message = this.args[0];
//     await this.socket.emit('res', `Hi! I've got your message: ${message}`);
// };
