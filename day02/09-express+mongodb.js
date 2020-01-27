//模拟后端接口

const express = require('express');
const app = express();
//连接mongodb
const MongoClient = require("mongodb").MongoClient 


//中间件 静态资源挂载到服务端
app.use(express.static(__dirname));
console.log(__dirname);
//收集信息(路由)
app.get("/name",(req,res)=>{

    //连接mongodb
    MongoClient.connect("mongodb://127.0.0.1:27017",{
        useNewUrlParser:true
    },(err,client)=>{//client 形参
        if(err){
            throw new TypeError(err);
        }
        //创建数据库
        const a = client.db("a");
        //创建集合
        const b = a.collection('b');
        //查找数据
        b.find().toArray((err,result)=>{
            //JSON.stringify() 将json 转成字符串
            console.log(result);
            res.end(JSON.stringify(result));
            client.close();
        })
    })
  

})

//起服务
app.listen(3000,(req,res)=>{
    console.log("running at http:127.0.0.1:3000")
})