/*
服务端：
    引入net核心模块
    创建net服务(本地服务)
    创建连接(客户端连接服务端),并实行监听(.on)
    存储用户信息
    监听用户发送数据
    监听用户离开
    监听错误信息
    广播功能
*/


//服务端
const net = require("net");//引入net核心模块
const chatServer = net.createServer();//创建net服务
const clientMap = {};//存储用户信息


let i = 0;//用户名
//创建连接
//stocket 里面所有的事件都是用on监测的
//client回调可以获取的用户的行为  connection连接事件
chatServer.on('connection',client=>{
    console.log("有人进来了");
    //给每一个用户起名
    client.name = ++i;
    //存储用户信息
    clientMap[client.name] = client;

    //获取用户发送来的数据
    client.on("data",data=>{
        console.log("用户发送的信息:" + data);
        //广播的功能(群聊)
        //参数1:用户发送的数据 参数2:用户的信息
        broadcast(data,client)
    })
    //获取用户离开
    client.on('close',_=>{
        //广播哪一个用户离开
        broadcast(data,client);
        //删除离开用户
        delete clientMap[client.name]
    }) 
    //获取错误信息
    client.on('error',err=>{
        console.log(err);
        //结束
        client.end();
    })

})

//给所有用户广播消息的方法
function broadcast(data,client){
    //循环所有的用户
    for(let key in clientMap){
        //用户发布了什么
        clientMap[key].write(client.name + '说' + data);
    }
}


//起服务
chatServer.listen(3000,_=>{
    console.log("server running at http://127.0.0.1:3000")
})