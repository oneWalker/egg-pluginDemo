'use strict';

// app/service/user.js
const Service = require('egg').Service;

class FooService extends Service {
  // egg-moogose使用例子
  async IncrAndReturn(id) {
    await this.ctx.model.Foo.update({ id }, { $inc: { count: 1 } }, { upsert: true });
    return (await this.ctx.model.Foo.findOne({ id })).count;
  }

  /**
     * redis使用例子
     * await this.app.redis[command];
     */
  async getValue(key) {
    const str = await this.app.redis.get(key);
    return str;
  }

  async redisTran() {
    const redis = this.app.redis.multi();
    redis.set('key', 'value');
    redis.get('key');
    const res = redis.exec();
    return res;
  }


  // egg-sequelize使用例子
  // 因为model已经被moogse占用，使用sequelize自定义目录
  /**
     *
     * @param {object} user { name:"test",password:"test"};
     */
  async sequelizeDemo() {

    const createUser = { name: 'test', password: 'test' };
    // create:
    await this.ctx.sqlModel.Foo.create(createUser);

    // update
    const upCondition = { id: 1 },
      upSet = { name: 'test', password: 'test' };
    await this.ctx.sqlModel.Foo.update(upSet, { where: upCondition });

    // delete
    const deCondition = { name: 'test' };
    await this.ctx.sqlModel.Foo.destroy({ where: deCondition });

    // bulkCreateAndupdate,主键冲突时更新updateOnDuplicate
    const bulkArray = [
      { name: 'test', password: 'test' },
      { name: 'test2', password: 'test2' },
    ];
    await this.ctx.sqlModel.Foo.bulkCreate(bulkArray, { updateOnDuplicate: [ 'name', 'password' ] });
    // select
    const res = await this.ctx.sqlModel.Foo.findAll({ attributes: [ 'name', 'password' ], where: { id: 2 } });
    // transaction 事务
    // start
    const tran = await this.ctx.sqlModel.transaction();
    try {
      // start

      // start create transaction
      await this.ctx.sqlModel.Foo.create(createUser, { transaction: tran });
      // start update transaction
      await this.ctx.sqlModel.Foo.update(upSet, { where: upCondition, transaction: tran });
      // start delete transaction
      await this.ctx.sqlModel.Foo.destroy({ where: deCondition, transaction: tran });
      await tran.commit();
    } catch (error) {
      await tran.rollback();
    }
    return res;
  }


}

module.exports = FooService;
