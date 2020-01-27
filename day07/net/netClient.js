//在使用聊天功能时,要开启服务
//客户端
const net = require('net');//引入net核心模块
//这是client(客户端)连接socket的方式
const client = new net.Socket();
//设置发送信息的编码格式 
client.setEncoding = "utf-8";

//连接服务端(参数1:端口号 参数2:域名 参数3:callback)只要用户进入聊天室,就会发送信息
client.connect(3000,"127.0.0.1",_=>{
    client.write("大家好")
})

//获取服务端发送的数据
client.on("data",data=>{
    console.log('服务端发送:' + data);
    say();//发送数据
})

//错误信息
client.on("error",err=>{
    console.log("err" + err);
})
//服务端关闭了
client.once("end",_=>{
    console.log('end');
})


//readline => 标准输入输出
const readline = require("readline");
//创建接口
const r1 = readline.createInterface({
    input:process.stdin,//输入
    onput:process.stdout//输出
})
function say(){
    //inputStr 输入的内容
    r1.question("请输入:",inputStr=>{
        if(inputStr !="bye"){
            client.write(inputStr + "\n")
        }else{
            //关闭客户端
            client.distory();
            //关闭标准输入输出
            r1.close();
        }
    })
}
