const Koa = require("koa");
const error = require("./07-error");
const app = new Koa();


// function delay(data){
//     return new Promise((reslove,reject)=>{
//         setTimeout(()=>{
//             reslove(data);
//         },2000)
//     })
// }

//收集错误信息
app.use(error);//收集错误信息需要放在所有中间件最上面,可以监控到所有的中间件

//中间件1
app.use(async(cxt,next)=>{
    const d = await delay("你好 ");//先打印你好 在执行下面的中间件
    cxt.body = d;
    await next();
})
//中间件2
app.use(async(cxt,next)=>{
    cxt.body += "嘿嘿嘿";  //注:+= 否则会覆盖前面输出的内容  
})

//发布事件 
app.on("error",(err)=>{
    console.log("error:" + err.message);
    //throw new TypeError(err);//能够停止服务
    
})

//开启服务
app.listen(3000,_=>{
    console.log("server running at http://127.0.0.1:3000");
})