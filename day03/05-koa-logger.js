
//日志
//计算中间件从最外层到最里面运行的时间
module.exports = async(cxt,next)=>{
    const start = new Date().getTime(); //进入最外层中间件的时间
    await next();//依次执行下面的中间件
    const endTime = new Date().getTime();//返回最外层中间件的时间
    console.log(cxt.req.url,endTime - start,cxt.response.header["content-length"]);//第一个参数: 请求的路径 第二个: 时间 第三个参数:cxt.body.length

    //返回值为   / 5003 6
    ///favicon.ico 5000 [Object: null prototype] {
    //'content-type': 'text/plain; charset=utf-8',
    //'content-length': '6'
}