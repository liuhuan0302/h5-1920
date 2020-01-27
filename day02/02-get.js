//express 是 node 一个框架  
/*
    在使用这个框架是要先安装模块 express
        npm init -y 初始化 
        npm i express -S 安装模块
*/   

//express 实现后端路由
const express = require('./express');

//express 是一个方法
const app = express();

//express 路由get 方法 用来收集信息(path,cb)
app.get('/',(req,res)=>{
    res.writeHead(200,{
        "content-type":"text/html;charset=utf-8"
    })
    res.end('大家好我是/')
    //res.send('<h1>哈哈哈</h1>');//send() 方法 是express 封装好的,包含了编码格式
})
app.get('/swk',(req,res)=>{
    res.writeHead(200,{
        "content-type":"text/html;charset=utf-8"
    })
    res.end('<h1>大家好我是悟空</h1>')
    //res.send('<h1>哈哈哈</h1>');//send() 方法 是express 封装好的,包含了编码格式
})
app.get('/zbj',(req,res)=>{
    res.writeHead(200,{
        "content-type":"text/html;charset=utf-8"
    })
    res.end('<h1>大家好我是猪八戒</h1>')
    //res.send('<h1>哈哈哈</h1>');//send() 方法 是express 封装好的,包含了编码格式
})

//起服务(省略了http.createServer() 封装在express 方法中了)
app.listen(3000,(require,response)=>{
    console.log('server runnig at http://127.0.0.1:3000')
})