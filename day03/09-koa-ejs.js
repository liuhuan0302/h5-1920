/*
koa-router  路由
    安装命令: npm i koa-router -S
koa-static  静态资源的部署
    安装命令: npm i koa-static -S
<%=EJS%> 高效的javaScript 模板引擎  字符串 可以实现在服务端渲染页面
    安装命令:npm i koa-views -S  koa 的视图
            npm i ejs -S
模板引擎是服务端 将HTML 以字符串的形式进行解析的

*/ 
const Koa = require("koa");
const Router = require("Koa-router");
const koaViews = require("koa-views"); 
const koaStatic = require("koa-static");
const app = new Koa();
const router = new Router();



//配置模板引擎  模板引擎是编译成字符串 放在服务端渲染
//第一个参数:模板引擎存放的路径  第二个参数:使用的是哪种模板引擎

app.use(koaViews(__dirname + "/ejs"),{extension:"ejs"})
//第三方模块的引用都需要放在app.use()里面
//静态资源部署
app.use(koaStatic(__dirname +"/public"));//注:public 为根路径,所以引路径的时候不用 加public
console.log(__dirname + "ejs");
router.get("/",async (cxt)=>{
    await cxt.render("index.ejs",{
        //出入到ejs 文件中的参数 用来渲染页面
        //zhu : = 解析数据
        name : "马冬梅",
        html : "<h2>马冬梅</h2>",
        num : 21,
        obj : [{a:1,b:2},{a:3,b:4},{a:5,b:6}]
    });//render方法时koa-views引入的
})


//第三方模块在koa 中使用,必须要用app.use
//注册路由,让路由生效
app
    .use(router.routes())
    .use(router.allowedMethods());//根据当前状态进行编译(content-type)



app.listen(3000,()=>{
    console.log("server running at http://127.0.0.1:3000")
})