



//同步的compose
//上一个函数的结果在下一个函数中运行,所有函数依次执行
function compose(middles){
    return function(a,b){
        //middles[0]是一个函数,(a,b)是需要传的参数
        var res = middles[0](a,b);
        for(let i = 0; i < middles.lenght;i++){
            //第二个res 是上一个函数运行的结果,同时也是第二个函数的参数
            res = middles[i](res);
        }
        //最后把res 的结果返回
        return res;
    }

}


const middlewares = [fn1,fn2];
//运行compose,返回的是一个函数,让这个函数运行
console.log(compose(middlewares)(1,2));



//异步的写法(洋葱圈模型的实现原理)
async function f1(next){
    console.log(1);
    await next();
    console.log(2);

}
async function f2(next){
    console.log(3);
    await delay();
    await next();
    console.log(4);

}
async function f3(next){
    console.log(5);
}
function delay(){
    return new Promise( (resolve,reject)=>{
        setTimeout(_=>{
            console.log(1000)
            resolve();
        },2000)
    })
}


//middles 是顺序执行函数的集合
function compose(middles){
    return function(){
        return dispatch(0)
        //返回的是一个函数
        function dispatch(i){
            //fn 接收一个函数
            var fn = middles[i];
            //判断是否有fn
            //如果没有fn,则递归结束
            if( !fn ){
                //如果没有则返回一个立即执行的promise
                return Promise.resolve();
            }
            //否则返回一个立即执行的函数fn(middles[i]),并给fn 传了一个参数(next 函数)
            return Promise.resolve( fn(  async function next(){
                 await dispatch(i + 1);
            }))
        }
    }
}

let middlewares = [f1,f2,f3];
compose(middlewares)();
