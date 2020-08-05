'use strict';
/** @type Egg.EggPlugin */
module.exports = app => {
    // the use of your model
    const { INTEGER,BIGINT,DATE, STRING } = app.Sequelize;

    const Foo = app.sqlModel.define('foos',{
        id:{
            type:INTEGER, 
            primaryKey:true, 
            autoIncrement:true
        },
        username:{
            type:STRING(30),
        },
        password:{
            type:STRING(100),
        },
    },{
        //给模型添加hook进行自动执行
        hooks:{
            beforeValidate:(Foo)=>
            {
                Foo.time = Date.now();
            }
        }
    }
    );
    
    
    Foo.associate = function(){
        //定义1对1，一对多，多对一的联表
    }
    return Foo;
 };