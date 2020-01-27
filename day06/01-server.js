const Koa = require("./02-minKoa");

//实例化
const app = new Koa();


function delay(data){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(data);
        })
    })
}
//中间件(调用koa 中的use方法)
app.use(async (ctx,next)=>{
   ctx.body = '1';
   await next();
   ctx.body += '2';
})
app.use(async (ctx,next)=>{
    ctx.body += '3';
    await delay('aaa');
    await next();
    ctx.body += '4';
 })
 app.use(async (ctx,next)=>{
    ctx.body += '5'; 
 })


//起服务(调用koa 的listen 方法)
app.listen(3300,_=>{
    console.log("server running at http://127.0.0.1:3300 ");
})