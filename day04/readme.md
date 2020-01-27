##### 项目搭建流程
+ 入口文件 app.js 
+ 业务区分
    + 登录注册功能
    + 图片 价格 菜名上传
    + 展示上传商品 
+ 模块分层
    + modules 业务模块
    + public 静态资源
    + views js模板
+ 项目搭建
    - 入口文件
    - 项目依赖
        + koa   
        + koa-router 路由
        + koa-views koa-页面
        + koa-static  静态资源加载
        + koa-bodyparser 解析post请求
        + mongodb 数据库
        + ejs ejs模板引擎

注: 先要初始化文件 npm init -y
    下载依赖: npm i koa koa-router koa-static koa-views koa-bodyparser mongodb ejs -S


注:
    + 服务端渲染,多用于首屏 速度快,但加重服务器负担 ejs
    + 客户端渲染,会造成首屏加载速度慢

    如果pakeage.json 中有曾经安装的模块,再次安装只需要npm i 

+ 开发流程
    + mrd(初稿)
    + prd(开发文档 || 需求文档)
    + 详细设计
        - 接口设计
            - json格式
            - success 成功与否
            - error
        - 流程设置
+ mvc分层 module(数据) views(视图层) control (控制)










//图片上传的配置
//磁盘存储
var storage = multer.diskStorage({
    //设置存储路径
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  //设置文件存储名称
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

//图片上传的配置项
var upload = multer({ storage: storage })

//文件上传(文件单一类型的上传)
var uploads = multer().single('files')
注意: Multer 不会为你添加任何扩展名，你的程序应该返回一个完整的文件名

destination 是用来确定上传的文件应该存储在哪个文件夹中。也可以提供一个 string (例如 '/tmp/uploads')。如果没有设置 destination，则使用操作系统默认的临时文件夹。

filename 用于确定文件夹中的文件名的确定。 如果没有设置 filename，每个文件将设置为一个随机文件名，并且是没有扩展名的。

磁盘存储引擎 (DiskStorage)
磁盘存储引擎可以让你控制文件的存储。