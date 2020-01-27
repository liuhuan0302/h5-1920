//解决post 请求问题
/*
koa-bodypatrser : 
    安装命令: npm i koa-bodyparser -S

*/ 

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

const koaBodyParser = require("koa-bodyparser");
const app = new Koa();
const router = new Router();



//配置模板引擎  模板引擎是编译成字符串 放在服务端渲染
//第一个参数:模板引擎存放的路径  第二个参数:使用的是哪种模板引擎

app.use(koaViews(__dirname + "/ejs"),{extension:"ejs"})
app.use(koaBodyParser())
// //第三方模块的引用都需要放在app.use()里面



router.get("/ts",async (cxt)=>{
    //render 渲染页面 参数:渲染的文件名
    await cxt.render("post.ejs")
})
//获取前端请求的信息
router.post('/user',(cxt)=>{
    cxt.body = cxt.request.body;
    //请求的信息
    console.log(cxt.request.body);//{ userName: '123', password: '123' }
})
    
//第三方模块在koa 中使用,必须要用app.use
//注册路由,让路由生效
app
    .use(router.routes())
    .use(router.allowedMethods());//根据当前状态进行编译(content-type)



app.listen(3000,()=>{
    console.log("server running at http://127.0.0.1:3000")
})