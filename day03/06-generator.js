//迭代器是一种特殊对象，每一个迭代器对象都有一个next()，该方法返回一个对象，包括value和done属性。
   //迭代器是一种特殊对象，每一个迭代器对象都有一个next()，该方法返回一个对象，包括value和done属性。
   //实现一个返回迭代器对象的函数，注意该函数不是迭代器，返回结果才叫做迭代器
   function createIterator(items){
    var i = 0;
    return {
        next(){
            var done = (i >= items.length);//判断i 是否小于 遍历对象的长度
            var value = !done ? items[i++] : undefined;//如果done 为false,设置value 为当前遍历的值
            return {done,value}
        }
    }
}    

const a = createIterator([1,2,3]);

console.log(a);//返回一个对象
//方法返回的最终是一个对象，包含value、done属性。
console.log(a.next());//{done: false, value: 1}
console.log(a.next());//{done: false, value: 2}
console.log(a.next());//{done: false, value: 3}

//生成器
/*
生成器是函数：用来返回迭代器。

这个概念有2个关键点，一个是函数、一个是返回迭代器。这个函数不是上面ES5中创建迭代器的函数，而是ES6中特有的，一个带有*（星号）的函数，同时你也需要使用到yield
特点:
    1.生成器的yield关键字有个神奇的功能，就是当你执行一次next()，那么只会执行一个yield后面的内容，然后语句终止运行;即使在for循环中使用yield关键字，也会暂停循环
    2.yield只可以在生成器函数内部使用，如果在非生成器函数内部使用，则会报错
    3.迭代器是对象，生成器是返回迭代器的函数。凡是通过生成器生成的迭代器，都是可以迭代的对象(可迭代对象具有Symbol.iterator属性)，也就是可以通过for of将value遍历出来。
    4.在ES6中，数组、Set、Map、字符串都是可迭代对象。
*/ 
function *Generator(){
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    
}

const a = Generator();

//生成器是函数：用来返回迭代器。
console.log(a.next());//{ value: 1, done: false }
console.log(a.next());//{ value: 2, done: false }
console.log(a.next());//{ value: 3, done: false }
console.log(a.next());//{ value: 4, done: false }
console.log(a.next());//{ value: undefined, done: true }
//可以通过for of遍历出来
for(let value of a){
    console.log(value);
}


//即使你是在for循环中使用yield关键字，也会暂停循环
function *Generator(items){
    for(let i = 0; i<items.length;i++){
        yield items[i];
    }
}
const fn = Generator([1,2,3]);
console.log(fn.next());//{ value: 1, done: false }


//凡是通过生成器生成的迭代器，都是可以迭代的对象(可迭代对象具有Symbol.iterator属性)
function *createIterator() {
    yield 1;
    yield 2;
    yield 3;
  }
  const a = createIterator(); //a是一个迭代器
  console.log(a);
  const s = a[Symbol.iterator]();//使用Symbol.iterator访问迭代器
  console.log(s.next()) //{value: 1, done: false}