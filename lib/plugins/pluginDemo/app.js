const pluginDemo= require('./lib/pluginDemo')

module.exports = app => {
    app.testData = 'hello';
    app.pluginDemo = new pluginDemo(app);
};