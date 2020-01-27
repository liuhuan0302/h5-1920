const http = require('http');
const fs = require('fs');
const cheerio = require('cheerio');
//http的get 方法
const url = 'http://www.baidu.com'

//get 只能接受res 请求地址
//后端是通过片段返回前端,不能一下全部返回,只能通过事件进行拼接
//get 请求百度的网站
http.get(url,(res)=>{
    //拿到的是片段,需要进行拼接
    let str = '';
    //第一个data事件是固定的
    //第二个data 是拿到的
    //当有数据进入时,会触发data事件 并将拿到的数据以形参的形式传递回调里面,进行拼接
    res.on('data',data=>{
        str += data;
    })
    //事件执行完毕之后,要关闭
    //第一个参数:结束事件
    //第二个参数: 拿到的结果
    res.on('end',_=>{
        console.log(str.toString('utf-8'));//获取的是字符串
        const $ = cheerio.load(str.toString('utf-8')); 

        // console.log($('link'));
        console.log($('#wrapper').find('a').text());
        //将获取的数据写入文件
        fs.writeFile('./baidu.html',str.toString('utf-8'),(err)=>{
            if(err){
                throw new TypeError(err);
            }
        })
    })

//可能会出错
}).on('error',err=>{
    console.log(err);
})


//cheerios  直接操作字符串的方法 
//安装命令 npm i cheerio -D