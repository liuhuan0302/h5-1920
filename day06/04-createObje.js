var obj = {
    a : 1,
    b : 2
}
//const newObj = Object.create(obj)
//创建新对象(object,{a:{  value(当前属性值)，enumerable(是否可被枚举)，writable(是否可修改)， configurable(是否可删除)}})  
//创建的新对象没有__proto__
const newObj = Object.create(obj,{c:{value:3, enumerable: true, writable: true, configurable: true}})
//console.log(newObj.a);//1


for(let key in newObj){
    console.log(newObj[key])
}