/*
  koa 基于nodejs平台的下一代web框架
    1.洋葱圈模型
    2.async + await

安装:   npm init -y
        npm i koa -D

*/ 
const Koa = require("koa");

const app = new Koa();
//console.log(app);//{ subdomainOffset: 2, proxy: false, env: 'development' }


//use 是koa 的应用级中间件(执行的优先级高于其他的中间件)(用于解析 调试)
//context 完整的上下文请求(包含封装好的request 和 responses) 
app.use((ctx,next)=>{
    //console.log(ctx.request);//会打印请求的url method header
    //console.log(ctx.response)
    /*
    响应的信息
    {
        status: 404,
        message: 'Not Found',
        header: [Object: null prototype] {},
        body: undefined
        }
    */ 
   //console.log(ctx.request.header);
   //ctx.body  相当于 res.end
   ctx.type = "text/plain"
   ctx.body = "<h1>哈啊哈哈</h1>"
   ctx.body += "111111"
})
//开启服务
app.listen(3000,_=>{
    console.log("server running at http://localhost:3000")
})