'use strict';

const Controller = require('egg').Controller;

// 定义controller所使用的参数校验规则
// helper里将ctx.validate方法调用封装了一下
// 新的 helper.validate方法接受的参数有3个选项:
// query, body, params 如果存在, 将对对应入参进行校验
// 这3个选项内具体配置方法参见 parameter 插件: https://github.com/node-modules/parameter
const Rules = {
    indexRule: {
        query: {
            id: 'id',
        },
    },
};

class FooController extends Controller {
    async access() {
        const { ctx, logger } = this;
        ctx.helper.validate(Rules.indexRule);
        const count = await ctx.service.foo.IncrAndReturn(ctx.query.id);
        const info = `this is on ${this.app.config.env} environment, request id: ${ctx.query.id}, count: ${count}`;
        logger.info(info);
        ctx.body = {
            env: this.app.config.env,
            id: ctx.query.id,
            count
        }
    };   
}

module.exports = FooController;
