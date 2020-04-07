'use strict';

// app/service/user.js
const Service = require('egg').Service;

class FooService extends Service {
  async IncrAndReturn(id) {
    await this.ctx.model.Foo.update({ id }, { $inc: { count: 1 } }, { upsert: true });
    return (await this.ctx.model.Foo.findOne({ id })).count;
  }
}

module.exports = FooService;
