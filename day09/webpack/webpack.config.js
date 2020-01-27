const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
//webpackfig 配置文件
module.exports = {
    //'development' or 'production' 配置开发环境或者是生产环境,没有配置mode时默认是production 生产环境(代码默认做压缩)
    mode:"development",//配置开发环境(代码没有压缩)
    //devtool 映射错误 开发环境中cheap-module-eval-source-map
    devtool:"cheap-module-evel-source-map",
    //入口文件
    entry:{
        //对象表示有多个依赖文件
        main : path.resolve(__dirname,"./index.js"),
        bundle :path.join(__dirname,"./index2.js"),//配置多入口文件
    },
    //出口文件 []修饰符
    output:{
        //打包后输出文件的文件名
        filename :'[name].js', //name指入口文件的属性名
        //打包后的文件存放的地方
        path : path.join(__dirname,'./dist')
    },
    //模块解析  module.rules 允许你在 webpack 配置中指定多个 loader。 这是展示 loader 的一种简明方式，并且有助于使代码变得简洁。
    module:{
        //需要解析的模块
        rules:[
            {   //对css进行打包解析
                test:/\.css$/,// 正则匹配所有.css后缀的样式文件
                use:[
                    "style-loader",// 将css模块作为样式导出到DOM中
                    "css-loader" // 解析文件依赖
                ]
            },
            {//解析预编译脚本(sass less)
                test:/\.styl$/,
                use:[
                    "style-loader",//在将文件插入html中
                    "css-loader", //解决文件依赖的
                    "stylus-loader"//将styl文件语法转成正常的css语法
                ]
            },
            {//图片的解析
                test:/\.(jpg|png\jpeg|gif|svg)/,
                use:[{
                    loader:"url-loader",//解析图片,解析文件
                    options:{//配置项
                        limit: 1024 //设置文件大小,如果文件超过设置的大小,会重新生成一个文件放在dist 文件下,如果没有超,就会以base64的形式存放打包文件中; 区别:生成新文件会增加http区别
                    }
                }]

            },
            {//ES6解析成ES5
                test:/\.js$/,//正则查找js文件
                exclude:/node_modules/,//除该文件之外
                loader: "babel-loader",
            }
        ]
    },
    //开启服务
    devServer:{//配置项
        contentBase:path.join(__dirname,'dist'),//放置在服务器上的文件(以该文件为主文件)
        hot:true,//热替换 (代码更新后不需要每次都要重新运行  类似与--watch)(需要配合着插件使用)
        port:3000,//端口号
        host:"127.0.0.1",//开启服务 主机地址(可以通过手机或者是其他人共享网络)(通过本地ipv4)(方便调试)
        proxy:{
            //代理的ip 反向代理(解决跨域问题)
            "./api":"loaclhost:8080"
        }
    },
    plugins:[//所有的插件要放在这里面,有执行顺序(从下往上)
        new webpack.HotModuleReplacementPlugin(),//模块热替换插件(挂载在webpack上面的)
        new HtmlWebPackPlugin({//该插件将为你生成一个 HTML5 文件， 其中包括使用 script 标签的 body 中的所有 webpack 包。
                template:"./index.html"//以当前的html 为生成html文件的模板
        }),
        new CleanWebpackPlugin()//清除webpack文件 执行顺序:先清除在创建
    
    ]

}


//webpack.config.js 的运行顺序是由下到上的
//执行语句 npm run bundle (更改package.json 文件中的 script之后,可以使用这种语句执行配置文件)
//执行语句: npx webpack
//更改配置文件名 npx webpack --config webpack.con.js
/*
解析css文件需要安装:
    npm i style-loader css-loader -D
    loader 解析语法的
解析styl文件需要安装:
    npm i stylus-loader stylus -D
解析文件或图片需要安装:(url-loader 基于 file-loader)
    npm i url-loader file-loader -D
解析ES6文件(解析成ES5)(@babel/core是babel 的核心库,babel-loader基于@babel/core)
    第一步:npm install --save-dev babel-loader @babel/core
    第二步:npm install @babel/preset-env --save-dev
    第三步:配置webpack.config.js
    第四步:创建.babelrc 配置文件
    Create .babelrc configuration file
    {
        "presets": ["@babel/preset-env"]
    }
    第五步:npm install --save @babel/polyfill //彻底转译ES6
    第六步:在需要转译的文件引入:require("@babel/polyfill");
*/ 
/*
webpack 插件(所有插件都要实例化)
1.HtmlWebpackPlugin插件 (生成一个新的html文件,包括使用 script 标签的 body 中的所有 webpack 包)
    安装:npm install --save-dev html-webpack-plugin
2.CleanWebPackPlugin插件(清除webpack 文件)
    安装:npm install clean-webpack-plugin -D
3.webpack开启服务
    安装:npm install webpack-dev-server -D
    开服务执行语句:npm run dev

*/

//"bulid"