//express 中间件(请求之前响应之后执行的方法)
/*
    作用:
        1.静态资源的代理
        2.路由的控制
        3.可以写路由
*/ 

const express = require('express');

const app = express();

//请求之前,响应之后 特点:可以拿到完整的require 和 responese
//第一个参数:path(不写,默认是根) 第二个参数:function(req,res,next)  可以是自定义函数  也可以是内置方法
app.use((req,res,next)=>{
    if(req.url ==='/'){
        res.end('hhhhh');
    }else{
        next();//会寻找下一个中间件
    }
})

app.use((req,res,next)=>{
    if(req.url ==='/zbj'){
        res.end('/zbj');
    }else{
        next();
    }
})

//next  如果有多个中间件,需要next 执行下面的中间件(如果不调用next方法,则会造成页面假死(卡在上一个中间件)))
app.use((req,res,next)=>{
    if(req.url ==='/wrm'){
        res.end('404 NOT FOUND');
    }
   
})


//express 路由
app.get('/',(req,res)=>{
    res.send()  

})
app.listen(3000,_=>{
    console.log(11111);
})