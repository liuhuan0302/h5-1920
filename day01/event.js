
//发布订阅模式
const EventEmitter = require('events').EventEmitter;
// console.log(EventEmitter);
/*
[Function: EventEmitter] {
  once: [Function: once],
  EventEmitter: [Circular],
  usingDomains: false,
  defaultMaxListeners: [Getter/Setter],
  init: [Function],
  listenerCount: [Function]
}
*/
const event = new EventEmitter();
console.log(event);

function zhao(data){
    console.log('zhao' + data)
}
function zhao1(data){
    console.log('zhao1' + data)
}
//可以传多个参
function zhao2(data,datas){
    console.log('zhao2' + data + datas)
}
function zhao3(data,datas){
    console.log('zhao3' + data + datas)
}
function luo(data){
    console.log('luo' + data);
}
//发布事件(第一个参数: 事件名 第二个参数:函数名)
event.on('zhao',zhao);
event.on('zhao',zhao1);
event.on('zhao',zhao2);
//只执行一次的事件
event.once('luo',luo);

//要想执行发布的事件 必须要订阅
//第一个参数: 事件名 第二个:参数 回调的参数
// event.emit('zhao',1);
// event.emit('zhao',1,2)


//当前事件执行一次
// event.emit('luo',100);
// event.emit('luo',100);

//针对性删除(只删除事件名和回调函数都一样))
// event.removeListener('zhao',zhao);
//删除全部
// event.removeAllListeners('zhao');


//在当前事件队列之前在插入一个事件
event.prependListener('zhao',zhao3)
event.emit('zhao',1,200);

