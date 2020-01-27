//引入mongdb
const MongoClient = require('mongodb').MongoClient;
// console.log(MongoClient);MongoClient 是一个对象
// console.log(MongoClient.connect)
//连接mongo  三个参数(数据库地址,对象,回调)connect 相当于MongoClient对象中的一个方法,用于连接数据库
MongoClient.connect("mongodb://127.0.0.1:27017",{
    useNewUrlParser : true//解决兼容性
},(err,client)=>{
    if(err){
        throw new TypeError(err);
    }
    console.log(client);//client 是一个集合连接相关的信息
    //创建数据库
    // const a = client.db('a');
    //创建集合
    // const b = a.collection('b');
    //插入数据
    // b.insertMany([{
    //         name:"xiaohu",
    //         age:18
    //     },{
    //         name : "xiaoping",
    //         age:22
    //     },{
    //         name:"huahua",
    //         age:30
    //     }],(err,result)=>{
    //         if(err){
    //             throw new TypeError(err)
    //         }
    //         console.log("插入成功");
    //         client.close();
    //     })

    //更改数据库的数据
        b.updateOne({name:"huahua"},{$set : {
            name :"xiaoqiang"
            
        }})
    //删除数据库里面的数据
    b.deleteOne({age:37},(err,result)=>{
        if(err){
            throw new TypeError(err);
        }
        console.log("删除成功");
        //关闭数据库连接
        client.close();
    })

        //查看数据(查看多条数据)
        //toArray() 将数据转成数组格式
        b.find().toArray((err,result)=>{
            if(err){
                throw new TypeError(err);
            }
            // console.log(result);
            //关闭连接
            client.close();
        })

})