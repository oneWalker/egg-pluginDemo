'use strict';

module.exports = app => {
    app.router.get('/v1/public/foo/access', app.controller.home.index);
};
