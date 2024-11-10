'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/home.index.test.js', () => {
  it('should assert', () => {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should GET /', async () => {
    const randomId = Math.round(Math.random() * 100);

    const result = await app.httpRequest()
      .get(`/?id=${randomId}`)
      .expect(200);

    const prevCount = result.body.count;

    return await app.httpRequest()
      .get(`/?id=${randomId}`)
      .expect(200, {
        env: app.config.env,
        id: randomId + '',
        count: prevCount + 1,
      });
  });
});
