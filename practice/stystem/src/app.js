const Koa = require("koa");//koa
const Router = require("koa-router");//koa路由
const static = require("koa-static");//静态资源加载
const views = require("koa-views");//koa-页面模板
const parser = require("koa-bodyparser");//解析post请求
const session = require("koa-session");//服务器存储
const multer = require("koa-multer");//图片的上传
//const db = require("./module/db");//引入数据库

//实例化对象
const app = new Koa();
const router = new Router();


//页面构建
router.get("/",async ctx=>{
    await ctx.render("login.ejs")
})
router.get("/register",async ctx=>{
    await ctx.render("register.ejs")
})
router.get("/index",async ctx=>{
    await ctx.render("index.ejs")
})



//接口
// app.post("/login",ctx=>{
    
// })



//注入依赖模块
app.use(static(__dirname + "/public"))//注入静态资源
app.use(views("views"), { extension: "ejs" })//页面模板(第一个参数: 加载的文件 第二个参数:使用的模板)
app.use(parser());//解析post 请求
app.use(router.routes()).use(router.allowedMethods());//解析路由


//起服务
app.listen(3000, _ => {
    console.log("server running at http://127.0.0.1:3000");
})
