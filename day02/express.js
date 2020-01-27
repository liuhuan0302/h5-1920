
//get 是express的一个方法
//express 实现路由的原理

const http = require('http');

let router = []; 
class Application{
    //收集路由信息
    get(path,cd){
        router.push({
            //当键和键值一致时,可以省略 
            path,
            method:"get",
            cd,
        })

    }
    listen(){
        //开启服务
        http.createServer((req,res)=>{
            console.log(req.url);//客户端请求的地址
            
            for(let item of router){
                //结构数组
                const {path,method,cd} = item;
                //判断如果请求的地址 == 传入的路径
                if(req.url === path && method === req.method.toLocaleLowerCase()){
                    cd(req,res);
                }
            }
        }).listen(...arguments)//arguments 不确定参数 (端口号,回调)

    }
}

///暴露接口(暴露的是一个方法) 由于调用时,调用的是一个方法
module.exports = function createApplication(){
    return new Application();
}