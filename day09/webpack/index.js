//引入自定义模块
// const use = require("./useJquery");
            //require("./assets/css/index.css");//引入css样式
            require("./assets/css/style.styl");
const imgUrl = require("./assets/img/efb2813e0e5810798285c3a900ec736c.jpg");

const app = document.querySelector("#app");

let img = new Image();//生成一个图片元素
img.src = imgUrl;

app.appendChild(img);
// // use();


//ES6 编译成 ES5
// require("@babel/polyfill");
// new Promise((resolve,reject)=>{
//     setTimeout(_=>{
//         resolve();
//     },2000)
// })
