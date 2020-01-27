//解析字符串
const qs = require('querystring');

const str = 'a=1&b=2'; 

//[Object: null prototype] { a: '1', b: '2' } 可以将字符串转成json 对象
console.log(qs.parse(str));


//a=1&b=2 可以将json对象转成字符串 
console.log(qs.stringify({ a: '1', b: '2' }));

//编译  将字符串编译a%3D1%26b%3D2
console.log(qs.escape(str));

//反编译 a=1&b=2
console.log(qs.unescape('a%3D1%26b%3D2'))