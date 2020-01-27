//websocket 是基于web的即时通讯
//需要安装ws模块 npm i ws -S
////websocketserver 的服务
const WebSocketServer = require("ws").Server;
//创建服务
const wss = new WebSocketServer({port : 5555});
//存储用户信息
const clientMap = {};

var i = 0;
//创建连接(客户端的连接)))
//ws 是客户端信息(用户信息)
wss.on("connection",ws=>{
    console.log(i + '上线了');
    ws.name = ++i;
    clientMap[ws.name] = ws;

    //获取客户端发送的数据
    ws.on("message",data=>{
        console.log('客户端发送的是:' + data);
        //广播方法
        broadcast(data,ws);
    });
    //用户离开了
    ws.on("close",_=>{
        //删除离开用户
        delete clientMap[ws.name];
        console.log(ws.name + '下线啦')
    })
    //监测错误
    ws.on('error',err=>{
        console.log(err);
    })
})

//给每一个用户的广播方法
function broadcast(data,ws){
    for(let key in clientMap){
        clientMap[key].send(ws.name + "说" + data)
    }
}


/*

WebSocket握手协议
webstocket是html5的一种新的协议，它实现了浏览器与服务器的双向通道，使得数据可以快速的双向传播
通过一次简单的握手，建立了客户端和服务器的联系后，服务器可以主动推送信息给客户端，而不需要客户端的反复请求

一个websocket连接是客户端与服务器端在http协议的初始握手阶段将其升级到websocket协议来建立的。其底层还是tcp/ip连接

优点：
1.客户端和服务器端之间数据交流的表头比较小。大概2个字节
2.服务器和客户端可以主动的发送数据给对方
3.不需要有频率的创建TCP请求和销毁，节约宽带和服务器的资源


WebSocket是HTML5中出出现的新技术，有着web TCP之称，这也是为了适应现在实时传输数据的趋势，在这之前一般采用两种方法进行实时数据交换。

　　轮询机制，其中又包括长轮询。

①短轮询是指间隔一定的时间进行一次数据请求，这个是最原始的，也是最消耗性能的，

②长轮询是在轮询基础上的改进，简而言之就是前端每请求一次成功之后在回调里面立即发起新的请求，服务端是如果没有数据改变就会挂起来直到有数据变化或者超过设置的期限，就会关闭本次连接，前端从而发起新的请求，这个最关键的就是没有数据返回时会挂起其实就是服务端判断循环中，长轮询的好处就是尽可能的减少发起请求次数，但仍然具有服务器hold连接会消耗资源，返回数据顺序无保证，难于管理维护，实质也是不断请求。


特点:
事件驱动
异步
使用ws或者wss协议的客户端socket

能够实现真正意义上的推送功能

缺点：少部分浏览器不支持（IE），浏览器支持的程度与方式有区别。

websocket的url开头是ws，如果需要ssl加密可以使用wss，当我们调用websocket的构造方法构建一个websocket对象（new WebSocket(url)）的之后，就可以进行即时通信了。

 

WebSocket拥有两个方法：

1、send() 向远程服务器发送数据
2、close() 关闭该websocket链接

还有几个监听函数

1、onopen 当网络连接建立时触发该事件
2、onerror 当网络发生错误时触发该事件
3、onclose 当websocket被关闭时触发该事件
4、onmessage 当websocket接收到服务器发来的消息的时触发的事件，也是通信中最重要的一个监听事件。msg.data

当然它和ajax一样也是有状态值的

1、CONNECTING(0) websocket正尝试与服务器建立连接
2、OPEN(1) websocket与服务器已经建立连接
3、CLOSING(2) websocket正在关闭与服务器的连接
4、CLOSED(3) websocket已经关闭了与服务器的连接


*/