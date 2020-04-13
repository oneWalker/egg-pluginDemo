 //可以放在插件的lib下面
 class pluginName{
    constructor(app)
    {
        this.app = app;
        this.testData='plginName'
    }

    testSend(msg)
    {
        console.log(msg);
        return msg;
    }
}
module.exports=pluginName;