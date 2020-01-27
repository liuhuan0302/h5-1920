//创建连接()
const ioSocket = io.connect("http://127.0.0.1:5000");


ioSocket.on("connect",_=>{
    ioSocket.send("大家好")
})

ioSocket.on("message",data=>{
    //
    document.querySelector("#chatroom").innerHTML += data + "</br>"
})

ioSocket.on("error",err=>{
    alert(err);
})

ioSocket.on("close",_=>{
    alert("close");
})

function say(){
    ioSocket.send(sendInput.value);
    sendInput.value = "";
}

document.onkeyup = function(e){
    if(e.keyCode == 13){
        say();
    }
}
sendBtn.onclick = function(){
    say()
}