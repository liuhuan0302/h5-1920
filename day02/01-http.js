const http = require('http');

const server = http.createServer((req,res)=>{
    //设置编码格式
   
    if(req.url === '/' && req.method.toLocaleLowerCase('get')){
        res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
        res.end('大家好我是/')
    }else if(req.url === '/zbj'){
        res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
        res.end('大家好我是猪八戒')
    }else if(req.url === '/swk'){
        res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
        res.end('大家好我是悟空')
    }
})


//把每一个路由转化成一个方法http.get
http.get('/',(res,req)=>{
    res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
    res.end('大家好我是/')
})
http.get('/',(res,req)=>{
    res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
        res.end('大家好我是猪八戒')
})
http.get('/',(res,req)=>{
    res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
    res.end('大家好我是悟空')
})
//设置端口,并执行
server.listen(8080,_=>{
    console.log('server running at http://127.0.0.1:8080')
})