function fn1(a,b){
    return a + b;

}
function fn2(c){
    return c;
}
//fn1 运行的结果在fn2 中使用
//纯函数(无副作用)(函数的柯里化)
console.log(fn2(fn1(1,2)));


//副作用会引起闭包
var a = 1,
    b = 2;
function fn1(a,b){
    return a + b;

}
function fn2(c){
    return c;
}

console.log(fn2(fn1(a,b)));

//柯里化函数
function add(num1, num2) {
    return num1 + num2;
}
function curryadd(num3){
    return add(5,num3)
}
curryadd(3);//8;


function add2(num1){
    return function(num2){
        return num1+num2;
    }
}
add(1)(2);