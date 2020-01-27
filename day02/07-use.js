//express 中间件(请求之前响应之后执行的方法)
/*
    作用:
        1.静态资源的代理
        2.路由的控制
        3.可以写路由

    __dirname  根目录名称 //f:\HTML5\H5-1920\第三阶段\day02
    __filename  文件名(完整的路径) //f:\HTML5\H5-1920\第三阶段\day02\07-use.js


    path.join('a','b','c') //a\b\c  相对路径
    path.resolve('a','b','c') //f:\HTML5\H5-1920\第三阶段\day02\a\b\c  绝对路径

*/ 

const express = require('express');
const path = require('path');


const app = express();
// const router = express.Router();//实现路由中间件
// console.log(router);
// console.log(path.join(__dirname,'public'));
// console.log(path.resolve(__dirname,'public'));

//static() 是express的唯一内置中间件 挂载静态资源(html 本地图片 css js)到服务器
//第一个参数:挂载文件的路径  在服务端执行
app.use(express.static(path.join(__dirname,'public')));


//express 路由
// router.get('/',(req,res)=>{
//     //响应的信息
//     res.send("/")  
// })
// router.get('/room',(req,res)=>{
//     //响应的信息
//     res.send("/rooms")  
// })
// router.get('/rooms',(req,res)=>{
//     res.send("/rooms")  
// })
// app.use('/home',router);



app.listen(4000,_=>{
    console.log(11111);
})