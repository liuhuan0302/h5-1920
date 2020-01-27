//websocket 是基于ws 协议
const ws = new WebSocket("ws://127.0.0.1:5555");

//创建连接(只要连接,就会发送大家好)
ws.onopen = function(){
    ws.send("大家好");
}
//获取用户发送的信息
ws.onmessage = function(event){
    console.log('客户端发送的信息:' + event);
    document.querySelector("#chatroom").innerHTML += event.data + '</br>';
}
//服务端关闭会触发
ws.onclose = function(){
    alert ("服务端关闭");
}

//监测错误
ws.onerror = function(err){
    alert(err);
}

//
function say(){
    //发送input框里面的信息
    ws.send(sendInput.value);
    //清空信息
    sendInput.value = "";
}
//键盘事件
document.onkeyup = function(e){
    if(e.keyCode == 13){
        say();
    }
}
sendBtn.onclick = function(){
    say();
}