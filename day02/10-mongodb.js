//async 本质是异步的,用它来解决同步的操作
//async 必须跟着一个函数 async function fn()
//await 等待异步函数操作完成在执行

(async()=>{
    const{MongoClient : MongoDB} = require('mongodb');//对对象的结构(相当于把对象中的对象赋值给一个变量){obj2 : sex} = obj  =>  sex = obj.obj2.sex
    //console.log( MongoDB)

    //实例化了一个对象
    const client = new MongoDB(
        "mongodb://127.0.0.1:27017",
       {
           useNewUrlParser:true,
       }
    )
    let result;
    //创建连接
     result = await client.connect();//回调是一个异步的
     //连接数据库
     const a = client.db('a');
     const b = a.collection('b');

     //增
     result = await b.insertMany([{name:"heihei",age: 18},{name: "hahaha",age:20,}])
    //  console.log(result);
    //查找:
    result = await b.find();
    // console.log(result.toArray((err,doc)=>{
    //     console.log(doc);
    // }));
    //改
    result = await b.updateMany({age:18},{$set:{age:30,sex:"nan"}})
    //删
    result = await b.deleteMany();
    console.log(result);
    result = await b.find();
    console.log(result.toArray((err,doc)=>{
        console.log(doc);
    }));
    client.close();
    
})()