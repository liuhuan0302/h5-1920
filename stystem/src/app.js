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
    destination(req, file, cb) {
        //文件在服务端存储的位置
        cb(null, "public/uploads")
    },
    //文件名 不写默认拼接成随机字符串
    filename(req, file, cb) {
        //用户计算机上的文件名称
        cb(null, file.originalname)
    }
})

//图片上传的配置项(参数:配置类型 磁盘配置  参数:配置项)
const upload = multer({ storage: storage })

//接口(商品信息存储)
//upload.single("file") 使用单文件上传的方案
router.post("/files", upload.single("file"), async ctx => {
    //对请求的信息进行解构
    const { shopname, description, price } = ctx.req.body;
    //拼接图片的地址
    const img = "http://" + ctx.request.host + "/uploads/" + ctx.req.file.originalname;
    //判断如果插入的信息不全不能够插入
    if (shopname && description && price && ctx.req.file.originalname) {
        //数据库中插入图片的相关信息
        //注意集合名尽量使用和用户相关的名字,保证一个用户一个集合
        await db.insert(ctx.session.username, { shopname, description, price, img })
        //ctx.body = ctx.request.body;
    } else {
        //如果信息不全
        ctx.body = {
            success: 0,
            data: null,
            error: {
                message: "参数不对"
            }
        };
    }
})


//koa-session 的配置项
app.keys = ['some secret hurr']
const CONFIG = {
    key: 'koa:sess',
    maxAge: 5000000,//有效期
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
};
app.use(session(CONFIG, app));


//页面首页搭建
router.get("/", async ctx => {
    await ctx.render("index.ejs");
    //设置session 信息
    if (ctx.session.username) {
        ctx.redirect("/auto")
    }
})
router.get("/auto", async ctx => {
    let username = ctx.session.username;
    //渲染页面,并将数据传输到auto页面(更改用户名)
    await ctx.render("auto.ejs", {
        username
    })
    //判断是否是有具有session (注意如果没有session,页面会是始终在注册页面)
    if (!ctx.session.username) {
        //重定向 页面跳转
        //如果不存在则跳转到登录页面
        ctx.redirect("/")
    }
})
//查看商品详情的路由
router.get("/showShop", async ctx => {
    //判断是否登录成功
    if (ctx.session.username) {
        //如果有session值,则说明登录成功,去数据库中查找这个集合
        await ctx.render("showShop.ejs", {
            shopArr: await db.find(ctx.session.username)
        })
    } else {
        //如果没有则去登录
        ctx.redirect("/");
    }
})


//登录接口
router.post("/login", async ctx => {
    //设置响应头(json 格式的)
    ctx.set("content-type", "application/json;charset=utf-8")
    //对请求信息进行解构
    const { username, password } = ctx.request.body;
    //执行数据库查找的功能(参数:需要查询的集合名称;参数:前端请求的信息 )
    //必须用户名和密码都一致时才会返回信息
    const result = await db.find("users", { username });

    /*
        1.如果返回数据,且用户名正常,密码错误
        2.返回数据,用户名正确和密码都正确
        3.返回的数据为空,用户名都不正确
    
    */
    if (result.length && result[0].password !== password) {
        //如果返回的数据为0 ,则说明数据库中没有这一条信息
        //返回前端的信息
        ctx.body = JSON.stringify({
            success: 0,
            error: {
                message: "密码不正确"
            }
        })

    } else if (result.length && result[0].password === password) {
        ctx.body = JSON.stringify({
            success: 1,
            error: null
        })
        //如果登录成功,则设置一个session
        ctx.session.username = result[0].username;
    } else {
        ctx.body = JSON.stringify({
            success: 0,
            error: {
                message: "账号不存在"
            }
        })
    }

})
//注册接口
router.post('/register', async ctx => {
    ctx.set("content-type", "application/json;charset=utf-8");
    //对象解构 须保证前后接收对象相一致
    const { username, password } = ctx.request.body;
    //注册成功之后,清除cookies(防止注册之后,直接跳转,但是用户名没有改)
    ctx.session = null;
    //并设置session
    ctx.session.username = username;
    const result = await db.find("users", { username });
    //如果返回的结果有长度,则说明存在这一条数据,则返回账户重复
    if (result.length) {
        ctx.body = JSON.stringify({
            success: 0,
            error: {
                message: '账户名重复'
            }
        })
    } else {
        const insert = await db.insert("users", ctx.request.body);
        ctx.body = JSON.stringify({
            success: 1,
            error: null
        })
    }
})


//注入依赖模块
app.use(static(__dirname + "/public"))//注入静态资源
app.use(views("views"), { extension: "ejs" })//页面模板(第一个参数: 加载的文件 第二个参数:使用的模板)
app.use(parser());//解析post 请求
app.use(router.routes()).use(router.allowedMethods());//解析路由


//起服务
app.listen(8000, _ => {
    console.log("server running at http://127.0.0.1:8cls000");
})








