const Koa = require("koa");//koa
const Router = require("koa-router");//koa路由
const static = require("koa-static");//静态资源加载
const views = require("koa-views");//koa-页面模板
const parser = require("koa-bodyparser");//解析post请求

const session = require("koa-session");//服务器存储
const multer = require("koa-multer");//图片的上传
const db = require("./module/db");//引入数据库

//实例化对象
const app = new Koa();
const router = new Router(); 


//文件上传 磁盘存储配置项
const storage = multer.diskStorage({
    //文件存储位置(把文件放到当前服务端的某个位置上)
    destination(req,file,cb){
        //文件在服务端存储的位置
        cb(null,"public/uploads")
    },
    //文件名 不写默认拼接成随机字符串
    filename(req,file,cb){
        //用户计算机上的文件名称
        //arr = ["123","jpg"]  new Date() + '.' +  arr[1]
        //console.log(file.originalname.split("."))
        cb(null,file.originalname)
        
    }
})

//图片上传的配置项(参数:配置类型 磁盘配置  参数:配置项)
const upload = multer({storage : storage})


//接口(商品信息存储)
//upload.single("file") 使用单文件上传的方案
router.post("/files", upload.single("file") ,async ctx =>{

    console.log(ctx.req.file);//请求文件的信息
    //对请求的信息进行解构
    const{shopname,description,price} = ctx.req.body;
    //拼接图片的地址
    //console.log(file.originalname)
    const img= "http://" + ctx.request.host + "/uploads/" + ctx.req.file.originalname;
    console.log(img);
   
    //判断如果插入的信息不全不能够插入
    if(shopname && description && price && ctx.req.file.originalname){
    //数据库中插入图片的相关信息
    //注意集合名尽量使用和用户相关的名字,保证一个用户一个集合
    await db.insert(ctx.session.username,{shopname,description,price,img})
    //ctx.body = ctx.request.body;
    }else{
        //如果信息不全
        ctx.body = {
            success : 0,
            data : null,
            error : {
                message : "参数不对"
            }
        };
    }
    
     
})


//koa-session 的配置项
app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa:sess', 
  maxAge: 5000000,//有效期
  autoCommit: true,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));

//页面首页搭建
router.get("/",async ctx=>{
    await  ctx.render("index.ejs");
    //设置session 信息
    //console.log(ctx.session.header)
    if(ctx.session.username){
        ctx.redirect("/auto")
    }
})
router.get("/auto",async ctx=>{
    let username = ctx.session.username;
    //渲染页面,并将数据传输到auto页面(更改用户名)
    await ctx.render("auto.ejs",{
        username
    })
     //判断是否是有具有session (注意如果没有session,页面会是始终在注册页面)
     if(!ctx.session.username){
         //重定向 页面跳转
         //如果不存在则跳转到登录页面
        ctx.redirect("/")
     }
})
//查看商品详情的路由
router.get("/showShop",async ctx=>{
    // ctx.body = "/showShop"
    //const finshop = await db.find(ctx.session.username);
    //console.log(finshop);
    //判断是否登录成功
    if(ctx.session.username){
        //如果有session值,则说明登录成功,去数据库中查找这个集合
        await ctx.render("showShop.ejs",{
            shopArr : await db.find(ctx.session.username)
        })
        
    }else{
        //如果没有则去登录
        ctx.redirect("/");
    }
})




//登录接口
router.post("/login",async ctx=>{
    //请求的信息
    console.log(ctx.request.body);
    
    //设置响应头(json 格式的)
    ctx.set("content-type","application/json;charset=utf-8")
    //对请求信息进行解构
    const {username , password} = ctx.request.body;
    
    //console.log({username , password});
    //执行数据库查找的功能(参数:需要查询的集合名称;参数:前端请求的信息 )
    //必须用户名和密码都一致时才会返回信息
    const result = await db.find("users",{username});
    //console.log(username);
    //console.log(result[0].username === username)
    //console.log(result[0].password === password)
    // console.log("result:" + result);//返回值为空
    //console.log(result.length)

    /*
        1.如果返回数据,且用户名正常,密码错误
        2.返回数据,用户名正确和密码都正确
        3.返回的数据为空,用户名都不正确
    
    */ 
    if(result.length && result[0].password !== password){
        //如果返回的数据为0 ,则说明数据库中没有这一条信息
        //返回前端的信息
        ctx.body = JSON.stringify({
            success : 0,
            error : {
                //27081 用户名不存在
                //errCode : 27081,
                message : "密码不正确"
            }
        })

    }else if(result.length && result[0].password === password){
        ctx.body = JSON.stringify({
            success : 1,
            error : null
        })
        //如果登录成功,则设置一个session
        ctx.session.username = result[0].username;
    }else{
        ctx.body = JSON.stringify({
            success : 0,
            error : {
                message : "账号不存在"
            }
        })
    }

})

//注册接口
router.post('/register',async ctx=>{
    ctx.set("content-type","application/json;charset=utf-8");
    //对象解构 须保证前后接收对象相一致
    const {username,password} = ctx.request.body;
   
   //注册成功之后,清除cookies(防止注册之后,直接跳转,但是用户名没有改)
   ctx.session = null;
    //并设置session
    ctx.session.username = username;
  
    const result = await db.find("users",{ username });
    
   
    //console.log(result);//[ { _id: 5dbae78aa8b09e25d43653ba, username: '111', password: '111' } ]
    //如果返回的结果有长度,则说明存在这一条数据,则返回账户重复
    if(result.length){
        ctx.body = JSON.stringify({
            success : 0,
            error : {
                message : '账户名重复'
            }
        })
    }else{
        const insert = await db.insert("users",ctx.request.body);
        //console.log(insert)//
        /*
         [
        { username: 'ooo', password: 'ddd', _id: 5dbaef7bd1b12b3354d79730 }
    ],
    insertedCount: 1,
    insertedId: 5dbaef7bd1b12b3354d79730
}
        */
        ctx.body = JSON.stringify({
            success :1,
            error :null

        })
    }
})

//注入依赖模块
app.use(static(__dirname + "/public"))//注入静态资源
app.use(views("views"),{extension : "ejs"})//页面模板(第一个参数: 加载的文件 第二个参数:使用的模板)
app.use(parser());//解析post 请求
app.use(router.routes()).use(router.allowedMethods());//解析路由
 

//起服务
app.listen(8888,_=>{
    console.log("server running at http://127.0.0.1:8cls000");
})


//注意:在使用数据库时,要开启数据库  mongod和mongo


/*

//mongodb 中的数据是以数组的形式存储的
{ "_id" : ObjectId("5dbae71ec490f22550a9d22b"), "username" : "123", "password" : "111" }
{ "_id" : ObjectId("5dbae78aa8b09e25d43653ba"), "username" : "111", "password" : "111" }
{ "_id" : ObjectId("5dbae8113afd3c1168196850"), "username" : "aaa", "password" : "aaa" }
{ "_id" : ObjectId("5dbae87e78211c2a78219e1f"), "username" : "bbb", "password" : "bbb" }
*/



/*
  koa 中存储cookie
  ctx.cookies.get(name,[optins]):读取上下文请求中的cookie。
  ctx.cookies.set(name,value,[options])：在上下文中写入cookie

    ctx.Cookies.set() 三个参数: cookie名 cookies值 配置的参数(过期时间 maxAge  )
        ctx.cookies.set(
            'username','zyb',{
                domain:'localhost', // 写cookie所在的域名
                path:'/index',       // 写cookie所在的路径
                maxAge:1000*60*60*24,   // cookie有效时长
                expires:new Date('2019-2-12'), // cookie失效时间
                httpOnly:false,  // 是否只用于http请求中获取(是否禁止客户端调用)
                overwrite:false  // 是否允许重写
            }
        )
    ctx.Cookies.get()


koa-session 存储在服务器上,基于cookies实现的,一般通过cookie来交互

    session的理解

        session首先是一个抽象的概念，指代多个有关联的http请求所构成的一个会话。
        session常常用来指代为了实现一个会话，需要在客户端和服务端之间传输的信息。这些信息可以是会话所需的所有内容（包括用户身份、相关数据等），也可以只是一个id，让服务端可能从后台检索到相关数据，这也是实际系统中最常用的方式。

    session鉴权的时候，指的是这样一个流程

        用户登录的时候，服务端生成一个会话和一个id标识
        会话id在客户端和服务端之间通过cookie进行传输
        服务端通过会话id可以获取到会话相关的信息，然后对客户端的请求进行响应；如果找不到有效的会话，那么认为用户是未登陆状态
        会话会有过期时间，也可以通过一些操作（比如登出）来主动删除

    session的配置项
        app.keys = ['some secret hurr'];

        const CONFIG = {
        key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
        /** (number || 'session') maxAge in ms (default is 1 days) */
        /** 'session' will result in a cookie that expires when session/browser is closed */
        /** Warning: If a session cookie is stolen, this cookie will never expire */
        //maxAge: 86400000,
        /*overwrite: true, /** (boolean) can overwrite or not (default true) */
        /*httpOnly: true, /** (boolean) httpOnly or not (default true) */
        /*signed: true, /** (boolean) signed or not (default true) */
        /*rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
        /*renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
        /*};
        app.use(session(CONFIG, app));*/

       // maxAge,这个是确定cookie的有效期，默认是一天。
       //rolling: false,只要进入服务器就重新配置
       //renew: false 快过期了就重新配置





