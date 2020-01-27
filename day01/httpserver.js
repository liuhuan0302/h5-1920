const http = require('http');

const server = http.createServer((req,res)=>{
    // res.statusCode = 200;
    // res.setHeader("content-type","text/plain;charset=utf-8");
    res.writeHead(200,{"content-type":"text/html;charset=utf-8"})
    res.write(req.url);
    if(req.url === "/"){
        res.writeHead(200,{
            "content-type":"text/html;charset=utf-8"  
        })
        res.end("你好你好");
    }else if(req.url === '/zhubajie'){
        res.writeHead(200,{
            "content-type":"text/html;charset=utf-8"  
        })
        res.end("<h1>猪八戒</h1>");
    }else if(req.url === '/suiwukong'){
        res.writeHead(200,{
            "content-type":"application/json;charset=utf-8"  
        })
        res.end("{json:1}");
    }
    res.end();
   
})

server.listen(8080);
console.log('server running at http://127.0.0.1:8080')






//实时监听 npm i nodemon -g