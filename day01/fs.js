//文件的读写
const fs = require('fs');


//文件的读写
//1.fs.readFile() 异步文件的读取 fs.readFilesSync() 同步文件的写入

//fs.writeFiles();

//文件流的操作


//异步读取文件信息  异步通过一个回调接收信息
fs.stat("./url.js",(err,stats)=>{
    if(err){
        //抛出问题,当出现问题会抛出问题
        throw new TypeError(err);
    }else{
        console.log(stats);
        console.log(stats.size);//文件大小
        console.log(stats.isDirectory());//是不是一个目录 false
        console.log(stats.isFile());//是不是一个文件
    }
})

/*
返回的文件信息
Stats {
  dev: 3512321933,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: 4096,
  ino: 562949953450727,
  size: 1115,
  blocks: 8,
  atimeMs: 1572254101018.5938,
  mtimeMs: 1572254871507.663,
  ctimeMs: 1572254871507.663,
  birthtimeMs: 1572254101018.5938,
  atime: 2019-10-28T09:15:01.019Z,
  mtime: 2019-10-28T09:27:51.508Z,
  ctime: 2019-10-28T09:27:51.508Z,
  birthtime: 2019-10-28T09:15:01.019Z
}
*/ 

//同步读取文件信息
const stats = fs.statSync('./url.js');

console.log(stats.size);//文件大小
console.log(stats.isDirectory());//是不是一个目录 false
console.log(stats.isFile());//是不是一个文件


//读取文件(同步)
const readFile = fs.readFileSync('./url.js','utf-8');

console.log(readFile);
/*
<Buffer 63 6f 6e 73 74 20 75 72 6c 20 3d 20 72 65 71 75 69 72 65 28 27 75 72 6c 27 29 3b 0d 0a 0d 0a 63 6f 6e 73 74 20 75 72 6c 73 20 3d 20 27 68 74 74 70 3a ... 1065 more bytes>

buffer 类型
*/ 
// console.log(readFile.toString('utf-8'));//buffer 类型解析

//异步读取文件
fs.readFile('./url.js',"utf-8",(err,files)=>{
    if(err){
        throw new TypeError(err);
    }else{
        console.log(files.toString('utf-8'));
    }
})


//写入文件(异步)
//第一个参数是目标源(如果存在,直接写入,不存在直接创建在进行写入)
//第二个参数 写入的内容
//第三个参数 回调
fs.writeFile('./text.txt','222222',(err)=>{
    if(err){
        throw new TypeError(err);
    }else{
        console.log('写入成功');
    }
})

//读取的文件,将读取到的内容写入到另一个文件
//读取文件(同步)
//同步与异步的区别主要看Sync
const json = JSON.parse(fs.readFileSync('./json.json','utf-8'));
console.log(typeof json);//获取的是个字符串
let num = 0;
for(let key in json){
    console.log(json[key]);
    num += json[key];
}
fs.writeFile('./num.txt',num,(err)=>{
    if(err){
        throw new TypeError(err);
    }
    console.log('写入成功');
})

//文件的删除
// fs.unlink('./text.txt',(err)=>{
//     if(err){
//         throw new TypeError(err);
//     }
//     console.log('文件删除成功');
// })


//创建文件夹
fs.mkdir('./src',(err)=>{
    if(err){
        throw new TypeError(err);
    }
    console.log('创建成功');
    
})

fs.mkdir('./src/src',(err)=>{
    if(err){
        throw new TypeError(err);
    }
    console.log('创建成功');
    
})

//删除文件夹(不能删除有子文件夹的文件夹)
fs.rmdir('./src/src',(err)=>{
    if(err){
        throw new TypeError(err);
    }
    console.log('删除成功');
})