//封装一个bodyparser
module.exports = function bodyparser(cxt){
    return new Promise((resolve,reject)=>{
        try{
            let str = ""
            //发布一个事件
            //响应请求的信息
            cxt.req.on("data",data=>{
                str += data;
            })
            cxt.req.on("end",_=>{
                //响应结束后把str 返回去
                resolve(str);
            })
        }catch(err){
            reject(err);
        }
    })
}