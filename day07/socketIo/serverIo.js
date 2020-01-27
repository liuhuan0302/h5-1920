const Koa = require('koa');
const Router = require("koa-router");

//实例化对象
const app = new Koa();
const router = new Router();

//创建服务
const server = require("http").Server(app.callback());
//将server与socketIo 进行关联
const io = require("socket.io")(server);
const fs = require("fs");


const clientMap = {};
let i = 0;
//开启路由中间件
app.use(router.routes()).use(router.allowedMethods());

//路由
router.get("/",ctx=>{
    function callback(data){ 
        //将获取的数据转成字符串并发送到页面
        ctx.body = data.toString();
    }
    //读取本的文件
    fs.readFile("./index.html",(err,files)=>{
        if(err){
            console.log(err);
            callback("文件未找到") 
        }else{
            //没有错,将文件发送的页面上进行渲染
            callback(files);
        }
    })
   
})

//创建连接
io.on("connection",client=>{
    console.log("有人进来了")
    client.name = ++i;
    clientMap[client.name] = client;

    //客户端传递的信息
    client.on("message",data=>{
        console.log('客户端传递过来的数据' + data);
        broadcast(data,client);
    })
    client.on("disconnect",()=>{
        console.log("disconnect")
    })
})

//广播的方法
function broadcast(data,client){
    for(let key in clientMap){
        clientMap[key].send(client.name + "说:" + data);
    }
}

server.listen(5000);


