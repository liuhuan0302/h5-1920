const obj = {
    a: 1
}
console.log(obj.a);
obj.a = 2;
console.log(obj.a);

//getter setter 可以做监听

const obj1 = {
    _a: 1,
    //对a 进行监听
    get a() {
        console.log("我被查看了")
        return this._a
    },
    //对a 进行修改
    set a(val) {
        console.log("我被修改了")
        this._a = val;
    }

}
console.log(obj1.a);
obj1.a = 3;//对obj1.a 进行修改
console.log(obj1.a);


//getter方法是无参数，并且有返回值的；当单独设置getter方法时，只能获取属性值，无法更改其定义的属性值的，保证了数据的安全性；
//get语法将 对象属性 绑定到查询该属性时将被调用的函数。
//使用getter
var objGet = {
    a: 1,
    get b() {
        return this.a + 1;
    }
};
console.log(objGet.b); //2
//查询该属性时被调用的函数(){return this.a+1}


//setter方法是有参数，没有返回值的；当单独设置setter方式时，是无法读取属性值的；
//set语法将 对象属性 绑定到要调用的函数。
//使用setter
var objSet = {
    b: 1,
    set ad(a) {
        this.b = a + this.b;
    }
};
objSet.ad = 10;//ad = 10,即a 是10

console.log(objSet.b); //11

objSet.ad = 3;
console.log(objSet.b); //14
