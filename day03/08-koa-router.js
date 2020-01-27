/*
koa-router  路由
    安装命令: npm i koa-router -S


*/ 
const Koa = require("koa");
const Router = require("Koa-router");
const koaViews = require("koa-views"); 
const app = new Koa();
const router = new Router();


//路由
router.get("/",(cxt)=>{
    cxt.body = "我是根路径"
})
router.get("/zbj",(cxt)=>{
    console.log(cxt.query);//[Object: null prototype] { a: '1', b: '2' } 接收前端请求地址的参数
    console.log(cxt.url);///zbj?a=1&b=2
    console.log(cxt.querystring);//a=1&b=2 querystring 可以将字符串解析成json对象
    cxt.body = "我是你二哥"
})
//动态路由 ,路由地址不知的,可以自动解析前端请求的地址
//优点:不需要配置多个路由
router.get("/zbj/:hhhh",(cxt)=>{
    console.log(cxt.url);///zbj/1234
    console.log(cxt.params);//{ hhhh: '1234' }
   
    if(cxt.request.url === "/zbj/aaaa"){
        cxt.body = "AAAAA"
    }else if(cxt.request.url === "/zbj/bbbb"){
        cxt.body = "BBBBB"
    }
})


//配置模板引擎
//第一个参数:模板引擎存放的路径  第二个参数:使用的是哪种模板引擎
app.use(koaViews(__dirname + "ejs"),{extension:"ejs"})



//设置没有找到路由,则返回404
//这个中间件层级要比其他的路由中间件要高
// 执行顺序: 先执行这个中间件, 在执行下面的路由中间件  最后会返回到这个中间进行判断是不是404
app.use(async (cxt,next)=>{
    await next()
    if(cxt.status == 404){
        cxt.body = "404 NOT FOUND"
    }
    
})
//第三方模块在koa 中使用,必须要用app.use
//注册路由,让路由生效
app
    .use(router.routes())
    .use(router.allowedMethods());//根据当前状态进行编译(content-type)



app.listen(3000,()=>{
    console.log("server running at http://127.0.0.1:3000")
})