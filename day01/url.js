const url = require('url');

const urls = 'http://nodejs.cn/api/url.html?a=1&b=2';

//let myUrl = url.parse(urls);//将地址解析为一个对象
/*
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'nodejs.cn',
  port: null,
  hostname: 'nodejs.cn',
  hash: null,
  search: '?a=1&b=2',
  query: 'a=1&b=2',
  pathname: '/api/url.html',
  path: '/api/url.html?a=1&b=2',
  href: 'http://nodejs.cn/api/url.html?a=1&b=2'
}
*/ 

//let myUrl = url.parse(urls,true);//第二个参数为一个布尔值 
// query: [Object: null prototype] { a: '1', b: '2' } 可以将参数转成一个对象

let myUrl = url.format({
    protocol: 'http:',
    slashes: true,
    auth: null,
    host: 'nodejs.cn',
    port: null,
    hostname: 'nodejs.cn',
    hash: null,
    search: '?a=1&b=2',
    query: 'a=1&b=2',
    pathname: '/api/url.html',
    path: '/api/url.html?a=1&b=2',
    href: 'http://nodejs.cn/api/url.html?a=1&b=2'
})
//http://nodejs.cn/api/url.html?a=1&b=2 将其转成网址  把json 转成数组
console.log(myUrl);

console.log(url.resolve(urls,'hhh'));//将文件名称替换掉 http://nodejs.cn/api/hhh
