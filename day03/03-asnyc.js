/*
解决异步的方案
    1.回调
    2.promise

*/ 

//回调解决异步
function fn(){
    setTimeout(()=>{
        console.log("你好");
    })
}
fn();
console.log("还行");//由于定时器是异步的,所以打印的是 还行-你好

//改造之后
function fn(fn1){
    setTimeout(()=>{
        console.log("你好");
        fn1();
    })
}
fn(()=>{
    console.log("还行");
});//先执行定时器在执行函数里面的回调函数

//回调能解决异步代码同步执行,但是造成回调地狱,对于后期的维护和扩展有一定难度

//---------------------------------------------

promise
function delay(data){
    return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve(data);
            },2000)
    })
}

delay("今天星期三")
    .then(data=>{
        console.log(data);
        return delay("明天星期四")
    })
    .then(data=>{
        console.log(data);
    })


//Generator
//生成器的yield关键字有个神奇的功能，就是当你执行一次next()，那么只会执行一个yield后面的内容，然后语句终止运行
function *Generator(){
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    console.log(yield);
}

const a = Generator();

console.log(a.next());//{ value: 1, done: false }
console.log(a.next());//{ value: 2, done: false }
console.log(a.next());//{ value: 3, done: false }
console.log(a.next());//{ value: 4, done: false }
console.log(a.next());//{ value: undefined, done: true }


asnyc
function delay(data){
    return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve(data);
            },2000)
    })
}

//console.log(delay("aaaa"))//delay() 执行之后返回的是promise()对象
// async 是一个修饰符，async 定义的函数会默认的返回一个Promise对象resolve的值，因此对async函数可以直接进行then操作,返回的值即为then方法的传入函数
//await 关键字 只能放在 async 函数内部， await关键字的作用 就是获取 Promise中返回的内容， 获取的是Promise函数中resolve或者reject的值
//如果await 后面并不是一个Promise的返回值，则会按照同步程序返回值处理
async function fn(){
    const d1 = await delay("aaaa");
    console.log(d1);
    const d2 = await delay("bbbb");
    console.log(d2);
    const d3 = await delay("cccc");
    console.log(d3);
}
fn();

async function funAsy() {
    const a = await 1
    const b = await new Promise((resolve, reject)=>{
         setTimeout(function(){
            resolve('time')
         }, 3000)
    })
    const c = await b
    console.log(a, b, c)
 }
 
 funAsy()
