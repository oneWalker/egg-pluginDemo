'use strict';

module.exports = {
    validate(options) {
        const { body, query, params } = options;
        if (body) {
            this.ctx.validate(body);
        }
        if (query) {
            this.ctx.validate(query, this.ctx.query);
        }
        if (params) {
            this.ctx.validate(params, this.ctx.params);
        }
    },
};
