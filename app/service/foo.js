'use strict';

// app/service/user.js
const Service = require('egg').Service;

class FooService extends Service {
    //egg-moogose使用例子
    async IncrAndReturn(id) {
        await this.ctx.model.Foo.update({ id }, { $inc: { count: 1 } }, { upsert: true });
        return (await this.ctx.model.Foo.findOne({ id })).count;
    }

    /**
     * redis使用例子
     * await this.app.redis[command];
     */
    async redisDemo(){
        
        const str = await this.app.redis.get("redis");
        //redis事务-test
        await this.app.redis.multi().set('foo', 'bar').get('foo').exec(function (err, results) {
            // results === [[null, 'OK'], [null, 'bar']]
        })
        return str;
    }

    // egg-sequelize使用例子
    //因为model已经被moogse占用，使用sequelize自定义目录
    async sequelizeDemo()
    {
        let createUser = { name:"test",password:"test"};
        //create:
        await this.ctx.sqlModel.Foo.create(createUser);
        
        //update
        let upCondition = { id:1 }, upSet = {name:"test",password:"test"};
        await this.ctx.sqlModel.Foo.update( upSet , { where:upCondition });

        //delete
        let deCondition = {name:"test"}
        await this.ctx.sqlModel.Foo.destroy( { where:deCondition });

        //bulkCreateAndupdate,主键冲突时更新updateOnDuplicate
        let bulkArray = [
            { name: "test", password:"test" },
            { name: "test2", password:"test2"}
        ];
        await this.ctx.sqlModel.Foo.bulkCreate(bulkArray,{ updateOnDuplicate:["name","password"]})
        //select

        //transaction 事务
        //start
        let tran = await this.ctx.sqlModel.transaction();
        try {
            //start
            
            //start create transaction
            await this.ctx.sqlModel.Foo.create(createUser,{ transaction:tran});
            //start update transaction
            await this.ctx.sqlModel.Foo.update( upSet, { where:upCondition,transaction:tran });
            //start delete transaction
            await this.ctx.sqlModel.Foo.destroy( { where:deCondition, transaction:tran});
            await tran.commit();
        } catch (error) {
            await tran.rollback();
        }
    }

    async busDemo(){

    }

    async io(){
        
    }
     

}

module.exports = FooService;
