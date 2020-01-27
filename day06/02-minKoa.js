const http = require("http");

//自定义request
const request = {
    //对原生的url 进行监听
    get url(){
        //this.req 原生node 中的req.url(请求的路径)
        return this.req.url;
    }
}
//自定义response
const response = {
    //对网页中的内容进行监听
    get body(){
        //console.log("_body:"+this._body)//_body == body
        return this._body;
      
    },
    //对网页中的内容进行修改
    set body(val){
        this._body = val;
    }
}
//设置上下文request response => ctx
const context = {
    get url(){

        //返回原生的请求路径
        return this.request.url;
       
    },
    get body(){
        //返回原生中的body(响应的内容)
        return this.response.body;
    },
    set body(val){
      
        //对响应的内容进行修改
        this.response.body = val;
    }
}
class Application{
    constructor(){
        //将外部的context 赋值给this.context
        this.context = context;
        this.request = request;
        this.response = response;
        //所有回调函数集合
        this.middlewares = [];

    }
    //中间件(use 中间件的参与是一个回调,回调参数是ctx)
    use(callback){
        if((typeof callback).toLocaleLowerCase() !== 'function'){
            throw new TypeError("must be function ok?")
        }
        //只要有回调函就push到数组里面
        this.middlewares.push(callback);

    }
    //洋葱圈模型(参数:回调的集合)
    compose(middlewares){
        return function(ctx){
            return dispatch(0);
            function dispatch(i){
                //fn回调函数=callback
                let fn = middlewares[i];
                //判断fn 是否存在
                if(!fn){
                    return Promise.resolve();
                }
                //fn 即为中间件
                return Promise.resolve(fn(ctx,function next(){
                     return dispatch(i+1);
                }))
            }
        }
    }
    //服务
    listen(){
        //开启服务
        http.createServer(async (req,res)=>{
            //将createCtx中的ctx 赋值给ctx
           let ctx = this.createCtx(req,res);
            //this.callback(ctx);
            let fn = this.compose(this.middlewares);
            await fn(ctx);
            ctx.res.writeHead(200,{"content-type":"text/html;charset=utf-8"})
            //将获取的body 进行返回
            //将响应到的内容发送到页面
            ctx.res.end(ctx.body);
        }).listen(...arguments)

    }
     //关联原生的req，res到我们自定义的requset和response上
    createCtx(req,res){
        //创建新的ctx (将外部的context 赋值到ctx)
        let ctx = Object.create(this.context);
        ctx.request = Object.create(this.request);
       
        ctx.response = Object.create(this.response);
        //将原生的req 赋值给外部的request
        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx;
    }
}

//暴露接口
module.exports = Application;

/*
1.将this.context 赋值给ctx
let ctx = Object.create(this.context);

2.将this.request(自定义的request) 赋值给ctx.request(也就是context的request)
ctx.request = Object.create(this.request);
ctx.response = Object.create(this.response);

3.将请求的req(原生的req) 给到了ctx.request(也就是request 中的req),同时对将其赋值get ctx.req
ctx.req = ctx.request.req = req;
ctx.res = ctx.response.res = res;
        

*/ 