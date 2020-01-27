/*
  koa 基于nodejs平台的下一代web框架
    1.洋葱圈模型
    2.async + await

安装:   npm init -y
        npm i koa -D

*/ 
const Koa = require("koa");
//const KoaLogger = require("./05-koa-logger")
const app = new Koa();
//console.log(app);//{ subdomainOffset: 2, proxy: false, env: 'development' }

function delay(data){
    return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve(data);
            },5000)
    })
}


//app.use(KoaLogger);//该模块放在所有中间件(use)的最上面(对所有中间件进行监测)


//use 是koa 的应用级中间件(执行的优先级高于其他的中间件)
//context 完整的上下文请求(包含封装好的request 和 responses) 
// 洋葱圈模型  先进后出(像洋葱一样,一层包一层)
app.use(async (ctx,next)=>{
    ctx.body = "1"
    //注:如果有异步代码会阻塞后续中间的执行,只执行这一个中间件
    // setTimeout(()=>{
    //     next();
    // })
  
    await next();//执行下一个中间件(如果没有next 则不会执行下面的中间件)
    ctx.body += "2"
})
app.use(async (ctx,next)=>{
    ctx.body += "3"
    await delay('aaaa');  
    await next();
    ctx.body += "4"
})
app.use(async (ctx,next)=>{
    ctx.body += "5"
    ctx.body += "6"
})
//开启服务
app.listen(3300,_=>{
    console.log("server running at http://localhost:3300")
})