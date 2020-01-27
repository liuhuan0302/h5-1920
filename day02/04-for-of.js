var router = ['key','value','aaa','name'];
//可以循环数组 和对象
for(let item in router){
    console.log(router[item]); //item 是数组中的下标 json 中的键
}

//for of 不能循环json 对象 (es6中循环数组的方法)
for(let item of router){
    console.log(item);//打印值 拿到的是数组中的每一项
}