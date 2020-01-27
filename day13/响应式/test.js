

//数据劫持
//Object.defineProperty()的作用就是直接在一个对象上定义一个新属性，或者修改一个已经存在的属性
/*
一般通过为对象的属性赋值的情况下，对象的属性可以修改也可以删除，但是通过Object.defineProperty()定义属性，通过描述符的设置可以进行更精准的控制对象属性。
参数:
    obj 需要定义属性的当前对象
    prop 当前需要定义的属性名
    desc 属性描述符

属性描述符

    通过Object.defineProperty()为对象定义属性，有两种形式，且不能混合使用，分别为数据描述符，存取描述符，下面分别描述下两者的区别：

    数据描述符 --特有的两个属性（value,writable）
        let Person = {}
        Object.defineProperty(Person, 'name', {
        value: 'jack',
        writable: true // 是否可以改变
        })

存取描述符 --是由一对 getter、setter 函数功能来描述的属性

    get：一个给属性提供getter的方法，如果没有getter则为undefined。该方法返回值被用作属性值。默认为undefined。
    set：一个给属性提供setter的方法，如果没有setter则为undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认值为undefined。
。
*/
//参数1:需要劫持的对象 参数:需要劫持的属性 参数3:配置项
var obj = {
    a:1
}
//属性描述符
Object.defineProperty(obj,"b",{
    value:2,// 劫持属性的值
    enumerable:true,//可以被枚举(可以被循环遍历)
    writable:true,//可以修改(写入)劫持的属性
    configurable:true,//可以删除劫持的属性

})
obj.b = 3;
delete obj.b;
for(key in obj){
    console.log(key)
}
console.log(obj.a,obj.b);


Object.defineProperty(obj,"b",{
    // value:2,// 劫持属性的值
    enumerable:true,//可以被枚举(可以被循环遍历)
    // writable:true,//可以修改(写入)劫持的属性
    configurable:true,//可以删除劫持的属性
    //对属性进行监控(只能监控属性,不能监控对象)
    get(){
        console.log("我被获取了")
    },
    set(){
        console.log("我被修改了")
    }

})
obj.b = 3;
delete obj.b;
for(key in obj){
    console.log(key)
}
console.log(obj.a,obj.b);